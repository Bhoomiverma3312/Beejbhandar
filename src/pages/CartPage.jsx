import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
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
  X
} from 'lucide-react';

/* ---------- Supported Demo Coupons ---------- */
const VALID_COUPONS = {
  KISAN10: { type: 'percent', value: 10, label: 'Kisan 10% Discount' },
  BHOOMI10: { type: 'percent', value: 10, label: 'Bhoomi 10% Discount' },
  FIRSTSEED: { type: 'flat', value: 50, label: 'First Seed ₹50 Off' }
};

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartSubtotal, shippingFee, cartTotal } = useCart();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const coupon = VALID_COUPONS[code];
    if (coupon) {
      const discount = coupon.type === 'percent'
        ? Math.round(cartSubtotal * (coupon.value / 100))
        : coupon.value;
      setDiscountAmount(discount);
      setAppliedCoupon(code);
      showToast(`Coupon ${code} applied: ${formatPrice(discount)} discount!`, 'success');
    } else {
      showToast('Invalid coupon code. Try "KISAN10", "BHOOMI10" or "FIRSTSEED"', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon('');
    setCouponCode('');
    showToast('Coupon removed.', 'info');
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);
  const totalSavings = discountAmount + (shippingFee === 0 && cartSubtotal > 0 ? 60 : 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container section-py">
        {/* Breadcrumb even on empty */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">Shopping Cart</span>
        </nav>
        <EmptyState
          icon={ShoppingBag}
          title="Your Seed Cart is Empty"
          description="You don't have any seed packets in your cart yet. Discover high-yielding vegetables, field crops, and organic varieties ready for this sowing season."
          actionText="Shop Certified Seeds"
          actionLink="/shop"
        />
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
            Review Seed Order ({totalItems} {totalItems === 1 ? 'item' : 'items'} • {cartItems.length} {cartItems.length === 1 ? 'variety' : 'varieties'})
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="cart-shipping-banner">
          {remainingForFreeShipping > 0 ? (
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
                onClick={() => {
                  clearCart();
                  setDiscountAmount(0);
                  setAppliedCoupon('');
                }}
                className="cart-clear-btn"
              >
                <Trash2 size={13} />
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="cart-items-container">
              {cartItems.map((item) => {
                const lineTotal = item.selectedPrice * item.quantity;
                const isNearStockLimit = item.quantity >= item.stock - 2 && item.stock <= 15;
                const isAtMax = item.quantity >= item.stock;

                return (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="cart-item-card surface-card"
                  >
                    {/* Thumbnail */}
                    <Link to={`/product/${item.slug || item.id}`} className="cart-item-image">
                      <img src={item.image} alt={item.name} onError={handleImageError} />
                    </Link>

                    {/* Details */}
                    <div className="cart-item-details">
                      <Link to={`/product/${item.slug || item.id}`} className="cart-item-name">
                        {item.shortName || item.name}
                      </Link>
                      <div className="cart-item-pack-badge">
                        <Package size={12} />
                        <span>Pack: {item.selectedSize}</span>
                      </div>
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
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-input"
                    style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    Apply
                  </Button>
                </div>
                <div className="cart-coupon-hints">
                  <span>Try: </span>
                  {Object.keys(VALID_COUPONS).map((code) => (
                    <button
                      key={code}
                      type="button"
                      className="cart-coupon-hint-btn"
                      onClick={() => setCouponCode(code)}
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
                  onClick={handleRemoveCoupon}
                  className="cart-remove-coupon"
                  title="Remove coupon"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Line calculations */}
            <div className="summary-row">
              <span>Items Subtotal ({totalItems} items)</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Estimated Shipping</span>
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
                <span>Discount Savings</span>
                <strong>-{formatPrice(discountAmount)}</strong>
              </div>
            )}

            <div className="summary-total-row">
              <span>Total Payable</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="cart-savings-badge">
                🎉 You're saving {formatPrice(totalSavings)} on this order!
              </div>
            )}

            <p className="cart-tax-note">
              Inclusive of all taxes & certification fees. Delivered in sealed hermetic barrier pouches.
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
