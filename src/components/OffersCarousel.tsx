'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  {
    id: 1,
    title: 'FARM FRESH',
    subtitle: 'PREMIUM MEAT',
    desc: 'Straight from local farms',
    btnText: 'SHOP NOW',
    href: '/shop',
    img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'ANTIBIOTIC',
    subtitle: 'FREE CUTS',
    desc: '100% chemical free',
    btnText: 'VIEW QUALITY',
    href: '/shop/chicken',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: '30 MIN',
    subtitle: 'FAST DELIVERY',
    desc: 'Lightning fast to your door',
    btnText: 'ORDER NOW',
    href: '/shop/mutton',
    img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
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
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-3xl pb-4"
      >
        {FEATURES.map((feature) => (
          <div 
            key={feature.id} 
            className="w-full min-w-full snap-center px-1"
          >
            <div className="relative w-full h-[180px] sm:h-[200px] rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40">
              
              {/* Full Background Image */}
              <img 
                src={feature.img} 
                alt={feature.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Subtle Dark Overlay to ensure image isn't too bright overall */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Glassmorphism Text Box */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[60%] sm:w-[45%] bg-white/75 backdrop-blur-lg border border-white/60 rounded-2xl p-4 flex flex-col justify-center shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <h2 className="font-heading text-black text-xl sm:text-3xl font-black uppercase tracking-widest leading-none mb-1">
                  {feature.title}<br/>
                  <span className="text-gray-800 text-base sm:text-xl">{feature.subtitle}</span>
                </h2>
                <p className="font-body text-gray-700 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-3">{feature.desc}</p>
                <Link href={feature.href} className="bg-[#D4FF00] text-black text-[10px] sm:text-sm font-heading font-black px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-white transition-all shadow-sm border border-transparent hover:border-black w-max">
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
