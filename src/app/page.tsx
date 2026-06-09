'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress Bar Animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Fills up to 100 in about 2.5 seconds (25 * 4 = 100, 25 * 100ms = 2500ms)
      });
    }, 100);

    // Redirect to the actual shop page after 2.5 seconds
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="bg-black min-h-screen font-body text-white overflow-hidden">
      
      {/* --- MOBILE APP SPLASH UI --- */}
      <section className="bg-brand-beige min-h-screen relative flex flex-col justify-center items-center max-w-[480px] mx-auto shadow-2xl overflow-hidden border-x-[6px] border-black">

        {/* Brutalist Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        {/* Marquee Background (Brutalist style) */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-5 overflow-hidden pointer-events-none">
           {[...Array(12)].map((_, i) => (
             <div key={i} className={`whitespace-nowrap font-heading font-black text-6xl uppercase transform ${i % 2 === 0 ? '-translate-x-10' : 'translate-x-10'} mb-4`}>
               MAGIC MEAT MAGIC MEAT MAGIC MEAT MAGIC MEAT MAGIC MEAT
             </div>
           ))}
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
           
           {/* Brutalist Logo Box */}
           <div className="bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col items-center mb-16 transform transition-all duration-1000 relative">
              <div className="w-56 h-auto mb-6 flex items-center justify-center">
                 <img src="/magicmeat_logo.png" alt="Magic Meat Logo" className="w-full h-full object-contain" />
              </div>
              <p className="font-heading font-black text-black text-xl tracking-[0.2em] uppercase text-center border-t-[4px] border-black pt-4 w-full">
                 Pure. Fresh. Raw.
              </p>
              
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#D4FF00] border-[4px] border-black"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#FF5A00] border-[4px] border-black"></div>
           </div>

           {/* Brutalist Tagline */}
           <div className="mb-12 transform rotate-[-4deg] z-20 w-full text-center">
              <div className="inline-block bg-[#D4FF00] text-black px-6 py-3 border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] font-heading font-black text-lg sm:text-xl uppercase tracking-widest">
                 Fresh delivery in Hazaribagh!
              </div>
           </div>

           {/* Brutalist Loading Bar */}
           <div className="flex flex-col items-center w-full px-2">
              <div className="w-full max-w-[320px] h-8 bg-white border-[4px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                 <div 
                    className="h-full bg-[#FF5A00] border-r-[4px] border-black transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                 ></div>
              </div>
              
              <div className="mt-8 flex flex-col items-center gap-3">
                 <span className="font-heading font-black text-lg tracking-[0.2em] uppercase text-black bg-[#D4FF00] px-4 py-1.5 border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    LOADING MAGIC... {progress}%
                 </span>
                 <span className="font-heading font-bold tracking-widest uppercase text-black mt-2 bg-white px-2 py-1 border-[2px] border-black">
                    Slicing the freshest cuts
                 </span>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
