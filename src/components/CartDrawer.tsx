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
      <div className="relative w-full max-w-md h-full bg-brand-beige border-l-[6px] border-black flex flex-col transform transition-transform duration-300 overflow-hidden shadow-[-8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-[4px] border-black bg-white z-20 shadow-[0px_4px_0px_rgba(0,0,0,1)]">
          <h2 className="font-heading font-black text-3xl text-black tracking-widest uppercase">YOUR BAG</h2>
          <button 
            onClick={closeCart}
            className="w-10 h-10 bg-white border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-brand-secondary hover:text-white flex items-center justify-center transition-all active:translate-y-1 active:translate-x-1 active:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 bg-brand-beige">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-white border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black rotate-[-5deg]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-heading font-black text-2xl text-black mt-6 tracking-widest uppercase">Your bag is empty</h3>
              <p className="text-black font-bold">Looks like you haven't added any fresh cuts yet.</p>
              <button 
                onClick={closeCart}
                className="mt-6 bg-brand-primary text-black border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] font-heading font-black text-xl px-6 py-3 tracking-widest uppercase hover:bg-black hover:text-white transition-all active:translate-y-1 active:translate-x-1 active:shadow-none"
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
                  <div key={item.variant.id} className="flex gap-4 bg-white/60 backdrop-blur-md p-3 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 relative group mb-4 transition-all duration-300">
                    {/* Remove Item Button */}
                    <button 
                      onClick={() => removeFromCart(item.variant.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-sm transition-all z-10 hover:scale-110"
                      title="Remove item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <div className="w-24 h-24 overflow-hidden rounded-[18px] flex-shrink-0 bg-white/80">
                      <img 
                        src={imageUrl} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover filter transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h4 className="font-body font-bold text-[15px] text-gray-900 leading-snug line-clamp-2">{item.product.title}</h4>
                        {item.variant.title && item.variant.title !== 'Default Title' && (
                          <span className="text-[11px] text-gray-600 font-medium tracking-wide mt-1 inline-block bg-white/50 backdrop-blur-sm border border-white/60 px-2 py-0.5 rounded-lg shadow-sm">
                            {item.variant.title}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="font-body font-bold text-xl text-gray-900 flex items-center gap-0.5">
                          <span className="text-gray-500 font-semibold text-sm">₹</span>{price.toFixed(0)}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-sm overflow-hidden h-8">
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 transition-colors font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 transition-colors font-bold"
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
          <div className="p-6 bg-white border-t-[4px] border-black shadow-[0px_-4px_0px_rgba(0,0,0,1)] z-20">
            <div className="flex justify-between items-center mb-6">
              <span className="font-heading font-bold text-black text-xl tracking-widest uppercase">Subtotal</span>
              <span className="font-heading font-black text-4xl text-black">₹{cartSubtotal.toFixed(0)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className={`w-full bg-brand-primary text-black font-heading font-black text-2xl uppercase tracking-widest py-4 border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 ${checkoutLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span>{checkoutLoading ? 'PROCESSING...' : 'CHECKOUT SAFELY'}</span>
              {!checkoutLoading && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                  <rect x="3" y="11" width="18" height="11" rx="0" ry="0"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              )}
            </button>
            <p className="text-center text-black font-bold text-xs mt-4 uppercase tracking-widest">
              Secure Checkout • Fast Delivery • Premium Quality
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
