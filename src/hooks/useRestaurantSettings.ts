'use client';

import { useQuery } from '@tanstack/react-query';
import type { RestaurantSettings } from '../types';

export function useRestaurantSettings() {
  return useQuery<RestaurantSettings | null, Error>({
    queryKey: ['restaurantSettings'],
    queryFn: async () => {
      const response = await fetch('/api/settings');

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Unable to load restaurant settings');
      }

      return response.json() as Promise<RestaurantSettings | null>;
    },
    retry: 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
