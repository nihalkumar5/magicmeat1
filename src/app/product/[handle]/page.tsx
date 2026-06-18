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
    alternates: {
      canonical: `/product/${resolvedParams.handle}`,
    },
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

  // Clean HTML tags from description for short SEO snippet
  const cleanDescription = product.descriptionHtml
    .replace(/<[^>]*>/g, '')
    .slice(0, 155) + '...';

  const defaultVariant = product.variants[0];
  const price = defaultVariant ? defaultVariant.price.amount : product.priceRange.minVariantPrice.amount;
  const isAvailable = defaultVariant ? defaultVariant.availableForSale : false;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images.map((img) => img.url),
    "description": cleanDescription,
    "sku": product.id.split('/').pop() || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Magic Meat"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://magicmeat.in/product/${product.handle}`,
      "priceCurrency": "INR",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  let categoryName = 'All Products';
  let categorySlug = 'all';
  const tags = product.tags?.map(t => t.toLowerCase()) || [];
  if (tags.includes('chicken')) {
    categoryName = 'Chicken';
    categorySlug = 'chicken';
  } else if (tags.includes('mutton')) {
    categoryName = 'Mutton';
    categorySlug = 'mutton';
  } else if (tags.includes('seafood') || tags.includes('fish')) {
    categoryName = 'Seafood';
    categorySlug = 'seafood';
  } else if (tags.includes('grocery') || tags.includes('egg') || tags.includes('dairy')) {
    categoryName = 'Daily Grocery';
    categorySlug = 'grocery';
  } else if (tags.includes('vegetables') || tags.includes('vegetable')) {
    categoryName = 'Vegetables';
    categorySlug = 'vegetables';
  } else if (tags.includes('fruits') || tags.includes('fruit')) {
    categoryName = 'Fruits';
    categorySlug = 'fruits';
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://magicmeat.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://magicmeat.in/shop"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": `https://magicmeat.in/shop/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.title,
        "item": `https://magicmeat.in/product/${product.handle}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetails product={product} />
    </>
  );
}

