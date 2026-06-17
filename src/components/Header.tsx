'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { openCart, cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const pathname = usePathname();

  if (pathname === '/') return null;

  const categories = [
    { name: 'Shop All', href: '/shop/all' },
    { name: 'Chicken', href: '/shop/chicken' },
    { name: 'Mutton', href: '/shop/mutton' },
    { name: 'Sea Food', href: '/shop/seafood' },
    { name: 'Grocery', href: '/shop/grocery' },
    { name: 'Vegetables', href: '/shop/vegetables' },
    { name: 'Fruits', href: '/shop/fruits' },
    { name: 'Frozen Items', href: '/shop/frozen' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-4 py-4 border-b border-gray-100 relative">
        {/* Left side: Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-[5px] w-7 p-1 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <span className="w-full h-[2px] bg-gray-900 rounded-full"></span>
          <span className="w-full h-[2px] bg-gray-900 rounded-full"></span>
          <span className="w-full h-[2px] bg-gray-900 rounded-full"></span>
        </button>
        
        {/* Logo (Center) */}
        <Link href="/" className="flex items-center justify-center ml-2">
          <img 
            src="/magicmeat_logo.png" 
            alt="Magic Meat Logo" 
            className="h-8 w-auto object-contain brightness-105 contrast-105" 
          />
        </Link>
        
        {/* Right Actions: Call Now + Cart */}
        <div className="flex items-center gap-2.5">
          <a 
            href="tel:+918271663388" 
            className="flex items-center gap-1.5 bg-[#FAF8F5] border border-gray-200 text-gray-800 text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
               <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
             </svg>
             <span>Order on Call</span>
          </a>
          
          <button id="header-cart-icon" className="relative p-1 hover:opacity-70 transition-opacity cursor-pointer" onClick={openCart}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <path d="M16 10a4 4 0 0 1-8 0"></path>
             </svg>
             {totalItems > 0 && (
               <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                 {totalItems}
               </span>
             )}
          </button>
        </div>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Sliding Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
          <h2 className="font-heading font-bold text-xl text-gray-900">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-4">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="font-heading font-bold text-lg text-gray-900 pb-2 border-b border-gray-100 hover:translate-x-1 transition-transform">
            Home
          </Link>
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href} 
              onClick={() => setIsMenuOpen(false)}
              className="font-body font-medium text-base text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all flex items-center gap-3"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-[#FAF8F5]">
           <a href="tel:+918271663388" className="flex items-center justify-center gap-2 bg-brand-primary text-white font-body font-semibold py-3 px-4 rounded-full transition-all hover:bg-brand-secondary hover:shadow-md hover:shadow-brand-primary/10 w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Now
           </a>
        </div>

      </div>
    </>
  );
}
