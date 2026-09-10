import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blogs';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts-data.json');

/**
 * Initialize the database file if it doesn't already exist,
 * seeding it with the initial client-approved posts from data/blogs.js
 */
function initDataStore() {
  if (!fs.existsSync(DATA_FILE)) {
    const seededPosts = BLOG_POSTS.map((post, idx) => ({
      id: `rc-post-${idx + 1}`,
      slug: post.slug,
      title: post.title,
      category: post.category,
      tags: post.tags || [],
      date: post.date,
      readTime: post.readTime,
      author: post.author || 'RoughClick Editorial',
      featured: Boolean(post.featured),
      excerpt: post.excerpt,
      content: post.content,
      relatedSlugs: post.relatedSlugs || [],
      status: 'published',
      seoTitle: post.title,
      seoDescription: post.excerpt,
      focusKeyword: post.tags?.[0] || 'Digital Presence',
      canonicalUrl: '',
      coverImage: post.coverImage || '',
      createdAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString(),
    }));

    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(seededPosts, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Failed to seed initial posts store:', err);
    }
  }
}

/**
 * Read all posts from storage
 */
function readAllFromDisk() {
  initDataStore();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[DB] Error reading posts data file, returning fallback:', err);
    return BLOG_POSTS.map((p, idx) => ({
      ...p,
      id: `rc-fallback-${idx}`,
      status: 'published'
    }));
  }
}

/**
 * Write posts to storage safely
 */
function writeAllToDisk(posts) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[DB] Error writing posts to disk:', err);
    return false;
  }
}

// -----------------------------------------------------------------------------
// PUBLIC VISITOR API (Strict isolation: only published posts accessible)
// -----------------------------------------------------------------------------

/**
 * Get all published posts for public blog listing
 */
export async function getPublishedPosts() {
  const all = readAllFromDisk();
  return all
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
}

/**
 * Get single post by slug for public reader page.
 * Returns null if post does not exist or is still a draft.
 */
export async function getPostBySlug(slug, allowDraftPreview = false) {
  if (!slug) return null;
  const all = readAllFromDisk();
  const post = all.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  
  if (!post) return null;
  if (post.status !== 'published' && !allowDraftPreview) {
    return null; // Public visitors can NEVER see drafts
  }

  return post;
}

// -----------------------------------------------------------------------------
// ADMIN & EDITORIAL PORTAL API (Full management access)
// -----------------------------------------------------------------------------

/**
 * Get all posts including drafts and scheduling metrics
 */
export async function getAllPostsAdmin() {
  const all = readAllFromDisk();
  const sorted = [...all].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  const stats = {
    total: sorted.length,
    published: sorted.filter((p) => p.status === 'published').length,
    drafts: sorted.filter((p) => p.status === 'draft').length
  };

  return { posts: sorted, stats, categories: BLOG_CATEGORIES };
}

/**
 * Helper to slugify a title string
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate estimated reading time
 */
export function calculateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Create or update a post
 */
export async function savePost(data) {
  const all = readAllFromDisk();
  const now = new Date().toISOString();
  const readableDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  const slug = (data.slug && data.slug.trim()) ? slugify(data.slug) : slugify(data.title || 'untitled-post');
  const readTime = data.readTime || calculateReadTime(data.content || '');

  // Check if updating existing
  const existingIdx = all.findIndex((p) => p.id === data.id || p.slug === slug);

  let savedPost;

  if (existingIdx >= 0) {
    const existing = all[existingIdx];
    savedPost = {
      ...existing,
      ...data,
      slug,
      readTime,
      updatedAt: now,
      publishedAt: data.status === 'published' ? (existing.publishedAt || now) : existing.publishedAt,
      date: existing.date || readableDate
    };
    all[existingIdx] = savedPost;
  } else {
    savedPost = {
      id: data.id || `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      slug,
      title: data.title || 'Untitled Perspective',
      category: data.category || 'Website Services',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : []),
      date: readableDate,
      readTime,
      author: data.author || 'RoughClick Editorial',
      featured: Boolean(data.featured),
      excerpt: data.excerpt || '',
      content: data.content || '',
      relatedSlugs: data.relatedSlugs || [],
      status: data.status || 'draft',
      seoTitle: data.seoTitle || data.title || '',
      seoDescription: data.seoDescription || data.excerpt || '',
      focusKeyword: data.focusKeyword || '',
      canonicalUrl: data.canonicalUrl || '',
      coverImage: data.coverImage || '',
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === 'published' ? now : null
    };
    all.unshift(savedPost);
  }

  writeAllToDisk(all);
  return savedPost;
}

/**
 * Delete a post by ID or slug
 */
export async function deletePost(idOrSlug) {
  const all = readAllFromDisk();
  const filtered = all.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  
  if (filtered.length === all.length) {
    return false; // Not found
  }

  return writeAllToDisk(filtered);
}
