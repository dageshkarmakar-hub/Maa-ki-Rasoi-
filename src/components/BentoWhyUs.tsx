import React from 'react';
import { ShieldCheck, Flame, Utensils, HeartHandshake } from 'lucide-react';

export const BentoWhyUs: React.FC = () => {
  const cards = [
    {
      id: 'b1',
      title: 'Fresh Chakki Wheat Atta',
      hindi: 'शुद्ध चक्की आटा',
      desc: 'Never maida, never old dough. Whole grains stone ground and kneaded twice every day for soft phulkas that stay tender for hours.',
      icon: Flame,
      colSpan: 'lg:col-span-7',
      glowColor: 'rgba(196, 138, 31, 0.15)',
    },
    {
      id: 'b2',
      title: 'Zero Re-used Oil',
      hindi: 'शून्य दोबारा तला तेल',
      desc: 'Cooked with pure mustard oil and authentic desi ghee. Non-heavy preparations safe for long study hours and restful sleep.',
      icon: ShieldCheck,
      colSpan: 'lg:col-span-5',
      glowColor: 'rgba(168, 68, 42, 0.15)',
    },
    {
      id: 'b3',
      title: 'Leakproof Food-Grade Seal',
      hindi: 'सुरक्षित खाद्य पैकेजिंग',
      desc: 'Zero aluminum foil touching warm food. Insulated food-grade containers ensure piping-hot delivery across Kota roads.',
      icon: Utensils,
      colSpan: 'lg:col-span-5',
      glowColor: 'rgba(60, 74, 58, 0.15)',
    },
    {
      id: 'b4',
      title: 'Transparent Kitchen Visits',
      hindi: 'खुली रसोई दर्शन',
      desc: 'Parents visiting Kota are warmly welcomed to inspect our preparation area at Shubh Labh Enclave, Balaji Awas I, Borkhera.',
      icon: HeartHandshake,
      colSpan: 'lg:col-span-7',
      glowColor: 'rgba(196, 138, 31, 0.15)',
    },
  ];

  return (
    <section className="relative w-full max-w-full bg-[#F5EEE2] py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 overflow-x-clip overflow-hidden select-none">
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E1410]/12">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#A8442A] uppercase mb-2">
              Kitchen Principles · रसोई दर्शन
            </div>
            <h2 className="reveal-heading font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1E1410]">
              Why students and families choose <em className="italic font-normal text-[#A8442A]">Maa Ki Rasoi</em>.
            </h2>
          </div>

          <p className="text-xs md:text-sm font-mono text-[#1E1410]/70 max-w-sm">
            Disciplined daily preparation without shortcuts or commercial kitchen compromises.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-why-us-grid mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className={`bento-item ${c.colSpan} relative p-8 bg-[#FAF5ED] border border-[#1E1410]/12 rounded-[2px] transition-all duration-300 hover:border-[#1E1410]/30 group overflow-hidden`}
              >
                {/* Subtle looping 3D-ish icon glow */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
                  style={{
                    background: `radial-gradient(circle, ${c.glowColor} 0%, transparent 70%)`,
                    filter: 'blur(25px)',
                  }}
                />

                <div className="flex items-start justify-between mb-6">
                  {/* Icon with subtle 3D hover tilt */}
                  <div className="w-12 h-12 rounded-[2px] bg-[#EAE1D2] flex items-center justify-center text-[#A8442A] border border-[#1E1410]/10 shadow-sm group-hover:-translate-y-1 group-hover:shadow-md transition-all">
                    <Icon className="w-6 h-6 animate-[pulse_4s_ease-in-out_infinite]" />
                  </div>
                  <span className="font-hindi text-sm text-[#A8442A] font-semibold">
                    {c.hindi}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-[#1E1410] mb-2">
                  {c.title}
                </h3>
                <p className="text-xs md:text-sm text-[#1E1410]/75 font-body leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
