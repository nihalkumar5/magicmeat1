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

  // Smart badge detection — checks tags + title + productType
  const tagsLower = product.tags.map(t => t.toLowerCase());
  const titleLower = product.title.toLowerCase();
  const pType = (product.productType || '').toLowerCase();
  
  let displayCategory = 'Premium';
  
  if (tagsLower.includes('chicken') || titleLower.includes('chicken')) {
    displayCategory = 'Chicken';
  } else if (tagsLower.includes('mutton') || titleLower.includes('mutton') || titleLower.includes('goat')) {
    displayCategory = 'Mutton';
  } else if (tagsLower.includes('fish') || tagsLower.includes('seafood') || titleLower.includes('fish') || titleLower.includes('prawn') || titleLower.includes('rohu')) {
    displayCategory = 'Seafood';
  } else if (tagsLower.includes('eggs') || titleLower.includes('egg')) {
    displayCategory = 'Farm Eggs';
  } else if (tagsLower.includes('frozen') || titleLower.includes('frozen')) {
    displayCategory = 'Frozen';
  } else if (tagsLower.includes('fruit') || titleLower.includes('banana') || titleLower.includes('apple') || titleLower.includes('mango') || titleLower.includes('orange') || titleLower.includes('fruit')) {
    displayCategory = 'Fruits';
  } else if (tagsLower.includes('vegetable') || titleLower.includes('vegetable') || titleLower.includes('onion') || titleLower.includes('potato') || titleLower.includes('tomato')) {
    displayCategory = 'Vegetables';
  } else if (tagsLower.includes('dairy') || titleLower.includes('milk') || titleLower.includes('ghee') || titleLower.includes('paneer') || titleLower.includes('curd')) {
    displayCategory = 'Dairy';
  } else if (tagsLower.includes('combo') || titleLower.includes('combo') || titleLower.includes('pack')) {
    displayCategory = 'Combo Pack';
  } else if (tagsLower.includes('spices') || titleLower.includes('spice') || titleLower.includes('masala') || titleLower.includes('biryani')) {
    displayCategory = 'Spices';
  } else if (tagsLower.includes('grocery') || tagsLower.includes('atta') || tagsLower.includes('rice') || titleLower.includes('atta') || titleLower.includes('rice') || titleLower.includes('flour') || titleLower.includes('sugar') || titleLower.includes('oil')) {
    displayCategory = 'Grocery';
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
