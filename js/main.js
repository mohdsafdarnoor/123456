// ============================================================
// HS WISMAR - AI JOB SEARCH SUPPORT
// Main JavaScript File
// ============================================================

(function () {
  'use strict';
  console.log("✅ HS Wismar JS Loaded");

  // 1. MOBILE HAMBURGER MENU (FIXED)
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    if (hamburger && mobileNav) {
      console.log("✅ Hamburger element found"); // Debug check

      hamburger.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevents clicks from closing immediately
        mobileNav.classList.toggle("active");
        
        // Toggle Icon
        if (mobileNav.classList.contains("active")) {
          hamburger.innerHTML = "✕"; // Close icon
        } else {
          hamburger.innerHTML = "☰"; // Menu icon
        }
      });

      // Close menu when clicking ANY link inside it
      mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("active");
          hamburger.innerHTML = "☰";
        });
      });

      // Close menu when clicking OUTSIDE of it
      document.addEventListener("click", function(event) {
        const isClickInside = mobileNav.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside && mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          hamburger.innerHTML = "☰";
        }
      });
    } else {
      console.error("❌ Hamburger or Mobile Nav not found!");
    }
  }
  
  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileMenu);
  } else {
    initMobileMenu();
  }


  // 2. ACCORDION LOGIC
  function initAccordions() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
      header.removeEventListener("click", toggleAccordion); // Prevent duplicates
      header.addEventListener("click", toggleAccordion);
    });
  }

  function toggleAccordion(e) {
    const header = e.currentTarget;
    const content = header.nextElementSibling;
    const parent = header.closest(".card");
    
    // Close others in same card
    if (parent) {
      parent.querySelectorAll(".accordion-content").forEach(c => {
        if (c !== content) c.classList.remove("active");
      });
      parent.querySelectorAll(".accordion-header").forEach(h => {
        if (h !== header) h.classList.remove("active");
      });
    }

    // Toggle current
    header.classList.toggle("active");
    content.classList.toggle("active");
  }
  document.addEventListener("DOMContentLoaded", initAccordions);


  // 3. CONTACT FORM HANDLER
  function initContactForm() {
    const form = document.querySelector("form[action*='web3forms']");
    if (form) {
      form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const btn = form.querySelector("button[type='submit']");
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        btn.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
          });
          
          if (response.ok) {
            alert("✅ Message Sent Successfully!");
            form.reset();
          } else {
            throw new Error("Failed to send");
          }
        } catch (error) {
          alert("❌ Error sending message. Please try again.");
        } finally {
          btn.innerText = originalText;
          btn.disabled = false;
        }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", initContactForm);

})();
