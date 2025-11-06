// js/main.js — Dewata Home Living (trial upgrade)

/* Helpers */
const prefersReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function handleNavbarSolid() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('is-solid', window.scrollY > 50);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function handleMobileMenu() {
  const burgerNew = document.querySelector('.hamburger');
  const linksNew  = document.querySelector('.nav-links');
  const burgerOld = document.querySelector('.navbar__toggle');
  const linksOld  = document.querySelector('.navbar__menu');

  const burger = burgerNew || burgerOld;
  const menu   = linksNew  || linksOld;
  if (!burger || !menu) return;

  const openClass = linksNew ? 'show' : 'is-active';
  const toggle = () => {
    const isOpen = menu.classList.toggle(openClass);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
  };

  burger.addEventListener('click', toggle);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (menu.classList.contains(openClass)) toggle();
  }));
}

function handleHeroParallax() {
  const hero = document.querySelector('.hero--home');
  if (!hero || prefersReduceMotion) return;

  let ticking = false;
  const maxOffset = 40;
  const update = () => {
    const y = Math.min(maxOffset, window.scrollY * 0.08);
    hero.style.backgroundPosition = `center calc(0px + ${y}px)`;
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function handleFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length || prefersReduceMotion) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => io.observe(el));
}

function handleLogoOnce() {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  if (prefersReduceMotion) {
    const heroImg = logo.querySelector('.logo--hero');
    if (heroImg) heroImg.style.opacity = '1';
    return;
  }

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      logo.classList.add('logo--animate');
      io.disconnect();
    }
  }, { threshold: 0.6 });

  io.observe(logo);
}

/* NEW: Active nav by section */
function handleActiveSection() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="index.html"], a[href^="#"], a[href$=".html"]')];
  const sectionIds = ['why','packages','portfolio']; // sesuai index.html di bawah
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    // Prioritaskan anchor ke #id
    const anchor = nav.querySelector(`a[href="#${id}"]`);
    if (anchor) { anchor.classList.add('active'); return; }
    // Fallback: tetap aktifkan Home saat di section
    const home = nav.querySelector('a[href="index.html"]');
    home?.classList.add('active');
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        setActive(id);
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => io.observe(sec));
}

/* NEW: Sticky CTA & Back to Top */
function handleStickyHelpers() {
  const sticky = document.querySelector('.sticky-cta');
  
  const onScroll = () => {
    const show = window.scrollY > 400;
    if (sticky && window.innerWidth <= 820) {
      sticky.classList.toggle('show', show);
    }
  

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Simple WA click tracking (console) */
function trackWhatsAppClicks() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(a=>{
    a.addEventListener('click', ()=>{
      try { console.log('WA click:', window.location.pathname); } catch(_) {}
      // window.gtag?.('event','whatsapp_click',{location:window.location.pathname});
    });
  });
}

  /* === Auto-hide header on scroll (sticky) === */
function handleAutoHideHeader() {
  const header = document.querySelector('.navbar');
  if (!header) return;

  // ambang mulai auto-hide
  const threshold = 120;
  let lastY = window.scrollY;
  let ticking = false;

  // helper: apakah mobile menu sedang terbuka?
  const isMenuOpen = () => {
    const linksNew = document.querySelector('.nav-links');
    const linksOld = document.querySelector('.navbar__menu');
    return (linksNew && linksNew.classList.contains('show')) ||
           (linksOld && linksOld.classList.contains('is-active'));
  };

  const update = () => {
    const y = window.scrollY;

    // kunci saat menu terbuka (supaya header tetap terlihat)
    if (isMenuOpen()) {
      header.classList.remove('hide-on-scroll');
      header.classList.add('is-locked');
      lastY = y;
      ticking = false;
      return;
    } else {
      header.classList.remove('is-locked');
    }

    // hanya auto-hide setelah melewati threshold
    if (y > threshold) {
      const scrollingDown = y > lastY + 2;
      const scrollingUp   = y < lastY - 2;

      if (scrollingDown) {
        header.classList.add('hide-on-scroll');
      } else if (scrollingUp) {
        header.classList.remove('hide-on-scroll');
      }
    } else {
      // di atas threshold: header selalu terlihat
      header.classList.remove('hide-on-scroll');
    }

    lastY = y;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  // juga kunci/unlock saat tombol burger diklik
  const burgerNew = document.querySelector('.hamburger');
  const burgerOld = document.querySelector('.navbar__toggle');
  [burgerNew, burgerOld].filter(Boolean).forEach(btn => {
    btn.addEventListener('click', () => {
      // toggle akan mengubah class menu; jalankan update setelah next frame
      requestAnimationFrame(update);
    });
  });

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}
/* FAQ toggle */
function handleFAQ(){
  const qs = document.querySelectorAll('.faq-q');
  if (!qs.length) return;
  qs.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const next = btn.nextElementSibling;
      if (next && next.classList.contains('faq-a')) {
        next.classList.toggle('show', !expanded);
      }
    });
  });
}


/* Init */
document.addEventListener('DOMContentLoaded', () => {
  handleNavbarSolid();
  handleMobileMenu();
  handleHeroParallax();
  handleFadeIn();
  handleLogoOnce();
  handleActiveSection();
  trackWhatsAppClicks();
  handleAutoHideHeader();
  handleFAQ();
});
