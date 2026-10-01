import React, { useState } from 'react';
import { Sparkles, Layers, Shield, Compass, BookOpen, Heart, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/contentData';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function AboutPage({
  setActivePage
}) {
  const { language, t, resolveText } = useLanguage();
  const [activeHighlight, setActiveHighlight] = useState(0);

  const sectionIcons = [
    <Compass key="1" size={18} className="text-[#dfb15b]" />,
    <Layers key="2" size={18} className="text-[#dfb15b]" />,
    <Sparkles key="3" size={18} className="text-[#dfb15b]" />,
    <Layers key="4" size={18} className="text-[#dfb15b]" />,
    <Award key="5" size={18} className="text-[#dfb15b]" />,
    <BookOpen key="6" size={18} className="text-[#dfb15b]" />,
    <Heart key="7" size={18} className="text-[#dfb15b]" />,
    <Shield key="8" size={18} className="text-[#dfb15b]" />
  ];

  const sections = siteContent.aboutSections;

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
          background: 'radial-gradient(circle at 50% 0%, rgba(120, 16, 38, 0.25) 0%, transparent 70%)'
        }}
      >
        <div className="container" style={{ maxWidth: '840px' }}>
          <span className="demo-tag" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} />
            <span>{t('hero.geometrySummary')}</span>
          </span>

          <h1
            className="font-cinzel text-gold-gradient"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '16px', lineHeight: 1.15 }}
          >
            {t('nav.about')}
          </h1>

          <p className="font-cormorant" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#eeddc3', lineHeight: 1.6 }}>
            {t('hero.subtitle')}
          </p>

          <div
            style={{
              marginTop: '20px',
              display: 'inline-block',
              background: 'rgba(20, 5, 12, 0.8)',
              border: '1px dashed rgba(223, 177, 91, 0.35)',
              padding: '6px 16px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              color: '#d4b478'
            }}
          >
            {language === 'en' ? 'English Content' : language === 'kn' ? 'ಕನ್ನಡ ವಿವರಣೆ (Kannada Content)' : 'संस्कृत विवरणम् (Sanskrit in Devanagari)'}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. ALTERNATING 8 SECTIONS (IMAGE <-> TEXT)                    */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: '20px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {sections.map((sec, idx) => {
            const isEven = idx % 2 === 1; // Alternating layout
            const titleText = resolveText(sec.title, 'Sacred Section');
            const taglineText = resolveText(sec.tagline, 'Cosmic Principle');
            const bodyContent = resolveText(sec.content, 'Client-provided content will appear here.');
            const badgeText = resolveText(sec.badge, 'Knowledge');

            return (
              <div
                key={sec.id}
                className="spiritual-card spiritual-corner"
                style={{
                  padding: 'clamp(28px, 4vw, 56px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '48px',
                  alignItems: 'center'
                }}
              >
                {/* Visual Column */}
                <div
                  style={{
                    order: isEven ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      aspectRatio: '1',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(120, 16, 38, 0.22) 0%, rgba(223, 177, 91, 0.05) 50%, transparent 75%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      border: '1px solid rgba(223, 177, 91, 0.18)',
                      boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(223, 177, 91, 0.08)'
                    }}
                  >
                    <SriChakraSvg
                      size={290}
                      highlightLayer={sec.layerIndex}
                      isRotating={idx % 2 === 0}
                    />

                    {/* Section Number Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: 'rgba(223, 177, 91, 0.35)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {sec.number}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        background: 'rgba(10, 2, 6, 0.85)',
                        border: '1px solid rgba(223, 177, 91, 0.3)',
                        borderRadius: '20px',
                        padding: '2px 10px',
                        fontSize: '0.68rem',
                        color: '#dfb15b'
                      }}
                    >
                      Layer {sec.layerIndex || 'Sacred Whole'}
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div style={{ order: isEven ? 1 : 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(223, 177, 91, 0.12)',
                        border: '1px solid rgba(223, 177, 91, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {sectionIcons[idx]}
                    </div>
                    <span className="demo-tag">{badgeText}</span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.82rem',
                      color: '#dfb15b',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}
                  >
                    SECTION {sec.number} • {taglineText}
                  </div>

                  <h2
                    className="font-cinzel text-gold-light"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                      marginBottom: '16px',
                      lineHeight: 1.2
                    }}
                  >
                    {titleText}
                  </h2>

                  <p
                    style={{
                      color: '#ded1be',
                      fontSize: '0.98rem',
                      lineHeight: 1.8,
                      marginBottom: '20px'
                    }}
                  >
                    {bodyContent}
                  </p>

                  <div
                    style={{
                      background: 'rgba(12, 3, 7, 0.6)',
                      borderLeft: '3px solid #dfb15b',
                      padding: '10px 14px',
                      borderRadius: '0 6px 6px 0',
                      fontSize: '0.78rem',
                      color: '#bfa78a'
                    }}
                  >
                    {t('demo.watermark')}: Client-provided history, family lineage, and Sanskrit verses will appear here.
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. NEXT STEPS BANNER                                           */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container">
          <div
            className="spiritual-card"
            style={{
              padding: '40px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, rgba(20, 5, 12, 0.9) 0%, rgba(10, 2, 6, 0.95) 100%)'
            }}
          >
            <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              {t('nav.pooja')}
            </h3>
            <p style={{ color: '#c7b69c', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.92rem' }}>
              {t('hero.subtitle')}
            </p>
            <button
              onClick={() => {
                setActivePage('pooja');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold-primary"
            >
              <span>{t('buttons.viewDetails')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
