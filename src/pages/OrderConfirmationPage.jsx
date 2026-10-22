import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  Printer,
  Info,
  Clock,
  Box,
  ChevronRight
} from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="container section-py text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--bg-sage-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <Package size={30} />
        </div>
        <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)' }}>Order Record Not Found</h2>
        <p style={{ margin: '0.75rem 0 1.5rem', color: 'var(--text-secondary)', maxWidth: '420px' }}>
          We could not find an order matching identifier "{orderId}". It may have been placed in a different browser session or removed.
        </p>
        <Link to="/orders">
          <Button variant="primary">View My Orders History</Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Demo status order timeline
  const statuses = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const currentStatusIndex = Math.max(0, statuses.indexOf(order.status || 'Placed'));

  return (
    <div className="order-confirmation-page section-py">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-md)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/orders">My Orders</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">Order #{order.orderId}</span>
        </nav>

        {/* Success Header Card */}
        <div className="surface-card" style={{ padding: 'var(--space-2xl) var(--space-xl)', textAlign: 'center', marginBottom: 'var(--space-xl)', borderTop: '4px solid var(--status-success)' }}>
          <div style={{ width: '68px', height: '68px', background: 'var(--status-success-bg)', color: 'var(--status-success)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 12px rgba(34, 109, 63, 0.15)' }}>
            <CheckCircle2 size={38} />
          </div>

          <h1 style={{ fontSize: '2.1rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Seed Order Placed Successfully!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 1.25rem' }}>
            Thank you for purchasing with BeejBhandar. Your order has been recorded and scheduled for dispatch in climate-controlled moisture foil packets.
          </p>

          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', background: 'var(--bg-surface-alt)', padding: '0.65rem 1.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
            <span>Demo Order ID: <strong style={{ color: 'var(--color-primary-dark)' }}>{order.orderId}</strong></span>
            <span>•</span>
            <span>Order Date: <strong>{formatDate(order.date)}</strong></span>
            <span>•</span>
            <span>Status: <strong style={{ color: 'var(--color-primary)' }}>{order.status || 'Placed'}</strong></span>
          </div>

          {/* Demo Notice Banner inside Confirmation */}
          <div className="demo-disclaimer-banner" style={{ maxWidth: '640px', margin: '1.5rem auto 0', textAlign: 'left' }}>
            <Info size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Demonstration Order Notice:</strong> This order has been created for demonstration purposes and stored in your browser's localStorage. No real financial payment was charged and no physical shipment is booked.
            </div>
          </div>
        </div>

        {/* Demo Status Pipeline Stepper */}
        <div className="surface-card" style={{ padding: 'var(--space-lg) var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--color-primary)" />
            <span>Order Progression (Demo Lifecycle)</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
            Simulated agricultural fulfillment pipeline from depot seed pack allocation to grower handover.
          </p>

          <div className="order-status-stepper">
            {statuses.map((stepName, idx) => {
              const isCompleted = idx < currentStatusIndex;
              const isActive = idx === currentStatusIndex;

              return (
                <div
                  key={stepName}
                  className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="stepper-dot">
                    {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <span className="stepper-label">{stepName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Address */}
        <div className="surface-card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>Dispatch & Customer Information</h2>
            <button
              onClick={handlePrint}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--color-primary)', background: 'var(--bg-sage-light)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid #CADBC2' }}
            >
              <Printer size={15} />
              <span>Print Seed Invoice</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Delivery address */}
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <MapPin size={13} />
                <span>Customer Delivery Address</span>
              </span>
              <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                {order.shippingAddress?.fullName || 'Valued Customer'}
              </strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '3px' }}>
                {order.shippingAddress?.street}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}<br />
                <strong>Mobile:</strong> {order.shippingAddress?.phone}<br />
                {order.shippingAddress?.email && <><strong>Email:</strong> {order.shippingAddress?.email}</>}
              </div>
            </div>

            {/* Delivery Timeline */}
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Calendar size={13} />
                <span>Estimated Delivery Window</span>
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                {formatDate(order.estimatedDelivery || order.date)}
              </strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                Simulated Express Courier<br />
                <span style={{ color: 'var(--text-muted)' }}>Tracking Code: {order.trackingNumber || 'AGRI-DEMO'}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <CreditCard size={13} />
                <span>Payment Mode (Demo)</span>
              </span>
              <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{order.paymentMethod}</strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--status-success)', fontWeight: 600, marginTop: '2px' }}>
                {order.paymentStatus || 'Cleared (Simulated)'}
              </div>
            </div>
          </div>

          {/* Items Purchased List (from Snapshot) */}
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Box size={16} color="var(--color-primary)" />
            <span>Ordered Items Snapshot ({order.items?.length || 0} varieties)</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(order.items || []).map((item, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={handleImageError}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  )}
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {item.shortName || item.name}
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Pack Size: <strong>{item.selectedSize}</strong> • Qty: <strong>{item.quantity}</strong>
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                    {formatPrice(item.selectedPrice * item.quantity)}
                  </strong>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ({formatPrice(item.selectedPrice)} / pack)
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal</span>
              <strong>{formatPrice(order.subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span style={{ color: 'var(--text-secondary)' }}>Delivery & Packing Charge</span>
              <span>{order.shippingFee === 0 ? <strong style={{ color: 'var(--status-success)' }}>FREE</strong> : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="summary-total-row">
              <span>Total Paid (Simulated)</span>
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
              Continue Shopping Seeds
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
