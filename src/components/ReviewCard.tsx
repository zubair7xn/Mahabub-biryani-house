'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  isDark: boolean;
}

export function ReviewCard({ review, isDark }: ReviewCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`p-6 rounded-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>

      {/* Review Text */}
      <p className={`mb-4 italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        &quot;{review.text}&quot;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {review.name}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {review.date}
          </p>
        </div>
        {review.platform && (
          <span className="text-xs px-2 py-1 rounded bg-amber-500 text-white font-medium">
            {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
