export interface MenuItem {
  id: string;
  sl?: number;
  name: string;
  namebengali?: string;
  description: string;
  category: string;
  price: number;
  image: string;
  available?: boolean;
  isPopular?: boolean;
  rating?: number;
  servingSize?: string;
}

export interface RestaurantSettings {
  name: string;
  tagline?: string | null;
  phone?: string | null;
  phone2?: string | null;
  email?: string | null;
  address?: string | null;
  opening_hours?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  messenger_url?: string | null;
  whatsappBusiness?: string | null;
  mapsUrl?: string | null;
  logo_url?: string | null;
  coordinates?: {
    lat: number;
    lng: number;
  };
  businessHours?: Record<string, { open: string; close: string }>;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'restaurant' | 'kitchen' | 'customers' | 'events' | 'drinks';
  title?: string | null;
  caption?: string | null;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  platform?: 'google' | 'local' | 'facebook';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'restaurant' | 'kitchen' | 'customers' | 'events' | 'drinks';
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialNotes?: string;
}

export interface Order {
  id?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalPrice: number;
  specialNotes?: string;
  orderDate?: string;
  estimatedTime?: number;
  paymentMethod?: 'cash' | 'bkash' | 'nagad' | 'card';
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}
