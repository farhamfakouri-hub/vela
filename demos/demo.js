(function () {
  "use strict";

  // Scroll reveal
  var reveals = document.querySelectorAll(".d-reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.06 + "s";
      io.observe(el);
    });
  }

  // Frontend-only demo forms - never send data
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    var status = form.querySelector(".d-form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) {
        status.hidden = false;
        status.textContent = "Demonstration : votre demande n'a pas ete envoyee. Sur un site reel, elle arriverait directement au professionnel.";
        if (typeof status.focus === "function") { status.focus(); }
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // Problem selector (plumber) - visual only
  document.querySelectorAll("[data-selector]").forEach(function (group) {
    var chips = group.querySelectorAll(".d-select-chip");
    var output = group.querySelector(".d-select-output");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        if (output) { output.textContent = chip.getAttribute("data-label") || chip.textContent; }
      });
    });
  });
})();
