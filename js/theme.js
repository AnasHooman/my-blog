const STORAGE_KEY = 'blog-theme';

export function initThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const sync = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    button.textContent = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  sync();

  button.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
    sync();
  });
}
