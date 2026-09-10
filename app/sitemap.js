import { getPublishedPosts } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://roughclick.com';

  const publishedPosts = await getPublishedPosts();

  const blogUrls = publishedPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...blogUrls
  ];
}
