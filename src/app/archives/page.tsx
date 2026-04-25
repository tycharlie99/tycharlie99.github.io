import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archives",
  description: "Browse the archive of posts by year.",
  alternates: {
    canonical: "/archives",
  },
};

export default function ArchivesPage() {
  const allPosts = getSortedPostsData();

  const groupedPosts = allPosts.reduce((acc, post) => {
    const year = new Date(post.publishedDate).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof allPosts>);

  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-10">Archives</h1>
      
      {years.length === 0 && <p className="text-muted">No posts found.</p>}

      {years.map((year) => (
        <section key={year} className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-subtle">{year}</h2>
          <div className="ml-2 space-y-4 border-l border-border">
            {groupedPosts[year].map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="group flex items-baseline gap-4 pl-6 hover:translate-x-1 transition-transform"
              >
                <span className="text-sm tabular-nums text-muted">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                </span>
                <span className="text-lg text-foreground/80 transition-colors group-hover:text-foreground">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
