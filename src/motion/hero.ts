import gsap from 'gsap';
import { MOTION_CONFIG } from './motionConfig';

// Spice & ingredient glyph shapes for canvas rendering
const SPICE_TYPES = ['cumin', 'cardamom', 'clove', 'curry_leaf', 'mustard_seed'] as const;

interface SpiceParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  type: (typeof SPICE_TYPES)[number];
}

export class HeroMotionController {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: SpiceParticle[] = [];
  private animId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  private isDestroyed = false;

  public init(canvasEl: HTMLCanvasElement): () => void {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    if (!this.ctx) return () => {};

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile
      ? MOTION_CONFIG.hero.particlesCountMobile
      : MOTION_CONFIG.hero.particlesCountDesktop;

    this.resize();
    this.createParticles(particleCount);

    const onResize = () => this.resize();
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = this.canvas?.getBoundingClientRect();
      if (!rect) return;
      this.targetMouseX = (e.clientX - rect.left - rect.width / 2) * MOTION_CONFIG.hero.particleParallaxFactor;
      this.targetMouseY = (e.clientY - rect.top - rect.height / 2) * MOTION_CONFIG.hero.particleParallaxFactor;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Magnetic buttons setup
    const cleanupMagnetic = this.initMagneticButtons();

    // Start particle render loop
    this.renderLoop();

    return () => {
      this.isDestroyed = true;
      if (this.animId) cancelAnimationFrame(this.animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cleanupMagnetic();
    };
  }

  private resize(): void {
    if (!this.canvas || !this.canvas.parentElement) return;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  private createParticles(count: number): void {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 3 + Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.16,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -0.15 - Math.random() * 0.35, // slowly drifting upward like warm kitchen aroma
        type: SPICE_TYPES[Math.floor(Math.random() * SPICE_TYPES.length)],
      });
    }
  }

  private renderLoop(): void {
    if (this.isDestroyed || !this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Smooth mouse parallax lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    ctx.clearRect(0, 0, w, h);

    // Draw soft warm light cone behind headline (top-center, accent gold)
    const lightGrad = ctx.createRadialGradient(
      w * 0.48 + this.mouseX * 0.5,
      h * 0.35 + this.mouseY * 0.5,
      20,
      w * 0.48,
      h * 0.35,
      w * 0.55
    );
    lightGrad.addColorStop(0, 'rgba(196, 138, 31, 0.14)');
    lightGrad.addColorStop(0.5, 'rgba(168, 68, 42, 0.05)');
    lightGrad.addColorStop(1, 'rgba(245, 238, 226, 0)');
    ctx.fillStyle = lightGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw spice particles
    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Wrap around screen
      if (p.y < -20) {
        p.y = h + 20;
        p.x = Math.random() * w;
      }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      ctx.save();
      ctx.translate(p.x + this.mouseX, p.y + this.mouseY);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `rgba(196, 138, 31, ${p.opacity})`;
      ctx.strokeStyle = `rgba(168, 68, 42, ${p.opacity * 0.8})`;
      ctx.lineWidth = 1;

      // Render distinct spice silhouettes
      if (p.type === 'cumin') {
        // Elongated jeera seed with curve
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'cardamom') {
        // Tear-shaped elaichi pod
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.2);
        ctx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size * 1.2);
        ctx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size * 1.2);
        ctx.fill();
        ctx.stroke();
      } else if (p.type === 'curry_leaf') {
        // Slender curved leaf
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.6);
        ctx.quadraticCurveTo(p.size * 0.9, -p.size * 0.2, 0, p.size * 1.6);
        ctx.quadraticCurveTo(-p.size * 0.9, -p.size * 0.2, 0, -p.size * 1.6);
        ctx.fillStyle = `rgba(60, 74, 58, ${p.opacity * 1.2})`;
        ctx.fill();
      } else {
        // Mustard seed / pepper
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.renderLoop());
  }

  // Headline line-by-line reveal with mask and blur
  public revealHeadline(headlineSelector = '.hero-headline-line'): void {
    const lines = document.querySelectorAll(headlineSelector);
    if (!lines.length) return;

    gsap.fromTo(
      lines,
      {
        y: '110%',
        filter: 'blur(8px)',
        opacity: 0,
      },
      {
        y: '0%',
        filter: 'blur(0px)',
        opacity: 1,
        stagger: MOTION_CONFIG.hero.headlineStagger,
        duration: 0.95,
        ease: MOTION_CONFIG.hero.headlineEase,
      }
    );
  }

  // Magnetic CTA pull (~8px)
  private initMagneticButtons(): () => void {
    if (window.innerWidth < 768) return () => {};

    const buttons = document.querySelectorAll<HTMLElement>('.hero-magnetic-btn');
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        const pull = MOTION_CONFIG.hero.magneticPullStrength;

        gsap.to(btn, {
          x: deltaX * pull,
          y: deltaY * pull,
          duration: 0.2,
          ease: 'power2.out',
        });
      };

      const leave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }
}
