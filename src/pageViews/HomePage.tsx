import { HeroSection } from '../components/HeroSection';
import { Features } from '../components/Features';
import { Statistics } from '../components/Statistics';
import { PopularDishes } from '../components/PopularDishes';
import { ReviewsSection } from '../components/ReviewsSection';

interface HomeProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function HomePage({ isDark = false, language = 'en' }: HomeProps) {
  return (
    <main>
      <HeroSection language={language} />
      <Statistics isDark={isDark} language={language} />
      <Features isDark={isDark} language={language} />
      <PopularDishes isDark={isDark} language={language} />
      <ReviewsSection isDark={isDark} language={language} />
    </main>
  );
}
