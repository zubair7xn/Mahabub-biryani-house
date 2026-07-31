import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { RestaurantSettings } from '../types';

export const restaurantDefaults = {
  name: 'Mahabub Biryani House',
  tagline: 'Authentic Bangladeshi Restaurant specializing in traditional Biryani and street foods.',
  phone: '+880-1234-567890',
  phone2: '+880-1234-567891',
  email: 'info@mahabubbiryanihhouse.com',
  address: 'Rajashon Road, Savar, Dhaka, Bangladesh',
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
  socialMedia: {
    facebook: 'https://facebook.com/mahabubbiryanihhouse',
    messenger: 'https://m.me/mahabubbiryanihhouse',
    whatsappBusiness: 'https://wa.me/8801234567890',
  },
};

export async function getRestaurantSettings(): Promise<RestaurantSettings | null> {
  if (!supabase || !isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase
    .from('restaurant_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn('Restaurant settings query failed, falling back to defaults:', error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    name: data.name,
    tagline: data.tagline,
    phone: data.phone,
    email: data.email,
    address: data.address,
    opening_hours: data.opening_hours,
    facebook_url: data.facebook_url,
    instagram_url: data.instagram_url,
    logo_url: data.logo_url,
  };
}
