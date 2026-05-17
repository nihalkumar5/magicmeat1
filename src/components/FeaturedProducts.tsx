'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const featured = products.slice(0, 8);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <p className="featured-tagline">Handpicked for You</p>
            <h2 className="featured-title">Featured Products</h2>
          </div>
          <a href="#catalog" className="featured-view-all">
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      <div className="featured-scroll">
        {featured.map((product) => {
          const defaultVariant = product.variants.find(v => v.availableForSale) || product.variants[0];
          const isAvailable = defaultVariant?.availableForSale;
          const price = parseFloat(defaultVariant?.price.amount || product.priceRange.minVariantPrice.amount);
          const imageUrl = product.images[0]?.url || '/placeholder.png';

          // Smart badge
          const titleLower = product.title.toLowerCase();
          let badge = 'Premium';
          if (titleLower.includes('chicken')) badge = 'Chicken';
          else if (titleLower.includes('mutton') || titleLower.includes('goat')) badge = 'Mutton';
          else if (titleLower.includes('fish') || titleLower.includes('prawn') || titleLower.includes('rohu')) badge = 'Seafood';
          else if (titleLower.includes('egg')) badge = 'Farm Eggs';

          return (
            <div key={product.id} className="featured-card">
              <Link href={`/product/${product.handle}`} className="featured-card-img-wrap">
                <span className="featured-badge">{badge}</span>
                <img src={imageUrl} alt={product.title} className="featured-card-img" loading="lazy" />
              </Link>
              <div className="featured-card-body">
                <Link href={`/product/${product.handle}`}>
                  <h3 className="featured-card-title">{product.title}</h3>
                </Link>
                <div className="featured-card-footer">
                  <span className="featured-card-price">₹{price.toLocaleString('en-IN')}</span>
                  <button
                    className="featured-card-btn"
                    onClick={() => isAvailable && addToCart(product, defaultVariant)}
                    disabled={!isAvailable}
                  >
                    {isAvailable ? '+' : '✕'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
