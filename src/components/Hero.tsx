import React, { useEffect, useRef, useState } from 'react';
import { HeroMotionController } from '../motion/hero';
import { Star, ArrowDown } from 'lucide-react';
import { KITCHEN_INFO } from '../data/kitchenData';

interface HeroProps {
  onWhatsAppOrder: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWhatsAppOrder, onExploreMenu }) => {
  const [ratingCount, setRatingCount] = useState(3.5); // Count up from ~70%
  const [reviewCount, setReviewCount] = useState(64);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<HeroMotionController | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const controller = new HeroMotionController();
    controllerRef.current = controller;
    const cleanup = controller.init(canvasRef.current);

    // Trigger headline line-by-line reveal
    controller.revealHeadline('.hero-headline-line');

    // Count up rating from 70% of value
    let startTime = performance.now();
    const duration = 1500;
    const targetRating = 5.0;
    const targetReviews = 91;

    const animateCounts = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const r = 3.5 + ease * (targetRating - 3.5);
      const rev = Math.round(64 + ease * (targetReviews - 64));

      setRatingCount(Number(r.toFixed(1)));
      setReviewCount(rev);

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      } else {
        setRatingCount(5.0);
        setReviewCount(91);
      }
    };
    const animId = requestAnimationFrame(animateCounts);

    return () => {
      cancelAnimationFrame(animId);
      cleanup();
    };
  }, []);

  return (
    <section
      className="relative w-full max-w-full min-h-[92vh] flex flex-col justify-between border-b border-[#1E1410]/12 px-4 sm:px-6 md:px-12 py-10 sm:py-12 lg:py-16"
      style={{ overflow: 'clip' }}
    >
      {/* Background canvas wrapper with overflow: clip for particles & light cone */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ overflow: 'clip' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div className="absolute inset-0 paper-grain pointer-events-none" />
      </div>

      {/* Top Header metadata & Archival badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-[#1E1410]/70 uppercase">
          <span className="text-[#A8442A] font-semibold">01</span>
          <span>·</span>
          <span>Borkhera, Kota</span>
          <span>·</span>
          <span>9:00 AM to 10:30 PM</span>
        </div>

        {/* 5.0 Google Rating with live count-up */}
        <div className="flex items-center gap-3 py-1 px-3 bg-[#EAE1D2]/80 border border-[#1E1410]/10 rounded-[2px] shadow-sm">
          <div className="flex items-center gap-1 text-[#C48A1F]">
            <Star className="w-3.5 h-3.5 fill-[#C48A1F]" />
            <span className="font-mono font-bold text-xs text-[#1E1410] tabular-nums">
              {ratingCount.toFixed(1)}
            </span>
          </div>
          <span className="text-[#1E1410]/30 text-xs">|</span>
          <span className="text-xs font-mono text-[#1E1410]/80 tabular-nums">
            {reviewCount} reviews on Google
          </span>
        </div>
      </div>

      {/* Center 12-column asymmetric hero headline & narrative */}
      <div className="relative z-10 my-auto py-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main Headline (9 to 12vw responsive clamp) */}
          <div className="lg:col-span-8">
            <h1 className="font-serif text-[clamp(2.75rem,8.5vw,7.5rem)] font-light leading-[0.94] tracking-[-0.03em] text-[#1E1410]">
              {/* Line 1 with overflow hidden mask */}
              <div className="overflow-hidden">
                <div className="hero-headline-line will-change-transform">
                  <em className="italic font-normal font-serif text-[#A8442A]">Ghar</em> jaisa khana.
                </div>
              </div>
              {/* Line 2 with overflow hidden mask */}
              <div className="overflow-hidden mt-1 md:mt-2">
                <div className="hero-headline-line will-change-transform">
                  Kota <em className="italic font-normal font-serif text-[#C48A1F]">mein</em>.
                </div>
              </div>
            </h1>

            {/* Devanagari sub-line with mask */}
            <div className="mt-4 font-hindi text-lg md:text-2xl text-[#1E1410]/80 tracking-wide overflow-hidden">
              <div className="hero-headline-line will-change-transform">
                शुद्ध शाकाहारी, घर के मसालों से बनी थाली और रोज़ाना का टिफिन
              </div>
            </div>
          </div>

          {/* Right column context: quiet editorial prose and CTA */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
            <p className="text-[#1E1410]/80 text-sm md:text-base leading-relaxed font-body">
              For students preparing for exams and families in Borkhera who miss light, honest home cooking. No artificial food colors, no heavy restaurant cream. Just fresh phulkas with desi ghee, slow-simmered dal, and seasonal sabzi cooked every morning.
            </p>

            <div className="hero-cta-group flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onWhatsAppOrder}
                className="hero-magnetic-btn relative inline-flex items-center justify-center font-medium text-xs md:text-sm tracking-wider uppercase px-6 py-3.5 whitespace-nowrap shrink-0 bg-[#A8442A] text-[#FAF5ED] hover:bg-[#8F3720] border border-[#8F3720] rounded-[2px] transition-colors"
                data-cursor="ORDER"
              >
                Order on WhatsApp
              </button>

              <button
                onClick={onExploreMenu}
                className="hero-magnetic-btn relative inline-flex items-center justify-center font-medium text-xs md:text-sm tracking-wider uppercase px-6 py-3.5 whitespace-nowrap shrink-0 bg-transparent text-[#1E1410] hover:bg-[#1E1410] hover:text-[#FAF5ED] border border-[#1E1410] rounded-[2px] transition-colors"
                data-cursor="EXPLORE"
              >
                See Today's Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar with kitchen location stamp and scroll prompt */}
      <div className="hero-bottom-bar relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1E1410]/10 text-xs text-[#1E1410]/60 font-mono">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="uppercase tracking-widest text-[#1E1410]/80">
            Cloud Kitchen · Shubh Labh Enclave
          </span>
          <span>·</span>
          <span>Pure Vegetarian</span>
        </div>

        <button
          onClick={onExploreMenu}
          className="flex items-center gap-2 hover:text-[#A8442A] transition-colors"
        >
          <span>EXPLORE CHAPTERS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
