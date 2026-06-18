'use client';

import React, { useState } from 'react';
import { Product, ShopifyVariant } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import { triggerHaptic } from '@/utils/haptics';

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
    const titleLower = product.title.toLowerCase();
    const collectionsLower = product.collections?.map(c => c.title.toLowerCase()) || [];
    const tagsLower = product.tags?.map(t => t.toLowerCase()) || [];
    
    const hasKeyword = (keywords: string[]) => {
      return keywords.some(kw => 
        titleLower.includes(kw) || 
        collectionsLower.some(c => c.includes(kw)) || 
        tagsLower.some(t => t.includes(kw))
      );
    };

    const isMeat = hasKeyword(['chicken', 'mutton', 'meat']);
    const isFish = hasKeyword(['fish', 'seafood', 'katla', 'rohu', 'prawn']);
    const isVegetable = hasKeyword(['vegetable', 'vagetable', 'veg', 'aloo', 'onion', 'tomato', 'ginger', 'garlic', 'dhaniya']);
    const isFruit = hasKeyword(['fruit', 'apple', 'orange', 'grapes', 'banana', 'guava']);
    const isEgg = hasKeyword(['egg']);
    
    if (activeTab === 'sourcing') {
      if (isMeat) {
        return "Our meats are sourced directly from ISO-certified sustainable local farms. Every batch undergoes strict veterinary health checkups and antibiotic residue screens. We trim meticulously under clinical cold climates to assure 100% bacteriological safety.";
      }
      if (isFish) {
        return "Sourced daily from sustainable coastal catches and pristine fresh rivers. scaled, cleaned, and portioned by our master fishmongers within hours of harvest. Hand-rinsed in pure water and instantly packed on flake ice.";
      }
      if (isVegetable || isFruit) {
        return "Sourced daily from local organic farms. Selected for absolute freshness, washed in clean running water, and packaged immediately under hygienic conditions.";
      }
      if (isEgg) {
        return "Sourced from high-quality poultry farms. Freshly gathered daily, sorted by size, cleaned, and stored under temperature-controlled environments.";
      }
      return "Sourced from premier organic mills and organic dairy farms. 100% natural, farm-traceable, and strictly free from chemical bleaching, artificial adulteration, or synthetic growth hormones.";
    }

    if (activeTab === 'cooking') {
      if (isMeat) {
        if (titleLower.includes('curry cut') || tagsLower.includes('curry cut')) {
          return "Ideal for traditional Indian curries, slow-braised stews, and biryanis. For optimal tenderness, sear meat on high heat for 3-4 minutes to lock in juices, then simmer slowly with your favorite spices for 35-40 minutes.";
        }
        return "Perfect for high-heat grilling, quick pan-searing, or roasting. Marinate for 30 minutes in olive oil, herbs, and lemon, then grill on medium-high heat for 6-8 minutes per side.";
      }
      if (isFish) {
        return "Excellent for traditional pan-fries, mustard-based fish curries, or oven-baked marinades. Cook for 4-5 minutes on each side until the flesh flakes easily with a fork.";
      }
      if (isVegetable || isFruit) {
        return "Wash before use. Vegetables are ideal for stir-fries, traditional curries, or fresh salads. Store leafy greens in the refrigerator crisper drawer and root vegetables in a cool, dark place.";
      }
      if (isEgg) {
        return "Perfect for boiling, frying, poaching, or baking. Store eggs in their original carton in the refrigerator. Consume within 3-4 weeks for maximum freshness.";
      }
      return "Store in a cool, dry pantry for staples. Milk should be boiled once and refrigerated instantly. Eggs are best stored in original cartons at 4°C and used within 2 weeks.";
    }

    if (activeTab === 'delivery') {
      return "Shipped via our 30-Minute Local Express fleet. Packed inside insulated box inserts surrounded by medical-grade ice gel packs. We guarantee that items arrive chilled under 4°C to fully maintain protein structures and freshness.";
    }
  };

  return (
    <div className="container-custom py-8 md:py-16 text-[#121212] bg-[#F4F3F0]">
      {/* Clean Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-gray-50 hover:border-gray-300 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Gallery Panel */}
        <div className="flex flex-col gap-6">
          <div className="w-full relative aspect-[4/3] md:aspect-[1.4] bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center">
            {/* Ambient blurred background halo to fill borders for landscape/portrait images without cropping */}
            <img 
              src={activeImageUrl} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover filter blur-[30px] opacity-35 scale-110 pointer-events-none"
              aria-hidden="true"
            />
            {/* Sharp foreground image fitted perfectly without cutoff */}
            <img 
              src={activeImageUrl} 
              alt={product.title} 
              className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
          
          {/* Scrollable Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 px-1 hide-scrollbar">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-24 h-18 flex-shrink-0 cursor-pointer border rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeImageUrl === image.url 
                      ? 'border-brand-primary ring-2 ring-brand-primary/20 scale-[0.98]' 
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImageUrl(image.url)}
                >
                  <img 
                     src={image.url} 
                     alt={`${product.title} thumbnail ${index + 1}`} 
                     className="w-full h-full object-cover object-center bg-white"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Panel */}
        <div className="flex flex-col justify-center w-full">
          {/* Sourcing / Stock Badge */}
          <div className="mb-4 text-left">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isAvailable 
                ? 'bg-green-50 text-green-700 border-green-200/50' 
                : 'bg-red-50 text-red-700 border-red-200/50'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
              {isAvailable ? 'In Stock (Freshly Cut)' : 'Out of Stock'}
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="mb-6 text-left">
            <span className="font-heading text-3xl font-black text-brand-primary">
               ₹{currentPrice.toFixed(0)}
            </span>
          </div>

          {/* Description */}
          {product.descriptionHtml && product.descriptionHtml.trim() !== '' && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-gray-600 font-normal leading-relaxed text-sm md:text-base">
               <div 
                 className="prose prose-p:mb-2 leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
               />
            </div>
          )}

          {/* Variant Selector Button Grid */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <div className="font-heading font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Select Portion Size</div>
              <div className="flex flex-wrap gap-3 justify-start">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 border cursor-pointer ${
                      selectedVariant.id === variant.id 
                        ? 'bg-[#121212] text-white border-black shadow-sm' 
                        : variant.availableForSale
                          ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                          : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => variant.availableForSale && setSelectedVariant(variant)}
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
            className={`w-full mb-8 py-4 rounded-full font-heading text-lg font-bold tracking-wide transition-all duration-200 ${
              !isAvailable 
                ? 'bg-gray-100 text-gray-400 border border-gray-200/60 cursor-not-allowed' 
                : 'bg-brand-primary text-white hover:bg-brand-secondary shadow-md shadow-brand-primary/10 active:scale-[0.98] cursor-pointer'
            }`}
            onClick={() => {
              if (isAvailable) {
                triggerHaptic(50);
                addToCart(product, selectedVariant);
              }
            }}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Elegant Tabs */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              <button 
                className={`flex-1 py-3 px-2 font-heading text-sm font-bold uppercase tracking-wider transition-colors border-r border-gray-150/40 last:border-r-0 cursor-pointer ${
                  activeTab === 'sourcing' ? 'bg-white text-brand-primary' : 'text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('sourcing')}
              >
                Purity
              </button>
              <button 
                className={`flex-1 py-3 px-2 font-heading text-sm font-bold uppercase tracking-wider transition-colors border-r border-gray-150/40 last:border-r-0 cursor-pointer ${
                  activeTab === 'cooking' ? 'bg-white text-brand-primary' : 'text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('cooking')}
              >
                Guide
              </button>
              <button 
                className={`flex-1 py-3 px-2 font-heading text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'delivery' ? 'bg-white text-brand-primary' : 'text-gray-500 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('delivery')}
              >
                Shipping
              </button>
            </div>
            
            <div className="p-6 text-sm text-gray-600 leading-relaxed font-normal bg-white">
              {getTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
