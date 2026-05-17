'use client';

import React, { useState } from 'react';
import { Product, ShopifyVariant } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: Product;
}

type TabType = 'sourcing' | 'cooking' | 'delivery';

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();

  // Find the first available variant to select by default
  const defaultVariant = product.variants.find((v) => v.availableForSale) || product.variants[0];
  
  // Client States
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(defaultVariant);
  const [activeImageUrl, setActiveImageUrl] = useState<string>(product.images[0]?.url || '/placeholder.png');
  const [activeTab, setActiveTab] = useState<TabType>('sourcing');

  const isAvailable = selectedVariant?.availableForSale;
  const currentPrice = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);

  // Custom Editorial Tab Contents based on tags
  const getTabContent = () => {
    const isMeat = product.tags.includes('chicken') || product.tags.includes('mutton') || product.tags.includes('meat');
    const isFish = product.tags.includes('fish') || product.tags.includes('seafood');
    
    if (activeTab === 'sourcing') {
      if (isMeat) {
        return "Our meats are sourced directly from ISO-certified sustainable local farms. Every batch undergoes strict veterinary health checkups and antibiotic residue screens. We trim meticulously under clinical cold climates to assure 100% bacteriological safety.";
      }
      if (isFish) {
        return "Sourced daily from sustainable coastal catches and pristine fresh rivers. scaled, cleaned, and portioned by our master fishmongers within hours of harvest. Hand-rinsed in pure water and instantly packed on flake ice.";
      }
      return "Sourced from premier organic mills and organic dairy farms. 100% natural, farm-traceable, and strictly free from chemical bleaching, artificial adulteration, or synthetic growth hormones.";
    }

    if (activeTab === 'cooking') {
      if (isMeat) {
        if (product.tags.includes('curry cut')) {
          return "Ideal for traditional Indian curries, slow-braised stews, and biryanis. For optimal tenderness, sear meat on high heat for 3-4 minutes to lock in juices, then simmer slowly with your favorite spices for 35-40 minutes.";
        }
        return "Perfect for high-heat grilling, quick pan-searing, or roasting. Marinate for 30 minutes in olive oil, herbs, and lemon, then grill on medium-high heat for 6-8 minutes per side.";
      }
      if (isFish) {
        return "Excellent for traditional pan-fries, mustard-based fish curries, or oven-baked marinades. Rohu scales crisp up beautifully. Cook for 4-5 minutes on each side until the flesh flakes easily with a fork.";
      }
      return "Store in a cool, dry pantry for staples. Milk should be boiled once and refrigerated instantly. Eggs are best stored in original cartons at 4°C and used within 2 weeks.";
    }

    if (activeTab === 'delivery') {
      return "Shipped via our 30-Minute Local Express fleet. Packed inside insulated box inserts surrounded by medical-grade ice gel packs. We guarantee that items arrive chilled under 4°C to fully maintain protein structures and freshness.";
    }
  };

  return (
    <div className="container pdp-wrapper">
      <div className="pdp-grid">
        {/* Gallery Panel */}
        <div>
          <div className="pdp-gallery-main">
            <img 
              src={activeImageUrl} 
              alt={product.title} 
              className="pdp-gallery-image"
            />
          </div>
          
          {/* Scrollable Thumbnails (if multiple exist) */}
          {product.images.length > 1 && (
            <div className="pdp-gallery-thumbs">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`pdp-gallery-thumb ${activeImageUrl === image.url ? 'active' : ''}`}
                  onClick={() => setActiveImageUrl(image.url)}
                >
                  <img 
                    src={image.url} 
                    alt={`${product.title} thumbnail ${index + 1}`} 
                    className="pdp-gallery-thumb-img"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Panel */}
        <div className="pdp-info">
          {/* Tag Badges */}
          <div className="pdp-meta-row">
            <span className="pdp-badge">
              {isAvailable ? 'In Stock' : 'Out of Stock'}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)' }}>
              SKU: MM-{product.handle.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <h1 className="pdp-title">{product.title}</h1>
          
          <div className="pdp-price" style={{ margin: '1rem 0 2rem 0' }}>
            {currentPrice.toLocaleString('en-IN')}
          </div>

          {/* Description */}
          <div 
            className="pdp-description"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Variant Selector Button Grid */}
          {product.variants.length > 1 && (
            <div className="pdp-variants-wrapper">
              <div className="pdp-variants-title">Select Pack Size</div>
              <div className="pdp-variants-grid">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`pdp-variant-btn ${selectedVariant.id === variant.id ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.availableForSale}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active CTA Button */}
          <button 
            className="cart-checkout-btn"
            style={{ width: '100%', maxWidth: '320px', padding: '1.2rem 2rem', marginTop: '1rem' }}
            onClick={() => isAvailable && addToCart(product, selectedVariant)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add Selection to Cart' : 'Temporarily Out of Stock'}
          </button>

          {/* Sourcing details Tabs */}
          <div className="pdp-tabs">
            <div className="pdp-tab-headers">
              <span 
                className={`pdp-tab-header ${activeTab === 'sourcing' ? 'active' : ''}`}
                onClick={() => setActiveTab('sourcing')}
              >
                Purity & Sourcing
              </span>
              <span 
                className={`pdp-tab-header ${activeTab === 'cooking' ? 'active' : ''}`}
                onClick={() => setActiveTab('cooking')}
              >
                Preparation Guide
              </span>
              <span 
                className={`pdp-tab-header ${activeTab === 'delivery' ? 'active' : ''}`}
                onClick={() => setActiveTab('delivery')}
              >
                Insulated Shipping
              </span>
            </div>
            
            <div className="pdp-tab-content">
              {getTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
