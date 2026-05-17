import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Magicmeat | Premium Headless Storefront',
  description: 'Farm-fresh meats, cleaned seafood, high-quality eggs, and daily grocery staples delivered directly to your doorstep. Experience the Magicmeat standard of quality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          {/* Global Sticky Navigation Header */}
          <Header />
          
          {/* Main Page Routing Node */}
          <main style={{ minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
          
          {/* Global Sliding Cart Drawer */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
