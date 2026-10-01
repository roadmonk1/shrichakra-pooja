import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Eye,
  ChevronDown,
  Heart,
  Shield,
  Clock,
  UserCheck,
  Flame,
  Phone,
  MessageCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SriChakraSvg from '../animations/SriChakraSvg';
import FeaturedEventBanner from '../components/FeaturedEventBanner';
import { siteContent } from '../data/contentData';

export default function HomePage({
  setActivePage,
  featuredEvent,
  galleryPhotos,
  onOpenChecklist,
  onOpenInvitation
}) {
  const { language, t, resolveText } = useLanguage();
  const [activeLayerPreview, setActiveLayerPreview] = useState(0);

  const featuredPhotos = (galleryPhotos || []).filter(p => p.featured).slice(0, 3);

  // Dynamic event data with fallback to 25 October 2026
  const eventTitle = featuredEvent ? resolveText(featuredEvent.title, 'Annual Shri Chakra Pooja 2026') : 'Annual Shri Chakra Pooja 2026';
  const eventDate = featuredEvent ? resolveText(featuredEvent.displayDate, 'Sunday, 25 October 2026') : 'Sunday, 25 October 2026';
  const eventTime = featuredEvent ? resolveText(featuredEvent.timeText, '06:00 AM – 10:00 PM') : '06:00 AM – 10:00 PM';
  const eventVenue = featuredEvent ? resolveText(featuredEvent.venue, 'Shri Rama Nilaya') : 'Shri Rama Nilaya';
  const eventLocation = featuredEvent ? resolveText(featuredEvent.location, 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka') : 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka';
  const eventDesc = featuredEvent ? resolveText(featuredEvent.description, 'A sacred celebration of tradition & devotion at Shri Kshethra Kukkikatte.') : '';
  const googleMapsUrl = featuredEvent?.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Shri+Rama+Nilaya+Kukkikatte+Udupi+Karnataka';

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ============================================================== */}
      {/* 1. CINEMATIC FULL-SCREEN HERO SECTION                          */}
      {/* ============================================================== */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '36px 20px 60px',
          overflow: 'hidden'
        }}
      >
        {/* Layer 1: Background Warm Gold & Maroon Radial Aura */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '850px',
            height: '850px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 185, 100, 0.18) 0%, rgba(138, 21, 56, 0.22) 42%, transparent 72%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Layer 2: Ultra-slow background watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.11,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <SriChakraSvg size={980} isWatermark={true} isRotating={true} />
        </div>

        {/* Hero Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '960px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Confirmed Place Badge */}
          <div
            style={{
              marginBottom: '16px',
              animation: 'goldAuraPulse 4s ease-in-out infinite'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                background: 'linear-gradient(135deg, rgba(229, 185, 100, 0.22) 0%, rgba(138, 21, 56, 0.3) 100%)',
                border: '1px solid rgba(229, 185, 100, 0.65)',
                borderRadius: '30px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#ffe5a3',
                fontFamily: 'var(--font-serif)',
                boxShadow: '0 0 15px rgba(229, 185, 100, 0.25)'
              }}
            >
              <Sparkles size={13} className="text-[#ffd700]" />
              <span>{t('hero.placeBadge')}</span>
            </span>
          </div>

          {/* Main Visual: Center Sacred Sri Chakra with Entrance Sequence */}
          <div
            className="animate-entrance"
            style={{
              margin: '8px 0 20px',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => setActivePage('about')}
            title="Click to explore sacred geometry"
          >
            <SriChakraSvg size={360} isRotating={true} />
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(8, 1, 4, 0.92)',
                border: '1px solid rgba(229, 185, 100, 0.5)',
                borderRadius: '16px',
                padding: '3px 14px',
                fontSize: '0.72rem',
                color: '#e5b964',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)'
              }}
            >
              {t('hero.geometrySummary')}
            </div>
          </div>

          {/* Venue & Town Line */}
          <div
            style={{
              fontSize: '0.92rem',
              color: '#f0caa0',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '6px',
              fontWeight: 600,
              fontFamily: 'var(--font-serif)'
            }}
          >
            {t('hero.locationName')}
          </div>

          {/* Hero Main Title */}
          <h1
            className="font-cinzel text-gold-gradient"
            style={{
              fontSize: 'clamp(2.3rem, 5.2vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '0.08em',
              lineHeight: 1.14,
              marginBottom: '14px',
              textShadow: '0 0 35px rgba(229, 185, 100, 0.35)'
            }}
          >
            {t('hero.title')}
          </h1>

          {/* Current Event Date Highlight Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(10, 2, 6, 0.85)',
              border: '1px solid rgba(229, 185, 100, 0.45)',
              borderRadius: '24px',
              padding: '6px 18px',
              color: '#ffd983',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-serif)',
              marginBottom: '16px'
            }}
          >
            <Calendar size={15} className="text-[#e5b964]" />
            <span>{t('hero.eventDateBadge')}</span>
          </div>

          {/* Hero Subtitle */}
          <p
            className="font-cormorant"
            style={{
              fontSize: 'clamp(1.18rem, 2.3vw, 1.5rem)',
              color: '#f4e9d6',
              maxWidth: '720px',
              lineHeight: 1.5,
              marginBottom: '30px',
              fontWeight: 400
            }}
          >
            {t('hero.subtitle')}
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold-primary"
            >
              <span>{t('buttons.explore')}</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={onOpenInvitation}
              className="btn-gold-outline"
            >
              <Sparkles size={17} className="text-[#ffd700]" />
              <span>{t('buttons.viewInvitation')}</span>
            </button>
          </div>

          {/* Subtle Scroll Indicator */}
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.8,
              fontSize: '0.75rem',
              color: '#dac8af',
              letterSpacing: '0.1em'
            }}
          >
            <span>{t('hero.scrollText')}</span>
            <ChevronDown size={16} className="animate-bounce text-[#e5b964]" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PROMINENT UPCOMING EVENT ANNOUNCEMENT & COUNTDOWN           */}
      {/* ============================================================== */}
      {featuredEvent && (
        <FeaturedEventBanner
          event={featuredEvent}
          onViewDetails={() => {
            setActivePage('pooja');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onViewInvitation={onOpenInvitation}
        />
      )}

      {/* ============================================================== */}
      {/* 3. A SACRED LEGACY ACROSS GENERATIONS & SHRI RAGHAVENDRA TANTRI*/}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="ornament-divider">
            <SriChakraSvg size={24} isRotating={false} />
          </div>

          <div
            className="spiritual-card spiritual-corner gold-ornate-card"
            style={{
              padding: 'clamp(28px, 4.5vw, 56px)',
              background: 'linear-gradient(135deg, rgba(28, 6, 15, 0.95) 0%, rgba(14, 2, 7, 0.98) 100%)',
              border: '1.5px solid rgba(229, 185, 100, 0.5)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Narrative of Tradition */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span
                    style={{
                      background: 'rgba(229, 185, 100, 0.18)',
                      border: '1px solid rgba(229, 185, 100, 0.5)',
                      color: '#ffd983',
                      fontSize: '0.74rem',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    {t('tradition.tagline')}
                  </span>
                </div>

                <h2
                  className="font-cinzel text-gold-gradient"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: '18px'
                  }}
                >
                  {t('tradition.headline')}
                </h2>

                <p
                  style={{
                    color: '#e5d7c3',
                    lineHeight: 1.8,
                    fontSize: '0.98rem',
                    marginBottom: '16px'
                  }}
                >
                  {t('tradition.storyP1')}
                </p>

                <p
                  style={{
                    color: '#e5d7c3',
                    lineHeight: 1.8,
                    fontSize: '0.98rem',
                    marginBottom: '26px'
                  }}
                >
                  {t('tradition.storyP2')}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  <button
                    onClick={() => {
                      setActivePage('pooja');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-gold-primary"
                    style={{ padding: '10px 22px', fontSize: '0.85rem' }}
                  >
                    <span>{t('buttons.viewDetails')}</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline"
                    style={{ padding: '10px 20px', fontSize: '0.85rem', textDecoration: 'none' }}
                  >
                    <MapPin size={16} className="text-[#e5b964]" />
                    <span>{t('buttons.directions')}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Right Column: Shri Raghavendra Tantri Card */}
              <div
                style={{
                  background: 'radial-gradient(circle at center, rgba(45, 10, 24, 0.8) 0%, rgba(12, 2, 7, 0.95) 100%)',
                  border: '1.5px solid rgba(229, 185, 100, 0.55)',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 3.5vw, 36px)',
                  textAlign: 'center',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(229, 185, 100, 0.15)',
                  position: 'relative'
                }}
              >
                {/* Sacred Diya / Icon Header */}
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(229, 185, 100, 0.3) 0%, rgba(138, 21, 56, 0.4) 60%, rgba(10, 2, 6, 0.9) 100%)',
                    border: '2px solid rgba(229, 185, 100, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    boxShadow: '0 0 25px rgba(229, 185, 100, 0.35)'
                  }}
                >
                  <SriChakraSvg size={54} isRotating={true} />
                </div>

                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#e5b964',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    fontWeight: 700
                  }}
                >
                  {t('event.priestLabel')}
                </div>

                <h3
                  className="font-cinzel text-gold-light"
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    marginBottom: '6px'
                  }}
                >
                  {t('tradition.tantriTitle')}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#ffd983',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '16px'
                  }}
                >
                  {t('tradition.tantriRole')} • Shri Kshethra Kukkikatte
                </p>

                <div
                  style={{
                    borderTop: '1px solid rgba(229, 185, 100, 0.25)',
                    paddingTop: '18px',
                    marginTop: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    textAlign: 'left',
                    fontSize: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5d7c3' }}>
                    <MapPin size={16} className="text-[#e5b964] shrink-0" />
                    <span><strong>Venue:</strong> Shri Rama Nilaya, Kukkikatte, Udupi</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5d7c3' }}>
                    <Clock size={16} className="text-[#e5b964] shrink-0" />
                    <span><strong>Timings:</strong> 6:00 AM – 10:00 PM (Unbroken Seva)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5d7c3' }}>
                    <Phone size={16} className="text-[#e5b964] shrink-0" />
                    <span><strong>Helpline & Seva:</strong> +91 98443 06623</span>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a
                    href="https://wa.me/919844306623?text=Namaskara%20Shri%20Raghavendra%20Tantri,%20I%20would%20like%20to%20inquire%20about%20the%20Annual%20Shri%20Chakra%20Pooja%20at%20Kukkikatte."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-primary"
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '0.84rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>{t('buttons.chatWhatsapp')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. POOJA HIGHLIGHTS & SACRED OBSERVANCES                       */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                background: 'rgba(229, 185, 100, 0.16)',
                border: '1px solid rgba(229, 185, 100, 0.45)',
                borderRadius: '16px',
                color: '#ffd983',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                marginBottom: '10px',
                fontFamily: 'var(--font-serif)'
              }}
            >
              <Flame size={12} className="text-[#ffd700]" />
              <span>DIVINE OBSERVANCES</span>
            </span>

            <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '8px' }}>
              {t('tradition.highlightsTitle')}
            </h2>
            <p style={{ color: '#dac8b0', fontSize: '0.92rem' }}>
              Sacred milestones conducted throughout the day from 6:00 AM to 10:00 PM at Shri Kshethra Kukkikatte.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              { num: '01', title: t('tradition.hl1'), icon: Sparkles },
              { num: '02', title: t('tradition.hl2'), icon: BookOpen },
              { num: '03', title: t('tradition.hl3'), icon: Shield },
              { num: '04', title: t('tradition.hl4'), icon: Flame },
              { num: '05', title: t('tradition.hl5'), icon: Heart }
            ].map((hl, idx) => {
              const Icon = hl.icon;
              return (
                <div
                  key={idx}
                  className="spiritual-card"
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(229, 185, 100, 0.35)',
                    background: 'radial-gradient(circle at top left, rgba(40, 9, 21, 0.7) 0%, rgba(12, 2, 7, 0.95) 100%)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#e5b964';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(229, 185, 100, 0.35)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(229, 185, 100, 0.15)',
                      border: '1px solid rgba(229, 185, 100, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffd983',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div
                      className="font-cinzel text-gold-primary"
                      style={{ fontSize: '0.78rem', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '4px' }}
                    >
                      STEP {hl.num}
                    </div>
                    <p style={{ color: '#f4ebd9', fontSize: '0.92rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                      {hl.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SACRED GEOMETRY INTERACTIVE TEASER                          */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div
            className="spiritual-card spiritual-corner"
            style={{
              padding: 'clamp(28px, 4vw, 56px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Visual Column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  padding: '20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(138, 21, 56, 0.3) 0%, transparent 70%)'
                }}
              >
                <SriChakraSvg
                  size={360}
                  highlightLayer={activeLayerPreview}
                  isRotating={true}
                />
              </div>

              {/* Layer Selector Chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginTop: '20px'
                }}
              >
                {[
                  { id: 0, label: 'Harmonic Whole' },
                  { id: 1, label: '1. Trailokya Mohana (Bhupura)' },
                  { id: 2, label: '2. Sarvasha Puraka (16)' },
                  { id: 3, label: '3. Sarva Sankshobhana (8)' },
                  { id: 4, label: '4. 43 Sacred Triangles' },
                  { id: 9, label: '9. Sarvanandamaya (Maha Bindu)' }
                ].map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayerPreview(layer.id)}
                    style={{
                      background: activeLayerPreview === layer.id ? 'rgba(229, 185, 100, 0.32)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: activeLayerPreview === layer.id ? '#e5b964' : 'rgba(229, 185, 100, 0.25)',
                      color: activeLayerPreview === layer.id ? '#ffd983' : '#dac8af',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation Column */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: 'rgba(229, 185, 100, 0.16)',
                  border: '1px solid rgba(229, 185, 100, 0.4)',
                  borderRadius: '16px',
                  color: '#ffd983',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '14px',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                <Sparkles size={11} />
                <span>{t('hero.geometrySummary')}</span>
              </div>

              <h2
                className="font-cinzel text-gold-light"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', marginBottom: '16px', lineHeight: 1.25 }}
              >
                The Architecture of Pure Cosmic Consciousness
              </h2>

              <p style={{ color: '#e5d7c3', lineHeight: 1.75, fontSize: '0.96rem', marginBottom: '22px' }}>
                The Shri Chakra embodies the eternal union of cosmic consciousness and creative energy. Nine interlaced primary triangles create forty-three sub-triangles, culminating at the Bindu of unconditioned bliss.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '28px'
                }}
              >
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(229, 185, 100, 0.2)' }}>
                  <div className="font-cinzel text-gold-primary" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                    9
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#dac8af', marginTop: '2px' }}>Sacred Avaranas</div>
                </div>

                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(229, 185, 100, 0.2)' }}>
                  <div className="font-cinzel text-gold-primary" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                    43
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#dac8af', marginTop: '2px' }}>Divine Sub-Triangles</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-gold-primary"
              >
                <span>{t('buttons.explore')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. NINE AVARANAS OVERVIEW                                      */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                background: 'rgba(229, 185, 100, 0.16)',
                border: '1px solid rgba(229, 185, 100, 0.45)',
                borderRadius: '16px',
                color: '#ffd983',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                marginBottom: '10px',
                fontFamily: 'var(--font-serif)'
              }}
            >
              <Sparkles size={11} />
              <span>THE 9 SACRED CIRCUITS</span>
            </span>

            <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '8px' }}>
              Navavarana Overview
            </h2>
            <p style={{ color: '#dac8b0', fontSize: '0.92rem' }}>
              Consecrated worship progresses through each of the nine sacred Avaranas during the annual pooja.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {siteContent.avaranas.map((av) => (
              <div
                key={av.order}
                className="spiritual-card"
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(229, 185, 100, 0.3)',
                  background: 'rgba(12, 2, 7, 0.75)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    className="font-cinzel text-gold-primary"
                    style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em' }}
                  >
                    AVARANA {av.order}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: '#ffd983',
                      background: 'rgba(229, 185, 100, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}
                  >
                    {av.order === 9 ? 'Bindu' : `${av.order}/9`}
                  </span>
                </div>

                <h4
                  className="font-cinzel text-gold-light"
                  style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}
                >
                  {resolveText(av.name, `Avarana ${av.order}`)}
                </h4>

                <p style={{ fontSize: '0.78rem', color: '#ffd983', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                  {resolveText(av.geometry, '')}
                </p>

                <p style={{ fontSize: '0.82rem', color: '#dac8b0', lineHeight: 1.5, margin: 0 }}>
                  {resolveText(av.significance, '')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CURRENT ANNUAL POOJA 2026 CARD WITH FULL SCHEDULE          */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div className="ornament-divider">
            <SriChakraSvg size={24} isRotating={false} />
          </div>

          <div
            className="spiritual-card gold-ornate-card"
            style={{
              padding: 'clamp(24px, 3.5vw, 44px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '36px'
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 12px',
                  background: 'rgba(229, 185, 100, 0.2)',
                  border: '1px solid rgba(229, 185, 100, 0.5)',
                  borderRadius: '16px',
                  color: '#ffd983',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                <Calendar size={12} className="text-[#ffd700]" />
                <span>CONFIRMED ANNUAL POOJA</span>
              </span>

              <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.55rem', fontWeight: 800, marginBottom: '14px' }}>
                {eventTitle}
              </h3>

              <p style={{ color: '#e5d7c3', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '22px' }}>
                {eventDesc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#dac8af' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={18} className="text-[#e5b964] shrink-0" />
                  <span><strong>{t('event.dateLabel')}:</strong> {eventDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} className="text-[#e5b964] shrink-0" />
                  <span><strong>{t('event.timingLabel')}:</strong> {eventTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} className="text-[#e5b964] shrink-0" />
                  <span><strong>{t('event.venueLabel')}:</strong> {eventVenue}, Kukkikatte, Udupi</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UserCheck size={18} className="text-[#e5b964] shrink-0" />
                  <span><strong>{t('event.priestLabel')}:</strong> Shri Raghavendra Tantri</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-primary"
                  style={{ textDecoration: 'none', padding: '10px 18px', fontSize: '0.84rem' }}
                >
                  <MapPin size={15} />
                  <span>{t('buttons.directions')}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Day Schedule Summary & Quick Buttons */}
            <div
              style={{
                background: 'rgba(8, 1, 4, 0.75)',
                borderRadius: '12px',
                padding: '22px',
                border: '1px solid rgba(229, 185, 100, 0.3)'
              }}
            >
              <h4 className="font-cinzel text-gold-primary" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
                {t('event.scheduleTitle')}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(featuredEvent?.schedule || []).map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      paddingBottom: '10px',
                      borderBottom: idx < (featuredEvent?.schedule?.length - 1) ? '1px solid rgba(229, 185, 100, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#ffd983', fontSize: '0.78rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                        {s.time}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#e5b964', opacity: 0.85 }}>
                        {resolveText(s.phase, '')}
                      </span>
                    </div>
                    <div style={{ color: '#f5eedc', fontSize: '0.86rem', fontWeight: 600 }}>
                      {resolveText(s.title, s.time)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => {
                    setActivePage('pooja');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-gold-primary"
                  style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <span>{t('buttons.viewDetails')}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={onOpenInvitation}
                  className="btn-gold-outline"
                  style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Sparkles size={15} className="text-[#ffd700]" />
                  <span>{t('buttons.viewInvitation')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. GALLERY PREVIEW SECTION                                     */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: 'rgba(229, 185, 100, 0.16)',
                  border: '1px solid rgba(229, 185, 100, 0.4)',
                  borderRadius: '16px',
                  color: '#ffd983',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}
              >
                <Eye size={11} />
                <span>{t('nav.gallery')}</span>
              </span>
              <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)' }}>
                {t('gallery.title')}
              </h2>
              <p style={{ color: '#dac8b0', fontSize: '0.88rem', marginTop: '4px' }}>
                {t('gallery.subtitle')}
              </p>
            </div>

            <button
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold-outline"
            >
              <span>{t('buttons.viewMemories')}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Grid of featured photos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {featuredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  setActivePage('gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="spiritual-card"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(229, 185, 100, 0.35)'
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={photo.thumbnailUrl || photo.imageUrl}
                    alt={photo.caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(8, 1, 4, 0.9)',
                      border: '1px solid rgba(229, 185, 100, 0.6)',
                      color: '#ffd983',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    {photo.year}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.75)',
                      fontSize: '0.68rem',
                      color: '#e5b964',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(229, 185, 100, 0.3)'
                    }}
                  >
                    {photo.category === 'OFFICIAL' ? 'TEMPLE OFFICIAL' : 'DEVOTEE MEMORY'}
                  </span>
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '0.88rem', color: '#f5ebd9', lineHeight: 1.45, fontWeight: 600 }}>
                    {photo.caption}
                  </p>
                  <p style={{ fontSize: '0.74rem', color: '#dac8af', marginTop: '6px' }}>
                    {t('gallery.uploadedBy')} {photo.uploadedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. VISITOR PHOTO INVITATION BANNER                             */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div
            className="spiritual-card spiritual-corner gold-ornate-card"
            style={{
              padding: 'clamp(32px, 4vw, 56px)',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(32, 7, 18, 0.94) 0%, rgba(14, 2, 7, 0.98) 100%)',
              borderColor: 'rgba(229, 185, 100, 0.55)'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                background: 'rgba(229, 185, 100, 0.16)',
                border: '1px solid rgba(229, 185, 100, 0.45)',
                borderRadius: '16px',
                color: '#ffd983',
                fontSize: '0.74rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}
            >
              <Heart size={12} className="text-[#e5b964]" />
              <span>{t('nav.share')}</span>
            </span>

            <h2 className="font-cinzel text-gold-light" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '14px' }}>
              {t('share.headline')}
            </h2>

            <p style={{ maxWidth: '680px', margin: '0 auto 28px', color: '#e5d7c3', fontSize: '0.96rem', lineHeight: 1.65 }}>
              {t('share.description')}
            </p>

            <button
              onClick={() => {
                setActivePage('share');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold-primary"
            >
              <span>{t('buttons.submit')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
