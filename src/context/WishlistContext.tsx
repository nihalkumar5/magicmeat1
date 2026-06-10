'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/shopify';

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('magicmeat_wishlist');
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save to localStorage when modified
  const saveWishlist = (items: Product[]) => {
    setWishlistItems(items);
    try {
      localStorage.setItem('magicmeat_wishlist', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  };

  const toggleWishlist = (product: Product) => {
    const isExisting = wishlistItems.some((item) => item.id === product.id);
    let newItems;
    if (isExisting) {
      newItems = wishlistItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...wishlistItems, product];
    }
    saveWishlist(newItems);
    
    // Haptic feedback
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(isExisting ? 20 : [30, 50, 30]); // Distinct vibration for adding
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
