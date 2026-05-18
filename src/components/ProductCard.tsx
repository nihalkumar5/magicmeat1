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

  // Smart badge detection — checks collections + tags + title + productType
  const collectionsLower = (product.collections || []).map(c => c.title.toLowerCase());
  const tagsLower = product.tags.map(t => t.toLowerCase());
  const titleLower = product.title.toLowerCase();
  const pType = (product.productType || '').toLowerCase();
  
  let displayCategory = 'Premium';

  const fruitKeywords = ['banana', 'apple', 'mango', 'orange', 'guava', 'grape', 'papaya', 'pomegranate', 'strawberry', 'watermelon', 'melon', 'pear', 'peach', 'plum', 'kiwi', 'pineapple', 'coconut'];
  const vegKeywords = ['onion', 'potato', 'tomato', 'garlic', 'ginger', 'dhaniya', 'aloo', 'capsicum', 'chilli', 'coriander', 'lemon', 'carrot', 'radish', 'cabbage', 'cauliflower', 'spinach', 'mint', 'pudina', 'sabzi', 'vegetables', 'vegetable', 'bhindi', 'okra', 'brinjal', 'eggplant', 'lauki', 'karela', 'kaddu', 'vagetables', 'vagetable'];
  const seafoodKeywords = ['fish', 'seafood', 'prawn', 'shrimp', 'rohu', 'katla', 'crab', 'lobster'];
  
  if (collectionsLower.includes('chicken') || tagsLower.includes('chicken') || titleLower.includes('chicken')) {
    displayCategory = 'Chicken';
  } else if (collectionsLower.includes('mutton') || tagsLower.includes('mutton') || titleLower.includes('mutton') || titleLower.includes('goat') || titleLower.includes('lamb')) {
    displayCategory = 'Mutton';
  } else if (collectionsLower.includes('fish') || collectionsLower.includes('seafood') || tagsLower.some(t => seafoodKeywords.includes(t)) || seafoodKeywords.some(kw => titleLower.includes(kw)) || pType.includes('seafood') || pType.includes('fish')) {
    displayCategory = 'Seafood';
  } else if (collectionsLower.includes('egg') || collectionsLower.includes('eggs') || tagsLower.includes('eggs') || titleLower.includes('egg')) {
    displayCategory = 'Farm Eggs';
  } else if (collectionsLower.includes('fruits') || tagsLower.some(t => fruitKeywords.includes(t)) || fruitKeywords.some(kw => titleLower.includes(kw)) || pType.includes('fruit')) {
    displayCategory = 'Fruits';
  } else if (collectionsLower.includes('vagetables') || collectionsLower.includes('vegetables') || collectionsLower.includes('vegetable') || tagsLower.some(t => ['vegetable', 'vegetables', 'sabzi', ...vegKeywords].includes(t)) || vegKeywords.some(kw => titleLower.includes(kw)) || pType.includes('vegetable') || pType.includes('fruits & vegetable') || pType.includes('fruits & vegetables')) {
    displayCategory = 'Vegetables';
  } else if (tagsLower.includes('frozen') || titleLower.includes('frozen')) {
    displayCategory = 'Frozen';
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
