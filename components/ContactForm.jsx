'use client';

import React, { useState } from 'react';
import { SERVICE_SELECT_OPTIONS } from '@/data/services';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [whatsappUrl, setWhatsappUrl] = useState('');

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setWhatsappUrl(data.whatsappUrl || '');
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus({
        submitting: false,
        submitted: false,
        error: err.message || 'Error submitting inquiry. Please try again or WhatsApp us directly.'
      });
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
      boxShadow: 'var(--card-shadow)'
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: 6, color: 'var(--text-primary)' }}>
          Project Inquiry Form
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Complete the details below to discuss your website, social media, or digital presence requirements.
        </p>
      </div>

      {status.submitted ? (
        <div style={{
          backgroundColor: 'var(--rc-teal-light)',
          border: '1px solid var(--rc-teal-accent)',
          borderRadius: 12,
          padding: 28,
          textAlign: 'center',
          color: 'var(--text-primary)'
        }}>
          <CheckCircle2 size={44} style={{ color: 'var(--rc-teal-accent)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 8 }}>Inquiry Received Successfully</h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto' }}>
            Thank you for reaching out to RoughClick Digital. Your details have been logged and our team will evaluate your scope.
          </p>

          {whatsappUrl && (
            <div style={{ marginTop: 20 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                }}
              >
                <span>💬 Send to Our Team on WhatsApp (One-Tap)</span>
              </a>
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <button
              type="button"
              onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
              className="btn-modern-secondary"
              style={{ fontSize: '0.84rem', padding: '8px 18px' }}
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 16
          }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                Your Name <span style={{ color: 'var(--rc-teal-accent)' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                Email Address <span style={{ color: 'var(--rc-teal-accent)' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 16
          }}>
            <div>
              <label htmlFor="phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div>
              <label htmlFor="company" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
                Company / Business
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Business Name"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 6,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="service" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
              Service Interested In <span style={{ color: 'var(--rc-teal-accent)' }}>*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              <option value="" disabled>Select service category...</option>
              {SERVICE_SELECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>
              Message <span style={{ color: 'var(--rc-teal-accent)' }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project requirements and goals..."
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 6,
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                resize: 'vertical',
                lineHeight: 1.6
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status.submitting}
            className="btn-modern-primary"
            style={{ width: '100%', padding: '14px', fontSize: '0.96rem' }}
          >
            {status.submitting ? 'Sending Inquiry...' : (
              <>
                <span>Send Inquiry</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
