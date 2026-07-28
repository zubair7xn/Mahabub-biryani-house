// Language translations
export const translations = {
  en: {
    nav: {
      home: 'Home',
      menu: 'Menu',
      gallery: 'Gallery',
      reviews: 'Reviews',
      about: 'About',
      contact: 'Contact',
      orderNow: 'Order Now',
    },
    hero: {
      headline: 'The Taste of Authentic Bangladeshi Biryani',
      subheadline: 'Serving Savar with authentic flavors, premium ingredients, and unforgettable taste.',
      orderBtn: 'Order Now',
      menuBtn: 'View Menu',
    },
    features: {
      title: 'Why Choose Us',
    },
    menu: {
      title: 'Our Menu',
      search: 'Search dishes...',
      all: 'All',
      biryani: 'Biryani',
      tehari: 'Tehari',
      snacks: 'Snacks',
      drinks: 'Drinks',
      desserts: 'Desserts',
      popular: 'Popular',
      addToCart: 'Add to Cart',
    },
    footer: {
      quickLinks: 'Quick Links',
      contact: 'Contact',
      openingHours: 'Opening Hours',
      copyright: '© 2024 Mahabub Biryani House. All rights reserved.',
    },
    contact: {
      title: 'Get In Touch',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      hours: 'Business Hours',
      delivery: 'Delivery Hours',
      callToOrder: 'Call to Order',
      whatsappOrder: 'Order on WhatsApp',
      location: 'Restaurant Location',
    },
    order: {
      title: 'Place Your Order',
      name: 'Full Name',
      phone: 'Phone Number',
      address: 'Delivery Address',
      items: 'Select Items',
      quantity: 'Quantity',
      notes: 'Special Notes',
      estimatedTime: 'Estimated Preparation Time',
      placeOrder: 'Place Order',
      callOrder: 'Call to Order',
      whatsappOrder: 'Order on WhatsApp',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      menu: 'মেনু',
      gallery: 'গ্যালারি',
      reviews: 'রিভিউ',
      about: 'সম্পর্কে',
      contact: 'যোগাযোগ',
      orderNow: 'এখনই অর্ডার করুন',
    },
    hero: {
      headline: 'খাঁটি বাংলাদেশী বিরিয়ানির স্বাদ',
      subheadline: 'সারভারকে খাঁটি স্বাদ, প্রিমিয়াম উপাদান এবং অবিস্মরণীয় স্বাদ দিয়ে সেবা করছি।',
      orderBtn: 'এখনই অর্ডার করুন',
      menuBtn: 'মেনু দেখুন',
    },
    features: {
      title: 'আমাদের বিশেষত্ব',
    },
    menu: {
      title: 'আমাদের মেনু',
      search: 'খাবার খুঁজুন...',
      all: 'সবকিছু',
      biryani: 'বিরিয়ানি',
      tehari: 'তেহারি',
      snacks: 'খাবার',
      drinks: 'পানীয়',
      desserts: 'মিষ্টি',
      popular: 'জনপ্রিয়',
      addToCart: 'কার্টে যোগ করুন',
    },
    footer: {
      quickLinks: 'দ্রুত লিংক',
      contact: 'যোগাযোগ',
      openingHours: 'খোলার সময়',
      copyright: '© ২০২৪ মাহবুব বিরিয়ানি হাউস। সর্বাধিকার সংরক্ষিত।',
    },
    contact: {
      title: 'আমাদের সাথে যোগাযোগ করুন',
      phone: 'ফোন',
      email: 'ইমেইল',
      address: 'ঠিকানা',
      hours: 'ব্যবসায়িক সময়',
      delivery: 'ডেলিভারি সময়',
      callToOrder: 'অর্ডারের জন্য কল করুন',
      whatsappOrder: 'হোয়াটসঅ্যাপে অর্ডার করুন',
      location: 'রেস্তোরাঁর অবস্থান',
    },
    order: {
      title: 'আপনার অর্ডার করুন',
      name: 'পূর্ণ নাম',
      phone: 'ফোন নম্বর',
      address: 'ডেলিভারি ঠিকানা',
      items: 'আইটেম নির্বাচন করুন',
      quantity: 'পরিমাণ',
      notes: 'বিশেষ মন্তব্য',
      estimatedTime: 'আনুমানিক প্রস্তুতির সময়',
      placeOrder: 'অর্ডার করুন',
      callOrder: 'অর্ডারের জন্য কল করুন',
      whatsappOrder: 'হোয়াটসঅ্যাপে অর্ডার করুন',
    },
  },
};

export type Language = 'en' | 'bn';

type TranslationValue = string | Record<string, unknown>;

export const t = (key: string, lang: Language = 'en'): string => {
  const keys = key.split('.');
  let value: TranslationValue = translations[lang] as TranslationValue;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k] as TranslationValue;
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
};
