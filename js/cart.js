document.addEventListener('DOMContentLoaded', function() {
    // Find the cart icon
    const cartIcon = document.querySelector('a[href="cart.html"].hover\\:text-secondary');
    
    // Sample cart data - this would come from localStorage or a cart API in a real app
    let cartItems = [
        { id: 1, name: 'Bacche di Vaniglia Bourbon', price: 24.90, quantity: 2, img: 'images/prodotto 1.jpg' },
        { id: 2, name: 'Caviale di Vaniglia Bourbon', price: 32.90, quantity: 1, img: 'images/prodotto 2.png' }
    ];
    
    // Update cart count badge
    function updateCartCount() {
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const countElement = cartIcon.querySelector('span');
        countElement.textContent = cartCount;
        
        // Add animation
        countElement.classList.add('cart-badge-animate');
        setTimeout(() => {
            countElement.classList.remove('cart-badge-animate');
        }, 500);
    }
    
    // Calculate total cart value
    function getCartTotal() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }
    
    // Create popup HTML
    function createCartPopup() {
        // Remove existing popup if any
        const existingPopup = document.querySelector('.cart-popup');
        if (existingPopup) existingPopup.remove();
        
        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'cart-popup popup-container bg-white shadow-lg rounded-lg absolute right-0 mt-2 z-50 py-4 px-2';
        popup.style.top = '100%';
        
        let popupHTML = `
            <div class="px-4 py-3 border-b border-gray-200">
                <h3 class="font-bold text-dark text-lg">Il Tuo Carrello</h3>
            </div>
        `;
        
        // Empty cart
        if (cartItems.length === 0) {
            popupHTML += `
                <div class="py-8 text-center">
                    <div class="text-gray-400 text-4xl mb-3">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <p class="text-gray-600">Il tuo carrello è vuoto</p>
                    <a href="products.html" class="text-primary hover:underline text-sm mt-2 inline-block">
                        Sfoglia i prodotti
                    </a>
                </div>
            `;
        } else {
            // Cart items
            popupHTML += `<div class="overflow-y-auto max-h-64">`;
            
            cartItems.forEach(item => {
                popupHTML += `
                    <div class="cart-item flex items-center py-3 px-4 border-b border-gray-100">
                        <div class="w-12 h-12 rounded overflow-hidden mr-4">
                            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-grow">
                            <h4 class="text-sm font-medium">${item.name}</h4>
                            <div class="flex items-center justify-between mt-1">
                                <div class="flex items-center">
                                    <button class="cart-quantity-decrease text-xs w-5 h-5 bg-gray-100 rounded" data-id="${item.id}">-</button>
                                    <span class="cart-quantity mx-2 text-sm">${item.quantity}</span>
                                    <button class="cart-quantity-increase text-xs w-5 h-5 bg-gray-100 rounded" data-id="${item.id}">+</button>
                                </div>
                                <div class="text-primary font-medium">€${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                        <button class="cart-item-remove ml-2 text-gray-400 hover:text-red-500" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            });
            
            popupHTML += `</div>`;
            
            // Cart total and checkout button
            popupHTML += `
                <div class="px-4 pt-4 pb-2 border-t border-gray-200 mt-2">
                    <div class="flex justify-between items-center mb-4">
                        <span class="font-medium">Totale</span>
                        <span class="text-primary font-bold">€${getCartTotal()}</span>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <a href="cart.html" class="bg-primary hover:bg-dark text-white py-2 px-4 rounded-full text-sm font-medium transition text-center">
                            Visualizza Carrello
                        </a>
                        <a href="checkout.html" class="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-full text-sm font-medium transition text-center">
                            Procedi all'Acquisto
                        </a>
                    </div>
                </div>
            `;
        }
        
        popup.innerHTML = popupHTML;
        
        // Add event listeners for cart item actions
        setTimeout(() => {
            // Remove item buttons
            const removeButtons = popup.querySelectorAll('.cart-item-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    cartItems = cartItems.filter(item => item.id !== itemId);
                    updateCartCount();
                    createCartPopup(); // Recreate the popup with updated items
                });
            });
            
            // Quantity increase buttons
            const increaseButtons = popup.querySelectorAll('.cart-quantity-increase');
            increaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    const item = cartItems.find(item => item.id === itemId);
                    if (item) {
                        item.quantity++;
                        updateCartCount();
                        createCartPopup();
                    }
                });
            });
            
            // Quantity decrease buttons
            const decreaseButtons = popup.querySelectorAll('.cart-quantity-decrease');
            decreaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    const item = cartItems.find(item => item.id === itemId);
                    if (item && item.quantity > 1) {
                        item.quantity--;
                        updateCartCount();
                        createCartPopup();
                    }
                });
            });
        }, 100);
        
        return popup;
    }
    
    // Set up cart functionality
    function initCart() {
        // Remove default href behavior
        cartIcon.setAttribute('href', 'javascript:void(0)');
        
        // Add positioning to the parent element
        cartIcon.parentElement.style.position = 'relative';
        
        // Create and add the popup
        const popup = createCartPopup();
        cartIcon.parentElement.appendChild(popup);
        
        // Toggle popup when clicking on the cart icon
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            popup.classList.toggle('scale-100');
            
            // Close account popup if open
            const accountPopup = document.querySelector('.account-popup');
            if (accountPopup && accountPopup.classList.contains('scale-100')) {
                accountPopup.classList.remove('scale-100');
            }
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartIcon.contains(e.target) && !popup.contains(e.target)) {
                popup.classList.remove('scale-100');
            }
        });
        
        // Update cart count initially
        updateCartCount();
    }
    
    // Initialize cart
    if (cartIcon) {
        initCart();
    }
});