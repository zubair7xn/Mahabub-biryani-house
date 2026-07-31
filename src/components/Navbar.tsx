'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from './ThemeLanguageProvider';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isDark, language, toggleTheme, toggleLanguage } = useThemeLanguage();
  const cart = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: language === 'en' ? 'Home' : 'হোম', path: '/' },
    { label: language === 'en' ? 'Menu' : 'মেনু', path: '/menu' },
    { label: language === 'en' ? 'Gallery' : 'গ্যালারি', path: '/gallery' },
    { label: language === 'en' ? 'Reviews' : 'রিভিউ', path: '/reviews' },
    { label: language === 'en' ? 'About' : 'সম্পর্কে', path: '/about' },
    { label: language === 'en' ? 'Contact' : 'যোগাযোগ', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${isDark ? 'bg-gray-900 shadow-lg' : 'bg-white shadow-lg'}`
          : `${isDark ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-md`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center">
              <Image src="/logo.png" alt="Mahabub Biryani House" width={64} height={64} className="object-cover object-center" />
            </div>
            <div className="hidden sm:block">
              <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mahabub
              </div>
              <div className="text-xs text-amber-500">Biryani House</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-amber-500'
                    : isDark
                    ? 'text-gray-300 hover:text-amber-400'
                    : 'text-gray-700 hover:text-amber-500'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleLanguage}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-emerald-700 text-white hover:bg-emerald-600'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              }`}
            >
              {language === 'en' ? 'বাংলা' : 'English'}
            </button>

            <Link
              href="/order"
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isDark
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              <div className="relative">
                <ShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 text-xs text-white px-1">
                  {cart.itemCount}
                </span>
              </div>
              <span className="hidden md:inline">{language === 'en' ? 'Order' : 'অর্ডার'}</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <X size={24} className={isDark ? 'text-white' : 'text-gray-900'} />
              ) : (
                <Menu size={24} className={isDark ? 'text-white' : 'text-gray-900'} />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden pb-4 space-y-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-amber-500 text-white'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/order"
              className="block px-4 py-2 rounded-lg bg-amber-500 text-white font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              {language === 'en' ? 'Order Now' : 'এখনই অর্ডার করুন'}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
