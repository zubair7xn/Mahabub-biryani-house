'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from './AnimationWrappers';
import { statistics } from '../data/restaurant';
import { useEffect, useState } from 'react';
import { t } from '../utils/i18n';

interface StatisticsProps {
  isDark: boolean;
  language: 'en' | 'bn';
}

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedNumber({ value, suffix = '', duration = 2 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const increment = value / (duration * 60);
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export function Statistics({ isDark, language }: StatisticsProps) {
  return (
    <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('statistics.title', language)}
          </h2>
        </ScrollReveal>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`text-center p-8 rounded-xl ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all`}
              >
                <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
