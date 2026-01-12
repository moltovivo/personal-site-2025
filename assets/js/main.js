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

// Photo Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const photoItems = document.querySelectorAll('.photo-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    photoItems.forEach(item => {
      if (filter === 'all' || item.dataset.tag === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let currentPhotoIndex = 0;
let visiblePhotos = [];

function updateVisiblePhotos() {
  visiblePhotos = Array.from(photoItems).filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  updateVisiblePhotos();
  currentPhotoIndex = index;
  const item = visiblePhotos[index];
  const img = item.querySelector('.photo-image');
  const caption = item.querySelector('.photo-caption p');

  lightboxImage.src = img.src;
  lightboxCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentPhotoIndex = (currentPhotoIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  openLightbox(currentPhotoIndex);
}

function showNext() {
  currentPhotoIndex = (currentPhotoIndex + 1) % visiblePhotos.length;
  openLightbox(currentPhotoIndex);
}

photoItems.forEach(item => {
  item.addEventListener('click', () => {
    updateVisiblePhotos();
    const index = visiblePhotos.indexOf(item);
    if (index !== -1) openLightbox(index);
  });
});

if (lightbox) {
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', showPrev);
  document.querySelector('.lightbox-next').addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

// See All Button Functionality
const podcastsSeeAll = document.getElementById('podcastsSeeAll');
const writingSeeAll = document.getElementById('writingSeeAll');

if (podcastsSeeAll) {
  podcastsSeeAll.addEventListener('click', () => {
    const extraItems = document.querySelectorAll('.podcast-extra');
    extraItems.forEach(item => item.classList.add('visible'));
    podcastsSeeAll.classList.add('expanded');
  });
}

if (writingSeeAll) {
  writingSeeAll.addEventListener('click', () => {
    const extraItems = document.querySelectorAll('.article-extra');
    extraItems.forEach(item => item.classList.add('visible'));
    writingSeeAll.classList.add('expanded');
  });
}

// GitHub Carousel
const githubItems = document.querySelectorAll('.github-carousel-item');
const githubPrev = document.querySelector('.github-prev');
const githubNext = document.querySelector('.github-next');
let currentGithubIndex = 0;

function showGithubItem(index) {
  githubItems.forEach(item => item.classList.remove('active'));
  githubItems[index].classList.add('active');
}

if (githubPrev && githubNext && githubItems.length > 0) {
  githubPrev.addEventListener('click', () => {
    currentGithubIndex = (currentGithubIndex - 1 + githubItems.length) % githubItems.length;
    showGithubItem(currentGithubIndex);
  });

  githubNext.addEventListener('click', () => {
    currentGithubIndex = (currentGithubIndex + 1) % githubItems.length;
    showGithubItem(currentGithubIndex);
  });
}

// Career Map Interaction
const timelineItems = document.querySelectorAll('.timeline li[data-location]');
const locationPins = document.querySelectorAll('.location-pins .pin');

// Location coordinates (latitude, longitude)
const locations = {
  'new-york': { lat: 40.7128, lon: -74.0060 },
  'binghamton': { lat: 42.0987, lon: -75.9180 },
  'hartford': { lat: 41.7658, lon: -72.6734 },
  'atlanta': { lat: 33.7490, lon: -84.3880 },
  'amsterdam': { lat: 52.3676, lon: 4.9041 },
  'moscow': { lat: 55.7558, lon: 37.6173 },
  'dublin': { lat: 53.3498, lon: -6.2603 }
};

// Position pins based on coordinates using equirectangular projection
const svgWidth = 800;
const svgHeight = 400;

locationPins.forEach(pin => {
  const loc = pin.getAttribute('data-location');
  if (locations[loc]) {
    const coords = locations[loc];
    // Convert lat/lon to SVG coordinates
    const x = (coords.lon + 180) * (svgWidth / 360);
    const y = (90 - coords.lat) * (svgHeight / 180);
    pin.setAttribute('cx', x);
    pin.setAttribute('cy', y);
  }
});

// Set active location pin
function setActiveLocation(location) {
  locationPins.forEach(pin => {
    if (pin.getAttribute('data-location') === location) {
      pin.classList.add('active');
    } else {
      pin.classList.remove('active');
    }
  });
}

// Set default to first location (New York) on page load
if (timelineItems.length > 0) {
  const firstLocation = timelineItems[0].getAttribute('data-location');
  if (firstLocation) {
    setActiveLocation(firstLocation);
  }
}

// Add hover listeners to timeline items
timelineItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const location = item.getAttribute('data-location');
    setActiveLocation(location);
  });
});
