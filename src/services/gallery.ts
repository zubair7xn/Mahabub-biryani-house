import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { Database } from '../../lib/supabase-types';
import type { GalleryImage } from '../types';

type GalleryRow = Database['public']['Tables']['gallery_images']['Row'];

function getGalleryCategoryFromRow(row: GalleryRow): GalleryImage['category'] {
  const text = `${row.title ?? ''} ${row.caption ?? ''}`.toLowerCase();

  if (text.includes('restaurant')) return 'restaurant';
  if (text.includes('kitchen') || text.includes('chef')) return 'kitchen';
  if (text.includes('customer') || text.includes('family') || text.includes('dining')) return 'customers';
  if (text.includes('event') || text.includes('party') || text.includes('celebration')) return 'events';
  if (text.includes('drink') || text.includes('beverage') || text.includes('borhani') || text.includes('juice')) return 'drinks';

  return 'food';
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error('Supabase is not configured for gallery fetch.');
  }

  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error('Supabase gallery fetch failed: ' + error.message);
  }

  return (data || []).map((row) => ({
    id: row.id,
    src: row.image_url,
    alt: row.title ?? row.caption ?? 'Restaurant gallery image',
    category: getGalleryCategoryFromRow(row),
    title: row.title,
    caption: row.caption,
  }));
}
