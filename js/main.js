// =========================================
// AI JOB SEARCH SUPPORT - SCRIPT.JS
// Hochschule Wismar Business Faculty
// Master International Management Project
// =========================================

(function() {
  'use strict';

  // =========================================
  // 1. CLICK FIX - Ensure page is always clickable
  // =========================================
  function enableClicks() {
    document.documentElement.style.pointerEvents = "auto";
    document.body.style.pointerEvents = "auto";

    // Remove any overlay elements that might block clicks
    const overlaySelectors = [
      ".overlay", ".loader", ".loading", ".backdrop", 
      ".modal-backdrop", "#overlay", "#loading", "#loadingDiv"
    ];

    overlaySelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.style.pointerEvents = "none";
        // If it's a loader, hide it
        if (element.classList.contains("loader") || 
            element.id === "loading" || 
            element.id === "loadingDiv") {
          element.style.display = "none";
        }
      });
    });
  }

  // Run on DOMContentLoaded and window.load
  document.addEventListener("DOMContentLoaded", enableClicks);
  window.addEventListener("load", enableClicks);


  // =========================================
  // 2. ACTIVE NAVIGATION HIGHLIGHTING
  // =========================================
  function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      if (linkHref) {
        const linkPage = linkHref.replace("./", "");
        
        // Remove active class from all
        link.classList.remove("active");
        
        // Add active class to current page
        if (linkPage === currentPage || 
            (currentPage === "" && linkPage === "index.html")) {
          link.classList.add("active");
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setActiveNavigation);


  // =========================================
  // 3. ACCORDION LOGIC (for FAQs, Tools sections)
  // =========================================
  function initAccordions() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach(header => {
      header.addEventListener("click", function() {
        const content = this.nextElementSibling;
        
        // Check if this accordion is currently open
        const isOpen = content.classList.contains("active");
        
        // Close all accordions in the same parent container
        const parentCard = this.closest(".card");
        if (parentCard) {
          parentCard.querySelectorAll(".accordion-content").forEach(item => {
            item.classList.remove("active");
          });
        }
        
        // Toggle current accordion (open if it was closed)
        if (!isOpen) {
          content.classList.add("active");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initAccordions);


  // =========================================
  // 4. SMOOTH SCROLL TO ANCHOR LINKS
  // =========================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        
        // Skip if it's just "#" (empty anchor)
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initSmoothScroll);


  // =========================================
  // 5. MOBILE MENU TOGGLE (if you add hamburger later)
  // =========================================
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    
    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", function() {
        mobileNav.classList.toggle("active");
        hamburger.classList.toggle("active");
      });

      // Close mobile menu when clicking a link
      const mobileLinks = mobileNav.querySelectorAll(".nav-link");
      mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
          mobileNav.classList.remove("active");
          hamburger.classList.remove("active");
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initMobileMenu);


  // =========================================
  // 6. FORM SUBMISSION HANDLER (for Contact Page)
  // =========================================
  function initContactForm() {
    const contactForm = document.querySelector("form[action*='web3forms']");
    
    if (contactForm) {
      contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
        
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
              "Accept": "application/json"
            }
          });
          
          if (response.ok) {
            alert("✅ Message sent successfully! We'll get back to you soon.");
            contactForm.reset();
          } else {
            throw new Error("Form submission failed");
          }
        } catch (error) {
          alert("❌ There was an error sending your message. Please try again or email us directly.");
          console.error("Form submission error:", error);
        } finally {
          // Reset button state
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initContactForm);


  // =========================================
  // 7. SCROLL TO TOP BUTTON (Optional Enhancement)
  // =========================================
  function initScrollToTop() {
    const scrollButton = document.getElementById("scroll-to-top");
    
    if (scrollButton) {
      // Show/hide button based on scroll position
      window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
          scrollButton.style.display = "block";
        } else {
          scrollButton.style.display = "none";
        }
      });
      
      // Scroll to top when clicked
      scrollButton.addEventListener("click", function() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initScrollToTop);


  // =========================================
  // 8. EXTERNAL LINK WARNING (Optional Security)
  // =========================================
  function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
      // Add security attributes
      if (!link.hasAttribute("rel")) {
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initExternalLinks);


  // =========================================
  // CONSOLE CONFIRMATION
  // =========================================
  console.log("✅ AI Job Search Support - JavaScript Loaded Successfully");
  console.log("🎓 Hochschule Wismar Business Faculty | Master International Management");
  console.log("📅 2026");

})();
