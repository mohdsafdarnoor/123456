// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && menuBtn) {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('active');
        }
    }
});

// Accordion functionality for Prompts page
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
}

// FIXED: Search functionality for Tools page
function initToolsSearch() {
    const searchInput = document.getElementById('toolsSearch');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const toolCards = document.querySelectorAll('.tool-card');
            let visibleCount = 0;
            
            // If search is empty, show all tools
            if (searchTerm === '') {
                toolCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Search through each tool card
            toolCards.forEach(card => {
                const toolName = card.querySelector('.tool-name');
                const toolDescription = card.querySelector('.tool-description');
                const toolBadge = card.querySelector('.tool-badge');
                
                // Get text content safely
                const nameText = toolName ? toolName.textContent.toLowerCase() : '';
                const descText = toolDescription ? toolDescription.textContent.toLowerCase() : '';
                const badgeText = toolBadge ? toolBadge.textContent.toLowerCase() : '';
                
                // Check if search term matches
                if (nameText.includes(searchTerm) || 
                    descText.includes(searchTerm) || 
                    badgeText.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Optional: Show "no results" message
            console.log(`Found ${visibleCount} tools matching "${searchTerm}"`);
        });
        
        // Clear search on Escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('keyup'));
            }
        });
    }
}

// Smooth scroll to sections
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        const menuBtn = document.querySelector('.mobile-menu-btn');
                        if (menuBtn) menuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    initToolsSearch();
    initSmoothScroll();
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScroll = currentScroll;
});
