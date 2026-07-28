import 'server-only';
import { HomePage } from '../pageViews/HomePage';
import { PageWrapper } from '../components/PageWrapper';
import { getPageMetadata } from '../../lib/seo';
import { StructuredData } from '../components/StructuredData';

export const metadata = getPageMetadata(
  'Home | Mahabub Biryani House',
  'Discover authentic Bangladeshi biryani, tehari, snacks, desserts, and drinks delivered fresh in Savar.',
  '/'
);

export default function Home() {
  return (
    <>
      <PageWrapper>
        <HomePage />
      </PageWrapper>
      <StructuredData pathname="/" />
    </>
  );
}
