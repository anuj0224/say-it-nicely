export type Theme = 'light' | 'dark' | 'system';

export const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  const isDark = 
    theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  localStorage.setItem('say-it-nicely-theme', theme);
};

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('say-it-nicely-theme') as Theme) || 'system';
};
