import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  dataCursor?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  dataCursor = 'ORDER',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.28;
    const deltaY = (clientY - centerY) * 0.28;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  let baseStyles = 'relative inline-flex items-center justify-center font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 select-none px-6 py-3.5 whitespace-nowrap shrink-0 ';

  if (variant === 'primary') {
    // Terracotta accent with ivory text, sharp / 2px radius
    baseStyles += 'bg-[#A8442A] text-[#FAF5ED] hover:bg-[#8F3720] border border-[#8F3720] rounded-[2px]';
  } else if (variant === 'dark') {
    // Ink brown button with gold accents
    baseStyles += 'bg-[#1E1410] text-[#FAF5ED] hover:bg-[#2E201B] border border-[#FAF5ED]/20 rounded-[2px]';
  } else if (variant === 'outline') {
    baseStyles += 'bg-transparent text-[#1E1410] hover:bg-[#1E1410] hover:text-[#FAF5ED] border border-[#1E1410] rounded-[2px]';
  } else {
    // Secondary
    baseStyles += 'bg-[#EAE1D2] text-[#1E1410] hover:bg-[#DFD4C3] border border-[#1E1410]/20 rounded-[2px]';
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      className={`${baseStyles} ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
