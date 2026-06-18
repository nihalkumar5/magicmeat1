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
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1"></rect>
          <rect x="14" y="3" width="7" height="5" rx="1"></rect>
          <rect x="14" y="12" width="7" height="9" rx="1"></rect>
          <rect x="3" y="16" width="7" height="5" rx="1"></rect>
        </svg>
      )
    },
    { 
      name: 'Chicken', 
      href: '/shop/chicken',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 16c0-4.5-3.5-8-8-8s-8 3.5-8 8v4h16v-4z" />
          <path d="M8 8c1.5-3 4.5-3 5 0" />
          <path d="M16 14h3l1-2-4-1" />
          <circle cx="6" cy="12" r="1" />
        </svg>
      )
    },
    { 
      name: 'Mutton', 
      href: '/shop/mutton',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3c-1.5 0-3 1.5-3 3v2M8 3c1.5 0 3 1.5 3 3v2" />
          <path d="M12 8c-2.5 0-4 1.5-4 4.5s1.5 4 4 4.5c2.5-.5 4-1.5 4-4.5S14.5 8 12 8z" />
          <path d="M10 17.5l2 1.5 2-1.5" />
        </svg>
      )
    },
    { 
      name: 'Sea Food', 
      href: '/shop/seafood',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12c4-8 16-8 20 0-4 8-16 8-20 0z" />
          <path d="M19 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0z" />
          <path d="M2 12L7 7M2 12L7 17" />
        </svg>
      )
    },
    { 
      name: 'Grocery', 
      href: '/shop/grocery',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    { 
      name: 'Vegetables', 
      href: '/shop/vegetables',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2A5 5 0 0 0 7 7c0 2 1.5 3.5 3 4.5V18a2 2 0 0 0 4 0v-6.5c1.5-1 3-2.5 3-4.5A5 5 0 0 0 12 2z" />
          <path d="M10 13.5h4" />
        </svg>
      )
    },
    { 
      name: 'Fruits', 
      href: '/shop/fruits',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c4.97 0 9-4.03 9-9 0-4.07-2.73-7.5-6.5-8.5C13.73 3.5 12 2 12 2s-.27 2.5-1.5 3.5C6.73 6.5 4 9.93 4 14c0 4.97 4.03 9 9 9z" />
          <path d="M12 6c.5-2 .5-2 1.5-3" />
        </svg>
      )
    },
    { 
      name: 'Frozen Items', 
      href: '/shop/frozen',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        </svg>
      )
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
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Sliding Bottom Sheet Drawer */}
      <div className={`fixed bottom-0 left-0 w-full h-[60%] bg-white/70 backdrop-blur-3xl z-[70] rounded-t-[2.5rem] transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-y-0 border-t border-white/60 shadow-[0_-12px_30px_rgba(0,0,0,0.06)]' : 'translate-y-full border-transparent shadow-none'}`}>
        
        {/* iOS Drag Handle indicator */}
        <div className="w-12 h-1 bg-gray-400/35 rounded-full mx-auto mt-3.5 mb-1 shrink-0" />

        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-white/50 bg-white/10 shrink-0">
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
              className="group flex flex-col items-center justify-center text-center p-3 aspect-square rounded-[1.5rem] bg-white/60 border border-white/90 hover:bg-white hover:border-brand-primary/20 hover:shadow-sm transition-all"
            >
              <span className="text-brand-primary group-hover:scale-105 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                className="group flex flex-col items-center justify-center text-center p-3 aspect-square rounded-[1.5rem] bg-white/60 border border-white/90 hover:bg-white hover:border-brand-primary/20 hover:shadow-sm transition-all"
              >
                <span className="text-gray-500 group-hover:text-brand-primary group-hover:scale-105 transition-all">
                  {cat.icon}
                </span>
                <span className="font-body font-bold text-[10px] text-gray-800 group-hover:text-brand-primary mt-1.5 transition-colors line-clamp-1 leading-none">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-white/50 bg-white/20 shrink-0">
           <a 
             href="tel:+918271663388" 
             className="flex items-center justify-center gap-2 bg-brand-primary text-white font-body font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-full transition-all hover:bg-brand-secondary hover:shadow-[0_4px_16px_rgba(168,32,26,0.35)] active:scale-[0.98] w-full"
           >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call Now
           </a>
        </div>
      </div>
    </>
  );
}
