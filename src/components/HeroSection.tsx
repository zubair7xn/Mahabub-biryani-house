'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { t } from '../utils/i18n';
import heroImg from '../../hero/hero.png';

const heroSrc = typeof heroImg === 'string' ? heroImg : (heroImg as { src: string }).src;

interface HeroSectionProps {
  language: 'en' | 'bn';
}

export function HeroSection({ language }: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroSrc})`,
          filter: 'blur(3px)',
        }}
      >
        <div className="absolute inset-0 bg-amber-600 bg-opacity-55 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold text-white mb-3 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t('hero.restaurantName', language)}
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-amber-100 uppercase tracking-[0.4em] mb-6 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('hero.headline', language)}
          </motion.p>

          <motion.p
            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {t('hero.subheadline', language)}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg transition-all hover:shadow-lg hover:shadow-amber-500/50"
            >
              {t('hero.orderBtn', language)}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-lg rounded-lg transition-all"
            >
              {t('hero.menuBtn', language)}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-sm">
            {t('hero.scrollHint', language)}
          </span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
