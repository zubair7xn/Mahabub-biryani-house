'use client';

import { useQuery } from '@tanstack/react-query';
import type { MenuItem } from '../types';

export function useMenu() {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menuItems'],
    queryFn: async () => {
      const response = await fetch('/api/menu');

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error || 'Unable to load menu items. Please try again later.';
        throw new Error(message);
      }

      return (await response.json()) as MenuItem[];
    },
    retry: 1,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
