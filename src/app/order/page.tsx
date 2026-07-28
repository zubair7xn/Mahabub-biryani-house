import { OrderPage } from '../../pageViews/OrderPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'Order | Mahabub Biryani House',
  'Place your order for authentic biryani, tehari, snacks, desserts, and drinks with fast delivery.',
  '/order'
);

export default function OrderRoute() {
  return (
    <>
      <PageWrapper>
        <OrderPage />
      </PageWrapper>
      <StructuredData pathname="/order" />
    </>
  );
}
