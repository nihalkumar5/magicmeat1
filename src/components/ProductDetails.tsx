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
    <div className="container-custom py-6 md:py-12">
      {/* Brutalist Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#D4FF00] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] font-heading font-black text-sm uppercase tracking-widest transition-all"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        BACK TO SHOP
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Gallery Panel */}
        <div className="flex flex-col gap-6">
          <div className="w-full relative aspect-[4/3] md:aspect-video bg-white border-[4px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img 
              src={activeImageUrl} 
              alt={product.title} 
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.7]"
            />
          </div>
          
          {/* Scrollable Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 px-1 hide-scrollbar">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-28 h-20 flex-shrink-0 cursor-pointer border-[3px] border-black overflow-hidden transition-all duration-200 ${activeImageUrl === image.url ? 'shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-y-[-4px] translate-x-[-4px]' : 'opacity-80 hover:opacity-100 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px]'}`}
                  onClick={() => setActiveImageUrl(image.url)}
                >
                  <img 
                     src={image.url} 
                     alt={`${product.title} thumbnail ${index + 1}`} 
                     className="w-full h-full object-cover object-center bg-white scale-[1.7]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Panel */}
        <div className="flex flex-col justify-center max-w-lg mx-auto md:mx-0 w-full">
          {/* Tag Badges */}
          <div className="mb-6 text-center md:text-left">
            <span className="inline-block bg-[#D4FF00] border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black px-4 py-1.5 text-sm font-heading font-bold uppercase tracking-widest">
              {isAvailable ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-widest mb-6 text-black text-center md:text-left leading-none">
            {product.title}
          </h1>
          
          <div className="mb-8 text-center md:text-left">
            <span className="font-heading text-4xl md:text-5xl font-bold text-black bg-brand-primary border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block px-6 py-2">
               ₹{currentPrice.toFixed(0)}
            </span>
          </div>

          {/* Description */}
          {product.descriptionHtml && product.descriptionHtml.trim() !== '' && (
            <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] p-5 mb-10 text-base text-black font-medium">
               <div 
                 className="prose prose-p:mb-2 leading-snug"
                 dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
               />
            </div>
          )}

          {/* Variant Selector Button Grid */}
          {product.variants.length > 1 && (
            <div className="mb-10">
              <div className="font-heading font-bold text-black mb-4 text-xl tracking-widest uppercase text-center md:text-left border-b-[3px] border-black pb-2 inline-block">Select Size</div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-6 py-3 font-heading text-lg uppercase tracking-widest transition-all duration-200 border-[3px] border-black ${selectedVariant.id === variant.id ? 'bg-black text-white shadow-none translate-y-[2px] translate-x-[2px]' : 'bg-white text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#D4FF00]'}`}
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
            className={`w-full mb-12 py-5 border-[4px] border-black font-heading text-2xl uppercase tracking-widest transition-all duration-200 ${!isAvailable ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#15C213] text-white shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#12a110]'}`}
            onClick={() => isAvailable && addToCart(product, selectedVariant)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Brutalist Tabs */}
          <div className="bg-white border-[4px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-10">
            <div className="flex border-b-[4px] border-black">
              <button 
                className={`flex-1 py-4 px-2 font-heading text-lg uppercase tracking-widest transition-colors border-r-[4px] border-black last:border-r-0 ${activeTab === 'sourcing' ? 'bg-[#D4FF00] text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('sourcing')}
              >
                Purity
              </button>
              <button 
                className={`flex-1 py-4 px-2 font-heading text-lg uppercase tracking-widest transition-colors border-r-[4px] border-black last:border-r-0 ${activeTab === 'cooking' ? 'bg-[#D4FF00] text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('cooking')}
              >
                Guide
              </button>
              <button 
                className={`flex-1 py-4 px-2 font-heading text-lg uppercase tracking-widest transition-colors ${activeTab === 'delivery' ? 'bg-[#D4FF00] text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('delivery')}
              >
                Shipping
              </button>
            </div>
            
            <div className="p-6 text-sm md:text-base font-bold text-black leading-relaxed bg-white">
              {getTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
