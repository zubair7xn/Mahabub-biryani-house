'use client';

import { useQuery } from '@tanstack/react-query';
import type { GalleryImage } from '../types';

export function useGallery() {
  return useQuery<GalleryImage[], Error>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const response = await fetch('/api/gallery');

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Unable to load gallery images');
      }

      return response.json() as Promise<GalleryImage[]>;
    },
    retry: 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
