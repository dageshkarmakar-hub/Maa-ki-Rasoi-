import React, { useEffect, useRef } from 'react';
import { SteamRibbonSwirlScene } from '../motion/three-scenes';

export const SteamSwirlSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeRef.current) return;
    const scene = new SteamRibbonSwirlScene();
    const cleanup = scene.init(threeRef.current);
    return () => cleanup();
  }, []);

  const phrases = [
    'ORDER GHAR KA KHANA',
    'TAAZA GHEE PHULKE',
    'SLOW SIMMERED DAL',
    'KOTA TIFFIN SEWA',
    'PURE VEGETARIAN',
    'BOR KHERA KITCHEN',
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-full bg-[#160E0B] text-[#FAF5ED] py-20 md:py-36 px-4 sm:px-6 md:px-12 border-b border-[#FAF5ED]/10 select-none"
      style={{ overflow: 'clip' }}
    >
      {/* Background radial glow safely clipped inside inset: 0 container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ overflow: 'clip' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196,138,31,0.2) 0%, transparent 65%)',
          }}
        />
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-20" />
      </div>

      {/* Top Floating Heading that crossfades on scroll */}
      <div className="max-w-4xl mx-auto text-center relative z-20 mb-10 px-2">
        <div className="text-[11px] font-mono tracking-[0.3em] text-[#C48A1F] uppercase mb-3">
          Feature Moment · Rasoi Steam
        </div>
        <h2 className="reveal-heading font-serif text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-[#FAF5ED]">
          Piping hot from the hearth to your study desk.
        </h2>
      </div>

      <div
        className="relative w-full max-w-full mx-auto h-[380px] md:h-[560px] flex items-center justify-center overflow-hidden"
        style={{ overflow: 'clip' }}
      >
        {/* Repeated-text stack safely clipped inside inset: 0 container */}
        <div
          className="repeated-text-stack absolute inset-0 w-full max-w-full flex flex-col justify-center items-center pointer-events-none z-0 space-y-1 md:space-y-2 opacity-25 overflow-hidden"
          style={{ overflow: 'clip' }}
        >
          {phrases.map((phrase, idx) => (
            <div
              key={idx}
              className="stack-line font-serif text-2xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#FAF5ED]/50 whitespace-nowrap will-change-transform leading-none text-center max-w-full"
            >
              {phrase}
            </div>
          ))}
        </div>

        {/* 3D Steam Ribbon Swirl in front of the repeated-text stack */}
        <div
          ref={threeRef}
          className="relative z-10 w-full h-full max-w-[650px] max-h-[500px] flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ overflow: 'clip' }}
        />

        {/* Small floating text labels around swirl */}
        <div className="hidden md:block absolute top-12 left-10 p-3 bg-[#261B16]/90 border border-[#FAF5ED]/15 text-xs font-mono text-[#C48A1F] rounded-[2px] shadow-lg z-20">
          <span>01. Pure Clarified Butter</span>
        </div>
        <div className="hidden md:block absolute bottom-14 right-10 p-3 bg-[#261B16]/90 border border-[#FAF5ED]/15 text-xs font-mono text-[#FAF5ED]/80 rounded-[2px] shadow-lg z-20">
          <span>02. Stone-Ground Chakki Atta</span>
        </div>
      </div>
    </section>
  );
};
