/**
 * LogoLoop Component
 * A smooth logo rotation component that cycles through multiple logos
 */

class LogoLoop {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            logos: options.logos || [],
            interval: options.interval || 3000,
            transitionDuration: options.transitionDuration || 500,
            size: options.size || 32,
            ...options
        };

        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        // Create the logo element
        this.logoElement = document.createElement('img');
        this.logoElement.className = 'tech-icon-simple';
        this.logoElement.style.width = `${this.options.size}px`;
        this.logoElement.style.height = `${this.options.size}px`;
        this.logoElement.style.transition = `opacity ${this.options.transitionDuration}ms ease-in-out`;
        this.logoElement.style.objectFit = 'contain';
        this.logoElement.style.borderRadius = '6px';
        this.logoElement.style.background = 'rgba(255, 255, 255, 0.05)';
        this.logoElement.style.backdropFilter = 'blur(8px)';
        this.logoElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        this.logoElement.style.padding = '4px';

        // Clear container and add logo element
        this.container.innerHTML = '';
        this.container.appendChild(this.logoElement);

        // Start the loop if logos are provided
        if (this.options.logos.length > 0) {
            this.startLoop();
        }
    }

    updateLogo() {
        if (this.isAnimating || this.options.logos.length === 0) return;

        this.isAnimating = true;

        // Fade out
        this.logoElement.style.opacity = '0';

        setTimeout(() => {
            // Update logo
            this.logoElement.src = this.options.logos[this.currentIndex];
            this.logoElement.alt = `Logo ${this.currentIndex + 1}`;

            // Fade in
            this.logoElement.style.opacity = '1';

            // Move to next logo
            this.currentIndex = (this.currentIndex + 1) % this.options.logos.length;

            // Reset animation flag
            setTimeout(() => {
                this.isAnimating = false;
            }, this.options.transitionDuration);
        }, this.options.transitionDuration / 2);
    }

    startLoop() {
        // Show first logo immediately
        this.updateLogo();

        // Start interval
        this.intervalId = setInterval(() => {
            this.updateLogo();
        }, this.options.interval);
    }

    stopLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    updateLogos(newLogos) {
        this.options.logos = newLogos;
        this.currentIndex = 0;
        this.updateLogo();
    }

    destroy() {
        this.stopLoop();
        if (this.logoElement && this.logoElement.parentNode) {
            this.logoElement.parentNode.removeChild(this.logoElement);
        }
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoLoop;
} else if (typeof window !== 'undefined') {
    window.LogoLoop = LogoLoop;
}