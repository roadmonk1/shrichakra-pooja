import React, { useState } from 'react';
import { AlertCircle, FileText, Shield, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DemoBanner({ onOpenChecklist, onNavigateAdmin }) {
  const { t } = useLanguage();
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#1c0812] border border-[#dfb15b]/40 text-[#dfb15b] px-3 py-1.5 rounded-full shadow-2xl text-xs font-cinzel hover:border-[#dfb15b] transition-all"
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 10px rgba(223, 177, 91, 0.3)'
        }}
        title="Open Prototype Notice"
      >
        <AlertCircle size={14} />
        <span>{t('demo.watermark')}</span>
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="Demo Prototype Notice"
      style={{
        background: 'linear-gradient(90deg, rgba(20,4,10,0.95) 0%, rgba(35,8,18,0.95) 50%, rgba(20,4,10,0.95) 100%)',
        borderBottom: '1px solid rgba(223, 177, 91, 0.3)',
        boxShadow: '0 2px 15px rgba(0,0,0,0.6)',
        position: 'relative',
        zIndex: 50,
        fontSize: '0.8rem'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '6px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Left Notice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f7eedb' }}>
          <span
            style={{
              background: 'rgba(223, 177, 91, 0.18)',
              color: '#ffd883',
              border: '1px solid rgba(223, 177, 91, 0.4)',
              borderRadius: '3px',
              padding: '1px 6px',
              fontWeight: 700,
              fontSize: '0.68rem',
              letterSpacing: '0.08em'
            }}
          >
            {t('demo.watermark')}
          </span>
          <span style={{ color: '#e5d9c2' }}>
            {t('demo.prototypeDesc')}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenChecklist}
            style={{
              background: 'rgba(223, 177, 91, 0.12)',
              border: '1px solid rgba(223, 177, 91, 0.45)',
              color: '#ffd883',
              padding: '4px 10px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FileText size={13} />
            <span>{t('footer.checklistBtn')}</span>
          </button>

          <button
            onClick={onNavigateAdmin}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#c9bba7',
              padding: '4px 10px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              cursor: 'pointer'
            }}
          >
            <Shield size={13} />
            <span>{t('nav.admin')}</span>
          </button>

          <button
            onClick={() => setMinimized(true)}
            aria-label={t('buttons.close')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8f7e6c',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
