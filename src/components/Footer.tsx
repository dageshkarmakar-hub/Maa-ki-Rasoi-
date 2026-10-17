import React, { useEffect, useRef } from 'react';
import { KITCHEN_INFO } from '../data/kitchenData';
import { FooterThaliDiscsScene } from '../motion/three-scenes';
import { Phone, MapPin, Clock, BookOpen, Camera, Shield } from 'lucide-react';

interface FooterProps {
  onOpenOwnerGuide: () => void;
  onOpenPhotoChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOwnerGuide,
  onOpenPhotoChecklist,
}) => {
  const threeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeRef.current) return;
    const scene = new FooterThaliDiscsScene();
    const cleanup = scene.init(threeRef.current);
    return () => cleanup();
  }, []);

  return (
    <footer
      className="relative w-full max-w-full bg-[#160E0B] text-[#FAF5ED] pt-20 md:pt-28 pb-10 px-4 sm:px-6 md:px-12 border-t border-[#FAF5ED]/10 select-none"
      style={{ overflow: 'clip' }}
    >
      {/* Paper grain overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-25" />

      {/* 3D Moment #2: Translucent iridescent thali discs with overlapping text marquee */}
      <div
        className="relative w-full max-w-6xl mx-auto h-[200px] sm:h-[260px] md:h-[320px] mb-12 flex items-center justify-center overflow-hidden"
        style={{ overflow: 'clip' }}
      >
        {/* Three.js 3D Discs Canvas Container */}
        <div
          ref={threeRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          style={{ overflow: 'clip' }}
        />

        {/* Giant Overlapping Text Marquee using mix-blend-mode */}
        <div
          className="relative z-10 w-full max-w-full overflow-hidden select-none pointer-events-none mix-blend-screen opacity-90"
          style={{ overflow: 'clip' }}
        >
          <div className="whitespace-nowrap flex items-center animate-[marquee_25s_linear_infinite]">
            <span className="font-serif text-[clamp(2rem,6vw,6.5rem)] font-light text-[#C48A1F] uppercase tracking-tight mr-6 sm:mr-8">
              Order Fresh Ghar Ka Khana ·
            </span>
            <span className="font-hindi text-[clamp(2rem,6vw,6.5rem)] font-semibold text-[#FAF5ED] mr-6 sm:mr-8">
              माँ की रसोई कोटा ·
            </span>
            <span className="font-serif text-[clamp(2rem,6vw,6.5rem)] font-light text-[#C48A1F] uppercase tracking-tight mr-6 sm:mr-8">
              Order Fresh Ghar Ka Khana ·
            </span>
            <span className="font-hindi text-[clamp(2rem,6vw,6.5rem)] font-semibold text-[#FAF5ED]">
              माँ की रसोई कोटा
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#FAF5ED]/15">
          {/* Brand lockup */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-hindi text-3xl font-semibold text-[#FAF5ED] block">
                {KITCHEN_INFO.hindiName}
              </span>
              <span className="font-serif text-xl tracking-tight text-[#FAF5ED]/90 block">
                {KITCHEN_INFO.name}
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#FAF5ED]/70 leading-relaxed font-body max-w-sm">
              Kota's homemade food cloud kitchen in Borkhera. Dedicated to providing healthy, non-heavy vegetarian meals for students, professionals, and families.
            </p>
            <div className="pt-2 text-xs font-mono text-[#C48A1F] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C48A1F]" />
              <span>FSSAI License: {KITCHEN_INFO.fssaiNumber}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono tracking-widest text-[#C48A1F] uppercase">
              Rasoi Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#FAF5ED]/75">
              <li>
                <a href="#manifesto" className="hover:text-[#FAF5ED] transition-colors">
                  Our Rasoi Philosophy
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FAF5ED] transition-colors">
                  Daily Thali & Menu Slides
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#FAF5ED] transition-colors">
                  Morning Mandi to Doorstep Process
                </a>
              </li>
              <li>
                <a href="#tiffin" className="hover:text-[#FAF5ED] transition-colors">
                  Student Monthly Tiffin Plans
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAF5ED] transition-colors">
                  Google Verified 5.0 Reviews
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#FAF5ED] transition-colors">
                  Borkhera Kitchen & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono tracking-widest text-[#C48A1F] uppercase">
              Borkhera Kitchen
            </div>
            <div className="space-y-2.5 text-xs text-[#FAF5ED]/75 font-body">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8442A] shrink-0 mt-0.5" />
                <span>{KITCHEN_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A8442A] shrink-0" />
                <a
                  href={`tel:${KITCHEN_INFO.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#FAF5ED] font-mono"
                >
                  {KITCHEN_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#A8442A] shrink-0 mt-0.5" />
                <span>Open Daily: 9:00 AM to 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Client Handover Tooling (Deliverable 9) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono tracking-widest text-[#C48A1F] uppercase">
              Kitchen Owner
            </div>
            <div className="space-y-2">
              <button
                onClick={onOpenOwnerGuide}
                className="w-full text-left p-2.5 bg-[#261B16] hover:bg-[#34241E] border border-[#FAF5ED]/15 text-xs font-mono text-[#FAF5ED]/90 rounded-[2px] flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C48A1F]" />
                <span>Owner Menu Guide</span>
              </button>

              <button
                onClick={onOpenPhotoChecklist}
                className="w-full text-left p-2.5 bg-[#261B16] hover:bg-[#34241E] border border-[#FAF5ED]/15 text-xs font-mono text-[#FAF5ED]/90 rounded-[2px] flex items-center gap-2 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-[#C48A1F]" />
                <span>Photo Checklist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Giant Cropped Wordmark that spans the base */}
        <div
          className="relative w-full max-w-full pt-10 pb-4 overflow-hidden select-none pointer-events-none"
          style={{ overflow: 'clip' }}
        >
          <div className="text-center font-hindi text-[clamp(2.25rem,10vw,11.5rem)] font-bold tracking-tight text-[#FAF5ED]/[0.06] whitespace-nowrap leading-none uppercase max-w-full">
            माँ की रसोई · MAA KI RASOI
          </div>
        </div>

        {/* Small Bottom Links & Legal */}
        <div className="pt-6 border-t border-[#FAF5ED]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FAF5ED]/50">
          <div>
            © {new Date().getFullYear()} Maa Ki Rasoi. Hand-crafted for Kota, Rajasthan.
          </div>

          <div className="flex items-center gap-4">
            <span>Borkhera 324002</span>
            <span>·</span>
            <span>No Preservatives</span>
            <span>·</span>
            <span>Pure Desi Ghee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
