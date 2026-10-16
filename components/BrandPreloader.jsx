'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export default function BrandPreloader() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [durationMs, setDurationMs] = useState(1000);
  const [animKey, setAnimKey] = useState(1);
  const exitTimerRef = useRef(null);
  const cleanupTimerRef = useRef(null);

  const handleDismiss = () => {
    setIsExiting(true);
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    // Remove from DOM after CSS fade-out animation completes (350ms)
    cleanupTimerRef.current = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.location.hash) {
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 350);
  };

  const triggerLoader = (duration = 1000) => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    setDurationMs(duration);
    setIsExiting(false);
    setMounted(true);
    setAnimKey(prev => prev + 1);
    document.body.style.overflow = 'hidden';

    exitTimerRef.current = setTimeout(() => {
      handleDismiss();
    }, duration);
  };

  // Initial load trigger: equal treatment for visitors and audits, with strict reduced motion check (RC-22)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const forcePreview = params.get('preloader') === '1' || params.get('loader') === '1';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Respect reduced motion strictly
    if (!prefersReducedMotion) {
      try {
        const hasSeen = sessionStorage.getItem('rc_preloader_seen');
        // Only run on first visit per session, or when explicitly forced
        if (!hasSeen || forcePreview) {
          sessionStorage.setItem('rc_preloader_seen', '1');
          triggerLoader(800);
        }
      } catch {
        // Fallback if sessionStorage is disabled/blocked
        if (forcePreview) {
          triggerLoader(800);
        }
      }
    }

    // Custom event trigger (e.g. logo click or interactive demo)
    const onTriggerPreloader = (e) => {
      const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (motionReduced) return;
      const duration = e?.detail?.duration || 800;
      triggerLoader(duration);
    };
    window.addEventListener('rc-trigger-preloader', onTriggerPreloader);

    return () => {
      window.removeEventListener('rc-trigger-preloader', onTriggerPreloader);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="rc-brand-preloader"
      className={`brand-preloader-root ${isExiting ? 'is-exiting' : ''}`}
      style={{ '--preloader-duration': `${durationMs}ms` }}
      role="status"
      aria-label="Loading RoughClick Digital"
    >
      {/* Skip / Close Button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="brand-preloader-close"
        aria-label="Skip animation"
        title="Skip intro"
      >
        <X size={18} />
      </button>

      {/* Main Animated Brand Centerpiece */}
      <div key={animKey} className="brand-preloader-art">
        {/* Circular Emblem Badge (Reference Site Inspired) */}
        <div className="brand-preloader-badge-orbit">
          <div className="brand-preloader-badge-halo" />
          <div className="brand-preloader-badge-disk">
            <div className="brand-preloader-badge-sheen" />
            <img
              src="/brand/roughclick-modern-dark.svg"
              alt="RoughClick Digital"
              className="brand-preloader-logo-img preloader-logo-modern"
              width={200}
              height={150}
            />
            <img
              src="/brand/roughclick-luxury-dark.svg"
              alt="RoughClick Digital"
              className="brand-preloader-logo-img preloader-logo-luxury"
              width={200}
              height={150}
              onError={(e) => { e.currentTarget.src = '/brand/roughclick-luxury-dark.png'; }}
            />
          </div>
        </div>

        {/* Subtitle / Tagline */}
        <div className="brand-preloader-subtitle">
          <span>High-Performance Web &amp; Digital Engineering</span>
        </div>

        {/* Elegant Micro-Progress Line */}
        <div className="brand-preloader-progress-track">
          <div className="brand-preloader-progress-bar" />
        </div>
      </div>
    </div>
  );
}
