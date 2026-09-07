'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button 
        type="button" 
        className={`theme-toggle-btn ${className}`} 
        aria-label="Toggle theme mode"
      >
        <span style={{ width: 20, height: 20 }} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={19} className="text-slate-700" />
      ) : (
        <Sun size={19} className="text-teal-400" style={{ color: '#14B8A6' }} />
      )}
    </button>
  );
}
