import { AboutPage } from '../../pageViews/AboutPage';
import { getPageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../components/StructuredData';
import { PageWrapper } from '../../components/PageWrapper';

export const metadata = getPageMetadata(
  'About | Mahabub Biryani House',
  'Learn about our restaurant story, mission, vision, and why customers choose us.',
  '/about'
);

export default function AboutRoute() {
  return (
    <>
      <PageWrapper>
        <AboutPage />
      </PageWrapper>
      <StructuredData pathname="/about" />
    </>
  );
}
