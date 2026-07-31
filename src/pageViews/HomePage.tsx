'use client';

import { HeroSection } from '../components/HeroSection';
import { Features } from '../components/Features';
import { Statistics } from '../components/Statistics';
import { PopularDishes } from '../components/PopularDishes';
import { ReviewsSection } from '../components/ReviewsSection';
import { useThemeLanguage } from '../components/ThemeLanguageProvider';

interface HomeProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function HomePage({ isDark, language }: HomeProps) {
  const { isDark: contextIsDark, language: contextLanguage } = useThemeLanguage();

  const resolvedIsDark = isDark ?? contextIsDark;
  const resolvedLanguage = language ?? contextLanguage;

  return (
    <main>
      <HeroSection language={resolvedLanguage} />
      <Statistics isDark={resolvedIsDark} language={resolvedLanguage} />
      <Features isDark={resolvedIsDark} language={resolvedLanguage} />
      <PopularDishes isDark={resolvedIsDark} language={resolvedLanguage} />
      <ReviewsSection isDark={resolvedIsDark} language={resolvedLanguage} />
    </main>
  );
}
