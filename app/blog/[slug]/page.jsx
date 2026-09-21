import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/db';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ArticleShareBar from '@/components/ArticleShareBar';
import { StartProjectButton } from '@/components/QuickBookingModal';
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  ArrowRight,
  Sparkles
} from 'lucide-react';

function WhatsAppIcon({ size = 16, className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'translateY(-0.5px)', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article Not Found | RoughClick Digital' };
  }

  const title = post.seoTitle || `${post.title} | RoughClick Digital`;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.tags || [],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author || 'RoughClick Editorial']
    }
  };
}

/**
 * Format inline markdown: bold, italic, code tags
 */
function renderFormattedInline(text) {
  if (!text) return text;
  
  // Split on bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--text-heading)', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle inline code `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            padding: '2px 6px',
            borderRadius: 4,
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.88em',
            color: 'var(--color-accent)'
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default async function BlogArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound(); // Drafts or non-existent slugs will 404 for public visitors

  const allPublished = await getPublishedPosts();
  const relatedArticles = allPublished
    .filter((p) => p.slug !== post.slug && (p.category === post.category || post.relatedSlugs?.includes(p.slug)))
    .slice(0, 2);

  // Structured Schema for Google Search Console & Rich Snippets
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    keywords: post.tags ? post.tags.join(', ') : '',
    articleSection: post.category,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'RoughClick Editorial',
      url: 'https://roughclick.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'RoughClick Digital',
      url: 'https://roughclick.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://roughclick.com/roughclick-modern-light.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://roughclick.com/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://roughclick.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://roughclick.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://roughclick.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Google Rich Snippet Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        {/* ================================================================== */}
        {/* EDITORIAL HERO SECTION */}
        {/* ================================================================== */}
        <section className="article-hero-wrap">
          <div className="rc-container-narrow">
            {/* Breadcrumb */}
            <Link href="/blog" className="article-breadcrumb">
              <ArrowLeft size={15} />
              <span>Back to Knowledge Hub & Perspectives</span>
            </Link>

            {/* Category & Meta Pills */}
            <div className="article-meta-pill-bar">
              <span className="rc-badge">{post.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={13} />
                  <span>{post.date}</span>
                </span>
                <span>&bull;</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={13} />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="article-hero-title">
              {post.title}
            </h1>

            {/* Lead Excerpt */}
            {post.excerpt && (
              <div className="article-lead-excerpt">
                {post.excerpt}
              </div>
            )}

            {/* Author Bar with Interactive Social Sharing */}
            <div className="article-author-card">
              <div className="article-author-info">
                <div className="article-avatar-circle">
                  <User size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3 }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    RoughClick Digital Editorial
                  </div>
                </div>
              </div>

              <ArticleShareBar slug={post.slug} title={post.title} />
            </div>

            {/* Featured Cover Image (if set) */}
            {post.coverImage && (
              <div style={{
                marginTop: 32,
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)'
              }}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  style={{
                    width: '100%',
                    maxHeight: '480px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* ================================================================== */}
        {/* ARTICLE BODY & TYPOGRAPHY */}
        {/* ================================================================== */}
        <section className="rc-container-narrow">
          <div className="article-body-content">
            {post.content.split('\n\n').map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('![') && trimmed.includes('](')) {
                const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  const alt = match[1];
                  const src = match[2];
                  return (
                    <figure key={index} style={{ margin: '2.5rem 0', textAlign: 'center' }}>
                      <img
                        src={src}
                        alt={alt || 'Article visual'}
                        style={{
                          width: '100%',
                          maxHeight: '520px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '1px solid var(--border-subtle)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                        }}
                      />
                      {alt && (
                        <figcaption style={{
                          marginTop: '8px',
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                          fontStyle: 'italic'
                        }}>
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
              }

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={index}>
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={index}>
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }

              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={index}>
                    {renderFormattedInline(trimmed.replace(/^>\s*/, ''))}
                  </blockquote>
                );
              }

              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').map((item) => item.replace(/^- \s*/, '')).filter(Boolean);
                return (
                  <ul key={index}>
                    {items.map((it, iIdx) => (
                      <li key={iIdx}>
                        {renderFormattedInline(it)}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed.split('\n').filter(Boolean);
                return (
                  <div key={index} style={{ margin: '2.2rem 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {items.map((it, iIdx) => {
                      const clean = it.replace(/^\d+\.\s*/, '');
                      return (
                        <div key={iIdx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                          <span style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-accent-light)',
                            color: 'var(--color-accent)',
                            border: '1.5px solid var(--color-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            marginTop: 3
                          }}>
                            {iIdx + 1}
                          </span>
                          <div style={{ flex: 1, lineHeight: 1.75 }}>
                            {renderFormattedInline(clean)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <p key={index}>
                  {renderFormattedInline(trimmed)}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
              paddingTop: 24,
              borderTop: '1px solid var(--border-subtle)',
              marginBottom: 36
            }}>
              <Tag size={15} style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Tags:</span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.78rem',
                    padding: '4px 12px',
                    borderRadius: 999,
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Social Share Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 12
          }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-heading)' }}>
              Found this perspective insightful? Share it:
            </span>
            <ArticleShareBar slug={post.slug} title={post.title} />
          </div>

          {/* Agency Conversion CTA Banner */}
          <div className="article-cta-box">
            <span className="rc-badge" style={{ marginBottom: 12, backgroundColor: 'rgba(0, 210, 160, 0.15)', color: '#00D2A0' }}>
              <Sparkles size={13} style={{ marginRight: 5 }} />
              Bespoke Engineering & Digital Presence
            </span>
            <h3 className="article-cta-title">
              Ready to Accelerate Your Digital Architecture?
            </h3>
            <p className="article-cta-desc">
              Discuss your web performance, local profile visibility, or custom digital platform directly with RoughClick Digital engineers.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <StartProjectButton
                className="btn-modern-primary"
                style={{ padding: '12px 22px', fontSize: '0.9rem' }}
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </StartProjectButton>
              <a
                href="https://wa.me/916379166158?text=Hello%20RoughClick%20Digital,%20I%20read%20your%20perspective%20and%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-secondary"
                style={{ padding: '12px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 7, lineHeight: 1 }}
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* RELATED PERSPECTIVES SECTION */}
        {/* ================================================================== */}
        {relatedArticles.length > 0 && (
          <section className="modern-section bg-subtle" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
            <div className="rc-container-medium">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                  <span className="rc-badge" style={{ marginBottom: 8 }}>Further Reading</span>
                  <h3 style={{ fontSize: '1.45rem', color: 'var(--text-heading)' }}>
                    Related Perspectives
                  </h3>
                </div>
                <Link
                  href="/blog"
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>View All Perspectives</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {relatedArticles.map((rel) => (
                  <div key={rel.slug} className="modern-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                          {rel.category}
                        </span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h4 style={{ fontSize: '1.12rem', color: 'var(--text-heading)', marginBottom: 10, lineHeight: 1.4 }}>
                        <Link href={`/blog/${rel.slug}`} style={{ color: 'inherit' }}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 18 }}>
                        {rel.excerpt}
                      </p>
                    </div>

                    <div style={{
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rel.date}</span>
                      <Link
                        href={`/blog/${rel.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: 'var(--color-accent)'
                        }}
                      >
                        <span>Read Article</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
