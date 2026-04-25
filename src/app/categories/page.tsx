import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse posts by category.",
  alternates: {
    canonical: "/categories",
  },
};

interface CategorySummary {
  name: string;
  slug: string;
  count: number;
}

export default function CategoriesPage() {
  const posts = getSortedPostsData();
  const categoryMap = new Map<string, CategorySummary>();

  for (const post of posts) {
    for (const category of post.categories || []) {
      if (typeof category !== "string" || category.length === 0) {
        continue;
      }

      const slug = category.toLowerCase();
      const existing = categoryMap.get(slug);

      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(slug, {
          name: category,
          slug,
          count: 1,
        });
      }
    }
  }

  const categories = Array.from(categoryMap.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-12 border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="mt-2 text-sm text-muted">
            Browse posts by topic. {categories.length} categories across {posts.length} posts.
          </p>
        </header>

        {categories.length > 0 ? (
          <div className="space-y-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-surface/35 px-5 py-4 transition-colors hover:bg-surface"
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-foreground/90 transition-colors group-hover:text-foreground">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {category.count} {category.count === 1 ? "post" : "posts"}
                  </p>
                </div>
                <span className="ml-4 text-sm text-muted transition-transform group-hover:translate-x-0.5">
                  View →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg italic text-muted">
              No categories found.
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
