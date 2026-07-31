import { reviews, averageRating } from '../data/reviews';
import { ReviewCard } from './ReviewCard';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import { Star, ArrowRight } from 'lucide-react';
import { t } from '../utils/i18n';

interface ReviewsSectionProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

export function ReviewsSection({ isDark, language }: ReviewsSectionProps) {
  return (
    <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <ScrollReveal className="lg:col-span-1">
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('reviews.title', language)}
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {t('reviews.subtitle', language)}
            </p>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {averageRating}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('reviews.count', language).replace('{count}', String(reviews.length))}
              </p>
            </div>

            <Link
              href="/reviews"
              className={`inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg font-bold transition-all ${
                isDark
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {t('reviews.cta', language)}
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2">
            <StaggerContainer>
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review) => (
                  <StaggerItem key={review.id}>
                    <ReviewCard review={review} isDark={isDark} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
