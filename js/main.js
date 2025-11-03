document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const navbarToggle = document.querySelector('.navbar__toggle');
    const navbarMenu = document.querySelector('.navbar__menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('is-active');
        });
    }

    // 2. Navbar Solid on Scroll
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('is-solid');
            } else {
                navbar.classList.remove('is-solid');
            }
        });
    }
    // js/main.js
const hero = document.querySelector('.hero--home');
window.addEventListener('scroll', () => {
  const y = Math.min(40, window.scrollY * 0.08); // max 40px
  if (hero) hero.style.backgroundPosition = `center calc(0px + ${y}px)`;
});

    // 3. Fade-in Animation on Scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    }

});
