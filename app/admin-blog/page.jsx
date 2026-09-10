'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BLOG_CATEGORIES } from '@/data/blogs';
import {
  Sparkles,
  Eye,
  Send,
  Smartphone,
  Monitor,
  CheckCircle,
  ArrowLeft,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sliders,
  RefreshCw,
  Clock,
  Layers,
  Check
} from 'lucide-react';

export default function AdminBlogPage() {
  const router = useRouter();

  // Navigation & View State
  const [activeTab, setActiveTab] = useState('directory'); // 'directory', 'editor', 'copilot'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' or 'mobile'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'
  const [searchQuery, setSearchQuery] = useState('');

  // Post Data & Stats
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Active Editor Form State
  const [currentId, setCurrentId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Website Services');
  const [tags, setTags] = useState('SEO, Web Architecture');
  const [readTime, setReadTime] = useState('4 min read');
  const [author, setAuthor] = useState('RoughClick Editorial');
  const [featured, setFeatured] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');

  // Agentic Co-Pilot Input State
  const [copilotTopic, setCopilotTopic] = useState('');
  const [copilotCategory, setCopilotCategory] = useState('Website Services');
  const [copilotKeyword, setCopilotKeyword] = useState('');
  const [copilotAudience, setCopilotAudience] = useState('B2B Founders & Marketing Leaders');
  const [copilotTone, setCopilotTone] = useState('Authoritative, performance-driven, analytical');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copilotNote, setCopilotNote] = useState('');

  // Alerts & UI feedback
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Fetch all posts on load
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin-posts');
      if (res.status === 401) {
        router.push('/admin-blog/login');
        return;
      }
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
        setStats(data.stats || { total: data.posts.length, published: 0, drafts: 0 });
      }
    } catch (err) {
      console.error('Error fetching admin posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin-blog/login');
      router.refresh();
    } catch (e) {
      router.push('/admin-blog/login');
    }
  };

  // Open post in editor
  const handleEditPost = (post) => {
    setCurrentId(post.id);
    setTitle(post.title || '');
    setSlug(post.slug || '');
    setCategory(post.category || 'Website Services');
    setTags(Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''));
    setReadTime(post.readTime || '4 min read');
    setAuthor(post.author || 'RoughClick Editorial');
    setFeatured(Boolean(post.featured));
    setCoverImage(post.coverImage || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setStatus(post.status || 'draft');
    setSeoTitle(post.seoTitle || post.title || '');
    setSeoDescription(post.seoDescription || post.excerpt || '');
    setFocusKeyword(post.focusKeyword || '');
    setActiveTab('editor');
  };

  // Reset editor for new post
  const handleNewPost = () => {
    setCurrentId('');
    setTitle('');
    setSlug('');
    setCategory('Website Services');
    setTags('Web Architecture, Performance, SEO');
    setReadTime('4 min read');
    setAuthor('RoughClick Editorial');
    setFeatured(false);
    setCoverImage('');
    setExcerpt('');
    setContent('');
    setStatus('draft');
    setSeoTitle('');
    setSeoDescription('');
    setFocusKeyword('');
    setActiveTab('editor');
  };

  // Save or Publish post
  const handleSavePost = async (targetStatus) => {
    if (!title.trim()) {
      alert('Please provide an article headline/title.');
      return;
    }

    setSaving(true);
    const postPayload = {
      id: currentId || undefined,
      title: title.trim(),
      slug: slug.trim(),
      category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      readTime,
      author,
      featured,
      coverImage: coverImage.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      status: targetStatus,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim(),
      focusKeyword: focusKeyword.trim()
    };

    try {
      const res = await fetch('/api/admin-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload)
      });

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        throw new Error(`Server returned status ${res.status}.`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save post');
      }

      showToast(targetStatus === 'published' ? 'Article published to live website!' : 'Draft saved successfully.');
      setStatus(targetStatus);
      if (data.post?.id) setCurrentId(data.post.id);
      if (data.post?.slug) setSlug(data.post.slug);
      fetchPosts();
    } catch (err) {
      alert(err.message || 'Error saving post');
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDeletePost = async (id, postTitle) => {
    if (!confirm(`Are you sure you want to permanently delete "${postTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin-posts?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article deleted successfully.');
        fetchPosts();
        if (currentId === id) handleNewPost();
      }
    } catch (err) {
      alert('Error deleting post');
    }
  };

  // Agentic AI Generator Trigger
  const handleGenerateWithAgent = async (e) => {
    e.preventDefault();
    if (!copilotTopic.trim()) {
      alert('Please enter a target topic or headline idea.');
      return;
    }

    setGenerating(true);
    setCopilotNote('');

    try {
      const res = await fetch('/api/agentic-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: copilotTopic.trim(),
          category: copilotCategory,
          focusKeyword: copilotKeyword.trim(),
          targetAudience: copilotAudience.trim(),
          tone: copilotTone.trim(),
          apiKey: geminiApiKey.trim() || undefined
        })
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error(`Server returned unexpected response (status ${res.status}).`);
      }

      if (!res.ok) {
        throw new Error(data.error || `Generation failed (status ${res.status})`);
      }

      const art = data.article;
      setTitle(art.title);
      setSlug(art.slug);
      setCategory(art.category);
      setTags(Array.isArray(art.tags) ? art.tags.join(', ') : art.tags);
      setReadTime(art.readTime || '4 min read');
      setExcerpt(art.excerpt);
      setContent(art.content);
      setSeoTitle(art.seoTitle || art.title);
      setSeoDescription(art.seoDescription || art.excerpt);
      setFocusKeyword(copilotKeyword || art.tags?.[0] || '');
      setStatus('draft');
      setCurrentId(''); // Treat as new post

      showToast('Agentic article generated & loaded into editor!');
      if (data.note) setCopilotNote(data.note);
      setActiveTab('editor');
    } catch (err) {
      alert(err.message || 'Failed to generate article');
    } finally {
      setGenerating(false);
    }
  };

  // Filtered post list for directory
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'published' && p.status === 'published') ||
        (filterStatus === 'draft' && p.status === 'draft');

      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [posts, filterStatus, searchQuery]);

  // Real-time SEO character helpers
  const seoTitleLength = seoTitle.length || title.length;
  const seoDescLength = seoDescription.length || excerpt.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-canvas)', color: 'var(--text-primary)' }}>
      {/* Top Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(12px)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.84rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Public Portal</span>
          </Link>

          <div style={{ height: 20, width: 1, backgroundColor: 'var(--border-subtle)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="rc-badge" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
              <ShieldCheck size={12} style={{ marginRight: 4 }} />
              Agency Editorial Portal
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--rc-teal-accent)', fontWeight: 600 }}>
              RoughClick Digital
            </span>
          </div>
        </div>

        {/* Tab Switcher & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: 2
          }}>
            <button
              onClick={() => setActiveTab('directory')}
              style={{
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                backgroundColor: activeTab === 'directory' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'directory' ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                boxShadow: activeTab === 'directory' ? 'var(--card-shadow)' : 'none'
              }}
            >
              All Articles ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              style={{
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                backgroundColor: activeTab === 'editor' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'editor' ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                boxShadow: activeTab === 'editor' ? 'var(--card-shadow)' : 'none'
              }}
            >
              Content Composer
            </button>
            <button
              onClick={() => setActiveTab('copilot')}
              style={{
                padding: '6px 14px',
                fontSize: '0.84rem',
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: activeTab === 'copilot' ? 'var(--rc-teal-accent)' : 'transparent',
                color: activeTab === 'copilot' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} />
              <span>Agentic Co-Pilot</span>
            </button>
          </div>

          <button
            onClick={handleNewPost}
            className="btn-primary"
            style={{
              padding: '7px 14px',
              fontSize: '0.82rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Plus size={15} />
            <span>New Post</span>
          </button>

          <button
            onClick={handleLogout}
            title="Sign out of Admin Portal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              fontSize: '0.82rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 100,
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--rc-teal-accent)',
          borderRadius: 10,
          padding: '12px 20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <CheckCircle size={18} color="var(--rc-teal-accent)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Portal Viewport */}
      <main className="rc-container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        {/* ==================================================================== */}
        {/* TAB 1: ARTICLES DIRECTORY */}
        {/* ==================================================================== */}
        {activeTab === 'directory' && (
          <div>
            {/* Stats Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 24
            }}>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '20px 24px'
              }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Articles</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                  {stats.total}
                </div>
              </div>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '20px 24px'
              }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Published (Public)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10b981', marginTop: 4 }}>
                  {stats.published}
                </div>
              </div>
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                padding: '20px 24px'
              }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Agency Drafts (Hidden)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b', marginTop: 4 }}>
                  {stats.drafts}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 20
            }}>
              {/* Status Filter Chips */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { key: 'all', label: 'All Articles' },
                  { key: 'published', label: 'Published Only' },
                  { key: 'draft', label: 'Drafts Only' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilterStatus(item.key)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      borderRadius: 20,
                      border: '1px solid',
                      borderColor: filterStatus === item.key ? 'var(--rc-teal-accent)' : 'var(--border-subtle)',
                      backgroundColor: filterStatus === item.key ? 'rgba(20, 184, 166, 0.1)' : 'var(--bg-surface)',
                      color: filterStatus === item.key ? 'var(--rc-teal-accent)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', width: 280 }}>
                <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, tag..."
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 8,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Articles Table / Cards */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              overflow: 'hidden'
            }}>
              {loadingPosts ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  Loading article database...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div style={{ padding: 48, textAlign: 'center' }}>
                  <FileText size={36} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 6 }}>No articles found</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 18 }}>
                    Create your first perspective manually or use the Agentic Co-Pilot to draft one.
                  </p>
                  <button onClick={handleNewPost} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
                    Create First Post
                  </button>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-canvas)' }}>
                      <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Article</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '14px 16px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem', marginBottom: 4 }}>
                            {post.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <code>/blog/{post.slug}</code>
                            {post.featured && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--rc-teal-accent)', fontWeight: 700 }}>&bull; Featured</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '16px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {post.category}
                        </td>
                        <td style={{ padding: '16px 16px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '3px 9px',
                            borderRadius: 12,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: post.status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: post.status === 'published' ? '#10b981' : '#f59e0b'
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: post.status === 'published' ? '#10b981' : '#f59e0b' }} />
                            {post.status === 'published' ? 'Live Published' : 'Hidden Draft'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {post.date || 'Recent'}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <button
                              onClick={() => handleEditPost(post)}
                              title="Edit Article"
                              style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                border: '1px solid var(--border-subtle)',
                                backgroundColor: 'var(--bg-canvas)',
                                color: 'var(--text-primary)',
                                fontSize: '0.8rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                cursor: 'pointer'
                              }}
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>

                            {post.status === 'published' && (
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                title="View on live website"
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: 6,
                                  border: '1px solid var(--border-subtle)',
                                  backgroundColor: 'var(--bg-canvas)',
                                  color: 'var(--rc-teal-accent)',
                                  fontSize: '0.8rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4
                                }}
                              >
                                <ExternalLink size={13} />
                                <span>View</span>
                              </Link>
                            )}

                            <button
                              onClick={() => handleDeletePost(post.id, post.title)}
                              title="Delete permanently"
                              style={{
                                padding: '6px 8px',
                                borderRadius: 6,
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                backgroundColor: 'transparent',
                                color: '#ef4444',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: CONTENT COMPOSER & SPLIT-SCREEN PREVIEW */}
        {/* ==================================================================== */}
        {activeTab === 'editor' && (
          <div>
            {/* Top Editor Action Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 12,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: status === 'published' ? '#10b981' : '#f59e0b'
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: status === 'published' ? '#10b981' : '#f59e0b' }} />
                  {status === 'published' ? 'Status: Live Published' : 'Status: Hidden Agency Draft'}
                </span>
                {currentId && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Editing: <code>{slug || 'post'}</code>
                  </span>
                )}
              </div>

              {/* Viewport Toggler & Save Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Viewport switcher */}
                <div style={{
                  display: 'flex',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 8,
                  padding: 2
                }}>
                  <button
                    onClick={() => setDeviceView('desktop')}
                    style={{
                      padding: '6px 10px',
                      border: 'none',
                      borderRadius: 6,
                      backgroundColor: deviceView === 'desktop' ? 'var(--bg-canvas)' : 'transparent',
                      color: deviceView === 'desktop' ? 'var(--rc-teal-accent)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title="Desktop Preview"
                  >
                    <Monitor size={15} />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    style={{
                      padding: '6px 10px',
                      border: 'none',
                      borderRadius: 6,
                      backgroundColor: deviceView === 'mobile' ? 'var(--bg-canvas)' : 'transparent',
                      color: deviceView === 'mobile' ? 'var(--rc-teal-accent)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title="Smartphone Preview"
                  >
                    <Smartphone size={15} />
                  </button>
                </div>

                <button
                  onClick={() => handleSavePost('draft')}
                  disabled={saving}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderRadius: 8,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  Save as Draft
                </button>

                <button
                  onClick={() => handleSavePost('published')}
                  disabled={saving}
                  className="btn-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Send size={14} />
                  <span>{status === 'published' ? 'Update Published' : 'Publish Live Now'}</span>
                </button>
              </div>
            </div>

            {/* Split Screen Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
              gap: 24,
              alignItems: 'start'
            }}>
              {/* LEFT COLUMN: Post Inputs & Marketer SEO Controls */}
              <div style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 14,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20
              }}>
                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                    Article Headline / Title <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!currentId) {
                        setSlug(e.target.value.toLowerCase().trim().replace(/[\s\W-]+/g, '-'));
                      }
                    }}
                    placeholder="e.g. Architecting Digital Experiences: Why Performance Is the Ultimate Differentiator"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Slug & Category Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                      Permalink Slug
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        padding: '10px 10px',
                        backgroundColor: 'var(--bg-canvas)',
                        border: '1px solid var(--border-subtle)',
                        borderRight: 'none',
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)'
                      }}>
                        /blog/
                      </span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[\s\W-]+/g, '-'))}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-canvas)',
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    >
                      {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags & Estimated Read Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Performance, Web Architecture, SEO"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                      Reading Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="4 min read"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Cover Image URL */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Featured Cover Image URL (Optional)
                    </label>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Supports direct URLs or /images/...
                    </span>
                  </div>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /images/blog/cover.jpg"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  {coverImage && (
                    <div style={{ marginTop: 8, borderRadius: 6, overflow: 'hidden', maxHeight: 120, border: '1px solid var(--border-subtle)' }}>
                      <img src={coverImage} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>

                {/* Excerpt (Executive Summary) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
                    Excerpt / Executive Summary
                  </label>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 2-3 sentence overview that appears on blog cards and social sharing previews..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Markdown Content Body */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Article Body (Markdown Supported)
                    </label>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Supports H3 (###), lists (-), bold (**), quotes (&gt;), images (![alt](url))
                    </span>
                  </div>
                  <textarea
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="### The First Sub-Second Impression&#10;&#10;Write authoritative marketing and technical perspectives here..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '0.86rem',
                      lineHeight: 1.6,
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Collapsible Digital Marketing Agency SEO Suite */}
                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Globe size={16} color="var(--rc-teal-accent)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Agency SEO & Social Card Engine
                    </span>
                  </div>

                  {/* Focus Keyword */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>
                      Target Focus Keyword
                    </label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. Technical SEO Architecture"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 6,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  {/* SEO Meta Title */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>SEO Meta Title</label>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: seoTitleLength > 60 ? '#ef4444' : (seoTitleLength >= 45 ? '#10b981' : 'var(--text-muted)')
                      }}>
                        {seoTitleLength} / 60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Custom title tag for search engines..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 6,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  {/* SEO Meta Description */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Meta Description</label>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: seoDescLength > 160 ? '#ef4444' : (seoDescLength >= 130 ? '#10b981' : 'var(--text-muted)')
                      }}>
                        {seoDescLength} / 155 chars
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Optimized snippet for Google search result preview..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 6,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: '0.84rem',
                        resize: 'none'
                      }}
                    />
                  </div>

                  {/* Live Google SERP Snippet Preview */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                      Live Google Search Snippet Preview
                    </div>
                    <div style={{
                      padding: 12,
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ fontSize: '0.78rem', color: '#1a0dab', darkColor: '#8ab4f8', marginBottom: 2 }}>
                        https://roughclick.com &rsaquo; blog &rsaquo; {slug || 'perspective'}
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a0dab', marginBottom: 4, textDecoration: 'underline' }}>
                        {seoTitle || title || 'Article Headline'} | RoughClick Digital
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {seoDescription || excerpt || 'Article description will display here in search engine results...'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Live Split-Screen Viewport Preview */}
              <div style={{ position: 'sticky', top: 90 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Live Preview &bull; {deviceView === 'desktop' ? 'Desktop View' : 'Mobile View'}
                  </span>
                  <span className="rc-badge" style={{ fontSize: '0.7rem' }}>Real-Time Render</span>
                </div>

                {/* Device Frame */}
                <div style={{
                  maxWidth: deviceView === 'mobile' ? 380 : '100%',
                  margin: deviceView === 'mobile' ? '0 auto' : '0',
                  backgroundColor: 'var(--bg-surface)',
                  border: deviceView === 'mobile' ? '8px solid var(--border-subtle)' : '1px solid var(--border-subtle)',
                  borderRadius: deviceView === 'mobile' ? 32 : 14,
                  padding: deviceView === 'mobile' ? '24px 18px' : 28,
                  boxShadow: 'var(--card-shadow)',
                  maxHeight: 'calc(100vh - 160px)',
                  overflowY: 'auto'
                }}>
                  {/* Article Meta Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    <span className="rc-badge" style={{ fontSize: '0.72rem' }}>{category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{readTime}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>&bull;</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By {author}</span>
                  </div>

                  {/* Preview Title */}
                  <h1 style={{
                    fontSize: deviceView === 'mobile' ? '1.3rem' : '1.8rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: 'var(--text-primary)',
                    marginBottom: 14
                  }}>
                    {title || 'Article Headline Will Render Here'}
                  </h1>

                  {/* Preview Cover Image */}
                  {coverImage && (
                    <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', maxHeight: 180 }}>
                      <img src={coverImage} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}

                  {/* Preview Excerpt */}
                  {excerpt && (
                    <div style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: 'var(--rc-teal-accent)',
                      borderLeft: '3px solid var(--rc-teal-accent)',
                      paddingLeft: 12,
                      marginBottom: 20
                    }}>
                      {excerpt}
                    </div>
                  )}

                  {/* Rendered Body Preview */}
                  <div style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {content || 'Article markdown body will render here in real time as you write or generate...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: AGENTIC AI PUBLISHING CO-PILOT */}
        {/* ==================================================================== */}
        {activeTab === 'copilot' && (
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              padding: '36px 32px',
              boxShadow: 'var(--card-shadow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span className="rc-badge" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--rc-teal-accent)' }}>
                  <Sparkles size={14} style={{ marginRight: 6 }} />
                  Agentic AI Publishing Co-Pilot
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Tailored for Digital Marketing Agencies
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                Autonomous Perspective Drafting
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 28 }}>
                Input a strategic topic or focus keyword. The Agentic Co-Pilot will autonomously research, structure, draft the full markdown article, compose Google-optimized meta tags, generate JSON-LD schema, and populate the Content Composer for your review.
              </p>

              {copilotNote && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  backgroundColor: 'rgba(20, 184, 166, 0.1)',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  color: 'var(--rc-teal-accent)',
                  fontSize: '0.84rem',
                  marginBottom: 20
                }}>
                  {copilotNote}
                </div>
              )}

              <form onSubmit={handleGenerateWithAgent} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                    Strategic Topic / Core Angle <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={copilotTopic}
                    onChange={(e) => setCopilotTopic(e.target.value)}
                    required
                    placeholder="e.g. Why Sub-Second Core Web Vitals Dictate B2B Conversion Architecture"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 8,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-primary)',
                      fontSize: '0.94rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                      Content Category
                    </label>
                    <select
                      value={copilotCategory}
                      onChange={(e) => setCopilotCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    >
                      {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                      Target Focus Keyword
                    </label>
                    <input
                      type="text"
                      value={copilotKeyword}
                      onChange={(e) => setCopilotKeyword(e.target.value)}
                      placeholder="e.g. Core Web Vitals Conversion"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                      Target Reader Persona
                    </label>
                    <input
                      type="text"
                      value={copilotAudience}
                      onChange={(e) => setCopilotAudience(e.target.value)}
                      placeholder="B2B Founders & Marketing Directors"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                      Editorial Voice & Tone
                    </label>
                    <input
                      type="text"
                      value={copilotTone}
                      onChange={(e) => setCopilotTone(e.target.value)}
                      placeholder="Authoritative, analytical, performance-focused"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'var(--bg-canvas)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Optional Gemini API Key */}
                <div style={{
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px dashed var(--border-subtle)'
                }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                    Optional Custom Gemini API Key (Overrides Default Engine)
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIzaSy... (Leave blank to use built-in Agentic Engine)"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem'
                    }}
                  />
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Works out-of-the-box in local development with the built-in heuristic agentic engine.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="btn-primary"
                  style={{
                    padding: '14px',
                    fontSize: '0.96rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    cursor: generating ? 'not-allowed' : 'pointer',
                    opacity: generating ? 0.75 : 1,
                    marginTop: 6
                  }}
                >
                  <Sparkles size={18} />
                  <span>{generating ? 'Agentic Engine Drafting Article...' : 'Generate Full Perspective with AI'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
