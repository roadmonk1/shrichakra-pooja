import React, { useState } from 'react';
import { Sparkles, Filter, Maximize2, Calendar, User, Heart, ArrowRight, Shield, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LightboxModal from '../components/LightboxModal';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function GalleryPage({
  galleryPhotos,
  setActivePage
}) {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // ALL, OFFICIAL, COMMUNITY
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const uniqueYears = Array.from(new Set(['2026', '2025', '2024', '2023', ...(galleryPhotos || []).map(p => p.year)])).filter(Boolean);
  uniqueYears.sort((a, b) => Number(b) - Number(a));
  const years = ['ALL', ...uniqueYears];

  // Filter photos by both year and category
  const filteredPhotos = (galleryPhotos || []).filter((p) => {
    const matchYear = selectedYear === 'ALL' || p.year === selectedYear;
    const matchCategory = selectedCategory === 'ALL' || (p.category || 'OFFICIAL') === selectedCategory;
    return matchYear && matchCategory;
  });

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
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
            <Sparkles size={12} className="text-[#ffd700]" />
            <span>{t('nav.gallery')}</span>
          </span>

          <h1
            className="font-cinzel text-gold-gradient"
            style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', marginBottom: '16px', lineHeight: 1.15, fontWeight: 900 }}
          >
            {t('gallery.title')}
          </h1>

          <p className="font-cormorant" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: '#f5ebd9', lineHeight: 1.5 }}>
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. DUAL FILTERS: YEAR & CATEGORY (OFFICIAL VS COMMUNITY)       */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '36px' }}>
        <div className="container">
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'ALL', label: 'All Photographs', icon: Sparkles },
              { id: 'OFFICIAL', label: t('gallery.officialTab'), icon: Shield },
              { id: 'COMMUNITY', label: t('gallery.communityTab'), icon: Camera }
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(229, 185, 100, 0.3) 0%, rgba(138, 21, 56, 0.4) 100%)'
                      : 'rgba(12, 2, 7, 0.7)',
                    border: '1px solid',
                    borderColor: isSelected ? '#e5b964' : 'rgba(229, 185, 100, 0.25)',
                    color: isSelected ? '#ffd983' : '#dac8af',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(229, 185, 100, 0.25)' : 'none'
                  }}
                >
                  <Icon size={14} className={isSelected ? 'text-[#ffd700]' : 'text-[#e5b964]'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Year Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {years.map((y) => {
              const isSelected = selectedYear === y;
              return (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #e5b964 0%, #b88628 100%)'
                      : 'rgba(14, 2, 7, 0.75)',
                    color: isSelected ? '#080104' : '#e5d7c3',
                    border: '1px solid',
                    borderColor: isSelected ? '#ffe5a3' : 'rgba(229, 185, 100, 0.3)',
                    padding: '6px 18px',
                    borderRadius: '24px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: isSelected ? 800 : 500,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 15px rgba(229, 185, 100, 0.35)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {y === 'ALL' ? t('gallery.allFilter') : y}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MASONRY PHOTO GRID                                          */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '80px' }}>
        <div className="container">
          {filteredPhotos.length === 0 ? (
            <div
              className="spiritual-card gold-ornate-card"
              style={{ padding: '60px 24px', textAlign: 'center', color: '#dac8af', maxWidth: '640px', margin: '0 auto' }}
            >
              <Camera size={38} className="text-[#dfb15b]" style={{ margin: '0 auto 16px', opacity: 0.85 }} />
              <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                {t('gallery.noPhotos')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#bca992', marginBottom: '20px' }}>
                Official temple photography and devotee moments will be presented here once consecrated rituals conclude.
              </p>
              <button
                onClick={() => {
                  setActivePage('share');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-gold-primary"
                style={{ fontSize: '0.84rem', padding: '10px 22px' }}
              >
                <Heart size={14} />
                <span>{t('nav.share')}</span>
              </button>
            </div>
          ) : (
            <div
              style={{
                columnCount: 3,
                columnGap: '24px'
              }}
              className="gallery-masonry"
            >
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(idx)}
                  className="spiritual-card"
                  style={{
                    marginBottom: '24px',
                    breakInside: 'avoid',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(229, 185, 100, 0.35)'
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Year Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(8, 1, 4, 0.92)',
                        border: '1px solid rgba(229, 185, 100, 0.55)',
                        color: '#ffd983',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-serif)'
                      }}
                    >
                      {photo.year}
                    </div>

                    {/* Enlarge Icon */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(8, 1, 4, 0.85)',
                        border: '1px solid rgba(229, 185, 100, 0.4)',
                        color: '#ffd983',
                        padding: '6px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Enlarge photograph"
                    >
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#f5ebd9', lineHeight: 1.45, fontWeight: 600 }}>
                      {photo.caption}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        fontSize: '0.74rem',
                        color: '#dac8af'
                      }}
                    >
                      <span>{t('gallery.uploadedBy')} {photo.uploadedBy}</span>
                      <span
                        style={{
                          background: photo.category === 'COMMUNITY' ? 'rgba(234, 88, 12, 0.2)' : 'rgba(229, 185, 100, 0.2)',
                          color: photo.category === 'COMMUNITY' ? '#fdba74' : '#ffd983',
                          border: '1px solid rgba(229, 185, 100, 0.35)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 600
                        }}
                      >
                        {photo.category === 'COMMUNITY' ? 'COMMUNITY' : 'OFFICIAL'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SHARE MOMENT CALL TO ACTION                                 */}
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
                marginBottom: '12px'
              }}
            >
              <Heart size={12} className="text-[#e5b964]" />
              <span>{t('nav.share')}</span>
            </span>

            <h2 className="font-cinzel text-gold-light" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', marginBottom: '14px', fontWeight: 800 }}>
              {t('share.headline')}
            </h2>

            <p style={{ maxWidth: '640px', margin: '0 auto 28px', color: '#e5d7c3', fontSize: '0.96rem', lineHeight: 1.65 }}>
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

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        photo={filteredPhotos[currentIndex]}
        photos={filteredPhotos}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <style>{`
        @media (max-width: 900px) {
          .gallery-masonry {
            column-count: 2 !important;
          }
        }
        @media (max-width: 600px) {
          .gallery-masonry {
            column-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
