/**
 * Mobile menu functionality for Bioro website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the menu button and mobile menu elements
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle mobile menu when the menu button is clicked
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});