console.log('Attempting to register Service Worker...');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and functionality
    initTypingAnimation();
    initCounterAnimation();
    initSmoothScrolling();
    initFormValidation();
    initCodeSyntaxHighlighting();
    initScrollAnimations();
    initTerminalInteractions();
    initMobileNavigation();
});

// Typing Animation
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typewriter');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(() => initCounterAnimation(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const scroll = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true,
        offset: 80
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form Validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = form.querySelector('input[type="text"]');
            const email = form.querySelector('input[type="email"]');
            const message = form.querySelector('textarea');
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission(form);
            }
        });
    }
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#ff6b6b';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    error.style.fontFamily = 'Fira Code, monospace';
    error.textContent = message;
    
    input.parentNode.appendChild(error);
    input.style.borderColor = '#ff6b6b';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateFormSubmission(form) {
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.background = '#00ff88';
        successMessage.style.color = '#0a0a0a';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '8px';
        successMessage.style.marginTop = '20px';
        successMessage.style.fontFamily = 'Fira Code, monospace';
        successMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        
        form.appendChild(successMessage);
        
        // Reset form
        form.reset();
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 2000);
}

// Code Syntax Highlighting
function initCodeSyntaxHighlighting() {
    const codeElement = document.querySelector('.javascript');
    if (codeElement) {
        const code = codeElement.textContent;
        const highlightedCode = highlightJavaScript(code);
        codeElement.innerHTML = highlightedCode;
    }
}

function highlightJavaScript(code) {
    // Simple JavaScript syntax highlighting
    return code
        .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
        .replace(/\b(function|return|const|let|var|if|else|for|while|console|log)\b/g, '<span class="keyword">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="string">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card, .stat').forEach(el => {
        observer.observe(el);
    });
}

// Terminal Interactions
function initTerminalInteractions() {
    const terminalControls = document.querySelectorAll('.control');
    
    terminalControls.forEach(control => {
        control.addEventListener('click', function() {
            const color = this.className.split(' ')[1];
            handleTerminalControl(color);
        });
    });
}

function handleTerminalControl(color) {
    switch(color) {
        case 'red':
            // Close/minimize effect
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 300);
            break;
        case 'yellow':
            // Minimize effect (scroll to top)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'green':
            // Maximize effect (scroll to bottom)
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
    }
}

// Theme Toggle (Optional - can be added later)
function initThemeToggle() {
    // This can be implemented to switch between light/dark themes
    console.log('Theme toggle ready to be implemented');
}

// Particle Effect for Background (Optional)
function initParticles() {
    // This can be implemented for a more interactive background
    console.log('Particles ready to be implemented');
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Cmd/Ctrl + K to focus on search (could be implemented later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut pressed');
    }
    
    // Escape to clear any modals or overlays
    if (e.key === 'Escape') {
        console.log('Escape pressed');
    }
});

// Mobile Navigation
function initMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileNavToggle && mobileNav) {
        // Toggle mobile navigation
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Update toggle button text
            mobileNavToggle.textContent = isExpanded ? '☰' : '✕';
        });
        
        // Close mobile nav when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.textContent = '☰';
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileNav.classList.contains('active') && 
                !mobileNav.contains(e.target) && 
                !mobileNavToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.textContent = '☰';
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.textContent = '☰';
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// Responsive Navigation (for future mobile menu)
function initMobileMenu() {
    // This can be implemented when adding a mobile navigation menu
    console.log('Mobile menu ready to be implemented');
}

// Performance optimization - Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });

        images.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
        console.error('Service Worker registration failed:', error);
    });

// Export functions for global access (if needed)
window.scrollToSection = scrollToSection;
