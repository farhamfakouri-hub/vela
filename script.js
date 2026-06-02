(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Bilingual system (FR default, EN optional) ---------- */
  var STORAGE_KEY = "sv-lang";
  function getStored() { try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function store(v) { try { window.localStorage.setItem(STORAGE_KEY, v); } catch (e) {} }

  function applyLang(lang) {
    if (lang === "en") { root.classList.add("lang-en"); root.setAttribute("lang", "en"); }
    else { root.classList.remove("lang-en"); root.setAttribute("lang", "fr"); }
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
    store(lang);
  }

  var initial = getStored();
  if (!initial) {
    var nav = (navigator.language || "fr").toLowerCase();
    initial = nav.indexOf("fr") === 0 ? "fr" : (nav.indexOf("en") === 0 ? "en" : "fr");
  }
  applyLang(initial);

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang-btn")); });
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobile-menu");
  function closeMenu() { if (!burger) return; burger.setAttribute("aria-expanded", "false"); menu.classList.remove("open"); menu.hidden = true; }
  function openMenu() { burger.setAttribute("aria-expanded", "true"); menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("open"); }); }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      (burger.getAttribute("aria-expanded") === "true") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeMenu(); } });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1024) closeMenu(); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 0.08 + "s"; io.observe(el); });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.style.boxShadow = window.scrollY > 20 ? "0 10px 40px -20px rgba(0,0,0,0.8)" : "none"; };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
})();
