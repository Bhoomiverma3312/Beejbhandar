import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/Button';
import {
  Truck,
  Lock,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Banknote
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Karnataka', 'Madhya Pradesh', 'Maharashtra',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi NCR'
];

export const CheckoutPage = () => {
  const { cartItems, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Bhoomi Verma',
    phone: '9876543210',
    email: 'bhoomi.verma@example.com',
    street: 'Plot 18, Kisan Krishi Vihar',
    city: 'Karnal',
    state: 'Haryana',
    pincode: '132001',
    farmerType: 'Commercial Farmer',
    paymentMethod: 'UPI'
  });

  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container section-py text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ margin: '1rem 0' }}>Please add seeds to your cart before proceeding to checkout.</p>
        <Link to="/shop">
          <Button variant="primary">Browse Seed Catalog</Button>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city || !formData.pincode) {
      showToast('Please fill in all required delivery address fields.', 'error');
      return;
    }

    setLoading(true);

    // Simulate realistic frontend processing delay
    setTimeout(() => {
      const order = placeOrder({
        items: [...cartItems],
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          farmerType: formData.farmerType
        },
        paymentMethod: formData.paymentMethod === 'UPI' ? 'UPI (Google Pay / PhonePe)' : formData.paymentMethod === 'COD' ? 'Cash on Delivery (Kisan Pay)' : 'Net Banking / RuPay Card',
        subtotal: cartSubtotal,
        shippingFee: shippingFee,
        total: cartTotal,
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      clearCart();
      setLoading(false);
      showToast('Seed order placed successfully!', 'success');
      navigate(`/order-confirmation/${order.orderId}`);
    }, 800);
  };

  return (
    <div className="checkout-page section-py">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Cart</span>
          </Link>
          <span className="section-subtitle">Secure Dispatch Processing</span>
          <h1 className="section-title">Seed Delivery & Dispatch Address</h1>
        </div>

        <form onSubmit={handleSubmit} className="checkout-grid">
          {/* Left Column: Delivery Info & Payment */}
          <div className="checkout-form-sections" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Delivery Address Card */}
            <div className="surface-card" style={{ padding: 'var(--space-xl)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} color="var(--color-primary)" />
                <span>1. Grower Delivery Address</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label" htmlFor="fullName">Full Name / Farm Owner *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="phone">Contact Mobile Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="10 digit Indian mobile"
                  />
                </div>

                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label" htmlFor="street">Village / Farm / House & Street Address *</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Near Krishi Mandi, Village Ramnagar"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="city">City / District / Tehsil *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="pincode">Postal PIN Code *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="form-input"
                    maxLength={6}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="farmerType">Cultivation Profile</label>
                  <select
                    id="farmerType"
                    name="farmerType"
                    value={formData.farmerType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Commercial Farmer">Commercial Farm Cultivator</option>
                    <option value="Kitchen Gardener">Terrace & Home Kitchen Gardener</option>
                    <option value="Nursery Producer">Commercial Nursery Producer</option>
                    <option value="Organic Grower">Certified Organic Grower</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Options Card */}
            <div className="surface-card" style={{ padding: 'var(--space-xl)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={20} color="var(--color-primary)" />
                <span>2. Select Payment Option (Simulation)</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: formData.paymentMethod === 'UPI' ? 'var(--bg-sage-light)' : 'var(--bg-surface)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={formData.paymentMethod === 'UPI'}
                    onChange={handleChange}
                  />
                  <Smartphone size={20} color="var(--color-primary)" />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                      Instant UPI (Google Pay / PhonePe / BHIM)
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Direct instant zero-charge mobile clearance
                    </span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: formData.paymentMethod === 'COD' ? 'var(--bg-sage-light)' : 'var(--bg-surface)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                  />
                  <Banknote size={20} color="var(--color-primary)" />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                      Cash on Delivery (Kisan Pay upon Pouch Inspection)
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Pay post delivery when sealed barrier packet arrives
                    </span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', background: formData.paymentMethod === 'NetBanking' ? 'var(--bg-sage-light)' : 'var(--bg-surface)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="NetBanking"
                    checked={formData.paymentMethod === 'NetBanking'}
                    onChange={handleChange}
                  />
                  <CreditCard size={20} color="var(--color-primary)" />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                      Kisan Credit Card / RuPay / Net Banking
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      All major cooperative & nationalized bank gateways
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Summary */}
          <aside className="order-summary-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--color-primary-dark)', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              Confirm Seed Package
            </h3>

            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{item.shortName || item.name}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{item.selectedSize} × {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    {formatPrice(item.selectedPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>

            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Shipping & Moisture Foil Packing</span>
              <span>
                {shippingFee === 0 ? (
                  <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                ) : (
                  formatPrice(shippingFee)
                )}
              </span>
            </div>

            <div className="summary-total-row">
              <span>Final Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Button
                variant="accent"
                size="lg"
                fullWidth
                type="submit"
                loading={loading}
              >
                Place Seed Order ({formatPrice(cartTotal)})
              </Button>
            </div>

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.5' }}>
              By confirming, you receive genuine foundation seed genetics certified under the Seeds Act (1966) rules.
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
