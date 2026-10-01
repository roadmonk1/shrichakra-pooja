import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas - Subtle floating golden spiritual stardust particles
 * Optimized for 60fps performance and respects reduced-motion.
 */
export default function ParticleCanvas({ particleCount = 45 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Responsive count: fewer on smaller screens
    const actualCount = width < 768 ? Math.min(20, particleCount) : particleCount;

    // Create particles
    const particles = Array.from({ length: actualCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      maxOpacity: Math.random() * 0.5 + 0.3,
      minOpacity: 0.1,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.01 + 0.005
    }));

    let step = 0;
    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upwards slowly
        p.y -= p.speedY;
        p.x += Math.sin(step * p.swaySpeed + p.swayOffset) * 0.35 + p.speedX;

        // Opacity pulsing
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.fadeSpeed = -Math.abs(p.fadeSpeed);
        } else if (p.opacity < p.minOpacity) {
          p.opacity = p.minOpacity;
          p.fadeSpeed = Math.abs(p.fadeSpeed);
        }

        // Reset if offscreen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft golden glowing particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(255, 235, 170, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(223, 177, 91, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(120, 16, 38, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85
      }}
    />
  );
}
