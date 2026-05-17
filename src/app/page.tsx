import React from 'react';
import { getProducts } from '@/lib/shopify';
import ProductCatalog from '@/components/ProductCatalog';

// Next.js App Router Server Component
export default async function HomePage() {
  // Fetch active products from server (with automatic CSV fallback)
  const products = await getProducts();

  return (
    <div>
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tagline">Magicmeat Premium</p>
          <h1 className="hero-title">The finest cuts,<br/>delivered fresh.</h1>
          <p className="hero-subtitle">
            Clinically sterile, 100% antibiotic-free meats — freshly packed 
            and delivered express to your doorstep.
          </p>
          <a href="#catalog" className="hero-cta">
            Shop Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </section>

      {/* Anchor scroll point for the catalog */}
      <div id="catalog" style={{ scrollMarginTop: '52px' }}>
        {/* Product Catalog */}
        <ProductCatalog initialProducts={products} />
      </div>

      {/* 3. Luxury Trust Badges */}
      <section className="trust-badges-wrapper">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">🔬</div>
              <h3 className="trust-title">Laboratory-Clean</h3>
              <p className="trust-desc">
                Processed in clinically sterile environments, 100% antibiotic residue-free and farm-fresh.
              </p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon">⚡</div>
              <h3 className="trust-title">Express Delivery</h3>
              <p className="trust-desc">
                Freshly packed and shipped in temperature-controlled bags within 30-45 minutes.
              </p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon">👨‍🍳</div>
              <h3 className="trust-title">Culinary-Grade Cuts</h3>
              <p className="trust-desc">
                Artisanal cuts, meticulous trimmings, and portion-controlled to elevate home gastronomy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Elegant Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand description */}
            <div>
              <div className="logo" style={{ fontSize: '1.5rem', marginBottom: '1rem', cursor: 'default' }}>
                Magicmeat
                <span className="logo-badge" style={{ fontSize: '0.65rem' }}>PREMIUM</span>
              </div>
              <p className="footer-col-desc">
                Quiet luxury standards applied to daily nourishment. We source responsibly 
                from sustainable farms and clean fisheries, assuring premium purity.
              </p>
            </div>

            {/* Column 2: Collections links */}
            <div>
              <h4 className="footer-col-title">Our Collections</h4>
              <ul className="footer-links">
                <li><a href="#catalog" className="footer-link">Fresh Chicken</a></li>
                <li><a href="#catalog" className="footer-link">Tender Mutton</a></li>
                <li><a href="#catalog" className="footer-link">Clean Seafood</a></li>
                <li><a href="#catalog" className="footer-link">Daily Essentials</a></li>
              </ul>
            </div>

            {/* Column 3: Quality statements */}
            <div>
              <h4 className="footer-col-title">Purity Guarantees</h4>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> 100% Sterilized Processing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> Temperature-Controlled Bags
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> Zero Artificial Preservatives
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✔</span> Direct Traceability Report
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright details */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Magicmeat Storefront. All rights reserved. Sourced with honor.
            </p>
            <p className="footer-copyright" style={{ color: 'var(--foreground-muted)' }}>
              Headless Storefront Engineered by Antigravity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
