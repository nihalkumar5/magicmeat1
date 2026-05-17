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

          {/* Minimal Cart Icon */}
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
        </header>
      </div>
    </div>
  );
}
