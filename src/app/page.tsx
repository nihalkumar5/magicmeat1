'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out 500ms before the route transition
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    const routeTimer = setTimeout(() => {
      router.push('/shop');
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(routeTimer);
    };
  }, [router]);

  return (
    <div className={`bg-[#F4F3F0] min-h-screen font-body overflow-hidden select-none transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Cinematic Full Screen Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/gourmet_hero_background.png" 
          alt="Premium Raw Meat Background" 
          className="w-full h-full object-cover opacity-25 scale-105 animate-[zoom-out_20s_ease-out_infinite] mix-blend-multiply"
        />
        {/* Soft, balanced luxury cream/beige gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4F3F0]/65 via-[#F4F3F0]/30 to-[#F4F3F0]/95 z-10" />
      </div>

      {/* Splash Screen Content Container */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between items-center max-w-[480px] mx-auto px-6 py-16 text-gray-900">
        
        {/* Top Section: Elegant Subtle Branding */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-[fadeInDown_1.2s_ease-out]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Estd. 2021</span>
          <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"></div>
        </div>

        {/* Center Section: Core Branding & Tagline */}
        <div className="flex flex-col items-center text-center max-w-[340px] gap-6 my-auto">
          {/* Circular Glass Logo Container */}
          <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.06)] relative group overflow-hidden mb-3 animate-[scaleUp_1.4s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Ambient Pulsing Glow behind logo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/15 via-transparent to-transparent opacity-40 animate-pulse" />
            <img 
              src="/magicmeat_logo.png" 
              alt="Magic Meat Logo" 
              className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-[scaleUp_1.4s_cubic-bezier(0.16,1,0.3,1)]" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight leading-tight text-gray-900 drop-shadow-sm animate-[fadeInUp_1.2s_ease-out_0.2s_both]">
              Magic Meat
            </h1>
            <div className="h-[1.5px] w-8 bg-brand-primary mx-auto my-1 rounded-full animate-[scaleWidth_1.2s_ease-out_0.3s_both]"></div>
            <p className="font-body text-gray-600 text-xs sm:text-sm font-medium leading-relaxed tracking-wider max-w-[280px] mx-auto animate-[fadeInUp_1.2s_ease-out_0.4s_both]">
              Premium, fresh raw cuts delivered to your kitchen in 30 minutes.
            </p>
          </div>
        </div>

        {/* Bottom Section: Sleek Loading Status */}
        <div className="w-full flex flex-col items-center gap-4 animate-[fadeInUp_1.2s_ease-out_0.6s_both]">
          {/* Sleek Line Progress Indicator */}
          <div className="relative w-40 h-[2px] bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-full w-full origin-left scale-x-0 animate-[loading-bar_2.8s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 animate-pulse">
            Securing Freshness
          </span>
        </div>

      </section>

      {/* custom inline animation definitions */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes zoom-out {
          0% { transform: scale(1.08); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        @keyframes loading-bar {
          0% { transform: scaleX(0); transform-origin: left; }
          45% { transform: scaleX(0.7); transform-origin: left; }
          60% { transform: scaleX(0.7); transform-origin: left; }
          90% { transform: scaleX(1); transform-origin: left; }
          91% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scaleWidth {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}} />
    </div>
  );
}
