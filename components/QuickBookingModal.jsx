'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Send, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { SERVICE_SELECT_OPTIONS } from '@/data/services';
import { BRAND_CONFIG } from '@/data/config';

// 1. Context definition
const InquiryModalContext = createContext({
  modalType: null, // 'inquiry' | 'booking' | null
  serviceContext: '',
  openInquiryModal: () => {},
  openBookingModal: () => {},
  openModal: () => {},
  closeModal: () => {}
});

export function useInquiryModal() {
  return useContext(InquiryModalContext);
}

// 2. Official WhatsApp SVG Icon
function WhatsAppIcon({ size = 18, className = '', style = {} }) {
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

// 3. Provider Component
export function InquiryModalProvider({ children }) {
  const [modalType, setModalType] = useState(null); // 'inquiry' | 'booking' | null
  const [serviceContext, setServiceContext] = useState('');
  const [hideServiceSelect, setHideServiceSelect] = useState(false);

  // Form State for Project Inquiry
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [inquiryStatus, setInquiryStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const [inquiryWhatsappUrl, setInquiryWhatsappUrl] = useState('');

  // Form State for Booking / Discovery Call
  const [bookingData, setBookingData] = useState({
    name: '',
    date: '',
    phone: ''
  });
  const [bookingDateType, setBookingDateType] = useState('text');
  const [bookingStatus, setBookingStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const [bookingWhatsappUrl, setBookingWhatsappUrl] = useState('');
  const dateInputRef = useRef(null);

  // Helper to map context to select option
  const findMatchingService = (contextStr) => {
    if (!contextStr) return '';
    const lower = contextStr.toLowerCase();
    const found = SERVICE_SELECT_OPTIONS.find((opt) =>
      opt.label.toLowerCase().includes(lower) || opt.value.toLowerCase().includes(lower)
    );
    return found ? found.value : '';
  };

  // Open Project Inquiry Form popup
  const openInquiryModal = (service = '', options = {}) => {
    setServiceContext(service);
    const matched = findMatchingService(service);
    const shouldHide = options.hideServiceSelect === true;
    setHideServiceSelect(shouldHide);
    setInquiryData((prev) => ({
      ...prev,
      service: service || matched || prev.service || ''
    }));
    setInquiryStatus({ submitting: false, submitted: false, error: null });
    setModalType('inquiry');
  };

  // Open Schedule Discovery Call popup (Date picker & WhatsApp)
  const openBookingModal = (service = 'Discovery Call') => {
    setServiceContext(service);
    setBookingDateType('text');
    setBookingStatus({ submitting: false, submitted: false, error: null });
    setModalType('booking');
  };

  // Default alias
  const openModal = (service = '') => {
    openInquiryModal(service);
  };

  const closeModal = () => {
    setModalType(null);
    setInquiryStatus({ submitting: false, submitted: false, error: null });
    setBookingStatus({ submitting: false, submitted: false, error: null });
  };

  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.rcOpenInquiryModal = openInquiryModal;
      window.rcOpenBookingModal = openBookingModal;
    }
  }, []);

  // Focus trap, Escape key handling, and Lock body scroll (RC-12)
  useEffect(() => {
    if (modalType) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      // Auto-focus first input or close button
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusables = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length > 0) {
            focusables[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          return;
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusables = Array.from(
            modalRef.current.querySelectorAll(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          );
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              lastEl.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastEl) {
              firstEl.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current && previousActiveElement.current.focus) {
          previousActiveElement.current.focus();
        }
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [modalType]);

  // Handle Project Inquiry Submit (RC-11: Support Phone OR Email)
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryData.name.trim()) {
      setInquiryStatus({ submitting: false, submitted: false, error: 'Please enter your name.' });
      return;
    }

    const hasContact = Boolean(inquiryData.email.trim() || inquiryData.phone.trim());
    if (!hasContact) {
      setInquiryStatus({
        submitting: false,
        submitted: false,
        error: 'Please provide either a phone number or an email address so our team can reach you.'
      });
      return;
    }

    setInquiryStatus({ submitting: true, submitted: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inquiryData,
          source: 'Project Inquiry Popup'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');

      setInquiryWhatsappUrl(data.whatsappUrl || '');
      setInquiryStatus({ submitting: false, submitted: true, error: null });
      setInquiryData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (err) {
      setInquiryStatus({
        submitting: false,
        submitted: false,
        error: err.message || 'Error submitting inquiry. Please try again.'
      });
    }
  };

  // Handle Booking Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.name.trim() || !bookingData.phone.trim()) return;

    setBookingStatus({ submitting: true, submitted: false, error: null });

    const rawPhone = BRAND_CONFIG?.contact?.WHATSAPP_NUMBER || '916379166158';
    const cleanPhone = rawPhone.replace(/\D/g, '');

    const formattedDate = bookingData.date
      ? new Date(bookingData.date + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      : 'Flexible / Earliest Available';

    const messageLines = [
      'Hello RoughClick Digital. I would like to request a discovery call.',
      '',
      `Name: ${bookingData.name.trim()}`,
      `Preferred date: ${formattedDate}`,
      `Contact number: ${bookingData.phone.trim()}`,
      serviceContext ? `Requirement: ${serviceContext}` : 'Requirement: Digital Project Consultation',
      '',
      'Please confirm availability and a suitable time.'
    ];

    const messageText = messageLines.join('\n');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    setBookingWhatsappUrl(waUrl);

    // Asynchronously log lead to database
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingData.name.trim(),
          phone: bookingData.phone.trim(),
          email: `${bookingData.phone.replace(/\D/g, '') || 'lead'}@whatsapp.booking`,
          service: serviceContext || 'Discovery Call Consultation',
          message: `Discovery Call scheduled for: ${formattedDate}. Mobile: ${bookingData.phone.trim()}`,
          source: 'Discovery Call WhatsApp Popup'
        })
      }).catch(() => {});
    } catch (_) {}

    // Open WhatsApp
    window.open(waUrl, '_blank');

    setBookingStatus({ submitting: false, submitted: true, error: null });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <InquiryModalContext.Provider
      value={{
        modalType,
        serviceContext,
        openInquiryModal,
        openBookingModal,
        openModal,
        closeModal
      }}
    >
      {children}

      {/* ================================================================= */}
      {/* 1. PROJECT INQUIRY FORM POPUP (Triggered by "Start Your Project") */}
      {/* ================================================================= */}
      {modalType === 'inquiry' && (
        <div
          className="inquiry-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
        >
          <div className="inquiry-modal-card" ref={modalRef} tabIndex="-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeModal}
              className="inquiry-modal-close"
              aria-label="Close inquiry popup"
            >
              <X size={18} />
            </button>

            {inquiryStatus.submitted ? (
              <div className="inquiry-modal-success">
                <CheckCircle2 size={48} className="success-icon" />
                <h3 className="success-title">Inquiry Received Successfully</h3>
                <p className="success-desc">
                  Thank you for reaching out to RoughClick Digital. Your details have been logged and our team will evaluate your project requirements.
                </p>

                {inquiryWhatsappUrl && (
                  <div style={{ marginTop: 22, marginBottom: 12 }}>
                    <a
                      href={inquiryWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inquiry-whatsapp-btn"
                    >
                      <WhatsAppIcon size={20} />
                      <span>Send to Our Team on WhatsApp (One-Tap)</span>
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={closeModal}
                  className="inquiry-close-btn"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="inquiry-modal-header">
                  <h2 id="inquiry-modal-title" className="inquiry-modal-title">
                    Project Inquiry Form
                  </h2>
                  <p className="inquiry-modal-subtitle">
                    Complete the details below to discuss your website, social media, or digital presence requirements.
                  </p>
                </div>

                {inquiryStatus.error && (
                  <div className="inquiry-modal-error" role="alert">
                    {inquiryStatus.error}
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="inquiry-modal-form">
                  <div className="inquiry-form-group">
                    <label htmlFor="inquiry-name" className="inquiry-form-label">
                      Your Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Jane Smith"
                      className="inquiry-form-input"
                      autoFocus
                    />
                  </div>

                  <div className="inquiry-form-group">
                    <label htmlFor="inquiry-email" className="inquiry-form-label">
                      Email Address <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Provide Phone or Email)</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      name="email"
                      autoComplete="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="jane@company.com"
                      className="inquiry-form-input"
                    />
                  </div>

                  <div className="inquiry-form-group">
                    <label htmlFor="inquiry-phone" className="inquiry-form-label">
                      Phone Number <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Provide Phone or Email)</span>
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      name="phone"
                      autoComplete="tel"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Your phone number"
                      className="inquiry-form-input"
                    />
                  </div>

                  <div className="inquiry-form-group">
                    <label htmlFor="inquiry-company" className="inquiry-form-label">
                      Company / Business
                    </label>
                    <input
                      type="text"
                      id="inquiry-company"
                      name="company"
                      autoComplete="organization"
                      value={inquiryData.company}
                      onChange={(e) => setInquiryData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Your Business Name"
                      className="inquiry-form-input"
                    />
                  </div>

                  {/* Automatically Fetched Service Badge */}
                  {hideServiceSelect && inquiryData.service && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: 'rgba(0, 210, 160, 0.1)',
                      color: 'var(--rc-teal-accent, #00D2A0)',
                      border: '1px solid rgba(0, 210, 160, 0.25)',
                      padding: '7px 14px',
                      borderRadius: 8,
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      marginBottom: 16
                    }}>
                      <span style={{ opacity: 0.8 }}>Service:</span>
                      <strong>{inquiryData.service}</strong>
                    </div>
                  )}

                  {/* Field 5: Service Interested In (Hidden when service is pre-selected) */}
                  {!hideServiceSelect && (
                    <div className="inquiry-form-group">
                      <label htmlFor="inquiry-service" className="inquiry-form-label">
                        Service Interested In <span className="req-star">*</span>
                      </label>
                      <select
                        id="inquiry-service"
                        name="service"
                        required
                        value={inquiryData.service}
                        onChange={(e) => setInquiryData((prev) => ({ ...prev, service: e.target.value }))}
                        className="inquiry-form-select"
                      >
                        <option value="" disabled>Select service category...</option>
                        {SERVICE_SELECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="inquiry-form-group">
                    <label htmlFor="inquiry-message" className="inquiry-form-label">
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your project requirements and goals..."
                      className="inquiry-form-textarea"
                    />
                  </div>

                  <div style={{ margin: '14px 0 16px', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'center' }}>
                    🔒 By inquiring, you agree to our{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                      Privacy Policy
                    </a>. We never sell your contact information.
                  </div>

                  <button
                    type="submit"
                    disabled={inquiryStatus.submitting}
                    className="inquiry-submit-btn"
                  >
                    {inquiryStatus.submitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SCHEDULE DISCOVERY CALL POPUP (Triggered by "Schedule Discovery Call") */}
      {/* ========================================================================= */}
      {modalType === 'booking' && (
        <div
          className="quick-booking-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="quick-booking-card" ref={modalRef} tabIndex="-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeModal}
              className="quick-booking-close"
              aria-label="Close discovery call request"
            >
              <X size={18} />
            </button>

            {bookingStatus.submitted ? (
              <div className="quick-booking-success">
                <CheckCircle2 size={48} className="success-check-icon" />
                <h3 className="success-title">Continue Your Request on WhatsApp</h3>
                <p className="success-desc">
                  Review and send the prepared message to request the call. The appointment is confirmed only after you receive a confirmation from RoughClick Digital.
                </p>
                <a
                  href={bookingWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-booking-submit-btn"
                  style={{ textDecoration: 'none', marginTop: 16 }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Open WhatsApp Again</span>
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="quick-booking-cancel-btn"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="quick-booking-header">
                  <div className="quick-booking-eyebrow">DISCOVERY CALL</div>
                  <h2 id="booking-modal-title" className="quick-booking-title">
                    Request a Discovery Call
                  </h2>
                  <p className="quick-booking-subtitle">
                    Share your preferred date and contact number. We will confirm availability and the time separately.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="quick-booking-form">
                  <div className="quick-booking-group">
                    <label htmlFor="qb-name" className="quick-booking-label">
                      Your name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="qb-name"
                      name="name"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Rahul Sharma"
                      className="quick-booking-input"
                      autoFocus
                    />
                  </div>

                  <div className="quick-booking-group">
                    <label htmlFor="qb-date" className="quick-booking-label">
                      Preferred date <span className="req-star">*</span>
                    </label>
                    <div
                      className="quick-booking-date-wrapper"
                      onClick={() => {
                        setBookingDateType('date');
                        setTimeout(() => {
                          if (dateInputRef.current) {
                            if (dateInputRef.current.showPicker) {
                              dateInputRef.current.showPicker();
                            } else {
                              dateInputRef.current.focus();
                            }
                          }
                        }, 50);
                      }}
                    >
                      <input
                        ref={dateInputRef}
                        type={bookingDateType === 'date' || bookingData.date ? 'date' : 'text'}
                        id="qb-date"
                        name="date"
                        required
                        min={todayStr}
                        placeholder="Select Date..."
                        value={bookingData.date}
                        onFocus={() => setBookingDateType('date')}
                        onBlur={() => {
                          if (!bookingData.date) setBookingDateType('text');
                        }}
                        onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                        className="quick-booking-input date-input"
                      />
                      <Calendar size={18} className="calendar-icon-amber" />
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 5 }}>
                      This is a preference, not a confirmed appointment.
                    </div>
                  </div>

                  <div className="quick-booking-group">
                    <label htmlFor="qb-phone" className="quick-booking-label">
                      Phone or WhatsApp number <span className="req-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="qb-phone"
                      name="phone"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 98765 43210"
                      className="quick-booking-input"
                    />
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 5 }}>
                      Include your country code.
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.5 }}>
                    We use these details to respond to your call request. Read our{' '}
                    <Link href="/privacy" onClick={closeModal} style={{ color: 'var(--color-accent-dark, #096357)', textDecoration: 'underline' }}>
                      Privacy Policy
                    </Link>.
                  </div>

                  <button
                    type="submit"
                    disabled={bookingStatus.submitting}
                    className="quick-booking-submit-btn"
                  >
                    <WhatsAppIcon size={20} />
                    <span>{bookingStatus.submitting ? 'Opening WhatsApp...' : 'Continue to WhatsApp'}</span>
                  </button>

                  <div className="quick-booking-footer-note" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
                    Opens WhatsApp with your request prepared. Review the message and select Send.
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </InquiryModalContext.Provider>
  );
}

// 4. Client Helper Component: StartProjectButton (triggers Project Inquiry Form)
export function StartProjectButton({
  className = 'btn-pill-cyan',
  children,
  service = '',
  href = '/contact',
  style = {}
}) {
  const { openInquiryModal } = useInquiryModal();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        openInquiryModal(service, { hideServiceSelect: false });
      }}
      className={className}
      style={style}
    >
      {children || (
        <>
          <span>Start Your Project</span>
          <Send size={15} style={{ marginLeft: 4 }} />
        </>
      )}
    </a>
  );
}

// 5. Client Helper Component: ScheduleCallButton (triggers Schedule Discovery Call / WhatsApp date picker)
export function ScheduleCallButton({
  className = 'btn-pill-cyan',
  children,
  service = 'Discovery Call Consultation',
  href = '/contact',
  style = {}
}) {
  const { openBookingModal } = useInquiryModal();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        openBookingModal(service);
      }}
      className={className}
      style={style}
    >
      {children || (
        <>
          <span>Schedule Discovery Call</span>
          <ArrowRight size={16} />
        </>
      )}
    </a>
  );
}

// 6. Client Helper Component: DiscussProjectButton (triggers Project Inquiry Form with pre-selected service and hides dropdown)
export function DiscussProjectButton({
  className = 'btn-modern-primary',
  children,
  service = '',
  href = '/contact',
  style = {}
}) {
  const { openInquiryModal } = useInquiryModal();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        openInquiryModal(service, { hideServiceSelect: true });
      }}
      className={className}
      style={style}
    >
      {children || (
        <>
          <span>Discuss Your Project</span>
          <ArrowRight size={15} />
        </>
      )}
    </a>
  );
}
