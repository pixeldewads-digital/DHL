// js/main.js — Dewata Home Living (navbar auto-hide, logo swap, fade-in, parallax, smooth anchor)

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileDropdownBtn = document.getElementById("mobileDropdownBtn");
  const mobileDropdown = document.getElementById("mobileDropdown");
  const hero = document.querySelector(".hero");
  const fades = document.querySelectorAll(".fade-in");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  // ======================
  // 1) Navbar: solid + auto-hide on scroll
  // ======================
  let lastY = window.scrollY;
  const threshold = 120;
  let ticking = false;

  const onScrollUpdate = () => {
    const y = window.scrollY;

    // toggle solid state (aktifkan juga swap logo via .scrolled)
    navbar.classList.toggle("scrolled", y > 20);

    // auto-hide ketika scroll turun, tampil saat scroll naik
    if (y > threshold && y > lastY + 2) {
      navbar.classList.add("hide");
    } else if (y < lastY - 2) {
      navbar.classList.remove("hide");
    }

    // hero parallax kecil (maks 40px)
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
  window.addEventListener("scroll", onScroll, { passive: true });

  // ======================
  // 2) Mobile menu toggle + lock body scroll
  // ======================
  const setBodyLock = (locked) => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.touchAction = locked ? "none" : "";
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove("show");
    setBodyLock(false);
  };

  burger?.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    setBodyLock(mobileMenu.classList.contains("show"));
  });

  // Tutup menu saat klik link di mobile
  mobileMenu?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("a[href^='#']")) {
      closeMobileMenu();
    }
  });

  // Tutup menu saat resize ke desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
  });

  // ======================
  // 3) Mobile Services dropdown
  // ======================
  mobileDropdownBtn?.addEventListener("click", () => {
    mobileDropdown?.classList.toggle("hidden");
  });

  // ESC untuk close mobile menu & dropdown
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      mobileDropdown?.classList.add("hidden");
    }
  });

  // ======================
  // 4) Fade-in on scroll
  // ======================
  if (fades.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    fades.forEach((el) => io.observe(el));
  }

  // ======================
  // 5) Smooth anchor scroll (offset navbar)
  // ======================
  const getNavHeight = () => {
    // tinggi aktual navbar (sticky)
    return navbar?.offsetHeight || 90;
  };

  const smoothScrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    const navH = getNavHeight();
    const rect = el.getBoundingClientRect();
    const offset = window.scrollY + rect.top - (navH + 12); // sedikit jarak

    window.scrollTo({ top: Math.max(offset, 0), behavior: "smooth" });
  };

  // Intercept anchor click
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const hash = a.getAttribute("href");
    if (hash && hash !== "#") {
      e.preventDefault();
      smoothScrollTo(hash);
      history.pushState(null, "", hash);
    }
  });

  // ======================
  // 6) Active link highlight berdasarkan section
  // ======================
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (sections.length) {
    const secObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const id = `#${visible.target.id}`;
          document
            .querySelectorAll('.nav-links a[href^="#"]')
            .forEach((link) => link.classList.toggle("active", link.getAttribute("href") === id));
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -50% 0px", // fokus area tengah layar
        threshold: [0.25, 0.5, 0.75],
      }
    );
    sections.forEach((sec) => secObserver.observe(sec));
  }
});
