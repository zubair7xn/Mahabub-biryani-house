'use client';

import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRestaurantSettings } from '../hooks/useRestaurantSettings';
import { restaurantDefaults } from '../data/restaurantDefaults';
import { useThemeLanguage } from './ThemeLanguageProvider';

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { isDark } = useThemeLanguage();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const { data: settings } = useRestaurantSettings();

  return (
    <>
      <motion.a
        href={settings?.whatsappBusiness ?? restaurantDefaults.socialMedia.whatsappBusiness}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-32 right-4 sm:right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>

      <motion.a
        href={`tel:${settings?.phone ?? restaurantDefaults.phone}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-20 right-4 sm:right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
        } text-white`}
        aria-label="Call us"
      >
        <Phone size={24} />
      </motion.a>

      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className={`fixed bottom-6 right-4 sm:right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
            isDark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
          } text-white`}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </>
  );
}
