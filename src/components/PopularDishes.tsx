'use client';

import { menuItems } from '../data/menu';
import { MenuItemCard } from './MenuItemCard';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import { ArrowRight } from 'lucide-react';

interface PopularDishesProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

export function PopularDishes({ isDark, language }: PopularDishesProps) {
  const popularItems = menuItems
    .filter((item) => item.isPopular)
    .slice(0, 6);

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Popular Dishes' : 'জনপ্রিয় খাবার'}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? 'Customer favorites handpicked for you'
              : 'গ্রাহকদের পছন্দের খাবার'}
          </p>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularItems.map((item) => (
              <StaggerItem key={item.id}>
                <MenuItemCard
                  item={item}
                  isDark={isDark}
                  language={language}
                />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <ScrollReveal className="flex justify-center">
          <Link
            href="/menu"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
              isDark
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            } hover:shadow-lg hover:shadow-amber-500/50`}
          >
            {language === 'en' ? 'View Full Menu' : 'সম্পূর্ণ মেনু দেখুন'}
            <ArrowRight size={20} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
