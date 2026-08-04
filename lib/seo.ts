import { Metadata } from 'next';
import { restaurantInfo } from '../src/data/restaurant';

const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://mahabubbiryanihouse.com';
const defaultTitle = `${restaurantInfo.name} | Authentic Bangladeshi Restaurant`;
const defaultDescription = `${restaurantInfo.description} Enjoy traditional dishes, fast delivery, and authentic flavors in Savar, Dhaka.`;
const defaultImage = `${appUrl}/logo.png`;

export function getPageMetadata(title: string, description: string, pathname: string): Metadata {
  const url = `${appUrl}${pathname}`;

  return {
    title,
    description,
    metadataBase: new URL(appUrl),
    applicationName: restaurantInfo.name,
    creator: restaurantInfo.name,
    authors: [{ name: restaurantInfo.name }],
   icons: {
  icon: '/icon.png',
  shortcut: '/icon.png',
  apple: '/icon.png',
},
    themeColor: '#f59e0b',
    viewport: 'width=device-width, initial-scale=1',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: restaurantInfo.name,
      type: 'website',
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 1200,
          alt: `${restaurantInfo.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    verification: {
      google: '',
    },
  };
}

export const defaultMetadata: Metadata = getPageMetadata(defaultTitle, defaultDescription, '/');
