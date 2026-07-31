'use client';

import type { ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';
import { useThemeLanguage } from './ThemeLanguageProvider';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { isDark, language } = useThemeLanguage();

  if (isValidElement(children) && typeof children.type !== 'string') {
    return cloneElement(children, {
      isDark,
      language,
    });
  }

  return children;
}
