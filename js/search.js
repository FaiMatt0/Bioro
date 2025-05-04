document.addEventListener('DOMContentLoaded', function() {
    console.log('Search script loaded');
    
    // Find the search button - try both ID and class/tag fallback
    const searchButton = document.getElementById('search-button') || 
                          document.querySelector('a i.fa-search, a i.fas.fa-search').parentElement;
    
    if (!searchButton) {
        console.error('Search button not found');
        return;
    }
    
    console.log('Search button found:', searchButton);
    
    // Create the search popup with inline styles for more reliable display
    const searchPopup = document.createElement('div');
    searchPopup.id = 'search-popup';
    searchPopup.className = 'search-popup bg-white shadow-lg rounded-lg';
    
    // Apply explicit styling to ensure visibility when needed
    Object.assign(searchPopup.style, {
        position: 'absolute',
        top: '100%',
        right: '0',
        width: '320px',
        marginTop: '10px',
        padding: '16px',
        zIndex: '9999',
        display: 'none',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        background: 'white',
        border: '1px solid #eee'
    });
    
    searchPopup.innerHTML = `
        <div class="px-2 py-2 border-b border-gray-200 mb-3">
            <h3 class="font-bold text-dark text-lg">Cerca</h3>
        </div>
        
        <form id="search-form" class="mb-4">
            <div class="relative">
                <input type="text" id="search-input" placeholder="Cosa stai cercando?" 
                       class="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <button type="submit" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </form>
        
        <div class="mb-4">
            <p class="text-sm text-gray-500 mb-2">Categorie popolari:</p>
            <div class="flex flex-wrap gap-2">
                <a href="?search=bacche" class="px-3 py-1 bg-light text-primary rounded-full text-sm hover:bg-primary hover:text-white transition">Bacche</a>
                <a href="?search=caviale" class="px-3 py-1 bg-light text-primary rounded-full text-sm hover:bg-primary hover:text-white transition">Caviale</a>
                <a href="?search=polvere" class="px-3 py-1 bg-light text-primary rounded-full text-sm hover:bg-primary hover:text-white transition">Polvere</a>
                <a href="?search=kit" class="px-3 py-1 bg-light text-primary rounded-full text-sm hover:bg-primary hover:text-white transition">Kit regalo</a>
            </div>
        </div>
        
        <div id="recent-searches">
            <p class="text-sm text-gray-500 mb-2">Ricerche recenti:</p>
            <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center group">
                    <a href="?search=vaniglia%20bourbon" class="text-gray-700 hover:text-primary transition">
                        <i class="fas fa-history mr-2 text-gray-400"></i>
                        Vaniglia bourbon
                    </a>
                    <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center group">
                    <a href="?search=estratto" class="text-gray-700 hover:text-primary transition">
                        <i class="fas fa-history mr-2 text-gray-400"></i>
                        Estratto
                    </a>
                    <button class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Set up positioning for the parent container
    searchButton.parentElement.style.position = 'relative';
    document.body.appendChild(searchPopup); // Append to body to avoid containment issues
    
    // Position the popup correctly - this must happen after appending to DOM
    function positionPopup() {
        const buttonRect = searchButton.getBoundingClientRect();
        searchPopup.style.top = (buttonRect.bottom + window.scrollY) + 'px';
        searchPopup.style.right = (window.innerWidth - buttonRect.right) + 'px';
    }
    
    // Toggle popup when clicking the search button
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Search button clicked');
        
        const isVisible = searchPopup.style.display === 'block';
        console.log('Is popup visible?', isVisible);
        
        // Close any other popups first
        document.querySelectorAll('.popup-container, [id$="-popup"]').forEach(popup => {
            if (popup !== searchPopup) {
                popup.style.display = 'none';
                popup.classList.remove('scale-100');
            }
        });
        
        if (!isVisible) {
            // Position and show the popup
            positionPopup();
            searchPopup.style.display = 'block';
            
            // Focus the search input
            setTimeout(() => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.focus();
            }, 100);
        } else {
            // Hide the popup
            searchPopup.style.display = 'none';
        }
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (searchPopup.style.display === 'block' && 
            !searchButton.contains(e.target) && 
            !searchPopup.contains(e.target)) {
            searchPopup.style.display = 'none';
        }
    });
    
    // Handle window resize to reposition popup
    window.addEventListener('resize', function() {
        if (searchPopup.style.display === 'block') {
            positionPopup();
        }
    });
    
    // Handle search form submission
    const searchForm = searchPopup.querySelector('#search-form');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            console.log('Search submitted:', searchTerm);
            // Save to recent searches (implement with localStorage)
            saveRecentSearch(searchTerm);
            // Redirect to search results page
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
    
    // Function to save recent searches to localStorage
    function saveRecentSearch(term) {
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        
        // Add the new search term at the beginning
        recentSearches.unshift(term);
        
        // Remove duplicates
        recentSearches = [...new Set(recentSearches)];
        
        // Keep only the latest 5 searches
        recentSearches = recentSearches.slice(0, 5);
        
        // Save back to localStorage
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    
    // Handle removing a recent search
    searchPopup.querySelectorAll('#recent-searches button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const searchItem = this.parentElement;
            const searchText = searchItem.querySelector('a').textContent.trim();
            
            // Remove from localStorage
            let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            recentSearches = recentSearches.filter(term => term !== searchText);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            
            // Remove from DOM
            searchItem.remove();
        });
    });
    
    console.log('Search functionality initialized');
    
    // Debug helper - add a way to test popup display from console
    window.showSearchPopup = function() {
        positionPopup();
        searchPopup.style.display = 'block';
    };
});
