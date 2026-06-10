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
      <div className="pt-6 pb-4 px-4 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-black/5">
        <h1 className="font-heading font-black text-4xl uppercase tracking-wider text-black">
          MY FAVORITES
        </h1>
        <p className="font-body text-gray-500 font-medium text-sm mt-1">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="p-4">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h2 className="font-heading font-bold text-2xl text-black uppercase mb-2">No Favorites Yet</h2>
            <p className="font-body text-gray-500 mb-8 max-w-[250px]">
              Hit the heart icon on any product to save it here for later.
            </p>
            <Link href="/shop/all" className="bg-[#D4FF00] text-black font-body font-bold px-8 py-3 rounded-full shadow-[0_4px_14px_rgba(212,255,0,0.4)] hover:-translate-y-1 transition-transform">
              EXPLORE MENU
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
