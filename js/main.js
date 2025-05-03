// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for sustainability page
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Intersection Observer for counter animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelector('.counter')) {
                animateCounters();
            }
        }
    });
}, {threshold: 0.1});

// Enhanced Intersection Observer for all animations
document.addEventListener('DOMContentLoaded', function() {
    // Highlight animation when elements come into view
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {threshold: 0.3});
    
    // Reveal animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {threshold: 0.1});

    // Apply observers to elements
    document.querySelectorAll('.highlight-text').forEach(el => {
        highlightObserver.observe(el);
    });
    
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
    
    document.querySelectorAll('.counter-container').forEach(el => {
        observer.observe(el);
    });
});

// Initialize observers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.counter-container').forEach(el => {
        observer.observe(el);
    });
});

// Simple page routing simulation
function showPage(pageId) {
    document.querySelectorAll('main > div').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Check URL hash on load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash === 'product') {
        showPage('product-detail-content');
    } else if (hash === 'sustainability') {
        showPage('sustainability-content');
    }
});
