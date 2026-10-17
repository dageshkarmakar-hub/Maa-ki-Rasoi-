import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION_CONFIG } from './motionConfig';

gsap.registerPlugin(ScrollTrigger);

export class ScrollMotionController {
  private triggers: ScrollTrigger[] = [];

  public init(): () => void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {};
    }

    this.initSectionHeadingReveals();
    this.initStatsCountUp();
    this.initGiantScrubbedMarquee();
    this.initRepeatedTextParallax();
    this.initPinnedProcessSection();
    this.initSplitWordMoment();
    this.initCardSpotlightHover();
    this.initBentoCardsReveal();
    this.initImageScaleReveal();
    this.initTimelineStoryReveal();
    this.initFinalCtaRipples();
    this.initReviewsBlurStagger();

    return () => {
      this.triggers.forEach((st) => st.kill());
      this.triggers = [];
    };
  }

  // 1. Section headings: word-by-word mask reveal, y: 100% to 0, stagger 0.08s at 80% viewport
  private initSectionHeadingReveals(): void {
    const headings = document.querySelectorAll<HTMLElement>('.reveal-heading');

    headings.forEach((heading) => {
      // Split into words if not already wrapped
      const text = heading.innerText.trim();
      if (!heading.dataset.split) {
        heading.dataset.split = 'true';
        heading.innerHTML = text
          .split(' ')
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden mr-[0.22em] align-bottom"><span class="heading-word inline-block will-change-transform">${word}</span></span>`
          )
          .join('');
      }

      const words = heading.querySelectorAll('.heading-word');
      const st = ScrollTrigger.create({
        trigger: heading,
        start: MOTION_CONFIG.scroll.headingTriggerPercent,
        once: true,
        onEnter: () => {
          gsap.fromTo(
            words,
            { y: '105%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              stagger: MOTION_CONFIG.scroll.headingStagger,
              duration: 0.8,
              ease: MOTION_CONFIG.scroll.headingEase,
            }
          );
        },
      });
      this.triggers.push(st);
    });
  }

  // 2. Stats Block: count up from ~70% of final value when entered
  private initStatsCountUp(): void {
    const statsContainer = document.querySelector('.stats-block-container');
    if (!statsContainer) return;

    const statElements = statsContainer.querySelectorAll<HTMLElement>('[data-stat-value]');
    const st = ScrollTrigger.create({
      trigger: statsContainer,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        statElements.forEach((el, idx) => {
          const finalVal = parseFloat(el.dataset.statValue || '0');
          const isDecimal = el.dataset.statDecimal === 'true';
          const prefix = el.dataset.statPrefix || '';
          const suffix = el.dataset.statSuffix || '';
          const startVal = finalVal * MOTION_CONFIG.scroll.statsThreshold;

          const obj = { val: startVal };
          gsap.to(obj, {
            val: finalVal,
            duration: MOTION_CONFIG.scroll.statsDuration,
            delay: idx * 0.12,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = `${prefix}${isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)}${suffix}`;
            },
          });
        });
      },
    });
    this.triggers.push(st);
  }

  // 3. Giant Marquee Text: ~14vw scrubbed to scroll
  private initGiantScrubbedMarquee(): void {
    const marqueeTrack = document.querySelector<HTMLElement>('.giant-scrub-marquee-track');
    const marqueeSection = document.querySelector<HTMLElement>('.giant-scrub-marquee-section');
    if (!marqueeTrack || !marqueeSection) return;

    const st = ScrollTrigger.create({
      trigger: marqueeSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: MOTION_CONFIG.scroll.giantMarqueeSpeed,
      onUpdate: (self) => {
        const isMobile = window.innerWidth < 768;
        const maxOffset = isMobile ? 80 : 350;
        const offset = (self.progress - 0.5) * -maxOffset;
        marqueeTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
      },
    });
    this.triggers.push(st);
  }

  // 4. Repeated-Text Stack: 6 repeated tight lines parallaxing against 3D swirl
  private initRepeatedTextParallax(): void {
    const stackContainer = document.querySelector<HTMLElement>('.repeated-text-stack');
    if (!stackContainer) return;

    const textLines = stackContainer.querySelectorAll('.stack-line');
    const st = ScrollTrigger.create({
      trigger: stackContainer,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const isMobile = window.innerWidth < 768;
        const maxDepth = isMobile ? 8 : 28;
        textLines.forEach((line, idx) => {
          const depth = (idx - 2.5) * maxDepth;
          gsap.set(line, { x: (p - 0.5) * depth });
        });
      },
    });
    this.triggers.push(st);
  }

  // 5. "How it works / How to order" pinned section with step card crossfade
  private initPinnedProcessSection(): void {
    const processPinned = document.querySelector<HTMLElement>('.process-pinned-container');
    if (!processPinned) return;
    if (window.innerWidth < 768) return; // Keep vertical on mobile for clean UX

    const cards = processPinned.querySelectorAll<HTMLElement>('.process-step-card');
    const progressTabs = processPinned.querySelectorAll<HTMLElement>('.process-step-tab');
    const totalSteps = cards.length;

    const st = ScrollTrigger.create({
      trigger: processPinned,
      start: 'top top',
      end: `+=${totalSteps * 120}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const stepIndex = Math.min(Math.floor(self.progress * totalSteps), totalSteps - 1);
        cards.forEach((card, idx) => {
          if (idx === stepIndex) {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.3, overwrite: 'auto' });
          } else {
            gsap.to(card, { opacity: 0, y: idx < stepIndex ? -20 : 20, duration: 0.3, overwrite: 'auto' });
          }
        });
        progressTabs.forEach((tab, idx) => {
          tab.classList.toggle('active-step-tab', idx === stepIndex);
        });
      },
    });
    this.triggers.push(st);
  }

  // 6. Split-word moment: "Fresh" from left, "Homemade" from right around floating thali card
  private initSplitWordMoment(): void {
    const splitSection = document.querySelector<HTMLElement>('.split-word-section');
    if (!splitSection) return;

    const leftWord = splitSection.querySelector<HTMLElement>('.split-word-left');
    const rightWord = splitSection.querySelector<HTMLElement>('.split-word-right');
    const centerCard = splitSection.querySelector<HTMLElement>('.split-word-card');

    if (!leftWord || !rightWord || !centerCard) return;

    const st = ScrollTrigger.create({
      trigger: splitSection,
      start: 'top 75%',
      end: 'bottom 25%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const isMobile = window.innerWidth < 768;
        const maxSlide = isMobile ? 35 : 120;
        // Slide inward toward centre
        gsap.set(leftWord, { x: (1 - p) * -maxSlide });
        gsap.set(rightWord, { x: (1 - p) * maxSlide });
        // Subtle tilt on floating card
        gsap.set(centerCard, {
          rotateZ: (p - 0.5) * 6,
          rotateY: isMobile ? 0 : (p - 0.5) * 8,
          scale: 0.98 + p * 0.04,
        });
      },
    });
    this.triggers.push(st);
  }

  // 7. Menu / Pricing cards spotlight hover & active category glow
  private initCardSpotlightHover(): void {
    const cards = document.querySelectorAll<HTMLElement>('.interactive-spotlight-card');

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
      };
      card.addEventListener('mousemove', onMove);
    });
  }

  // 8. Bento "Why choose us" cards stagger with 3D looping icon glow
  private initBentoCardsReveal(): void {
    const bentoContainer = document.querySelector<HTMLElement>('.bento-why-us-grid');
    if (!bentoContainer) return;

    const bentoCards = bentoContainer.querySelectorAll('.bento-item');
    const st = ScrollTrigger.create({
      trigger: bentoContainer,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          bentoCards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      },
    });
    this.triggers.push(st);
  }

  // 9. Large image/video scale reveal: scale 1.15 to 1 with clip-path
  private initImageScaleReveal(): void {
    const imageWrappers = document.querySelectorAll<HTMLElement>('.scroll-scale-image-wrap');

    imageWrappers.forEach((wrap) => {
      const img = wrap.querySelector<HTMLElement>('.scale-target');
      if (!img) return;

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 90%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          const scale = MOTION_CONFIG.scroll.imageScaleStart - self.progress * 0.15;
          gsap.set(img, { scale });
        },
      });
      this.triggers.push(st);
    });
  }

  // 10. Timeline ("Our Story"): glowing dots rising on vertical line, word highlight
  private initTimelineStoryReveal(): void {
    const timeline = document.querySelector<HTMLElement>('.story-timeline-section');
    if (!timeline) return;

    const fillLine = timeline.querySelector<HTMLElement>('.timeline-fill-line');
    const dots = timeline.querySelectorAll<HTMLElement>('.timeline-dot');

    const st = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.8,
      onUpdate: (self) => {
        if (fillLine) {
          fillLine.style.height = `${self.progress * 100}%`;
        }
        dots.forEach((dot, idx) => {
          const threshold = idx / (dots.length - 1 || 1);
          if (self.progress >= threshold) {
            dot.classList.add('timeline-dot-active');
          } else {
            dot.classList.remove('timeline-dot-active');
          }
        });
      },
    });
    this.triggers.push(st);
  }

  // 11. Final CTA: Concentric ripple rings radiating from logo and collapsing into button
  private initFinalCtaRipples(): void {
    const ctaSection = document.querySelector<HTMLElement>('.final-cta-ripple-section');
    if (!ctaSection) return;

    const rings = ctaSection.querySelectorAll('.ripple-ring');
    const st = ScrollTrigger.create({
      trigger: ctaSection,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          rings,
          { scale: 0.5, opacity: 0.8 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 2.4,
            repeat: -1,
            stagger: 0.6,
            ease: 'power2.out',
          }
        );
      },
    });
    this.triggers.push(st);
  }

  // 12. Reviews blur stagger
  private initReviewsBlurStagger(): void {
    const reviewsGrid = document.querySelector<HTMLElement>('.reviews-stagger-grid');
    if (!reviewsGrid) return;

    const reviewCards = reviewsGrid.querySelectorAll('.review-stagger-card');
    const st = ScrollTrigger.create({
      trigger: reviewsGrid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          reviewCards,
          { opacity: 0, filter: 'blur(8px)', y: 30 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      },
    });
    this.triggers.push(st);
  }
}
