/* ============================================================
   Studio Vela — motion.js
   Implements the Motion Design Specification (Stage 10)
   §Initialization Pattern. Vanilla, progressively enhanced:
   the site is complete without this file. Every element
   lookup is guarded.
   ============================================================ */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.addEventListener('DOMContentLoaded', function () {

    /* 1. L'Entrée — hero entrance. CSS holds the initial states;
       adding .is-ready triggers the staggered transitions. */
    document.body.classList.add('is-ready');

    /* 2. Per-card stagger delays for the vitrine grid */
    document.querySelectorAll('.exhibit-card').forEach(function (card, i) {
      card.style.setProperty('--card-delay', (i * 80) + 'ms');
    });

    /* 3. Per-step stagger delays for the process section */
    document.querySelectorAll('.process-step').forEach(function (step, i) {
      step.style.setProperty('--step-delay', (i * 120) + 'ms');
    });

    /* Sibling stagger for grouped [data-reveal] elements */
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      group.querySelectorAll('[data-reveal]').forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
      });
    });

    /* 4. IntersectionObserver — reveal once, then unobserve */
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

      document.querySelectorAll('[data-reveal], .exhibit-card, .process-section')
        .forEach(function (el) { revealObserver.observe(el); });

      /* Threshold dividers announce the register shift slightly earlier */
      var thresholdObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            thresholdObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

      document.querySelectorAll('.threshold')
        .forEach(function (el) { thresholdObserver.observe(el); });
    } else {
      document.querySelectorAll('[data-reveal], .exhibit-card, .process-section, .threshold')
        .forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* 5. Nav scroll state — passive listener, rAF-throttled */
    var nav = document.querySelector('.site-nav');
    if (nav) {
      var navRAF;
      var onScroll = function () {
        if (navRAF) { cancelAnimationFrame(navRAF); }
        navRAF = requestAnimationFrame(function () {
          nav.classList.toggle('is-scrolled', window.scrollY > 100);
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* 6. Mobile drawer — open/close + focus trap + Escape */
    var hamburger = document.querySelector('.nav-hamburger');
    var drawer = document.querySelector('.nav-drawer');
    var backdrop = document.querySelector('.nav-backdrop');

    if (hamburger && drawer) {
      var focusablesSel = 'a[href], button:not([disabled])';

      var closeDrawer = function () {
        document.body.classList.remove('drawer-is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      };

      var openDrawer = function () {
        document.body.classList.add('drawer-is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        var first = drawer.querySelector(focusablesSel);
        if (first) {
          window.setTimeout(function () { first.focus(); }, reducedMotion.matches ? 0 : 120);
        }
      };

      hamburger.addEventListener('click', function () {
        if (document.body.classList.contains('drawer-is-open')) { closeDrawer(); }
        else { openDrawer(); }
      });

      if (backdrop) {
        backdrop.addEventListener('click', closeDrawer);
      }

      document.addEventListener('keydown', function (e) {
        if (!document.body.classList.contains('drawer-is-open')) { return; }
        if (e.key === 'Escape') {
          closeDrawer();
          return;
        }
        if (e.key === 'Tab') {
          var items = drawer.querySelectorAll(focusablesSel);
          if (!items.length) { return; }
          var first = items[0];
          var last = items[items.length - 1];
          var active = document.activeElement;
          if (!drawer.contains(active) && active !== hamburger) {
            first.focus();
            e.preventDefault();
          } else if (e.shiftKey && (active === first || active === hamburger)) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && active === last) {
            first.focus();
            e.preventDefault();
          }
        }
      });

      /* Close the drawer when a drawer link is followed */
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          document.body.classList.remove('drawer-is-open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* 7. FAQ accordion — native <details>/<summary>, WAAPI enhanced */
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var summary = item.querySelector('.faq-summary');
      var panel = item.querySelector('.faq-panel');
      if (!summary || !panel || !panel.animate) { return; }

      var animating = false;

      summary.addEventListener('click', function (e) {
        if (reducedMotion.matches) { return; } /* native instant toggle */
        e.preventDefault();
        if (animating) { return; }
        animating = true;

        if (item.open) {
          var closeAnim = panel.animate(
            [{ height: panel.scrollHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
            { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
          );
          closeAnim.onfinish = function () {
            item.open = false;
            animating = false;
          };
        } else {
          item.open = true;
          var openAnim = panel.animate(
            [{ height: '0px', opacity: 0 }, { height: panel.scrollHeight + 'px', opacity: 1 }],
            { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
          );
          openAnim.onfinish = function () { animating = false; };
        }
      });
    });

    /* 8. Language toggle — aria-pressed, data-lang, sessionStorage */
    var setLang = function (lang) {
      document.documentElement.setAttribute('data-lang', lang);
      document.documentElement.setAttribute('lang', lang);
      try { window.sessionStorage.setItem('sv-lang', lang); } catch (err) { /* private mode */ }
      document.querySelectorAll('.toggle-cell').forEach(function (cell) {
        cell.setAttribute('aria-pressed', cell.getAttribute('data-set-lang') === lang ? 'true' : 'false');
      });
      /* WhatsApp deep links carry the pre-filled message of the active language */
      document.querySelectorAll('a[data-wa-fr]').forEach(function (a) {
        var href = a.getAttribute(lang === 'en' ? 'data-wa-en' : 'data-wa-fr');
        if (href) { a.setAttribute('href', href); }
      });
    };

    document.querySelectorAll('.toggle-cell').forEach(function (cell) {
      cell.addEventListener('click', function () {
        var lang = cell.getAttribute('data-set-lang');
        if (lang) { setLang(lang); }
      });
    });

    var saved = null;
    try { saved = window.sessionStorage.getItem('sv-lang'); } catch (err) { /* private mode */ }
    if (saved === 'en' || saved === 'fr') { setLang(saved); }

    /* 9. Contact fallback form — inline validation, mailto channel.
       Submission goes to a real channel (email); no fake success. */
    var form = document.querySelector('.contact-form');
    if (form) {
      var lang = function () {
        return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'fr';
      };

      var showError = function (field, on) {
        var err = document.getElementById(field.getAttribute('aria-describedby').split(' ')[0]);
        field.setAttribute('aria-invalid', on ? 'true' : 'false');
        if (err) { err.classList.toggle('is-active', on); }
      };

      form.addEventListener('submit', function (e) {
        var hp = form.querySelector('input[name="entreprise-site"]');
        if (hp && hp.value) { e.preventDefault(); return; } /* honeypot */

        var activite = form.querySelector('#f-activite');
        var tel = form.querySelector('#f-tel');
        var email = form.querySelector('#f-email');
        var ok = true;

        if (activite && !activite.value.trim()) {
          showError(activite, true);
          ok = false;
        } else if (activite) {
          showError(activite, false);
        }

        if (tel && email && !tel.value.trim() && !email.value.trim()) {
          showError(tel, true);
          ok = false;
        } else if (tel) {
          showError(tel, false);
        }

        if (!ok) {
          e.preventDefault();
          var firstInvalid = form.querySelector('[aria-invalid="true"]');
          if (firstInvalid) { firstInvalid.focus(); }
          return;
        }

        /* Build a clean mailto body and hand off to the mail client */
        e.preventDefault();
        var nom = form.querySelector('#f-nom');
        var besoin = form.querySelector('#f-besoin');
        var subject = lang() === 'en'
          ? 'Free mockup request — Studio Vela'
          : 'Demande de maquette gratuite — Studio Vela';
        var body = [
          (lang() === 'en' ? 'Name: ' : 'Nom : ') + (nom ? nom.value : ''),
          (lang() === 'en' ? 'Business: ' : 'Activité : ') + (activite ? activite.value : ''),
          (lang() === 'en' ? 'Phone / WhatsApp: ' : 'Téléphone / WhatsApp : ') + (tel ? tel.value : ''),
          'Email : ' + (email ? email.value : ''),
          (lang() === 'en' ? 'Needs: ' : 'Besoin : ') + (besoin ? besoin.value : '')
        ].join('\n');
        window.location.href = 'mailto:studiovelaparis@gmail.com'
          + '?subject=' + encodeURIComponent(subject)
          + '&body=' + encodeURIComponent(body);

        var handoff = document.querySelector('.form-handoff');
        if (handoff) { handoff.hidden = false; }
      });
    }
  });
})();
