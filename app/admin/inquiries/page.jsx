'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Download,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Calendar,
  ExternalLink,
  Check,
  Copy,
  Layers,
  ArrowUpRight,
  X,
  FileSpreadsheet,
  Users,
  Clock,
  Sparkles,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { SERVICE_SELECT_OPTIONS } from '@/data/services';

function WhatsAppIcon({ size = 16, className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 0 1-1.26-4.47c0-4.54 3.7-8.23 8.24-8.23zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [activeModalInquiry, setActiveModalInquiry] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin-blog/login');
      router.refresh();
    } catch (e) {
      router.push('/admin-blog/login');
    }
  };

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Delete inquiry
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (activeModalInquiry?.id === id) {
          setActiveModalInquiry(null);
        }
      } else {
        alert(data.error || 'Failed to delete inquiry');
      }
    } catch (err) {
      alert('Error deleting inquiry');
    } finally {
      setDeletingId(null);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text, fieldName, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (inq.name && inq.name.toLowerCase().includes(q)) ||
        (inq.email && inq.email.toLowerCase().includes(q)) ||
        (inq.phone && inq.phone.toLowerCase().includes(q)) ||
        (inq.company && inq.company.toLowerCase().includes(q)) ||
        (inq.message && inq.message.toLowerCase().includes(q)) ||
        (inq.service && inq.service.toLowerCase().includes(q));

      const optLabel = SERVICE_SELECT_OPTIONS.find((o) => o.value === selectedService)?.label;
      const matchesService =
        selectedService === 'all' ||
        inq.service === selectedService ||
        (optLabel && inq.service === optLabel) ||
        (inq.service && inq.service.toLowerCase().includes(selectedService.toLowerCase())) ||
        (inq.service && selectedService.toLowerCase().includes(inq.service.toLowerCase()));

      return matchesSearch && matchesService;
    });
  }, [inquiries, searchQuery, selectedService]);

  // Statistics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const now = new Date();
    const today = inquiries.filter((inq) => {
      if (!inq.createdAt) return false;
      const d = new Date(inq.createdAt);
      return d.toDateString() === now.toDateString();
    }).length;

    const withPhone = inquiries.filter((inq) => inq.phone && inq.phone.trim()).length;

    // Service frequencies
    const freq = {};
    inquiries.forEach((inq) => {
      const s = inq.service || 'Unspecified';
      freq[s] = (freq[s] || 0) + 1;
    });
    let topService = 'None';
    let maxCount = 0;
    Object.entries(freq).forEach(([k, v]) => {
      if (v > maxCount) {
        maxCount = v;
        topService = k;
      }
    });

    return { total, today, withPhone, topService };
  }, [inquiries]);

  // Find human readable service label
  const getServiceLabel = (val) => {
    const opt = SERVICE_SELECT_OPTIONS.find((o) => o.value === val);
    return opt ? opt.label : val || 'General Inquiry';
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: 'clamp(20px, 4vw, 40px) clamp(16px, 4vw, 48px)',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{
        maxWidth: 1320,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 32,
        paddingBottom: 24,
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Link
              href="/"
              className="btn-modern-secondary"
              style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </Link>
            <span style={{
              backgroundColor: 'rgba(0, 210, 160, 0.12)',
              color: 'var(--rc-teal-accent, #00D2A0)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 9999,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              RoughClick Admin
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            margin: '0 0 6px 0',
            lineHeight: 1.2
          }}>
            Client Inquiries &amp; Leads
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>
            Real-time dashboard of submissions from the website contact page and popup forms.
          </p>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={fetchInquiries}
            disabled={loading}
            className="btn-modern-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <a
            href="/api/admin/inquiries/export"
            download
            className="btn-modern-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              fontSize: '0.88rem',
              textDecoration: 'none',
              backgroundColor: 'var(--color-accent, #00D2A0)',
              color: '#0b1329',
              fontWeight: 700,
              borderRadius: 8
            }}
          >
            <FileSpreadsheet size={16} />
            <span>Export to CSV / Excel</span>
          </a>

          <Link
            href="/admin-blog"
            className="btn-modern-secondary"
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <span>Blog CMS</span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn-modern-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
            title="Sign out of Admin Session"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 28
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Inquiries</span>
              <Users size={18} style={{ color: 'var(--rc-teal-accent, #00D2A0)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {stats.total}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Received Today</span>
              <Clock size={18} style={{ color: '#38bdf8' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {stats.today}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>With Mobile Phone</span>
              <Phone size={18} style={{ color: '#25D366' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)' }}>
              {stats.withPhone}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: '20px 22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Top Category</span>
              <Layers size={18} style={{ color: '#f59e0b' }} />
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {getServiceLabel(stats.topService)}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '1 1 300px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone, company..."
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 8,
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all">All Service Types</option>
              {SERVICE_SELECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong> inquiries
          </div>
        </div>

        {/* Inquiries Table */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          {loading ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 12px auto' }} />
              <p>Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <MessageSquare size={36} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: 6 }}>No Inquiries Found</h3>
              <p style={{ fontSize: '0.88rem', maxWidth: 380, margin: '0 auto' }}>
                {searchQuery || selectedService !== 'all'
                  ? 'No submissions match your current filters. Try resetting your search.'
                  : 'New customer inquiries from your popup and contact page will automatically show up here.'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.88rem'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <th style={{ padding: '14px 18px' }}>Date</th>
                    <th style={{ padding: '14px 18px' }}>Client</th>
                    <th style={{ padding: '14px 18px' }}>Contact Details</th>
                    <th style={{ padding: '14px 18px' }}>Service</th>
                    <th style={{ padding: '14px 18px' }}>Message Preview</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => {
                    const cleanPhone = (inq.phone || '').replace(/\D/g, '');
                    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : '';
                    const dateStr = inq.createdAt
                      ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Recently';

                    return (
                      <tr
                        key={inq.id}
                        onClick={() => setActiveModalInquiry(inq)}
                        style={{
                          borderBottom: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        {/* Date */}
                        <td style={{ padding: '16px 18px', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Calendar size={13} />
                            <span>{dateStr}</span>
                          </div>
                        </td>

                        {/* Client & Company */}
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: 3 }}>
                            {inq.name || 'Anonymous Lead'}
                          </div>
                          {inq.company ? (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Building2 size={12} />
                              <span>{inq.company}</span>
                            </div>
                          ) : (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                              Individual
                            </div>
                          )}
                        </td>

                        {/* Contact Details */}
                        <td style={{ padding: '16px 18px' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {inq.email && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <a
                                  href={`mailto:${inq.email}`}
                                  style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                >
                                  {inq.email}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => copyToClipboard(inq.email, `email-${inq.id}`, e)}
                                  title="Copy Email"
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: copiedField === `email-${inq.id}` ? 'var(--rc-teal-accent, #00D2A0)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: 2
                                  }}
                                >
                                  {copiedField === `email-${inq.id}` ? <Check size={13} /> : <Copy size={13} />}
                                </button>
                              </div>
                            )}

                            {inq.phone && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.84rem' }}>
                                <a
                                  href={`tel:${inq.phone}`}
                                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                                >
                                  {inq.phone}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => copyToClipboard(inq.phone, `phone-${inq.id}`, e)}
                                  title="Copy Phone Number"
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: copiedField === `phone-${inq.id}` ? 'var(--rc-teal-accent, #00D2A0)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: 2
                                  }}
                                >
                                  {copiedField === `phone-${inq.id}` ? <Check size={13} /> : <Copy size={13} />}
                                </button>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Service Badge */}
                        <td style={{ padding: '16px 18px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(0, 210, 160, 0.1)',
                            color: 'var(--rc-teal-accent, #00D2A0)',
                            border: '1px solid rgba(0, 210, 160, 0.25)',
                            padding: '4px 10px',
                            borderRadius: 6,
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}>
                            {getServiceLabel(inq.service)}
                          </span>
                        </td>

                        {/* Message Preview */}
                        <td style={{ padding: '16px 18px', maxWidth: 300 }}>
                          <p style={{
                            margin: 0,
                            color: 'var(--text-body)',
                            fontSize: '0.84rem',
                            lineHeight: 1.45,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {inq.message || 'No message provided.'}
                          </p>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px 18px', textAlign: 'right', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            {waUrl && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open WhatsApp Chat"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                                  color: '#25D366',
                                  textDecoration: 'none',
                                  transition: 'transform 0.15s ease'
                                }}
                              >
                                <WhatsAppIcon size={16} />
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={(e) => handleDelete(inq.id, e)}
                              disabled={deletingId === inq.id}
                              title="Delete Lead"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {activeModalInquiry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
          onClick={() => setActiveModalInquiry(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 600,
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              borderRadius: 18,
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
              color: 'var(--text-primary)',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setActiveModalInquiry(null)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: 20 }}>
              <span style={{
                backgroundColor: 'rgba(0, 210, 160, 0.12)',
                color: 'var(--rc-teal-accent, #00D2A0)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 9999,
                textTransform: 'uppercase'
              }}>
                {getServiceLabel(activeModalInquiry.service)}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 10, marginBottom: 4 }}>
                {activeModalInquiry.name}
              </h2>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Submitted: {activeModalInquiry.createdAt ? new Date(activeModalInquiry.createdAt).toLocaleString() : 'N/A'}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 14,
              backgroundColor: 'var(--bg-subtle)',
              padding: 16,
              borderRadius: 10,
              marginBottom: 20,
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3 }}>Email</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {activeModalInquiry.email || '—'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3 }}>Phone</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {activeModalInquiry.phone || '—'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3 }}>Company</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {activeModalInquiry.company || '—'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 3 }}>Source</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {activeModalInquiry.source || 'Website Contact'}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                Project Scope / Message
              </div>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                padding: '16px',
                borderRadius: 10,
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                maxHeight: 220,
                overflowY: 'auto'
              }}>
                {activeModalInquiry.message || 'No additional message.'}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {activeModalInquiry.phone && (
                  <a
                    href={`https://wa.me/${activeModalInquiry.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modern-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '10px 18px',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: '0.88rem'
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    <span>WhatsApp Lead</span>
                  </a>
                )}

                {activeModalInquiry.email && (
                  <a
                    href={`mailto:${activeModalInquiry.email}`}
                    className="btn-modern-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      textDecoration: 'none',
                      padding: '10px 18px',
                      borderRadius: 8,
                      fontSize: '0.88rem'
                    }}
                  >
                    <Mail size={15} />
                    <span>Email Lead</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => handleDelete(activeModalInquiry.id, e)}
                className="btn-modern-secondary"
                style={{
                  color: '#ef4444',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  padding: '10px 16px',
                  fontSize: '0.86rem'
                }}
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
