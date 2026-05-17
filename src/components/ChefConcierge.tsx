'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ChefConciergeProps {
  products: Product[];
}

type TabType = 'planner' | 'recipes';
type DishStyle = 'curry' | 'sear' | 'fry' | 'protein';
type MeatPreference = 'chicken' | 'mutton' | 'seafood';

export default function ChefConcierge({ products }: ChefConciergeProps) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<TabType>('planner');

  // Tab 1: Portion Planner States
  const [guests, setGuests] = useState<number>(4);
  const [dishStyle, setDishStyle] = useState<DishStyle>('curry');
  const [meatPref, setMeatPref] = useState<MeatPreference>('chicken');

  // 1. Portion Calculation Rules
  // Weight multiplier in kg per guest
  const weightMultiplier = {
    curry: 0.25,  // 250g per guest for hearty curries
    sear: 0.2,   // 200g per guest for boneless breasts/sears
    fry: 0.22,   // 220g per guest for fish fry
    protein: 0.3 // 300g per guest for high protein prep
  };

  const calculatedWeightKg = guests * weightMultiplier[dishStyle];
  
  // Resolve product and variant to recommend
  let recommendedProductHandle = 'fresh-chicken-curry-cut-500g';
  if (dishStyle === 'sear') {
    recommendedProductHandle = 'boneless-chicken-breast-500g';
  } else if (dishStyle === 'fry') {
    recommendedProductHandle = 'rohu-fish-cleaned-500g';
  } else {
    // Curry or protein based on meat preference
    if (meatPref === 'mutton') {
      recommendedProductHandle = 'mutton-curry-cut-500g';
    } else if (meatPref === 'seafood') {
      recommendedProductHandle = 'rohu-fish-cleaned-500g';
    } else {
      recommendedProductHandle = 'fresh-chicken-curry-cut-500g';
    }
  }

  // Find the exact product from our inventory
  const recommendedProduct = products.find(p => p.handle === recommendedProductHandle) || products[0];
  const defaultVariant = recommendedProduct?.variants[0];

  // How many packs are required (assuming standard 500g packs)
  // Let's divide required weight by 0.5kg and round up
  const requiredPacks = Math.max(1, Math.ceil(calculatedWeightKg / 0.5));
  const packPrice = parseFloat(defaultVariant?.price.amount || '199');
  const totalCost = packPrice * requiredPacks;

  // 2. Portion Planner Cart Addition
  const handleAddPortionToCart = () => {
    if (!recommendedProduct || !defaultVariant) return;
    
    // Add product variant with the calculated quantity multiple times
    for (let i = 0; i < requiredPacks; i++) {
      addToCart(recommendedProduct, defaultVariant);
    }
  };

  // Tab 2: Recipe Bundle Addition
  const handleAddRecipeEssentials = (handles: string[]) => {
    handles.forEach(handle => {
      const prod = products.find(p => p.handle === handle);
      if (prod) {
        addToCart(prod, prod.variants[0]);
      }
    });
  };

  return (
    <section className="concierge-section container">
      <div className="concierge-wrapper">
        
        {/* Concierge Title Block */}
        <div className="concierge-header">
          <div className="concierge-badge">Chef's Culinary Concierge</div>
          <h2 className="concierge-title">Gastronomy & Sourcing Planner</h2>
          <p className="concierge-subtitle">
            Allow our virtual concierge to portion your meals accurately, calculate recipes, and pair fresh cuts with chef-crafted essentials.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="concierge-tabs">
          <button 
            className={`concierge-tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            📊 Portion Planner
          </button>
          <button 
            className={`concierge-tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
          >
            👨‍🍳 Chef's Recipe Hub
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="concierge-body">
          
          {/* TAB 1: PORTION PLANNER */}
          {activeTab === 'planner' && (
            <div className="planner-grid">
              
              {/* Left Column: Interactive Inputs */}
              <div className="planner-inputs">
                {/* 1. Guests Slider */}
                <div className="planner-input-group">
                  <label className="planner-label">
                    Dining Guests: <span className="planner-highlight">{guests} People</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="12" 
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="planner-slider"
                  />
                  <div className="planner-slider-ticks">
                    <span>1</span><span>3</span><span>6</span><span>9</span><span>12</span>
                  </div>
                </div>

                {/* 2. Dish Style */}
                <div className="planner-input-group" style={{ marginTop: '2rem' }}>
                  <label className="planner-label">Recipe Style</label>
                  <div className="planner-pill-grid">
                    <button 
                      className={`planner-pill ${dishStyle === 'curry' ? 'active' : ''}`}
                      onClick={() => setDishStyle('curry')}
                    >
                      🥘 Slow Curry
                    </button>
                    <button 
                      className={`planner-pill ${dishStyle === 'sear' ? 'active' : ''}`}
                      onClick={() => setDishStyle('sear')}
                    >
                      🥩 Gourmet Pan-Sear
                    </button>
                    <button 
                      className={`planner-pill ${dishStyle === 'fry' ? 'active' : ''}`}
                      onClick={() => setDishStyle('fry')}
                    >
                      🐟 Golden Crispy Fry
                    </button>
                    <button 
                      className={`planner-pill ${dishStyle === 'protein' ? 'active' : ''}`}
                      onClick={() => setDishStyle('protein')}
                    >
                      💪 High-Protein Prep
                    </button>
                  </div>
                </div>

                {/* 3. Meat Preference (Only active if curry/protein is selected) */}
                {['curry', 'protein'].includes(dishStyle) && (
                  <div className="planner-input-group" style={{ marginTop: '2rem' }}>
                    <label className="planner-label">Meat Preference</label>
                    <div className="planner-pill-grid">
                      <button 
                        className={`planner-pill ${meatPref === 'chicken' ? 'active' : ''}`}
                        onClick={() => setMeatPref('chicken')}
                      >
                        🍗 Fresh Chicken
                      </button>
                      <button 
                        className={`planner-pill ${meatPref === 'mutton' ? 'active' : ''}`}
                        onClick={() => setMeatPref('mutton')}
                      >
                        🐐 Tender Mutton
                      </button>
                      <button 
                        className={`planner-pill ${meatPref === 'seafood' ? 'active' : ''}`}
                        onClick={() => setMeatPref('seafood')}
                      >
                        🐟 Fresh Seafood
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Output Concierge recommendation */}
              <div className="planner-output">
                <div className="output-glass-card">
                  <div className="output-badge">Our Recommendation</div>
                  <h3 className="output-product-title">{recommendedProduct?.title}</h3>
                  
                  <div className="output-specs">
                    <div className="output-spec">
                      <span className="spec-label">Weight Required</span>
                      <span className="spec-value">{calculatedWeightKg.toFixed(2)} kg</span>
                    </div>
                    <div className="output-spec">
                      <span className="spec-label">Retail Packs</span>
                      <span className="spec-value">{requiredPacks}x {defaultVariant?.title || 'Standard Pack'}</span>
                    </div>
                    <div className="output-spec" style={{ borderBottom: 'none' }}>
                      <span className="spec-label">Calculated Subtotal</span>
                      <span className="spec-value" style={{ color: 'var(--accent-gold)' }}>₹{totalCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="output-explanation">
                    *Portion calculated dynamically at {weightMultiplier[dishStyle] * 1000}g per guest. Packed clinically in vacuum seal bags with insulated box gel-pads.
                  </p>

                  <button 
                    className="planner-cart-btn"
                    onClick={handleAddPortionToCart}
                  >
                    Add {requiredPacks} Pack{requiredPacks > 1 ? 's' : ''} to Cart
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: RECIPE HUB */}
          {activeTab === 'recipes' && (
            <div className="recipes-grid">
              
              {/* Recipe 1 */}
              <div className="recipe-card">
                <div className="recipe-img-container">
                  <img src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=400" alt="Mutton Rogan Josh" className="recipe-img" />
                  <span className="recipe-duration">50 Mins</span>
                </div>
                <div className="recipe-content">
                  <h3 className="recipe-card-title">Royal Kashmir Mutton Rogan Josh</h3>
                  <p className="recipe-desc">
                    Slow-cooked grass-fed tender mutton, braised in a rich yogurt sauce with Kashmiri chillies and aromatic spices seared in pure cow ghee.
                  </p>
                  <div className="recipe-meta">
                    <span>Difficulty: <strong>Medium</strong></span>
                    <span>Serves: <strong>4 Guests</strong></span>
                  </div>
                  <div className="recipe-ingredients">
                    <strong>Ingredients Included:</strong> Mutton Curry Cut (500g) + Pure Organic Cow Ghee (200ml)
                  </div>
                  <button 
                    className="recipe-btn"
                    onClick={() => handleAddRecipeEssentials(['mutton-curry-cut-500g', 'pure-organic-cow-ghee-200ml'])}
                  >
                    Add Ingredients to Cart (₹628)
                  </button>
                </div>
              </div>

              {/* Recipe 2 */}
              <div className="recipe-card">
                <div className="recipe-img-container">
                  <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400" alt="Butter Chicken" className="recipe-img" />
                  <span className="recipe-duration">35 Mins</span>
                </div>
                <div className="recipe-content">
                  <h3 className="recipe-card-title">Chef's Velvet Butter Chicken</h3>
                  <p className="recipe-desc">
                    Succulent boneless chicken breast chunks seared in wood-charred clay tandoors and finished in a rich, buttery velvet-smooth spiced tomato gravy.
                  </p>
                  <div className="recipe-meta">
                    <span>Difficulty: <strong>Easy</strong></span>
                    <span>Serves: <strong>4 Guests</strong></span>
                  </div>
                  <div className="recipe-ingredients">
                    <strong>Ingredients Included:</strong> Boneless Chicken Breast (500g) + Fresh Milk (1L)
                  </div>
                  <button 
                    className="recipe-btn"
                    onClick={() => handleAddRecipeEssentials(['boneless-chicken-breast-500g', 'fresh-milk-1l'])}
                  >
                    Add Ingredients to Cart (₹294)
                  </button>
                </div>
              </div>

              {/* Recipe 3 */}
              <div className="recipe-card">
                <div className="recipe-img-container">
                  <img src="https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=400" alt="Rohu Fry" className="recipe-img" />
                  <span className="recipe-duration">20 Mins</span>
                </div>
                <div className="recipe-content">
                  <h3 className="recipe-card-title">Crispy Mustard Rohu Fish Fry</h3>
                  <p className="recipe-desc">
                    Fresh water Rohu fish cutlets coated in stone-ground mustard paste, freshly ground turmeric, and shallow-fried in cold-pressed mustard oil.
                  </p>
                  <div className="recipe-meta">
                    <span>Difficulty: <strong>Easy</strong></span>
                    <span>Serves: <strong>3 Guests</strong></span>
                  </div>
                  <div className="recipe-ingredients">
                    <strong>Ingredients Included:</strong> Rohu Fish Cleaned (500g) + Chef's Secret Spices
                  </div>
                  <button 
                    className="recipe-btn"
                    onClick={() => handleAddRecipeEssentials(['rohu-fish-cleaned-500g', 'chefs-secret-biryani-masala'])}
                  >
                    Add Ingredients to Cart (₹258)
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
