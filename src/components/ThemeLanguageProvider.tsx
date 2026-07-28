'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingButtons } from './FloatingButtons';

interface ThemeLanguageContextValue {
  isDark: boolean;
  language: 'en' | 'bn';
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextValue | null>(null);

export function ThemeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const savedLanguage = window.localStorage.getItem('language');

    if (savedTheme === 'dark') {
      setIsDark(true);
    }

    if (savedLanguage === 'bn') {
      setLanguage('bn');
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      window.localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));

  const contextValue = useMemo(
    () => ({ isDark, language, toggleTheme, toggleLanguage }),
    [isDark, language]
  );

  return (
    <ThemeLanguageContext.Provider value={contextValue}>
      <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white dark:bg-gray-900`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within ThemeLanguageProvider');
  }
  return context;
}
