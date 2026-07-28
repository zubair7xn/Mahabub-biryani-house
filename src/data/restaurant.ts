export const restaurantInfo = {
  name: 'Mahabub Biryani House',
  nameBengali: 'মাহবুব বিরিয়ানি হাউস',
  description: 'Authentic Bangladeshi Restaurant specializing in traditional Biryani and street foods.',
  address: 'Rajashon Road, Savar, Dhaka, Bangladesh',
  phone: '+880-1234-567890',
  phone2: '+880-1234-567891',
  whatsapp: '+880-1234-567890',
  email: 'info@mahabubbiryanihhouse.com',
  coordinates: {
    lat: 23.8245,
    lng: 90.2885,
  },
  businessHours: {
    monday: { open: '10:00 AM', close: '11:00 PM' },
    tuesday: { open: '10:00 AM', close: '11:00 PM' },
    wednesday: { open: '10:00 AM', close: '11:00 PM' },
    thursday: { open: '10:00 AM', close: '11:00 PM' },
    friday: { open: '10:00 AM', close: '11:30 PM' },
    saturday: { open: '9:00 AM', close: '11:30 PM' },
    sunday: { open: '9:00 AM', close: '11:00 PM' },
  },
  deliveryHours: {
    monday: { open: '11:00 AM', close: '10:00 PM' },
    tuesday: { open: '11:00 AM', close: '10:00 PM' },
    wednesday: { open: '11:00 AM', close: '10:00 PM' },
    thursday: { open: '11:00 AM', close: '10:00 PM' },
    friday: { open: '11:00 AM', close: '10:30 PM' },
    saturday: { open: '10:00 AM', close: '10:30 PM' },
    sunday: { open: '10:00 AM', close: '10:00 PM' },
  },
  socialMedia: {
    facebook: 'https://facebook.com/mahabubbiryanihhouse',
    messenger: 'm.me/mahabubbiryanihhouse',
    whatsappBusiness: 'https://wa.me/8801234567890',
  },
  deliveryPartners: ['FoodPanda', 'Uber Eats', 'Pathao Food'],
  paymentMethods: ['Cash on Delivery', 'bKash', 'Nagad', 'Rocket', 'Card'],
};

export const statistics = [
  { id: '1', label: 'Years Serving', value: 12 },
  { id: '2', label: 'Happy Customers', value: 45000 },
  { id: '3', label: 'Daily Orders', value: 350 },
  { id: '4', label: 'Average Rating', value: 4.9, suffix: '★' },
];

export const features = [
  {
    id: '1',
    icon: 'Leaf',
    title: 'Fresh Ingredients',
    description: 'Only the finest fresh ingredients, sourced daily from trusted suppliers.',
  },
  {
    id: '2',
    icon: 'Crown',
    title: 'Authentic Recipes',
    description: 'Traditional Bangladeshi recipes passed down through generations.',
  },
  {
    id: '3',
    icon: 'Zap',
    title: 'Fast Delivery',
    description: '30-45 minutes delivery time within service area. Hot food guaranteed.',
  },
  {
    id: '4',
    icon: 'Users',
    title: 'Family Friendly',
    description: 'Safe, welcoming environment for families with spacious dining area.',
  },
  {
    id: '5',
    icon: 'DollarSign',
    title: 'Affordable Pricing',
    description: 'Premium quality at reasonable prices without compromising taste.',
  },
  {
    id: '6',
    icon: 'CheckCircle',
    title: '100% Halal',
    description: 'All meat is halal certified. Prepared with highest food safety standards.',
  },
];

export const aboutContent = {
  story: `Mahabub Biryani House was established in 2012 with a simple mission: to bring authentic Bangladeshi biryani and traditional cuisine to the people of Savar. What started as a small kitchen has grown into one of the most beloved restaurants in the area.

Our founder, Md. Mahabub, was inspired by his grandmother's legendary biryani recipes and the traditional cooking methods she used. He spent years perfecting the craft, experimenting with spice combinations, cooking techniques, and ingredient sourcing to create the perfect balance of flavors.

Today, our restaurant stands as a testament to traditional Bangladeshi culinary excellence. We maintain the same passion and dedication that Md. Mahabub brought on day one.`,

  mission: 'To serve authentic, high-quality Bangladeshi cuisine that brings joy to every family in Savar and beyond. We are committed to using fresh ingredients, maintaining traditional recipes, and providing exceptional service.',

  vision: 'To become the most trusted and loved restaurant in Dhaka, known for our commitment to quality, authenticity, and customer satisfaction. We envision a future where every meal from Mahabub Biryani House is a cherished family moment.',

  whyChooseUs: [
    'Over 12 years of culinary excellence',
    'Traditional recipes with a modern touch',
    'Fresh, locally-sourced ingredients',
    '45,000+ satisfied customers',
    'Fast and reliable delivery',
    'Halal certified food',
    'Family-friendly environment',
    'Affordable premium quality',
  ],
};

export const faqContent = [
  {
    question: 'Do you deliver outside of Savar?',
    answer: 'Currently, we deliver within Savar and surrounding areas of Dhaka. For specific addresses, please call us or check our delivery zone on the website.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Our standard delivery time is 30-45 minutes from the time of order confirmation, depending on your location and time of order.',
  },
  {
    question: 'Can I customize my order?',
    answer: 'Yes! You can specify your preferences such as spice level, meat quantity, and special requests. Please mention them in the special notes section.',
  },
  {
    question: 'Do you have vegetarian options?',
    answer: 'Yes, we offer vegetable biryani, vegetable tehari, samosa, fuchka with potato filling, and various drinks and desserts suitable for vegetarians.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, bKash, Nagad, Rocket, and card payments. Select your preferred method during checkout.',
  },
  {
    question: 'Are your ingredients halal?',
    answer: 'Yes, all our meat is halal certified. We maintain the highest food safety and hygiene standards.',
  },
  {
    question: 'Can I order for events?',
    answer: 'Absolutely! We offer catering for events. Please contact us directly for bulk orders and special arrangements.',
  },
  {
    question: 'Do you have seating for dine-in?',
    answer: 'Yes, we have a comfortable dining area available. You can visit us directly or reserve a table by calling ahead.',
  },
];
