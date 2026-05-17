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
          {/* Elegant Logo */}
          <div className="logo" onClick={() => window.location.href = '/'}>
            Magicmeat
            <span className="logo-badge">PREMIUM</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <a href="/" className="nav-item active">Home</a>
            <a href="#meats" className="nav-item">Fresh Meats</a>
            <a href="#seafood" className="nav-item">Seafood</a>
            <a href="#essentials" className="nav-item">Essentials</a>
          </nav>

          {/* Shopping Cart Button */}
          <button className="cart-trigger" onClick={openCart}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </header>
      </div>
    </div>
  );
}
