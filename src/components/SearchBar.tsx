'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockProducts } from '@/lib/shopify';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on query
  const searchResults = query.trim() ? mockProducts.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    p.descriptionHtml.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : []; // Show top 5 matches

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSearch} className="relative w-full max-w-md mx-auto z-50">
      <div className="relative">
        <input
          type="text"
          placeholder="SEARCH FOR FRESH MEAT..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-white border-[3px] border-black py-4 px-5 pl-14 text-sm font-heading font-bold uppercase tracking-widest text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:translate-y-[2px] focus:translate-x-[2px] transition-all placeholder:text-gray-400"
        />
        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:text-[#FF5A00] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        
        {query && (
          <button 
            type="button" 
            onClick={() => {
              setQuery('');
              setIsFocused(true);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown (Brutalist) */}
      {isFocused && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] max-h-[350px] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="flex flex-col">
              {searchResults.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.handle}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center gap-3 p-3 border-b-[2px] border-black/10 hover:bg-[#D4FF00] transition-colors last:border-b-0 group"
                >
                  <img src={product.images[0]?.url} alt={product.title} className="w-12 h-12 object-cover border-[2px] border-black group-hover:scale-105 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-heading font-black text-sm uppercase tracking-widest text-black line-clamp-1">{product.title}</span>
                    <span className="font-body text-xs font-bold text-[#FF5A00]">₹{product.priceRange.minVariantPrice.amount}</span>
                  </div>
                </Link>
              ))}
              <button 
                type="submit" 
                className="w-full p-4 bg-black text-white font-heading font-black uppercase tracking-widest text-sm hover:text-[#D4FF00] transition-colors"
              >
                VIEW ALL RESULTS FOR "{query.toUpperCase()}"
              </button>
            </div>
          ) : (
             <div className="p-8 text-center font-heading font-bold uppercase tracking-widest text-gray-500 bg-gray-50">
                <span className="text-2xl mb-2 block">🧐</span>
                NO MEATS FOUND FOR "{query.toUpperCase()}"
             </div>
          )}
        </div>
      )}
    </form>
  );
}
