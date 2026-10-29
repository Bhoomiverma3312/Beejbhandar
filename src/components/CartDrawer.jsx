import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
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
    totalSavings
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, closeCartDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div
      className="cart-drawer-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 61, 43, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.25s ease'
      }}
      onClick={closeCartDrawer}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      <div
        ref={drawerRef}
        className="cart-drawer-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E6E8DE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8F7F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#24563C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#173D2B' }}>
                Your Seed Cart
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#56685D' }}>
                {cartCount} {cartCount === 1 ? 'packet' : 'packets'} selected
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={() => clearCart(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#991B1B',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '4px'
                }}
                title="Empty cart"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={closeCartDrawer}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#56685D',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '6px'
              }}
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#EEF4EB', borderBottom: '1px solid #E6E8DE' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#24563C' }}>
              <Truck size={14} />
              {isFreeShipping ? 'Free Delivery Unlocked!' : `Add ₹${remainingForFreeShipping} more for FREE Delivery`}
            </span>
            <span style={{ fontWeight: 700, color: '#24563C' }}>
              {isFreeShipping ? '100%' : `${Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%`}
            </span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', backgroundColor: '#CBD2C1', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                backgroundColor: isFreeShipping ? '#226D3F' : '#C68A36',
                width: isFreeShipping ? '100%' : `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#EEF4EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: '#24563C'
                }}
              >
                <ShoppingBag size={30} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#173D2B', marginBottom: '0.4rem' }}>
                Your seed cart is empty
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#56685D', maxWidth: '280px', margin: '0 auto 1.5rem', lineHeight: 1.4 }}>
                Explore high-yield vegetables, fruits, flowers and seasonal crop seeds.
              </p>
              <Link
                to="/shop"
                onClick={closeCartDrawer}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#24563C',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <span>Browse Seed Catalog</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item, idx) => {
                const isLowStock = item.stock && item.stock <= 10;
                return (
                  <div
                    key={`${item.id}-${item.selectedSize}-${idx}`}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E6E8DE',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <ProductImage src={item.image} alt={item.name} fallbackSrc="/images/seed-placeholder.svg" />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.25rem' }}>
                        <Link
                          to={`/product/${item.id}`}
                          onClick={closeCartDrawer}
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#173D2B',
                            textDecoration: 'none',
                            lineHeight: 1.25,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={item.name}
                        >
                          {item.shortName || item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#BE2828',
                            cursor: 'pointer',
                            padding: '0.2rem'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Pack Size Selector if available */}
                      {item.packSizes && item.packSizes.length > 1 ? (
                        <select
                          value={item.selectedSize}
                          onChange={(e) => {
                            const found = item.packSizes.find(p => p.size === e.target.value);
                            if (found) changeItemPackSize(item.id, item.selectedSize, found.size, found.price);
                          }}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.15rem 0.35rem',
                            border: '1px solid #CBD2C1',
                            borderRadius: '4px',
                            margin: '0.3rem 0',
                            backgroundColor: '#F8F7F0',
                            maxWidth: '180px'
                          }}
                        >
                          {item.packSizes.map((p, pIdx) => (
                            <option key={pIdx} value={p.size}>
                              {p.size} (₹{p.price})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: '#56685D', margin: '0.2rem 0' }}>
                          Pack: <strong>{item.selectedSize}</strong>
                        </span>
                      )}

                      {/* Stock Warning */}
                      {isLowStock && (
                        <span style={{ fontSize: '0.68rem', color: '#B45309', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <AlertTriangle size={11} /> Only {item.stock} left in depot!
                        </span>
                      )}

                      {/* Price and Quantity Stepper */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.35rem' }}>
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#173D2B' }}>
                            ₹{item.selectedPrice * item.quantity}
                          </strong>
                          {item.quantity > 1 && (
                            <span style={{ fontSize: '0.68rem', color: '#84968C', marginLeft: '4px' }}>
                              (₹{item.selectedPrice} ea)
                            </span>
                          )}
                        </div>

                        {/* Stepper */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #CBD2C1', borderRadius: '6px', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            style={{
                              background: '#F1EFE6',
                              border: 'none',
                              padding: '0.25rem 0.45rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ padding: '0 0.55rem', fontSize: '0.78rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            style={{
                              background: '#F1EFE6',
                              border: 'none',
                              padding: '0.25rem 0.45rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            title="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Summary, Coupons & Actions */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#F8F7F0',
              borderTop: '1px solid #E6E8DE'
            }}
          >
            {/* Promo Code Input */}
            <div style={{ marginBottom: '0.85rem' }}>
              {appliedCoupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.75rem',
                    backgroundColor: '#E8F5ED',
                    border: '1px dashed #226D3F',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    color: '#226D3F'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                    <Tag size={13} /> {appliedCoupon} applied (-₹{discountAmount})
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ background: 'transparent', border: 'none', color: '#991B1B', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Promo code (e.g. KISAN10)"
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.75rem',
                      border: '1px solid #CBD2C1',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.45rem 0.85rem',
                      backgroundColor: '#24563C',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Subtotals */}
            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#56685D' }}>
                <span>Subtotal ({cartCount} items):</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#226D3F', fontWeight: 600 }}>
                  <span>Coupon Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#56685D' }}>
                <span>Estimated Freight / Shipping:</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#226D3F' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, color: '#173D2B', paddingTop: '0.4rem', borderTop: '1px solid #CBD2C1' }}>
                <span>Total Amount:</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCheckoutClick}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: '#24563C',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(36, 86, 60, 0.2)'
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
              <Link
                to="/cart"
                onClick={closeCartDrawer}
                style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: '#24563C',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  padding: '0.3rem'
                }}
              >
                View Full Detailed Cart & Savings Breakdown
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
