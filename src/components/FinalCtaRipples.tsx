import React from 'react';
import { KITCHEN_INFO } from '../data/kitchenData';
import { Send, Phone } from 'lucide-react';

interface FinalCtaRipplesProps {
  onWhatsAppOrder: () => void;
}

export const FinalCtaRipples: React.FC<FinalCtaRipplesProps> = ({ onWhatsAppOrder }) => {
  return (
    <section
      className="final-cta-ripple-section relative w-full max-w-full bg-[#FAF5ED] text-[#1E1410] py-20 md:py-36 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 select-none text-center"
      style={{ overflow: 'clip' }}
    >
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

      {/* Center Concentric Ripple Rings safely enclosed inside inset: 0 overflow: clip wrapper */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" style={{ overflow: 'clip' }}>
        <div className="relative w-full max-w-[340px] sm:max-w-[480px] h-[340px] sm:h-[480px] flex items-center justify-center">
          <div className="ripple-ring w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-[#C48A1F]/30 shrink-0" />
          <div className="ripple-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-[#A8442A]/25 shrink-0" />
          <div className="ripple-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-[#C48A1F]/20 shrink-0" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        {/* Brand Logo Stamp */}
        <div className="inline-block p-4 bg-[#F5EEE2] border border-[#1E1410]/15 rounded-full shadow-sm mb-2">
          <div className="font-hindi text-2xl font-bold text-[#A8442A]">
            माँ
          </div>
        </div>

        <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C48A1F]">
          Order Fresh Homemade Food
        </div>

        <h2 className="reveal-heading font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#1E1410] leading-tight">
          Craving authentic <em className="italic text-[#A8442A]">ghar ka khana</em> in Kota today?
        </h2>

        <p className="text-sm md:text-base font-body text-[#1E1410]/75 max-w-lg mx-auto">
          Message us on WhatsApp with your room or hostel address. We will cook it fresh and dispatch it immediately.
        </p>

        {/* Action Button */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onWhatsAppOrder}
            className="hero-magnetic-btn px-8 py-4 bg-[#A8442A] hover:bg-[#8F3720] text-[#FAF5ED] text-xs font-mono uppercase tracking-widest transition-all rounded-[2px] shadow-lg flex items-center gap-2.5"
            data-cursor="ORDER"
          >
            <Send className="w-4 h-4" />
            <span>Order on WhatsApp (+91 99283 63955)</span>
          </button>

          <a
            href={`tel:${KITCHEN_INFO.phone.replace(/\s+/g, '')}`}
            className="px-6 py-4 bg-[#EAE1D2] hover:bg-[#DFD4C3] text-[#1E1410] text-xs font-mono uppercase tracking-widest transition-colors rounded-[2px] border border-[#1E1410]/15 flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#A8442A]" />
            <span>Call Kitchen</span>
          </a>
        </div>
      </div>
    </section>
  );
};
