"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    id: 1,
    title: 'Farm Fresh Cuts',
    subtitle: 'Premium Sourced',
    desc: 'Straight from local farms to your kitchen.',
    btnText: 'Shop Fresh',
    href: '/shop',
    img: '/offers/farm_fresh.png',
  },
  {
    id: 2,
    title: 'Vacuum Sealed',
    subtitle: 'Hygienic Packaging',
    desc: 'Locks in freshness, taste, & tenderness.',
    btnText: 'Explore',
    href: '/shop/all',
    img: '/offers/premium_packing.png',
  },
  {
    id: 3,
    title: '30-Min Delivery',
    subtitle: 'Lightning Fast',
    desc: 'Delivered super cold to preserve quality.',
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
    }, 5000); // 5 seconds interval

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
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
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
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer border border-white/5 bg-[#141212]">
              
              {/* Full-bleed Image with hover scale and slight dimming */}
              <img 
                src={feature.img} 
                alt={feature.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 brightness-[0.7]"
              />
              
              {/* Cinematic vertical gradient for strong contrast and premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
              
              {/* Decorative radial overlay for branding glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[90px] pointer-events-none z-10" />

              {/* Floating Glass Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                {feature.subtitle}
              </div>

              {/* Text & Button Overlay Area */}
              <div className="absolute inset-x-6 bottom-6 flex flex-col md:flex-row md:items-end justify-between gap-4 z-20">
                <div className="flex flex-col text-white max-w-lg">
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white mb-1.5 drop-shadow-sm">
                    {feature.title}
                  </h2>
                  <p className="font-body text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-sm sm:max-w-md">
                    {feature.desc}
                  </p>
                </div>
                
                <Link 
                  href={feature.href} 
                  className="inline-flex items-center gap-2 self-start md:self-auto bg-white text-gray-900 hover:bg-brand-primary hover:text-white text-xs sm:text-sm font-body font-semibold px-5.5 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 group/btn whitespace-nowrap"
                >
                  <span>{feature.btnText}</span>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator with premium layout */}
      <div className="flex justify-center items-center gap-1.5 mt-2.5">
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
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'w-7 bg-brand-primary' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
