import React, { useEffect, useRef } from 'react';

interface MarqueeStripProps {
  theme?: 'light' | 'dark';
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let extraSpeed = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      extraSpeed = Math.min(delta * 0.05, 4);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    let animId: number;
    let offset = 0;
    const animate = () => {
      offset -= 0.6 + extraSpeed;
      extraSpeed *= 0.92; // smooth decay back to baseline
      if (trackRef.current) {
        // Loop back after width
        if (Math.abs(offset) > 1200) {
          offset = 0;
        }
        trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const phrases = [
    { hi: 'देसी घी फुल्के', en: 'Whole Wheat Phulkas' },
    { hi: 'ताज़ा दाल तड़का', en: 'Slow Simmered Dal' },
    { hi: 'घर की थाली', en: 'Homemade Thali' },
    { hi: 'कोटा टिफिन सेवा', en: 'Daily Student Tiffin' },
    { hi: 'शुद्ध शाकाहारी', en: '100% Pure Vegetarian' },
    { hi: 'हल्का व सुपाच्य', en: 'Light Everyday Food' },
    { hi: 'बोरखेड़ा कोटा', en: 'Borkhera Cloud Kitchen' },
    { hi: 'कोई पुराना मसाला नहीं', en: 'Zero Preservatives' },
  ];

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden py-3 border-y select-none ${
        isDark
          ? 'bg-[#160E0B] border-[#FAF5ED]/10 text-[#FAF5ED]'
          : 'bg-[#FAF5ED] border-[#1E1410]/10 text-[#1E1410]'
      }`}
      style={{ overflow: 'clip' }}
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {/* Render twice for continuous loop */}
        {[...phrases, ...phrases, ...phrases].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-6 text-xs md:text-sm">
            <span className="font-hindi text-[#A8442A] font-semibold">{item.hi}</span>
            <span className="opacity-30">/</span>
            <span className="font-mono uppercase tracking-widest text-[11px] opacity-75">
              {item.en}
            </span>
            <span className="opacity-30">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};
