import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype'
import { SKIP, visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import type { Element, Root, Text } from 'hast';

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

function splitImageRows<T>(items: T[]): T[][] {
  if (items.length <= 3) {
    return [items];
  }

  const rows: T[][] = [];
  let remaining = items.length;
  let start = 0;

  while (remaining > 0) {
    let rowSize: 2 | 3;

    if (remaining === 2 || remaining === 4) {
      rowSize = 2;
    } else {
      rowSize = 3;
    }

    rows.push(items.slice(start, start + rowSize));
    start += rowSize;
    remaining -= rowSize;
  }

  return rows;
}

/**
 * A custom rehype plugin to handle co-located images:
 * 1. Detect relative image paths (e.g. ./img/ or img/)
 * 2. Copy the image from posts/[id]/img/ to public/assets/posts/[id]/
 * 3. Add width and height properties (to prevent Layout Shift)
 * 4. Rewrite the src to point to the public asset path
 */
function rehypeImageProcessor(postId: string) {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        const { src, alt } = node.properties;

        // 1. Only handle local relative paths for rewriting
        if (src && typeof src === 'string' && (src.startsWith('./img/') || src.startsWith('img/'))) {
          const fileName = path.basename(src);
          const sourcePath = path.join(postsDirectory, postId, 'img', fileName);
          const publicAssetsDir = path.join(process.cwd(), 'public/assets/posts', postId);
          const targetPath = path.join(publicAssetsDir, fileName);

          // Ensure the target directory exists and copy the file
          if (fs.existsSync(sourcePath)) {
            if (!fs.existsSync(publicAssetsDir)) {
              fs.mkdirSync(publicAssetsDir, { recursive: true });
            }
            // Copy file if it doesn't exist or is newer
            if (!fs.existsSync(targetPath)) {
              fs.copyFileSync(sourcePath, targetPath);
            }

            // Get dimensions for SEO and to prevent CLS
            try {
              const buffer = fs.readFileSync(sourcePath);
              const dimensions = sizeOf(buffer);
              node.properties.width = dimensions.width;
              node.properties.height = dimensions.height;
            } catch (err) {
              console.warn(`[rehypeImageProcessor] Could not get dimensions for ${sourcePath}`, err);
            }

            // Rewrite the src to the public URL
            node.properties.src = `/assets/posts/${postId}/${fileName}`;
            node.properties.loading = 'lazy';
          }
        }

        if (parent && typeof index === 'number') {
          const captionText: Text = {
            type: 'text',
            value: alt && typeof alt === 'string' ? alt : ''
          };

          const figcaption: Element | null = alt && typeof alt === 'string'
            ? {
                type: 'element',
                tagName: 'figcaption',
                properties: {
                  className: 'mt-2 text-center text-sm text-muted italic'
                },
                children: [captionText]
              }
            : null;

          const figure: Element = {
            type: 'element',
            tagName: 'figure',
            properties: {
              className: 'post-image-figure'
            },
            children: [
              {
                ...node,
                properties: {
                  ...node.properties,
                  className: 'post-image'
                }
              },
              ...(figcaption ? [figcaption] : [])
            ]
          };

          parent.children[index] = figure;

          return [SKIP, index + 1];
        }
      }
    });

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || typeof index !== 'number') {
        return;
      }

      const meaningfulChildren = node.children.filter((child) => {
        if (child.type === 'text') {
          return child.value.trim().length > 0;
        }
        return true;
      });

      if (meaningfulChildren.length < 2) {
        return;
      }

      const allFigures = meaningfulChildren.every(
        (child): child is Element => child.type === 'element' && child.tagName === 'figure'
      );

      if (!allFigures) {
        return;
      }

      const rows = splitImageRows(meaningfulChildren);

      const gallery: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: 'post-image-gallery'
        },
        children: rows.map((row): Element => ({
          type: 'element',
          tagName: 'div',
          properties: {
            className: `post-image-row post-image-row-${row.length}`
          },
          children: row
        }))
      };

      parent.children[index] = gallery;
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
