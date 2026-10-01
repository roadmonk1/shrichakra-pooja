import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LightboxModal({
  photo,
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !photo) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        zIndex: 10000,
        backgroundColor: 'rgba(4, 1, 2, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label={t('buttons.close')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          background: 'rgba(20, 5, 12, 0.8)',
          border: '1px solid rgba(223, 177, 91, 0.4)',
          color: '#ffd883',
          padding: '8px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10010,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
      >
        <X size={22} />
      </button>

      {/* Nav Controls */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label={t('buttons.previous')}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 5, 12, 0.8)',
              border: '1px solid rgba(223, 177, 91, 0.4)',
              color: '#ffd883',
              padding: '12px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10010,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label={t('buttons.next')}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(20, 5, 12, 0.8)',
              border: '1px solid rgba(223, 177, 91, 0.4)',
              color: '#ffd883',
              padding: '12px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10010,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Main Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1000px',
          width: '92vw',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* The Image */}
        <div
          style={{
            position: 'relative',
            maxHeight: '70vh',
            maxWidth: '100%',
            overflow: 'hidden',
            borderRadius: '10px',
            border: '1px solid rgba(223, 177, 91, 0.4)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(223, 177, 91, 0.15)'
          }}
        >
          <img
            src={photo.imageUrl}
            alt={photo.caption || 'Sri Chakra Pooja celebration photograph'}
            style={{
              maxHeight: '70vh',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Caption & Metadata Bar */}
        <div
          style={{
            marginTop: '16px',
            width: '100%',
            background: 'rgba(18, 5, 11, 0.85)',
            border: '1px solid rgba(223, 177, 91, 0.3)',
            borderRadius: '8px',
            padding: '14px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <p style={{ color: '#ffebaa', fontSize: '0.95rem', fontWeight: 500 }}>
              {photo.caption}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', fontSize: '0.78rem', color: '#bca992' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} className="text-[#dfb15b]" />
                {photo.year}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={13} className="text-[#dfb15b]" />
                {t('gallery.uploadedBy')}: {photo.uploadedBy}
              </span>
              <span className="demo-watermark-badge">{t('gallery.demoBadge')}</span>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#dfb15b', fontFamily: 'var(--font-serif)' }}>
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
