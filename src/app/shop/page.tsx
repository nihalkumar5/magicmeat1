import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import OffersCarousel from '@/components/OffersCarousel';
import LiveGoogleReviews from '@/components/LiveGoogleReviews';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Shop Premium Fresh Meats | Magic Meat',
  description: 'Browse our full catalog of premium fresh chicken, mutton, and seafood. Order online and get it delivered fresh to your door in Hazaribagh.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Shop() {
  const products = await getProducts();
  const bestSellers = products.slice(0, 8);
  const freshArrivals = products.slice(8, 16);
  
  const categories = [
     { name: 'All Products', href: '/shop/all', img: '/cat-all.png' },
     { name: 'Chicken', href: '/shop/chicken', img: '/cat-chicken.png' },
     { name: 'Mutton', href: '/shop/mutton', img: '/cat-mutton.png' },
     { name: 'Sea Food', href: '/shop/seafood', img: '/cat-seafood.png' },
     { name: 'Daily Grocery', href: '/shop/grocery', img: '/cat-grocery.png' },
     { name: 'Vegetables', href: '/shop/vegetables', img: '/cat-vegetables.png' },
     { name: 'Fruits', href: '/shop/fruits', img: '/cat-fruits.png' },
     { name: 'Frozen Items', href: '/shop/frozen', img: '/cat-frozen.png' },
  ];

  return (
    <main className="min-h-screen bg-[#F4F3F0] pb-32 font-body text-[#121212]">

      {/* --- DESKTOP HERO BANNER (Hidden on Mobile) --- */}
      <section className="hidden md:block bg-white rounded-b-[3rem] shadow-sm py-16 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & Search */}
          <div className="flex flex-col items-start text-left animate-[fadeInUp_0.8s_ease-out]">
            <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/15 font-bold text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(168,32,26,0.06)] mb-4">
              Fresh & Fast Delivery
            </span>
            <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-gray-900 tracking-[-0.03em] leading-[1.1] mb-4">
              Fresh Chicken, Meats & Daily Groceries.
            </h1>
            <p className="font-body text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Farm-fresh chicken, tender mutton, fresh vegetables, fruits, and daily essentials delivered clean in Hazaribagh in 30 minutes.
            </p>
            <div className="w-full max-w-md">
              <SearchBar products={products} />
            </div>
          </div>

          {/* Right Column: Premium Showcase Card */}
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <div className="relative w-full aspect-[1.15] rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
              <img 
                src="/hero-premium.png" 
                alt="Fresh Chicken & Grocery Delivery" 
                className="w-full h-full object-cover object-right" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- MOBILE HERO BANNER (Hidden on Desktop) --- */}
      <div className="block md:hidden relative w-full z-20 pb-6 bg-transparent">
        {/* Background Image Container */}
        <div className="relative w-full h-[280px] overflow-hidden rounded-b-[2rem] bg-[#F4F3F0] shadow-sm">
          <img 
            src="/hero-premium.png" 
            alt="Fresh Chicken & Grocery Delivery" 
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.98]" 
          />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        {/* Content Wrapper pulling card upwards */}
        <div className="relative max-w-5xl mx-auto px-2.5 -mt-24 z-30">
          
          {/* Floating Glassmorphic Container Card with enhanced glass effect */}
          <div className="w-full bg-white/70 backdrop-blur-3xl border border-white/85 p-5 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col items-start text-left animate-[fadeInUp_0.8s_ease-out]">
            <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/15 font-bold text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(168,32,26,0.06)] mb-2">
              Fresh & Fast Delivery
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-gray-900 tracking-[-0.03em] leading-[1.15] mb-1.5">
              Fresh Chicken, Meats & Daily Groceries.
            </h1>
            <p className="font-body text-gray-500 text-xs leading-relaxed mb-4">
              Fresh chicken, mutton, vegetables, fruits, and daily essentials delivered in 30 mins.
            </p>
            <div className="w-full">
              <SearchBar products={products} />
            </div>
          </div>

        </div>
      </div>




      {/* --- APPETIZING SHOP CATEGORIES GRID --- */}
      <div className="pt-8 md:pt-16 px-4 pb-12">
         <div className="max-w-5xl mx-auto">
           <div className="mb-8 text-center sm:text-left">
             <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
             <p className="font-body text-gray-500 text-xs md:text-sm mt-1">Select from our fresh, raw, and hygienic categories.</p>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat) => (
                 <Link 
                   href={cat.href} 
                   key={cat.name} 
                   className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                 >
                    {/* Category Image */}
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-50">
                       <img 
                         src={cat.img} 
                         alt={cat.name} 
                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                       />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                    {/* Category Text */}
                    <div className="p-4 flex items-center justify-between">
                       <span className="font-body font-bold text-sm md:text-base text-gray-800 group-hover:text-brand-primary transition-colors">
                         {cat.name}
                       </span>
                       <span className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all text-sm font-bold">
                         &rarr;
                       </span>
                    </div>
                 </Link>
              ))}
           </div>
         </div>
      </div>

      {/* --- OFFERS CAROUSEL --- */}
      <OffersCarousel />

      {/* --- BEST SELLERS GRID --- */}
      <div className="w-full bg-white pb-14 pt-14 px-4 rounded-[2.5rem] shadow-sm">
         <div className="max-w-5xl mx-auto">
           <div className="flex justify-between items-end mb-8 px-2">
             <div>
               <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Best Sellers</h2>
               <p className="font-body text-gray-500 text-xs md:text-sm mt-0.5">The most ordered premium cuts in your area.</p>
             </div>
             <Link href="/shop/all" className="text-xs md:text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors mb-1">
               View All
             </Link>
           </div>
           {bestSellers.length > 0 ? (
             <div className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x snap-mandatory hide-scrollbar">
               {bestSellers.map(product => (
                 <div key={product.id} className="min-w-[165px] sm:min-w-[190px] w-[165px] sm:w-[190px] snap-center shrink-0 flex">
                   <ProductCard product={product} />
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-center text-gray-500 font-medium pb-8">No products found. Please check Shopify connection.</p>
           )}
         </div>
      </div>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="bg-transparent py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-2">Why order from Magic Meat?</h2>
          <p className="font-body text-gray-500 text-xs md:text-sm mb-12 max-w-md mx-auto">We redefine quality, packaging, and speed to offer you the ultimate cooking experience.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 transition-all hover:shadow-md flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 text-brand-primary rounded-full flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">100% Farm Fresh</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Straight from regional farms to your kitchen. Never frozen, no chemical preservatives, no hormones.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 transition-all hover:shadow-md flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 text-brand-primary rounded-full flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Premium Packaging</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Vacuum sealed in sterile bags to ensure zero contact with dust, contaminants, or microbes.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 transition-all hover:shadow-md flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 text-brand-primary rounded-full flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">30 Min Delivery</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Chilled transit boxes preserve optimal cold chain temperature from store straight to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FRESH ARRIVALS SECTION --- */}
      <div className="w-full bg-white py-16 px-4 shadow-sm rounded-[2.5rem]">
         <div className="max-w-5xl mx-auto">
           <div className="flex justify-between items-end mb-8 px-2">
             <div>
               <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Fresh Arrivals</h2>
               <p className="font-body text-gray-500 text-xs md:text-sm mt-0.5">Explore our daily updated stock of fresh meats.</p>
             </div>
           </div>
           {freshArrivals.length > 0 ? (
             <div className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x snap-mandatory hide-scrollbar">
               {freshArrivals.map(product => (
                 <div key={product.id} className="min-w-[165px] sm:min-w-[190px] w-[165px] sm:w-[190px] snap-center shrink-0 flex">
                   <ProductCard product={product} />
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-center text-gray-500 font-medium pb-8">More products coming soon.</p>
           )}
         </div>
      </div>

      {/* --- THE MAGIC PROCESS SECTION (Apple Style Infographic) --- */}
      <section className="py-20 px-4 md:px-6 relative bg-[#F4F3F0]">
        <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-[2.5rem] p-8 md:p-14 relative z-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 text-center mb-16">
            The Magic Freshness Process
          </h2>
          
          <div className="relative flex flex-col gap-14">
            {/* Vertical Line */}
            <div className="absolute left-[1.35rem] md:left-1/2 top-0 bottom-0 w-px bg-gray-150 md:-translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-2">
                <p className="font-body text-gray-500 text-base leading-relaxed">
                  We hand-select animals from clean, ethical local farms that prioritize health and high-quality feed.
                </p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-11 h-11 rounded-full bg-gray-50 border border-gray-150 text-gray-500 flex items-center justify-center font-heading text-sm font-bold z-10 shrink-0 shadow-sm">
                01
              </div>
              <div className="w-full pl-16 md:pl-0 md:w-1/2 text-left pt-2">
                <h3 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-1">Ethical Sourcing</h3>
                <p className="md:hidden font-body text-gray-500 text-sm leading-relaxed">
                  We hand-select animals from clean, ethical local farms that prioritize health and high-quality feed.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-2">
                <h3 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-1">Hygiene First Cleaning</h3>
                <p className="font-body text-gray-500 text-base leading-relaxed">
                  Cleaned in pure water and cut into optimal sizes in an air-conditioned, sanitized butcher facility.
                </p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-11 h-11 rounded-full bg-brand-primary border border-brand-primary text-white flex items-center justify-center font-heading text-sm font-bold z-10 shrink-0 shadow-md shadow-brand-primary/20">
                02
              </div>
              <div className="w-full pl-16 md:pl-0 md:w-1/2 text-left md:hidden pt-2">
                <h3 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-1">Hygiene First Cleaning</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  Cleaned in pure water and cut into optimal sizes in an air-conditioned, sanitized butcher facility.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-2">
                <p className="font-body text-gray-500 text-base leading-relaxed">
                  Vacuum packed instantly to block moisture loss and delivered in insulated ice boxes within 30 minutes.
                </p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-11 h-11 rounded-full bg-gray-50 border border-gray-150 text-gray-500 flex items-center justify-center font-heading text-sm font-bold z-10 shrink-0 shadow-sm">
                03
              </div>
              <div className="w-full pl-16 md:pl-0 md:w-1/2 text-left pt-2">
                <h3 className="font-heading text-lg md:text-xl font-bold text-gray-900 mb-1">Cold Chain Delivery</h3>
                <p className="md:hidden font-body text-gray-500 text-sm leading-relaxed">
                  Vacuum packed instantly to block moisture loss and delivered in insulated ice boxes within 30 minutes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (WALL OF FAME) --- */}
      <section className="bg-[#0B0A0A] py-12 px-4 overflow-hidden relative w-full rounded-t-[2.5rem] border-t border-white/[0.04]">
        
        {/* Elegant Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none z-0" />

        {/* Google Reviews Widget */}
        <div className="relative z-10 mt-2 mb-4">
          <LiveGoogleReviews />
        </div>
        
        <div className="relative z-10 text-center mb-6">
          <span className="text-brand-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1 block">
            Customer Stories
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Wall of Fame
          </h2>
          <p className="font-body text-gray-400 text-xs md:text-sm mt-1.5 max-w-md mx-auto font-light">
            Loved by chefs and meat lovers across Hazaribagh.
          </p>
        </div>
        
        {/* Scrolling Reviews */}
        <div className="relative z-10 w-full overflow-hidden pb-8 flex">
           <div className="flex gap-4 w-max animate-scroll-infinite-cards hover:[animation-play-state:paused] py-2">
             {[1, 2].map((groupIdx) => (
                <div key={groupIdx} className="flex gap-4 px-2 shrink-0">
                  {[
                    { name: "Nihal Kumarr", rating: 5, text: "Best chicken delivery service in Hazaribagh, Jharkhand" },
                    { name: "Adarsh", rating: 5, text: "Hazaribagh mein aisi service milna honestly unexpected tha. MagicMeat ne kaafi easy bana diya chicken lena, warna market jaana pdta hai. Kaafi convenient laga. Highly recommend" },
                    { name: "Atul Marandi", rating: 4, text: "Fresh and clean with good packaging, best for those who don't want to visit any meat shop nearby Hurhuru, Markham, Mission Side and area next to it within 4-5 km" },
                    { name: "motivation therapy", rating: 5, text: "Great experience with magicmeat, chicken was fresh and cut as I told them. good service for hazaribagh" },
                    { name: "CHETAN GOSWAMI", rating: 5, text: "Amazing service, very humble owner , chicken was fresh , near and clean packaging" },
                    { name: "Swapnil Abhishek", rating: 5, text: "Tender, fresh-cut chicken with fast and reliable delivery." }
                  ].map((review, idx) => (
                    <div key={idx} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-gradient-to-br from-[#1A1414] to-[#0F0B0B] p-6 rounded-2xl flex flex-col justify-between border border-[#2D1A1A] transition-all duration-300 hover:scale-[1.02] hover:border-[#5C2B2B] hover:shadow-[0_8px_30px_rgba(168,32,26,0.15)] cursor-pointer shadow-xl shadow-black/40">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#A8201A] to-[#E53E3E] text-white font-heading font-extrabold text-sm flex items-center justify-center rounded-full uppercase shadow-inner">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-gray-100 text-sm leading-tight">{review.name}</h3>
                            <div className="flex text-[#FFB800] text-xs mt-0.5 tracking-tighter">
                              {Array.from({ length: 5 }).map((_, i) => i < review.rating ? '★' : '☆').join('')}
                            </div>
                          </div>
                        </div>
                        <p className="font-body text-gray-300 text-sm leading-relaxed mb-4 font-light">"{review.text}"</p>
                      </div>
                      <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="font-body text-xs text-white/40 font-medium">Posted on Google</span>
                      </div>
                    </div>
                  ))}
                </div>
             ))}
           </div>
        </div>
      </section>

    </main>
  );
}
