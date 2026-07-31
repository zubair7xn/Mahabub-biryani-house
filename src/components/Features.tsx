'use client';

import { motion } from 'framer-motion';
import {
  Leaf,
  Crown,
  Zap,
  Users,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import { features } from '../data/restaurant';
import { t } from '../utils/i18n';

const iconMap: { [key: string]: React.ReactNode } = {
  Leaf: <Leaf size={32} />,
  Crown: <Crown size={32} />,
  Zap: <Zap size={32} />,
  Users: <Users size={32} />,
  DollarSign: <DollarSign size={32} />,
  CheckCircle: <CheckCircle size={32} />,
};

interface FeaturesProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

export function Features({ isDark, language }: FeaturesProps) {
  return (
    <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('features.title', language)}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? 'Experience the finest in authentic Bengali cuisine'
              : 'খাঁটি বাংলা রন্ধনশৈলীতে সেরা অভিজ্ঞতা নিন'}
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.id}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)' }}
                  className={`p-8 rounded-xl ${
                    isDark ? 'bg-gray-700' : 'bg-white'
                  } shadow-lg transition-all duration-300`}
                >
                  <motion.div
                    className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {iconMap[feature.icon]}
                  </motion.div>

                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>

                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
