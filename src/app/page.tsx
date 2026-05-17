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

      {/* 4. Order on Call & WhatsApp */}
      <section className="order-cta-section">
        <div className="container">
          <div className="order-cta-content">
            <p className="order-cta-tagline">Prefer to order directly?</p>
            <h2 className="order-cta-title">Order on Call &amp; WhatsApp</h2>
            <p className="order-cta-desc">
              Can&apos;t find what you need? Call or WhatsApp us directly for custom orders, bulk quantities, or any queries.
            </p>
            <div className="order-cta-buttons">
              <a href="tel:+918271663388" className="order-cta-btn order-cta-call">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Now
              </a>
              <a href="https://wa.me/918271663388?text=Hi%20Magicmeat!%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="order-cta-btn order-cta-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
            <p className="order-cta-number">8271663388</p>
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
