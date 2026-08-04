export const restaurantDefaults = {
  name: 'Mahabub Biryani House',
  phone: '+8801740544882',
  phone2: '+8801740544882',
  email: 'info@mahabubbiryanihhouse.com',
  address: 'Rajashon Road, Savar, Dhaka, Bangladesh',
  socialMedia: {
    facebook: 'https://facebook.com/mahabubbiryanihhouse',
    messenger: 'https://m.me/mahabubbiryanihhouse',
    whatsappBusiness: 'https://wa.me/8801740544882',
  },
  // Use a safe maps URL (latitude/longitude) to avoid special characters in the string
  mapsUrl: 'https://www.google.com/maps?q=23.8488246,90.27588',
  coordinates: {
    lat: 23.8488246,
    lng: 90.27588,
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
};
