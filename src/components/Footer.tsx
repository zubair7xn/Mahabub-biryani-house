'use client';

import Link from 'next/link';
import { Facebook, MessageCircle, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { restaurantInfo } from '../data/restaurant';
import { useThemeLanguage } from './ThemeLanguageProvider';

export function Footer() {
  const { isDark, language } = useThemeLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: language === 'en' ? 'Home' : 'হোম', path: '/' },
    { label: language === 'en' ? 'Menu' : 'মেনু', path: '/menu' },
    { label: language === 'en' ? 'About' : 'সম্পর্কে', path: '/about' },
    { label: language === 'en' ? 'Contact' : 'যোগাযোগ', path: '/contact' },
  ];

  return (
    <footer
      className={`${
        isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-300'
      } pt-16 pb-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">𝓜</span>
              </div>
              <div>
                <div className="font-bold text-white">Mahabub</div>
                <div className="text-xs text-amber-400">Biryani House</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              {language === 'en'
                ? 'Authentic Bangladeshi Restaurant serving traditional flavors since 2012.'
                : '২০১२ সাল থেকে খাঁটি বাংলাদেশী রেস্তোরাঁ সেবা প্রদান করছি।'}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'দ্রুত লিংক'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-gray-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'যোগাযোগ'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-gray-400 hover:text-amber-400 transition-colors break-all"
                >
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{restaurantInfo.address}</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {language === 'en' ? 'Follow Us' : 'আমাদের অনুসরণ করুন'}
            </h3>
            <div className="flex gap-4">
              <a
                href={restaurantInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-amber-400 hover:bg-amber-600 hover:text-white transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href={restaurantInfo.socialMedia.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-amber-400 hover:bg-blue-600 hover:text-white transition-all"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-amber-400 hover:bg-green-600 hover:text-white transition-all"
              >
                <Phone size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>© {currentYear} Mahabub Biryani House. {language === 'en' ? 'All rights reserved.' : 'সর্বাধিকার সংরক্ষিত।'}</p>
            <p className="mt-2">
              {language === 'en'
                ? 'Designed & Built with ❤️ for Food Lovers'
                : 'খাদ্য প্রেমীদের জন্য ❤️ দিয়ে তৈরি'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
