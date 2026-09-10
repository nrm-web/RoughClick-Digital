import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blogs';

const IS_VERCEL = process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const BUNDLED_DATA_FILE = path.join(process.cwd(), 'data', 'posts-data.json');
const RUNTIME_DATA_FILE = IS_VERCEL ? path.join('/tmp', 'posts-data.json') : BUNDLED_DATA_FILE;

// Cloud Storage Credentials (Vercel KV, Upstash Redis, GitHub API)
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPOSITORY || 'nrm-web/RoughClick-Digital';

// Inquiries Runtime Storage
const INQUIRIES_DATA_FILE = IS_VERCEL ? path.join('/tmp', 'inquiries-data.json') : path.join(process.cwd(), 'data', 'inquiries-data.json');

// In-Memory cache for warm lambdas and local development
let memoryPostsCache = null;

/**
 * Seed initial posts from data/blogs.js
 */
function getSeededPosts() {
  return BLOG_POSTS.map((post, idx) => ({
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
}

/**
 * Read all posts from storage (checks Vercel KV -> In-Memory -> /tmp -> Bundled file -> Seeded posts)
 */
export async function readAllFromStorage() {
  // 1. Try Vercel KV / Upstash Redis if configured
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/rc_posts_data`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (Array.isArray(parsed) && parsed.length > 0) {
            memoryPostsCache = parsed;
            return parsed;
          }
        }
      }
    } catch (err) {
      console.error('[DB KV] Error reading from Vercel KV:', err);
    }
  }

  // 2. Try In-Memory Cache
  if (memoryPostsCache && Array.isArray(memoryPostsCache) && memoryPostsCache.length > 0) {
    return memoryPostsCache;
  }

  // 3. Try Runtime file (/tmp on Vercel, data/posts-data.json on local/VPS)
  try {
    if (fs.existsSync(RUNTIME_DATA_FILE)) {
      const raw = fs.readFileSync(RUNTIME_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryPostsCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('[DB File] Error reading runtime data file:', err);
  }

  // 4. Try Bundled data file (read-only in /var/task on Vercel)
  try {
    if (fs.existsSync(BUNDLED_DATA_FILE)) {
      const raw = fs.readFileSync(BUNDLED_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (IS_VERCEL) {
          try {
            const dir = path.dirname(RUNTIME_DATA_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(RUNTIME_DATA_FILE, raw, 'utf-8');
          } catch (e) {}
        }
        memoryPostsCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('[DB File] Error reading bundled data file:', err);
  }

  // 5. Fallback: Seeded posts
  const seeded = getSeededPosts();
  memoryPostsCache = seeded;
  return seeded;
}

/**
 * Write all posts to storage (Dual-writes to Vercel KV, GitHub repo, /tmp, and local file)
 */
export async function writeAllToStorage(posts) {
  memoryPostsCache = posts;
  let success = false;

  // 1. Write to Vercel KV / Upstash Redis if configured
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/set/rc_posts_data`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(posts))
      });
      if (res.ok) {
        success = true;
      }
    } catch (err) {
      console.error('[DB KV] Error writing to Vercel KV:', err);
    }
  }

  // 2. Sync to GitHub repo if GITHUB_TOKEN is present
  if (GITHUB_TOKEN) {
    try {
      const filePath = 'data/posts-data.json';
      let sha = undefined;
      const getFileRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
      if (getFileRes.ok) {
        const fileJson = await getFileRes.json();
        sha = fileJson.sha;
      }

      await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: 'chore(blog): sync posts data from admin portal [skip ci]',
          content: Buffer.from(JSON.stringify(posts, null, 2)).toString('base64'),
          sha
        })
      });
      success = true;
    } catch (err) {
      console.error('[DB GitHub] Error syncing to GitHub repo:', err);
    }
  }

  // 3. Write to Runtime file (/tmp on Vercel, or data/posts-data.json locally)
  try {
    const dir = path.dirname(RUNTIME_DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(RUNTIME_DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    success = true;
  } catch (err) {
    console.error('[DB File] Error writing to runtime data file:', err);
  }

  // 4. Write to Bundled file when not on Vercel
  if (!IS_VERCEL) {
    try {
      const dir = path.dirname(BUNDLED_DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(BUNDLED_DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
      success = true;
    } catch (e) {}
  }

  return success;
}

// -----------------------------------------------------------------------------
// PUBLIC VISITOR API (Strict isolation: only published posts accessible)
// -----------------------------------------------------------------------------

/**
 * Get all published posts for public blog listing
 */
export async function getPublishedPosts() {
  const all = await readAllFromStorage();
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
  const all = await readAllFromStorage();
  const post = all.find((p) => p.slug && p.slug.toLowerCase() === slug.toLowerCase());
  
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
  const all = await readAllFromStorage();
  const sorted = [...all].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  const stats = {
    total: sorted.length,
    published: sorted.filter((p) => p.status === 'published').length,
    drafts: sorted.filter((p) => p.status === 'draft').length
  };

  const storageProvider = (KV_URL && KV_TOKEN) 
    ? 'Vercel KV / Upstash (Cloud Database Active)' 
    : (GITHUB_TOKEN ? 'GitHub Repo Sync Active' : (IS_VERCEL ? 'Vercel Serverless (/tmp)' : 'Local File Storage'));

  return { posts: sorted, stats, categories: BLOG_CATEGORIES, storageProvider };
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
  const words = (content || '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Create or update a post
 */
export async function savePost(data) {
  const all = await readAllFromStorage();
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

  await writeAllToStorage(all);
  return savedPost;
}

/**
 * Delete a post by ID or slug
 */
export async function deletePost(idOrSlug) {
  const all = await readAllFromStorage();
  const filtered = all.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  
  if (filtered.length === all.length) {
    return false; // Not found
  }

  return await writeAllToStorage(filtered);
}

// -----------------------------------------------------------------------------
// CLIENT INQUIRY CAPTURE (Contact Form Submissions)
// -----------------------------------------------------------------------------

/**
 * Save customer inquiry lead
 */
export async function saveInquiry(inquiryData) {
  let inquiries = [];
  try {
    if (fs.existsSync(INQUIRIES_DATA_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_DATA_FILE, 'utf-8');
      inquiries = JSON.parse(raw);
    }
  } catch (e) {}

  const newInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...inquiryData,
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);

  try {
    const dir = path.dirname(INQUIRIES_DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(INQUIRIES_DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (e) {}

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/rc_inquiries_data`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(JSON.stringify(inquiries))
      });
    } catch (e) {}
  }

  return newInquiry;
}
