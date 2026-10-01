import React from 'react';

/**
 * SriChakraSvg - Mathematically balanced Sri Yantra SVG
 * Features:
 * - Bindu (Central Point)
 * - 9 Intersecting Triangles (4 Shiva upward, 5 Shakti downward) forming 43 sub-triangles
 * - 8 Petal Lotus (Ashtadala)
 * - 16 Petal Lotus (Shodashadala)
 * - Concentric circles (Traivritta)
 * - Bhupura (Earth Citadel with 4 portals)
 * - Golden gradients and luminous SVG filters
 */
export default function SriChakraSvg({
  size = 500,
  className = '',
  highlightLayer = 0,
  isWatermark = false,
  isRotating = true
}) {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `gold-grad-${uniqueId}`;
  const glowId = `glow-${uniqueId}`;
  const radialGlowId = `radial-${uniqueId}`;

  // Generate 8 Lotus Petals
  const eightPetals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    const rInner = 145;
    const rOuter = 180;
    const cx = 300;
    const cy = 300;
    const x1 = cx + rInner * Math.cos(angle - 0.22);
    const y1 = cy + rInner * Math.sin(angle - 0.22);
    const xTip = cx + rOuter * Math.cos(angle);
    const yTip = cy + rOuter * Math.sin(angle);
    const x2 = cx + rInner * Math.cos(angle + 0.22);
    const y2 = cy + rInner * Math.sin(angle + 0.22);
    return `M ${x1} ${y1} Q ${cx + (rOuter + 8) * Math.cos(angle - 0.12)} ${cy + (rOuter + 8) * Math.sin(angle - 0.12)} ${xTip} ${yTip} Q ${cx + (rOuter + 8) * Math.cos(angle + 0.12)} ${cy + (rOuter + 8) * Math.sin(angle + 0.12)} ${x2} ${y2} Z`;
  });

  // Generate 16 Lotus Petals
  const sixteenPetals = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const rInner = 184;
    const rOuter = 216;
    const cx = 300;
    const cy = 300;
    const x1 = cx + rInner * Math.cos(angle - 0.12);
    const y1 = cy + rInner * Math.sin(angle - 0.12);
    const xTip = cx + rOuter * Math.cos(angle);
    const yTip = cy + rOuter * Math.sin(angle);
    const x2 = cx + rInner * Math.cos(angle + 0.12);
    const y2 = cy + rInner * Math.sin(angle + 0.12);
    return `M ${x1} ${y1} Q ${cx + (rOuter + 6) * Math.cos(angle - 0.06)} ${cy + (rOuter + 6) * Math.sin(angle - 0.06)} ${xTip} ${yTip} Q ${cx + (rOuter + 6) * Math.cos(angle + 0.06)} ${cy + (rOuter + 6) * Math.sin(angle + 0.06)} ${x2} ${y2} Z`;
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 600"
      width={size}
      height={size}
      className={`${className} ${isRotating ? 'animate-slow-spin' : ''}`}
      style={{
        maxWidth: '100%',
        height: 'auto',
        overflow: 'visible',
        filter: isWatermark ? 'none' : `url(#${glowId})`
      }}
      aria-label="Sacred Sri Chakra Yantra Geometry"
      role="img"
    >
      <defs>
        {/* Rich Warm Gold Metallic Gradient */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8db" />
          <stop offset="25%" stopColor="#f3cf7a" />
          <stop offset="50%" stopColor="#dfb15b" />
          <stop offset="75%" stopColor="#b48328" />
          <stop offset="100%" stopColor="#e5be6b" />
        </linearGradient>

        {/* Soft Sacred Glow */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="blur1" />
          <feGaussianBlur stdDeviation="4.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle Radial Aura Glow */}
        <radialGradient id={radialGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dfb15b" stopOpacity={isWatermark ? "0.08" : "0.22"} />
          <stop offset="45%" stopColor="#dfb15b" stopOpacity={isWatermark ? "0.03" : "0.08"} />
          <stop offset="100%" stopColor="#781026" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura Circle */}
      {!isWatermark && (
        <circle cx="300" cy="300" r="280" fill={`url(#${radialGlowId})`} />
      )}

      {/* ============================================================== */}
      {/* 1. BHUPURA (EARTH CITADEL - Outer Square with 4 Gates)          */}
      {/* ============================================================== */}
      <g
        id="bhupura"
        stroke={`url(#${gradId})`}
        fill="none"
        strokeWidth={isWatermark ? 1 : 1.6}
        opacity={highlightLayer === 1 || highlightLayer === 0 ? 1 : 0.25}
      >
        {/* Tier 1 Outer Gateway */}
        <path
          d="
            M 30,30 L 250,30 L 250,15 L 350,15 L 350,30 L 570,30
            L 570,250 L 585,250 L 585,350 L 570,350 L 570,570
            L 350,570 L 350,585 L 250,585 L 250,570 L 30,570
            L 30,350 L 15,350 L 15,250 L 30,250 Z
          "
        />

        {/* Tier 2 Middle Gateway */}
        <path
          d="
            M 42,42 L 256,42 L 256,28 L 344,28 L 344,42 L 558,42
            L 558,256 L 572,256 L 572,344 L 558,344 L 558,558
            L 344,558 L 344,572 L 256,572 L 256,558 L 42,558
            L 42,344 L 28,344 L 28,256 L 42,256 Z
          "
          strokeWidth={isWatermark ? 0.8 : 1.1}
          opacity={0.8}
        />

        {/* Tier 3 Inner Gateway */}
        <path
          d="
            M 54,54 L 262,54 L 262,40 L 338,40 L 338,54 L 546,54
            L 546,262 L 560,262 L 560,338 L 546,338 L 546,546
            L 338,546 L 338,560 L 262,560 L 262,546 L 54,546
            L 54,338 L 40,338 L 40,262 L 54,262 Z
          "
          strokeWidth={isWatermark ? 0.7 : 0.9}
          opacity={0.65}
        />
      </g>

      {/* ============================================================== */}
      {/* 2. TRAIVRITTA (Three Concentric Circles)                        */}
      {/* ============================================================== */}
      <g stroke={`url(#${gradId})`} fill="none" opacity={highlightLayer === 0 ? 0.75 : 0.3}>
        <circle cx="300" cy="300" r="236" strokeWidth={isWatermark ? 0.8 : 1.4} />
        <circle cx="300" cy="300" r="230" strokeWidth={isWatermark ? 0.6 : 0.9} strokeDasharray="3 3" />
        <circle cx="300" cy="300" r="224" strokeWidth={isWatermark ? 0.8 : 1.4} />
      </g>

      {/* ============================================================== */}
      {/* 3. SHODASHA DALA (16 Lotus Petals)                             */}
      {/* ============================================================== */}
      <g
        id="shodasha-dala"
        stroke={`url(#${gradId})`}
        fill="rgba(223, 177, 91, 0.02)"
        strokeWidth={isWatermark ? 0.8 : 1.2}
        opacity={highlightLayer === 2 || highlightLayer === 0 ? 0.9 : 0.25}
      >
        {sixteenPetals.map((d, i) => (
          <path key={`p16-${i}`} d={d} />
        ))}
      </g>

      {/* Ring between 16 and 8 petals */}
      <circle
        cx="300"
        cy="300"
        r="184"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={isWatermark ? 0.8 : 1.2}
        opacity={0.7}
      />
      <circle
        cx="300"
        cy="300"
        r="180"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={0.7}
        strokeDasharray="2 3"
        opacity={0.5}
      />

      {/* ============================================================== */}
      {/* 4. ASHTA DALA (8 Lotus Petals)                                  */}
      {/* ============================================================== */}
      <g
        id="ashta-dala"
        stroke={`url(#${gradId})`}
        fill="rgba(223, 177, 91, 0.03)"
        strokeWidth={isWatermark ? 0.9 : 1.3}
        opacity={highlightLayer === 3 || highlightLayer === 0 ? 0.95 : 0.25}
      >
        {eightPetals.map((d, i) => (
          <path key={`p8-${i}`} d={d} />
        ))}
      </g>

      {/* Ring enclosing the 9 Intersecting Triangles */}
      <circle
        cx="300"
        cy="300"
        r="144"
        fill="rgba(120, 16, 38, 0.04)"
        stroke={`url(#${gradId})`}
        strokeWidth={isWatermark ? 1 : 1.6}
        opacity={0.85}
      />
      <circle
        cx="300"
        cy="300"
        r="141"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={0.8}
        opacity={0.5}
      />

      {/* ============================================================== */}
      {/* 5. NAVA YONI (The 9 Interlocking Primary Triangles)             */}
      {/* 4 Shiva Triangles (Pointing UP)                                */}
      {/* 5 Shakti Triangles (Pointing DOWN)                             */}
      {/* Creating the 43 interlocking triangles                         */}
      {/* ============================================================== */}
      <g
        id="interlocking-triangles"
        stroke={`url(#${gradId})`}
        fill="rgba(223, 177, 91, 0.015)"
        strokeWidth={isWatermark ? 0.9 : 1.5}
        strokeLinejoin="round"
        opacity={highlightLayer >= 4 || highlightLayer === 0 ? 1 : 0.25}
      >
        {/* Shiva 1 (Upward - outermost) */}
        <polygon points="300,165 425,385 175,385" />

        {/* Shiva 2 (Upward) */}
        <polygon points="300,195 405,360 195,360" />

        {/* Shiva 3 (Upward) */}
        <polygon points="300,230 380,342 220,342" />

        {/* Shiva 4 (Upward - innermost central trikona) */}
        <polygon points="300,265 350,325 250,325" strokeWidth={isWatermark ? 1 : 1.7} />

        {/* Shakti 1 (Downward - outermost) */}
        <polygon points="300,435 425,215 175,215" />

        {/* Shakti 2 (Downward) */}
        <polygon points="300,405 405,240 195,240" />

        {/* Shakti 3 (Downward) */}
        <polygon points="300,370 380,258 220,258" />

        {/* Shakti 4 (Downward - middle) */}
        <polygon points="300,335 355,275 245,275" />

        {/* Shakti 5 (Downward - innermost encompassing Bindu) */}
        <polygon
          points="300,328 328,284 272,284"
          strokeWidth={isWatermark ? 1.2 : 2.0}
          stroke="#fff4be"
          fill="rgba(255, 230, 140, 0.08)"
        />
      </g>

      {/* Decorative Star/Radiant Lines */}
      <g stroke={`url(#${gradId})`} strokeWidth="0.6" opacity="0.35">
        <line x1="300" y1="165" x2="300" y2="435" strokeDasharray="3 4" />
        <line x1="175" y1="300" x2="425" y2="300" strokeDasharray="3 4" />
      </g>

      {/* ============================================================== */}
      {/* 6. BINDU (Supreme Center Point of Pure Consciousness)          */}
      {/* ============================================================== */}
      <g
        id="bindu"
        opacity={highlightLayer === 9 || highlightLayer === 0 ? 1 : 0.3}
      >
        <circle cx="300" cy="300" r="10" fill="url(#radial-glow)" opacity="0.8" />
        <circle cx="300" cy="300" r="5" fill="#fffbe6" />
        <circle cx="300" cy="300" r="2.5" fill="#dfb15b" />
        {/* Subtle pulsating aura around bindu */}
        {!isWatermark && (
          <circle
            cx="300"
            cy="300"
            r="16"
            fill="none"
            stroke="#ffe895"
            strokeWidth="0.8"
            opacity="0.6"
            className="animate-subtle-pulse"
          />
        )}
      </g>
    </svg>
  );
}
