import { getPostData, getSortedPostsData } from '@/lib/posts';
import type { Metadata } from "next";
import DateFormatter from '@/components/DateFormatter';
import 'katex/dist/katex.min.css';
import Link from "next/link";
import { MdCalendarToday, MdUpdate } from 'react-icons/md';


// get all possible slugs for static generation
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // Here params must be awaited
  const postData = await getPostData(slug); // Get the data for the post

  return {
    title: postData.title,
    description: `${postData.description}` || `Read more about ${postData.title}.`,
    keywords: postData.keywords || [],
  };
}


// generate all metadata and content for the post page
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* post header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
            {postData.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-foreground">
              <MdCalendarToday className="mr-1.5 h-5 w-5" />
              <DateFormatter date={postData.publishedDate} format="long" />
            </div>

            {postData.lastModified && (
              <div className="flex items-center text-foreground">
                <MdUpdate className="mr-1.5 h-5 w-5" />
                <DateFormatter date={postData.lastModified} format="long" />
              </div>
            )}

          </div>

        </header>

        {/* post content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        {/* post categories */}
        {postData.categories && postData.categories.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {postData.categories.map((category: string) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase()}`}
                  className="inline-flex items-center rounded-md bg-border px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}      </article>
    </main>
  );
}
