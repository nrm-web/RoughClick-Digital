'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobile = (open) => {
    setMobileOpen(open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className={`mockup-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="rc-container header-flex-wrap">
          {/* Brand Logo & Name — Theme Aware: Modern in Light Mode, Luxury in Dark Mode */}
          <Link href="/" className="header-brand-logo" aria-label="RoughClick Digital">
            <div className="header-logo-image-box">
              <img
                src="/brand/roughclick-modern-light.svg"
                alt="RoughClick Digital"
                className="logo-concept-modern"
              />
              <img
                src="/brand/roughclick-luxury-dark.svg"
                alt="RoughClick Digital"
                className="logo-concept-luxury"
                onError={(e) => { e.currentTarget.src = '/brand/roughclick-luxury-dark.png'; }}
              />
            </div>
            <div className="header-brand-name-wrap">
              <span className="brand-word-rough">ROUGHCLICK</span>
              <span className="brand-word-digital">DIGITAL</span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active Underline */}
          <nav className="header-nav-menu" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Dual Concept Theme Switcher + CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Theme Switcher Button - Symbol Alone */}
            <button
              type="button"
              onClick={toggleTheme}
              className="concept-theme-pill theme-icon-btn"
              title={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {mounted && theme === 'dark' ? (
                <Sun size={18} className="theme-symbol-icon" />
              ) : (
                <Moon size={18} className="theme-symbol-icon" />
              )}
            </button>

            {/* Primary CTA */}
            <Link href="/contact" className="btn-header-pill">
              <span>Let's Build Something</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="header-mobile-toggle"
              onClick={() => toggleMobile(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => toggleMobile(false)}
        >
          <div
            style={{
              width: '82%',
              maxWidth: 320,
              height: '100%',
              backgroundColor: 'var(--bg-page)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-8px 0 25px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img
                    src="/brand/roughclick-modern-light.svg"
                    alt="RoughClick Digital"
                    className="logo-concept-modern"
                    style={{ height: 36, width: 'auto' }}
                  />
                  <img
                    src="/brand/roughclick-luxury-dark.svg"
                    alt="RoughClick Digital"
                    className="logo-concept-luxury"
                    style={{ height: 36, width: 'auto' }}
                    onError={(e) => { e.currentTarget.src = '/brand/roughclick-luxury-dark.png'; }}
                  />
                  <div className="header-brand-name-wrap" style={{ fontSize: '0.95rem' }}>
                    <span className="brand-word-rough">ROUGHCLICK</span>
                    <span className="brand-word-digital">DIGITAL</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleMobile(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-heading)' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Concept Theme Switcher */}
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'var(--bg-subtle)', borderRadius: 12, border: '1px solid var(--border-card)' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>Appearance</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="concept-theme-pill theme-icon-btn"
                  title={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  aria-label={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {mounted && theme === 'dark' ? (
                    <Sun size={18} className="theme-symbol-icon" />
                  ) : (
                    <Moon size={18} className="theme-symbol-icon" />
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: pathname === link.href ? 800 : 600,
                      color: pathname === link.href ? 'var(--color-accent)' : 'var(--text-heading)',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <Link
                href="/contact"
                className="btn-header-pill"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Let's Build Something</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
