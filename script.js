// Hero Slider Configuration
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.hero-indicator');
const totalSlides = slides.length;
let slideInterval;

// Initialize slider
function initSlider() {
    showSlide(currentSlide);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// Change slide (next/prev)
function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
    resetAutoSlide();
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide();
}

// Auto slide every 5 seconds
function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}


function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');

    // 🔴 ADD THIS LINE
    document.body.classList.toggle('menu-open');

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}


// Scroll to Top Button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScrollButton() {
    const scrollTop = document.querySelector('.scroll-top');

    // ⛔ Stop if menu is open
    if (document.body.classList.contains('menu-open')) return;

    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
}


// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.collection-card, .service-card, .why-card, .testimonial-card, .about-feature'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Handle Window Resize
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 968) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Event Listeners
    window.addEventListener('scroll', handleScrollButton);
    window.addEventListener('resize', handleResize);
    
    // Pause slider on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
    hero.addEventListener('mouseleave', startAutoSlide);
});

// Prevent scrolling issues on mobile Safari
document.addEventListener('touchmove', function(e) {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });