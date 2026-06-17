'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  return (
    <footer className="bg-[#0B0A0A] text-white pt-16 pb-28 px-6 border-t border-white/[0.04] relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Group */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <img src="/magicmeat_logo.png" alt="Magic Meat Logo" className="w-8 h-8 object-contain" />
          <span className="font-heading font-extrabold text-2xl text-white tracking-tight">Magic Meat</span>
        </div>

        <p className="font-body text-gray-400 mb-8 max-w-sm text-sm leading-relaxed">
          Clean Cuts. Honest Prices. Farm Fresh Quality Delivered To Your Doorstep in <span className="text-brand-primary font-semibold">30 Minutes.</span>
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-4 mb-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200 cursor-pointer hover:scale-110"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200 cursor-pointer hover:scale-110"
            aria-label="Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200 cursor-pointer hover:scale-110"
            aria-label="X (formerly Twitter)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* Minimal Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 font-heading font-semibold text-sm text-gray-400">
           <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
           <span className="hover:text-white transition-colors cursor-pointer">Support</span>
           <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
           <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
        </div>

        {/* Made with love */}
        <div 
          className="text-brand-primary text-xl mb-6 transform -rotate-1"
          style={{ fontFamily: 'var(--font-script), cursive' }}
        >
          Proudly made in Hazaribagh with love ❤️
        </div>

        {/* Copyright */}
        <div className="text-gray-500 font-body text-[11px] tracking-wide">
          &copy; {new Date().getFullYear()} Magic Meat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
