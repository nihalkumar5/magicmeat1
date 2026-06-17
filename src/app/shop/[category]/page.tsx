import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import CategoryScroller from '@/components/CategoryScroller';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const params = await props.params;
  const category = params.category;
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${capitalizedCategory === 'All' ? 'All Products' : `Fresh ${capitalizedCategory}`}`,
    description: `Order the best quality fresh ${category} in Hazaribagh online. Premium cuts, expertly cleaned, and delivered to your doorstep.`,
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const category = params.category;
  
  // Fetch all products
  const products = await getProducts();
  
  // Filter by category tag or collection
  const filteredProducts = products.filter(product => {
    const cat = category.toLowerCase();
    
    if (cat === 'all') return true;
    
    const hasMatch = (arr: string[], search: string[]) => 
      arr.some(item => search.some(s => item.toLowerCase().includes(s)));

    const collections = product.collections?.map(c => c.title.toLowerCase()) || [];
    const tags = product.tags?.map(t => t.toLowerCase()) || [];
    const searchSpace = [...collections, ...tags];

    if (cat === 'grocery') {
      return hasMatch(searchSpace, ['grocery', 'egg', 'dairy', 'vegetable', 'vagetable', 'fruit']);
    }
    
    if (cat === 'seafood' || cat === 'fish') {
       return hasMatch(searchSpace, ['seafood', 'fish']);
    }

    if (cat === 'vegetables' || cat === 'vegetable') {
       return hasMatch(searchSpace, ['vegetable', 'vegetables', 'vagetable', 'vagetables', 'veg']);
    }

    if (cat === 'fruits' || cat === 'fruit') {
       return hasMatch(searchSpace, ['fruit', 'fruits']);
    }
    
    return hasMatch(searchSpace, [cat]);
  });

  return (
    <main className="min-h-screen bg-[#F4F3F0] pb-24 font-body text-[#121212]">

      <div className="p-4 pt-6 max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors bg-white border border-gray-200 px-4 py-2.5 rounded-full shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            Back to Shop
          </Link>
        </div>

        {/* Categories Glass Scroller */}
        <CategoryScroller activeCategory={category} />

        <h2 className="font-heading text-lg font-bold text-gray-800 mb-6">
           Showing {filteredProducts.length} items
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <span className="text-3xl mb-3 block">🍽️</span>
            <h2 className="font-heading text-xl font-bold mb-1 text-gray-800">Nothing here yet</h2>
            <p className="font-body text-gray-400 text-sm">We couldn't find any products in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
