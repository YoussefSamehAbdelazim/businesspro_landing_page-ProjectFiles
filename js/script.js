// Modernized interactions for BusinessPro
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  const topBtn = document.querySelector('.top-btn');
  const navItems = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const cards = document.querySelectorAll('.service-card,.feature-box,.team-card,.price-card,.testimonial-card');

  const setMenuState = (isOpen) => {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  };

  menuBtn?.addEventListener('click', () => {
    const isOpen = !navLinks.classList.contains('active');
    setMenuState(isOpen);
  });

  menuBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuBtn.click();
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  const updateStickyState = () => {
    const scrolled = window.scrollY > 80;
    header?.classList.toggle('is-scrolled', scrolled);
    if (topBtn) {
      topBtn.classList.toggle('is-visible', window.scrollY > 400);
    }

    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.id;
    });

    navItems.forEach((link) => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', updateStickyState, { passive: true });
  updateStickyState();

  // Smooth scrolling for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      const target = hash && hash !== '#' ? document.querySelector(hash) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Reveal animation
  if ('IntersectionObserver' in window && cards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach((card) => {
      card.classList.add('reveal-card');
      observer.observe(card);
    });
  } else {
    cards.forEach((card) => card.classList.add('is-visible'));
  }
});
