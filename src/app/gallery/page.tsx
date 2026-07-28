import { GalleryPage } from '../../pageViews/GalleryPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'Gallery | Mahabub Biryani House',
  'Browse our restaurant gallery featuring food, kitchen scenes, and happy customers.',
  '/gallery'
);

export default function GalleryRoute() {
  return (
    <>
      <PageWrapper>
        <GalleryPage />
      </PageWrapper>
      <StructuredData pathname="/gallery" />
    </>
  );
}
