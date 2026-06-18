'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { triggerHaptic } from '@/utils/haptics';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, handle, images, priceRange } = product;
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const isFavorited = isInWishlist(product.id);
  
  // Format price
  const price = `${parseFloat(priceRange.minVariantPrice.amount).toFixed(0)}`;

  // Find if product is already in cart
  const defaultVariant = product.variants[0];
  const isAvailable = defaultVariant ? defaultVariant.availableForSale : false;
  const cartItem = cartItems.find((item) => item.variant.id === defaultVariant?.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details
    if (!isAvailable) return;
    
    // Haptic feedback
    triggerHaptic(50);

    // Add to cart but DO NOT open drawer
    if (defaultVariant) addToCart(product, defaultVariant, false);

    // Premium Flying Animation
    const buttonElement = e.currentTarget as HTMLElement;
    const cartIconElement = document.getElementById('header-cart-icon') || document.querySelector('.cart-icon-mobile');
    
    if (buttonElement && cartIconElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      const cartRect = cartIconElement.getBoundingClientRect();

      const flyingDot = document.createElement('div');
      flyingDot.style.position = 'fixed';
      flyingDot.style.left = `${buttonRect.left + buttonRect.width / 2 - 8}px`;
      flyingDot.style.top = `${buttonRect.top + buttonRect.height / 2 - 8}px`;
      flyingDot.style.width = '16px';
      flyingDot.style.height = '16px';
      flyingDot.style.backgroundColor = '#A8201A';
      flyingDot.style.borderRadius = '50%';
      flyingDot.style.zIndex = '9999';
      flyingDot.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      flyingDot.style.boxShadow = '0 0 10px rgba(168,32,26,0.4)';
      
      document.body.appendChild(flyingDot);

      // Trigger reflow
      void flyingDot.offsetWidth;

      // Animate to target
      flyingDot.style.left = `${cartRect.left + cartRect.width / 2 - 8}px`;
      flyingDot.style.top = `${cartRect.top + cartRect.height / 2 - 8}px`;
      flyingDot.style.transform = 'scale(0.3)';
      flyingDot.style.opacity = '0.2';

      setTimeout(() => {
        if (document.body.contains(flyingDot)) {
          document.body.removeChild(flyingDot);
        }
        // Small cart bounce effect
        cartIconElement.style.transform = 'scale(1.2)';
        setTimeout(() => { cartIconElement.style.transform = 'scale(1)'; }, 150);
      }, 600);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic(30);
    if (defaultVariant) updateQuantity(defaultVariant.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic(30);
    if (defaultVariant) updateQuantity(defaultVariant.id, quantity - 1);
  };

  const tags = product.tags?.map(t => t.toLowerCase()) || [];
  const collections = product.collections?.map(c => c.title.toLowerCase()) || [];
  const productType = product.productType?.toLowerCase() || '';
  const searchSpace = [...tags, ...collections, productType];

  let subtitle = 'Premium quality fresh cuts';
  let badge = 'FRESH CUT';

  if (searchSpace.some(t => ['mutton', 'goat'].some(s => t.includes(s)))) {
    badge = 'MUTTON';
    subtitle = 'Premium quality fresh cuts';
  } else if (searchSpace.some(t => ['chicken', 'poultry'].some(s => t.includes(s)))) {
    badge = 'CHICKEN';
    subtitle = 'Antibiotic-free fresh birds';
  } else if (searchSpace.some(t => ['fish', 'seafood'].some(s => t.includes(s)))) {
    badge = 'SEAFOOD';
    subtitle = 'Fresh catch of the day';
  } else if (searchSpace.some(t => ['fruits', 'fruit', 'vegetables', 'vegetable', 'vagetable', 'vagetables'].includes(t))) {
    subtitle = 'Farm fresh & handpicked';
    badge = 'FARM FRESH';
  } else if (searchSpace.some(t => ['grocery', 'dairy'].includes(t))) {
    subtitle = 'Daily essentials';
    badge = 'GROCERY';
  } else if (searchSpace.some(t => ['frozen'].includes(t))) {
    subtitle = 'Premium ready to cook';
    badge = 'FROZEN';
  }

  return (
    <div className={`group relative flex flex-col h-full bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
      !isAvailable ? 'opacity-85' : ''
    }`}>
      <Link href={`/product/${handle}`} className="flex-grow flex flex-col cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden flex items-center justify-center">
          <img 
            src={images[0]?.url || '/placeholder.png'} 
            alt={images[0]?.altText || title}
            className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
              !isAvailable ? 'opacity-40 grayscale-[25%]' : ''
            }`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/icons/shopping-bag-svgrepo-com.svg';
              e.currentTarget.className = 'w-1/2 h-1/2 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20';
            }}
          />
          
          {/* Glassmorphic Tag / Out of Stock Tag */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm ${
            isAvailable 
              ? 'bg-white/85 backdrop-blur-md border border-white/40 text-gray-800' 
              : 'bg-black/90 text-white border border-black/30'
          }`}>
            {isAvailable ? badge : 'OUT OF STOCK'}
          </div>
          
          {/* Glassmorphic Heart/Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute top-3 right-3 w-8 h-8 bg-white/85 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center transition-all shadow-sm z-10 hover:scale-105 active:scale-95 ${
              isFavorited ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-primary'
            }`}
          >
             <svg width="14" height="14" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFavorited ? "0" : "2"}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow pt-4 px-4 pb-4">
          <h3 className="font-heading font-bold text-[16px] text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="font-body text-[12px] text-gray-500 mb-3.5 line-clamp-1">
            {subtitle}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="font-heading font-extrabold text-2xl text-gray-900 flex items-center gap-0.5">
               <span className="text-gray-500 font-semibold text-sm">₹</span>{price}
            </div>
            
            {!isAvailable ? (
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100/90 border border-gray-200/55 px-3 py-1.5 rounded-full uppercase tracking-wider select-none">
                Sold Out
              </span>
            ) : quantity === 0 ? (
              <button 
                onClick={handleAdd}
                className="bg-brand-primary text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-brand-secondary transition-all shadow-md shadow-brand-primary/20 active:scale-90 duration-200 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            ) : (
              <div 
                className="flex items-center bg-brand-primary text-white shadow-md shadow-brand-primary/20 rounded-full h-9 overflow-hidden transition-all"
                onClick={(e) => e.preventDefault()}
              >
                <button 
                  onClick={handleDecrement}
                  className="w-8 h-full flex items-center justify-center hover:bg-black/10 rounded-l-full transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span className="font-heading font-bold text-sm w-5 text-center">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="w-8 h-full flex items-center justify-center hover:bg-black/10 rounded-r-full transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
