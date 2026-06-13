import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const products = await getProducts();
  
  const searchResults = query ? products.filter(p => 
    p.title?.toLowerCase().includes(query.toLowerCase()) || 
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    p.descriptionHtml?.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <main className="min-h-screen bg-brand-beige pb-32 font-body">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-brand-beige border-b-[6px] border-black p-4 flex items-center gap-4">
         <Link href="/shop" className="w-10 h-10 shrink-0 border-[3px] border-black rounded-full flex items-center justify-center bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
         </Link>
         <h1 className="font-heading text-2xl uppercase tracking-widest flex-1">SEARCH</h1>
      </div>

      <div className="p-4 pt-6">
        <SearchBar products={products} />
      </div>

      <div className="px-4 py-4">
        {query ? (
          <div className="mb-6 pb-2 border-b-[3px] border-black">
             <h2 className="font-heading text-xl uppercase tracking-widest">
               Results for "{query}"
             </h2>
             <p className="text-gray-500 text-sm mt-1">{searchResults.length} products found</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             <h2 className="font-heading text-xl uppercase tracking-widest text-center">
               What are you craving?
             </h2>
             <p className="text-sm mt-2">Search for chicken, mutton, fish...</p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(product => (
               <div key={product.id}>
                 <ProductCard product={product} />
               </div>
            ))}
          </div>
        ) : query ? (
           <div className="text-center py-16 bg-white rounded-[24px] border border-gray-100 shadow-sm mt-8">
             <span className="text-4xl mb-4 block">🍖</span>
             <h3 className="font-heading text-xl uppercase tracking-widest mb-2 text-black">No Matches Found</h3>
             <p className="text-gray-500 text-sm max-w-[200px] mx-auto">We couldn't find anything matching your search. Try another keyword!</p>
           </div>
        ) : null}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-[6px] border-black z-50 flex justify-between px-6 py-4 pb-8">
         <Link href="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-black transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="font-heading text-xs font-bold uppercase tracking-wider">HOME</span>
         </Link>
         
         <Link href="/shop" className="flex flex-col items-center gap-1 text-gray-500 hover:text-black transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="font-heading text-xs font-bold uppercase tracking-wider">SHOP</span>
         </Link>
         
         <Link href="/search" className="flex flex-col items-center gap-1 text-brand-primary transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span className="font-heading text-xs font-bold uppercase tracking-wider">SEARCH</span>
         </Link>
         
         <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-black transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="font-heading text-xs font-bold uppercase tracking-wider">PROFILE</span>
         </button>
      </div>
    </main>
  );
}
