import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import { ProductImage } from '../components/ProductImage';
import {
  Package,
  Truck,
  CheckCircle2,
  ExternalLink,
  Info,
  ChevronRight,
  MapPin,
  Box
} from 'lucide-react';

export const MyOrdersPage = () => {
  const { orders } = useOrders();

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-success">Delivered</span>;
      case 'Shipped':
        return <span className="badge badge-primary">Shipped</span>;
      case 'Packed':
        return <span className="badge badge-accent">Packed</span>;
      case 'Confirmed':
        return <span className="badge badge-primary">Confirmed</span>;
      case 'Placed':
      default:
        return <span className="badge badge-muted">Placed</span>;
    }
  };

  // Friendly Empty State when there are no orders
  if (!orders || orders.length === 0) {
    return (
      <div className="my-orders-page section-py">
        <div className="container">
          <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span className="pdp-breadcrumb-current">My Orders</span>
          </nav>

          <EmptyState
            icon={Package}
            title="No Orders Found"
            description="You haven't placed any demo seed orders yet. Sowed seeds turn into fruitful harvest—explore our catalog to test our checkout flow."
            actionText="Browse Seed Catalog"
            actionLink="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page section-py">
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-md)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">My Orders</span>
        </nav>

        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="section-subtitle">Account Order History</span>
            <span className="badge badge-accent">Demo Storage</span>
          </div>
          <h1 className="section-title">My Seed Purchases & Order History</h1>
          <p className="section-desc">
            Review your previously simulated seed consignments, status updates, and immutable order snapshots.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: 'var(--space-xl)' }}>
          <Info size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Frontend Simulation Notice:</strong> Order statuses (e.g. <em>Placed, Confirmed, Packed, Shipped, Delivered</em>) are simulated demonstrations. No real parcel dispatch or external tracking service is integrated.
          </div>
        </div>

        {/* Orders Listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {orders.map((order) => {
            const itemCount = (order.items || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
            const statuses = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
            const activeStatusIndex = Math.max(0, statuses.indexOf(order.status || 'Placed'));

            return (
              <div key={order.orderId} className="surface-card" style={{ padding: 'var(--space-xl)' }}>
                {/* Header bar of order card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Order ID
                      </span>
                      <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-primary-dark)' }}>
                        {order.orderId}
                      </strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Order Date
                      </span>
                      <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {formatDate(order.date)}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Total Amount
                      </span>
                      <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-primary-dark)' }}>
                        {formatPrice(order.total)}
                      </strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Payment
                      </span>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {order.paymentMethod || 'Cash on Delivery (Demo)'}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge & Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {getStatusBadge(order.status)}
                    <Link to={`/order-confirmation/${order.orderId}`}>
                      <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right">
                        View Invoice
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Progress Mini Stepper */}
                <div style={{ margin: '1.25rem 0' }}>
                  <div className="order-status-stepper" style={{ margin: '0.75rem 0' }}>
                    {statuses.map((stepName, idx) => {
                      const isCompleted = idx < activeStatusIndex;
                      const isActive = idx === activeStatusIndex;

                      return (
                        <div
                          key={stepName}
                          className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        >
                          <div className="stepper-dot" style={{ width: '26px', height: '26px', fontSize: '0.7rem' }}>
                            {isCompleted ? <CheckCircle2 size={13} /> : idx + 1}
                          </div>
                          <span className="stepper-label" style={{ fontSize: '0.7rem' }}>{stepName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items snapshot in Order */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <Box size={14} color="var(--color-primary)" />
                    <span>Ordered Seed Items ({itemCount} {itemCount === 1 ? 'packet' : 'packets'})</span>
                  </span>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                    {(order.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <div style={{ width: '44px', height: '44px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                          <ProductImage
                            src={item.image}
                            alt={item.name}
                            fallbackSrc="/images/seed-placeholder.svg"
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.shortName || item.name}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {item.selectedSize} × {item.quantity}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                            {formatPrice(item.selectedPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Delivery & Tracking */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={16} color="var(--color-primary)" />
                    <span>Demo Tracking: <strong>{order.trackingNumber || 'AGRI-DEMO-SIMULATION'}</strong></span>
                  </div>
                  {order.shippingAddress && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} color="var(--text-muted)" />
                      <span>Deliver to: <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.city}, {order.shippingAddress.state})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom shopping prompt */}
        <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.92rem' }}>
            Looking for more seasonal hybrid vegetable or field crop varieties?
          </p>
          <Link to="/shop">
            <Button variant="secondary" size="md">
              Explore More Seeds in Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
