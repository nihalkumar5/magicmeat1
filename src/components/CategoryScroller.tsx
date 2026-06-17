'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CategoryScroller({ activeCategory }: { activeCategory: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoriesList = [
     { 
       name: 'All', 
       href: '/shop/all',
       icon: (
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 2A5 5 0 0 0 7 7c0 2 1.5 3.5 3 4.5V18a2 2 0 0 0 4 0v-6.5c1.5-1 3-2.5 3-4.5A5 5 0 0 0 12 2z" />
           <path d="M10 13.5h4" />
         </svg>
       )
     },
     { 
       name: 'Fruits', 
       href: '/shop/fruits',
       icon: (
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 22c4.97 0 9-4.03 9-9 0-4.07-2.73-7.5-6.5-8.5C13.73 3.5 12 2 12 2s-.27 2.5-1.5 3.5C6.73 6.5 4 9.93 4 14c0 4.97 4.03 9 9 9z" />
           <path d="M12 6c.5-2 .5-2 1.5-3" />
         </svg>
       )
     },
     { 
       name: 'Frozen', 
       href: '/shop/frozen',
       icon: (
         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <line x1="12" y1="2" x2="12" y2="22" />
           <line x1="2" y1="12" x2="22" y2="12" />
           <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
           <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
         </svg>
       )
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
                {cat.icon}
                <span>{cat.name}</span>
             </Link>
          );
       })}
    </div>
  );
}
