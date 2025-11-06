
// ============ main.js (navbar clean) ============
document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const dropToggle = document.querySelector('.nav-drop-toggle');
  const dropWrap   = document.querySelector('.nav-dropdown');

  /* main.js (robust) */
(() => {
  try {
    // Navbar solid on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const onScroll = () => navbar.classList.toggle('is-solid', window.scrollY > 50);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Parallax halus hero (opsional)
    const hero = document.querySelector('.hero--home');
    if (hero) {
      const par = () => {
        const y = Math.min(40, window.scrollY * 0.08);
        hero.style.backgroundPosition = `center calc(0px + ${y}px)`;
      };
      window.addEventListener('scroll', par, { passive: true });
      par();
    }

    // Fade-in observer (hanya jika JS aktif)
    const items = document.querySelectorAll('.fade-in');
    if (items.length) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.1 });
      items.forEach(el => io.observe(el));
    }

    // FAQ close others (kalau ada)
    document.querySelectorAll('.why-faq .faq summary').forEach(sum => {
      sum.addEventListener('click', () => {
        const cur = sum.parentElement;
        document.querySelectorAll('.why-faq .faq').forEach(d => { if (d !== cur) d.removeAttribute('open'); });
      });
    });

  } catch (e) {
    console.error('main.js error:', e);
    // fallback: tampilkan semua fade-in
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }
})();

  // 1) Solid on scroll
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-solid', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 2) Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const shown = navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(shown));
    });
  }

  // 3) Dropdown (click)
  if (dropToggle && dropWrap) {
    dropToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropWrap.classList.toggle('open');
      dropToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!dropWrap.contains(e.target)) {
        dropWrap.classList.remove('open');
        dropToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4) Active link highlight (by pathname)
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const file = a.getAttribute('href')?.split('/').pop();
    if (file === here) a.classList.add('active');
  });

  // 5) Correct offset when landing with #hash
  const fixOffsetForHash = () => {
    if (!location.hash) return;
    const el = document.querySelector(decodeURIComponent(location.hash));
    if (!el) return;
    const navH = (navbar?.offsetHeight || 80) + 12;
    const y = Math.max(window.scrollY + el.getBoundingClientRect().top - navH, 0);
    window.scrollTo({ top: y, behavior: 'instant' });
  };
  setTimeout(fixOffsetForHash, 0);

  // Fix offset for in-page links clicked from navbar
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const to = document.querySelector(a.getAttribute('href'));
      if (!to) return;
      e.preventDefault();
      const navH = (navbar?.offsetHeight || 80) + 12;
      const y = Math.max(window.scrollY + to.getBoundingClientRect().top - navH, 0);
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // 6) Mini parallax hero (aman)
  const hero = document.querySelector('.hero--home');
  if (hero) {
    const parallax = () => {
      const y = Math.min(40, window.scrollY * 0.08);
      hero.style.backgroundPosition = `center calc(0px + ${y}px)`;
    };
    parallax();
    window.addEventListener('scroll', parallax, { passive: true });
  }
});
/* ===== FAQ: close others (optional) ===== */
document.querySelectorAll('.why-faq .faq summary').forEach((sum) => {
  sum.addEventListener('click', (e) => {
    const current = sum.parentElement;
    document.querySelectorAll('.why-faq .faq').forEach(d => {
      if (d !== current) d.removeAttribute('open');
    });
  });
});

/* ===== KPIs: count-up on view ===== */
(function(){
  const counters = document.querySelectorAll('.kpis .count');
  if (!counters.length) return;

  const animate = (el) => {
    const end = +el.dataset.target || 0;
    const step = Math.max(1, Math.ceil(end / 60)); // ±1s
    let cur = 0;
    const tick = () => {
      cur += step;
      if (cur >= end) { el.textContent = end; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting){
        en.target.querySelectorAll('.count').forEach(animate);
        obs.unobserve(en.target);
      }
    });
  }, {threshold:.3});

  const band = document.querySelector('.kpis');
  if (band) io.observe(band);
})();

