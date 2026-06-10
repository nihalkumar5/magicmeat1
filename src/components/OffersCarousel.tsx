'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    id: 1,
    title: 'FARM FRESH',
    subtitle: 'PREMIUM',
    desc: 'Straight from local farms',
    btnText: 'SHOP NOW',
    href: '/shop',
    img: '/offers/farm_fresh.png',
    bgColor: 'bg-[#D4FF00]', // Lime Green
  },
  {
    id: 2,
    title: 'PREMIUM',
    subtitle: 'PACKING',
    desc: 'Vacuum sealed for freshness & hygiene',
    btnText: 'SHOP NOW',
    href: '/shop/all',
    img: '/offers/premium_packing.png',
    bgColor: 'bg-brand-primary', // Orange
  },
  {
    id: 3,
    title: '30 MIN',
    subtitle: 'DELIVERY',
    desc: 'Lightning fast to your door',
    btnText: 'ORDER NOW',
    href: '/shop/mutton',
    img: '/offers/mutton.png',
    bgColor: 'bg-white', // White
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
    }, 4000); // 4 seconds interval

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
    <div className="w-full relative px-4 pt-8">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
      >
        {FEATURES.map((feature) => (
          <div 
            key={feature.id} 
            className="w-full min-w-full snap-center px-1"
          >
            <div className={`relative w-full h-[220px] ${feature.bgColor} border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform`}>
              
              {/* Top Half: Image */}
              <div className="w-full h-[65%] relative border-b-[4px] border-black overflow-hidden">
                <img 
                  src={feature.img} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Bottom Half: Solid Color & Text */}
              <div className="w-full h-[35%] px-3 flex justify-between items-center relative">
                <div className="flex flex-col z-10 truncate pr-2">
                  <h2 className="font-heading text-black text-[22px] sm:text-3xl font-black uppercase tracking-widest leading-none mb-0.5 truncate">
                    {feature.title} <span className="opacity-60">{feature.subtitle}</span>
                  </h2>
                  <p className="font-body text-black font-bold text-[10px] sm:text-xs uppercase tracking-widest truncate">{feature.desc}</p>
                </div>
                
                <Link href={feature.href} className="bg-black text-white text-[11px] sm:text-sm font-heading font-black px-4 py-2 uppercase tracking-widest border-[3px] border-black hover:bg-white hover:text-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all z-10 whitespace-nowrap">
                  {feature.btnText}
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-1">
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
            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-black' : 'w-2 bg-black/20'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
