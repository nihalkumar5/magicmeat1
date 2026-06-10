'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  return (
    <footer className="bg-white text-black pt-12 pb-28 px-6 border-t-[4px] border-[#FF5A00]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <h3 className="font-heading font-black text-4xl uppercase tracking-widest text-[#FF5A00] mb-4">MAGIC MEAT</h3>
        <p className="font-body text-gray-600 mb-8 max-w-sm text-sm leading-relaxed">
          Clean Cuts. Honest Prices. Farm Fresh Quality Delivered To Your Doorstep in <span className="text-[#FF5A00] font-bold">30 Minutes.</span>
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-4 mb-8">
          <div className="w-10 h-10 rounded-full border border-black/20 bg-black/5 flex items-center justify-center text-black font-heading font-bold hover:bg-[#FF5A00] hover:text-white hover:border-[#FF5A00] transition-all cursor-pointer hover:scale-110">
            IG
          </div>
          <div className="w-10 h-10 rounded-full border border-black/20 bg-black/5 flex items-center justify-center text-black font-heading font-bold hover:bg-[#FF5A00] hover:text-white hover:border-[#FF5A00] transition-all cursor-pointer hover:scale-110">
            FB
          </div>
          <div className="w-10 h-10 rounded-full border border-black/20 bg-black/5 flex items-center justify-center text-black font-heading font-bold hover:bg-[#FF5A00] hover:text-white hover:border-[#FF5A00] transition-all cursor-pointer hover:scale-110">
            X
          </div>
        </div>

        {/* Minimal Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 font-heading font-bold text-sm text-gray-500 uppercase tracking-widest">
           <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
           <span className="text-gray-300">|</span>
           <span className="hover:text-black transition-colors cursor-pointer">Support</span>
           <span className="text-gray-300">|</span>
           <span className="hover:text-black transition-colors cursor-pointer">Privacy</span>
        </div>

        {/* Made with love */}
        <div 
          className="text-[#FF5A00] text-xl mb-6 transform -rotate-2"
          style={{ fontFamily: 'var(--font-script), cursive' }}
        >
          Proudly made in Hazaribagh with love ❤️
        </div>

        {/* Copyright */}
        <div className="text-gray-400 font-body text-[10px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} MAGIC MEAT. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
