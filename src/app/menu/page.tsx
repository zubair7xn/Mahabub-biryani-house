import { MenuPage } from '../../pageViews/MenuPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'Menu | Mahabub Biryani House',
  'Browse our full menu of biryani, tehari, snacks, desserts, and drinks delivered fresh.',
  '/menu'
);

export default function MenuRoute() {
  return (
    <>
      <PageWrapper>
        <MenuPage />
      </PageWrapper>
      <StructuredData pathname="/menu" />
    </>
  );
}
