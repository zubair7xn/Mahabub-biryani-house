import type { Metadata } from 'next';
import { defaultMetadata } from '../../lib/seo';
import './globals.css';
import { ThemeLanguageProvider } from '../components/ThemeLanguageProvider';
import { QueryProvider } from '../components/QueryProvider';
import { CartProvider } from '../context/CartContext';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <QueryProvider>
          <CartProvider>
            <ThemeLanguageProvider>{children}</ThemeLanguageProvider>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
