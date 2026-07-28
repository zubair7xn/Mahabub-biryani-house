import Script from 'next/script';
import { restaurantInfo, faqContent } from '../data/restaurant';

interface StructuredDataProps {
  pathname: string;
  includeFAQ?: boolean;
}

export function StructuredData({ pathname, includeFAQ = false }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://mahabubbiryanihouse.com';
  const url = `${baseUrl}${pathname}`;

  const logoUrl = `${baseUrl}/logo.png`;
  const structuredData: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: restaurantInfo.name,
      image: logoUrl,
      '@id': url,
      url,
      telephone: restaurantInfo.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: restaurantInfo.address,
        addressLocality: 'Savar',
        addressRegion: 'Dhaka',
        addressCountry: 'BD',
      },
      openingHoursSpecification: Object.entries(restaurantInfo.businessHours).map(
        ([day, hours]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: hours.open,
          closes: hours.close,
        })
      ),
      priceRange: '৳',
      servesCuisine: ['Biryani', 'Bangladeshi', 'Snacks', 'Desserts', 'Drinks'],
      sameAs: [
        restaurantInfo.socialMedia.facebook,
        restaurantInfo.socialMedia.whatsappBusiness,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: restaurantInfo.name,
      telephone: restaurantInfo.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: restaurantInfo.address,
        addressLocality: 'Savar',
        addressRegion: 'Dhaka',
        addressCountry: 'BD',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: restaurantInfo.coordinates.lat,
        longitude: restaurantInfo.coordinates.lng,
      },
      openingHoursSpecification: Object.entries(restaurantInfo.businessHours).map(
        ([day, hours]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: hours.open,
          closes: hours.close,
        })
      ),
      url,
      image: logoUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: restaurantInfo.name,
      url: baseUrl,
      logo: logoUrl,
      sameAs: [restaurantInfo.socialMedia.facebook],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: baseUrl,
      name: restaurantInfo.name,
      publisher: {
        '@type': 'Organization',
        name: restaurantInfo.name,
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
