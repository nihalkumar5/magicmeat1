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

  // Dynamic Date-based Store Closure Notice logic
  // Target closed date: 2026-07-24 (Friday)
  const [noticeStatus, setNoticeStatus] = useState<'tomorrow_closed' | 'today_closed' | 'open' | null>(null);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const CLOSED_DATE = '2026-07-24';

    if (todayStr < CLOSED_DATE) {
      setNoticeStatus('tomorrow_closed');
    } else if (todayStr === CLOSED_DATE) {
      setNoticeStatus('today_closed');
    } else {
      setNoticeStatus('open');
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
      {/* Dynamic Store Closure Announcement Banner */}
      {noticeStatus === 'tomorrow_closed' && (
        <div className="bg-gradient-to-r from-red-700 via-brand-primary to-red-700 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-heading font-bold shadow-md relative z-50 flex items-center justify-center gap-2">
          <span className="text-base">📢</span>
          <span>
            <strong className="underline underline-offset-2">STORE NOTICE:</strong> Dukan kal 1 din ke liye band rahegi. Parso se deliveries wapas shuru ho jayengi! (Store closed tomorrow • Reopens day after tomorrow).
          </span>
        </div>
      )}

      {noticeStatus === 'today_closed' && (
        <div className="bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-heading font-bold shadow-md relative z-50 flex items-center justify-center gap-2 animate-pulse">
          <span className="text-base">🛑</span>
          <span>
            <strong className="underline underline-offset-2">STORE CLOSED TODAY:</strong> Aaj dukan 1 din ke liye band hai. Kal se normal deliveries wapas shuru ho jayengi! (Store closed today • Reopens tomorrow).
          </span>
        </div>
      )}

      {/* Premium Announcement Marquee (Scrolling Ticker) */}
      <div className="bg-[#121212] text-white py-2 overflow-hidden text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-[0.2em] relative z-50 border-b border-white/5 flex items-center">
        <div className="flex w-max whitespace-nowrap animate-[marquee_35s_linear_infinite] gap-12 items-center">
          {noticeStatus === 'tomorrow_closed' && (
            <>
              <span className="flex items-center gap-2 text-amber-400">⚠️ STORE CLOSED TOMORROW • REOPENS DAY AFTER TOMORROW</span>
              <span className="text-gray-600">•</span>
            </>
          )}
          {noticeStatus === 'today_closed' && (
            <>
              <span className="flex items-center gap-2 text-red-400">🛑 STORE CLOSED TODAY • REOPENS TOMORROW</span>
              <span className="text-gray-600">•</span>
            </>
          )}
          <span className="flex items-center gap-2">⚡ Free Delivery on orders above ₹249</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🥩 100% Fresh & Premium Meat</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🍗 Premium Farm-Fresh Chicken</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🥬 Hygienically Cleaned & Packed</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🚀 30 Mins Express Delivery in Hazaribagh</span>
          <span className="text-gray-600">•</span>
          
          {/* Duplicate set for seamless loop */}
          {noticeStatus === 'tomorrow_closed' && (
            <>
              <span className="flex items-center gap-2 text-amber-400">⚠️ STORE CLOSED TOMORROW • REOPENS DAY AFTER TOMORROW</span>
              <span className="text-gray-600">•</span>
            </>
          )}
          {noticeStatus === 'today_closed' && (
            <>
              <span className="flex items-center gap-2 text-red-400">🛑 STORE CLOSED TODAY • REOPENS TOMORROW</span>
              <span className="text-gray-600">•</span>
            </>
          )}
          <span className="flex items-center gap-2">⚡ Free Delivery on orders above ₹249</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🥩 100% Fresh & Premium Meat</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🍗 Premium Farm-Fresh Chicken</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🥬 Hygienically Cleaned & Packed</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-2">🚀 30 Mins Express Delivery in Hazaribagh</span>
          <span className="text-gray-600">•</span>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        ` }} />
      </div>

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
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-black/[0.05] bg-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <img src="/magicmeat_logo.png" alt="Magic Meat Logo" className="w-12 h-12 object-contain bg-white/60 p-1 rounded-xl border border-white/90 shadow-sm" />
            <h2 className="font-heading font-black text-xl text-gray-900 tracking-tight ml-1">Menu</h2>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-black/5 border border-black/[0.06] hover:bg-black/10 text-gray-600 hover:text-gray-900 rounded-full transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Drawer Links in a 3-Column Grid */}
        <div className="flex-1 overflow-y-auto py-5 px-6 flex flex-col gap-4 scrollbar-thin">
          <div className="grid grid-cols-3 gap-x-4 gap-y-7 py-3">
            {/* Home Card */}
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)} 
              className="group flex flex-col items-center justify-center text-center p-2 transition-all cursor-pointer"
            >
              <span className="text-brand-primary group-hover:scale-110 transition-transform flex items-center justify-center w-12 h-12">
                <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="font-script font-bold text-[20px] text-gray-850 group-hover:text-brand-primary mt-1 transition-colors leading-tight">Home</span>
            </Link>

            {/* Category Cards */}
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.href} 
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col items-center justify-center text-center p-2 transition-all cursor-pointer"
              >
                <span className="group-hover:scale-110 transition-all flex items-center justify-center w-12 h-12">
                  <img src={cat.icon} alt={cat.name} className="w-11 h-11 object-contain" />
                </span>
                <span className="font-script font-bold text-[20px] text-gray-850 group-hover:text-brand-primary mt-1 transition-colors leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-black/[0.05] bg-white/20 shrink-0">
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
