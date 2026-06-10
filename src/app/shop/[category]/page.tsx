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
    <main className="min-h-screen bg-brand-beige pb-24 font-body">

      <div className="p-4 pt-6">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center gap-2 font-heading font-black uppercase text-sm md:text-base tracking-widest text-black hover:opacity-70 transition-opacity bg-white border-[3px] border-black px-4 py-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            BACK TO SHOP
          </Link>
        </div>

        {/* Categories Glass Scroller */}
        <CategoryScroller activeCategory={category} />

        <h2 className="font-heading text-xl uppercase tracking-widest border-b-[3px] border-black pb-2 mb-6 text-black">
           SHOWING {filteredProducts.length} ITEMS
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <h2 className="font-heading text-2xl uppercase tracking-widest mb-2 text-gray-800">NOTHING HERE YET</h2>
            <p className="font-bold text-gray-500">We couldn't find any products in the {category} category.</p>
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
