'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/AnimationWrappers';
import { aboutContent } from '../data/restaurant';

interface AboutPageProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function AboutPage({ isDark = false, language = 'en' }: AboutPageProps) {
  const timeline = [
    {
      year: '2012',
      title: language === 'en' ? 'Founded' : 'প্রতিষ্ঠা',
      description:
        language === 'en'
          ? 'Mahabub Biryani House opens its doors in Savar with a simple mission to serve authentic Bangladeshi cuisine.'
          : 'মাহবুব বিরিয়ানি হাউস সারভারে তার দরজা খোলে খাঁটি বাংলাদেশী খাবার পরিবেশন করার লক্ষ্যে।',
    },
    {
      year: '2015',
      title: language === 'en' ? 'Expanded' : 'সম্প্রসারণ',
      description:
        language === 'en'
          ? 'Opened a new spacious dining area and increased delivery zone to serve more customers.'
          : 'নতুন বিশাল ডাইনিং এরিয়া খোলা হয় এবং ডেলিভারি এরিয়া বৃদ্ধি পায়।',
    },
    {
      year: '2018',
      title: language === 'en' ? 'Recognized' : 'স্বীকৃতি',
      description:
        language === 'en'
          ? 'Received awards for best biryani restaurant in Savar and became a beloved local brand.'
          : 'সারভারে সেরা বিরিয়ানি রেস্তোরাঁর পুরস্কার পান এবং প্রিয় স্থানীয় ব্র্যান্ড হয়ে ওঠেন।',
    },
    {
      year: '2024',
      title: language === 'en' ? 'Digital Era' : 'ডিজিটাল যুগ',
      description:
        language === 'en'
          ? 'Launched online ordering platform and website to serve customers better.'
          : 'অনলাইন অর্ডারিং প্ল্যাটফর্ম এবং ওয়েবসাইট চালু করেন।',
    },
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-12`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en'
                ? 'A journey of authentic flavors and passionate cooking'
                : 'খাঁটি স্বাদ এবং যত্নশীল রান্নার যাত্রা'}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <ScrollReveal className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Our Story' : 'আমাদের গল্প'}
          </h2>
          <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {aboutContent.story}
          </p>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal>
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-amber-500`}>
                {language === 'en' ? 'Our Mission' : 'আমাদের লক্ষ্য'}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {aboutContent.mission}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-amber-500`}>
                {language === 'en' ? 'Our Vision' : 'আমাদের দৃষ্টিভঙ্গি'}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {aboutContent.vision}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <ScrollReveal className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Our Journey' : 'আমাদের যাত্রা'}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            ></div>

            {/* Timeline items */}
            <StaggerContainer>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <StaggerItem key={item.year}>
                    <div className={`flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-1/2"></div>
                      <div className="relative w-1/2">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 border-4 border-white rounded-full"></div>
                        <motion.div
                          whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                          className={`p-6 rounded-lg ${
                            isDark ? 'bg-gray-800' : 'bg-gray-50'
                          } shadow-lg`}
                        >
                          <p className="text-amber-500 font-bold text-lg mb-1">{item.year}</p>
                          <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.title}
                          </p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            {item.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Why Choose Us */}
        <ScrollReveal>
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Why Choose Us' : 'কেন আমাদের বেছে নিন'}
          </h2>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutContent.whyChooseUs.map((reason, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      isDark ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-amber-500" />
                    </div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {reason}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </main>
  );
}
