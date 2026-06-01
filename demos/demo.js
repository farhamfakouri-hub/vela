// Shared demo interactions for Studio Vela demo pages
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navToggle = document.querySelector("[data-demo-menu-toggle]");
  const nav = document.querySelector("[data-demo-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealItems = document.querySelectorAll(".demo-reveal, .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible", "in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
      observer.observe(item);
    });
  } else {
    document.querySelectorAll(".demo-reveal, .reveal").forEach((item) => {
      item.classList.add("is-visible", "in");
    });
  }
})();
