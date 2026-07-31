import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { Database } from '../../lib/supabase-types';
import type { MenuItem } from '../types';

interface MenuRow {
  id: string;
  sl: number;
  name_en: string;
  name_bn: string;
  description_en: string | null;
  description_bn: string | null;
  category: string;
  price: number;
  image_url?: string | null;
  available: boolean;
  is_popular: boolean;
  sort_order: number;
}

const itemCategories: Record<string, MenuItem['category']> = {
  biryani: 'biryani',
  biriani: 'biryani',
  polao: 'biryani',
  tehari: 'tehari',
  tehar: 'tehari',
  naan: 'snacks',
  haleem: 'snacks',
  kabab: 'snacks',
  fry: 'snacks',
  chaap: 'snacks',
  yogurt: 'drinks',
  borhani: 'drinks',
  chotpoti: 'snacks',
  fuchka: 'snacks',
  samosa: 'snacks',
  drink: 'drinks',
  lassi: 'drinks',
  iced: 'drinks',
  sweet: 'desserts',
  khir: 'desserts',
  firni: 'desserts',
  golapjamun: 'desserts',
  burhani: 'drinks',
};

function normalizeMenuCategory(value?: string | null): string {
  const normalizedValue = (value ?? '').trim().toLowerCase();

  if (!normalizedValue || normalizedValue === 'uncategorized') {
    return 'snacks';
  }

  const matchedCategory = Object.entries(itemCategories).find(([term]) =>
    normalizedValue.includes(term),
  );

  return matchedCategory ? matchedCategory[1] : normalizedValue;
}

const fallbackImages: Record<string, string> = {
  biryani: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510a8?w=800&q=80',
  tehari: 'https://images.unsplash.com/photo-1585937421612-70a19fb6b537?w=800&q=80',
  snacks: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=800&q=80',
  drinks: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  desserts: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
};

const menuDescriptions: Record<string, string> = {
  'Beef Tehari (Half)': 'A rich beef tehari half portion with fragrant rice and traditional spices.',
  'Beef Tehari (Full)': 'A full portion of beef tehari cooked with aromatic spices and long-grain rice.',
  'Chicken Biryani (Half)': 'A half portion of tender chicken biryani with saffron and fragrant rice.',
  'Chicken Biryani (Full)': 'A full portion of classic chicken biryani with special masala.',
  'Morog Polao (Half)': 'A half portion of soft chicken polao with rich aromatic spices.',
  'Morog Polao (Full)': 'A full portion of chicken polao with vibrant flavor and tender meat.',
  'Naan Roti': 'Soft naan roti baked fresh in the tandoor and served warm.',
  'Haleem Half Box (Parcel)': 'A half box of slow-cooked haleem packed for easy takeaway.',
  'Haleem Full Box (Parcel)': 'A full box of hearty haleem for sharing.',
  'Haleem Half Bowl': 'A half bowl of creamy haleem with rich spices.',
  'Haleem Full Bowl': 'A full bowl of haleem packed with flavor.',
  'Chicken Kathi Kabab': 'Spiced chicken kabab wrapped in flatbread with chutney.',
  'Chicken Fry': 'Crispy chicken fry seasoned with traditional spices.',
  'Chicken Chaap': 'Juicy chicken chaap cooked until tender and golden.',
  'Butter Naan': 'Fluffy butter naan brushed with melted butter.',
  'Grill Chicken (Quarter)': 'A quarter portion of perfectly grilled chicken.',
  'Grill Chicken (Half)': 'A half portion of grilled chicken with smoky flavor.',
  'Grill Chicken (Full)': 'A full grilled chicken with rich spices and crisp skin.',
  'Sweet Yogurt (Per Cup)': 'Creamy sweet yogurt served chilled in a cup.',
  'Borhani (Per Glass)': 'Refreshing borhani served in a glass with spices.',
  'Borhani (1 Liter)': 'A liter of signature borhani for family meals.',
  'Chotpoti (Half Plate)': 'A half plate of tangy chotpoti with crunchy toppings.',
  'Chotpoti (Full Plate)': 'A full plate of chotpoti for a satisfying snack.',
  'Doi Fuchka (Half Plate)': 'Half plate of yogurt fuchka with sweet and tangy sauce.',
  'Doi Fuchka (Full Plate)': 'Full plate of creamy doi fuchka with crisp shells.',
  'Fuchka (Half Plate)': 'Half plate of crispy fuchka with spicy filling.',
  'Fuchka (Full Plate)': 'Full plate of fuchka with bold flavour.',
};

const popularSlIds = new Set([1, 2, 3, 4, 6, 8, 10, 11]);

function mapMenuRow(row: MenuRow): MenuItem {
  const normalizedName = row.name_en.trim();
  const categoryKey = Object.entries(itemCategories).find(([term]) =>
    normalizedName.toLowerCase().includes(term)
  );
  const hasExplicitCategory = Boolean(row.category?.trim()) && !row.category?.trim().toLowerCase().includes('uncategorized');
  const category = hasExplicitCategory
    ? normalizeMenuCategory(row.category)
    : (categoryKey ? categoryKey[1] : 'snacks');
  const image = row.image_url || fallbackImages[category] || fallbackImages.snacks;
  const description = menuDescriptions[normalizedName] || `Enjoy our ${normalizedName} prepared fresh with authentic spices.`;
  const servingSize = normalizedName.includes('Half')
    ? 'Half portion'
    : normalizedName.includes('Full')
    ? 'Full portion'
    : normalizedName.includes('Per Cup') || normalizedName.includes('Per Glass')
    ? 'Single serving'
    : normalizedName.includes('1 Liter')
    ? '1 Liter'
    : 'Serves 1';

  return {
    id: row.id,
    sl: row.sl,
    name: normalizedName,
    namebengali: row.name_bn,
    price: row.price,
    image,
    available: row.available,
    category,
    description,
    isPopular: popularSlIds.has(row.sl),
    rating: 4.7,
    servingSize,
  };
}

const seedItems: Database['public']['Tables']['menu_items']['Insert'][] = [
  { sl: 1, name_en: 'Beef Tehari (Half)', name_bn: 'গরুর তেহারী হাফ', price: 160, image_url: null, available: true },
  { sl: 2, name_en: 'Beef Tehari (Full)', name_bn: 'গরুর তেহারী ফুল', price: 220, image_url: null, available: true },
  { sl: 3, name_en: 'Chicken Biryani (Half)', name_bn: 'চিকেন বিরিয়ানি হাফ', price: 90, image_url: null, available: true },
  { sl: 4, name_en: 'Chicken Biryani (Full)', name_bn: 'চিকেন বিরিয়ানি ফুল', price: 180, image_url: null, available: true },
  { sl: 5, name_en: 'Morog Polao (Half)', name_bn: 'মোরগ পোলাউ হাফ', price: 160, image_url: null, available: true },
  { sl: 6, name_en: 'Morog Polao (Full)', name_bn: 'মোরগ পোলাউ ফুল', price: 310, image_url: null, available: true },
  { sl: 7, name_en: 'Naan Roti', name_bn: 'নান রুটি', price: 20, image_url: null, available: true },
  { sl: 8, name_en: 'Haleem Half Box (Parcel)', name_bn: 'হালিম হাফ বক্স (পার্সেল)', price: 100, image_url: null, available: true },
  { sl: 9, name_en: 'Haleem Full Box (Parcel)', name_bn: 'হালিম ফুল বক্স (পার্সেল)', price: 200, image_url: null, available: true },
  { sl: 10, name_en: 'Haleem Half Bowl', name_bn: 'হালিম হাফ বাটি', price: 60, image_url: null, available: true },
  { sl: 11, name_en: 'Haleem Full Bowl', name_bn: 'হালিম ফুল বাটি', price: 100, image_url: null, available: true },
  { sl: 12, name_en: 'Chicken Kathi Kabab', name_bn: 'চিকেন কাটি কাবাব', price: 60, image_url: null, available: true },
  { sl: 13, name_en: 'Chicken Fry', name_bn: 'চিকেন ফ্রাই', price: 60, image_url: null, available: true },
  { sl: 14, name_en: 'Chicken Chaap', name_bn: 'চিকেন চাপ', price: 130, image_url: null, available: true },
  { sl: 15, name_en: 'Butter Naan', name_bn: 'বাটার নান', price: 30, image_url: null, available: true },
  { sl: 16, name_en: 'Grill Chicken (Quarter)', name_bn: 'গ্রিল কোয়ার্টার', price: 110, image_url: null, available: true },
  { sl: 17, name_en: 'Grill Chicken (Half)', name_bn: 'গ্রিল হাফ', price: 210, image_url: null, available: true },
  { sl: 18, name_en: 'Grill Chicken (Full)', name_bn: 'গ্রিল ফুল', price: 420, image_url: null, available: true },
  { sl: 19, name_en: 'Sweet Yogurt (Per Cup)', name_bn: 'দই প্রতি কাপ', price: 40, image_url: null, available: true },
  { sl: 20, name_en: 'Borhani (Per Glass)', name_bn: 'বোরহানি প্রতি গ্লাস', price: 40, image_url: null, available: true },
  { sl: 21, name_en: 'Borhani (1 Liter)', name_bn: 'বোরহানি ১ লিটার', price: 150, image_url: null, available: true },
  { sl: 22, name_en: 'Chotpoti (Half Plate)', name_bn: 'চটপটি হাফ প্লেট', price: 50, image_url: null, available: true },
  { sl: 23, name_en: 'Chotpoti (Full Plate)', name_bn: 'চটপটি ফুল প্লেট', price: 80, image_url: null, available: true },
  { sl: 24, name_en: 'Doi Fuchka (Half Plate)', name_bn: 'দই ফুচকা হাফ প্লেট', price: 100, image_url: null, available: true },
  { sl: 25, name_en: 'Doi Fuchka (Full Plate)', name_bn: 'দই ফুচকা ফুল প্লেট', price: 200, image_url: null, available: true },
  { sl: 26, name_en: 'Fuchka (Half Plate)', name_bn: 'ফুচকা হাফ প্লেট', price: 60, image_url: null, available: true },
  { sl: 27, name_en: 'Fuchka (Full Plate)', name_bn: 'ফুচকা ফুল প্লেট', price: 100, image_url: null, available: true },
];

export async function seedMenuItemsIfEmpty() {
  if (!supabase || !isSupabaseConfigured) {
    return;
  }

  const { error, count } = await supabase
    .from('menu_items')
    .select('id', { count: 'exact' });

  if (error) {
    if (error.message.includes('does not exist')) {
      throw new Error('The Supabase table menu_items does not exist. Please create it in the Supabase dashboard.');
    }
    throw error;
  }

  if (!count || count === 0) {
    const { error: insertError } = await supabase.from('menu_items').insert(seedItems);
    if (insertError) {
      throw insertError;
    }
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase is not configured for menu fetch.');
  }

  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('available', true)
    .order('sort_order', { ascending: true })
    .order('sl', { ascending: true });

  if (error) {
    throw new Error('Supabase menu fetch failed: ' + error.message);
  }

  if (!data || data.length === 0) {
    // If no items, attempt to seed (migration); if seeding fails, propagate error.
    await seedMenuItemsIfEmpty();
    const retry = await supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('sort_order', { ascending: true })
      .order('sl', { ascending: true });

    if (retry.error) {
      throw new Error('Supabase menu retry failed: ' + retry.error.message);
    }

    return (retry.data || []).map(mapMenuRow);
  }

  return data.map(mapMenuRow);
}
