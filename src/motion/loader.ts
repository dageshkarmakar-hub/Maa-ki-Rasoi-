import gsap from 'gsap';
import { MOTION_CONFIG } from './motionConfig';

export interface LoaderCallbacks {
  onProgress?: (progress: number) => void;
  onHandoff?: () => void;
  onComplete?: () => void;
}

export class WelcomeLoaderController {
  private timeline: gsap.core.Timeline | null = null;
  private isSkipped = false;

  public static hasSeenLoader(): boolean {
    try {
      return sessionStorage.getItem(MOTION_CONFIG.loader.storageKey) === 'true';
    } catch {
      return false;
    }
  }

  public static markAsSeen(): void {
    try {
      sessionStorage.setItem(MOTION_CONFIG.loader.storageKey, 'true');
    } catch {
      // Ignore if storage is disabled
    }
  }

  public run(callbacks: LoaderCallbacks): () => void {
    // If reduced motion is preferred, immediately complete without animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      WelcomeLoaderController.markAsSeen();
      callbacks.onComplete?.();
      return () => {};
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        WelcomeLoaderController.markAsSeen();
        callbacks.onComplete?.();
      },
    });
    this.timeline = tl;

    const {
      lightConeFadeDelay,
      logoScaleDelay,
      greetingDelay,
      wordStagger,
      handoffStart,
      handoffDuration,
      uiRevealStart,
    } = MOTION_CONFIG.loader;

    // 0.2s: Soft radial light cone fades in from top-centre and gently breathes
    tl.to(
      '.loader-light-cone',
      {
        opacity: 0.25,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out',
      },
      lightConeFadeDelay
    );

    // 0.5s: Logo mark fades and scales 0.9 -> 1
    tl.fromTo(
      '.loader-logo-mark',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
      logoScaleDelay
    );

    // Progress bar fills left to right minimum 1.4s
    tl.fromTo(
      '.loader-progress-fill',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: 'power1.inOut',
        transformOrigin: 'left center',
        onUpdate: function () {
          callbacks.onProgress?.(this.progress());
        },
      },
      logoScaleDelay
    );

    // 0.8s: Greeting "Namaste, welcome to Maa Ki Rasoi" rises word by word from line mask
    // each word y:110% to 0, blur 8px to 0, stagger 0.12s, ease power4.out
    tl.fromTo(
      '.loader-greeting-word',
      {
        y: '110%',
        filter: 'blur(8px)',
        opacity: 0,
      },
      {
        y: '0%',
        filter: 'blur(0px)',
        opacity: 1,
        stagger: wordStagger,
        duration: 0.65,
        ease: 'power4.out',
      },
      greetingDelay
    );

    // 1.9s: Seamless handoff. Loader background fades over 0.6s
    // Greeting slides up and out as hero rises
    tl.add(() => {
      callbacks.onHandoff?.();
    }, handoffStart);

    tl.to(
      '.loader-greeting-word',
      {
        y: '-110%',
        opacity: 0,
        filter: 'blur(6px)',
        duration: 0.45,
        stagger: 0.05,
        ease: 'power3.in',
      },
      handoffStart
    );

    tl.to(
      '.loader-overlay',
      {
        opacity: 0,
        duration: handoffDuration,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      },
      handoffStart + 0.1
    );

    // 2.1s - 2.6s: Nav, hero CTA, bottom bar slide in seamlessly
    tl.fromTo(
      'header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      uiRevealStart
    );

    tl.fromTo(
      '.hero-cta-group',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
      uiRevealStart + 0.1
    );

    tl.fromTo(
      '.hero-bottom-bar',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      uiRevealStart + 0.2
    );

    return () => {
      this.timeline?.kill();
      document.body.style.overflow = '';
    };
  }

  public skip(callbacks: LoaderCallbacks): void {
    if (this.isSkipped) return;
    this.isSkipped = true;
    if (this.timeline) {
      this.timeline.progress(1);
    }
    document.body.style.overflow = '';
    WelcomeLoaderController.markAsSeen();
    callbacks.onComplete?.();
  }
}
