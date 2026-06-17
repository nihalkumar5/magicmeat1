'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-[#121212] min-h-screen font-body overflow-hidden select-none">
      
      {/* Cinematic Full Screen Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/gourmet_hero_background.png" 
          alt="Premium Raw Meat Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[zoom-out_20s_ease-out_infinite]"
        />
        {/* Rich Vignette and Gradient Overlay for Luxury Cinematic Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95 z-10" />
      </div>

      {/* Splash Screen Content Container */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between items-center max-w-[480px] mx-auto px-6 py-16 text-white">
        
        {/* Top Section: Elegant Subtle Branding */}
        <div className="mt-8 flex flex-col items-center gap-1.5 animate-[fadeInDown_1.2s_ease-out]">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-secondary">Est. 2026</span>
          <div className="h-[1px] w-8 bg-brand-primary/40"></div>
        </div>

        {/* Center Section: Core Branding & Tagline */}
        <div className="flex flex-col items-center text-center max-w-[340px] gap-6 my-auto">
          {/* Circular Glass Logo Container */}
          <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden mb-2 animate-[scaleUp_1.4s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Ambient Pulsing Glow behind logo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <img 
              src="/magicmeat_logo.png" 
              alt="Magic Meat Logo" 
              className="w-14 h-14 object-contain relative z-10 brightness-110 contrast-115 drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]" 
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl tracking-[-0.03em] leading-tight text-white/95 animate-[fadeInUp_1.2s_ease-out_0.2s_both]">
              Magic Meat
            </h1>
            <p className="font-body text-white/60 text-sm sm:text-base font-normal leading-relaxed tracking-wide max-w-[280px] mx-auto animate-[fadeInUp_1.2s_ease-out_0.4s_both]">
              Premium, fresh raw cuts delivered to your kitchen in 30 minutes.
            </p>
          </div>
        </div>

        {/* Bottom Section: Sleek Loading Status */}
        <div className="w-full flex flex-col items-center gap-4 animate-[fadeInUp_1.2s_ease-out_0.6s_both]">
          {/* Sleek Line Progress Indicator */}
          <div className="relative w-32 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full w-full origin-left scale-x-0 animate-[loading-bar_2.8s_ease-in-out_infinite]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
            Securing Freshness
          </span>
        </div>

      </section>

      {/* custom inline animation definitions */}
      <style>{`
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
