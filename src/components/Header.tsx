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
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center px-4 py-4 border-b-[2px] border-black relative">
        {/* Left side: Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-[5px] w-7 p-1 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <span className="w-full h-[2px] bg-black"></span>
          <span className="w-full h-[2px] bg-black"></span>
          <span className="w-full h-[2px] bg-black"></span>
        </button>
        
        {/* Logo (Center) */}
        <Link href="/" className="font-heading text-3xl tracking-widest font-black text-black uppercase relative ml-2">
          MAGIC<span className="opacity-30 mx-1 font-light">|</span>MEAT
        </Link>
        
        {/* Cart Icon (Right) */}
        <button id="header-cart-icon" className="relative p-1 hover:opacity-70 transition-opacity" onClick={openCart}>
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
             <line x1="3" y1="6" x2="21" y2="6"></line>
             <path d="M16 10a4 4 0 0 1-8 0"></path>
           </svg>
           {totalItems > 0 && (
             <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
               {totalItems}
             </span>
           )}
        </button>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Sliding Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-brand-beige z-[70] border-r-[4px] border-black transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b-[3px] border-black bg-[#D4FF00]">
          <h2 className="font-heading font-black text-2xl uppercase tracking-widest text-black">MENU</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:opacity-70 bg-black text-[#D4FF00] rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-4">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="font-heading font-black text-xl uppercase tracking-widest text-black pb-2 border-b-2 border-black/10 hover:translate-x-2 transition-transform">
            HOME
          </Link>
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href} 
              onClick={() => setIsMenuOpen(false)}
              className="font-body font-bold text-lg text-gray-800 hover:text-black hover:translate-x-2 transition-all flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t-[3px] border-black bg-white">
           <a href="tel:+918271663388" className="flex items-center justify-center gap-2 bg-black text-[#D4FF00] font-heading font-black py-3 px-4 uppercase tracking-widest border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              CALL NOW
           </a>
        </div>

      </div>
    </>
  );
}
