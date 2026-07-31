import Script from 'next/script';
import { getRestaurantSettings } from '../services/restaurant';
import { faqContent } from '../data/faq';
import { restaurantDefaults } from '../data/restaurantDefaults';

interface StructuredDataProps {
  pathname: string;
  includeFAQ?: boolean;
}

export async function StructuredData({ pathname, includeFAQ = false }: StructuredDataProps) {
  let settings = null;

  try {
    settings = await getRestaurantSettings();
  } catch (error) {
    console.warn('StructuredData fallback due to settings error:', error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://mahabubbiryanihouse.com';
  const url = `${baseUrl}${pathname}`;

  const logoUrl = settings?.logo_url ?? `${baseUrl}/logo.png`;
  const visualName = settings?.name ?? restaurantDefaults.name;
  const streetAddress = settings?.address ?? restaurantDefaults.address;
  const telephone = settings?.phone ?? restaurantDefaults.phone;
  const sameAs = [
    settings?.facebook_url ?? restaurantDefaults.socialMedia.facebook,
    settings?.whatsappBusiness ?? restaurantDefaults.socialMedia.whatsappBusiness,
  ].filter(Boolean) as string[];

  const structuredData: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: visualName,
      image: logoUrl,
      '@id': url,
      url,
      telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality: 'Savar',
        addressRegion: 'Dhaka',
        addressCountry: 'BD',
      },
      priceRange: '৳',
      servesCuisine: ['Biryani', 'Bangladeshi', 'Snacks', 'Desserts', 'Drinks'],
      sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: visualName,
      telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality: 'Savar',
        addressRegion: 'Dhaka',
        addressCountry: 'BD',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: restaurantDefaults.coordinates.lat,
        longitude: restaurantDefaults.coordinates.lng,
      },
      url,
      image: logoUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: visualName,
      url: baseUrl,
      logo: logoUrl,
      sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: baseUrl,
      name: visualName,
      publisher: {
        '@type': 'Organization',
        name: visualName,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, array) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: segment.replace(/-/g, ' '),
          item: `${baseUrl}/${array.slice(0, index + 1).join('/')}`,
        })),
    },
  ];

  if (includeFAQ) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqContent.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(structuredData)}
    </Script>
  );
}
