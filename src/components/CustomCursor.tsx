import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const spotlightPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Only enable on non-touch fine pointers and screens >= 768px
    if (window.innerWidth < 768) return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const interactive = target?.closest('button, a, input, select, textarea');
        if (interactive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth lerp frame loop
    let animId: number;
    const render = () => {
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.2;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.2;

      // Slower lerp for the ambient spotlight glow
      spotlightPosRef.current.x += (posRef.current.targetX - spotlightPosRef.current.x) * 0.08;
      spotlightPosRef.current.y += (posRef.current.targetY - spotlightPosRef.current.y) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPosRef.current.x}px, ${spotlightPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Soft spotlight glow following pointer with lerp smoothing (desktop only) */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] w-[340px] h-[340px] rounded-full opacity-45 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(196,138,31,0.15) 0%, rgba(168,68,42,0.06) 40%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Main Cursor Element */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,background-color] duration-200 ease-out flex items-center justify-center rounded-full text-center ${
          isHovered
            ? cursorText
              ? 'w-16 h-16 bg-[#1E1410] text-[#FAF5ED] border border-[#FAF5ED]/30'
              : 'w-10 h-10 bg-[#C48A1F]/30 backdrop-blur-[1px] border border-[#C48A1F]'
            : 'w-2.5 h-2.5 bg-[#A8442A]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
