import React from 'react';
import { getProductByHandle } from '@/lib/shopify';
import ProductDetails from '@/components/ProductDetails';
import Link from 'next/link';
import { Metadata } from 'next';

// Force live real-time Shopify synchronization
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    return {
      title: 'Selection Not Found | Magicmeat Premium',
      description: 'The requested premium cut is currently unavailable.',
    };
  }

  // Clean HTML tags from description for short SEO snippet
  const cleanDescription = product.descriptionHtml
    .replace(/<[^>]*>/g, '')
    .slice(0, 155) + '...';

  return {
    title: `${product.title} | Magicmeat Premium`,
    description: cleanDescription,
    openGraph: {
      title: `${product.title} | Magicmeat Premium`,
      description: cleanDescription,
      images: [{ url: product.images[0]?.url || '' }],
    },
  };
}

// 2. Server Page Route Component
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductByHandle(resolvedParams.handle);

  // Elegant Luxury 404 if product does not exist
  if (!product) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '70vh', 
          textAlign: 'center',
          padding: '0 2rem'
        }}
      >
        <span style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>🔍</span>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Selection Not Found</h1>
        <p style={{ color: 'var(--foreground-muted)', margin: '1rem 0 2.5rem 0', maxWidth: '480px' }}>
          This premium selection might be sold out or currently out of season. Savor our other fresh cuts.
        </p>
        <Link href="/" className="hero-cta" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          Return to Selections
        </Link>
      </div>
    );
  }

  // Render fully interactive client details layout
  return <ProductDetails product={product} />;
}
