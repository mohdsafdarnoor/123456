// ============================================================
// HS WISMAR - AI JOB SEARCH SUPPORT PLATFORM
// Main JavaScript File (Business Faculty Project)
// Last Updated: January 2026
// ============================================================

(function () {
  'use strict';

  // ============================================================
  // 1. CLICK & INTERACTION FIX (CRITICAL)
  // Ensures all overlays are removed and page is clickable
  // ============================================================
  function enablePageInteractions() {
    console.log("✅ Interactions Enabled: Click fix applied.");
    
    // Force pointer events on body
    document.documentElement.style.pointerEvents = "auto";
    document.body.style.pointerEvents = "auto";

    // Hide any potential blocking overlays
    const blockers = [
      ".overlay", ".loader", ".loading", ".backdrop", 
      ".modal-backdrop", "#overlay", "#loading", "#loadingDiv"
    ];

    blockers.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = "none";
        el.style.pointerEvents = "none";
        el.style.zIndex = "-1";
      });
    });
  }

  // Run immediately and on load
  document.addEventListener("DOMContentLoaded", enablePageInteractions);
  window.addEventListener("load", enablePageInteractions);


  // ============================================================
  // 2. ACTIVE NAVIGATION HIGHLIGHTING
  // Adds 'active' class to the current page's link in the header
  // ============================================================
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
      // Get the href attribute (e.g., "./tools.html" -> "tools.html")
      const linkHref = link.getAttribute("href").replace("./", "");

      // Remove existing active class
      link.classList.remove("active");

      // Add active class if it matches current page
      if (linkHref === currentPath || (currentPath === "" && linkHref === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", setActiveNavLink);


  // ============================================================
  // 3. ACCORDION LOGIC (One-Open-At-A-Time)
  // Used for FAQs and AI Tools sections
  // ============================================================
  function initAccordions() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
      // Remove any existing listeners to prevent duplicates (if re-initialized)
      header.removeEventListener("click", toggleAccordion);
      header.addEventListener("click", toggleAccordion);
    });
  }

  function toggleAccordion(e) {
    const header = e.currentTarget;
    const content = header.nextElementSibling;
    const parentContainer = header.closest(".card") || document.body;
    
    // Check if currently open
    const isAlreadyOpen = content.classList.contains("active");

    // Close ALL other accordions in the same container
    parentContainer.querySelectorAll(".accordion-content").forEach(item => {
      item.classList.remove("active");
    });

    parentContainer.querySelectorAll(".accordion-header").forEach(h => {
      h.classList.remove("active"); // Removes the '-' icon style
    });

    // If it wasn't open, open it now
    if (!isAlreadyOpen) {
      content.classList.add("active");
      header.classList.add("active");
    }
  }

  document.addEventListener("DOMContentLoaded", initAccordions);


  // ============================================================
  // 4. SMOOTH SCROLLING FOR ANCHOR LINKS
  // Handles links like <a href="#working-student">
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        // Ignore empty '#' links
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Scroll to element with a small offset for the sticky header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // If inside an accordion (e.g., Tools page), open it
          const parentAccordion = targetElement.closest(".accordion-content");
          if (parentAccordion) {
            parentAccordion.classList.add("active");
            parentAccordion.previousElementSibling.classList.add("active");
          }
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initSmoothScroll);


  // ============================================================
  // 5. CONTACT FORM SUBMISSION (Web3Forms)
  // Handles form submission without page reload
  // ============================================================
  function initContactForm() {
    const form = document.querySelector("form[action*='web3forms']");
    
    if (form) {
      form.addEventListener("submit", async function(e) {
        e.preventDefault(); // Stop default redirect

        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;

        // Visual feedback: Loading state
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";

        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
              "Accept": "application/json"
            }
          });

          if (response.ok) {
            // Success
            alert("✅ Message Sent Successfully! We will get back to you soon.");
            form.reset();
          } else {
            // Server error
            throw new Error("Form submission failed");
          }
        } catch (error) {
          // Network or other error
          alert("❌ Error sending message. Please try again later or email us directly.");
          console.error("Form Error:", error);
        } finally {
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initContactForm);


  // ============================================================
  // 6. EXTERNAL LINK SECURITY
  // Adds 'rel="noopener noreferrer"' to all external links
  // ============================================================
  function secureExternalLinks() {
    const links = document.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  document.addEventListener("DOMContentLoaded", secureExternalLinks);


  // ============================================================
  // 7. CONSOLE SIGNATURE
  // ============================================================
  console.log("%c🎓 Hochschule Wismar | AI Job Search Platform", "color: #339933; font-size: 14px; font-weight: bold;");
  console.log("Developed by Master International Management Students (2026)");

})();
