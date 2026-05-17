'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

interface ProductCatalogProps {
  initialProducts: Product[];
}

type CategoryType = 'all' | 'chicken' | 'mutton' | 'seafood' | 'grocery' | 'vegetables' | 'fruits' | 'frozen';

const CATEGORIES: { key: CategoryType; label: string; image: string }[] = [
  { key: 'all',        label: 'All Products',    image: '/cat-chicken.png' },
  { key: 'chicken',    label: 'Chicken',          image: '/cat-chicken.png' },
  { key: 'mutton',     label: 'Mutton',           image: '/cat-mutton.png' },
  { key: 'seafood',    label: 'Sea Food',         image: '/cat-seafood.png' },
  { key: 'grocery',    label: 'Daily Grocery',    image: '/cat-grocery.png' },
  { key: 'vegetables', label: 'Vegetables',       image: '/cat-vegetables.png' },
  { key: 'fruits',     label: 'Fruits',           image: '/cat-fruits.png' },
  { key: 'frozen',     label: 'Frozen Items',     image: '/cat-frozen.png' },
];

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filteredProducts = initialProducts.filter((product) => {
    if (activeCategory === 'all') return true;
    
    const tags = product.tags.map(t => t.toLowerCase());
    const title = product.title.toLowerCase();
    const pType = (product.productType || '').toLowerCase();
    
    if (activeCategory === 'chicken') {
      return tags.some(t => ['chicken'].includes(t)) ||
             title.includes('chicken') ||
             pType.includes('chicken');
    }
    if (activeCategory === 'mutton') {
      return tags.some(t => ['mutton', 'goat', 'lamb'].includes(t)) ||
             title.includes('mutton') || title.includes('goat') ||
             pType.includes('mutton');
    }
    if (activeCategory === 'seafood') {
      return tags.some(t => ['fish', 'seafood', 'prawn', 'shrimp', 'rohu'].includes(t)) ||
             title.includes('fish') || title.includes('prawn') || title.includes('rohu') ||
             pType.includes('fish') || pType.includes('seafood');
    }
    if (activeCategory === 'grocery') {
      return tags.some(t => ['grocery', 'atta', 'rice', 'eggs', 'milk', 'essentials', 'dairy', 'ghee', 'spices', 'oil'].includes(t)) ||
             title.includes('egg') || title.includes('atta') || title.includes('rice') ||
             title.includes('milk') || title.includes('ghee') || title.includes('masala') ||
             title.includes('spice') || title.includes('oil') || title.includes('sugar') ||
             pType.includes('grocery') || pType.includes('essential');
    }
    if (activeCategory === 'vegetables') {
      return tags.some(t => ['vegetable', 'vegetables', 'sabzi', 'onion', 'potato', 'tomato'].includes(t)) ||
             title.includes('vegetable') || title.includes('onion') || title.includes('potato') ||
             title.includes('tomato') || title.includes('sabzi') ||
             pType.includes('vegetable');
    }
    if (activeCategory === 'fruits') {
      return tags.some(t => ['fruit', 'fruits', 'banana', 'apple', 'mango', 'orange'].includes(t)) ||
             title.includes('banana') || title.includes('apple') || title.includes('mango') ||
             title.includes('orange') || title.includes('fruit') ||
             pType.includes('fruit');
    }
    if (activeCategory === 'frozen') {
      return tags.some(t => ['frozen', 'ice cream', 'frozen food'].includes(t)) ||
             title.includes('frozen') || title.includes('ice cream') ||
             pType.includes('frozen');
    }
    
    return true;
  });

  return (
    <div>
      {/* Category Circles with Images */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Explore our wide range of fresh & premium products.</p>
        
        <div className="category-circles">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`category-circle ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <div className="category-circle-img">
                <Image 
                  src={cat.image} 
                  alt={cat.label} 
                  width={90} 
                  height={90}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <span className="category-circle-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="products-section container">
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--foreground-muted)' }}>
            <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>No products found in &quot;{CATEGORIES.find(c => c.key === activeCategory)?.label}&quot;</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Coming soon! Check back as we restock.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
