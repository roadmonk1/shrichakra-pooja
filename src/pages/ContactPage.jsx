import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle, ExternalLink, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function ContactPage({
  storageService,
  setActivePage
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shri+Rama+Nilaya+Kukkikatte+Udupi+Karnataka';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    storageService.submitContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    setIsSent(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section
        style={{
          padding: '80px 20px 40px',
          textAlign: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 0%, rgba(138, 21, 56, 0.3) 0%, transparent 70%)'
        }}
      >
        <div className="container" style={{ maxWidth: '840px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              background: 'rgba(229, 185, 100, 0.2)',
              border: '1px solid rgba(229, 185, 100, 0.5)',
              borderRadius: '20px',
              color: '#ffd983',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              marginBottom: '14px',
              fontFamily: 'var(--font-serif)'
            }}
          >
            <Mail size={12} className="text-[#ffd700]" />
            <span>{t('nav.contact')}</span>
          </span>

          <h1
            className="font-cinzel text-gold-gradient"
            style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', marginBottom: '16px', lineHeight: 1.15, fontWeight: 900 }}
          >
            {t('contact.title')}
          </h1>

          <p className="font-cormorant" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: '#f5ebd9', lineHeight: 1.5 }}>
            {t('contact.subtitle')}
          </p>

          <div style={{ marginTop: '16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                background: 'rgba(14, 2, 7, 0.85)',
                border: '1px solid rgba(229, 185, 100, 0.35)',
                borderRadius: '16px',
                color: '#ffd983',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-serif)'
              }}
            >
              Shri Raghavendra Tantri • Shri Kshethra Kukkikatte, Udupi
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. DIRECT ACTION CHANNELS (CALL, WHATSAPP, EMAIL)               */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '40px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Phone */}
            <div className="spiritual-card" style={{ padding: '24px', textAlign: 'center', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(229, 185, 100, 0.15)',
                  border: '1px solid rgba(229, 185, 100, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#ffd983'
                }}
              >
                <Phone size={20} />
              </div>
              <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: 700 }}>
                {t('contact.phoneLabel')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#f5ebd9', marginBottom: '14px', fontWeight: 600 }}>
                +91 98443 06623
              </p>
              <a
                href="tel:+919844306623"
                className="btn-gold-outline"
                style={{ padding: '8px 16px', fontSize: '0.8rem', width: '100%', textDecoration: 'none' }}
              >
                <Phone size={14} />
                <span>{t('buttons.call')}</span>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="spiritual-card" style={{ padding: '24px', textAlign: 'center', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#4ade80'
                }}
              >
                <MessageCircle size={20} />
              </div>
              <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: 700 }}>
                {t('contact.whatsappLabel')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#f5ebd9', marginBottom: '14px', fontWeight: 600 }}>
                +91 98443 06623
              </p>
              <a
                href="https://wa.me/919844306623?text=Namaskara%20Shri%20Raghavendra%20Tantri,%20I%20would%20like%20to%20inquire%20about%20the%20Annual%20Shri%20Chakra%20Pooja%20at%20Kukkikatte."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary"
                style={{ padding: '8px 16px', fontSize: '0.8rem', width: '100%', textDecoration: 'none' }}
              >
                <MessageCircle size={14} />
                <span>{t('buttons.chatWhatsapp')}</span>
              </a>
            </div>

            {/* Email */}
            <div className="spiritual-card" style={{ padding: '24px', textAlign: 'center', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(229, 185, 100, 0.15)',
                  border: '1px solid rgba(229, 185, 100, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#ffd983'
                }}
              >
                <Mail size={20} />
              </div>
              <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: 700 }}>
                {t('contact.emailLabel')}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#f5ebd9', marginBottom: '14px', wordBreak: 'break-all' }}>
                shrichakreshwari74@gmail.com
              </p>
              <a
                href="mailto:shrichakreshwari74@gmail.com"
                className="btn-gold-outline"
                style={{ padding: '8px 16px', fontSize: '0.8rem', width: '100%', textDecoration: 'none' }}
              >
                <Mail size={14} />
                <span>{t('buttons.sendMessage')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CONTACT FORM & VENUE DETAILS                                */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}
          >
            {/* Form Column */}
            <div className="spiritual-card spiritual-corner gold-ornate-card" style={{ padding: 'clamp(28px, 4vw, 44px)', border: '1px solid rgba(229, 185, 100, 0.4)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: 'rgba(229, 185, 100, 0.18)',
                    border: '1px solid rgba(229, 185, 100, 0.45)',
                    color: '#ffd983',
                    padding: '3px 12px',
                    borderRadius: '16px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  SEVA INQUIRY
                </span>
              </div>

              <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.45rem', marginBottom: '14px', fontWeight: 800 }}>
                {t('contact.title')}
              </h2>

              {isSent ? (
                <div
                  style={{
                    background: 'rgba(74, 222, 128, 0.12)',
                    border: '1px solid #4ade80',
                    padding: '24px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginTop: '20px'
                  }}
                >
                  <CheckCircle size={32} className="text-[#4ade80]" style={{ margin: '0 auto 12px' }} />
                  <h3 className="font-cinzel text-[#4ade80]" style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                    {t('contact.sentSuccessTitle')}
                  </h3>
                  <p style={{ color: '#dac8af', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
                    {t('contact.sentSuccessDesc')}
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="btn-gold-outline"
                    style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#dac8af', marginBottom: '6px' }}>
                      {t('contact.nameField')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'rgba(8, 1, 4, 0.85)',
                        border: '1px solid rgba(229, 185, 100, 0.35)',
                        borderRadius: '6px',
                        color: '#f5ebd9',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#dac8af', marginBottom: '6px' }}>
                        {t('contact.emailField')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          background: 'rgba(8, 1, 4, 0.85)',
                          border: '1px solid rgba(229, 185, 100, 0.35)',
                          borderRadius: '6px',
                          color: '#f5ebd9',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', color: '#dac8af', marginBottom: '6px' }}>
                        {t('contact.phoneField')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          background: 'rgba(8, 1, 4, 0.85)',
                          border: '1px solid rgba(229, 185, 100, 0.35)',
                          borderRadius: '6px',
                          color: '#f5ebd9',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: '#dac8af', marginBottom: '6px' }}>
                      {t('contact.messageField')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please let us know how we can assist you with seva opportunities, prasada offerings, or pooja attendance..."
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'rgba(8, 1, 4, 0.85)',
                        border: '1px solid rgba(229, 185, 100, 0.35)',
                        borderRadius: '6px',
                        color: '#f5ebd9',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold-primary"
                    style={{ marginTop: '8px', padding: '12px 20px', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>{t('buttons.sendMessage')}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Venue & Sanctuary Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                className="spiritual-card"
                style={{
                  padding: '30px',
                  border: '1px solid rgba(229, 185, 100, 0.35)',
                  background: 'radial-gradient(circle at top, rgba(35, 8, 20, 0.85) 0%, rgba(12, 2, 7, 0.95) 100%)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <MapPin size={22} className="text-[#e5b964]" />
                  <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    Sanctuary & Venue Coordinates
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#dac8af', marginBottom: '22px' }}>
                  <div>
                    <strong style={{ color: '#ffd983' }}>Sanctuary:</strong> Shri Rama Nilaya
                  </div>
                  <div>
                    <strong style={{ color: '#ffd983' }}>Area & Town:</strong> Kukkikatte, Udupi, Karnataka, India
                  </div>
                  <div>
                    <strong style={{ color: '#ffd983' }}>Main Priest:</strong> Shri Raghavendra Tantri
                  </div>
                  <div>
                    <strong style={{ color: '#ffd983' }}>Pooja Date:</strong> 25 October 2026 (6:00 AM – 10:00 PM)
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '11px 20px',
                    textDecoration: 'none'
                  }}
                >
                  <MapPin size={16} />
                  <span>{t('buttons.directions')}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Seva Guidelines Notice */}
              <div
                style={{
                  background: 'rgba(8, 1, 4, 0.85)',
                  border: '1px solid rgba(229, 185, 100, 0.25)',
                  borderRadius: '10px',
                  padding: '20px 24px'
                }}
              >
                <h4 className="font-cinzel text-gold-primary" style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '8px' }}>
                  Devotee & Seva Guidelines
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#dac8af', lineHeight: 1.6, margin: 0 }}>
                  Devotees are requested to arrive in traditional attire. Continuous seva, Vedic recitation, and floral offerings proceed without interruption from 6:00 AM till 10:00 PM. Sanctified Mahaprasada is distributed following noon and evening aartis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
