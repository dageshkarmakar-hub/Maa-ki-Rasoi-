import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { KITCHEN_INFO } from '../data/kitchenData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onWhatsAppDirect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onWhatsAppDirect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    // Run once on load to detect initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full max-w-full px-3 sm:px-6 md:px-8 py-3 sticky-header ${
          isScrolled ? 'is-scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="group flex items-baseline gap-1.5 sm:gap-2 text-slate-900 whitespace-nowrap shrink min-w-0 truncate"
            data-cursor="HOME"
          >
            <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#1E1410] truncate">
              {KITCHEN_INFO.name}
            </span>
            <span className="font-hindi text-xs sm:text-sm md:text-base font-semibold text-[#A8442A] opacity-90 shrink-0">
              {KITCHEN_INFO.hindiName}
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#1E1410]/80">
            <a
              href="#manifesto"
              className="hover:text-[#A8442A] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A8442A]"
            >
              Our Rasoi
            </a>
            <a
              href="#menu"
              className="hover:text-[#A8442A] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A8442A]"
            >
              Daily Menu
            </a>
            <a
              href="#process"
              className="hover:text-[#A8442A] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A8442A]"
            >
              Fresh Process
            </a>
            <a
              href="#tiffin"
              className="hover:text-[#A8442A] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A8442A]"
            >
              Tiffin Plans
            </a>
            <a
              href="#location"
              className="hover:text-[#A8442A] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#A8442A]"
            >
              Borkhera Map
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cart trigger button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#1E1410] hover:text-[#A8442A] transition-colors rounded-[2px] border border-[#1E1410]/15 hover:border-[#A8442A] bg-[#EAE1D2]/60"
              aria-label="View selected items"
              data-cursor="CART"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#A8442A] text-[#FAF5ED] text-[10px] font-mono font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button - hidden on extra small screens, visible on sm+ */}
            <button
              onClick={cartCount > 0 ? onOpenCart : onWhatsAppDirect}
              className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF5ED] bg-[#A8442A] hover:bg-[#8F3720] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
              data-cursor="ORDER"
            >
              {cartCount > 0 ? `Review (${cartCount})` : 'Order on WhatsApp'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1E1410] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[57px] bg-[#FAF5ED] z-30 border-b border-[#1E1410]/15 p-6 shadow-xl lg:hidden flex flex-col gap-4">
          <a
            href="#manifesto"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium tracking-wide uppercase text-[#1E1410] py-2 border-b border-[#1E1410]/10"
          >
            Our Rasoi · रसोई दर्शन
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium tracking-wide uppercase text-[#1E1410] py-2 border-b border-[#1E1410]/10"
          >
            Daily Menu · थाली एवं भोजन
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium tracking-wide uppercase text-[#1E1410] py-2 border-b border-[#1E1410]/10"
          >
            Fresh Process · शुद्ध तैयारी
          </a>
          <a
            href="#tiffin"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium tracking-wide uppercase text-[#1E1410] py-2 border-b border-[#1E1410]/10"
          >
            Tiffin Plans · विद्यार्थी टिफिन
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium tracking-wide uppercase text-[#1E1410] py-2 border-b border-[#1E1410]/10"
          >
            Borkhera Map & Timings · पता
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWhatsAppDirect();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#FAF5ED] bg-[#A8442A] rounded-[2px]"
            >
              Order on WhatsApp (+91 99283 63955)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
