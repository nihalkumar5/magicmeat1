'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

interface ProductCatalogProps {
  initialProducts: Product[];
}

type CategoryType = 'all' | 'meats' | 'seafood' | 'essentials';

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // Category Filter Rules based on tags and metadata
  const filteredProducts = initialProducts.filter((product) => {
    if (activeCategory === 'all') return true;
    
    const tags = product.tags.map(t => t.toLowerCase());
    
    if (activeCategory === 'meats') {
      return tags.includes('chicken') || tags.includes('mutton');
    }
    
    if (activeCategory === 'seafood') {
      return tags.includes('fish') || tags.includes('seafood');
    }
    
    if (activeCategory === 'essentials') {
      return tags.includes('grocery') || tags.includes('atta') || tags.includes('rice') || tags.includes('eggs') || tags.includes('milk');
    }
    
    return true;
  });

  return (
    <div>
      {/* Category Selection Filter Pills */}
      <section className="categories-section">
        <h2 className="section-title">Explore Our Collections</h2>
        <p className="section-subtitle">Premium cut meats, clean seafood, and high-quality daily essentials.</p>
        
        <div className="category-pills">
          <button 
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Products
          </button>
          <button 
            className={`category-pill ${activeCategory === 'meats' ? 'active' : ''}`}
            onClick={() => setActiveCategory('meats')}
          >
            Fresh Meats
          </button>
          <button 
            className={`category-pill ${activeCategory === 'seafood' ? 'active' : ''}`}
            onClick={() => setActiveCategory('seafood')}
          >
            Fresh Seafood
          </button>
          <button 
            className={`category-pill ${activeCategory === 'essentials' ? 'active' : ''}`}
            onClick={() => setActiveCategory('essentials')}
          >
            Daily Essentials
          </button>
        </div>
      </section>

      {/* Dynamic Products Grid Section */}
      <section className="products-section container">
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--foreground-muted)' }}>
            <h3>No products found in this selection.</h3>
            <p style={{ marginTop: '0.5rem' }}>Check back later as we replenish our fresh stocks.</p>
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
