import React from 'react';

export const GiantScrubMarquee: React.FC = () => {
  return (
    <section
      className="giant-scrub-marquee-section relative w-full max-w-full py-12 md:py-16 bg-[#160E0B] text-[#FAF5ED] border-y border-[#FAF5ED]/10 select-none"
      style={{ overflow: 'clip' }}
    >
      {/* Edge fading gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#160E0B] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#160E0B] to-transparent z-10 pointer-events-none" />

      <div className="relative w-full max-w-full overflow-hidden" style={{ overflow: 'clip' }}>
        <div className="giant-scrub-marquee-track whitespace-nowrap will-change-transform flex items-center">
          <span className="font-serif text-[12vw] md:text-[14vw] font-bold text-[#C48A1F] uppercase tracking-tight leading-none opacity-85 mr-8">
            Ghar jaisa khana, ghar tak ·
          </span>
          <span className="font-hindi text-[10vw] md:text-[12vw] font-bold text-[#FAF5ED]/25 whitespace-nowrap leading-none mr-8">
            माँ की रसोई कोटा ·
          </span>
          <span className="font-serif text-[12vw] md:text-[14vw] font-bold text-[#C48A1F] uppercase tracking-tight leading-none opacity-85 mr-8">
            Ghar jaisa khana, ghar tak ·
          </span>
          <span className="font-hindi text-[10vw] md:text-[12vw] font-bold text-[#FAF5ED]/25 whitespace-nowrap leading-none">
            शुद्ध शाकाहारी थाली
          </span>
        </div>
      </div>
    </section>
  );
};
