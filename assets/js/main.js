// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return prefersDark.matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getTheme());

// Theme toggle click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Listen for system preference changes
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Scrollspy
const scrollspyLinks = document.querySelectorAll('.scrollspy-link');
const sections = [];

scrollspyLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href.startsWith('#')) {
    const section = document.querySelector(href);
    if (section) {
      sections.push({ link, section });
    }
  }
});

function updateScrollspy() {
  const scrollPos = window.scrollY + 150;

  let activeSection = null;

  sections.forEach(({ link, section }) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      activeSection = link;
    }
  });

  // If no section matched, use the last one if we're past it
  if (!activeSection && sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    if (scrollPos >= lastSection.section.offsetTop) {
      activeSection = lastSection.link;
    }
  }

  // If still no match and we're at the top, use first
  if (!activeSection && sections.length > 0) {
    activeSection = sections[0].link;
  }

  scrollspyLinks.forEach(link => {
    link.classList.remove('active');
  });

  if (activeSection) {
    activeSection.classList.add('active');
  }
}

if (sections.length > 0) {
  window.addEventListener('scroll', updateScrollspy);
  updateScrollspy();
}
