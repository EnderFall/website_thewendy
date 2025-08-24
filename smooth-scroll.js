/**
 * SmoothScroll - A lightweight smooth scrolling script
 * Minimal implementation for portfolio website
 */

class SmoothScroll {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.options = {
            speed: 800,
            speedAsDuration: true,
            offset: 0,
            ...options
        };
        
        this.init();
    }
    
    init() {
        const links = document.querySelectorAll(this.selector);
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        this.scrollToElement(targetElement);
                    }
                } else {
                    // External link, let it behave normally
                    window.location.href = targetId;
                }
            });
        });
    }
    
    scrollToElement(element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - this.options.offset;
        const duration = this.options.speedAsDuration ? this.options.speed : Math.abs(distance) / this.options.speed * 1000;
        
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation.bind(this));
        }
        
        requestAnimationFrame(animation.bind(this));
    }
    
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Initialize automatically if selector is provided
if (typeof window !== 'undefined') {
    window.SmoothScroll = SmoothScroll;
}
