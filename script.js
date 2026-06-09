/**
 * Pineal Studio - Core Dynamic Systems
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyNavbar();
    initMobileMenu();
    initScrollReveal();
    initCursorAmbient();
});

/**
 * 1. Sticky Navigation Performance Implementation
 */
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Passive listener improves scrolling frame rates
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Mobile Menu Navigation Engine
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const items = document.querySelectorAll('.nav-item');

    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Automatically dismiss menu on option selection
    items.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/**
 * 3. Cursor Ambient Light Effect
 */
function initCursorAmbient() {
    const orb = document.createElement('div');
    orb.classList.add('cursor-ambient');
    document.body.appendChild(orb);

    let x = 0, y = 0;
    let hideTimer = null;
    let rafId = null;

    const move = (e) => {
        x = e.clientX;
        y = e.clientY;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            orb.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
        });

        orb.classList.add('visible');

        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            orb.classList.remove('visible');
        }, 300);
    };

    window.addEventListener('mousemove', move, { passive: true });
}

/**
 * 4. High-Performance Intersection Observer for Scroll Reveals
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}
