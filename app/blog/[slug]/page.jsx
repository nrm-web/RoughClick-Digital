import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/data/blogs';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | RoughClick Digital`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author]
    }
  };
}

export default function BlogArticlePage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedArticles = BLOG_POSTS.filter(
    (p) => post.relatedSlugs?.includes(p.slug) || (p.category === post.category && p.slug !== post.slug)
  ).slice(0, 2);

  return (
    <article className="modern-section" style={{ paddingTop: 'calc(var(--header-height) + 30px)' }}>
      <div className="rc-container-narrow">
        {/* Back Link */}
        <div style={{ marginBottom: 24 }}>
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
            <span>Back to All Perspectives</span>
          </Link>
        </div>

        {/* Article Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <span className="rc-badge">{post.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={14} /> {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Title & Author */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 20
        }}>
          {post.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          padding: '16px 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: 36
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: 'var(--rc-teal-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rc-teal-accent)'
            }}>
              <User size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {post.author}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                RoughClick Digital Editorial
              </div>
            </div>
          </div>

          {/* Share Placeholders */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Share2 size={14} /> Share:
            </span>
            <span style={{
              fontSize: '0.74rem',
              padding: '4px 10px',
              borderRadius: 4,
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)'
            }}>
              LinkedIn
            </span>
            <span style={{
              fontSize: '0.74rem',
              padding: '4px 10px',
              borderRadius: 4,
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)'
            }}>
              WhatsApp
            </span>
          </div>
        </div>

        {/* Lead Excerpt Callout */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderLeft: '4px solid var(--rc-teal-accent)',
          padding: '18px 22px',
          borderRadius: '0 8px 8px 0',
          marginBottom: 36,
          fontSize: '1.05rem',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          fontWeight: 500
        }}>
          {post.excerpt}
        </div>

        {/* Article Body */}
        <div style={{
          fontSize: '1.02rem',
          lineHeight: 1.8,
          color: 'var(--text-body)'
        }}>
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    marginTop: 36,
                    marginBottom: 14,
                    lineHeight: 1.3
                  }}
                >
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').map((item) => item.replace('- ', ''));
              return (
                <ul key={index} style={{ margin: '18px 0', paddingLeft: 24, listStyle: 'disc' }}>
                  {items.map((it, iIdx) => (
                    <li key={iIdx} style={{ marginBottom: 8 }}>
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }

            if (/^\d+\.\s/.test(trimmed)) {
              const items = trimmed.split('\n');
              return (
                <ol key={index} style={{ margin: '18px 0', paddingLeft: 24, listStyle: 'decimal' }}>
                  {items.map((it, iIdx) => (
                    <li key={iIdx} style={{ marginBottom: 8 }}>
                      {it.replace(/^\d+\.\s/, '')}
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={index} style={{ marginBottom: 20 }}>
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <Tag size={15} style={{ color: 'var(--rc-teal-accent)' }} />
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

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: 50, paddingTop: 36, borderTop: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 20 }}>
              Related Perspectives
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {relatedArticles.map((rel) => (
                <div key={rel.slug} className="modern-card">
                  <div style={{ fontSize: '0.76rem', color: 'var(--rc-teal-accent)', fontWeight: 700, marginBottom: 8 }}>
                    {rel.category}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
                    <Link href={`/blog/${rel.slug}`} style={{ color: 'inherit' }}>
                      {rel.title}
                    </Link>
                  </h4>
                  <Link
                    href={`/blog/${rel.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--rc-teal-accent)'
                    }}
                  >
                    <span>Read Perspective</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
