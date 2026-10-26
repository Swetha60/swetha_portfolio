const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.animate-on-scroll').forEach((item) => observer.observe(item));

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((0.5 - (y / rect.height))) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const counters = document.querySelectorAll('.stat-card h3');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        entry.target.textContent = target;
        clearInterval(timer);
      } else {
        entry.target.textContent = current;
      }
    }, 35);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));
