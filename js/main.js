(function () {
  // CLICK FIX
  function enableClicks() {
    document.documentElement.style.pointerEvents = "auto";
    document.body.style.pointerEvents = "auto";

    const selectors = [".overlay", ".loader", ".loading", ".backdrop", ".modal-backdrop", "#overlay", "#loading"];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.pointerEvents = "none";
        if (el.classList.contains("loader") || el.id === "loading") {
          el.style.display = "none";
        }
      });
    });
  }

  // ACTIVE NAV
  function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(a => {
      const href = (a.getAttribute("href") || "").replace("./", "");
      a.classList.toggle("active", href === path);
    });
  }

  // ACCORDION
  function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains("active");
        
        // Close all
        document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("active"));
        
        // Open clicked if was closed
        if (!isOpen) {
          content.classList.add("active");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    enableClicks();
    setActiveNav();
    initAccordions();
  });

  window.addEventListener("load", enableClicks);
})();
