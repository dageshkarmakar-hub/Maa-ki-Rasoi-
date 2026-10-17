import React from 'react';
import { TIFFIN_PLANS, KITCHEN_INFO } from '../data/kitchenData';
import { TiffinPlan } from '../types';
import { Check, MessageSquare } from 'lucide-react';

interface TiffinPlansProps {
  onSelectPlan: (plan: TiffinPlan) => void;
}

export const TiffinPlans: React.FC<TiffinPlansProps> = ({ onSelectPlan }) => {
  return (
    <section
      id="tiffin"
      className="relative w-full max-w-full bg-[#1E1410] text-[#FAF5ED] py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#FAF5ED]/10 overflow-x-clip"
    >
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-30" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FAF5ED]/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C48A1F] uppercase mb-2">
              <span>06</span>
              <span>·</span>
              <span>Semester & Monthly Subscriptions</span>
              <span>·</span>
              <span className="font-hindi text-[#FAF5ED]/60">टिफिन योजनाएं</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#FAF5ED]">
              Daily tiffin for Kota <em className="italic font-normal text-[#C48A1F]">routines</em>.
            </h2>
          </div>

          <p className="text-xs md:text-sm font-mono text-[#FAF5ED]/70 max-w-md">
            Prepared twice daily for coaching students and professionals. Zero greasy gravies, flexible leave pauses, and clean home delivery.
          </p>
        </div>

        {/* Clean Pricing Table with Hairlines (Strictly NO "Best Value" stickers) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TIFFIN_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className="flex flex-col justify-between p-8 bg-[#261B16] border border-[#FAF5ED]/15 hover:border-[#C48A1F]/50 transition-all rounded-[2px]"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#FAF5ED]/10">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#C48A1F] uppercase">
                      Plan 0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#FAF5ED] mt-1">
                      {plan.name}
                    </h3>
                    <div className="font-hindi text-sm text-[#FAF5ED]/70 mt-0.5">
                      {plan.hindiName}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-serif text-3xl font-light text-[#FAF5ED] tabular-nums">
                      ₹{plan.pricePerMonth}
                    </div>
                    <div className="text-[10px] font-mono text-[#FAF5ED]/50 uppercase mt-0.5">
                      {plan.id === 'fifteen-day-trial' ? '/ 15 Days' : '/ Month'}
                    </div>
                  </div>
                </div>

                {/* Meals Included Note */}
                <div className="py-4 text-xs font-mono text-[#FAF5ED]/80 border-b border-[#FAF5ED]/10">
                  <span className="text-[#C48A1F]">Coverage:</span> {plan.mealsIncluded}
                </div>

                {/* Meal Breakdown Table */}
                <div className="py-5 space-y-3 text-xs font-body border-b border-[#FAF5ED]/10">
                  <div className="text-[10px] font-mono tracking-wider text-[#FAF5ED]/50 uppercase">
                    Everyday Composition
                  </div>
                  <div className="flex justify-between text-[#FAF5ED]/80">
                    <span className="text-[#FAF5ED]/50">Roti:</span>
                    <span className="text-right">{plan.dailyMenu.rotis}</span>
                  </div>
                  <div className="flex justify-between text-[#FAF5ED]/80">
                    <span className="text-[#FAF5ED]/50">Dal:</span>
                    <span className="text-right">{plan.dailyMenu.dal}</span>
                  </div>
                  <div className="flex justify-between text-[#FAF5ED]/80">
                    <span className="text-[#FAF5ED]/50">Sabzi:</span>
                    <span className="text-right">{plan.dailyMenu.sabzi}</span>
                  </div>
                  <div className="flex justify-between text-[#FAF5ED]/80">
                    <span className="text-[#FAF5ED]/50">Rice & Extra:</span>
                    <span className="text-right">{plan.dailyMenu.rice}</span>
                  </div>
                </div>

                {/* Highlights list */}
                <div className="py-6 space-y-2.5">
                  <div className="text-[10px] font-mono tracking-wider text-[#FAF5ED]/50 uppercase mb-2">
                    Terms & Perks
                  </div>
                  {plan.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#FAF5ED]/80">
                      <Check className="w-3.5 h-3.5 text-[#C48A1F] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#FAF5ED]/10">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="w-full py-3.5 px-4 bg-[#FAF5ED] hover:bg-[#FAF5ED]/90 text-[#1E1410] text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-[2px]"
                  data-cursor="INQUIRE"
                >
                  <MessageSquare className="w-4 h-4 text-[#A8442A]" />
                  <span>Inquire / Start Plan</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tiffin FAQs / Clarifications */}
        <div className="mt-14 p-6 bg-[#261B16] border border-[#FAF5ED]/10 text-xs font-mono text-[#FAF5ED]/70 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-[#FAF5ED] font-semibold mb-1">Pause Policy:</div>
            <div>Give 6 hours advance notice on WhatsApp to pause your meal without losing balance.</div>
          </div>
          <div>
            <div className="text-[#FAF5ED] font-semibold mb-1">Trial Guarantee:</div>
            <div>Start with a 15-day trial to experience our food consistency before committing to full term.</div>
          </div>
          <div>
            <div className="text-[#FAF5ED] font-semibold mb-1">Customizations:</div>
            <div>No garlic/onion or less spicy options can be arranged with prior notice.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
