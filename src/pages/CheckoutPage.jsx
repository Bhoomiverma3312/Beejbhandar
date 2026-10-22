import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import {
  Truck,
  Lock,
  ArrowLeft,
  CreditCard,
  Banknote,
  AlertCircle,
  ShieldCheck,
  Package,
  Info,
  ChevronRight
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu',
  'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi NCR'
];

export const CheckoutPage = () => {
  const { cartItems, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Bhoomi Verma',
    phone: '9876543210',
    email: 'bhoomi.verma@example.com',
    street: 'Plot 18, Kisan Krishi Vihar, GT Road',
    city: 'Karnal',
    state: 'Haryana',
    pincode: '132001',
    farmerType: 'Commercial Farm Cultivator',
    paymentMethod: 'COD' // 'COD' or 'ONLINE'
  });

  // Inline Validation Errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field validation rules
  const validateField = (name, value) => {
    let error = '';
    const trimmed = String(value || '').trim();

    switch (name) {
      case 'fullName':
        if (!trimmed) {
          error = 'Customer name is required.';
        } else if (trimmed.length < 3) {
          error = 'Please enter at least 3 characters.';
        }
        break;

      case 'phone':
        if (!trimmed) {
          error = 'Mobile number is required.';
        } else if (!/^[6-9]\d{9}$/.test(trimmed.replace(/\s+/g, ''))) {
          error = 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).';
        }
        break;

      case 'email':
        if (!trimmed) {
          error = 'Email address is required for dispatch notifications.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'street':
        if (!trimmed) {
          error = 'Delivery address / street is required.';
        } else if (trimmed.length < 8) {
          error = 'Please provide detailed delivery address (village, street, landmark).';
        }
        break;

      case 'city':
        if (!trimmed) {
          error = 'City / Tehsil / District is required.';
        }
        break;

      case 'state':
        if (!trimmed) {
          error = 'Please select a state.';
        }
        break;

      case 'pincode':
        if (!trimmed) {
          error = 'Postal PIN code is required.';
        } else if (!/^\d{6}$/.test(trimmed)) {
          error = 'Postal PIN code must be exactly 6 digits.';
        }
        break;

      default:
        break;
    }
    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    const fieldsToValidate = ['fullName', 'phone', 'email', 'street', 'city', 'state', 'pincode'];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Revalidate if touched
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // If cart is empty, prevent checkout
  if (cartItems.length === 0) {
    return (
      <div className="container section-py text-center" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--bg-sage-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <Package size={32} />
        </div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)' }}>Your Cart is Empty</h2>
        <p style={{ margin: '0.75rem 0 1.5rem', maxWidth: '420px', color: 'var(--text-secondary)' }}>
          You cannot proceed to checkout without any seed packages. Please add seeds to your cart first.
        </p>
        <Link to="/shop">
          <Button variant="primary" size="md">Browse Seed Catalog</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double submission if already loading
    if (isSubmitting) return;

    // Mark all required fields as touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      street: true,
      city: true,
      state: true,
      pincode: true
    });

    const isValid = validateAll();
    if (!isValid) {
      showToast('Please correct the highlighted errors before placing your order.', 'error');
      // Scroll to first invalid element
      const firstInvalidInput = document.querySelector('.form-input.has-error, .form-select.has-error');
      if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Frontend demo order submission simulation
    setTimeout(() => {
      try {
        const order = placeOrder({
          items: cartItems, // Snapshot captured immutably by OrdersContext
          shippingAddress: {
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            street: formData.street.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
            farmerType: formData.farmerType
          },
          paymentMethod: formData.paymentMethod === 'COD'
            ? 'Cash on Delivery (Demo)'
            : 'Online Payment (Demo)',
          subtotal: cartSubtotal,
          shippingFee: shippingFee,
          total: cartTotal,
          status: 'Placed',
          estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });

        // 6. Clear cart after successful order creation
        clearCart();
        showToast(`Demo order #${order.orderId} created successfully!`, 'success');
        navigate(`/order-confirmation/${order.orderId}`);
      } catch (err) {
        console.error('Order creation failed:', err);
        showToast('Failed to create order. Please try again.', 'error');
        setIsSubmitting(false);
      }
    }, 700);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="checkout-page section-py">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-md)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/cart">Cart</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">Demo Checkout</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Cart</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 className="section-title" style={{ margin: 0 }}>Secure Seed Dispatch & Checkout</h1>
            <span className="badge badge-accent">Demo Simulation Mode</span>
          </div>
          <p className="section-desc" style={{ marginTop: '0.4rem' }}>
            Complete your delivery details to simulate a seed consignment order. No real payment will be charged.
          </p>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: 'var(--space-xl)' }}>
          <Info size={20} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Interactive Frontend Demo Mode:</strong> All orders created here are recorded locally in your browser storage (localStorage). No real bank gateway or credit card clearance will take place, and no physical courier will be booked.
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="checkout-grid">
          {/* Left Column: Form Fields */}
          <div className="checkout-form-sections" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            
            {/* 1. Customer & Delivery Address Card */}
            <div className="surface-card" style={{ padding: 'var(--space-xl)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="var(--color-primary)" />
                <span>1. Grower & Delivery Information</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* Full Name */}
                <div className="input-group">
                  <label className="input-label" htmlFor="fullName">
                    <span>Customer Name <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.fullName && errors.fullName ? 'has-error' : ''}`}
                    placeholder="e.g. Bhoomi Verma"
                  />
                  {touched.fullName && errors.fullName && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Mobile Phone */}
                <div className="input-group">
                  <label className="input-label" htmlFor="phone">
                    <span>Mobile Number <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.phone && errors.phone ? 'has-error' : ''}`}
                    placeholder="10-digit Indian mobile (e.g. 9876543210)"
                    maxLength={10}
                  />
                  {touched.phone && errors.phone && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label" htmlFor="email">
                    <span>Email Address <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.email && errors.email ? 'has-error' : ''}`}
                    placeholder="e.g. bhoomi.verma@example.com"
                  />
                  {touched.email && errors.email && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Street / Farm Address */}
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label" htmlFor="street">
                    <span>Delivery Address (Village / Farm / Street) <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.street && errors.street ? 'has-error' : ''}`}
                    placeholder="e.g. Plot 18, Kisan Krishi Vihar, GT Road, Near Krishi Mandi"
                  />
                  {touched.street && errors.street && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.street}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="input-group">
                  <label className="input-label" htmlFor="city">
                    <span>City / District / Tehsil <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.city && errors.city ? 'has-error' : ''}`}
                    placeholder="e.g. Karnal"
                  />
                  {touched.city && errors.city && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.city}
                    </span>
                  )}
                </div>

                {/* State */}
                <div className="input-group">
                  <label className="input-label" htmlFor="state">
                    <span>State <span className="input-label-required">*</span></span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-select ${touched.state && errors.state ? 'has-error' : ''}`}
                  >
                    <option value="">Select Indian State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {touched.state && errors.state && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.state}
                    </span>
                  )}
                </div>

                {/* PIN Code */}
                <div className="input-group">
                  <label className="input-label" htmlFor="pincode">
                    <span>Postal PIN Code <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input ${touched.pincode && errors.pincode ? 'has-error' : ''}`}
                    placeholder="6-digit PIN code (e.g. 132001)"
                    maxLength={6}
                  />
                  {touched.pincode && errors.pincode && (
                    <span className="input-error-msg" role="alert">
                      <AlertCircle size={13} /> {errors.pincode}
                    </span>
                  )}
                </div>

                {/* Cultivation Profile (Optional) */}
                <div className="input-group">
                  <label className="input-label" htmlFor="farmerType">
                    <span>Cultivation Category</span>
                  </label>
                  <select
                    id="farmerType"
                    name="farmerType"
                    value={formData.farmerType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Commercial Farm Cultivator">Commercial Farm Cultivator</option>
                    <option value="Kitchen Gardener">Terrace & Kitchen Gardener</option>
                    <option value="Commercial Nursery Producer">Commercial Nursery Producer</option>
                    <option value="Certified Organic Grower">Certified Organic Grower</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Payment Options (Demo Simulation) */}
            <div className="surface-card" style={{ padding: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Lock size={20} color="var(--color-primary)" />
                  <span>2. Payment Method</span>
                </h2>
                <span className="badge badge-accent">Demo Simulation</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Cash on Delivery (Demo) */}
                <label className={`payment-option-card ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                    className="payment-radio-input"
                  />
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                    <Banknote size={22} color="var(--color-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                          Cash on Delivery (Demo)
                        </strong>
                        <span className="payment-badge-demo">Demo Simulation</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0 }}>
                        Simulate paying cash upon arrival at your farm doorstep. No advance clearance needed.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Online Payment (Demo) */}
                <label className={`payment-option-card ${formData.paymentMethod === 'ONLINE' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === 'ONLINE'}
                    onChange={handleChange}
                    className="payment-radio-input"
                  />
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                    <CreditCard size={22} color="var(--color-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                          Online Payment (Demo)
                        </strong>
                        <span className="payment-badge-demo">Demo Simulation</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0 }}>
                        Instant UPI / Kisan Card simulation. Marked immediately as paid without charging any bank account.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Explicit Clear Disclaimer */}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Notice:</strong> This is a frontend demonstration store. No real payment will be processed or financial credentials captured.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <aside className="order-summary-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Order Summary</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                {totalItemsCount} {totalItemsCount === 1 ? 'pkt' : 'pkts'}
              </span>
            </h3>

            {/* Product items list with size, qty, and price */}
            <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flex: 1, paddingRight: '0.5rem' }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={handleImageError}
                        style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                      />
                    )}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ color: 'var(--text-primary)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.shortName || item.name}
                      </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                        {item.selectedSize} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)', whiteSpace: 'nowrap' }}>
                    {formatPrice(item.selectedPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>

            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Delivery Charge</span>
              <span>
                {shippingFee === 0 ? (
                  <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                ) : (
                  <strong>{formatPrice(shippingFee)}</strong>
                )}
              </span>
            </div>

            <div className="summary-total-row">
              <span>Total Payable</span>
              <span style={{ color: 'var(--color-primary-dark)' }}>{formatPrice(cartTotal)}</span>
            </div>

            {/* Submit Place Order Button */}
            <div style={{ marginTop: '1.5rem' }}>
              <Button
                variant="accent"
                size="lg"
                fullWidth
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? 'Creating Demo Order...' : `Place Demo Order (${formatPrice(cartTotal)})`}
              </Button>
            </div>

            {/* Inline validation status reminder if errors exist */}
            {Object.keys(errors).some((k) => errors[k]) && (
              <div style={{ marginTop: '0.85rem', padding: '0.5rem', background: '#FFF0F0', border: '1px solid #FFD0D0', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: 'var(--status-danger)', textAlign: 'center' }}>
                Please resolve the delivery address errors above to place your order.
              </div>
            )}

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.5' }}>
              Protected by moisture-barrier foil packaging. Seed genetics verified under Seed Act guidelines.
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
