'use client';

import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';

export default function ArticleShareBar({ slug, title }) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://roughclick.com/blog/${slug}`;

  const handleCopy = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href || fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="article-share-group">
      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4, marginRight: 2 }}>
        <Share2 size={13} /> Share:
      </span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="article-share-btn"
        title="Share on LinkedIn"
      >
        <span>LinkedIn</span>
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${fullUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="article-share-btn"
        title="Share on WhatsApp"
      >
        <span>WhatsApp</span>
      </a>

      <button
        onClick={handleCopy}
        type="button"
        className="article-share-btn"
        title="Copy article link"
        style={{ border: '1px solid var(--border-subtle)' }}
      >
        {copied ? (
          <>
            <Check size={12} color="var(--color-accent)" />
            <span style={{ color: 'var(--color-accent)' }}>Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon size={12} />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
