'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    handleCheckout,
    cartSubtotal,
    checkoutLoading
  } = useCart();

  if (!isCartOpen) return null;

  // Overlay component (clicking outside closes the drawer)
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Cart Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#F4F3F0] flex flex-col transform transition-transform duration-300 overflow-hidden shadow-2xl border-l border-gray-150">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-20 shadow-sm">
          <h2 className="font-heading font-extrabold text-xl text-gray-900">Your Bag</h2>
          <button 
            onClick={closeCart}
            className="w-9 h-9 bg-white border border-gray-200 hover:bg-gray-50 rounded-full text-gray-600 flex items-center justify-center transition-all shadow-sm active:scale-90 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F4F3F0]">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6 shadow-sm">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900">Your bag is empty</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-[240px]">Looks like you haven't added any fresh cuts yet.</p>
              <button 
                onClick={closeCart}
                className="mt-6 bg-[#121212] text-white font-heading font-bold text-sm px-6 py-3 rounded-full hover:bg-brand-primary shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => {
                const imageUrl = item.product.images[0]?.url || '/placeholder.png';
                const price = parseFloat(item.variant.price.amount);
                
                return (
                  <div key={item.variant.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 relative group transition-all duration-300 hover:shadow-sm shadow-[0_2px_12px_rgba(0,0,0,0.01)] mb-1">
                    {/* Remove Item Button */}
                    <button 
                      onClick={() => removeFromCart(item.variant.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-sm transition-all z-10 hover:scale-110 cursor-pointer"
                      title="Remove item"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <div className="w-20 h-20 overflow-hidden rounded-xl flex-shrink-0 bg-gray-50 border border-gray-100">
                      <img 
                        src={imageUrl} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover filter transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div>
                        <h4 className="font-body font-bold text-sm text-gray-900 leading-snug line-clamp-2">{item.product.title}</h4>
                        {item.variant.title && item.variant.title !== 'Default Title' && (
                          <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1 inline-block bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                            {item.variant.title}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="font-heading font-extrabold text-lg text-gray-900 flex items-center gap-0.5">
                          <span className="text-gray-500 font-semibold text-sm">₹</span>{price.toFixed(0)}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-50 border border-gray-200/60 rounded-full overflow-hidden h-8">
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold text-xs text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] z-20">
            <div className="flex justify-between items-center mb-6">
              <span className="font-heading font-bold text-gray-500 text-xs uppercase tracking-wider">Subtotal</span>
              <span className="font-heading font-black text-2xl text-gray-900">₹{cartSubtotal.toFixed(0)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className={`w-full bg-brand-primary text-white font-heading font-bold text-lg py-4 rounded-full shadow-md shadow-brand-primary/10 hover:bg-brand-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${checkoutLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span>{checkoutLoading ? 'Processing...' : 'Checkout Safely'}</span>
              {!checkoutLoading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              )}
            </button>
            <p className="text-center text-gray-400 font-semibold text-[9px] mt-4 uppercase tracking-wider">
              Secure Checkout • Fast Delivery • Premium Quality
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
