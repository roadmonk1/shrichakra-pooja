import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  Check,
  ExternalLink,
  MessageCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function DigitalInvitationModal({ isOpen, onClose, event }) {
  const { language, t, resolveText } = useLanguage();
  const [activeTab, setActiveTab] = useState('digital'); // 'digital' | 'uploaded'
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !event) return null;

  const eventTitle = resolveText(event.title, 'Annual Sri Chakra Pooja');
  const eventDate = resolveText(event.displayDate, event.date);
  const eventTime = resolveText(event.timeText, '06:00 AM – 09:30 PM');
  const eventVenue = resolveText(event.venue, "Client's Sacred Temple");
  const eventLocation = resolveText(event.location, 'Bangalore, Karnataka');
  const eventDesc = resolveText(event.description, 'A sacred celebration of tradition & devotion.');

  // WhatsApp share link with dynamic event info
  const handleWhatsappShare = () => {
    const prefix = t('invitation.whatsappTextPrefix');
    const msg = `${prefix}*${eventTitle}*\n📅 *${t('event.dateLabel')}:* ${eventDate}\n🕐 *${t('event.timingLabel')}:* ${eventTime}\n📍 *${t('event.venueLabel')}:* ${eventVenue}, ${eventLocation}\n\n🔗 ${window.location.origin}/#pooja`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Web Share or copy link
  const handleShare = async () => {
    const shareData = {
      title: eventTitle,
      text: `${eventTitle} - ${eventDate} at ${eventVenue}`,
      url: `${window.location.origin}/#pooja`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to copy link
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#pooja`).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    // Format YYYYMMDD
    const rawDate = event.date ? event.date.replace(/-/g, '') : '20261025';
    const startStr = `${rawDate}T003000Z`; // UTC approx for 06:00 AM IST
    const endStr = `${rawDate}T163000Z`; // UTC approx for 10:00 PM IST

    const details = encodeURIComponent(`${eventDesc}\n\nVenue: ${eventVenue}\n\nVisit: ${window.location.origin}/#pooja`);
    const loc = encodeURIComponent(`${eventVenue}, ${eventLocation}`);
    const name = encodeURIComponent(eventTitle);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${name}&dates=${startStr}/${endStr}&details=${details}&location=${loc}`;
  };

  // Download .ics file
  const handleDownloadIcs = () => {
    const rawDate = event.date ? event.date.replace(/-/g, '') : '20261025';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Shri Chakra Pooja Shri Kshethra Kukkikatte//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${event.id || 'pooja-event'}-${Date.now()}@kukkikatte.org
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${rawDate}T060000
DTEND:${rawDate}T220000
SUMMARY:${eventTitle}
DESCRIPTION:${eventDesc.replace(/\n/g, ' ')}
LOCATION:${eventVenue}, ${eventLocation}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventTitle.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger print / save as PDF/Image
  const handleDownloadCard = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="spiritual-card spiritual-corner"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0a0205',
          border: '1.5px solid rgba(223, 177, 91, 0.5)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(223, 177, 91, 0.25)',
          borderRadius: '14px'
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid rgba(223, 177, 91, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(25, 6, 14, 0.95) 0%, rgba(38, 9, 21, 0.95) 100%)'
          }}
        >
          {/* Format Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('digital')}
              style={{
                background: activeTab === 'digital' ? 'rgba(223, 177, 91, 0.25)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'digital' ? '#dfb15b' : 'transparent',
                color: activeTab === 'digital' ? '#ffd883' : '#a89781',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={13} />
              <span>{t('invitation.traditionalCardTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('uploaded')}
              style={{
                background: activeTab === 'uploaded' ? 'rgba(223, 177, 91, 0.25)' : 'transparent',
                border: '1px solid',
                borderColor: activeTab === 'uploaded' ? '#dfb15b' : 'transparent',
                color: activeTab === 'uploaded' ? '#ffd883' : '#a89781',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ImageIcon size={13} />
              <span>{t('invitation.uploadedCardTab')}</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={t('buttons.close')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(223, 177, 91, 0.3)',
              color: '#ffd883',
              padding: '6px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Invitation Card View */}
        <div style={{ overflowY: 'auto', padding: '24px' }}>
          {activeTab === 'digital' ? (
            /* Traditional Digital Invitation Card */
            <div
              id="printable-invitation"
              style={{
                position: 'relative',
                background: 'radial-gradient(circle at 50% 30%, #200611 0%, #0c0206 70%, #060103 100%)',
                border: '2px solid rgba(223, 177, 91, 0.6)',
                borderRadius: '12px',
                padding: 'clamp(28px, 4vw, 48px)',
                textAlign: 'center',
                boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Inner Ornamental Double Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '8px',
                  border: '1px solid rgba(223, 177, 91, 0.3)',
                  borderRadius: '8px',
                  pointerEvents: 'none'
                }}
              />

              {/* Top Sacred OM Symbol & Verse */}
              <div style={{ marginBottom: '14px' }}>
                <div
                  className="font-cinzel text-gold-gradient"
                  style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}
                >
                  {t('invitation.sacredSymbol')}
                </div>
                <div
                  className="font-cinzel"
                  style={{
                    fontSize: '0.85rem',
                    color: '#dfb15b',
                    letterSpacing: '0.14em',
                    marginTop: '6px'
                  }}
                >
                  {t('invitation.headerVerse')}
                </div>
              </div>

              {/* Center Sri Chakra Artwork */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '12px 0 20px'
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(223, 177, 91, 0.15) 0%, rgba(120, 16, 38, 0.2) 100%)',
                    border: '1px solid rgba(223, 177, 91, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(223, 177, 91, 0.25)'
                  }}
                >
                  <SriChakraSvg size={105} isRotating={false} />
                </div>
              </div>

              {/* Cordial Invite Salutation */}
              <p
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.16em',
                  color: '#e5d5be',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                {t('invitation.cordialInvite')}
              </p>

              <p style={{ fontSize: '0.88rem', color: '#c5b49d', marginBottom: '14px' }}>
                {t('invitation.toAttend')}
              </p>

              {/* Main Event Title */}
              <h2
                className="font-cinzel text-gold-gradient"
                style={{
                  fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '20px',
                  lineHeight: 1.2
                }}
              >
                {eventTitle}
              </h2>

              {/* Auspicious Date & Time Plaque */}
              <div
                style={{
                  background: 'rgba(12, 3, 7, 0.75)',
                  border: '1px solid rgba(223, 177, 91, 0.35)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  maxWidth: '520px',
                  margin: '0 auto 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ffd883' }}>
                  <Calendar size={18} className="text-[#dfb15b]" />
                  <span className="font-cinzel" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                    {eventDate}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ded0bc', fontSize: '0.9rem' }}>
                  <Clock size={16} className="text-[#dfb15b]" />
                  <span>{eventTime}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ded0bc', fontSize: '0.9rem' }}>
                  <MapPin size={16} className="text-[#dfb15b]" />
                  <span>{eventVenue}, {eventLocation}</span>
                </div>
              </div>

              {/* Devotional Description / Sankalpa */}
              <p style={{ color: '#d3c4b0', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 24px' }}>
                {eventDesc}
              </p>

              {/* Prasada Notice */}
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#dfb15b',
                  fontStyle: 'italic',
                  borderTop: '1px solid rgba(223, 177, 91, 0.25)',
                  paddingTop: '16px',
                  maxWidth: '480px',
                  margin: '0 auto'
                }}
              >
                {t('invitation.invitationFooterNote')}
              </div>
            </div>
          ) : (
            /* Uploaded Official Invitation Asset (Image / PDF preview) */
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(223, 177, 91, 0.4)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                  marginBottom: '16px'
                }}
              >
                <img
                  src={event.invitationImage || event.image}
                  alt="Official Invitation card"
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', display: 'block', backgroundColor: '#070103' }}
                />
              </div>

              <p style={{ fontSize: '0.82rem', color: '#bfae98' }}>
                Client Note: High-resolution printed invitation artwork (front & back) can be uploaded via the Admin Portal.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Toolbar */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(223, 177, 91, 0.25)',
            background: 'rgba(12, 3, 7, 0.95)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Left Actions: WhatsApp & Share */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={handleWhatsappShare}
              style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid #22c55e',
                color: '#4ade80',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={15} />
              <span>{t('buttons.shareWhatsapp')}</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-gold-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              {copiedLink ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
              <span>{copiedLink ? t('buttons.copied') : t('buttons.share')}</span>
            </button>
          </div>

          {/* Right Actions: Add to Calendar & Download */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
            >
              <Calendar size={14} />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              className="btn-gold-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              title="Download standard .ics calendar file"
            >
              <Download size={14} />
              <span>.ICS</span>
            </button>

            <button
              onClick={handleDownloadCard}
              className="btn-gold-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              <Download size={14} />
              <span>{t('buttons.downloadInvitation')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
