'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    id: 1,
    title: 'Farm Fresh Cuts',
    subtitle: 'Premium Sourced',
    desc: 'Straight from local farms to your kitchen',
    btnText: 'Shop Fresh',
    href: '/shop',
    img: '/offers/farm_fresh.png',
  },
  {
    id: 2,
    title: 'Vacuum Sealed',
    subtitle: 'Hygienic Packaging',
    desc: 'Locks in freshness, taste, & tenderness',
    btnText: 'Explore',
    href: '/shop/all',
    img: '/offers/premium_packing.png',
  },
  {
    id: 3,
    title: '30-Min Delivery',
    subtitle: 'Lightning Fast',
    desc: 'Delivered super cold to preserve quality',
    btnText: 'Order Now',
    href: '/shop/mutton',
    img: '/offers/mutton.png',
  }
];

export default function OffersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % FEATURES.length;
        const cardWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        setActiveIndex(nextIndex);
      }
    }, 4500); // 4.5 seconds interval

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Handle manual scroll to update active dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <div className="w-full relative px-4 pt-6">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2"
      >
        {FEATURES.map((feature) => (
          <div 
            key={feature.id} 
            className="w-full min-w-full snap-center px-1"
          >
            <div className="relative w-full h-[220px] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 group cursor-pointer">
              
              {/* Full-bleed Image */}
              <img 
                src={feature.img} 
                alt={feature.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
              />
              
              {/* Soft vignette/gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-10" />
              
              {/* Text & Button Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end z-20">
                <div className="flex flex-col text-white max-w-[65%] truncate">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-secondary mb-1">
                    {feature.subtitle}
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl font-bold leading-tight truncate">
                    {feature.title}
                  </h2>
                  <p className="font-body text-white/75 text-xs sm:text-sm font-light mt-1 truncate">
                    {feature.desc}
                  </p>
                </div>
                
                <Link 
                  href={feature.href} 
                  className="bg-white text-gray-900 text-xs font-body font-semibold px-4.5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 active:scale-95 transition-all z-20 whitespace-nowrap"
                >
                  {feature.btnText}
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-2">
        {FEATURES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: idx * scrollRef.current.offsetWidth,
                  behavior: 'smooth'
                });
                setActiveIndex(idx);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-5 bg-brand-primary' : 'w-1.5 bg-gray-200 hover:bg-gray-300'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
