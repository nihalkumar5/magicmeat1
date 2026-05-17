'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/lib/shopify';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    checkoutLoading,
    handleCheckout
  } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Free Delivery Calculations
  const shippingThreshold = 499;
  const remainingForFreeShipping = shippingThreshold - cartSubtotal;
  const progressPercent = Math.min((cartSubtotal / shippingThreshold) * 100, 100);

  // Dynamic Chef's Pairing Logic
  const hasMeats = cartItems.some(item => 
    item.product.tags.includes('chicken') || 
    item.product.tags.includes('mutton') || 
    item.product.tags.includes('fish') || 
    item.product.tags.includes('seafood')
  );

  const hasMasalaInCart = cartItems.some(item => item.variant.id.includes('1101'));
  const hasGheeInCart = cartItems.some(item => item.variant.id.includes('1201'));

  const masalaProduct = mockProducts.find(p => p.handle === 'chefs-secret-biryani-masala');
  const gheeProduct = mockProducts.find(p => p.handle === 'pure-organic-cow-ghee-200ml');

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            Your Cart <span style={{ fontSize: '1rem', color: 'var(--foreground-muted)' }}>({totalItems} items)</span>
          </div>
          <button className="cart-drawer-close" onClick={closeCart}>
            &times;
          </button>
        </div>

        {/* Drawer Items */}
        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty-message">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--foreground-muted)' }}>
                Add farm fresh meats and daily staples to begin your order.
              </p>
            </div>
          ) : (
            <>
              {/* Dynamic Free Shipping Bar */}
              <div className="shipping-progress-wrapper">
                {remainingForFreeShipping > 0 ? (
                  <div className="shipping-progress-text">
                    Spend <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>₹{Math.ceil(remainingForFreeShipping)}</span> more for <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>FREE Delivery</span>!
                  </div>
                ) : (
                  <div className="shipping-progress-text" style={{ color: 'var(--accent-green)' }}>
                    🎉 You've unlocked <strong>FREE Local Express Delivery!</strong>
                  </div>
                )}
                <div className="shipping-progress-bar-bg">
                  <div 
                    className="shipping-progress-bar-fill" 
                    style={{ 
                      width: `${progressPercent}%`,
                      backgroundColor: remainingForFreeShipping <= 0 ? 'var(--accent-green)' : 'var(--accent-gold)'
                    }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              {cartItems.map((item) => {
                const itemPrice = parseFloat(item.variant.price.amount);
                const itemSubtotal = itemPrice * item.quantity;
                const imageUrl = item.product.images[0]?.url || '/placeholder.png';

                return (
                  <div className="cart-item" key={item.variant.id}>
                    <div className="cart-item-image-wrapper">
                      <img 
                        src={imageUrl} 
                        alt={item.product.title} 
                        className="cart-item-image"
                      />
                    </div>
                    
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.product.title}</div>
                      <div className="cart-item-variant">
                        {item.variant.title !== 'Default Title' ? item.variant.title : 'Standard Pack'}
                      </div>
                      
                      <div className="cart-item-controls">
                        {/* Quantity Increment/Decrement */}
                        <div className="cart-quantity-selector">
                          <button 
                            className="cart-quantity-btn"
                            onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                            disabled={checkoutLoading}
                          >
                            -
                          </button>
                          <span className="cart-quantity-value">{item.quantity}</span>
                          <button 
                            className="cart-quantity-btn"
                            onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                            disabled={checkoutLoading}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button 
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.variant.id)}
                          disabled={checkoutLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      {itemSubtotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}

              {/* Chef's Gastronomic Pairing Panel */}
              {hasMeats && (!hasMasalaInCart || !hasGheeInCart) && (
                <div className="cart-pairings-wrapper">
                  <div className="cart-pairings-title">Chef's Culinary Recommendations</div>
                  <div className="cart-pairings-list">
                    {!hasMasalaInCart && masalaProduct && (
                      <div className="cart-pairing-card" key={masalaProduct.id}>
                        <img 
                          src={masalaProduct.images[0].url} 
                          alt={masalaProduct.title} 
                          className="cart-pairing-img"
                        />
                        <div className="cart-pairing-info">
                          <div className="cart-pairing-name">{masalaProduct.title}</div>
                          <div className="cart-pairing-price">₹{masalaProduct.variants[0].price.amount}</div>
                        </div>
                        <button 
                          className="cart-pairing-add-btn"
                          onClick={() => addToCart(masalaProduct, masalaProduct.variants[0])}
                          disabled={checkoutLoading}
                        >
                          + Add
                        </button>
                      </div>
                    )}
                    
                    {!hasGheeInCart && gheeProduct && (
                      <div className="cart-pairing-card" key={gheeProduct.id}>
                        <img 
                          src={gheeProduct.images[0].url} 
                          alt={gheeProduct.title} 
                          className="cart-pairing-img"
                        />
                        <div className="cart-pairing-info">
                          <div className="cart-pairing-name">{gheeProduct.title}</div>
                          <div className="cart-pairing-price">₹{gheeProduct.variants[0].price.amount}</div>
                        </div>
                        <button 
                          className="cart-pairing-add-btn"
                          onClick={() => addToCart(gheeProduct, gheeProduct.variants[0])}
                          disabled={checkoutLoading}
                        >
                          + Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-price">
                {cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--foreground-muted)', marginBottom: '1.2rem', textAlign: 'center' }}>
              Shipping, taxes, and discounts calculated securely at checkout.
            </p>

            <button 
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                  <span className="checkout-spinner"></span>
                  Securing Checkout Flow...
                </span>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .checkout-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(10, 10, 11, 0.2);
          border-radius: 50%;
          border-top-color: #0a0a0b;
          animation: spin 0.8s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
