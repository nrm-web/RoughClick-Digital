import React from 'react';
import { getPublishedPosts } from '@/lib/db';
import BlogListClient from './BlogListClient';

export const revalidate = 60; // Revalidate at most once every minute

export const metadata = {
  title: 'Knowledge Hub & Strategic Perspectives | RoughClick Digital',
  description: 'Practical perspectives on modern web architecture, digital presence integration, and local business profile discoverability.',
  openGraph: {
    title: 'Knowledge Hub & Strategic Perspectives | RoughClick Digital',
    description: 'Practical perspectives on modern web architecture, digital presence integration, and local business profile discoverability.',
    type: 'website'
  }
};

export default async function BlogPage() {
  const publishedPosts = await getPublishedPosts();

  return <BlogListClient initialPosts={publishedPosts} />;
}
