import * as THREE from 'three';
import { MOTION_CONFIG } from './motionConfig';

/**
 * 3D Scene #1: Rotating Glass Steam Ribbons / Swirl
 * Placed in front of the Repeated-Text CTA Stack ("Order Ghar Ka Khana")
 */
export class SteamRibbonSwirlScene {
  private container: HTMLElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private ribbonGroup: THREE.Group | null = null;
  private animId: number | null = null;
  private isVisible = false;
  private observer: IntersectionObserver | null = null;

  public init(container: HTMLElement): () => void {
    if (window.innerWidth < 768) {
      // Mobile fallback: CSS gradient / pure light glow
      container.classList.add('mobile-steam-fallback');
      return () => {};
    }

    this.container = container;
    const width = container.clientWidth || container.parentElement?.clientWidth || 300;
    const height = container.clientHeight || container.parentElement?.clientHeight || 400;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOTION_CONFIG.three.maxPixelRatio));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    // Lighting for glass / chrome reflections
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc48a1f, 2.5); // Warm turmeric rim
    dirLight1.position.set(4, 5, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa8442a, 1.8); // Terracotta side fill
    dirLight2.position.set(-4, -3, 2);
    scene.add(dirLight2);

    // Create 3D steam ribbon swirl geometry (parametric curve tube)
    const ribbonGroup = new THREE.Group();
    this.ribbonGroup = ribbonGroup;
    scene.add(ribbonGroup);

    // Warm glass / chrome material with low roughness and golden hue
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf5eee2,
      emissive: 0xc48a1f,
      emissiveIntensity: 0.15,
      metalness: 0.25,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      ior: 1.5,
    });

    // Generate helical steam ribbon curves
    const ribbonCount = 5;
    for (let i = 0; i < ribbonCount; i++) {
      const points: THREE.Vector3[] = [];
      const turns = 2.4;
      const heightSpan = 4.2;
      const angleOffset = (i / ribbonCount) * Math.PI * 2;

      for (let t = 0; t <= 40; t++) {
        const progress = t / 40;
        const angle = progress * Math.PI * 2 * turns + angleOffset;
        const radius = 1.1 + Math.sin(progress * Math.PI) * 0.9;
        const x = Math.cos(angle) * radius;
        const y = (progress - 0.5) * heightSpan;
        const z = Math.sin(angle) * radius * 0.6;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.08 + (i % 2) * 0.04, 8, false);
      const mesh = new THREE.Mesh(tubeGeo, material);
      ribbonGroup.add(mesh);
    }

    // Lazy observe visibility
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    this.observer.observe(container);

    const onResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    const render = () => {
      if (this.isVisible && this.renderer && this.scene && this.camera && this.ribbonGroup) {
        this.ribbonGroup.rotation.y += MOTION_CONFIG.three.steamRotationSpeed;
        this.ribbonGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.12;
        this.renderer.render(this.scene, this.camera);
      }
      this.animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (this.animId) cancelAnimationFrame(this.animId);
      this.observer?.disconnect();
      window.removeEventListener('resize', onResize);
      if (this.renderer && container.contains(this.renderer.domElement)) {
        container.removeChild(this.renderer.domElement);
        this.renderer.dispose();
      }
    };
  }
}

/**
 * 3D Scene #2: Translucent Iridescent Rotating Thali Discs
 * Placed in the Footer background with giant overlapping text marquee
 */
export class FooterThaliDiscsScene {
  private container: HTMLElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private discsGroup: THREE.Group | null = null;
  private animId: number | null = null;
  private isVisible = false;
  private observer: IntersectionObserver | null = null;

  public init(container: HTMLElement): () => void {
    if (window.innerWidth < 768) {
      container.classList.add('mobile-thali-fallback');
      return () => {};
    }

    this.container = container;
    const width = container.clientWidth || container.parentElement?.clientWidth || 300;
    const height = container.clientHeight || container.parentElement?.clientHeight || 500;

    const scene = new THREE.Scene();
    this.scene = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOTION_CONFIG.three.maxPixelRatio));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    this.renderer = renderer;

    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xc48a1f, 3.5, 15, Math.PI / 4, 0.3);
    spotLight.position.set(2, 6, 6);
    scene.add(spotLight);

    const discsGroup = new THREE.Group();
    this.discsGroup = discsGroup;
    scene.add(discsGroup);

    // Kansa bell-metal / translucent iridescent brass plate material
    const discMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2e201b,
      emissive: 0xc48a1f,
      emissiveIntensity: 0.18,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.75,
    });

    const discCount = MOTION_CONFIG.three.discsCount;
    for (let i = 0; i < discCount; i++) {
      const radius = 1.2 + (i % 3) * 0.45;
      const discGeo = new THREE.CylinderGeometry(radius, radius, 0.04, 36);
      const mesh = new THREE.Mesh(discGeo, discMaterial);

      const angle = (i / discCount) * Math.PI * 2;
      const spread = 2.4;
      mesh.position.set(Math.cos(angle) * spread, (i - discCount / 2) * 0.4, Math.sin(angle) * 1.2);
      mesh.rotation.x = Math.PI / 3 + (i * 0.1);
      mesh.rotation.z = i * 0.25;

      discsGroup.add(mesh);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    this.observer.observe(container);

    const onResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      if (this.isVisible && this.renderer && this.scene && this.camera && this.discsGroup) {
        this.discsGroup.rotation.y += MOTION_CONFIG.three.discsRotationSpeed;
        this.discsGroup.rotation.z += 0.0008;
        this.renderer.render(this.scene, this.camera);
      }
      this.animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (this.animId) cancelAnimationFrame(this.animId);
      this.observer?.disconnect();
      window.removeEventListener('resize', onResize);
      if (this.renderer && container.contains(this.renderer.domElement)) {
        container.removeChild(this.renderer.domElement);
        this.renderer.dispose();
      }
    };
  }
}
