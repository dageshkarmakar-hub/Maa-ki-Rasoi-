import React from 'react';

interface PhotoFrameProps {
  promptText: string;
  label?: string;
  aspect?: 'arch' | 'rect' | 'square' | 'wide';
  className?: string;
  theme?: 'light' | 'dark';
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  promptText,
  label = 'KITCHEN ARCHIVE PHOTO',
  aspect = 'arch',
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const aspectClass =
    aspect === 'arch'
      ? 'mask-arch aspect-[4/5]'
      : aspect === 'square'
      ? 'aspect-square rounded-[2px]'
      : aspect === 'wide'
      ? 'aspect-[16/9] rounded-[2px]'
      : 'aspect-[4/3] rounded-[2px]';

  return (
    <div
      className={`relative overflow-hidden transition-transform duration-500 hover:scale-[1.01] ${aspectClass} ${
        isDark ? 'bg-[#261B16] text-[#FAF5ED]' : 'bg-[#EAE1D2] text-[#1E1410]'
      } ${className}`}
      data-cursor="PHOTO"
    >
      {/* Subtle paper grain & light falloff overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 30%, rgba(196,138,31,0.08) 0%, transparent 75%)'
            : 'radial-gradient(ellipse at 50% 30%, rgba(245,238,226,0.6) 0%, rgba(168,68,42,0.05) 100%)',
        }}
      />

      {/* Frame hairline border & archival corner marks */}
      <div
        className={`absolute inset-3 border pointer-events-none ${
          isDark ? 'border-[#FAF5ED]/15' : 'border-[#1E1410]/15'
        } ${aspect === 'arch' ? 'mask-arch-sm' : 'rounded-[2px]'}`}
      />

      {/* Crosshair corner marks */}
      <div
        className={`absolute top-4 left-4 text-[9px] font-mono tracking-widest ${
          isDark ? 'text-[#FAF5ED]/40' : 'text-[#1E1410]/40'
        }`}
      >
        +
      </div>
      <div
        className={`absolute top-4 right-4 text-[9px] font-mono tracking-widest ${
          isDark ? 'text-[#FAF5ED]/40' : 'text-[#1E1410]/40'
        }`}
      >
        +
      </div>
      <div
        className={`absolute bottom-4 left-4 text-[9px] font-mono tracking-widest ${
          isDark ? 'text-[#FAF5ED]/40' : 'text-[#1E1410]/40'
        }`}
      >
        +
      </div>
      <div
        className={`absolute bottom-4 right-4 text-[9px] font-mono tracking-widest ${
          isDark ? 'text-[#FAF5ED]/40' : 'text-[#1E1410]/40'
        }`}
      >
        +
      </div>

      {/* Content description strictly conforming to brief */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 z-10">
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] uppercase tracking-[0.2em] font-mono ${
              isDark ? 'text-[#C48A1F]' : 'text-[#A8442A]'
            }`}
          >
            {label}
          </span>
          <span
            className={`text-[9px] font-mono tracking-wider ${
              isDark ? 'text-[#FAF5ED]/40' : 'text-[#1E1410]/40'
            }`}
          >
            REAL FOOD ONLY
          </span>
        </div>

        <div className="my-auto py-4">
          <div
            className={`text-[11px] font-mono mb-2 uppercase tracking-wider ${
              isDark ? 'text-[#FAF5ED]/50' : 'text-[#1E1410]/50'
            }`}
          >
            PHOTO:
          </div>
          <p
            className={`text-sm md:text-base font-serif italic leading-snug ${
              isDark ? 'text-[#FAF5ED]/90' : 'text-[#1E1410]/90'
            }`}
          >
            {promptText}
          </p>
        </div>

        <div
          className={`flex items-center justify-between text-[9px] font-mono pt-3 border-t ${
            isDark ? 'border-[#FAF5ED]/10 text-[#FAF5ED]/40' : 'border-[#1E1410]/10 text-[#1E1410]/40'
          }`}
        >
          <span>Borkhera, Kota · Rasoi Cam</span>
          <span>No Stock · Real Plate</span>
        </div>
      </div>
    </div>
  );
};
