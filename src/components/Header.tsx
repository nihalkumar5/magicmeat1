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
        {/* Left side: Hamburger Menu + Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="relative z-10 flex items-center justify-center w-8 h-8 text-[#121212] hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <Link href="/" className="flex items-center justify-center">
            <img 
              src="/magicmeat_logo.png" 
              alt="Magic Meat Logo" 
              style={{ height: '36px', width: '36px' }}
              className="object-contain brightness-105 contrast-105" 
            />
          </Link>
        </div>
        
        {/* Right Actions: Call Now + Cart */}
        <div className="relative z-10 flex items-center gap-2.5">
          <a 
            href="tel:+918271663388" 
            className="flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/15 text-brand-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-brand-primary/20 hover:shadow-[0_4px_12px_rgba(168,32,26,0.08)] transition-all duration-200 whitespace-nowrap"
          >
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-brand-primary">
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
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#0E0D0D]/95 backdrop-blur-2xl border-r border-white/10 z-[70] shadow-[15px_0_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-[#0E0D0D]/40">
          <div className="flex items-center gap-2">
            <img src="/magicmeat_logo.png" alt="Magic Meat Logo" className="w-7 h-7 object-contain bg-white/10 p-0.5 rounded-lg" />
            <h2 className="font-heading font-extrabold text-lg text-white tracking-tight">Menu</h2>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-5 px-5 flex flex-col gap-3 scrollbar-thin">
          <Link 
            href="/shop" 
            onClick={() => setIsMenuOpen(false)} 
            className="group font-heading font-extrabold text-lg text-white py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all flex items-center justify-between shadow-sm"
          >
            <span>Home</span>
            <span className="text-brand-secondary group-hover:translate-x-1 transition-transform font-bold">&rarr;</span>
          </Link>
          
          <div className="h-[1px] bg-white/10 my-1" />
          
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href} 
              onClick={() => setIsMenuOpen(false)}
              className="group font-body font-semibold text-base text-white/70 hover:text-white py-3 px-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.08] transition-all flex items-center justify-between"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
              <span className="text-white/20 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all font-bold text-sm">&rarr;</span>
            </Link>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0E0D0D]/80">
           <a 
             href="tel:+918271663388" 
             className="flex items-center justify-center gap-2 bg-brand-primary text-white font-body font-bold text-sm uppercase tracking-wider py-4 px-4 rounded-full transition-all hover:bg-brand-secondary hover:shadow-[0_4px_16px_rgba(168,32,26,0.35)] active:scale-[0.98] w-full"
           >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Now
           </a>
        </div>

      </div>
    </>
  );
}
