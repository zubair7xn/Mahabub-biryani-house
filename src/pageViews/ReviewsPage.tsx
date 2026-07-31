'use client';

import { reviews, averageRating, totalReviews } from '../data/reviews';
import { ReviewCard } from '../components/ReviewCard';
import { Review } from '../types';
import { Star } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/AnimationWrappers';
import { restaurantDefaults } from '../data/restaurantDefaults';
import { FormEvent, useState } from 'react';

interface ReviewsPageProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function ReviewsPage({ isDark = false, language = 'en' }: ReviewsPageProps) {
  const [sortBy, setSortBy] = useState('recent');
  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      return;
    }

    const newReview: Review = {
      id: `${Date.now()}`,
      name: name.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      rating,
      text: text.trim(),
      date: language === 'en' ? 'Just now' : 'এখনই',
      platform: 'local',
    };

    setReviewList([newReview, ...reviewList]);
    setName('');
    setRating(5);
    setText('');
    setSubmitted(true);

    window.setTimeout(() => setSubmitted(false), 4000);
  };

  const sortedReviews = [...reviewList].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return Number(b.id) - Number(a.id);
  });

  const displayedReviews = sortedReviews.slice(0, 20);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <ScrollReveal className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Customer Reviews' : 'গ্রাহক রিভিউ'}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? 'What our customers think about us'
              : 'আমাদের সম্পর্কে গ্রাহকদের মতামত'}
          </p>
        </ScrollReveal>

        {/* Rating Summary */}
        <ScrollReveal className={`p-8 rounded-xl mb-12 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={28}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {averageRating} / 5.0
              </p>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'en'
                  ? `Based on ${totalReviews}+ reviews`
                  : `${totalReviews}+ রিভিউর উপর ভিত্তি করে`}
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3 w-48">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className={`h-2 flex-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{
                        width: `${Math.random() * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sort Options */}
        <ScrollReveal className="mb-8 flex justify-between items-center">
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'en'
              ? `Showing ${reviews.length} reviews`
              : `${reviews.length}টি রিভিউ দেখছেন`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-lg border-0 outline-none font-medium ${
              isDark
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <option value="recent">
              {language === 'en' ? 'Most Recent' : 'সর্বশেষ'}
            </option>
            <option value="highest">
              {language === 'en' ? 'Highest Rated' : 'সর্বোচ্চ রেটিং'}
            </option>
            <option value="lowest">
              {language === 'en' ? 'Lowest Rated' : 'সর্বনিম্ন রেটিং'}
            </option>
          </select>
        </ScrollReveal>

        {/* Review Submission Form */}
        <ScrollReveal className={`mb-12 p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Leave a Review' : 'রিভিউ লিখুন'}
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            {language === 'en'
              ? 'Share your experience directly on our website, or leave a Google review too.'
              : 'আমাদের ওয়েবসাইটে সরাসরি আপনার অভিজ্ঞতা শেয়ার করুন, বা Google-এ রিভিউ দিন।'}
          </p>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="space-y-2">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'en' ? 'Your Name' : 'আপনার নাম'}
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your name' : 'আপনার নাম লিখুন'}
                  className={`w-full rounded-lg border p-3 outline-none ${
                    isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </label>

              <label className="space-y-2">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'en' ? 'Rating' : 'রেটিং'}
                </span>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className={`w-full rounded-lg border p-3 outline-none ${
                    isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} {language === 'en' ? 'Star' : 'তারকা'}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Review' : 'রিভিউ'}
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                placeholder={language === 'en' ? 'Write your review here...' : 'এখানে আপনার রিভিউ লিখুন...'}
                className={`w-full rounded-lg border p-3 outline-none resize-none ${
                  isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
            >
              {language === 'en' ? 'Submit Review' : 'রিভিউ জমা দিন'}
            </button>
            {submitted && (
              <p className={`text-sm font-medium ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                {language === 'en' ? 'Thanks! Your review is now visible on the site.' : 'ধন্যবাদ! আপনার রিভিউ এখন সাইটে প্রদর্শিত হবে।'}
              </p>
            )}
          </form>
        </ScrollReveal>

        {/* Reviews Grid */}
        <StaggerContainer>
          <div className="space-y-4">
            {displayedReviews.map((review) => (
              <StaggerItem key={review.id}>
                <ReviewCard review={review} isDark={isDark} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* CTA Section */}
        <ScrollReveal
          className={`mt-16 p-8 rounded-xl text-center ${
            isDark ? 'bg-gradient-to-r from-amber-900 to-amber-800' : 'bg-gradient-to-r from-amber-400 to-amber-500'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-white'}`}>
            {language === 'en'
              ? 'Have you tried our food?'
              : 'আপনি কি আমাদের খাবার চেষ্টা করেছেন?'}
          </h3>
          <p className={`mb-4 ${isDark ? 'text-amber-100' : 'text-white'}`}>
            {language === 'en'
              ? 'Share your experience with us!'
              : 'আমাদের সাথে আপনার অভিজ্ঞতা শেয়ার করুন!'}
          </p>
          <a
            href={restaurantDefaults.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-white text-amber-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {language === 'en' ? 'Leave a Review' : 'রিভিউ লিখুন'}
          </a>
        </ScrollReveal>
      </div>
    </main>
  );
}
