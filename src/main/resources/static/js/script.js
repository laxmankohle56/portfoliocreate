const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('portfolio-theme');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

function applyTheme(theme) {
  if (theme === 'light') {
    root.style.setProperty('--bg', '#f8fafc');
    root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.92)');
    root.style.setProperty('--surface-strong', 'rgba(255, 255, 255, 0.96)');
    root.style.setProperty('--surface-soft', 'rgba(247, 250, 252, 0.72)');
    root.style.setProperty('--text', '#0f172a');
    root.style.setProperty('--muted', '#475569');
    root.style.setProperty('--border', 'rgba(15, 23, 42, 0.12)');
    root.style.setProperty('--accent', '#4338ca');
    root.style.setProperty('--accent-soft', '#2563eb');
    root.style.setProperty('--shadow', '0 35px 120px rgba(15, 23, 42, 0.12)');
    document.body.style.background = 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)';
    themeToggle.textContent = '🌙';
  } else {
    root.style.setProperty('--bg', '#070b1a');
    root.style.setProperty('--surface', 'rgba(18, 23, 44, 0.88)');
    root.style.setProperty('--surface-strong', 'rgba(24, 30, 62, 0.96)');
    root.style.setProperty('--surface-soft', 'rgba(16, 21, 44, 0.72)');
    root.style.setProperty('--text', '#eef2ff');
    root.style.setProperty('--muted', '#a5b3d1');
    root.style.setProperty('--border', 'rgba(255, 255, 255, 0.12)');
    root.style.setProperty('--accent', '#8b5cf6');
    root.style.setProperty('--accent-soft', '#6366f1');
    root.style.setProperty('--shadow', '0 35px 120px rgba(3, 11, 34, 0.35)');
    document.body.style.background = 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.16), transparent 32%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.14), transparent 28%), linear-gradient(180deg, #050712 0%, #0f1328 48%, #08101e 100%)';
    themeToggle.textContent = '🌙';
  }
}

if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const current = localStorage.getItem('portfolio-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', current);
  applyTheme(current);
});

navToggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observerOptions = {
  root: null,
  rootMargin: '-35% 0px -55% 0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

const contactForm = document.getElementById('contact-form');
const whatsappNumber = '917725013140'; // Replace with your WhatsApp number in international format without + or dashes, e.g. 919999999999

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      contactForm.reportValidity();
      return;
    }

    const rawText = `*New Contact Form Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawText)}`;

    window.open(whatsappUrl, '_blank');
  });
}
