const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
  backToTop.classList.toggle('visible', window.scrollY > 420);
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  try { localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark'); } catch { /* Storage may be disabled. */ }
});

try {
  if (localStorage.getItem('portfolio-theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
  }
} catch { /* Storage may be disabled. */ }

document.getElementById('year').textContent = new Date().getFullYear();

// Keep in-page navigation comfortable with the sticky header and mobile dock.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
