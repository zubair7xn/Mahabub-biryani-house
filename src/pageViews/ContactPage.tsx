'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/AnimationWrappers';
import { restaurantInfo, faqContent } from '../data/restaurant';
import { useState } from 'react';

interface ContactPageProps {
  isDark?: boolean;
  language?: 'en' | 'bn';
}

export function ContactPage({ isDark = false, language = 'en' }: ContactPageProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const businessDays = Object.entries(restaurantInfo.businessHours).map(
    ([day, hours]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      ...hours,
    })
  );

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-12`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Contact Us' : 'আমাদের সাথে যোগাযোগ করুন'}
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'en'
                ? 'We are here to help and answer any question you might have'
                : 'আমরা আপনাকে সাহায্য করতে এবং যেকোনো প্রশ্নের উত্তর দিতে এখানে আছি'}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8 }}
                className={`p-8 rounded-xl text-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'en' ? 'Call Us' : 'আমাদের কল করুন'}
                </h3>
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="text-amber-500 font-semibold hover:text-amber-600 transition-colors block mb-2"
                >
                  {restaurantInfo.phone}
                </a>
                <a
                  href={`tel:${restaurantInfo.phone2}`}
                  className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} transition-colors`}
                >
                  {restaurantInfo.phone2}
                </a>
              </motion.div>
            </StaggerItem>

            {/* Email */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8 }}
                className={`p-8 rounded-xl text-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'en' ? 'Email Us' : 'আমাদের ইমেইল করুন'}
                </h3>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-amber-500 font-semibold hover:text-amber-600 transition-colors block"
                >
                  {restaurantInfo.email}
                </a>
              </motion.div>
            </StaggerItem>

            {/* Address */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8 }}
                className={`p-8 rounded-xl text-center ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'en' ? 'Visit Us' : 'আমাদের দেখুন'}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {restaurantInfo.address}
                </p>
              </motion.div>
            </StaggerItem>
          </div>
        </StaggerContainer>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Map */}
          <ScrollReveal>
            <div className="rounded-xl overflow-hidden shadow-lg h-96">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8194717461437!2d90.28854!3d23.82453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${restaurantInfo.coordinates.lat}%2C${restaurantInfo.coordinates.lng}!5e0!3m2!1sen!2sbd!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </ScrollReveal>

          {/* Business Hours */}
          <ScrollReveal>
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Business Hours' : 'ব্যবসায়িক সময়'}
              </h3>

              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'} mb-6`}>
                <h4 className="font-bold text-amber-500 mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  {language === 'en' ? 'Dine In' : 'ডাইন-ইন'}
                </h4>
                <div className="space-y-2">
                  {businessDays.map((day) => (
                    <div key={day.day} className="flex justify-between items-center">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {day.day}
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {day.open} - {day.close}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Follow Us' : 'আমাদের অনুসরণ করুন'}
              </h4>
              <div className="flex gap-4">
                <a
                  href={restaurantInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Facebook
                </a>
                <a
                  href={restaurantInfo.socialMedia.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={restaurantInfo.socialMedia.whatsappBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Section */}
        <ScrollReveal>
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? 'Frequently Asked Questions' : 'প্রায়শই জিজ্ঞাসিত প্রশ্ন'}
          </h2>

          <div className="space-y-4">
            {faqContent.map((faq, index) => (
              <motion.div
                key={index}
                className={`rounded-lg overflow-hidden ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } shadow-lg`}
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className={`w-full p-6 text-left flex justify-between items-center transition-colors ${
                    expandedFAQ === index
                      ? 'bg-amber-500 text-white'
                      : isDark
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold">{faq.question}</span>
                  <span className="text-2xl">
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </button>

                {expandedFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-6 border-t ${
                      isDark
                        ? 'bg-gray-800 border-gray-700 text-gray-300'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
