'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES } from '@/data/blogs';
import { Sparkles, Eye, Send, Smartphone, Monitor, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AdminBlogPage() {
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' or 'mobile'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Website Services');
  const [readTime, setReadTime] = useState('4 min read');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [recentPosts, setRecentPosts] = useState([
    {
      id: 'post-init-1',
      title: 'Architecting Digital Experiences: Why Performance Is the Ultimate Brand Differentiator',
      category: 'Website Services',
      status: 'Published'
    },
    {
      id: 'post-init-2',
      title: 'Connecting the Dots: How a Unified Digital Presence Accelerates Business Growth',
      category: 'Complete Digital Presence',
      status: 'Published'
    }
  ]);
  const [publishedAlert, setPublishedAlert] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      category: category,
      status: 'Published'
    };

    setRecentPosts([newEntry, ...recentPosts]);
    setPublishedAlert(true);
    setTimeout(() => setPublishedAlert(false), 4000);
  };

  return (
    <section className="modern-section" style={{ paddingTop: 'calc(var(--header-height) + 24px)' }}>
      <div className="rc-container">
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: 20 }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Return to Public Blog Portal</span>
          </Link>
        </div>

        {/* Intro banner */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: '24px 28px',
          marginBottom: 32,
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="rc-badge">CMS Interface Prototype</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--rc-teal-accent)', fontWeight: 700 }}>
                Desktop & Mobile Publishing Workflow
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: 6 }}>
              Editorial Content Dashboard
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: 680 }}>
              This authoring environment demonstrates how team members can write, format, live-preview, and publish perspectives from desktop computers or smartphones. Architecture is structured for direct connection to Supabase / Headless CMS.
            </p>
          </div>

          {/* Viewport Preview Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: 'var(--bg-subtle)',
            padding: 4,
            borderRadius: 8,
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: deviceView === 'desktop' ? 'var(--rc-deep-teal)' : 'transparent',
                color: deviceView === 'desktop' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              <Monitor size={15} />
              <span>Desktop View</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: deviceView === 'mobile' ? 'var(--rc-deep-teal)' : 'transparent',
                color: deviceView === 'mobile' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              <Smartphone size={15} />
              <span>Mobile View</span>
            </button>
          </div>
        </div>

        {/* Alert on Publish */}
        {publishedAlert && (
          <div style={{
            backgroundColor: 'var(--rc-teal-light)',
            border: '1px solid var(--rc-teal-accent)',
            color: 'var(--text-primary)',
            padding: '14px 20px',
            borderRadius: 8,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <CheckCircle size={20} style={{ color: 'var(--rc-teal-accent)' }} />
            <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>
              Article staged & published successfully to editorial queue!
            </span>
          </div>
        )}

        {/* Workspace: Editor + Live Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: deviceView === 'mobile' ? '1fr 380px' : 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 28,
          alignItems: 'flex-start'
        }}>
          {/* Authoring Form */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14,
            padding: 24,
            boxShadow: 'var(--card-shadow)'
          }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: 18 }}>
              Compose Article
            </h2>

            <form onSubmit={handlePublish}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Article Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Web Architecture for Business Growth"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem'
                    }}
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c} style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short brief of this article..."
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Article Content (Markdown or Text)
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type the full article content here..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 6,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-modern-primary"
                style={{ width: '100%', padding: '13px' }}
              >
                <span>Publish Article (CMS Stage)</span>
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Live Preview Pane (Responsive) */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14,
            padding: deviceView === 'mobile' ? '20px 16px' : '24px',
            boxShadow: 'var(--card-shadow)',
            maxWidth: deviceView === 'mobile' ? '380px' : '100%',
            margin: deviceView === 'mobile' ? '0 auto' : '0'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 12,
              marginBottom: 16
            }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--rc-teal-accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={15} />
                <span>Live Reader Preview ({deviceView})</span>
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {deviceView === 'mobile' ? '375px Device Frame' : 'Full Canvas'}
              </span>
            </div>

            {/* Article Canvas */}
            <div style={{ minHeight: 340 }}>
              <span className="rc-badge" style={{ fontSize: '0.68rem', marginBottom: 10 }}>
                {category}
              </span>
              <h3 style={{
                fontSize: deviceView === 'mobile' ? '1.25rem' : '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: 10,
                lineHeight: 1.3
              }}>
                {title.trim() || 'Untitled Perspective'}
              </h3>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                RoughClick Editorial • Just Now • {readTime}
              </div>

              {excerpt.trim() && (
                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderLeft: '3px solid var(--rc-teal-accent)',
                  padding: '10px 14px',
                  borderRadius: '0 6px 6px 0',
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)',
                  marginBottom: 16
                }}>
                  {excerpt}
                </div>
              )}

              <div style={{
                fontSize: '0.88rem',
                color: 'var(--text-body)',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap'
              }}>
                {content.trim() || 'Type content in the editor to see instant formatted rendering...'}
              </div>
            </div>

            {/* Published History Queue */}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.94rem', color: 'var(--text-primary)', marginBottom: 12 }}>
                Recent Editorial Queue
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {recentPosts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 6,
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{p.category}</div>
                    </div>
                    <span className="rc-badge" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
