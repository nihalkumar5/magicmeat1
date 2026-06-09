import type { Metadata } from 'next';
import { Bebas_Neue, Quicksand, Permanent_Marker } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-body',
});

const script = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'Magic Meat | Fresh Chicken Delivered Daily',
  description: 'Clean Cuts. Honest Prices. Farm Fresh Quality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebas.variable} ${quicksand.variable} ${script.variable} font-body antialiased text-text-color bg-bg-color min-h-screen flex flex-col`} suppressHydrationWarning>
        <CartProvider>
          {/* Global Sticky Navigation Header */}
          <Header />
          
          {/* Main Page Routing Node */}
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Global Footer */}
          <Footer />
          
          {/* Global Sliding Cart Drawer */}
          <CartDrawer />

          {/* Mobile Bottom Navigation */}
          <MobileNav />
        </CartProvider>
      </body>
    </html>
  );
}
