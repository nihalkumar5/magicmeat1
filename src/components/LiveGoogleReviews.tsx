"use client";
import { useState, useEffect } from "react";

export default function LiveGoogleReviews() {
  const [reviewCount, setReviewCount] = useState(24);
  const [rating, setRating] = useState("4.8");
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate real-time update on mount
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setReviewCount(30);
        setRating("4.9");
        setIsUpdating(false);
      }, 800);
    }, 2500);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(255,255,255,0.05)] mb-12 flex flex-col relative border border-white/20 transform transition-all duration-500 hover:-translate-y-1">
      {/* Live Indicator */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4FF00]"></span>
        </span>
        <span className="text-[10px] font-bold text-[#D4FF00] uppercase tracking-widest">Live</span>
      </div>

      <h3 className="font-body font-bold text-2xl text-white mb-2">MagicMeat</h3>
      
      <div className="flex items-center gap-2.5 mb-2">
        <span className={`font-body font-bold text-gray-200 text-lg transition-colors duration-300 ${isUpdating ? 'text-[#D4FF00]' : ''}`}>
          {rating}
        </span>
        <div className="flex text-[#D4FF00] text-xl tracking-tight" style={{textShadow: '0 0 5px rgba(212,255,0,0.5)'}}>
          ★★★★★
        </div>
        <span className={`font-body text-[#D4FF00] text-sm font-medium hover:underline cursor-pointer transition-colors duration-300`}>
          {reviewCount} Google reviews
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="font-body text-gray-300 text-sm">Meat products store</p>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </div>
  );
}
