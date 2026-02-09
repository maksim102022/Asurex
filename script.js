// ===================================
// Hero Slider (Only on home page)
// ===================================
class HeroSlider {
    constructor() {
        const sliderElement = document.querySelector('.hero-slider');
        if (!sliderElement) return;
        
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Create dots
        this.createDots();
        
        // Event listeners for arrows
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => this.stopAutoPlay());
            heroSlider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        // Remove active class
        this.slides[this.currentSlide].classList.remove('active');
        const dots = document.querySelectorAll('.dot');
        if (dots[this.currentSlide]) {
            dots[this.currentSlide].classList.remove('active');
        }
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class
        this.slides[this.currentSlide].classList.add('active');
        if (dots[this.currentSlide]) {
            dots[this.currentSlide].classList.add('active');
        }
        
        // Reset animations
        this.resetSlideAnimations();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.slideInterval);
    }
    
    resetSlideAnimations() {
        const activeSlide = this.slides[this.currentSlide];
        const subtitle = activeSlide.querySelector('.subtitle');
        const title = activeSlide.querySelector('.title');
        const btn = activeSlide.querySelector('.hero-btn');
        
        [subtitle, title, btn].forEach(el => {
            if (el) {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 10);
            }
        });
    }
}

// ===================================
// Navigation
// ===================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        
        this.init();
    }
    
    init() {
        // Scroll event for navbar style (only on home page)
        if (document.body.classList.contains('page-about') || 
            document.body.classList.contains('page-services') ||
            document.body.classList.contains('page-works') ||
            document.body.classList.contains('page-news') ||
            document.body.classList.contains('page-contact')) {
            // Already solid on inner pages
        } else {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            });
        }
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.animateToggleIcon();
            });
        }
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.resetToggleIcon();
            });
        });
    }
    
    animateToggleIcon() {
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            this.resetToggleIcon();
        }
    }
    
    resetToggleIcon() {
        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Get all elements with data-scroll attribute
        this.elements = document.querySelectorAll('[data-scroll]');
        
        if (this.elements.length === 0) return;
        
        // Observe elements
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ===================================
// Counter Animation
// ===================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number, .fact-number');
        this.animated = false;
        this.init();
    }
    
    init() {
        if (this.counters.length === 0) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animated) {
                        this.animateCounters();
                        this.animated = true;
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        const sections = document.querySelectorAll('.stats-section, .facts-section');
        sections.forEach(section => {
            if (section) observer.observe(section);
        });
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// ===================================
// Form Handling
// ===================================
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.newsletterForm = document.querySelector('.newsletter-form');
        
        this.init();
    }
    
    init() {
        // Contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(this.contactForm);
                console.log('Contact form submitted:', Object.fromEntries(formData));
                this.showMessage('Thank you for your message! We will get back to you soon.');
                this.contactForm.reset();
            });
        }
        
        // Newsletter form
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = this.newsletterForm.querySelector('input[type="email"]').value;
                console.log('Newsletter subscription:', email);
                this.showMessage('Thank you for subscribing to our newsletter!');
                this.newsletterForm.reset();
            });
        }
    }
    
    showMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 40px;
            background: var(--color-accent);
            color: var(--color-bg);
            padding: 20px 30px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                messageEl.remove();
            }, 500);
        }, 3000);
    }
}

// ===================================
// Cursor Effect (Optional Enhancement)
// ===================================


// ===================================
// Parallax Effect (Home page)
// ===================================
class ParallaxEffect {
    constructor() {
        const heroSlider = document.querySelector('.hero-slider');
        if (!heroSlider) return;
        
        this.init();
    }
    
    init() {
        const parallaxElements = document.querySelectorAll('.slide-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const parent = element.closest('.slide');
                if (parent && parent.classList.contains('active')) {
                    const speed = 0.5;
                    element.style.transform = `scale(1.1) translateY(${scrolled * speed}px)`;
                }
            });
        });
    }
}

// ===================================
// Page Transition Effect
// ===================================
class PageTransition {
    constructor() {
        this.init();
    }
    
    init() {
        // Fade in on page load
        document.body.style.opacity = '0';
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    }
}

// ===================================
// Active Page Indicator
// ===================================
class ActivePageIndicator {
    constructor() {
        this.init();
    }
    
    init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new Navigation();
    new ScrollAnimations();
    new CounterAnimation();
    new FormHandler();
    new CursorEffect();
    new ParallaxEffect();
    new PageTransition();
    new ActivePageIndicator();
    
    // Console message
    console.log('%c🎨 Creative Agency Website', 'font-size: 20px; font-weight: bold; color: #c9a05f;');
    console.log('%cMulti-page version with beautiful design', 'font-size: 14px; color: #999;');
});

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
