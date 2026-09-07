'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND_CONFIG } from '@/data/config';

export default function FloatingActionButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const rawPhone = BRAND_CONFIG?.contact?.WHATSAPP_NUMBER || '919000000000';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello RoughClick Digital, I would like to inquire about your services.')}`;

  return (
    <aside aria-label="Quick Actions" className="corner-floating-container">
      {/* 1. MOVE TO TOP BUTTON (conditionally visible on scroll) */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`corner-btn corner-btn-scrolltop ${showScrollTop ? 'is-visible' : 'is-hidden'}`}
        aria-label="Scroll back to top"
        title="Scroll to top"
        tabIndex={showScrollTop ? 0 : -1}
      >
        <ArrowUp className="corner-btn-icon corner-icon-arrow" size={20} strokeWidth={2.4} />
        <span className="corner-btn-tooltip">Back to Top</span>
      </button>

      {/* 2. WHATSAPP BUTTON (always accessible) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="corner-btn corner-btn-whatsapp"
        aria-label="Chat with RoughClick Digital on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Crisp official WhatsApp SVG */}
        <svg
          className="corner-btn-icon corner-icon-whatsapp"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
        </svg>
        <span className="corner-btn-tooltip">Chat on WhatsApp</span>
        <span className="whatsapp-ping-ring" aria-hidden="true" />
      </a>
    </aside>
  );
}
