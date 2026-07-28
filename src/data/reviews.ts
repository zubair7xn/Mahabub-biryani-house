import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    name: 'আহমেদ করিম',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    rating: 5,
    text: 'অসাধারণ বিরিয়ানি! মাংস অত্যন্ত নরম এবং স্বাদ অবিশ্বাস্য। এটি সারভার সেরা বিরিয়ানি দোকান।',
    date: '2 weeks ago',
    platform: 'google',
  },
  {
    id: '2',
    name: 'সালমা বেগম',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Salma',
    rating: 5,
    text: 'ডেলিভারি খুব দ্রুত এবং খাবার সবসময় গরম থাকে। পরিবার সবাই এটি পছন্দ করে। দুর্দান্ত সেবা!',
    date: '1 week ago',
    platform: 'google',
  },
  {
    id: '3',
    name: 'রফিকুল ইসলাম',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rofiqul',
    rating: 5,
    text: 'খাবারের মান অতুলনীয়। উপাদান একদম তাজা এবং রান্নার প্রক্রিয়া সম্পূর্ণ স্বচ্ছ। দাম খুবই যুক্তিসঙ্গত।',
    date: '3 weeks ago',
    platform: 'google',
  },
  {
    id: '4',
    name: 'ফারিহা খান',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fariha',
    rating: 5,
    text: 'আমার জন্মদিনে অর্ডার করেছিলাম, তারা বিশেষ যত্ন নিয়েছে। খাবার সুস্বাদু এবং উপস্থাপনা চমৎকার।',
    date: '1 month ago',
    platform: 'facebook',
  },
  {
    id: '5',
    name: 'মুহাম্মদ হাসান',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
    rating: 5,
    text: 'কাচ্চি বিরিয়ানি একেবারেই মুখরোচক। প্রতিটি দানা ভিন্ন স্বাদে ভরপুর। এটি অবশ্যই সুপারিশ করি।',
    date: '10 days ago',
    platform: 'google',
  },
  {
    id: '6',
    name: 'নাজমা আক্তার',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nazma',
    rating: 5,
    text: 'তেহারিটি একদম ঐতিহ্যবাহী রেসিপিতে তৈরি। খাদ্যমান এবং স্বাদ অসাধারণ। আমি নিয়মিত গ্রাহক হয়ে উঠেছি।',
    date: '5 days ago',
    platform: 'local',
  },
];

export const averageRating = 4.9;
export const totalReviews = 247;
