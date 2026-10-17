import React from 'react';
import { Star, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { KITCHEN_INFO } from '../data/kitchenData';

export const StatsSection: React.FC = () => {
  return (
    <section className="stats-block-container relative w-full max-w-full bg-[#F5EEE2] py-14 sm:py-16 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 select-none overflow-x-clip overflow-hidden">
      {/* Paper grain */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E1410]/12 border border-[#1E1410]/12">
          {/* Stat 1: 5.0 Star Rating */}
          <div className="relative p-6 md:p-8 bg-[#FAF5ED] hover:bg-[#FAF5ED]/90 transition-colors group">
            {/* Crosshair marks */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#C48A1F] uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-[#C48A1F]" />
              <span>Google Verified</span>
            </div>

            <div
              className="font-serif text-4xl md:text-5xl font-light text-[#1E1410] tabular-nums"
              data-stat-value={KITCHEN_INFO.googleRating}
              data-stat-decimal="true"
              data-stat-suffix=" / 5.0"
            >
              3.5 / 5.0
            </div>

            <p className="text-xs font-mono text-[#1E1410]/70 mt-2">
              Flawless rating across Kota student & resident reviews
            </p>
          </div>

          {/* Stat 2: 91 Google Reviews */}
          <div className="relative p-6 md:p-8 bg-[#FAF5ED] hover:bg-[#FAF5ED]/90 transition-colors group">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A8442A] uppercase mb-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Community Trust</span>
            </div>

            <div
              className="font-serif text-4xl md:text-5xl font-light text-[#1E1410] tabular-nums"
              data-stat-value={KITCHEN_INFO.googleReviewCount}
              data-stat-suffix="+"
            >
              64+
            </div>

            <p className="text-xs font-mono text-[#1E1410]/70 mt-2">
              Verified customer testimonials on Google Maps
            </p>
          </div>

          {/* Stat 3: 25-35 Minutes */}
          <div className="relative p-6 md:p-8 bg-[#FAF5ED] hover:bg-[#FAF5ED]/90 transition-colors group">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#3C4A3A] uppercase mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Average Delivery</span>
            </div>

            <div
              className="font-serif text-4xl md:text-5xl font-light text-[#1E1410] tabular-nums"
              data-stat-value="30"
              data-stat-suffix=" mins"
            >
              20 mins
            </div>

            <p className="text-xs font-mono text-[#1E1410]/70 mt-2">
              Borkhera to hostels & homes in insulated thermal packs
            </p>
          </div>

          {/* Stat 4: 100% Pure Vegetarian */}
          <div className="relative p-6 md:p-8 bg-[#FAF5ED] hover:bg-[#FAF5ED]/90 transition-colors group">
            <span className="absolute top-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#1E1410]/30">+</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#1E1410]/30">+</span>

            <div className="flex items-center gap-2 text-xs font-mono text-[#C48A1F] uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Purity Standard</span>
            </div>

            <div
              className="font-serif text-4xl md:text-5xl font-light text-[#1E1410] tabular-nums"
              data-stat-value="100"
              data-stat-suffix="%"
            >
              70%
            </div>

            <p className="text-xs font-mono text-[#1E1410]/70 mt-2">
              Pure vegetarian, zero artificial color, zero re-used oil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
