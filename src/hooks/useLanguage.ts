import { useState, useEffect } from 'react';

export function useLanguage() {
  const [isThaiLanguage, setIsThaiLanguage] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    setIsThaiLanguage(savedLanguage === 'th');
  }, []);

  const toggleLanguage = () => {
    const newLanguage = !isThaiLanguage;
    setIsThaiLanguage(newLanguage);
    localStorage.setItem('language', newLanguage ? 'th' : 'en');
  };

  return { isThaiLanguage, toggleLanguage };
}