'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '@/lib/shopify';

export default function SearchBar({ products = [] }: { products?: Product[] }) {
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

  // Filter products based on query using the passed 'products' prop
  const searchResults = query.trim() ? products.filter(p => 
    p.title?.toLowerCase().includes(query.toLowerCase()) || 
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    p.descriptionHtml?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5) : []; // Show top 5 matches

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form ref={wrapperRef} onSubmit={handleSearch} className="relative w-full max-w-md mx-auto z-40">
      <div className="relative group">
        <input
          type="text"
          placeholder="Search chicken, fresh meats, groceries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-white border border-gray-200 py-3.5 px-5 pl-12 rounded-full text-base font-body text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/50 transition-all placeholder:text-gray-400"
        />
        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        
        {query && (
          <button 
            type="button" 
            onClick={() => {
              setQuery('');
              setIsFocused(true);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-100 rounded-full"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown (Clean) */}
      {isFocused && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 max-h-[350px] overflow-y-auto overflow-hidden">
          {searchResults.length > 0 ? (
            <div className="flex flex-col py-2">
              {searchResults.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/product/${product.handle}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <img src={product.images[0]?.url} alt={product.title} className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
                  <div className="flex flex-col">
                    <span className="font-body font-semibold text-sm text-gray-900 line-clamp-1">{product.title}</span>
                    <span className="font-body text-xs text-brand-primary font-medium">₹{product.priceRange.minVariantPrice.amount}</span>
                  </div>
                </Link>
              ))}
              <div className="px-4 py-3 border-t border-gray-50 mt-1">
                <button 
                  type="submit" 
                  className="w-full py-2 bg-gray-50 rounded-xl text-brand-primary font-body font-semibold text-sm hover:bg-orange-50 transition-colors"
                >
                  View all results
                </button>
              </div>
            </div>
          ) : (
             <div className="p-8 text-center font-body text-gray-500">
                <span className="text-2xl mb-2 block">🧐</span>
                No items found for "{query}"
             </div>
          )}
        </div>
      )}
    </form>
  );
}
