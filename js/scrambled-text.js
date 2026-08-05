// Vanilla JavaScript Scramble Text Effect for Footer Links
class ScrambledText {
  constructor(options = {}) {
    this.radius = options.radius || 100;
    this.duration = options.duration || 1.2;
    this.speed = options.speed || 0.5;
    this.scrambleChars = options.scrambleChars || '.:';
    this.container = options.container;
    this.chars = [];
    this.originalTexts = [];
    this.isAnimating = false;

    if (this.container) {
      this.init();
    }
  }

  init() {
    // Get all links in the container
    const links = this.container.querySelectorAll('a');
    links.forEach(link => {
      const originalText = link.textContent;
      this.originalTexts.push(originalText);

      // Split text into individual characters
      const chars = originalText.split('');
      link.innerHTML = '';

      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'scramble-char';
        span.dataset.original = char;
        link.appendChild(span);
        this.chars.push(span);
      });
    });

    this.bindEvents();
  }

  bindEvents() {
    let lastMove = 0;
    let rafId = null;
    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastMove < 32 || this.isAnimating) return; // Throttle to ~30fps
      lastMove = now;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        this.chars.forEach(char => {
          const rect = char.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.hypot(dx, dy);

          if (dist < this.radius) {
            this.scrambleChar(char, dist);
          }
        });
      });
    };

    this.container.addEventListener('pointermove', handleMove);
  }

  scrambleChar(char, distance) {
    if (this.isAnimating) return;

    const originalChar = char.dataset.original;
    const scrambleDuration = this.duration * (1 - distance / this.radius);

    this.isAnimating = true;

    // Create scramble animation
    let scrambleCount = 0;
    const maxScrambles = Math.floor(scrambleDuration * 30); // 30 FPS

    const scrambleInterval = setInterval(() => {
      if (scrambleCount < maxScrambles) {
        char.textContent = this.getRandomChar();
        scrambleCount++;
      } else {
        clearInterval(scrambleInterval);
        char.textContent = originalChar;
        this.isAnimating = false;
      }
    }, 1000 / 30); // 30 FPS
  }

  getRandomChar() {
    const chars = this.scrambleChars.split('');
    return chars[Math.floor(Math.random() * chars.length)];
  }

  // Static method to initialize on multiple containers
  static initAll(selector, options = {}) {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
      new ScrambledText({
        container,
        ...options
      });
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scramble text on footer links
  ScrambledText.initAll('.footer-links', {
    radius: 80,
    duration: 1.0,
    speed: 0.3,
    scrambleChars: '.:'
  });
});