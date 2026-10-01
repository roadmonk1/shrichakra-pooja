import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function FeaturedEventBanner({
  event,
  onViewDetails,
  onViewInvitation
}) {
  const { language, t, resolveText } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    if (!event || !event.date) return;

    const calculateCountdown = () => {
      // Event date + start time
      const targetStr = `${event.date}T${event.startTime || '06:00'}:00`;
      const target = new Date(targetStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event]);

  if (!event) return null;

  const eventTitle = resolveText(event.title, 'Annual Sri Chakra Pooja');
  const eventSub = resolveText(event.subheading, 'A Sacred Celebration of Tradition & Devotion');
  const eventDate = resolveText(event.displayDate, event.date);
  const eventVenue = resolveText(event.venue, "Client's Sacred Temple");
  const eventLocation = resolveText(event.location, 'Bangalore');

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 20,
        maxWidth: '1040px',
        margin: '0 auto 28px',
        padding: '0 20px',
        width: '100%'
      }}
    >
      <div
        className="spiritual-card spiritual-corner"
        style={{
          background: 'linear-gradient(135deg, rgba(32, 8, 18, 0.92) 0%, rgba(16, 3, 9, 0.96) 60%, rgba(28, 6, 15, 0.92) 100%)',
          border: '1.5px solid rgba(223, 177, 91, 0.55)',
          borderRadius: '14px',
          boxShadow: '0 15px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(223, 177, 91, 0.2)',
          padding: 'clamp(24px, 3.5vw, 36px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            right: '-60px',
            transform: 'translateY(-50%)',
            opacity: 0.08,
            pointerEvents: 'none'
          }}
        >
          <SriChakraSvg size={380} isWatermark={true} isRotating={true} />
        </div>

        {/* Top Sacred Diya / Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span
            style={{
              background: 'rgba(223, 177, 91, 0.16)',
              border: '1px solid rgba(223, 177, 91, 0.45)',
              color: '#ffd883',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '20px',
              fontFamily: 'var(--font-serif)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={12} className="text-[#ffd700]" />
            <span>🪔 {t('event.upcomingBadge')}</span>
          </span>
        </div>

        {/* Event Title */}
        <h2
          className="font-cinzel text-gold-gradient"
          style={{
            fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '0.06em',
            marginBottom: '8px',
            lineHeight: 1.2
          }}
        >
          {eventTitle}
        </h2>

        {/* Event Date & Location Pill */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            fontSize: '0.9rem',
            color: '#ffd983',
            fontFamily: 'var(--font-serif)',
            marginBottom: '14px'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} className="text-[#dfb15b]" />
            <span>{eventDate}</span>
          </span>
          <span style={{ color: 'rgba(223, 177, 91, 0.3)' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ded1bd' }}>
            <MapPin size={16} className="text-[#dfb15b]" />
            <span>{eventVenue}, {eventLocation}</span>
          </span>
        </div>

        {/* Subtitle / Narrative */}
        <p
          className="font-cormorant"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#eedec7',
            maxWidth: '680px',
            margin: '0 auto 20px',
            lineHeight: 1.5
          }}
        >
          {eventSub}
        </p>

        {/* Sacred Countdown Timer */}
        {!timeLeft.isPast ? (
          <div
            style={{
              background: 'rgba(10, 2, 6, 0.65)',
              border: '1px solid rgba(223, 177, 91, 0.25)',
              borderRadius: '10px',
              padding: '12px 20px',
              maxWidth: '480px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            {[
              { label: t('event.days'), val: timeLeft.days },
              { label: t('event.hours'), val: String(timeLeft.hours).padStart(2, '0') },
              { label: t('event.minutes'), val: String(timeLeft.minutes).padStart(2, '0') },
              { label: t('event.seconds'), val: String(timeLeft.seconds).padStart(2, '0') }
            ].map((unit, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div
                  className="font-cinzel text-gold-light"
                  style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}
                >
                  {unit.val}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#b9a791', letterSpacing: '0.08em', marginTop: '4px' }}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              marginBottom: '20px',
              fontSize: '0.88rem',
              color: '#4ade80',
              fontFamily: 'var(--font-serif)'
            }}
          >
            {t('event.completed')}
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button
            onClick={onViewDetails}
            className="btn-gold-primary"
            style={{ padding: '11px 26px' }}
          >
            <span>{t('buttons.viewDetails')}</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onViewInvitation}
            className="btn-gold-outline"
            style={{ padding: '11px 24px' }}
          >
            <Sparkles size={16} className="text-[#ffd700]" />
            <span>{t('buttons.viewInvitation')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
