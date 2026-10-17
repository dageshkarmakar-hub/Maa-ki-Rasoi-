import React, { useEffect, useRef, useState } from 'react';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const words = `We started this kitchen in Borkhera because hostel food in Kota makes people sick. When you sit with books for twelve hours a day, you do not need heavy cream, re-fried oil, or yesterday’s gravy. You need what your mother makes at noon. Fresh whole wheat chakki atta kneaded twice every day. Arhar and moong dal tempered with garlic, hing and roasted cumin. Green vegetables bought from the mandi at six in the morning. Rotis taken hot off the tawa and brushed with real ghee. We do not run a restaurant. We run a cloud kitchen that sends clean, gentle food to student rooms and homes across Kota. Nothing complicated. Just honest ghar ka khana that lets you sleep well and wake up fresh.`.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from when top of section enters to when it leaves
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative w-full max-w-full bg-[#1E1410] text-[#FAF5ED] py-20 md:py-36 px-4 sm:px-6 md:px-12 border-b border-[#FAF5ED]/10 overflow-x-clip overflow-hidden"
    >
      {/* Paper grain overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Marker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#C48A1F] uppercase mb-10">
          <span className="font-bold">02</span>
          <span>/</span>
          <span>Manifesto & Principle</span>
          <span>/</span>
          <span className="font-hindi text-[#FAF5ED]/60">रसोई की नीति</span>
        </div>

        {/* Scrubbed word-by-word paragraph */}
        <p className="font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-[1.38] tracking-[-0.01em] text-wrap-balance">
          {words.map((word, index) => {
            const wordThreshold = index / words.length;
            const isFilled = scrollProgress >= wordThreshold;

            return (
              <span
                key={index}
                className="inline-block transition-opacity duration-200 mr-[0.28em]"
                style={{
                  opacity: isFilled ? 1 : 0.22,
                  color: isFilled ? (word.includes('ghar') || word.includes('khana') || word.includes('Borkhera') || word.includes('ghee') ? '#D9A038' : '#FAF5ED') : '#FAF5ED',
                }}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* Bottom signatory / credentials */}
        <div className="mt-14 pt-8 border-t border-[#FAF5ED]/15 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-[#FAF5ED]/60">
          <div>
            <div className="text-[#FAF5ED] font-serif text-base">Shubh Labh Enclave, Balaji Awas I</div>
            <div className="mt-0.5">Borkhera, Kota · Cooked daily since 2023</div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#C48A1F] font-bold">100%</span> Pure Vegetarian
            </div>
            <div>
              <span className="text-[#C48A1F] font-bold">ZERO</span> Re-used Oil
            </div>
            <div>
              <span className="text-[#C48A1F] font-bold">FRESH</span> Mandi Produce
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
