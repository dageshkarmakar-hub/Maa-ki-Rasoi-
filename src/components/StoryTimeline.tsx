import React from 'react';

export const StoryTimeline: React.FC = () => {
  const milestones = [
    {
      year: '2023',
      title: 'The First Pot in Borkhera',
      hindi: 'बोरखेड़ा में पहली शुरुआत',
      desc: 'Started in Balaji Awas I after witnessing students struggle with oily mess food that hindered exam preparation.',
    },
    {
      year: '2024',
      title: 'Direct Mandi Procurement',
      hindi: 'मंडी से सीधी ताज़ा ख़रीद',
      desc: 'Shifted all produce procurement to the 6:00 AM local mandi run. Zero cold-storage vegetables, zero preserved gravies.',
    },
    {
      year: '2025',
      title: 'Food-Grade Tiffin Network',
      hindi: 'सुरक्षित टिफिन सेवा विस्तार',
      desc: 'Introduced insulated thermal delivery containers to reach coaching hubs in Kunhari, Landmark City, and Talwandi piping hot.',
    },
    {
      year: 'Today',
      title: '5.0 Rating Across 91 Reviews',
      hindi: 'सच्चा विश्वास और गुणवत्ता',
      desc: 'Proud to maintain a perfect 5.0 Google score with honest, clean home cooking every single day from 9 AM to 10:30 PM.',
    },
  ];

  return (
    <section className="story-timeline-section relative w-full max-w-full bg-[#1E1410] text-[#FAF5ED] py-20 md:py-36 px-4 sm:px-6 md:px-12 border-b border-[#FAF5ED]/10 select-none overflow-x-clip overflow-hidden">
      {/* Faint Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #FAF5ED 1px, transparent 1px), linear-gradient(to bottom, #FAF5ED 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-20" />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C48A1F] mb-3">
            Our Journey in Kota · हमारी यात्रा
          </div>
          <h2 className="reveal-heading font-serif text-3xl md:text-5xl font-light tracking-tight text-[#FAF5ED]">
            From a humble home tawa to <em className="italic font-normal text-[#C48A1F]">hundreds of daily tiffins</em>.
          </h2>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-8 md:pl-16 space-y-12">
          {/* Vertical Base Line */}
          <div className="absolute top-2 bottom-2 left-3 md:left-7 w-[2px] bg-[#FAF5ED]/15">
            {/* Scroll-driven filling glowing line */}
            <div className="timeline-fill-line absolute top-0 left-0 w-full bg-[#C48A1F] shadow-[0_0_12px_#C48A1F] h-0 transition-all duration-300" />
          </div>

          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="timeline-dot absolute -left-[29px] md:-left-[45px] top-1.5 w-4 h-4 rounded-full border-2 border-[#1E1410] bg-[#FAF5ED]/30 group-hover:bg-[#C48A1F] transition-all duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C48A1F] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 bg-[#261B16] border border-[#FAF5ED]/15 rounded-[2px] transition-all duration-300 hover:border-[#C48A1F]/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-sm font-bold text-[#C48A1F]">
                    {m.year}
                  </span>
                  <span className="text-[#FAF5ED]/30">·</span>
                  <span className="font-hindi text-xs text-[#FAF5ED]/70">
                    {m.hindi}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#FAF5ED] mb-1">
                  {m.title}
                </h3>
                <p className="text-xs md:text-sm text-[#FAF5ED]/75 font-body leading-relaxed max-w-xl">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
