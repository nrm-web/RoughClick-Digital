'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/admin-blog';

  const [email, setEmail] = useState('admin@roughclick.com');
  const [password, setPassword] = useState('roughclick2026!');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successful login
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setErrorMsg(err.message || 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 440,
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 20,
      padding: '40px 36px',
      boxShadow: 'var(--card-shadow)',
      position: 'relative',
      zIndex: 5,
      backdropFilter: 'blur(16px)'
    }}>
      {/* Brand header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span className="rc-badge" style={{ padding: '4px 10px', fontSize: '0.74rem' }}>
            <ShieldCheck size={13} style={{ marginRight: 5 }} />
            Agency Portal Access
          </span>
        </div>
        <h1 style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 8
        }}>
          Editorial Portal Login
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Authenticate to manage digital insights, SEO metadata, and agentic blog publishing.
        </p>
      </div>

      {/* Error notification */}
      {errorMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 14px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 10,
          color: '#ef4444',
          fontSize: '0.84rem',
          marginBottom: 20
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Agency Admin Email
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 10,
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              placeholder="admin@roughclick.com"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
            Admin Access Key
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 10,
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              placeholder="••••••••••••"
            />
          </div>
        </div>

        {/* Development Default Hint */}
        <div style={{
          padding: '10px 12px',
          borderRadius: 8,
          backgroundColor: 'var(--bg-canvas)',
          border: '1px dashed var(--border-subtle)',
          fontSize: '0.76rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ fontWeight: 600, color: 'var(--rc-teal-accent)', marginBottom: 2 }}>
            Local Agency Master Key:
          </div>
          Email: <code style={{ color: 'var(--text-primary)' }}>admin@roughclick.com</code> | Pass: <code style={{ color: 'var(--text-primary)' }}>roughclick2026!</code>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '13px',
            fontSize: '0.94rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginTop: 6,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.75 : 1
          }}
        >
          <span>{loading ? 'Authenticating...' : 'Enter Editorial Portal'}</span>
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 18 }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          RoughClick Digital Content Management Engine &bull; Protected Agency Environment
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow orb-1" aria-hidden="true" style={{ top: '10%', left: '20%' }} />
      <div className="hero-ambient-glow orb-2" aria-hidden="true" style={{ bottom: '10%', right: '20%' }} />
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Back to website */}
      <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 10 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.88rem',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to RoughClick Digital</span>
        </Link>
      </div>

      <Suspense fallback={<div style={{ color: 'var(--text-muted)' }}>Loading authentication...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
