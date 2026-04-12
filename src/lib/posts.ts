import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype'
import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';

const postsDirectory = path.join(process.cwd(), 'posts');

// define the front matter data type for better type checking
interface PostData {
  title: string;
  description: string;
  publishedDate: Date;
  lastModified?: Date;
  categories: string[];
  tags?: string[];
  keywords?: string[];
  draft?: boolean;
}

/**
 * A custom rehype plugin to handle co-located images:
 * 1. Detect relative image paths (e.g. ./img/ or img/)
 * 2. Copy the image from posts/[id]/img/ to public/assets/posts/[id]/
 * 3. Add width and height properties (to prevent Layout Shift)
 * 4. Rewrite the src to point to the public asset path
 */
function rehypeImageProcessor(postId: string) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const { src } = node.properties;

        // Only handle local relative paths
        if (src && (src.startsWith('./img/') || src.startsWith('img/'))) {
          const fileName = path.basename(src);
          const sourcePath = path.join(postsDirectory, postId, 'img', fileName);
          const publicAssetsDir = path.join(process.cwd(), 'public/assets/posts', postId);
          const targetPath = path.join(publicAssetsDir, fileName);

          // 1. Ensure the target directory exists and copy the file
          if (fs.existsSync(sourcePath)) {
            if (!fs.existsSync(publicAssetsDir)) {
              fs.mkdirSync(publicAssetsDir, { recursive: true });
            }
            // Copy file if it doesn't exist or is newer
            if (!fs.existsSync(targetPath)) {
              fs.copyFileSync(sourcePath, targetPath);
            }

            // 2. Get dimensions for SEO and to prevent CLS
            try {
              const buffer = fs.readFileSync(sourcePath);
              const dimensions = sizeOf(buffer);
              node.properties.width = dimensions.width;
              node.properties.height = dimensions.height;
            } catch (err) {
              console.warn(`[rehypeImageProcessor] Could not get dimensions for ${sourcePath}`, err);
            }

            // 3. Rewrite the src to the public URL
            node.properties.src = `/assets/posts/${postId}/${fileName}`;
            node.properties.loading = 'lazy';
          }
        }
      }
    });
  };
}

export function getSortedPostsData() {
  // get all folder names under /posts
  const folderNames = fs.readdirSync(postsDirectory).filter(fileName => {
    const fullPath = path.join(postsDirectory, fileName);
    return fs.lstatSync(fullPath).isDirectory();
  });

  const allPostsData = folderNames.map((folderName) => {
    // set id as the folder name
    const id = folderName;

    // get the full path of index.md in the folder
    const fullPath = path.join(postsDirectory, folderName, 'index.md');

    // check if index.md exists, if not, skip this folder
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as PostData),
    };
  }).filter(post => post !== null); // filter out null values (folders without index.md)

  return allPostsData.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}


// get post data by id (folder name)
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, id, `index.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkMath)            // 1. Detect math syntax like $...$ and $$...$$
    .use(remarkRehype)          // 2. Transform Remark (Markdown AST) into Rehype (HTML AST)
    .use(rehypeImageProcessor, id) // 3. Handle images (copy & rewrite paths)
    .use(rehypeShiki, {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false,
    })
    .use(rehypeKatex)           // 5. Render math syntax into KaTeX-compatible HTML structures
    .use(rehypeStringify)       // 6. Serialize the HTML AST into a final string
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as PostData),
  };
}
