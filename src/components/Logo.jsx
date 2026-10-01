import React from 'react';
import SriChakraSvg from '../animations/SriChakraSvg';

/**
 * Logo Component
 * Preserves the exact existing Sri Chakra sacred emblem from the previous website.
 * Used consistently across Navbar, Footer, Favicon, Loading Screen, Invitation, and Admin branding.
 */
export default function Logo({
  size = 42,
  showText = true,
  subText = 'SHRI KSHETHRA KUKKIKATTE',
  className = '',
  isRotating = false
}) {
  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* Sacred Gold & Maroon Emblem */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 185, 100, 0.2) 0%, rgba(120, 16, 38, 0.35) 60%, rgba(8, 1, 4, 0.9) 100%)',
          border: '1.5px solid rgba(229, 185, 100, 0.65)',
          boxShadow: '0 0 18px rgba(229, 185, 100, 0.3), inset 0 0 10px rgba(229, 185, 100, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative'
        }}
      >
        <SriChakraSvg size={Math.round(size * 0.8)} isRotating={isRotating} />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div
            className="font-cinzel text-gold-gradient"
            style={{
              fontSize: size > 40 ? '1.1rem' : '0.95rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              lineHeight: 1.15
            }}
          >
            SHRI CHAKRA POOJA
          </div>
          <div
            style={{
              fontSize: '0.64rem',
              color: '#dfb15b',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: 0.9,
              marginTop: '2px'
            }}
          >
            {subText}
          </div>
        </div>
      )}
    </div>
  );
}
