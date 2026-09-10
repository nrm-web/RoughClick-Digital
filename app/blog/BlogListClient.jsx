'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES } from '@/data/blogs';
import { Search, ArrowRight, BookOpen, Clock, User, Tag, Sparkles } from 'lucide-react';

export default function BlogListClient({ initialPosts = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Featured article is the first marked featured, or the first article
  const featuredArticle = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [initialPosts, searchTerm, selectedCategory]);

  return (
    <>
      {/* Blog Hero */}
      <section className="modern-hero" style={{ paddingBottom: '2rem' }}>
        <div className="hero-ambient-glow orb-1" aria-hidden="true" />
        <div className="hero-ambient-glow orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />
        <div className="rc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 780 }}>
            <span className="rc-badge" style={{ marginBottom: 14 }}>
              Knowledge Hub & Insights
            </span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)' }}>
              Perspectives on <span className="accent">Tech, Design & Digital Presence</span>
            </h1>
            <p className="hero-subcopy" style={{ fontSize: '1.08rem' }}>
              Practical insights on web architecture, social media consistency, local business profile optimization, and integrated digital strategies.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 10,
            paddingTop: 20,
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: 540 }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search perspectives by keyword or topic..."
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: 8,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  boxShadow: 'var(--card-shadow)'
                }}
              />
            </div>

            {/* Category Buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 9999,
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: isActive ? 'var(--color-accent)' : 'var(--bg-card)',
                      color: isActive ? 'var(--btn-pill-color)' : 'var(--text-heading)',
                      border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--border-card)'}`
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight (shown if viewing All and no search) */}
      {selectedCategory === 'All' && searchTerm.trim() === '' && featuredArticle && (
        <section className="modern-section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
          <div className="rc-container">
            <div 
              className="featured-blog-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: 'clamp(2rem, 4vw, 3.2rem)',
                boxShadow: 'var(--card-shadow)',
                position: 'relative',
                overflow: 'hidden'
              }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 16
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
                  <span className="rc-badge">Featured Perspective</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} /> {featuredArticle.readTime}
                  </span>
                  <span>{featuredArticle.date}</span>
                </div>
              </div>

              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', color: 'var(--text-heading)', marginBottom: 16 }}>
                <Link href={`/blog/${featuredArticle.slug}`} style={{ color: 'inherit' }}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p style={{ fontSize: '1.02rem', color: 'var(--text-body)', lineHeight: 1.75, maxWidth: 840, marginBottom: 24 }}>
                {featuredArticle.excerpt}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                paddingTop: 18,
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <User size={15} style={{ color: 'var(--color-accent)' }} />
                  <span>By {featuredArticle.author}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{featuredArticle.category}</span>
                </div>

                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="btn-modern-primary"
                  style={{ fontSize: '0.86rem', padding: '10px 20px' }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Article Grid */}
      <section className="modern-section bg-subtle" style={{ paddingTop: '2.5rem', paddingBottom: 'clamp(5rem, 8vw, 7.5rem)' }}>
        <div className="rc-container">
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
              {selectedCategory === 'All' ? 'All Perspectives' : `${selectedCategory} Articles`}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 10 }}>
                ({filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'})
              </span>
            </h3>
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 14,
              padding: '48px 24px',
              textAlign: 'center',
              border: '1px solid var(--border-card)'
            }}>
              <BookOpen size={40} style={{ color: 'var(--color-accent)', margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--text-heading)' }}>No Articles Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No perspectives match "{searchTerm}". Try another keyword or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="btn-modern-secondary"
                style={{ marginTop: 16, fontSize: '0.84rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-3col-grid">
              {filteredArticles.map((article) => (
                <article key={article.slug} className="modern-card">
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      marginBottom: 10
                    }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', marginBottom: 12, lineHeight: 1.4 }}>
                      <Link href={`/blog/${article.slug}`} style={{ color: 'inherit' }}>
                        {article.title}
                      </Link>
                    </h4>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 18 }}>
                      {article.excerpt}
                    </p>
                  </div>

                  <div>
                    {article.tags && article.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                        {article.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              borderRadius: 4,
                              backgroundColor: 'var(--bg-canvas)',
                              color: 'var(--text-muted)',
                              border: '1px solid var(--border-subtle)'
                            }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 12,
                      borderTop: '1px solid var(--border-subtle)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>{article.date}</span>
                      <Link
                        href={`/blog/${article.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          color: 'var(--color-accent)',
                          fontWeight: 700,
                          fontSize: '0.82rem'
                        }}
                      >
                        <span>Read</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
