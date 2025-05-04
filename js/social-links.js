document.addEventListener('DOMContentLoaded', function() {
    // Get all social media links with more comprehensive selectors to include contact page buttons
    const socialLinks = document.querySelectorAll([
        // Standard social links
        'a[href^="https://www.facebook.com"]', 
        'a[href^="https://twitter.com"]', 
        'a[href^="https://www.instagram.com"]', 
        'a[href^="https://www.pinterest.com"]', 
        'a[href^="https://www.linkedin.com"]',
        // Links with # href and social icon classes
        'a[href="#"] .fab.fa-facebook-f',
        'a[href="#"] .fab.fa-twitter',
        'a[href="#"] .fab.fa-instagram',
        'a[href="#"] .fab.fa-pinterest-p',
        'a[href="#"] .fab.fa-linkedin-in',
        // Direct parent-child relationship
        'a[href="#"] i.fab',
        // Contact page specific rounded button style social links
        '.flex.space-x-4 a.rounded-full i.fab',
        // Any other social links by class or parent container
        '.social a', 
        'a.social',
        'footer a[href="#"]',
        '.mt-8 .flex.space-x-4 a'
    ].join(', '));
    
    // Add click event listener to each social link
    socialLinks.forEach(link => {
        // If the link is the icon itself, get its parent anchor
        const element = link.tagName === 'I' ? link.closest('a') : link;
        
        if (element && element.tagName === 'A') {
            element.addEventListener('click', function(event) {
                // Prevent the default link behavior
                event.preventDefault();
                
                // Redirect to the work-in-progress page
                window.location.href = 'wip.html';
            });
        }
    });
    
    // Also target direct social buttons in contact page
    const contactSocialButtons = document.querySelectorAll('.mt-8 .flex.space-x-4 a');
    contactSocialButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'wip.html';
        });
    });
    
    console.log('Social links redirects activated. Found links:', socialLinks.length);
});
