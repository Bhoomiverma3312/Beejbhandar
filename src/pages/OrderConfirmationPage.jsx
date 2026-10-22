import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { Button } from '../components/Button';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  Printer
} from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="container section-py text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Order Record Not Found</h2>
        <p style={{ margin: '1rem 0' }}>We could not find an order matching identifier "{orderId}".</p>
        <Link to="/orders">
          <Button variant="primary">View My Orders</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-confirmation-page section-py">
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Success Header Card */}
        <div className="surface-card" style={{ padding: 'var(--space-2xl)', textAlign: 'center', marginBottom: 'var(--space-xl)', borderTop: '4px solid var(--status-success)' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--status-success-bg)', color: 'var(--status-success)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <CheckCircle2 size={36} />
          </div>

          <h1 style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Seed Order Confirmed!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
            Thank you for purchasing with BeejBhandar. Your order is being packed in climate-controlled moisture-barrier foil at our seed depot.
          </p>

          <div style={{ display: 'inline-flex', gap: '1rem', background: 'var(--bg-surface-alt)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
            <span>Order Number: <strong>{order.orderId}</strong></span>
            <span>•</span>
            <span>Tracking: <strong>{order.trackingNumber}</strong></span>
          </div>
        </div>

        {/* Order Details & Address */}
        <div className="surface-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>Dispatch & Order Details</h2>
            <button
              onClick={handlePrint}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--color-primary)' }}
            >
              <Printer size={15} />
              <span>Print Seed Invoice</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <MapPin size={13} />
                <span>Shipping Address</span>
              </span>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{order.shippingAddress.fullName}</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                Phone: {order.shippingAddress.phone}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Calendar size={13} />
                <span>Estimated Arrival</span>
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                {formatDate(order.estimatedDelivery || order.date)}
              </strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Via Express Rural Agri-Courier
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <CreditCard size={13} />
                <span>Payment Mode</span>
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>{order.paymentMethod}</strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--status-success)', fontWeight: 600 }}>
                Status: {order.paymentStatus || 'Cleared'}
              </div>
            </div>
          </div>

          {/* Items Purchased List */}
          <h3 style={{ fontSize: '1rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Ordered Seed Packets
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.shortName || item.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.selectedSize} × {item.quantity}</span>
                  </div>
                </div>
                <strong style={{ color: 'var(--color-primary-dark)' }}>
                  {formatPrice(item.selectedPrice * item.quantity)}
                </strong>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/orders">
            <Button variant="secondary" size="md">
              View All My Orders
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
