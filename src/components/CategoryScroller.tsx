'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CategoryScroller({ activeCategory }: { activeCategory: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoriesList = [
     { name: 'All', href: '/shop/all' },
     { name: 'Chicken', href: '/shop/chicken' },
     { name: 'Mutton', href: '/shop/mutton' },
     { name: 'Sea Food', href: '/shop/seafood' },
     { name: 'Grocery', href: '/shop/grocery' },
     { name: 'Vegetables', href: '/shop/vegetables' },
     { name: 'Fruits', href: '/shop/fruits' },
     { name: 'Frozen', href: '/shop/frozen' },
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
    <div ref={scrollRef} className="flex overflow-x-auto gap-3 pb-2 mb-6 hide-scrollbar snap-x">
       {categoriesList.map(cat => {
          const isActive = activeCategory.toLowerCase() === cat.href.split('/').pop();
          return (
             <Link 
               href={cat.href} 
               key={cat.name}
               data-active={isActive}
               className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm border snap-start ${isActive ? 'bg-[#D4FF00] text-black border-transparent shadow-[0_4px_12px_rgba(212,255,0,0.3)]' : 'bg-white/60 backdrop-blur-md text-gray-700 border-white/50 hover:bg-white hover:text-black'}`}
             >
               {cat.name}
             </Link>
          );
       })}
    </div>
  );
}
