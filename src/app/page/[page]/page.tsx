// src/app/page/[page]/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import DateFormatter from '@/components/DateFormatter';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

const POSTS_PER_PAGE = 10; // Show 10 posts per page

// 💡 Static export must tell Next.js how many pages there are in total
export async function generateStaticParams() {
  const allPosts = getSortedPostsData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number.parseInt(page, 10);

  return {
    title: pageNum > 1 ? `Page ${pageNum}` : undefined,
    alternates: {
      canonical: pageNum > 1 ? `/page/${pageNum}` : "/",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = parseInt(page);
  const allPostsData = getSortedPostsData();
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE);

  // Error handling: if the page number is out of range
  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  // 💡 Slice out the articles for that page
  const startIndex = (pageNum - 1) * POSTS_PER_PAGE;
  const displayedPosts = allPostsData.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <ul className="space-y-6">
        {displayedPosts.map(({ id, publishedDate, title, description }) => (
          <li key={id} className="group">
            <Link href={`/posts/${id}`} className="block">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-muted transition-colors">
                {title}
              </h2>
              <p className="text-muted">{description}</p>
              <span className="text-sm text-muted block mb-1">
                <DateFormatter date={publishedDate} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 💡 Pagination navigation: this will change the URL */}
      <nav className="mt-12 flex justify-between items-center border-t border-border pt-8">
        {pageNum > 1 ? (
          <Link href={pageNum === 2 ? '/' : `/page/${pageNum - 1}`} className="hover:underline">
            ← Previous
          </Link>
        ) : <span />}

        <span className="text-sm text-muted">{pageNum} / {totalPages}</span>

        {pageNum < totalPages ? (
          <Link href={`/page/${pageNum + 1}`} className="hover:underline">
            Next →
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
