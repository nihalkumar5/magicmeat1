'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CategoryScroller({ activeCategory }: { activeCategory: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoriesList = [
     { 
       name: 'All', 
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
       name: 'Frozen', 
       href: '/shop/frozen',
       icon: '/icons/ice-svgrepo-com.svg'
     },
  ];

  useEffect(() => {
    // Small timeout ensures layout is painted before calculating scroll position
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeEl) {
          const container = scrollRef.current;
          const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [activeCategory]);

  return (
    <div ref={scrollRef} className="flex overflow-x-auto gap-3 pb-3 mb-6 hide-scrollbar snap-x">
       {categoriesList.map(cat => {
          const isActive = activeCategory.toLowerCase() === cat.href.split('/').pop();
          return (
             <Link 
               href={cat.href} 
               key={cat.name}
               data-active={isActive}
               className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm border snap-start ${isActive ? 'bg-brand-primary text-white border-transparent shadow-[0_4px_12px_rgba(168,32,26,0.25)]' : 'bg-white text-gray-700 border-gray-150 hover:bg-gray-50 hover:text-black'}`}
             >
                <img src={cat.icon} alt={cat.name} className="w-5 h-5 object-contain" />
                <span>{cat.name}</span>
             </Link>
          );
       })}
    </div>
  );
}
