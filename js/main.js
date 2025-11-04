// js/main.js — Dewata Home Living (final)

/* Helpers */
const prefersReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1) Navbar: solid saat scroll */
function handleNavbarSolid() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('is-solid', window.scrollY > 50);
  onScroll(); // initial
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* 2) Mobile menu (mendukung selector baru & lama) */
function handleMobileMenu() {
  // Baru
  const burgerNew = document.querySelector('.hamburger');
  const linksNew  = document.querySelector('.nav-links');
  // Lama (fallback)
  const burgerOld = document.querySelector('.navbar__toggle');
  const linksOld  = document.querySelector('.navbar__menu');

  const burger = burgerNew || burgerOld;
  const menu   = linksNew  || linksOld;

  if (!burger || !menu) return;

  const openClass = linksNew ? 'show' : 'is-active';

  const toggle = () => {
    const isOpen = menu.classList.toggle(openClass);
    burger.setAttribute('aria-expanded', String(isOpen));
    // lock scroll di mobile ketika menu terbuka
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
  };

  burger.addEventListener('click', toggle);

  // Tutup saat klik link (UX lebih baik)
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      if (menu.classList.contains(openClass)) toggle();
    })
  );
}

/* 3) Parallax hero (ringan + aman) */
function handleHeroParallax() {
  const hero = document.querySelector('.hero--home');
  if (!hero || prefersReduceMotion) return;

  let ticking = false;
  const maxOffset = 40; // px

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

/* 4) Fade-in on scroll */
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

/* 5) Animasi logo sekali saat terlihat */
function handleLogoOnce() {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  if (prefersReduceMotion) {
    // pastikan tidak tersangkut invisible
    const heroImg = logo.querySelector('.logo--hero');
    if (heroImg) heroImg.style.opacity = '1';
    return;
  }

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      logo.classList.add('logo--animate'); // memicu animasi hero saja (CSS sudah dibatasi)
      io.disconnect();
    }
  }, { threshold: 0.6 });

  io.observe(logo);
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  handleNavbarSolid();
  handleMobileMenu();
  handleHeroParallax();
  handleFadeIn();
  handleLogoOnce();
});
