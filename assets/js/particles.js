/**
 * ROUGHCLICK DIGITAL - Universal Futuristic Particle Engine & Motion Controller
 * Automatically detects and animates all canvas elements with class 'rc-particles-bg'
 * Supports gold, teal, or custom accent colors, cursor interaction, and scroll reveals.
 */

class RoughClickParticles {
  constructor(canvas, options = {}) {
    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    
    // Palette options
    this.color = options.color || this.canvas.getAttribute('data-particle-color') || '#14B8A6';
    this.particleCount = options.particleCount || (window.innerWidth < 768 ? 30 : 65);
    this.maxDistance = options.maxDistance || 110;
    this.speed = options.speed || 0.5;
    
    this.mouse = {
      x: null,
      y: null,
      radius: 120
    };

    this.isActive = true;
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = this.canvas.width = parent ? parent.offsetWidth : window.innerWidth;
    this.height = this.canvas.height = parent ? parent.offsetHeight : window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.25
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    const parent = this.canvas.parentElement || window;
    parent.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    parent.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive) this.animate();
    });
  }

  animate() {
    if (!this.isActive) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < this.maxDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = this.color;
          this.ctx.globalAlpha = (1 - dist / this.maxDistance) * 0.18;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Auto-initialize across ALL pages
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scan and initialize ALL canvas with class 'rc-particles-bg'
  const canvases = document.querySelectorAll('.rc-particles-bg');
  canvases.forEach(c => {
    let color = c.getAttribute('data-particle-color');
    if (!color) {
      if (document.body.classList.contains('luxury-theme')) color = '#C9A227';
      else if (document.body.classList.contains('modern-theme')) color = '#14B8A6';
      else color = '#14B8A6';
    }
    new RoughClickParticles(c, { color: color });
  });

  // 2. Scroll-Triggered Reveal Engine (IntersectionObserver)
  const revealElements = document.querySelectorAll('.rc-reveal, .luxury-service-card, .modern-service-card, .luxury-pillar-card, .modern-pillar-card, .portfolio-card, .modern-portfolio-card, .blog-card, .modern-blog-card, .concept-card');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rc-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('rc-reveal');
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('rc-revealed'));
  }

  // 3. Futuristic Counter Animation
  const counters = document.querySelectorAll('[data-counter-target]');
  if ('IntersectionObserver' in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const isDecimal = target % 1 !== 0;
          
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = start + (target - start) * easeOut;

            el.innerText = prefix + (isDecimal ? currentVal.toFixed(1) : Math.round(currentVal)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }
});
