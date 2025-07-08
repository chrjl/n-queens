const searchParams = new URLSearchParams(document.location.search);
const theme = searchParams.get('theme');
const prefersDark =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

const setTheme = () => {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (theme === 'dark' || prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
};

export default setTheme;
