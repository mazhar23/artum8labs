class MagicBento {
  constructor(options = {}) {
    this.textAutoHide = options.textAutoHide !== false;
    this.enableStars = options.enableStars !== false;
    this.enableSpotlight = options.enableSpotlight !== false;
    this.enableBorderGlow = options.enableBorderGlow !== false;
    this.enableTilt = options.enableTilt !== false && !this.isMobile;
    this.enableMagnetism = options.enableMagnetism !== false && !this.isMobile;
    this.clickEffect = options.clickEffect !== false;
    this.spotlightRadius = options.spotlightRadius || 300;
    this.particleCount = options.particleCount || 6;
    this.glowColor = options.glowColor || '132, 0, 255';

    this.cardData = [
      {
        color: '#1a1a1a',
        title: 'FinanceFlow Inc.',
        description: 'Trading Platform - +340% User Engagement',
        label: 'FINTECH',
        image: '../images/Financeflow.svg'
      },
      {
        color: '#1a1a1a',
        title: 'MedConnect',
        description: 'Telemedicine Platform - +250% Patient Satisfaction',
        label: 'HEALTHTECH',
        image: '../images/Medconnect.svg'
      },
      {
        color: '#1a1a1a',
        title: 'ShopMax',
        description: 'E-commerce Platform - +420% Conversion Rate',
        label: 'ECOMMERCE',
        image: '../images/ShopMax.svg'
      },
      {
        color: '#1a1a1a',
        title: 'BrandVision',
        description: '3D Brand Experience - +180% Time on Site',
        label: 'BRANDING',
        image: '../images/Brandvision.svg'
      },
      {
        color: '#1a1a1a',
        title: 'CryptoTrade',
        description: 'Crypto Exchange - 100% Security Compliance',
        label: 'FINTECH',
        image: '../images/Cryptotrade.svg'
      },
      {
        color: '#1a1a1a',
        title: 'HealthCare+',
        description: 'Patient Management - -65% Load Time',
        label: 'HEALTHTECH',
        image: '../images/healthcare++.svg'
      },
      {
        color: '#1a1a1a',
        title: 'EcommerceMax',
        description: 'Retail Platform - $2.5M Revenue Impact',
        label: 'ECOMMERCE',
        image: '../images/company-logo-2.svg'
      },
      {
        color: '#1a1a1a',
        title: 'FinTech Pro',
        description: 'Payment Gateway - 99.9% Uptime',
        label: 'FINTECH',
        image: '../images/company-logo-3.svg'
      }
    ];

    this.spotlightElement = null;
    this.gridElement = null;
    this.isMobile = false;
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  createParticleElement(x, y) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(${this.glowColor}, 1);
      box-shadow: 0 0 6px rgba(${this.glowColor}, 0.6);
      pointer-events: none;
      z-index: 100;
      left: ${x}px;
      top: ${y}px;
    `;
    return el;
  }

  createSpotlight() {
    if (!this.enableSpotlight || this.isMobile) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${this.glowColor}, 0.15) 0%,
        rgba(${this.glowColor}, 0.08) 15%,
        rgba(${this.glowColor}, 0.04) 25%,
        rgba(${this.glowColor}, 0.02) 40%,
        rgba(${this.glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    this.spotlightElement = spotlight;
  }

  createCard(cardData, index) {
    const card = document.createElement('div');
    const baseClassName = `card ${this.textAutoHide ? 'card--text-autohide' : ''} ${this.enableBorderGlow ? 'card--border-glow' : ''}`;
    card.className = baseClassName;
    card.style.cssText = `
      background-color: ${cardData.color};
      --glow-color: ${this.glowColor};
    `;

    card.innerHTML = `
      <div class="card__header">
        <div class="card__label">${cardData.label}</div>
      </div>
      <div class="card__content">
        ${cardData.image ? `<div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; padding: 8px;"><img src="${cardData.image}" alt="${cardData.title} Logo" style="width: 44px; height: 44px; object-fit: contain;" /></div>` : ''}
        <h2 class="card__title">${cardData.title}</h2>
        <p class="card__description">${cardData.description}</p>
      </div>
    `;

    // Add event listeners
    this.addCardEvents(card);

    return card;
  }

  addCardEvents(card) {
    let particles = [];
    let timeouts = [];
    let magnetismAnimation = null;
    let lastMouseMove = 0;

    const clearParticles = () => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      if (magnetismAnimation) {
        magnetismAnimation.kill();
      }

      particles.forEach(particle => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }
        });
      });
      particles = [];
    };

    const animateParticles = () => {
      if (!this.enableStars || this.isMobile) return;

      const rect = card.getBoundingClientRect();
      for (let i = 0; i < this.particleCount; i++) {
        const timeoutId = setTimeout(() => {
          const particle = this.createParticleElement(
            Math.random() * rect.width,
            Math.random() * rect.height
          );
          card.appendChild(particle);
          particles.push(particle);

          gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true
          });

          gsap.to(particle, {
            opacity: 0.3,
            duration: 1.5,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true
          });
        }, i * 100);

        timeouts.push(timeoutId);
      }
    };

    card.addEventListener('mouseenter', () => {
      animateParticles();

      if (this.enableTilt) {
        gsap.to(card, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      clearParticles();

      if (this.enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (this.enableMagnetism) {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    card.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMouseMove < 32) return; // Throttle to ~30fps
      lastMouseMove = now;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (this.enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (this.enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimation = gsap.to(card, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    card.addEventListener('click', (e) => {
      if (!this.clickEffect || this.isMobile) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${this.glowColor}, 0.4) 0%, rgba(${this.glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      card.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    });
  }

  initSpotlightEvents() {
    if (!this.enableSpotlight || !this.spotlightElement || !this.gridElement) return;

    let lastMouseMove = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMove < 32) return; // Throttle to ~30fps
      lastMouseMove = now;

      const section = this.gridElement.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right &&
                         e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = this.gridElement.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(this.spotlightElement, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const proximity = this.spotlightRadius * 0.5;
      const fadeDistance = this.spotlightRadius * 0.75;
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) -
                        Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        card.style.setProperty('--glow-intensity', glowIntensity.toString());
        card.style.setProperty('--glow-radius', `${this.spotlightRadius}px`);
      });

      gsap.to(this.spotlightElement, {
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity = minDistance <= proximity ? 0.8 :
                           minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;

      gsap.to(this.spotlightElement, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'card-grid bento-section';
    this.gridElement = grid;

    // Create cards
    this.cardData.forEach((cardData, index) => {
      const card = this.createCard(cardData, index);
      grid.appendChild(card);
    });

    container.appendChild(grid);

    // Initialize spotlight
    this.createSpotlight();
    this.initSpotlightEvents();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.checkMobile();
    });
  }
}

// Make it globally available
window.MagicBento = MagicBento;