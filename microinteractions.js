/* microinteractions.js — joshuabechtel.com
   Progressive enhancement only. If JS fails, nothing breaks.
   Respects prefers-reduced-motion throughout.
*/
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. MAGNETIC BUTTONS ──────────────────────────────────────────
  // Primary and gold CTA buttons pull gently toward the cursor.
  // Feels alive without being distracting.
  function initMagneticButtons() {
    if (reduced) return;
    document.querySelectorAll('.btn-primary, .btn-gold, .btn-outline-white, .sidebar-cta a').forEach(btn => {
      btn.style.transition = 'transform 0.18s cubic-bezier(0.23,1,0.32,1), background 0.2s, box-shadow 0.2s';
      btn.style.willChange = 'transform';

      btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        this.style.transform = `translate(${dx * 6}px, ${dy * 5}px) translateY(-1px)`;
      });

      btn.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });

      btn.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.96)';
      });

      btn.addEventListener('mouseup', function () {
        this.style.transform = '';
      });
    });
  }

  // ── 2. CARD TILT ─────────────────────────────────────────────────
  // Cards tilt subtly in 3D toward the cursor.
  // Applied to distinction items, callouts, and zone cards.
  function initCardTilt() {
    if (reduced) return;
    const selectors = '.distinction-item, .callout, .topic-item, .card';
    document.querySelectorAll(selectors).forEach(card => {
      card.style.transition = 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s';
      card.style.willChange = 'transform';
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotX = -(y * 6);
        const rotY =   x * 6;
        this.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        this.style.boxShadow = `${-rotY * 1.5}px ${rotX * 1.5 + 8}px 28px rgba(31,59,31,0.1)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }

  // ── 3. ANIMATED UNDERLINES ON NAV LINKS ─────────────────────────
  // Top nav links get a sliding underline instead of the plain opacity fade.
  function initNavUnderlines() {
    if (reduced) return;
    document.querySelectorAll('.top-nav a').forEach(link => {
      link.style.position = 'relative';
      link.style.transition = 'opacity 0.15s';

      const line = document.createElement('span');
      line.style.cssText = [
        'position:absolute',
        'bottom:-2px',
        'left:0',
        'width:100%',
        'height:2px',
        'background:var(--gold)',
        'border-radius:1px',
        'transform:scaleX(0)',
        'transform-origin:right center',
        'transition:transform 0.22s cubic-bezier(0.23,1,0.32,1)',
        'pointer-events:none',
      ].join(';');
      link.appendChild(line);

      link.addEventListener('mouseenter', () => {
        line.style.transformOrigin = 'left center';
        line.style.transform = 'scaleX(1)';
      });
      link.addEventListener('mouseleave', () => {
        line.style.transformOrigin = 'right center';
        line.style.transform = 'scaleX(0)';
      });
    });
  }

  // ── 4. INLINE LINK SHIMMER ───────────────────────────────────────
  // Inline text links get a color shimmer sweep on hover.
  function initInlineLinkShimmer() {
    if (reduced) return;
    document.querySelectorAll('.inline-link, .page-content a:not(.btn):not(.sidebar-cta a)').forEach(link => {
      if (link.classList.contains('btn') || link.closest('.sidebar-cta')) return;
      link.style.transition = 'color 0.2s, border-color 0.2s';
      link.addEventListener('mouseenter', function () {
        this.style.color = 'var(--gold)';
      });
      link.addEventListener('mouseleave', function () {
        this.style.color = '';
      });
    });
  }

  // ── 5. SCROLL-TRIGGERED ENTRANCE ANIMATIONS ──────────────────────
  // Elements fade and slide up as they enter the viewport.
  function initScrollEntrance() {
    if (reduced) return;
    const targets = document.querySelectorAll(
      '.distinction-item, .callout, .topic-item, .card, ' +
      '.section-title, .page-eyebrow, .page-intro, ' +
      '.program-card, .combo-card, .menu-item'
    );

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.07}s, transform 0.5s ease ${(i % 4) * 0.07}s`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  // ── 6. ACTIVE LINK PULSE ─────────────────────────────────────────
  // The active sidebar link gets a subtle breathing pulse.
  function initActiveLinkPulse() {
    if (reduced) return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes jb-pulse {
        0%, 100% { box-shadow: inset 3px 0 0 var(--gold); }
        50%       { box-shadow: inset 3px 0 0 var(--forest); }
      }
      #sidebar .sidebar-nav a.active {
        animation: jb-pulse 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }

  // ── 7. BUTTON RIPPLE ─────────────────────────────────────────────
  // Material-style ripple that radiates from the click point.
  function initButtonRipple() {
    document.querySelectorAll('.btn-primary, .btn-gold').forEach(btn => {
      btn.style.overflow = 'hidden';
      btn.style.position = 'relative';

      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top  - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = [
          `position:absolute`,
          `width:${size}px`,
          `height:${size}px`,
          `left:${x}px`,
          `top:${y}px`,
          `background:rgba(255,255,255,0.2)`,
          `border-radius:50%`,
          `transform:scale(0)`,
          `animation:jb-ripple 0.55s ease-out forwards`,
          `pointer-events:none`,
        ].join(';');

        const style = document.getElementById('jb-ripple-style');
        if (!style) {
          const s = document.createElement('style');
          s.id = 'jb-ripple-style';
          s.textContent = '@keyframes jb-ripple { to { transform: scale(1); opacity: 0; } }';
          document.head.appendChild(s);
        }

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ── 8. SECTION LABEL SLIDE-IN ────────────────────────────────────
  // The small uppercase eyebrow labels slide in from the left.
  function initEyebrowSlide() {
    if (reduced) return;
    document.querySelectorAll('.page-eyebrow, .section-label').forEach(el => {
      el.style.overflow = 'hidden';
      el.style.display = 'inline-block';

      const inner = document.createElement('span');
      inner.style.cssText = 'display:inline-block; transform:translateX(-20px); opacity:0; transition:transform 0.4s ease, opacity 0.4s ease;';
      inner.textContent = el.textContent;
      el.textContent = '';
      el.appendChild(inner);

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              inner.style.transform = 'translateX(0)';
              inner.style.opacity = '1';
            }, 80);
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  }

  // ── INIT ─────────────────────────────────────────────────────────
  function init() {
    initMagneticButtons();
    initCardTilt();
    initNavUnderlines();
    initInlineLinkShimmer();
    initScrollEntrance();
    initActiveLinkPulse();
    initButtonRipple();
    initEyebrowSlide();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
