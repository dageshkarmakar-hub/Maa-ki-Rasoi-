/**
 * Maa Ki Rasoi - Motion Design System Configuration
 * All motion parameters, timings, and easing curves can be tweaked here.
 */

export const MOTION_CONFIG = {
  // Brand accent palette for glows and highlights
  colors: {
    accentGold: '#C48A1F',       // Turmeric / gold accent
    accentTerracotta: '#A8442A', // Terracotta warm accent
    ink: '#1E1410',
    paper: '#F5EEE2',
    paperLight: '#FAF5ED',
    glowWarm: 'rgba(196, 138, 31, 0.28)',
    glowTerracotta: 'rgba(168, 68, 42, 0.22)',
  },

  // Welcome Loader (Session-based, ~2.6s)
  loader: {
    totalDuration: 2.6,
    lightConeFadeDelay: 0.2,
    logoScaleDelay: 0.5,
    minProgressDuration: 1.4,
    greetingDelay: 0.8,
    wordStagger: 0.12,
    handoffStart: 1.9,
    handoffDuration: 0.6,
    uiRevealStart: 2.1,
    skipAvailableAfter: 1.0,
    storageKey: 'mkr_welcome_seen',
  },

  // Hero Section
  hero: {
    headlineStagger: 0.1,
    headlineEase: 'power4.out',
    particlesCountDesktop: 36,
    particlesCountMobile: 14,
    particleParallaxFactor: 0.04,
    magneticPullStrength: 8, // 8px maximum pull
    spotlightRadius: 360,
  },

  // Scroll Animations
  scroll: {
    headingTriggerPercent: 'top 80%',
    headingStagger: 0.08,
    headingEase: 'power3.out',
    statsThreshold: 0.7, // Count up from 70% of final value
    statsDuration: 1.5,
    giantMarqueeSpeed: 1.2,
    pinnedProcessScrub: 1,
    imageScaleStart: 1.15,
    imageScaleEnd: 1.0,
    cardHoverGlowRadius: 280,
  },

  // Three.js 3D Scenes
  three: {
    maxPixelRatio: 1.75,
    swirlRibbonsCount: 18,
    steamRotationSpeed: 0.003,
    discsCount: 7,
    discsRotationSpeed: 0.002,
  },
};
