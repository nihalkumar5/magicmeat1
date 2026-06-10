import type { Metadata } from 'next';
import { Bebas_Neue, Quicksand, Permanent_Marker } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
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
  metadataBase: new URL('https://magicmeat.in'), // Placeholder URL
  title: {
    template: '%s | Magic Meat',
    default: 'Magic Meat | Premium Fresh Chicken & Meat Delivery in Hazaribagh',
  },
  description: 'Clean Cuts. Honest Prices. Farm Fresh Quality. Order premium chicken, mutton, and seafood online in Hazaribagh with fast doorstep delivery.',
  keywords: ['fresh chicken Hazaribagh', 'raw meat delivery', 'online chicken shop', 'fresh mutton Hazaribagh', 'Magic Meat', 'seafood delivery'],
  authors: [{ name: 'Magic Meat' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://magicmeat.in',
    title: 'Magic Meat | Premium Fresh Meat in Hazaribagh',
    description: 'Clean Cuts. Honest Prices. Farm Fresh Quality. Get the freshest chicken and meat delivered directly to your doorstep.',
    siteName: 'Magic Meat',
    images: [
      {
        url: '/og-image.jpg', // You can add a default OG image here later
        width: 1200,
        height: 630,
        alt: 'Magic Meat - Savor Every Last Bite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magic Meat | Fresh Chicken & Meat Delivery',
    description: 'Clean Cuts. Honest Prices. Farm Fresh Quality. Order online today!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Magic Meat",
  "image": "https://magicmeat.in/og-image.jpg",
  "description": "Premium fresh chicken, mutton, and seafood delivery service in Hazaribagh.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hazaribagh",
    "addressRegion": "Jharkhand",
    "addressCountry": "IN"
  },
  "telephone": "+918271663388",
  "url": "https://magicmeat.in",
  "priceRange": "₹₹",
  "paymentAccepted": "Cash, Credit Card, UPI"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${bebas.variable} ${quicksand.variable} ${script.variable} font-body antialiased text-text-color bg-bg-color min-h-screen flex flex-col`} suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
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
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
