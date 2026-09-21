'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function BrandPreloader() {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [durationMs, setDurationMs] = useState(1100);
  const [animKey, setAnimKey] = useState(1);
  const exitTimerRef = useRef(null);
  const cleanupTimerRef = useRef(null);

  const handleDismiss = () => {
    setIsExiting(true);
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    // Remove from DOM after CSS fade-out animation completes (420ms)
    cleanupTimerRef.current = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
    }, 420);
  };

  const triggerLoader = (duration = 1100) => {
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const forcePreview = params.get('preloader') === '1' || params.get('loader') === '1';

    // Only run on initial load if explicitly requested via URL parameter
    if (forcePreview) {
      triggerLoader(1500);
    }

    // Logo Click & Custom Navigation: Fast, snappy transition (~1.1s / 1100ms)
    const onTriggerPreloader = () => {
      triggerLoader(1100);
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
