import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Compass,
  Users,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Phone,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function PoojaPage({
  currentEvent,
  allEvents,
  setActivePage,
  onOpenInvitation
}) {
  const { language, t, resolveText } = useLanguage();

  if (!currentEvent) return null;

  const eventTitle = resolveText(currentEvent.title, 'Annual Shri Chakra Pooja 2026');
  const eventSub = resolveText(currentEvent.subheading, 'Shri Kshethra Kukkikatte • Sacred Daylong Celebration');
  const eventDesc = resolveText(currentEvent.description, 'Conducted under the holy guidance of Shri Raghavendra Tantri, the Annual Shri Chakra Pooja at Shri Kshethra Kukkikatte is a daylong sacred congregation.');
  const eventDate = resolveText(currentEvent.displayDate, 'Sunday, 25 October 2026');
  const eventTime = resolveText(currentEvent.timeText, '06:00 AM – 10:00 PM');
  const eventVenue = resolveText(currentEvent.venue, 'Shri Rama Nilaya');
  const eventLocation = resolveText(currentEvent.location, 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka');
  const schedule = currentEvent.schedule || [];
  const googleMapsUrl = currentEvent.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Shri+Rama+Nilaya+Kukkikatte+Udupi+Karnataka';

  // Previous years (archived or other events)
  const previousEvents = (allEvents || []).filter(e => e.id !== currentEvent.id);

  // WhatsApp quick share
  const handleWhatsappShare = () => {
    const prefix = t('invitation.whatsappTextPrefix');
    const msg = `${prefix}*${eventTitle}*\n📅 *${t('event.dateLabel')}:* ${eventDate}\n🕐 *${t('event.timingLabel')}:* ${eventTime}\n📍 *${t('event.venueLabel')}:* ${eventVenue}, Kukkikatte, Udupi\n\n🔗 ${window.location.origin}/#pooja`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ============================================================== */}
      {/* 1. HERO BANNER                                                 */}
      {/* ============================================================== */}
      <section
        style={{
          padding: '80px 20px 48px',
          textAlign: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 0%, rgba(138, 21, 56, 0.3) 0%, transparent 70%)'
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
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
            <Calendar size={12} className="text-[#ffd700]" />
            <span>{t('event.currentYear')}</span>
          </span>

          <h1
            className="font-cinzel text-gold-gradient"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', marginBottom: '16px', lineHeight: 1.15, fontWeight: 900 }}
          >
            {eventTitle}
          </h1>

          <p className="font-cormorant" style={{ fontSize: 'clamp(1.18rem, 2vw, 1.45rem)', color: '#f5ebd9', lineHeight: 1.5 }}>
            {eventSub}
          </p>

          {/* Invitation & Maps Actions Toolbar */}
          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <button
              onClick={onOpenInvitation}
              className="btn-gold-primary"
              style={{ padding: '12px 28px' }}
            >
              <Sparkles size={16} className="text-[#ffd700]" />
              <span>{t('buttons.viewInvitation')}</span>
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline"
              style={{ padding: '12px 24px', textDecoration: 'none' }}
            >
              <MapPin size={16} className="text-[#e5b964]" />
              <span>{t('buttons.directions')}</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={handleWhatsappShare}
              className="btn-gold-outline"
              style={{
                borderColor: 'rgba(34, 197, 94, 0.5)',
                color: '#4ade80',
                padding: '12px 22px'
              }}
            >
              <MessageCircle size={16} />
              <span>{t('buttons.shareWhatsapp')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. OCCASION DETAILS METRIC CARDS                               */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '60px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Card 1: Date */}
            <div className="spiritual-card" style={{ padding: '24px 20px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5b964', marginBottom: '8px' }}>
                <Calendar size={18} />
                <span className="font-cinzel" style={{ fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  {t('event.dateLabel')}
                </span>
              </div>
              <div className="font-cinzel text-gold-light" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {eventDate}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#dac8b0', marginTop: '4px' }}>
                Shri Kshethra Kukkikatte
              </div>
            </div>

            {/* Card 2: Location */}
            <div className="spiritual-card" style={{ padding: '24px 20px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5b964', marginBottom: '8px' }}>
                <MapPin size={18} />
                <span className="font-cinzel" style={{ fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  {t('event.venueLabel')}
                </span>
              </div>
              <div className="font-cinzel text-gold-light" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {eventVenue}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#dac8b0', marginTop: '4px' }}>
                Kukkikatte, Udupi, Karnataka
              </div>
            </div>

            {/* Card 3: Time */}
            <div className="spiritual-card" style={{ padding: '24px 20px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5b964', marginBottom: '8px' }}>
                <Clock size={18} />
                <span className="font-cinzel" style={{ fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  {t('event.timingLabel')}
                </span>
              </div>
              <div className="font-cinzel text-gold-light" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {eventTime}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#dac8b0', marginTop: '4px' }}>
                Continuous Daylong Seva
              </div>
            </div>

            {/* Card 4: Priest & Custodian */}
            <div className="spiritual-card" style={{ padding: '24px 20px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e5b964', marginBottom: '8px' }}>
                <Shield size={18} />
                <span className="font-cinzel" style={{ fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                  {t('event.priestLabel')}
                </span>
              </div>
              <div className="font-cinzel text-gold-light" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Shri Raghavendra Tantri
              </div>
              <div style={{ fontSize: '0.74rem', color: '#dac8b0', marginTop: '4px' }}>
                Main Priest & Spiritual Custodian
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. ABOUT THIS YEAR'S POOJA                                     */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '80px' }}>
        <div className="container">
          <div
            className="spiritual-card spiritual-corner gold-ornate-card"
            style={{
              padding: 'clamp(32px, 4vw, 56px)',
              background: 'linear-gradient(135deg, rgba(28, 6, 15, 0.92) 0%, rgba(12, 2, 7, 0.98) 100%)',
              border: '1.5px solid rgba(229, 185, 100, 0.5)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <span
                style={{
                  background: 'rgba(229, 185, 100, 0.18)',
                  border: '1px solid rgba(229, 185, 100, 0.45)',
                  color: '#ffd983',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif)'
                }}
              >
                {t('event.aboutYearTitle')}
              </span>
            </div>

            <h2 className="font-cinzel text-gold-light" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', marginBottom: '16px', fontWeight: 800 }}>
              {eventTitle}
            </h2>

            <p style={{ color: '#e5d7c3', fontSize: '1.02rem', lineHeight: 1.85, marginBottom: '22px' }}>
              {eventDesc}
            </p>

            <div
              style={{
                background: 'rgba(229, 185, 100, 0.1)',
                border: '1px solid rgba(229, 185, 100, 0.35)',
                padding: '16px 20px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                color: '#f5ebd9',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <CheckCircle size={20} className="text-[#e5b964] shrink-0" />
              <span>
                <strong>Tradition across Generations:</strong> Initiated by the great-grandfather of Shri Raghavendra Tantri, this sacred pooja has united thousands of devotees annually for universal peace and prosperity.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SCHEDULE TIMELINE COMPONENT (6:00 AM – 10:00 PM)            */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div className="ornament-divider">
            <SriChakraSvg size={24} isRotating={false} />
          </div>

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
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
                letterSpacing: '0.12em',
                marginBottom: '10px',
                fontFamily: 'var(--font-serif)'
              }}
            >
              <Clock size={11} />
              <span>SACRED DAY PROGRESSION</span>
            </span>

            <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '8px', fontWeight: 800 }}>
              {t('event.scheduleTitle')}
            </h2>
            <p style={{ color: '#dac8af', fontSize: '0.92rem' }}>
              Consecrated rituals conducted by Shri Raghavendra Tantri throughout the holy day at Shri Rama Nilaya, Kukkikatte.
            </p>
          </div>

          {/* Timeline Vertical Track */}
          <div
            style={{
              position: 'relative',
              maxWidth: '860px',
              margin: '0 auto',
              paddingLeft: '24px',
              borderLeft: '2px solid rgba(229, 185, 100, 0.35)'
            }}
          >
            {schedule.map((item, index) => (
              <div
                key={item.id || index}
                style={{
                  position: 'relative',
                  marginBottom: '40px',
                  paddingLeft: '24px'
                }}
              >
                {/* Glowing Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#e5b964',
                    border: '3px solid #080104',
                    boxShadow: '0 0 14px rgba(229, 185, 100, 0.85)'
                  }}
                />

                {/* Card Container */}
                <div
                  className="spiritual-card"
                  style={{
                    padding: '24px 28px',
                    backgroundColor: 'rgba(14, 2, 7, 0.85)',
                    border: '1px solid rgba(229, 185, 100, 0.3)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          color: '#ffd983',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.98rem',
                          fontWeight: 700
                        }}
                      >
                        {item.time}
                      </span>
                      <span
                        style={{
                          background: 'rgba(229, 185, 100, 0.15)',
                          border: '1px solid rgba(229, 185, 100, 0.35)',
                          color: '#ffe5a3',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-serif)'
                        }}
                      >
                        {resolveText(item.phase, 'Phase')}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 700 }}>
                    {resolveText(item.title, 'Ritual')}
                  </h3>

                  <p style={{ color: '#dac8af', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                    {resolveText(item.description, '')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PREVIOUS YEARS SECTION (DYNAMIC ARCHIVE)                    */}
      {/* ============================================================== */}
      {previousEvents.length > 0 && (
        <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
          <div className="container">
            <div className="ornament-divider">
              <SriChakraSvg size={24} isRotating={false} />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
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
                  marginBottom: '10px'
                }}
              >
                <Users size={11} />
                <span>{t('event.previousYears')}</span>
              </span>
              <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)' }}>
                {t('event.previousYears')}
              </h2>
              <p style={{ color: '#dac8af', fontSize: '0.9rem', marginTop: '8px' }}>
                Historical celebrations from past years conducted at Shri Kshethra Kukkikatte.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px'
              }}
            >
              {previousEvents.map((prev) => (
                <div key={prev.id} className="spiritual-card" style={{ overflow: 'hidden', border: '1px solid rgba(229, 185, 100, 0.3)' }}>
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={prev.image || prev.invitationImage}
                      alt={resolveText(prev.title, prev.year)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(8, 1, 4, 0.92)',
                        border: '1px solid rgba(229, 185, 100, 0.6)',
                        color: '#ffd983',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '4px'
                      }}
                    >
                      {prev.year}
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        fontSize: '0.66rem',
                        color: '#e5b964',
                        background: 'rgba(0,0,0,0.75)',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        border: '1px solid rgba(229, 185, 100, 0.25)'
                      }}
                    >
                      ARCHIVE
                    </span>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h4 className="font-cinzel text-gold-light" style={{ fontSize: '1.08rem', marginBottom: '8px', fontWeight: 700 }}>
                      {resolveText(prev.title, prev.year)}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#e5b964', marginBottom: '10px' }}>
                      {resolveText(prev.displayDate, prev.date)}
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#dac8af', lineHeight: 1.5, marginBottom: '16px' }}>
                      {resolveText(prev.description, '')}
                    </p>
                    <button
                      onClick={() => {
                        setActivePage('gallery');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ffd983',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <span>{t('buttons.viewMemories')} ({prev.year})</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
