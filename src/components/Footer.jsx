import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer({
  setActivePage
}) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: '#060103',
        borderTop: '1.5px solid rgba(229, 185, 100, 0.3)',
        position: 'relative',
        zIndex: 10,
        paddingTop: '60px',
        paddingBottom: '32px'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '44px'
          }}
        >
          {/* Col 1: Logo & Essence */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Logo size={44} subText="SHRI KSHETHRA KUKKIKATTE" isRotating={false} />
            </div>

            <p style={{ color: '#dac8b0', fontSize: '0.86rem', lineHeight: '1.65', marginBottom: '18px' }}>
              {t('footer.description')}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                background: 'rgba(229, 185, 100, 0.15)',
                border: '1px solid rgba(229, 185, 100, 0.45)',
                borderRadius: '16px',
                color: '#ffd983',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)'
              }}
            >
              <span>🪔 25 OCTOBER 2026 • 6:00 AM – 10:00 PM</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              className="font-cinzel text-gold-light"
              style={{ fontSize: '0.96rem', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 700 }}
            >
              {t('footer.exploreTitle')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              {[
                { id: 'home', label: t('nav.home') },
                { id: 'about', label: t('nav.about') },
                { id: 'pooja', label: t('nav.pooja') },
                { id: 'gallery', label: t('nav.gallery') },
                { id: 'share', label: t('nav.share') },
                { id: 'contact', label: t('nav.contact') }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dac8af',
                      fontSize: '0.86rem',
                      fontFamily: 'var(--font-serif)',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      padding: 0
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd983')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#dac8af')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Languages & Temple Contact */}
          <div>
            <h4
              className="font-cinzel text-gold-light"
              style={{ fontSize: '0.96rem', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 700 }}
            >
              {t('footer.languagesTitle')}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              {[
                { code: 'en', name: 'English' },
                { code: 'kn', name: 'ಕನ್ನಡ' },
                { code: 'sa', name: 'संस्कृतम्' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  style={{
                    background: language === l.code ? 'rgba(229, 185, 100, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid',
                    borderColor: language === l.code ? '#e5b964' : 'rgba(229, 185, 100, 0.25)',
                    color: language === l.code ? '#ffd983' : '#dac8af',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: language === l.code ? 700 : 400
                  }}
                >
                  {l.name}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  setActivePage('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: 'rgba(229, 185, 100, 0.1)',
                  border: '1px solid rgba(229, 185, 100, 0.35)',
                  color: '#ffd983',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-serif)',
                  cursor: 'pointer'
                }}
              >
                <Shield size={14} />
                <span>{t('footer.adminBtn')}</span>
              </button>
            </div>
          </div>

          {/* Col 4: Confirmed Client Sanctuary Details */}
          <div>
            <h4
              className="font-cinzel text-gold-light"
              style={{ fontSize: '0.96rem', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 700 }}
            >
              SANCTUARY & SEVA
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem', color: '#dac8af' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} className="text-[#e5b964] shrink-0 mt-1" />
                <span>Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} className="text-[#e5b964] shrink-0" />
                <a href="tel:+919844306623" style={{ color: '#ffd983', textDecoration: 'none' }}>
                  +91 98443 06623
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={16} className="text-[#e5b964] shrink-0" />
                <a
                  href="https://wa.me/919844306623"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ffd983', textDecoration: 'none' }}
                >
                  WhatsApp Seva Chat
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} className="text-[#e5b964] shrink-0" />
                <a href="mailto:shrichakreshwari74@gmail.com" style={{ color: '#dac8af', textDecoration: 'none', fontSize: '0.8rem' }}>
                  shrichakreshwari74@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(229, 185, 100, 0.2)',
            paddingTop: '22px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#bfae99'
          }}
        >
          <div>{t('footer.copyright')}</div>
          <div style={{ color: '#e5b964' }}>Shri Kshethra Kukkikatte, Udupi</div>
        </div>
      </div>
    </footer>
  );
}
