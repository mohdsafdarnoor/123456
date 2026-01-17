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
    if (!accordions.length) return;

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

// Enhanced Search functionality with autocomplete for Tools page
function initToolsSearch() {
    const searchInput = document.getElementById('toolsSearch');
    const clearBtn = document.getElementById('searchClear');
    const suggestionsBox = document.getElementById('searchSuggestions');

    if (!searchInput) return;

    // Get all tool data for suggestions
    const allTools = [];
    document.querySelectorAll('.tool-card').forEach(card => {
        const name = card.querySelector('.tool-name')?.textContent || '';
        const description = card.querySelector('.tool-description')?.textContent || '';
        const badge = card.querySelector('.tool-badge')?.textContent || '';

        allTools.push({
            element: card,
            name: name,
            description: description,
            badge: badge,
            searchText: `${name} ${description} ${badge}`.toLowerCase()
        });
    });

    // Search input handler
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        // Show/hide clear button
        if (clearBtn) {
            clearBtn.classList.toggle('active', searchTerm.length > 0);
        }

        // If empty, show all and hide suggestions
        if (searchTerm === '') {
            allTools.forEach(tool => tool.element.style.display = 'block');
            if (suggestionsBox) suggestionsBox.classList.remove('active');
            return;
        }

        // Filter tools
        const suggestions = [];

        allTools.forEach(tool => {
            if (tool.searchText.includes(searchTerm)) {
                tool.element.style.display = 'block';

                // Add to suggestions (limit to 5)
                if (suggestions.length < 5) {
                    suggestions.push(tool.name);
                }
            } else {
                tool.element.style.display = 'none';
            }
        });

        // Show suggestions
        if (suggestionsBox && suggestions.length > 0 && searchTerm.length > 1) {
            suggestionsBox.innerHTML = '';
            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';

                // Highlight matching text
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                item.innerHTML = suggestion.replace(regex, '<strong>$1</strong>');

                item.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    searchInput.dispatchEvent(new Event('input'));
                    suggestionsBox.classList.remove('active');
                });

                suggestionsBox.appendChild(item);
            });
            suggestionsBox.classList.add('active');
        } else if (suggestionsBox) {
            suggestionsBox.classList.remove('active');
        }
    });

    // Clear button handler
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });
    }

    // Clear search on Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (suggestionsBox && !searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.classList.remove('active');
        }
    });
}

// Smooth scroll to sections
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) return;

    anchors.forEach(anchor => {
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

// FAQ Toggle functionality
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===============================
// Tools Page: Category -> Phase accordion (nested <details>)
// Uses the "toggle" event fired by <details> when opened/closed. [web:60]
// ===============================
function initToolsNestedAccordion() {
    const categories = document.querySelectorAll('details[data-group="categories"]');
    const phases = document.querySelectorAll('details[data-group="phases"]');

    // If the Tools page doesn't have these <details>, do nothing
    if (!categories.length) return;

    // Only one category open at a time
    categories.forEach((d) => {
        d.addEventListener("toggle", () => {
            if (!d.open) return;

            categories.forEach((other) => {
                if (other !== d) other.removeAttribute("open");
            });

            // Close phases in other categories
            phases.forEach((p) => {
                if (!d.contains(p)) p.removeAttribute("open");
            });
        });
    });

    // Only one phase open inside the open category
    phases.forEach((p) => {
        p.addEventListener("toggle", () => {
            if (!p.open) return;

            const category = p.closest('details[data-group="categories"]');
            if (!category) return;

            category.querySelectorAll('details[data-group="phases"]').forEach((other) => {
                if (other !== p) other.removeAttribute("open");
            });
        });
    });
}

// Initialize on page load (KEEP ONLY ONE DOMContentLoaded) [web:57]
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    initToolsSearch();
    initSmoothScroll();
    initFAQs();
    initToolsNestedAccordion();

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
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }

    lastScroll = currentScroll;
});
