import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/db';

export async function GET() {
  const baseUrl = 'https://roughclick.com';
  const posts = await getPublishedPosts();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RoughClick Digital Insights</title>
    <link>${baseUrl}/blog</link>
    <description>Strategic perspectives on high-performance web architecture, digital presence integration, and discoverability.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}
