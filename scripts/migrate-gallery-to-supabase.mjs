import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
const env = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).reduce((acc, line) => {
  if (!line || !line.includes('=')) return acc;
  const idx = line.indexOf('=');
  acc[line.slice(0, idx)] = line.slice(idx + 1);
  return acc;
}, {});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing .env.local Supabase settings.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const images = [
  { image_url: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510a8?w=600&h=600&fit=crop', title: 'Authentic Kacchi Biryani', caption: null, sort_order: 1 },
  { image_url: 'https://images.unsplash.com/photo-1585937421612-70a19fb6b537?w=600&h=600&fit=crop', title: 'Chicken Tehari', caption: null, sort_order: 2 },
  { image_url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=600&h=600&fit=crop', title: 'Crispy Fuchka', caption: null, sort_order: 3 },
  { image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop', title: 'Restaurant Interior', caption: null, sort_order: 4 },
  { image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop', title: 'Fresh Beverages', caption: null, sort_order: 5 },
  { image_url: 'https://images.unsplash.com/photo-1585936294919-a90e81b78a7f?w=600&h=600&fit=crop', title: 'Traditional Desserts', caption: null, sort_order: 6 },
  { image_url: 'https://images.unsplash.com/photo-1495195134373-f698d58a024b?w=600&h=600&fit=crop', title: 'Kitchen Preparation', caption: null, sort_order: 7 },
  { image_url: 'https://images.unsplash.com/photo-1552621554-5fefe8c9ef14?w=600&h=600&fit=crop', title: 'Happy Customers', caption: null, sort_order: 8 },
  { image_url: 'https://images.unsplash.com/photo-1566241440754-e32566492dba?w=600&h=600&fit=crop', title: 'Restaurant Event', caption: null, sort_order: 9 },
  { image_url: 'https://images.unsplash.com/photo-1604521270917-15e36742902f?w=600&h=600&fit=crop', title: 'Family Dining', caption: null, sort_order: 10 },
  { image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop', title: 'Beef Biryani', caption: null, sort_order: 11 },
  { image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop', title: 'Chef at Work', caption: null, sort_order: 12 },
];

(async () => {
  try {
    const { data: existing, error: fetchErr, count } = await supabase.from('gallery_images').select('id', { count: 'exact' });
    if (fetchErr) throw fetchErr;
    if (count && count > 0) {
      console.log('Gallery already has', count, 'items. Aborting migration.');
      process.exit(0);
    }

    const { error } = await supabase.from('gallery_images').insert(images);
    if (error) throw error;
    console.log('Inserted', images.length, 'gallery images.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    process.exit(1);
  }
})();
