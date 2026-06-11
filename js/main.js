/* Studio Vela — main.js
   Progressive enhancement only: the page is complete without this file. */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Language toggle (FR / EN, one at a time) ---------- */
  var LANG_KEY = 'sv-lang';
  var currentLang = 'fr';

  function applyLang(lang, animate) {
    if (lang !== 'fr' && lang !== 'en') lang = 'fr';
    currentLang = lang;
    var apply = function () {
      docEl.setAttribute('data-lang', lang);
      docEl.setAttribute('lang', lang);
      var btns = document.querySelectorAll('.lang-btn');
      for (var i = 0; i < btns.length; i++) {
        var active = btns[i].getAttribute('data-set-lang') === lang;
        btns[i].classList.toggle('is-active', active);
        btns[i].setAttribute('aria-pressed', active ? 'true' : 'false');
      }
    };
    if (animate && !prefersReduced) {
      document.body.classList.add('lang-switching');
      window.setTimeout(function () {
        apply();
        window.setTimeout(function () {
          document.body.classList.remove('lang-switching');
        }, 40);
      }, 160);
    } else {
      apply();
    }
    try { window.sessionStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  var saved = null;
  try { saved = window.sessionStorage.getItem(LANG_KEY); } catch (e) { /* ignore */ }
  if (saved === 'en') applyLang('en', false);

  var langBtns = document.querySelectorAll('.lang-btn');
  for (var i = 0; i < langBtns.length; i++) {
    langBtns[i].addEventListener('click', function () {
      var lang = this.getAttribute('data-set-lang');
      if (currentLang !== lang) applyLang(lang, true);
    });
  }

  /* ---------- Header scrolled state ---------- */
  var header = document.querySelector('.site-header');
  function onHeaderScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('nav-burger');
  var nav = document.getElementById('main-nav');
  if (burger && nav && header) {
    burger.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    var navLinks = nav.querySelectorAll('a');
    for (var n = 0; n < navLinks.length; n++) {
      navLinks[n].addEventListener('click', function () {
        header.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

  /* ---------- Scroll reveals (reveal once) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.classList.add('is-in');
          io.unobserve(entries[j].target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    for (var r = 0; r < reveals.length; r++) io.observe(reveals[r]);
  } else {
    for (var r2 = 0; r2 < reveals.length; r2++) reveals[r2].classList.add('is-in');
  }

  /* ---------- Parallax (subtle, transform-only, desktop, motion-safe) ---------- */
  var depthEls = document.querySelectorAll('[data-depth]');
  var parallaxOn = depthEls.length &&
                   !prefersReduced &&
                   window.matchMedia('(min-width: 860px)').matches;
  if (parallaxOn) {
    var ticking = false;
    var update = function () {
      var y = window.scrollY;
      for (var k = 0; k < depthEls.length; k++) {
        var el = depthEls[k];
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
        var depth = parseFloat(el.getAttribute('data-depth')) || 0;
        var base = el.__svBase;
        if (base === undefined) { base = el.__svBase = y + rect.top; }
        var offset = (y - base) * depth;
        el.style.transform = 'translate3d(' +
          (el.classList.contains('hero-glow') || el.classList.contains('section-glow') || el.classList.contains('contact-glow') ? '-50%' : '0') +
          ',' + offset.toFixed(1) + 'px,0)';
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- FAQ accordion ---------- */
  var faqBtns = document.querySelectorAll('.faq-btn');
  for (var f = 0; f < faqBtns.length; f++) {
    faqBtns[f].addEventListener('click', function () {
      var item = this.closest('.faq-item');
      if (!item) return;
      var open = item.classList.toggle('is-open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Sticky mobile CTA (appears after the hero) ---------- */
  var sticky = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero');
  if (sticky && hero && 'IntersectionObserver' in window) {
    var heroIo = new IntersectionObserver(function (entries) {
      sticky.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0.15 });
    heroIo.observe(hero);
  } else if (sticky) {
    sticky.classList.add('is-visible');
  }
})();
