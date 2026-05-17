'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ShopifyVariant, createCheckout } from '@/lib/shopify';

export interface CartItem {
  product: Product;
  variant: ShopifyVariant;
  quantity: number;
}

interface CartContextType {
  isCartOpen: boolean;
  cartItems: CartItem[];
  checkoutLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant: ShopifyVariant) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  handleCheckout: () => Promise<void>;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // 1. Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('magicmeat_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // 2. Persist cart items to localStorage on modification
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('magicmeat_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // 3. Add item to cart
  const addToCart = (product: Product, variant: ShopifyVariant) => {
    const existingIndex = cartItems.findIndex((item) => item.variant.id === variant.id);

    if (existingIndex > -1) {
      // Item variant exists, increment its quantity
      const newItems = [...cartItems];
      newItems[existingIndex].quantity += 1;
      saveCart(newItems);
    } else {
      // New item variant, append it
      saveCart([...cartItems, { product, variant, quantity: 1 }]);
    }
    
    // Automatically open the cart drawer for premium tactile feedback
    openCart();
  };

  // 4. Update quantity
  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }

    const newItems = cartItems.map((item) =>
      item.variant.id === variantId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  };

  // 5. Remove item from cart
  const removeFromCart = (variantId: string) => {
    const newItems = cartItems.filter((item) => item.variant.id !== variantId);
    saveCart(newItems);
  };

  // 6. Calculate subtotal
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = parseFloat(item.variant.price.amount);
    return acc + itemPrice * item.quantity;
  }, 0);

  // 7. Handle Shopify Checkout Redirection
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setCheckoutLoading(true);
    try {
      const lineItems = cartItems.map((item) => ({
        variantId: item.variant.id,
        quantity: item.quantity
      }));

      // Call server checkout generator
      const checkoutResult = await createCheckout(lineItems);
      
      if (checkoutResult.url) {
        // Safe redirect to official Shopify secure checkout domain
        window.location.href = checkoutResult.url;
      } else {
        alert(`Could not initialize checkout.\n\n${checkoutResult.error || 'Please try again.'}`);
        setCheckoutLoading(false);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`An error occurred during checkout setup: ${error.message || error}`);
      setCheckoutLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        checkoutLoading,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        handleCheckout,
        cartSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
