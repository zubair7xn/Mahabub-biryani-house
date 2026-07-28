'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/helpers';

interface MenuItemCardProps {
  item: MenuItem;
  isDark: boolean;
  language: 'en' | 'bn';
  showRating?: boolean;
}

export function MenuItemCard({
  item,
  isDark,
  language,
  showRating = true,
}: MenuItemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`rounded-xl overflow-hidden ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {item.isPopular && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {language === 'en' ? 'Popular' : 'জনপ্রিয়'}
          </div>
        )}
        {item.servingSize && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
            {item.servingSize}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {item.name}
          </h3>
          {item.namebengali && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.namebengali}
            </p>
          )}
        </div>

        <p
          className={`text-sm mb-3 line-clamp-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {item.description}
        </p>

        {showRating && item.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(item.rating!)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-400'
                }
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({item.rating})</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-amber-500">
            {formatPrice(item.price)}
          </span>
          <Link
            href="/order"
            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-colors"
          >
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
