'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { openCart, cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="header-wrapper">
      <div className="container">
        <header className="header">
          {/* Premium Logo — Serif Wordmark */}
          <div className="logo" onClick={() => window.location.href = '/'}>
            Magicmeat
          </div>

          {/* Centered Navigation */}
          <nav className="nav-links">
            <a href="/" className="nav-item active">Shop</a>
            <a href="#catalog" className="nav-item">Collections</a>
            <a href="#trust" className="nav-item">Our Promise</a>
          </nav>

          {/* Header Actions: Call to Order & Cart */}
          <div className="header-actions">
            <a href="tel:8271663388" className="call-trigger-top" title="Order on Call">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="call-trigger-text">Order on Call</span>
            </a>

            <button className="cart-trigger" onClick={openCart}>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}
