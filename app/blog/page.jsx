import React from 'react';
import { getPublishedPosts } from '@/lib/db';
import BlogListClient from './BlogListClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Practical Digital Guides',
  description: 'Practical guidance on website platforms, custom applications, social content, local business profiles, and ongoing digital upkeep.',
  openGraph: {
    title: 'Practical Digital Guides | RoughClick Digital',
    description: 'Practical guidance on website platforms, custom applications, social content, local business profiles, and ongoing digital upkeep.',
    url: 'https://roughclick.com/blog',
    type: 'website'
  }
};

export default async function BlogPage() {
  const publishedPosts = await getPublishedPosts();

  return <BlogListClient initialPosts={publishedPosts} />;
}
