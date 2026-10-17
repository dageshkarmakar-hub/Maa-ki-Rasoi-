import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { GiantScrubMarquee } from './components/GiantScrubMarquee';
import { Manifesto } from './components/Manifesto';
import { SteamSwirlSection } from './components/SteamSwirlSection';
import { MenuSlides } from './components/MenuSlides';
import { SplitWordSection } from './components/SplitWordSection';
import { ProcessSection } from './components/ProcessSection';
import { BentoWhyUs } from './components/BentoWhyUs';
import { TrustSection } from './components/TrustSection';
import { StoryTimeline } from './components/StoryTimeline';
import { TiffinPlans } from './components/TiffinPlans';
import { FindUs } from './components/FindUs';
import { FinalCtaRipples } from './components/FinalCtaRipples';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { OwnerGuideModal } from './components/OwnerGuideModal';
import { PhotoChecklistModal } from './components/PhotoChecklistModal';
import { MenuItem, CartItem, TiffinPlan } from './types';
import { KITCHEN_INFO } from './data/kitchenData';
import { ScrollMotionController } from './motion/scroll';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState(false);
  const [isPhotoChecklistOpen, setIsPhotoChecklistOpen] = useState(false);
  const scrollControllerRef = useRef<ScrollMotionController | null>(null);

  // Initialize Lenis smooth scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    let tickerCallback: (time: number) => void;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
        smoothWheel: true,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    } catch {
      // Fallback to native scroll if Lenis fails
    }

    // Initialize ScrollMotionController after fonts are ready to avoid layout shift (no CLS)
    document.fonts.ready.then(() => {
      const scrollController = new ScrollMotionController();
      scrollControllerRef.current = scrollController;
      const cleanupScroll = scrollController.init();
      ScrollTrigger.refresh();

      return () => {
        cleanupScroll();
      };
    });

    return () => {
      if (lenis && tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQ = ci.quantity + delta;
            return newQ > 0 ? { ...ci, quantity: newQ } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectTiffinPlan = (plan: TiffinPlan) => {
    const text = `Namaste Maa Ki Rasoi. I want to inquire about your ${plan.name} (${plan.hindiName}, ₹${plan.pricePerMonth}). My location is in Kota.`;
    const url = `https://wa.me/${KITCHEN_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppDirect = () => {
    const text = `Namaste Maa Ki Rasoi. I would like to order fresh ghar ka khana from your Borkhera kitchen in Kota.`;
    const url = `https://wa.me/${KITCHEN_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen w-full max-w-full bg-[#F5EEE2] text-[#1E1410] font-body selection:bg-[#C48A1F]/30 selection:text-[#1E1410]">
      {/* 1) Welcome Loader (2.6s, session-based, seamless hand-off) */}
      {!preloaderDone && (
        <Preloader
          onComplete={() => setPreloaderDone(true)}
          onHandoff={() => {
            // Re-trigger scrolltrigger refresh
            ScrollTrigger.refresh();
          }}
        />
      )}

      {/* Cursor: Soft spotlight glow follows pointer with lerp smoothing (desktop only) */}
      <CustomCursor />

      {/* Top Bar Contract (1 row, 3 zones) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onWhatsAppDirect={handleWhatsAppDirect}
      />

      <main className="w-full max-w-full overflow-x-clip">
        {/* 2) Hero Section with light cone, spice particles, line-mask reveal, magnetic CTAs */}
        <Hero
          onWhatsAppOrder={handleWhatsAppDirect}
          onExploreMenu={() => {
            const menuElement = document.getElementById('menu');
            menuElement?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3) Stats Block with count-up from 70%, thin crosshairs, cursor glow */}
        <StatsSection />

        {/* 4) Giant Marquee Text (14vw accent line scrubbed to scroll) */}
        <GiantScrubMarquee />

        {/* 5) Manifesto Section (Word-by-word opacity scrubbed) */}
        <Manifesto />

        {/* 6) Feature Moment 3D #1: Steam ribbons glass swirl + Repeated-text stack */}
        <SteamSwirlSection />

        {/* 7) Menu Category Slides with arch mask and interactive spotlight hover */}
        <MenuSlides
          onAddToCart={handleAddToCart}
          cartItemIds={cartItems.map((ci) => ci.item.id)}
        />

        {/* 8) Split-word moment: "Fresh" & "Homemade" sliding inward around floating card */}
        <SplitWordSection />

        {/* 9) Pinned "How it works" section with flowing silk-like wave and step crossfades */}
        <ProcessSection />

        {/* 10) Bento "Why choose us" grid with 3D looping icons & subtle glow */}
        <BentoWhyUs />

        {/* 11) Trust & Verified Reviews with blur-to-sharp stagger */}
        <TrustSection />

        {/* 12) Timeline: Faint grid with rising glowing dots and word highlights */}
        <StoryTimeline />

        {/* 13) Tiffin Plans (Dark section, clean pricing hairlines, no stickers) */}
        <TiffinPlans onSelectPlan={handleSelectTiffinPlan} />

        {/* 14) Find Us & Delivery Radius Checker */}
        <FindUs />

        {/* 15) Final CTA with concentric ripple rings radiating from logo into button */}
        <FinalCtaRipples onWhatsAppOrder={handleWhatsAppDirect} />
      </main>

      {/* 16) Footer with 3D #2 iridescent rotating thali discs + overlapping marquee */}
      <Footer
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        onOpenPhotoChecklist={() => setIsPhotoChecklistOpen(true)}
      />

      {/* Interactive Cart Drawer with formatted WhatsApp message generator */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Owner Menu Update Documentation Modal */}
      <OwnerGuideModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
      />

      {/* Content & Photography Checklist Modal */}
      <PhotoChecklistModal
        isOpen={isPhotoChecklistOpen}
        onClose={() => setIsPhotoChecklistOpen(false)}
      />
    </div>
  );
}
