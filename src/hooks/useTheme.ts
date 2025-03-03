import { useState, useEffect } from 'react';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    setDarkMode(savedTheme === null ? true : savedTheme === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return { darkMode, setDarkMode };
}