"use client";
import { useState } from "react";

export default function LiveGoogleReviews() {
  const [reviewCount] = useState(35);
  const [rating] = useState("4.9");

  return (
    <a 
      href="https://share.google/elEFPgCEDjH6qSZun" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block max-w-sm mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-12 flex flex-col relative border border-white/5 transform transition-all duration-300 hover:scale-[1.01] hover:bg-white/10 cursor-pointer"
    >
      {/* Live Pulsing Dot */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
        </span>
        <span className="text-[9px] font-bold text-green-400 uppercase tracking-wider">Live</span>
      </div>

      <div className="flex items-center gap-2 mb-1">
        {/* Map Pin Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-primary">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/55">Google Maps Listing</span>
      </div>

      <h3 className="font-heading font-bold text-xl text-white mb-2 leading-none">Magic Meat</h3>
      
      <div className="flex items-center gap-2.5 mb-3">
        <span className="font-body font-bold text-white text-base">
          {rating}
        </span>
        <div className="flex text-yellow-500 text-lg tracking-tight">
          ★★★★★
        </div>
        <span className="font-body text-brand-secondary text-xs font-semibold hover:underline">
          {reviewCount}+ reviews
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <p className="font-body text-white/45 text-xs">Fresh meat delivery in Hazaribagh</p>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </a>
  );
}
