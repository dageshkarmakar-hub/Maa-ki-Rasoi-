import React, { useState, useRef, useEffect } from 'react';
import { PhotoFrame } from './PhotoFrame';
import { MENU_ITEMS, KITCHEN_INFO } from '../data/kitchenData';
import { MenuItem } from '../types';
import { ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react';

interface MenuSlidesProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: string[];
}

export const MenuSlides: React.FC<MenuSlidesProps> = ({ onAddToCart, cartItemIds }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      numeral: '01',
      id: 'thali',
      name: 'Ghar Ki Thali',
      hindiName: 'घर की थाली',
      shortDesc: 'Complete balanced vegetarian meal plates with ghee phulkas, dal tadka, seasonal sabzi, and rice.',
      subnote: 'Cooked fresh twice daily for lunch and dinner.',
      photoPrompt: 'Traditional kansa thali on teak wood with four puffed phulkas glistening with desi ghee, hot yellow dal in brass katori, dry spiced aloo gobhi and steamed basmati rice with cucumber salad',
      items: MENU_ITEMS.filter((i) => i.category === 'thali'),
    },
    {
      numeral: '02',
      id: 'roti-sabzi',
      name: 'Roti & Taza Sabzi',
      hindiName: 'रोटी एवं ताज़ा सब्ज़ी',
      shortDesc: 'Whole-wheat chakki phulkas puffed on tawa and homestyle vegetables without excess oil.',
      subnote: 'No restaurant food color. Made with cold-pressed mustard oil and pure ghee.',
      photoPrompt: 'Close up of hands taking a hot puffed roti directly from tawa, steam rising, golden clarified butter melting on surface next to kadhai of sev tamatar',
      items: MENU_ITEMS.filter((i) => i.category === 'roti-sabzi'),
    },
    {
      numeral: '03',
      id: 'dal-chawal',
      name: 'Dal & Chawal',
      hindiName: 'दाल एवं चावल',
      shortDesc: 'Slow-simmered lentils with authentic garlic and hing tadka, paired with aromatic jeera rice.',
      subnote: 'Light on the stomach for students during long study hours.',
      photoPrompt: 'Top down view of yellow arhar dal with sizzling ghee, cumin seeds and dried red chilli resting beside fragrant long grain basmati rice and roasted papad',
      items: MENU_ITEMS.filter((i) => i.category === 'dal-chawal'),
    },
    {
      numeral: '04',
      id: 'tiffin',
      name: 'Daily Tiffin & Plans',
      hindiName: 'दैनिक टिफिन योजना',
      shortDesc: 'Monthly and weekly tiffin services delivered directly to your PG, hostel or home in Kota.',
      subnote: 'Flexible pause policy for exam leaves and home visits.',
      photoPrompt: 'Neat multi-compartment food grade insulated tiffin opened on student study desk with steaming rotis wrapped in organic paper, dal and sabzi containers sealed clean',
      items: [
        {
          id: 'tiffin-preview-1',
          name: 'Student Monthly Lunch/Dinner',
          hindiName: 'मंथली टिफिन (1 समय)',
          category: 'tiffin' as const,
          price: 2700,
          description: '30 warm meals per month. 4 ghee phulkas, rotational dal, seasonal sabzi, rice, salad.',
          contents: ['4 Ghee Phulkas', 'Daily Dal', 'Seasonal Sabzi', 'Rice', 'Salad'],
          photoPrompt: 'Fresh student meal box',
          isPopular: true,
          preparationTime: 'Daily service',
        },
        {
          id: 'tiffin-preview-2',
          name: 'Both Meals Full Tiffin',
          hindiName: 'दोनों समय टिफिन',
          category: 'tiffin' as const,
          price: 5100,
          description: '60 meals per month. Freshly cooked at 11:30 AM and 7:30 PM with zero repetition.',
          contents: ['Lunch + Dinner', 'Sunday Special Thali', 'Free Pauses'],
          photoPrompt: 'Double meal tiffin setup',
          isPopular: false,
          preparationTime: 'Daily service',
        },
      ] as MenuItem[],
    },
    {
      numeral: '05',
      id: 'sweets-more',
      name: 'Meetha & Chhachh',
      hindiName: 'मीठा, रायता व छाछ',
      shortDesc: 'Traditional accompaniments including roasted cumin buttermilk, curd raita, and pure mawa gulab jamun.',
      subnote: 'Prepared in house using fresh milk and hand-roasted spices.',
      photoPrompt: 'Two warm dark golden gulab jamuns soaking in cardamom saffron syrup inside a small kansa bowl alongside tall brass glass of spiced frothy buttermilk',
      items: MENU_ITEMS.filter((i) => i.category === 'sweets-more'),
    },
  ];

  const currentCategory = categories[activeCategoryIndex];

  const handleNext = () => {
    setActiveCategoryIndex((prev) => (prev < categories.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveCategoryIndex((prev) => (prev > 0 ? prev - 1 : categories.length - 1));
  };

  return (
    <section
      id="menu"
      ref={containerRef}
      className="relative w-full max-w-full bg-[#F5EEE2] py-20 md:py-28 px-4 sm:px-6 md:px-12 border-b border-[#1E1410]/12 overflow-x-clip"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Header Strip with Category Navigator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1E1410]/12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A8442A] uppercase mb-2">
              <span>03</span>
              <span>·</span>
              <span>Daily Chapter Menu</span>
              <span>·</span>
              <span className="font-hindi text-[#1E1410]/60">ताज़ा भोजन</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1E1410]">
              From the tawa to your <em className="italic font-normal text-[#A8442A]">thali</em>.
            </h2>
          </div>

          {/* Category Tabs / Slide Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all rounded-[2px] whitespace-nowrap shrink-0 border ${
                  activeCategoryIndex === idx
                    ? 'bg-[#1E1410] text-[#FAF5ED] border-[#1E1410]'
                    : 'bg-[#EAE1D2]/70 text-[#1E1410]/70 border-[#1E1410]/15 hover:text-[#1E1410] hover:bg-[#EAE1D2]'
                }`}
                data-cursor="SELECT"
              >
                <span className="text-[#C48A1F] mr-1.5">{cat.numeral}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Slide Content Layout (Asymmetric 12-column grid with Arch Masked Image) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Arch-masked visual archival frame with scroll scale reveal */}
          <div className="lg:col-span-5 relative scroll-scale-image-wrap overflow-hidden">
            <div className="relative mx-auto max-w-md lg:max-w-none scale-target will-change-transform">
              <PhotoFrame
                promptText={currentCategory.photoPrompt}
                label={`CHAPTER ${currentCategory.numeral} · ${currentCategory.name.toUpperCase()}`}
                aspect="arch"
                theme="light"
              />

              {/* Float numeral badge */}
              <div className="absolute -bottom-4 -left-3 bg-[#1E1410] text-[#FAF5ED] font-serif text-4xl px-4 py-2 border border-[#FAF5ED]/20 shadow-md">
                {currentCategory.numeral}
              </div>
            </div>
          </div>

          {/* Right Column: Category Details & Menu Dishes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-[#1E1410]/12 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#A8442A] uppercase tracking-widest font-semibold">
                  Category {currentCategory.numeral} of 05
                </span>
                <span className="text-[#1E1410]/20">·</span>
                <span className="font-hindi text-base text-[#1E1410]/70">
                  {currentCategory.hindiName}
                </span>
              </div>
              <h3 className="reveal-heading font-serif text-2xl md:text-4xl text-[#1E1410] mt-1 font-normal">
                {currentCategory.name}
              </h3>
              <p className="text-sm md:text-base text-[#1E1410]/80 mt-2 font-body max-w-xl">
                {currentCategory.shortDesc}
              </p>
              <div className="text-xs font-mono text-[#1E1410]/60 mt-2">
                {currentCategory.subnote}
              </div>
            </div>

            {/* List of items in this category */}
            <div className="space-y-4 pt-1">
              {currentCategory.items.map((item) => {
                const isInCart = cartItemIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="interactive-spotlight-card relative p-4 bg-[#FAF5ED] border border-[#1E1410]/12 hover:border-[#A8442A]/40 transition-all rounded-[2px] overflow-hidden group"
                  >
                    {/* Inner cursor-following spotlight glow */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle 240px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(196,138,31,0.12), transparent 70%)',
                      }}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-serif text-lg font-medium text-[#1E1410]">
                            {item.name}
                          </h4>
                          <span className="font-hindi text-xs text-[#A8442A]">
                            {item.hindiName}
                          </span>
                          {item.isPopular && (
                            <span className="text-[10px] font-mono tracking-widest text-[#C48A1F] uppercase font-semibold">
                              · Most Ordered
                            </span>
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-[#1E1410]/75 leading-relaxed max-w-lg">
                          {item.description}
                        </p>

                        {/* Contents list */}
                        {item.contents && (
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] font-mono text-[#1E1410]/60">
                            {item.contents.map((c, i) => (
                              <span key={i}>
                                {c}
                                {i < item.contents!.length - 1 && ' · '}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0 flex flex-col items-end justify-between h-full space-y-3">
                        <div className="font-serif text-lg md:text-xl font-semibold text-[#1E1410] tabular-nums">
                          ₹{item.price}
                        </div>

                        <button
                          onClick={() => onAddToCart(item)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all rounded-[2px] ${
                            isInCart
                              ? 'bg-[#3C4A3A] text-[#FAF5ED]'
                              : 'bg-[#A8442A] text-[#FAF5ED] hover:bg-[#8F3720]'
                          }`}
                          data-cursor="ADD"
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slide Navigation and Category Progress Bar */}
            <div className="pt-6 flex items-center justify-between gap-4 border-t border-[#1E1410]/12">
              {/* Category indicator dots / progress */}
              <div className="flex-1 max-w-xs">
                <div className="h-[2px] bg-[#1E1410]/15 relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#A8442A] transition-all duration-300"
                    style={{
                      width: `${((activeCategoryIndex + 1) / categories.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-[#1E1410]/50 mt-1">
                  <span>SLIDE 0{activeCategoryIndex + 1}</span>
                  <span>TOTAL 0{categories.length}</span>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 border border-[#1E1410]/20 hover:border-[#1E1410] bg-[#FAF5ED] text-[#1E1410] rounded-[2px] transition-colors"
                  aria-label="Previous Category"
                  data-cursor="PREV"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 border border-[#1E1410]/20 hover:border-[#1E1410] bg-[#1E1410] text-[#FAF5ED] rounded-[2px] transition-colors"
                  aria-label="Next Category"
                  data-cursor="NEXT"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
