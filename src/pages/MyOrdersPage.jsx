import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import {
  Package,
  Truck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';

export const MyOrdersPage = () => {
  const { orders } = useOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="container section-py">
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="You haven't placed any seed orders yet. Sowed seeds turn into fruitful yields—start with our top verified varieties today."
          actionText="Shop Seed Catalog"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="my-orders-page section-py">
      <div className="container" style={{ maxWidth: '980px' }}>
        <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
          <span className="section-subtitle">Account Order History</span>
          <h1 className="section-title">My Seed Purchases & Tracking</h1>
          <p className="section-desc">
            Monitor the dispatch, shipping status, and seed batch certifications of your orders.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {orders.map((order) => {
            const isDelivered = order.status === 'Delivered';

            return (
              <div key={order.orderId} className="surface-card" style={{ padding: 'var(--space-lg)' }}>
                {/* Header bar of card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order ID</span>
                      <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                        {order.orderId}
                      </strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order Date</span>
                      <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {formatDate(order.date)}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Amount</span>
                      <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                        {formatPrice(order.total)}
                      </strong>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge ${isDelivered ? 'badge-success' : 'badge-primary'}`}>
                      {order.status}
                    </span>
                    <Link to={`/order-confirmation/${order.orderId}`}>
                      <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right">
                        View Invoice
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Items preview in Order */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem', margin: '1rem 0' }}>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.shortName || item.name}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {item.selectedSize} × {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking info footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={16} color="var(--color-primary)" />
                    <span>Courier Tracking: <strong>{order.trackingNumber}</strong></span>
                  </div>
                  <div>
                    Ship to: <strong>{order.shippingAddress.city}, {order.shippingAddress.state}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
