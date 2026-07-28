import { ReviewsPage } from '../../pageViews/ReviewsPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'Reviews | Mahabub Biryani House',
  'Read customer reviews and ratings for Mahabub Biryani House. Discover why guests love our biryani.',
  '/reviews'
);

export default function ReviewsRoute() {
  return (
    <>
      <PageWrapper>
        <ReviewsPage />
      </PageWrapper>
      <StructuredData pathname="/reviews" />
    </>
  );
}
