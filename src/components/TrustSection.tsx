import React, { useState, useEffect } from 'react';
import { REAL_REVIEWS, KITCHEN_INFO } from '../data/kitchenData';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const [activeReview, setActiveReview] = useState(0);

  // Auto rotate quote slider every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REAL_REVIEWS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = REAL_REVIEWS[activeReview];

  return (
    <section
      id="reviews"
      className="relative w-full max-w-full bg-[#F5EEE2] py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 overflow-x-clip"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-[#1E1410]/12 pb-6 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A8442A] uppercase">
            <span>05</span>
            <span>·</span>
            <span>Real Google Feedback</span>
            <span>·</span>
            <span className="font-hindi text-[#1E1410]/60">ग्राहकों की राय</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#1E1410]/70">
            <span className="font-bold text-[#A8442A]">5.0 STAR RATING</span>
            <span>·</span>
            <span>91 VERIFIED REVIEWS</span>
          </div>
        </div>

        {/* 3 Huge Typographic Statements from real reviews (NO icon cards) */}
        <div className="reviews-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-16 border-b border-[#1E1410]/12">
          <div className="review-stagger-card space-y-3">
            <div className="text-xs font-mono text-[#A8442A] uppercase tracking-widest">
              Review Insight 01
            </div>
            <h3 className="reveal-heading font-serif text-3xl lg:text-4xl font-normal text-[#1E1410] leading-tight">
              “Tastes like <em className="italic text-[#A8442A]">home</em>.”
            </h3>
            <p className="text-xs md:text-sm text-[#1E1410]/70 leading-relaxed font-body">
              Soft rotis brushed with pure ghee, whole lentils with fresh garlic and hing, no excess oil or artificial colors.
            </p>
          </div>

          <div className="review-stagger-card space-y-3">
            <div className="text-xs font-mono text-[#A8442A] uppercase tracking-widest">
              Review Insight 02
            </div>
            <h3 className="reveal-heading font-serif text-3xl lg:text-4xl font-normal text-[#1E1410] leading-tight">
              “Packed with <em className="italic text-[#C48A1F]">care</em>.”
            </h3>
            <p className="text-xs md:text-sm text-[#1E1410]/70 leading-relaxed font-body">
              Leakproof food-grade containers, zero aluminum foil in direct contact with warm food, hygienic packing.
            </p>
          </div>

          <div className="review-stagger-card space-y-3">
            <div className="text-xs font-mono text-[#A8442A] uppercase tracking-widest">
              Review Insight 03
            </div>
            <h3 className="reveal-heading font-serif text-3xl lg:text-4xl font-normal text-[#1E1410] leading-tight">
              “Right on <em className="italic text-[#3C4A3A]">time</em>.”
            </h3>
            <p className="text-xs md:text-sm text-[#1E1410]/70 leading-relaxed font-body">
              Disciplined delivery to student hostels, PGs and residential homes in Borkhera and across Kota.
            </p>
          </div>
        </div>

        {/* Crossfading Quote Slider with Real Google Reviews */}
        <div className="pt-16 max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 bg-[#FAF5ED] border border-[#1E1410]/12 rounded-[2px]">
            <Quote className="w-10 h-10 text-[#A8442A]/20 mb-6" />

            <div className="min-h-[160px] flex flex-col justify-between">
              <blockquote className="font-serif text-xl md:text-2xl text-[#1E1410] font-light leading-relaxed italic">
                “{current.quote}”
              </blockquote>

              <div className="mt-8 pt-6 border-t border-[#1E1410]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif font-medium text-base text-[#1E1410]">
                    {current.author}
                  </div>
                  <div className="text-xs font-mono text-[#1E1410]/60 mt-0.5">
                    {current.locationRole} · {current.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#C48A1F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C48A1F]" />
                  ))}
                  <span className="text-xs font-mono font-bold text-[#1E1410] ml-2">
                    5.0 / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Slider Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1E1410]/10">
              <div className="flex items-center gap-1.5">
                {REAL_REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReview(idx)}
                    className={`h-1.5 transition-all rounded-full ${
                      activeReview === idx ? 'w-8 bg-[#A8442A]' : 'w-2 bg-[#1E1410]/20'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveReview((prev) => (prev > 0 ? prev - 1 : REAL_REVIEWS.length - 1))
                  }
                  className="p-2 border border-[#1E1410]/20 hover:border-[#1E1410] bg-[#F5EEE2] rounded-[2px] transition-colors"
                  aria-label="Previous review"
                  data-cursor="PREV"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setActiveReview((prev) => (prev < REAL_REVIEWS.length - 1 ? prev + 1 : 0))
                  }
                  className="p-2 border border-[#1E1410]/20 hover:border-[#1E1410] bg-[#1E1410] text-[#FAF5ED] rounded-[2px] transition-colors"
                  aria-label="Next review"
                  data-cursor="NEXT"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
