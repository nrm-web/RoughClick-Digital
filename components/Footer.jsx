'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/data/config';
import { MapPin, Mail, Phone, Linkedin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

function WhatsAppIcon({ size = 16, className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'translateY(-0.5px)', flexShrink: 0, ...style }}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mockup-footer">
      <div className="rc-container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Logo */}
          <div>
            <Link
              href="/"
              aria-label="RoughClick Digital Home"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('rc-trigger-preloader'));
                }
              }}
            >
              <img
                src="/brand/roughclick-modern-dark.svg"
                alt="RoughClick Digital"
                className="logo-concept-modern"
                style={{ height: 44, width: 'auto', marginBottom: 14 }}
              />
              <img
                src="/brand/roughclick-luxury-dark.svg"
                alt="RoughClick Digital"
                className="logo-concept-luxury"
                style={{ height: 44, width: 'auto', marginBottom: 14 }}
                onError={(e) => { e.currentTarget.src = '/brand/roughclick-luxury-dark.png'; }}
              />
            </Link>
            <p style={{ fontSize: '0.78rem', color: 'var(--footer-text)', lineHeight: 1.6, maxWidth: 240 }}>
              Turning ideas into purposeful digital experiences designed around your business.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-nav-list">
              <li><Link href="/services#website-development">Website Development</Link></li>
              <li><Link href="/services#custom-applications">Custom Applications</Link></li>
              <li><Link href="/services#social-media-content">Social Media Content</Link></li>
              <li><Link href="/services#social-media-management">Social Media Management</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-items">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <MapPin size={15} style={{ color: 'var(--footer-accent)', flexShrink: 0, marginTop: 3 }} />
                <span>{BRAND_CONFIG.contact.officeLocation || 'Coimbatore, Tamil Nadu, India'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={15} style={{ color: 'var(--footer-accent)', flexShrink: 0 }} />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} style={{ color: 'inherit' }}>
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={15} style={{ color: 'var(--footer-accent)', flexShrink: 0 }} />
                <a href={`tel:${BRAND_CONFIG.contact.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit' }}>
                  {BRAND_CONFIG.contact.phone}
                </a>
              </div>
              <div style={{ marginTop: 6 }}>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumberPlaceholder || '919000000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                >
                  <WhatsAppIcon size={16} />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight size={13} strokeWidth={2.4} className="whatsapp-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h4 className="footer-col-title">Follow Us</h4>
            <div className="footer-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-icon" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-icon" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-icon" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle-icon" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {currentYear} {BRAND_CONFIG.name}. All rights reserved.
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--footer-text)' }}>
            {BRAND_CONFIG.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
