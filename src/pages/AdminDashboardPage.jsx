import React, { useState } from 'react';
import { initialProducts, categories } from '../data/seedsData';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { Button } from '../components/Button';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Search,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { orders } = useOrders();
  const { showToast } = useToast();

  const [productsList, setProductsList] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders'
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'vegetable',
    price: '',
    germinationRate: '92% Certified',
    stock: 50,
    season: 'Kharif & Rabi'
  });

  const totalStock = productsList.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  const filteredInventory = productsList.filter((p) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.categoryName?.toLowerCase().includes(q)
    );
  });

  const handleToggleStock = (productId) => {
    setProductsList((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newStatus = !item.inStock;
          showToast(`${item.shortName || item.name} marked as ${newStatus ? 'In Stock' : 'Out of Stock'}`, 'info');
          return { ...item, inStock: newStatus, stock: newStatus ? 50 : 0 };
        }
        return item;
      })
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please enter seed name and price.', 'error');
      return;
    }

    const created = {
      id: `seed-custom-${Date.now()}`,
      name: newProduct.name,
      shortName: newProduct.name,
      hindiName: 'नया बीज संकर',
      category: newProduct.category,
      categoryName: categories.find(c => c.id === newProduct.category)?.name || 'Vegetables',
      brand: 'BeejBhandar Elite Line',
      variety: 'Certified Line',
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.price) * 1.25,
      discountPercent: 20,
      rating: 4.8,
      reviewCount: 1,
      germinationRate: newProduct.germinationRate,
      purity: '99.0%',
      season: newProduct.season,
      stock: Number(newProduct.stock),
      inStock: true,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80',
      description: 'Newly added certified seed variety with high germination potential.',
      packageSizes: [{ size: '50g packet', price: Number(newProduct.price) }]
    };

    setProductsList((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      category: 'vegetable',
      price: '',
      germinationRate: '92% Certified',
      stock: 50,
      season: 'Kharif & Rabi'
    });
    showToast(`Added ${created.name} to the seed catalog!`, 'success');
  };

  return (
    <div className="admin-page section-py">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-subtitle">Store Administration Portal</span>
            <h1 className="section-title">Seed Inventory & Orders Control</h1>
            <p className="section-desc">
              Manage stock levels, inspect incoming farmer orders, and register new seed genetics.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            icon={Plus}
            onClick={() => setShowAddModal(true)}
          >
            Register New Seed
          </Button>
        </div>

        {/* 4 Metric Cards */}
        <div className="admin-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box">
              <Package size={24} />
            </div>
            <div>
              <div className="metric-val">{productsList.length}</div>
              <div className="metric-label">Active Seed Varieties</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="metric-val">{totalStock}</div>
              <div className="metric-label">Packets in Depot Stock</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <ShoppingCart size={24} />
            </div>
            <div>
              <div className="metric-val">{orders.length}</div>
              <div className="metric-label">Orders Received</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="metric-val">{formatPrice(totalRevenue)}</div>
              <div className="metric-label">Gross Processed Value</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'inventory' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('inventory')}
          >
            Seed Inventory List ({productsList.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === 'orders' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('orders')}
          >
            Farmer Orders Pipeline ({orders.length})
          </button>
        </div>

        {/* Inventory View */}
        {activeTab === 'inventory' && (
          <div>
            <div style={{ marginBottom: '1rem', maxWidth: '400px' }}>
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Filter inventory table by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Variety Name</th>
                    <th>Category</th>
                    <th>Unit Price</th>
                    <th>Germination %</th>
                    <th>Available Stock</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong style={{ color: 'var(--color-primary-dark)', display: 'block' }}>{item.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.id}</span>
                      </td>
                      <td>{item.categoryName || item.category}</td>
                      <td><strong>{formatPrice(item.price)}</strong></td>
                      <td>{item.germinationRate}</td>
                      <td>{item.stock} pkts</td>
                      <td>
                        <span className={`badge ${item.inStock ? 'badge-success' : 'badge-danger'}`}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleStock(item.id)}
                          style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
                        >
                          {item.inStock ? 'Mark Out of Stock' : 'Replenish Stock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <div className="data-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer / Grower</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Payment Method</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td><strong>{order.orderId}</strong></td>
                    <td>
                      <div>{order.shippingAddress.fullName}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                    </td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.items.reduce((s, i) => s + i.quantity, 0)} packets</td>
                    <td>{order.paymentMethod}</td>
                    <td><strong>{formatPrice(order.total)}</strong></td>
                    <td>
                      <span className="badge badge-primary">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Seed Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,61,43,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 'var(--z-modal)', padding: '1rem' }}>
            <div className="surface-card" style={{ width: '100%', maxWidth: '520px', padding: 'var(--space-xl)', animation: 'slideDown 0.2s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>Register New Seed Variety</h3>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ color: 'var(--text-muted)' }}>✕</button>
              </div>

              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Seed Variety Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Golden Hybrid Sweet Corn F1"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="form-select"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Base Price (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="180"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Sowing Season</label>
                    <input
                      type="text"
                      value={newProduct.season}
                      onChange={(e) => setNewProduct({ ...newProduct, season: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <Button variant="ghost" type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save to Catalog
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
