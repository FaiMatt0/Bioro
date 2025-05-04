document.addEventListener('DOMContentLoaded', function() {
    // Find the account icon
    const accountIcon = document.querySelector('a[href="#"].hover\\:text-secondary i.fas.fa-user').parentElement;
    
    // Remove the default href behavior
    accountIcon.setAttribute('href', 'javascript:void(0)');
    
    // Create popup HTML
    const popup = document.createElement('div');
    popup.className = 'account-popup bg-white shadow-lg rounded-lg absolute right-0 mt-2 w-64 py-2 px-4 z-50 transform scale-0 origin-top-right transition-transform duration-200';
    popup.style.top = '100%';
    popup.innerHTML = `
        <div class="py-3 border-b border-gray-200">
            <h3 class="font-bold text-dark text-lg">Account</h3>
        </div>
        <div class="py-3" id="account-not-logged-in">
            <p class="text-gray-600 mb-3">Accedi o registrati per continuare</p>
            <div class="flex flex-col space-y-2">
                <button class="bg-primary hover:bg-dark text-white py-2 px-4 rounded-full text-sm font-medium transition">
                    Accedi
                </button>
                <button class="border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-full text-sm font-medium transition">
                    Registrati
                </button>
            </div>
        </div>
        <div class="py-3 hidden" id="account-logged-in">
            <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <i class="fas fa-user text-gray-500"></i>
                </div>
                <div>
                    <p class="font-medium text-dark">Nome Utente</p>
                    <p class="text-sm text-gray-500">email@esempio.com</p>
                </div>
            </div>
            <div class="space-y-2">
                <a href="#" class="block text-gray-600 hover:text-primary transition py-1">
                    <i class="fas fa-user-circle mr-2"></i> Il mio profilo
                </a>
                <a href="#" class="block text-gray-600 hover:text-primary transition py-1">
                    <i class="fas fa-shopping-bag mr-2"></i> I miei ordini
                </a>
                <a href="#" class="block text-gray-600 hover:text-primary transition py-1">
                    <i class="fas fa-heart mr-2"></i> Preferiti
                </a>
                <a href="#" class="block text-gray-600 hover:text-primary transition py-1">
                    <i class="fas fa-cog mr-2"></i> Impostazioni
                </a>
                <div class="border-t border-gray-200 pt-2 mt-2">
                    <a href="#" class="block text-gray-600 hover:text-red-500 transition py-1">
                        <i class="fas fa-sign-out-alt mr-2"></i> Esci
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add positioning to the parent element
    accountIcon.parentElement.style.position = 'relative';
    accountIcon.parentElement.appendChild(popup);
    
    // Toggle popup when clicking on the account icon
    accountIcon.addEventListener('click', function(e) {
        e.preventDefault();
        popup.classList.toggle('scale-0');
        popup.classList.toggle('scale-100');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountIcon.contains(e.target) && !popup.contains(e.target)) {
            popup.classList.add('scale-0');
            popup.classList.remove('scale-100');
        }
    });
});