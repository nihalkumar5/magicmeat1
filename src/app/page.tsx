'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-white min-h-screen font-body text-gray-900 overflow-hidden">
      
      {/* --- PREMIUM MOBILE APP SPLASH UI --- */}
      <section className="bg-gradient-to-b from-[#F7F1E8] via-white to-[#FFF0E6] min-h-screen relative flex flex-col justify-between items-center max-w-[480px] mx-auto overflow-hidden">

        {/* Ambient Premium Glows */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FF5A00] rounded-full filter blur-[120px] opacity-5 pointer-events-none"></div>

        {/* Subtle Marquee Background */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-5 overflow-hidden pointer-events-none">
           <div className="whitespace-nowrap font-heading font-black text-6xl uppercase text-gray-900 transform -translate-y-12 animate-marquee">
             PREMIUM CUTS PURE FRESH MEAT PREMIUM CUTS PURE FRESH MEAT
           </div>
        </div>

        {/* Top Image Cluster (Premium Layout) */}
        <div className="relative w-full h-[55%] mt-12 flex-shrink-0 z-10 flex items-center justify-center">
          
          {/* Top Left Logo */}
          <div className="absolute top-6 left-8 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl shadow-gray-200/50 border-[4px] border-white z-20">
             <img src="/magicmeat_logo.png" alt="Logo" className="w-16 h-16 object-contain" />
          </div>

          {/* Top Right Image */}
          <div className="absolute top-1 right-6 w-44 h-44 rounded-full overflow-hidden shadow-2xl shadow-orange-900/10 border-[6px] border-white z-10">
            <img src="/premium_mutton_cuts.png" className="w-full h-full object-cover scale-110" alt="Mutton Cuts" />
          </div>

          {/* Mid Left Image */}
          <div className="absolute top-44 left-6 w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-orange-900/10 border-[6px] border-white z-30">
            <img src="/raw_chicken_cuts.png" className="w-full h-full object-cover" alt="Chicken Cuts" />
          </div>

          {/* Mid Right Icon */}
          <div className="absolute top-52 right-12 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl shadow-gray-200/50 border-[4px] border-white z-20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 px-8 pb-16 text-center w-full flex flex-col items-center">
          <h1 className="font-heading font-black text-[2.5rem] text-gray-900 mb-5 leading-[1.1] tracking-tight">
            Discover the magic of fresh meat!
          </h1>
          <p className="font-body text-gray-500 font-medium text-lg mb-10 max-w-[280px] leading-relaxed">
            Premium, raw, and delivered fresh to your doorstep in Hazaribagh.
          </p>
          {/* Loading Indicator */}
          <div className="w-full flex flex-col items-center gap-3 mt-4">
            <div className="w-10 h-10 border-[3px] border-[#FF5A00]/20 border-t-[#FF5A00] rounded-full animate-spin"></div>
            <span className="font-heading font-bold text-[#FF5A00] uppercase tracking-[0.2em] text-xs animate-pulse">Loading Magic</span>
          </div>
        </div>
      </section>
    </div>
  );
}
