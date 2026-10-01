import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Navbar({
  activePage,
  setActivePage
}) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'pooja', label: t('nav.pooja') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'share', label: t('nav.share') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'all 0.35s ease',
        background: isScrolled
          ? 'rgba(8, 1, 4, 0.96)'
          : 'linear-gradient(180deg, rgba(8, 1, 4, 0.92) 0%, rgba(8, 1, 4, 0.35) 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(229, 185, 100, 0.35)'
          : '1px solid rgba(229, 185, 100, 0.12)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}
      >
        {/* Brand / Sacred Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '4px 0'
          }}
          aria-label="Shri Chakra Pooja - Shri Kshethra Kukkikatte"
        >
          <Logo size={42} subText="SHRI KSHETHRA KUKKIKATTE" isRotating={false} />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px'
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#ffd983' : '#e5d7c3',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 400,
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '6px 2px',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #e5b964, transparent)',
                      boxShadow: '0 0 8px #e5b964'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher & Admin Portal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Global Language Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(20, 4, 11, 0.85)',
              border: '1px solid rgba(229, 185, 100, 0.4)',
              borderRadius: '20px',
              padding: '2px 4px',
              fontSize: '0.75rem'
            }}
          >
            <button
              onClick={() => setLanguage('en')}
              style={{
                background: language === 'en' ? 'rgba(229, 185, 100, 0.35)' : 'transparent',
                color: language === 'en' ? '#ffd983' : '#dac8af',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: language === 'en' ? 700 : 400,
                fontSize: '0.72rem'
              }}
              title="English"
            >
              EN
            </button>
            <span style={{ color: 'rgba(229, 185, 100, 0.3)', margin: '0 1px' }}>|</span>
            <button
              onClick={() => setLanguage('kn')}
              style={{
                background: language === 'kn' ? 'rgba(229, 185, 100, 0.35)' : 'transparent',
                color: language === 'kn' ? '#ffd983' : '#dac8af',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: language === 'kn' ? 700 : 400,
                fontSize: '0.72rem'
              }}
              title="ಕನ್ನಡ (Kannada)"
            >
              ಕನ್ನಡ
            </button>
            <span style={{ color: 'rgba(229, 185, 100, 0.3)', margin: '0 1px' }}>|</span>
            <button
              onClick={() => setLanguage('sa')}
              style={{
                background: language === 'sa' ? 'rgba(229, 185, 100, 0.35)' : 'transparent',
                color: language === 'sa' ? '#ffd983' : '#dac8af',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: language === 'sa' ? 700 : 400,
                fontSize: '0.72rem'
              }}
              title="संस्कृतम् (Sanskrit in Devanagari)"
            >
              संस्कृतम्
            </button>
          </div>

          {/* Discreet Admin Entry */}
          <button
            onClick={() => handleNavClick('admin')}
            style={{
              background: activePage === 'admin' ? 'rgba(229, 185, 100, 0.28)' : 'transparent',
              border: '1px solid rgba(229, 185, 100, 0.35)',
              color: activePage === 'admin' ? '#ffd983' : '#dac8af',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-serif)',
              transition: 'all 0.2s ease'
            }}
            title="Temple Admin Portal"
          >
            <Shield size={13} className="text-[#e5b964]" />
            <span className="admin-text-btn">{t('nav.admin')}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            style={{
              background: 'none',
              border: '1px solid rgba(229, 185, 100, 0.4)',
              color: '#e5b964',
              padding: '7px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(8, 1, 4, 0.98)',
            borderTop: '1px solid rgba(229, 185, 100, 0.25)',
            borderBottom: '1px solid rgba(229, 185, 100, 0.4)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: activePage === item.id ? 'rgba(229, 185, 100, 0.15)' : 'transparent',
                border: 'none',
                color: activePage === item.id ? '#ffd983' : '#f5ebd9',
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)',
                padding: '10px 14px',
                borderRadius: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.label}</span>
              {activePage === item.id && <Sparkles size={14} className="text-[#e5b964]" />}
            </button>
          ))}

          <div style={{ height: '1px', background: 'rgba(229, 185, 100, 0.2)', margin: '8px 0' }} />

          <button
            onClick={() => handleNavClick('admin')}
            style={{
              background: 'rgba(229, 185, 100, 0.12)',
              border: '1px solid rgba(229, 185, 100, 0.4)',
              color: '#ffd983',
              padding: '10px 14px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-serif)',
              cursor: 'pointer'
            }}
          >
            <Shield size={16} />
            <span>{t('nav.admin')}</span>
          </button>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .admin-text-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
