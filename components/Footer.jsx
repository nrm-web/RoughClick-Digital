'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/data/config';
import { MapPin, Mail, Phone, MessageCircle, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mockup-footer">
      <div className="rc-container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Logo */}
          <div>
            <Link href="/" aria-label="RoughClick Digital Home">
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
                <a href={`mailto:${BRAND_CONFIG.contact.emailPlaceholder || 'contact@roughclick.com'}`} style={{ color: 'inherit' }}>
                  {BRAND_CONFIG.contact.emailPlaceholder || '[Email Address]'}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Phone size={15} style={{ color: 'var(--footer-accent)', flexShrink: 0 }} />
                <a href={`tel:${BRAND_CONFIG.contact.phonePlaceholder || '+91'}`} style={{ color: 'inherit' }}>
                  {BRAND_CONFIG.contact.phonePlaceholder || '[Phone Number]'}
                </a>
              </div>
              <div style={{ marginTop: 6 }}>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumberPlaceholder || '919000000000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp &rarr;</span>
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
