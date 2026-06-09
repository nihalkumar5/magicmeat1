import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import OffersCarousel from '@/components/OffersCarousel';
import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Shop() {
  const products = await getProducts();
  const bestSellers = products.slice(0, 8);
  const freshArrivals = products.slice(8, 16);
  const categories = [
     { name: 'All Products', href: '/shop/all', img: '/icons/open-box-svgrepo-com.svg' },
     { name: 'Chicken', href: '/shop/chicken', img: '/icons/chicken-svgrepo-com.svg' },
     { name: 'Mutton', href: '/shop/mutton', img: '/icons/goat-svgrepo-com.svg' },
     { name: 'Sea Food', href: '/shop/seafood', img: '/icons/fish-svgrepo-com.svg' },
     { name: 'Daily Grocery', href: '/shop/grocery', img: '/icons/shopping-bag-svgrepo-com.svg' },
     { name: 'Vegetables', href: '/shop/vegetables', img: '/icons/vegetables-salad-svgrepo-com.svg' },
     { name: 'Fruits', href: '/shop/fruits', img: '/icons/fruits-svgrepo-com.svg' },
     { name: 'Frozen Items', href: '/shop/frozen', img: '/icons/ice-svgrepo-com.svg' },
  ];
  return (
    <main className="min-h-screen bg-brand-beige pb-32 font-body">

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-infinite {
          animation: scroll-left 15s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll-infinite-cards {
          animation: scroll-left 30s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>

      {/* TEXT MARQUEE STRIP AT TOP */}
      <div className="bg-white/40 backdrop-blur-md text-gray-900 py-3 border-b border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden relative w-full">
        <div className="animate-scroll-infinite">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex whitespace-nowrap shrink-0">
               <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-widest px-6 sm:px-8 drop-shadow-sm opacity-90">• 100% FRESH CUTS</span>
               <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-widest px-6 sm:px-8 drop-shadow-sm opacity-90">• 30 MIN DELIVERY</span>
               <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-widest px-6 sm:px-8 drop-shadow-sm opacity-90">• ANTIBIOTIC FREE</span>
               <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-widest px-6 sm:px-8 drop-shadow-sm opacity-90">• NO FROZEN MEAT</span>
               <span className="font-heading font-black text-xl sm:text-2xl uppercase tracking-widest px-6 sm:px-8 drop-shadow-sm opacity-90">• PREMIUM QUALITY</span>
            </div>
          ))}
        </div>
      </div>

      {/* ORDER ON CALL SECTION (MOVED TO TOP) */}
      <section className="bg-[#D4FF00] py-6 px-4 border-b-[4px] border-black text-center shadow-[0_8px_0px_rgba(0,0,0,1)] relative z-20">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left flex-1">
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-widest text-black mb-1 leading-none">ORDER ON CALL</h2>
            <p className="font-body font-bold text-gray-800 text-sm md:text-base">Skip the app. Speak directly to our butcher!</p>
          </div>
          <a href="tel:+918271663388" className="bg-black text-[#D4FF00] font-heading font-black text-xl px-6 py-3 uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[0px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-2 w-full md:w-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 82716 63388
          </a>
        </div>
      </section>

      {/* Search Bar */}
      <div className="px-4 pt-6">
         <SearchBar />
      </div>

      {/* Offers Banner */}
      <OffersCarousel />

      {/* Shop Categories Glass Scroll */}
      <div className="pt-12 px-4 pb-8 bg-white relative border-b-[4px] border-black">
         <h2 className="font-heading text-4xl uppercase tracking-widest text-center border-b-[4px] border-black pb-4 mb-8">SHOP CATEGORIES</h2>
         <div className="flex overflow-x-auto gap-4 pb-6 pt-2 px-2 snap-x snap-mandatory hide-scrollbar">
            {categories.map((cat) => (
               <Link href={cat.href} key={cat.name} className="flex flex-col group min-w-[150px] sm:min-w-[180px] snap-center">
                  <div className="w-full aspect-square border-[4px] border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer">
                     <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" />
                     <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>
                     <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                        <div className="bg-brand-primary text-black font-heading font-black text-sm sm:text-base uppercase tracking-widest px-3 py-1.5 border-[3px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-[-2deg] group-hover:rotate-0 group-hover:scale-105 transition-all w-max max-w-full text-center">
                          {cat.name}
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* Best Sellers Grid */}
      <div className="w-full bg-brand-beige pb-10 pt-6 px-4">
         <h2 className="font-heading text-4xl uppercase tracking-widest text-center border-b-[3px] border-black pb-4 mb-8 text-black">BEST SELLERS</h2>
         {bestSellers.length > 0 ? (
           <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
             {bestSellers.map(product => (
               <div key={product.id} className="min-w-[160px] sm:min-w-[180px] w-[160px] sm:w-[180px] snap-center shrink-0 flex">
                 <ProductCard product={product} />
               </div>
             ))}
           </div>
         ) : (
           <p className="text-center text-gray-500 font-medium pb-8">No products found. Please check Shopify connection.</p>
         )}
      </div>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-brand-secondary py-16 px-4 border-b-[6px] border-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-widest mb-12 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-brand-primary border-[3px] border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-black text-3xl rotate-[-5deg]">01</div>
              <h3 className="font-heading text-2xl uppercase tracking-wider mb-2 font-black">FARM FRESH</h3>
              <p className="font-body text-black font-bold">Straight from the farms to your kitchen. No freezing, no preservatives.</p>
            </div>
            
            <div className="bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-brand-primary border-[3px] border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-black text-3xl rotate-[3deg]">02</div>
              <h3 className="font-heading text-2xl uppercase tracking-wider mb-2 font-black">ANTIBIOTIC FREE</h3>
              <p className="font-body text-black font-bold">100% chemical and antibiotic free meat, handled with utmost care and hygiene.</p>
            </div>
            
            <div className="bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-brand-primary border-[3px] border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black font-black text-3xl rotate-[-3deg]">03</div>
              <h3 className="font-heading text-2xl uppercase tracking-wider mb-2 font-black">30 MIN DELIVERY</h3>
              <p className="font-body text-black font-bold">Lightning fast delivery right to your doorstep, keeping the meat chilled.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FRESH ARRIVALS SECTION */}
      <div className="w-full bg-brand-beige py-12 px-4 border-b-[6px] border-black">
         <div className="max-w-5xl mx-auto">
           <h2 className="font-heading text-4xl uppercase tracking-widest text-center border-b-[3px] border-black pb-4 mb-8 text-black">FRESH ARRIVALS</h2>
           {freshArrivals.length > 0 ? (
             <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory hide-scrollbar">
               {freshArrivals.map(product => (
                 <div key={product.id} className="min-w-[160px] sm:min-w-[180px] w-[160px] sm:w-[180px] snap-center shrink-0 flex">
                   <ProductCard product={product} />
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-center text-gray-500 font-medium pb-8">More products coming soon.</p>
           )}
         </div>
      </div>

      {/* THE PROCESS SECTION */}
      <section className="py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Glow behind glass */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-3/4 max-h-96 bg-[#D4FF00]/30 blur-[80px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.06)] rounded-[32px] p-8 md:p-16 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl text-black uppercase tracking-widest text-center mb-12 pb-4 inline-block w-full relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-black/20 after:rounded-full">
            The Magic Process
          </h2>
          
          <div className="relative flex flex-col gap-12">
            {/* Vertical Line (Mobile & Desktop) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:-translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-3">
                <p className="font-body font-bold text-gray-500 text-lg">We partner with local farms to bring you the healthiest livestock.</p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-16 h-16 rounded-full bg-[#D4FF00] border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center font-heading text-2xl font-black z-10 shrink-0">
                01
              </div>
              <div className="w-full pl-24 md:pl-0 md:w-1/2 text-left pt-3">
                <h3 className="font-heading text-3xl font-black uppercase text-black mb-2">SOURCING</h3>
                <p className="md:hidden font-body font-bold text-gray-500 text-sm">We partner with local farms to bring you the healthiest livestock.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-3">
                <h3 className="font-heading text-3xl font-black uppercase text-black mb-2">CLEANING</h3>
                <p className="font-body font-bold text-gray-500 text-lg">Premium cuts prepared in our state-of-the-art hygienic facility.</p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-16 h-16 rounded-full bg-[#FF5A00] border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center font-heading text-2xl text-white font-black z-10 shrink-0">
                02
              </div>
              <div className="w-full pl-24 md:pl-0 md:w-1/2 text-left md:hidden pt-3">
                <h3 className="font-heading text-3xl font-black uppercase text-black mb-2">CLEANING</h3>
                <p className="font-body font-bold text-gray-500 text-sm">Premium cuts prepared in our state-of-the-art hygienic facility.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-16">
              <div className="hidden md:block w-1/2 text-right pt-3">
                <p className="font-body font-bold text-gray-500 text-lg">Vacuum sealed and delivered in insulated bags to your home.</p>
              </div>
              <div className="absolute top-0 left-0 md:relative md:left-auto w-16 h-16 rounded-full bg-[#D4FF00] border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center font-heading text-2xl font-black z-10 shrink-0">
                03
              </div>
              <div className="w-full pl-24 md:pl-0 md:w-1/2 text-left pt-3">
                <h3 className="font-heading text-3xl font-black uppercase text-black mb-2">DELIVERY</h3>
                <p className="md:hidden font-body font-bold text-gray-500 text-sm">Vacuum sealed and delivered in insulated bags to your home.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-black py-16 px-4 border-t-[4px] border-black overflow-hidden relative w-full">
        {/* Background glow for glass cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[#D4FF00] rounded-full blur-[150px] opacity-10"></div>
        
        <h2 className="font-heading text-5xl md:text-6xl text-white uppercase tracking-widest text-center mb-12 relative z-10">WALL OF FAME</h2>
        
        {/* Auto Scrolling Marquee Container for Cards */}
        <div className="relative z-10 w-full overflow-hidden pb-8">
           <div className="animate-scroll-infinite-cards hover:[animation-play-state:paused]">
             {/* Duplicate array for seamless infinite scroll */}
             {[1, 2].map((groupIdx) => (
                <div key={groupIdx} className="flex gap-6 px-3 shrink-0">
                  {[
                    { name: "RAHUL SHARMA", text: "The cleanest chicken I have ever ordered online. Zero smell, perfectly cut!" },
                    { name: "PRIYA PATEL", text: "Magic Meat is actually magic. The mutton pieces were so tender, perfect for my biryani." },
                    { name: "AMIT KUMAR", text: "Finally a reliable meat delivery app with honest prices. Highly recommended!" },
                    { name: "SNEHA REDDY", text: "Packaging is premium and delivery is always on time. Love it!" }
                  ].map((review, idx) => (
                    <div key={idx} className="min-w-[300px] max-w-[320px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-[0_8px_32px_rgba(255,255,255,0.05)] flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:bg-white/15 cursor-pointer">
                      <p className="font-body text-gray-200 text-lg italic mb-6">"{review.text}"</p>
                      <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                        <div className="w-12 h-12 bg-[#D4FF00] text-black font-heading font-black text-2xl flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xl uppercase tracking-widest leading-none text-white">{review.name}</h4>
                          <div className="flex text-[#D4FF00] mt-1 text-lg">
                            {'★★★★★'.split('').map((star, i) => <span key={i} style={{textShadow: '0 0 5px rgba(212,255,0,0.5)'}}>{star}</span>)}
                          </div>
                        </div>
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
