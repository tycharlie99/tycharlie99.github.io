import { getSortedPostsData } from "@/lib/posts"; // Please ensure the path is correct
import Link from "next/link";
import React from "react";
import DateFormatter from "@/components/DateFormatter";

// 1. Generate static route parameters (statically generate all category pages)
export async function generateStaticParams() {
  const allPosts = getSortedPostsData();

  // Extract categories arrays from all posts and flatten into a single array
  const allCategories = allPosts.flatMap((post) => post.categories || []);

  // Filter out non-strings or empty values, and remove duplicates
  const uniqueCategories = Array.from(
    new Set(
      allCategories
        .filter((cat): cat is string => typeof cat === "string" && cat.length > 0)
    )
  );

  // Return format must match the name of the dynamic route [category]
  return uniqueCategories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

// 2. Category page component
export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const allPosts = getSortedPostsData();
  const targetCategory = category.toLowerCase();
  // Filter posts belonging to that category (case-insensitive)
  const filteredPosts = allPosts.filter((post) =>
    post.categories?.some(
      (cat: string) =>
        typeof cat === "string" &&
        cat.toLowerCase() === targetCategory
    )
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Minimalist title layout */}
        <header className="mb-12 border-b border-border pb-8">
          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Category:</h1>
            <span className="text-2xl text-subtle font-medium italic">
              {category}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            Showing {filteredPosts.length} posts filed under this topic.
          </p>
        </header>

        {/* Article list */}
        <div className="space-y-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <section key={post.id} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-xl font-bold text-foreground/85 transition-colors hover:text-foreground underline-offset-4 hover:underline decoration-border"
                  >
                    {post.title}
                  </Link>
                  <time className="ml-4 flex-shrink-0 text-sm tabular-nums text-muted">
                    <DateFormatter date={post.publishedDate} format="long" />
                  </time>
                </div>

                {/* Display other tags for this article (optional) */}
                <div className="flex gap-2 mt-2">
                  {post.categories?.map((cat: string) => (
                    <span key={cat} className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-muted">
                      {cat}
                    </span>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg italic text-muted">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>

      </article>
    </main>
  );
}
