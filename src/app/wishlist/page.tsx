'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="min-h-screen bg-brand-beige pb-24">
      {/* Header Space */}
      <div className="pt-6 pb-4 px-6 bg-[#F4F3F0]/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/40">
        <h1 className="font-heading font-extrabold text-3xl text-gray-900 tracking-tight">
          My Favorites
        </h1>
        <p className="font-body text-gray-500 font-semibold text-xs mt-1">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="p-4 max-w-5xl mx-auto">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-24 h-24 bg-red-50/50 border border-red-100/30 rounded-full flex items-center justify-center shadow-sm shadow-red-100/10 mb-6 text-brand-primary/40">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h2 className="font-heading font-extrabold text-xl text-gray-900 tracking-tight mb-2">No favorites yet</h2>
            <p className="font-body text-gray-550 text-sm mb-8 max-w-[280px] leading-relaxed">
              Tap the heart icon on any product to save your favorite cuts here for later.
            </p>
            <Link 
              href="/shop/all" 
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-heading font-extrabold text-[11px] uppercase tracking-widest px-8 py-3.5 rounded-full shadow-md shadow-brand-primary/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
