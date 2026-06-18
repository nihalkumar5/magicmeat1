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
    { 
      name: 'Shop All', 
      href: '/shop/all',
      icon: '/icons/shop-all-cartoon.svg'
    },
    { 
      name: 'Chicken', 
      href: '/shop/chicken',
      icon: '/icons/chicken-svgrepo-com.svg'
    },
    { 
      name: 'Mutton', 
      href: '/shop/mutton',
      icon: '/icons/goat-svgrepo-com.svg'
    },
    { 
      name: 'Sea Food', 
      href: '/shop/seafood',
      icon: '/icons/fish-svgrepo-com.svg'
    },
    { 
      name: 'Grocery', 
      href: '/shop/grocery',
      icon: '/icons/shopping-bag-svgrepo-com.svg'
    },
    { 
      name: 'Vegetables', 
      href: '/shop/vegetables',
      icon: '/icons/vegetables-salad-svgrepo-com.svg'
    },
    { 
      name: 'Fruits', 
      href: '/shop/fruits',
      icon: '/icons/fruits-svgrepo-com.svg'
    },
    { 
      name: 'Frozen Items', 
      href: '/shop/frozen',
      icon: '/icons/ice-svgrepo-com.svg'
    },
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
        <div className="fixed inset-0 z-[60] bg-black/15" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Sliding Bottom Sheet Drawer */}
      <div className={`fixed bottom-0 left-0 w-full h-[70%] bg-[#FAF8F5]/35 backdrop-blur-2xl z-[70] rounded-t-[2.5rem] transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-y-0 border-t border-white/30 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]' : 'translate-y-full border-transparent shadow-none'}`}>
        
        {/* iOS Drag Handle indicator */}
        <div className="w-12 h-1 bg-gray-400/35 rounded-full mx-auto mt-3.5 mb-1 shrink-0" />

        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-white/20 bg-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/magicmeat_logo.png" alt="Magic Meat Logo" className="w-7 h-7 object-contain bg-white/40 p-0.5 rounded-lg border border-white/80" />
            <h2 className="font-heading font-extrabold text-base text-gray-900 tracking-tight">Menu</h2>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-black/5 border border-black/[0.06] hover:bg-black/10 text-gray-600 hover:text-gray-900 rounded-full transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Drawer Links in a 3-Column Square Grid */}
        <div className="flex-1 overflow-y-auto py-5 px-6 flex flex-col gap-4 scrollbar-thin">
          <div className="grid grid-cols-3 gap-3">
            {/* Home Card */}
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)} 
              className="group flex flex-col items-center justify-center text-center p-3 aspect-square rounded-[1.5rem] bg-white/75 border border-white/80 hover:bg-white hover:border-brand-primary/15 hover:shadow-sm transition-all"
            >
              <span className="text-brand-primary group-hover:scale-105 transition-transform flex items-center justify-center w-10 h-10">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="font-heading font-extrabold text-[11px] text-gray-850 group-hover:text-brand-primary mt-1.5 transition-colors">Home</span>
            </Link>

            {/* Category Cards */}
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.href} 
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col items-center justify-center text-center p-3 aspect-square rounded-[1.5rem] bg-white/75 border border-white/80 hover:bg-white hover:border-brand-primary/15 hover:shadow-sm transition-all"
              >
                <span className="group-hover:scale-105 transition-all flex items-center justify-center w-10 h-10">
                  <img src={cat.icon} alt={cat.name} className="w-9 h-9 object-contain" />
                </span>
                <span className="font-heading font-extrabold text-[11px] text-gray-850 group-hover:text-brand-primary mt-1.5 transition-colors line-clamp-1 leading-none">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-white/20 bg-white/10 shrink-0">
           <a 
             href="tel:+918271663388" 
             className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-heading font-extrabold text-[12px] uppercase tracking-widest py-3.5 px-6 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_20px_rgba(168,32,26,0.3)] hover:scale-[1.01] active:scale-[0.98] w-full cursor-pointer"
           >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Order on Call</span>
           </a>
        </div>
      </div>
    </>
  );
}
