// js/main.js — DHL (navbar transparan→solid, auto-hide, logo swap, mobile menu, fade-in, parallax, smooth anchor)

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
  const mobileDropdown = document.getElementById('mobileDropdown');
  const hero = document.querySelector('.hero');
  const fades = document.querySelectorAll('.fade-in');

  // ===== 1) Navbar solid + auto-hide =====
  let lastY = window.scrollY;
  let ticking = false;
  const threshold = 120;

  const onScrollUpdate = () => {
    const y = window.scrollY;

    // solid state (sekalian memicu swap logo via CSS .scrolled)
    navbar.classList.toggle('scrolled', y > 20);

    // auto-hide saat scroll turun, show saat scroll naik
    if (y > threshold && y > lastY + 2) {
      navbar.classList.add('hide');
    } else if (y < lastY - 2) {
      navbar.classList.remove('hide');
    }

    // parallax hero kecil
    if (hero) {
      const p = Math.min(40, y * 0.08);
      hero.style.backgroundPosition = `center calc(50% + ${p}px)`;
    }

    lastY = y;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(onScrollUpdate);
      ticking = true;
    }
  };

  onScrollUpdate();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== 2) Mobile menu toggle + lock body scroll =====
  const lockBody = (lock) => {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.touchAction = lock ? 'none' : '';
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('show');
    lockBody(false);
  };

  burger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    lockBody(mobileMenu.classList.contains('show'));
  });

  // Tutup saat klik link anchor di mobile
  mobileMenu?.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) closeMobileMenu();
  });

  // Tutup saat resize ke desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMobileMenu();
  });

  // ===== 3) Mobile services dropdown =====
  mobileDropdownBtn?.addEventListener('click', () => {
    mobileDropdown?.classList.toggle('hidden');
  });

  // ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      mobileDropdown?.classList.add('hidden');
    }
  });

  // ===== 4) Fade-in on scroll =====
  if (fades.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.2 });
    fades.forEach((el) => io.observe(el));
  }

  // ===== 5) Smooth anchor scroll (offset navbar) =====
  const getNavH = () => navbar?.offsetHeight || 90;

  const smoothScrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target = window.scrollY + rect.top - (getNavH() + 12);
    window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash && hash !== '#') {
      e.preventDefault();
      smoothScrollTo(hash);
      history.pushState(null, '', hash);
    }
  });

  // ===== 6) Active link highlight by section =====
  const sections = Array.from(document.querySelectorAll('section[id]'));
  if (sections.length) {
    const secIO = new IntersectionObserver((entries) => {
      const vis = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) {
        const id = `#${vis.target.id}`;
        document
          .querySelectorAll('.nav-links a[href^="#"]')
          .forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
      }
    }, { rootMargin: '-30% 0px -50% 0px', threshold: [0.25, 0.5, 0.75] });
    sections.forEach((sec) => secIO.observe(sec));
  }
});
