"use client";

import { MenuItemCard } from './MenuItemCard';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../hooks/useMenu';
import { t } from '../utils/i18n';
import { MenuItem } from '../types';

interface PopularDishesProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

export function PopularDishes({ isDark, language }: PopularDishesProps) {
  const { data: menuItems = [] } = useMenu();
  const { addItem } = useCart();

  // Get raw popular items and explicitly include key favorites
  const explicitFavorites = menuItems.filter((item) =>
    ['fuckha', 'chotpoti'].includes(item.id.toLowerCase()) ||
    /fuckha|fuchka|chotpoti/i.test(item.name)
  );

  const rawPopular: MenuItem[] = [
    ...menuItems.filter((item) => item.isPopular),
    ...explicitFavorites,
  ].filter((item, index, arr) => index === arr.findIndex((next) => next.id === item.id));

  // Group variants by normalized name and prefer 'half' variants when present
  const groups = new Map<string, MenuItem[]>();
  rawPopular.forEach((item) => {
    const normalized = item.name.replace(/\b(full|half|full-sized|half-sized)\b/gi, '').replace(/[()]/g, '').trim().toLowerCase();
    groups.set(normalized, (groups.get(normalized) || []).concat(item));
  });

  const deduped = new Map<string, MenuItem>();
  groups.forEach((items) => {
    // compute a stricter normalized key for final grouping: remove parentheticals, variant words, punctuation, and digits
    const normalized = items[0].name
      .replace(/\(.*?\)/g, '')
      .replace(/\b(full|half|full-sized|half-sized)\b/gi, '')
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\d+/g, '')
      .trim()
      .toLowerCase();

    // prefer explicit 'half' in name/id/servingSize
    const half = items.find((i) => /\bhalf\b/i.test(i.name) || /-half\b/i.test(i.id) || /\bhalf\b/i.test(i.servingSize || ''));
    if (half) {
      deduped.set(normalized, half);
      return;
    }

    // fallback: pick the item with lowest price (heuristic for 'half')
    const byPrice = items.slice().sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    deduped.set(normalized, byPrice[0]);
  });

  // Replace certain full/duplicate items with snacks if available
  const fuckhaItem = menuItems.find((m) => m.id === 'fuckha' || /fuchka|fuckha/i.test(m.name));

  const processed = Array.from(deduped.values()).map((item) => {
    // Replace any chicken biryani variant with the requested 'fuckha' when available
    if (/chicken\s*biryani/i.test(item.name) || /chicken-biryani/i.test(item.id)) {
      return fuckhaItem ?? item;
    }

    return item;
  });

  // Final de-duplication by normalized name to ensure only one variant appears
  const uniqueByNormalized = new Map<string, MenuItem>();
  for (const item of processed) {
    const key = item.name
      .replace(/\(.*?\)/g, '')
      .replace(/\b(full|half|full-sized|half-sized)\b/gi, '')
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\d+/g, '')
      .trim()
      .toLowerCase();
    if (!uniqueByNormalized.has(key)) uniqueByNormalized.set(key, item);
  }

  const preferredIds = ['fuckha', 'chotpoti'];
  const prioritizedItems: MenuItem[] = [];
  const remainingItems: MenuItem[] = [];

  Array.from(uniqueByNormalized.values()).forEach((item) => {
    const normalizedId = item.id.toLowerCase();
    const normalizedName = item.name.toLowerCase();

    if (preferredIds.includes(normalizedId) || /fuckha|fuchka/.test(normalizedName) || /chotpoti/.test(normalizedName)) {
      prioritizedItems.push(item);
      return;
    }

    remainingItems.push(item);
  });

  const popularItems = [
    ...prioritizedItems,
    ...remainingItems,
  ].slice(0, 6);

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('popular.title', language)}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('popular.subtitle', language)}
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
                  onAddToCart={() =>
                    addItem({
                      menuItemId: item.id,
                      name: language === 'en' ? item.name : item.namebengali || item.name,
                      price: item.price,
                      quantity: 1,
                    })
                  }
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
            {t('popular.viewAll', language)}
            <ArrowRight size={20} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
