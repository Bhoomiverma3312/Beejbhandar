import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/Button';
import { ProductImage } from '../components/ProductImage';
import { initialProducts } from '../data/seedsData';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  ArrowLeft,
  AlertTriangle,
  Package,
  ChevronRight,
  X,
  Sparkles,
  Check
} from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    changeItemPackSize,
    clearCart,
    cartCount,
    cartSubtotal,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    remainingForFreeShipping,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    cartTotal,
    totalSavings,
    addToCart
  } = useCart();

  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleClearCart = () => {
    clearCart(true);
  };

  // Recommended seeds for empty cart or cross-sell
  const recommendedSeeds = initialProducts.slice(0, 4);

  if (cartItems.length === 0) {
    return (
      <div className="container section-py">
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">Shopping Cart</span>
        </nav>

        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E6E8DE', marginBottom: '3rem' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#EEF4EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#24563C' }}>
            <ShoppingBag size={34} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#173D2B', marginBottom: '0.5rem' }}>
            Your Seed Cart is Empty
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#56685D', maxWidth: '440px', margin: '0 auto 1.75rem', lineHeight: 1.5 }}>
            You don't have any seed packets in your cart yet. Discover high-yielding vegetables, field crops, and flower varieties ready for sowing this season.
          </p>
          <Link to="/shop" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Shop Certified Seeds
            </Button>
          </Link>
        </div>

        {/* Empty Cart Recommendations */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#C68A36" />
              <span>Recommended Seeds to Start Sowing</span>
            </h3>
            <Link to="/shop" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#24563C' }}>
              View All 150+ Seeds →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {recommendedSeeds.map((seed) => (
              <div key={seed.id} style={{ background: '#FFFFFF', border: '1px solid #E6E8DE', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <ProductImage src={seed.image} alt={seed.name} fallbackSrc="/images/seed-placeholder.svg" />
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#173D2B', margin: '0 0 0.35rem 0' }}>{seed.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#24563C' }}>₹{seed.price}</strong>
                  <button
                    type="button"
                    onClick={() => addToCart(seed)}
                    style={{ background: '#24563C', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page section-py">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">Shopping Cart</span>
        </nav>

        <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
          <span className="section-subtitle">Shopping Cart</span>
          <h1 className="section-title">
            Review Seed Order ({cartCount} {cartCount === 1 ? 'packet' : 'packets'} • {cartItems.length} {cartItems.length === 1 ? 'variety' : 'varieties'})
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="cart-shipping-banner">
          {remainingForFreeShipping > 0 && !isFreeShipping ? (
            <>
              <div className="cart-shipping-icon">
                <Truck size={20} color="var(--color-primary)" />
              </div>
              <div className="cart-shipping-text">
                <p>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more to qualify for <strong>FREE Pan-India Delivery</strong>!</p>
                <div className="cart-shipping-progress-bar">
                  <div className="cart-shipping-progress-fill" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="cart-shipping-icon cart-shipping-success">
                <ShieldCheck size={20} color="var(--status-success)" />
              </div>
              <div className="cart-shipping-text">
                <p style={{ color: 'var(--status-success)', fontWeight: 600 }}>
                  🎉 Your order qualifies for FREE Express Pan-India Seed Delivery!
                </p>
              </div>
            </>
          )}
        </div>

        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-list">
            <div className="cart-list-header">
              <span className="cart-list-title">
                <Package size={16} />
                Selected Seed Varieties
              </span>
              <button
                type="button"
                onClick={handleClearCart}
                className="cart-clear-btn"
              >
                <Trash2 size={13} />
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="cart-items-container">
              {cartItems.map((item, idx) => {
                const lineTotal = item.selectedPrice * item.quantity;
                const isNearStockLimit = item.stock && item.quantity >= item.stock - 2 && item.stock <= 15;
                const isAtMax = item.stock && item.quantity >= item.stock;

                return (
                  <div
                    key={`${item.id}-${item.selectedSize}-${idx}`}
                    className="cart-item-card surface-card"
                  >
                    {/* Thumbnail */}
                    <Link to={`/product/${item.slug || item.id}`} className="cart-item-image">
                      <ProductImage src={item.image} alt={item.name} fallbackSrc="/images/seed-placeholder.svg" />
                    </Link>

                    {/* Details */}
                    <div className="cart-item-details">
                      <Link to={`/product/${item.slug || item.id}`} className="cart-item-name">
                        {item.shortName || item.name}
                      </Link>

                      {/* Dynamic Pack Size Selector */}
                      {item.packSizes && item.packSizes.length > 1 ? (
                        <div style={{ margin: '0.25rem 0' }}>
                          <select
                            value={item.selectedSize}
                            onChange={(e) => {
                              const found = item.packSizes.find(p => p.size === e.target.value);
                              if (found) changeItemPackSize(item.id, item.selectedSize, found.size, found.price);
                            }}
                            className="form-input"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', height: 'auto', display: 'inline-block', width: 'auto' }}
                          >
                            {item.packSizes.map((p, pIdx) => (
                              <option key={pIdx} value={p.size}>
                                {p.size} — ₹{p.price}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="cart-item-pack-badge">
                          <Package size={12} />
                          <span>Pack: {item.selectedSize}</span>
                        </div>
                      )}

                      <div className="cart-item-meta">
                        {item.brand} • {item.germinationRate}
                      </div>

                      {/* Stock warning */}
                      {isNearStockLimit && (
                        <div className="cart-stock-warning">
                          <AlertTriangle size={13} />
                          <span>Only {item.stock} packets in depot{isAtMax ? ' — maximum reached' : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Price per unit */}
                    <div className="cart-item-unit-price">
                      <span className="cart-price-label">Unit Price</span>
                      <strong>{formatPrice(item.selectedPrice)}</strong>
                    </div>

                    {/* Quantity selector */}
                    <div className="cart-item-qty-wrap">
                      <div className="qty-control">
                        <button
                          type="button"
                          className="qty-btn"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          disabled={isAtMax}
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="cart-item-line-total">
                      <span className="cart-price-label">Subtotal</span>
                      <strong>{formatPrice(lineTotal)}</strong>
                    </div>

                    <button
                      type="button"
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-continue-row">
              <Link to="/shop" className="cart-continue-link">
                <ArrowLeft size={16} />
                <span>Continue Shopping More Seeds</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="order-summary-card">
            <h3 className="order-summary-title">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                <div className="cart-coupon-input-row">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. KISAN10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="form-input"
                    style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    Apply
                  </Button>
                </div>
                <div className="cart-coupon-hints">
                  <span>Try: </span>
                  {['KISAN10', 'BHOOMI10', 'AGRI20', 'FREESHIP'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      className="cart-coupon-hint-btn"
                      onClick={() => applyCoupon(code)}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </form>
            ) : (
              <div className="cart-applied-coupon">
                <Tag size={14} color="var(--status-success)" />
                <span>{appliedCoupon} applied <strong>(−{formatPrice(discountAmount)})</strong></span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="cart-remove-coupon"
                  title="Remove coupon"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Line calculations */}
            <div className="summary-row">
              <span>Items Subtotal ({cartCount} items)</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Estimated Freight / Shipping</span>
              <span>
                {shippingFee === 0 ? (
                  <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: 'var(--status-success)' }}>
                <span>Coupon Discount</span>
                <strong>-{formatPrice(discountAmount)}</strong>
              </div>
            )}

            <div className="summary-total-row">
              <span>Total Payable</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="cart-savings-badge">
                🎉 You're saving {formatPrice(totalSavings)} on this order!
              </div>
            )}

            <p className="cart-tax-note">
              Inclusive of all taxes & certification fees. Delivered in hermetically sealed moisture-barrier pouches.
            </p>

            <Link to="/checkout" style={{ display: 'block' }}>
              <Button variant="accent" size="lg" fullWidth icon={ArrowRight} iconPosition="right">
                Proceed to Checkout
              </Button>
            </Link>

            {/* Trust badges */}
            <div className="cart-trust-badges">
              <div className="cart-trust-badge">
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>100% Genuine Certified Seeds</span>
              </div>
              <div className="cart-trust-badge">
                <Truck size={16} color="var(--color-primary)" />
                <span>Safe Dispatch Across India</span>
              </div>
              <div className="cart-trust-badge">
                <Package size={16} color="var(--color-primary)" />
                <span>Hermetic Sealed Packaging</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
