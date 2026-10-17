import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/kitchenData';

export const ProcessSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Flowing silk-like wave canvas (accent turmeric/gold)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    let time = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Flowing silk wave lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const baseAlpha = 0.05 + i * 0.03;
        ctx.fillStyle = `rgba(196, 138, 31, ${baseAlpha})`;

        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const wave1 = Math.sin(x * 0.003 + time * 0.0015 + i) * 45;
          const wave2 = Math.cos(x * 0.006 - time * 0.002 + i) * 25;
          const y = height * 0.65 + wave1 + wave2 + i * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      time += 16;
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="process"
      className="process-pinned-container relative w-full max-w-full bg-[#1E1410] text-[#FAF5ED] py-20 md:py-32 px-4 sm:px-6 md:px-12 border-b border-[#FAF5ED]/10 select-none"
      style={{ overflow: 'clip' }}
    >
      {/* Flowing silk-like wave canvas background safely enclosed in inset: 0 overflow: clip wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ overflow: 'clip' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        />
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-30" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FAF5ED]/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C48A1F] uppercase mb-2">
              <span>04</span>
              <span>·</span>
              <span>Fresh Delivery Protocol</span>
              <span>·</span>
              <span className="font-hindi text-[#FAF5ED]/60">रसोई से आपके दरवाज़े तक</span>
            </div>
            <h2 className="reveal-heading font-serif text-3xl md:text-5xl font-light tracking-tight text-[#FAF5ED]">
              Rasoi se aapke <em className="italic font-normal text-[#C48A1F]">darwaze</em> tak.
            </h2>
          </div>

          <p className="text-xs md:text-sm font-mono text-[#FAF5ED]/70 max-w-sm">
            Four disciplined steps from the morning mandi run to your study table in Borkhera and across Kota.
          </p>
        </div>

        {/* Process Steps Cards (Crossfades as you scroll) */}
        <div className="mt-14 relative min-h-[340px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="process-step-card p-6 border border-[#FAF5ED]/15 bg-[#261B16]/95 rounded-[2px] shadow-lg transition-all"
              >
                {/* Step Numeral & Marker */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-3xl text-[#C48A1F] font-bold">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#FAF5ED]/40 uppercase">
                    {step.timeframe}
                  </span>
                </div>

                {/* Hindi & English Titles */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-hindi text-lg font-semibold text-[#FAF5ED]">
                    {step.title}
                  </h3>
                  <div className="font-serif text-sm italic text-[#FAF5ED]/70">
                    {step.englishTitle}
                  </div>
                </div>

                {/* Concrete description */}
                <p className="text-xs md:text-sm text-[#FAF5ED]/75 leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Thin progress label row at bottom */}
        <div className="mt-12 pt-6 border-t border-[#FAF5ED]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-6">
            {PROCESS_STEPS.map((s, idx) => (
              <div
                key={s.number}
                className={`process-step-tab flex items-center gap-2 cursor-pointer transition-colors ${
                  idx === 0 ? 'text-[#C48A1F]' : 'text-[#FAF5ED]/50 hover:text-[#FAF5ED]'
                }`}
              >
                <span className="font-bold">Step {idx + 1}</span>
                <span className="opacity-40">·</span>
                <span className="hidden sm:inline">{s.englishTitle}</span>
              </div>
            ))}
          </div>

          <div className="text-[#C48A1F] text-[11px] font-mono">
            Direct Dispatch · Borkhera, Kota
          </div>
        </div>
      </div>
    </section>
  );
};
