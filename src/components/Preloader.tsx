import React, { useEffect, useState, useRef } from 'react';
import { WelcomeLoaderController } from '../motion/loader';
import { KITCHEN_INFO } from '../data/kitchenData';

interface PreloaderProps {
  onComplete: () => void;
  onHandoff?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, onHandoff }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [progressVal, setProgressVal] = useState(0);
  const controllerRef = useRef<WelcomeLoaderController | null>(null);

  useEffect(() => {
    // Check if user already saw the loader in this session
    if (WelcomeLoaderController.hasSeenLoader()) {
      onComplete();
      return;
    }

    const controller = new WelcomeLoaderController();
    controllerRef.current = controller;

    // Show skip button after 1s
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    const cleanup = controller.run({
      onProgress: (p) => setProgressVal(Math.round(p * 100)),
      onHandoff: () => onHandoff?.(),
      onComplete: () => onComplete(),
    });

    return () => {
      clearTimeout(skipTimer);
      cleanup();
    };
  }, [onComplete, onHandoff]);

  const handleSkip = () => {
    controllerRef.current?.skip({
      onComplete: () => onComplete(),
    });
  };

  return (
    <div className="loader-overlay fixed inset-0 w-full max-w-full z-50 bg-[#160E0B] text-[#FAF5ED] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* 0.2s: Soft radial light cone from top-centre */}
      <div
        className="loader-light-cone absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] max-w-full rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(196,138,31,0.35) 0%, rgba(168,68,42,0.12) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Paper grain overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-30" />

      {/* Center Stack */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        {/* 0.5s: Logo mark fades & scales 0.9 to 1 */}
        <div className="loader-logo-mark opacity-0 flex flex-col items-center">
          <div className="text-[11px] font-mono tracking-[0.3em] text-[#C48A1F] uppercase mb-2">
            Borkhera, Kota · Est. 2023
          </div>
          <div className="font-hindi text-4xl md:text-5xl font-bold tracking-tight text-[#FAF5ED]">
            {KITCHEN_INFO.hindiName}
          </div>
          <div className="font-serif text-sm tracking-widest text-[#FAF5ED]/70 uppercase mt-1">
            {KITCHEN_INFO.name}
          </div>
        </div>

        {/* 1px Progress line filling left to right, min 1.4s */}
        <div className="w-56 h-[1px] bg-[#FAF5ED]/15 my-6 overflow-hidden relative">
          <div className="loader-progress-fill absolute inset-0 bg-[#C48A1F] origin-left scale-x-0" />
        </div>

        {/* 0.8s: Greeting word by word from line mask */}
        {/* "Namaste, welcome to Maa Ki Rasoi" */}
        <div className="h-10 overflow-hidden flex items-center justify-center gap-[0.35em] text-sm md:text-base font-serif italic text-[#FAF5ED]/90">
          <span className="overflow-hidden inline-block">
            <span className="loader-greeting-word inline-block will-change-transform">Namaste,</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="loader-greeting-word inline-block will-change-transform">welcome</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="loader-greeting-word inline-block will-change-transform">to</span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="loader-greeting-word inline-block will-change-transform font-normal text-[#C48A1F]">
              Maa Ki
            </span>
          </span>
          <span className="overflow-hidden inline-block">
            <span className="loader-greeting-word inline-block will-change-transform font-normal text-[#C48A1F]">
              Rasoi
            </span>
          </span>
        </div>

        {/* Percent readout */}
        <div className="mt-3 text-[10px] font-mono text-[#FAF5ED]/40 tabular-nums">
          {progressVal}%
        </div>
      </div>

      {/* Skip button after 1s */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-20 text-[11px] font-mono tracking-widest uppercase text-[#FAF5ED]/50 hover:text-[#C48A1F] transition-colors py-1.5 px-3 border border-[#FAF5ED]/15 hover:border-[#C48A1F] rounded-[2px]"
        >
          Skip Introduction →
        </button>
      )}
    </div>
  );
};
