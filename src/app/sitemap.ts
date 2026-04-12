import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();
  const baseUrl = 'https://tycharlie.com';

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: post.lastModified || post.publishedDate,
  }));

  const routes = ['', '/about', '/archives', '/categories'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postEntries];
}
