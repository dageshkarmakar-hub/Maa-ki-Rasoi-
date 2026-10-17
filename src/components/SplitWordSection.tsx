import React from 'react';
import { PhotoFrame } from './PhotoFrame';

export const SplitWordSection: React.FC = () => {
  return (
    <section
      className="split-word-section relative w-full max-w-full bg-[#F5EEE2] py-20 md:py-36 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 select-none"
      style={{ overflow: 'clip' }}
    >
      {/* Background paper grain */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

      {/* Ambient center glow safely enclosed inside inset: 0 overflow: clip wrapper */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ overflow: 'clip' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full pointer-events-none opacity-30 max-w-full"
          style={{
            background: 'radial-gradient(circle, rgba(196,138,31,0.25) 0%, rgba(168,68,42,0.08) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center justify-center overflow-hidden" style={{ overflow: 'clip' }}>
        {/* Top chapter subtitle */}
        <div className="text-xs font-mono uppercase tracking-widest text-[#A8442A] mb-8">
          The Borkhera Standard
        </div>

        {/* Center Split Container */}
        <div
          className="relative w-full max-w-full flex items-center justify-center min-h-[320px] md:min-h-[460px] overflow-hidden"
          style={{ overflow: 'clip' }}
        >
          {/* Big Word 1 (Left): "Fresh" sliding in from left */}
          <div className="split-word-left absolute left-0 lg:left-8 z-0 font-serif text-[clamp(2.5rem,8.5vw,9rem)] font-light text-[#1E1410]/15 lg:text-[#1E1410]/20 tracking-tighter uppercase pointer-events-none will-change-transform leading-none select-none">
            Fresh
          </div>

          {/* Center Tilted Floating Thali Card */}
          <div className="split-word-card relative z-20 w-60 sm:w-72 md:w-84 max-w-[85%] shadow-2xl rounded-[2px] overflow-hidden will-change-transform transition-shadow duration-300">
            <PhotoFrame
              promptText="Steaming Ghar Ki Thali with 4 ghee phulkas, arhar dal tadka, seasonal sukhi sabzi, and raita on natural wood surface"
              label="SIGNATURE THALI"
              aspect="arch"
              theme="light"
            />
          </div>

          {/* Big Word 2 (Right): "Homemade" sliding in from right */}
          <div className="split-word-right absolute right-0 lg:right-8 z-0 font-serif text-[clamp(2.5rem,8.5vw,9rem)] font-light text-[#A8442A]/20 lg:text-[#A8442A]/25 tracking-tighter uppercase pointer-events-none will-change-transform leading-none text-right select-none">
            Homemade
          </div>
        </div>

        {/* Caption below */}
        <div className="mt-8 text-center max-w-md text-xs font-mono text-[#1E1410]/70">
          Chakki whole-wheat flour kneaded fresh twice daily in Balaji Awas I, Borkhera.
        </div>
      </div>
    </section>
  );
};
