'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Find the first available variant to add by default
  const defaultVariant = product.variants.find((v) => v.availableForSale) || product.variants[0];
  const isAvailable = defaultVariant?.availableForSale;

  // Extract a friendly display tag/category
  let displayCategory = 'Essential';
  if (product.tags.includes('chicken') || product.tags.includes('Chicken')) {
    displayCategory = 'Fresh Chicken';
  } else if (product.tags.includes('mutton') || product.tags.includes('Mutton')) {
    displayCategory = 'Tender Mutton';
  } else if (product.tags.includes('fish') || product.tags.includes('seafood')) {
    displayCategory = 'Fresh Seafood';
  } else if (product.tags.includes('eggs')) {
    displayCategory = 'Farm Eggs';
  } else if (product.tags.includes('grocery') || product.tags.includes('atta') || product.tags.includes('rice')) {
    displayCategory = 'Daily Staple';
  }

  const imageUrl = product.images[0]?.url || '/placeholder.png';
  const price = parseFloat(defaultVariant?.price.amount || product.priceRange.minVariantPrice.amount);

  return (
    <div className="product-card">
      {/* Category Tag */}
      <span className="product-badge">{displayCategory}</span>
      
      {/* Clickable Image */}
      <Link href={`/product/${product.handle}`} className="product-card-image-container">
        <img 
          src={imageUrl} 
          alt={product.title} 
          className="product-card-image"
          loading="lazy"
        />
      </Link>

      {/* Card Body */}
      <div className="product-card-content">
        <Link href={`/product/${product.handle}`}>
          <h3 className="product-card-title">{product.title}</h3>
        </Link>
        
        {/* Card Footer Meta */}
        <div className="product-card-meta">
          <div className="product-card-price">
            {price.toLocaleString('en-IN')}
          </div>
          
          <button 
            className="product-card-btn"
            onClick={() => isAvailable && addToCart(product, defaultVariant)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
