import { ContactPage } from '../../pageViews/ContactPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'Contact | Mahabub Biryani House',
  'Contact Mahabub Biryani House for orders, reservations, and customer support.',
  '/contact'
);

export default function ContactRoute() {
  return (
    <>
      <PageWrapper>
        <ContactPage />
      </PageWrapper>
      <StructuredData pathname="/contact" includeFAQ />
    </>
  );
}
