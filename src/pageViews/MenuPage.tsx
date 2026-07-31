'use client';

import { useState, useMemo } from 'react';
import { MenuItemCard } from '../components/MenuItemCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ScrollReveal } from '../components/AnimationWrappers';
import { useCart } from '../context/CartContext';
import { useMenu } from '../hooks/useMenu';
import { getMenuCategoryOptions } from '../utils/menuCategories';

interface MenuPageProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function MenuPage({ isDark = false, language = 'en' }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: menuItems = [] } = useMenu();
  const { addItem } = useCart();

  const categories = useMemo(() => {
    const availableCategories = menuItems.map((item) => item.category);
    return getMenuCategoryOptions(language, availableCategories);
  }, [language, menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        (item.namebengali &&
          item.namebengali.includes(searchQuery)) ||
        item.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <ScrollReveal className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Our Menu' : 'আমাদের মেনু'}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? 'Discover our delicious selection of authentic Bangladeshi dishes'
              : 'আমাদের খাঁটি বাংলাদেশী খাবারের সুস্বাদু সংগ্রহ আবিষ্কার করুন'}
          </p>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal className="mb-8">
          <div className={`relative ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search dishes...' : 'খাবার খুঁজুন...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border-0 outline-none ${
                isDark
                  ? 'bg-gray-700 text-white placeholder-gray-500'
                  : 'bg-white text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <ScrollReveal className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en'
                ? 'No dishes found matching your search'
                : 'আপনার অনুসন্ধানের সাথে মেলে এমন খাবার নেই'}
            </p>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
