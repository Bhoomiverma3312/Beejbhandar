import React, { useState, useMemo } from 'react';
import { initialProducts, categories as defaultCategories } from '../data/seedsData';
import { useOrders } from '../context/OrdersContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatDate } from '../utils/formatters';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  Users,
  ShoppingCart,
  TrendingUp,
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Eye,
  X,
  IndianRupee,
  ShieldAlert
} from 'lucide-react';

const LOCAL_PRODUCTS_KEY = 'beejbhandar_admin_products_v1';
const LOCAL_CATEGORIES_KEY = 'beejbhandar_admin_categories_v1';

export const AdminDashboardPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { showToast } = useToast();

  // Navigation tab state
  // 'overview' | 'products' | 'categories' | 'inventory' | 'customers' | 'orders' | 'sales'
  const [activeTab, setActiveTab] = useState('overview');

  // Products state (persisted to localStorage)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const saveProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  };

  // Categories state
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const saveCategories = (updated) => {
    setCategoriesList(updated);
    try {
      localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  };

  // Product Filters & Search
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all'); // 'all' | 'inStock' | 'lowStock' | 'outOfStock'

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null when adding
  const [productForm, setProductForm] = useState({
    name: '',
    shortName: '',
    category: 'vegetable',
    price: '',
    originalPrice: '',
    stock: 50,
    germinationRate: '92% Certified',
    season: 'Kharif & Rabi',
    description: '',
    packSizesText: '10g (approx. 3,000 seeds): 185\n50g packet: 420'
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete product confirmation
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Selected Order for Inspection Modal
  const [inspectedOrder, setInspectedOrder] = useState(null);

  // Category modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '', hindiName: '', description: '' });

  // Quick stock edit state
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStockValue, setTempStockValue] = useState('');

  // ==========================================
  // CALCULATED METRICS FROM CURRENT LOCAL DATA
  // ==========================================
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const lowStockThreshold = 15;
    const lowStockItems = products.filter((p) => (p.stock > 0 && p.stock <= lowStockThreshold)).length;
    const outOfStockItems = products.filter((p) => p.stock === 0 || !p.inStock).length;
    const totalStockCount = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

    const totalOrders = orders.length;
    const totalSales = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    const totalSubtotal = orders.reduce((acc, o) => acc + (Number(o.subtotal) || 0), 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    return {
      totalProducts,
      lowStockItems,
      outOfStockItems,
      totalStockCount,
      totalOrders,
      totalSales,
      totalSubtotal,
      avgOrderValue
    };
  }, [products, orders]);

  // Unique customers aggregated from demo orders
  const customersList = useMemo(() => {
    const map = new Map();

    orders.forEach((o) => {
      const email = o.shippingAddress?.email || o.shippingAddress?.phone || 'unknown';
      const name = o.shippingAddress?.fullName || 'Anonymous Farmer';
      const phone = o.shippingAddress?.phone || 'N/A';
      const city = o.shippingAddress?.city || 'N/A';
      const state = o.shippingAddress?.state || 'N/A';
      const farmerType = o.shippingAddress?.farmerType || 'Individual Grower';

      if (!map.has(email)) {
        map.set(email, {
          id: email,
          name,
          email: o.shippingAddress?.email || 'N/A',
          phone,
          city,
          state,
          farmerType,
          totalOrders: 1,
          totalSpent: o.total || 0,
          latestOrderDate: o.date
        });
      } else {
        const existing = map.get(email);
        existing.totalOrders += 1;
        existing.totalSpent += (o.total || 0);
        if (new Date(o.date) > new Date(existing.latestOrderDate)) {
          existing.latestOrderDate = o.date;
        }
      }
    });

    return Array.from(map.values());
  }, [orders]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !productSearch ||
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(productSearch.toLowerCase());

      const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;

      let matchesStock = true;
      if (stockStatusFilter === 'inStock') {
        matchesStock = p.inStock && p.stock > 15;
      } else if (stockStatusFilter === 'lowStock') {
        matchesStock = p.stock > 0 && p.stock <= 15;
      } else if (stockStatusFilter === 'outOfStock') {
        matchesStock = !p.inStock || p.stock === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, productSearch, selectedCategoryFilter, stockStatusFilter]);

  // Product Add / Edit Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      shortName: '',
      category: categoriesList[0]?.id || 'vegetable',
      price: '',
      originalPrice: '',
      stock: 50,
      germinationRate: '92% Certified',
      season: 'Kharif & Rabi',
      description: 'Certified high-germination seed variety suited for Indian soil conditions.',
      packSizesText: '10g packet: 160\n50g packet: 380'
    });
    setFormErrors({});
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p);
    const packText = (p.packageSizes || [])
      .map((ps) => `${ps.size}: ${ps.price}`)
      .join('\n') || `${p.name}: ${p.price}`;

    setProductForm({
      name: p.name || '',
      shortName: p.shortName || p.name || '',
      category: p.category || 'vegetable',
      price: String(p.price || ''),
      originalPrice: String(p.originalPrice || ''),
      stock: p.stock ?? 50,
      germinationRate: p.germinationRate || '90% Certified',
      season: p.season || 'All Season',
      description: p.description || '',
      packSizesText: packText
    });
    setFormErrors({});
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const errs = {};
    if (!productForm.name.trim()) errs.name = 'Seed variety name is required.';
    if (!productForm.price || Number(productForm.price) <= 0) errs.price = 'Valid positive base price is required.';
    if (productForm.stock === '' || Number(productForm.stock) < 0) errs.stock = 'Valid stock count is required.';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    // Parse package sizes from textarea
    const parsedSizes = [];
    productForm.packSizesText.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length === 2 && parts[0].trim() && !isNaN(Number(parts[1].trim()))) {
        parsedSizes.push({ size: parts[0].trim(), price: Number(parts[1].trim()) });
      }
    });

    if (parsedSizes.length === 0) {
      parsedSizes.push({ size: 'Standard 50g Pack', price: Number(productForm.price) });
    }

    const catObj = categoriesList.find((c) => c.id === productForm.category);

    if (editingProduct) {
      // Update existing
      const updated = products.map((item) => {
        if (item.id === editingProduct.id) {
          return {
            ...item,
            name: productForm.name.trim(),
            shortName: productForm.shortName.trim() || productForm.name.trim(),
            category: productForm.category,
            categoryName: catObj?.name || 'Vegetables',
            price: Number(productForm.price),
            originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : Math.round(Number(productForm.price) * 1.25),
            stock: Number(productForm.stock),
            inStock: Number(productForm.stock) > 0,
            germinationRate: productForm.germinationRate,
            season: productForm.season,
            description: productForm.description,
            packageSizes: parsedSizes
          };
        }
        return item;
      });
      saveProducts(updated);
      showToast(`Updated "${productForm.name}" successfully!`, 'success');
    } else {
      // Create new product
      const newId = `seed-${productForm.category.slice(0, 3)}-${Date.now().toString().slice(-4)}`;
      const newProd = {
        id: newId,
        slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: productForm.name.trim(),
        shortName: productForm.shortName.trim() || productForm.name.trim(),
        hindiName: 'नया संकर बीज',
        category: productForm.category,
        categoryName: catObj?.name || 'Vegetables',
        brand: 'BeejBhandar Elite Line',
        variety: 'Certified Hybrid F1',
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : Math.round(Number(productForm.price) * 1.25),
        discountPercent: 20,
        rating: 4.8,
        reviewCount: 1,
        isDemoRating: true,
        germinationRate: productForm.germinationRate,
        purity: '99.0%',
        season: productForm.season,
        stock: Number(productForm.stock),
        inStock: Number(productForm.stock) > 0,
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80',
        description: productForm.description,
        packageSizes: parsedSizes
      };
      saveProducts([newProd, ...products]);
      showToast(`Added new seed variety "${newProd.name}"!`, 'success');
    }

    setShowProductModal(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    const updated = products.filter((p) => p.id !== deletingProduct.id);
    saveProducts(updated);
    showToast(`Deleted "${deletingProduct.name}" from catalog.`, 'info');
    setDeletingProduct(null);
  };

  // Quick inline stock updates
  const handleSaveStock = (productId) => {
    const val = Number(tempStockValue);
    if (isNaN(val) || val < 0) {
      showToast('Please enter a valid stock number', 'error');
      return;
    }
    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          stock: val,
          inStock: val > 0
        };
      }
      return p;
    });
    saveProducts(updated);
    setEditingStockId(null);
    showToast('Depot stock updated successfully!', 'success');
  };

  // Order status changing
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status set to "${newStatus}"!`, 'success');
    if (inspectedOrder && inspectedOrder.orderId === orderId) {
      setInspectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Category creation
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast('Category name is required.', 'error');
      return;
    }
    const slug = categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      id: slug,
      name: categoryForm.name.trim(),
      hindiName: categoryForm.hindiName.trim() || 'संकर बीज',
      slug: slug,
      count: '0 Varieties',
      description: categoryForm.description.trim() || 'Certified seed collection for high agricultural productivity.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=600&q=80',
      badge: 'New Category'
    };
    saveCategories([...categoriesList, newCat]);
    setShowCategoryModal(false);
    setCategoryForm({ name: '', hindiName: '', description: '' });
    showToast(`Created category "${newCat.name}"!`, 'success');
  };

  return (
    <div className="admin-page section-py">
      <div className="container">
        {/* Demo Security & Architecture Disclaimer Banner */}
        <div className="admin-header-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldAlert size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Demonstration Administration Portal:</strong> This dashboard is a frontend simulation. No actual user authentication or server-side authorization is enforced. All updates affect only your local browser storage.
            </div>
          </div>
          <span className="badge badge-accent">Demo Access Mode</span>
        </div>

        {/* Dashboard Title & Top Bar */}
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: 'var(--space-xl)' }}>
          <div>
            <span className="section-subtitle">Store Operations & Backoffice</span>
            <h1 className="section-title">Seed Control & Commerce Center</h1>
            <p className="section-desc">
              Manage hybrid seed catalog, adjust depot inventory levels, inspect customer orders, and view sales performance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button
              variant="accent"
              size="md"
              icon={Plus}
              onClick={handleOpenAddProduct}
            >
              Add New Seed
            </Button>
          </div>
        </div>

        {/* Admin Dashboard Grid Layout (Sidebar + Content) */}
        <div className="admin-dashboard-container">
          {/* Responsive Sidebar Navigation */}
          <aside className="admin-sidebar">
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} />
              <span>Products</span>
              <span className="admin-nav-badge">{products.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <Layers size={18} />
              <span>Categories</span>
              <span className="admin-nav-badge">{categoriesList.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Boxes size={18} />
              <span>Inventory</span>
              {metrics.lowStockItems > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>
                  {metrics.lowStockItems} low
                </span>
              )}
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart size={18} />
              <span>Orders</span>
              <span className="admin-nav-badge">{orders.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              <Users size={18} />
              <span>Customers</span>
              <span className="admin-nav-badge">{customersList.length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveTab('sales')}
            >
              <TrendingUp size={18} />
              <span>Sales Summary</span>
            </button>
          </aside>

          {/* Main Content Pane */}
          <main className="admin-content-pane">
            
            {/* ============================================================ */}
            {/* 1. OVERVIEW DASHBOARD */}
            {/* ============================================================ */}
            {activeTab === 'overview' && (
              <div>
                {/* 4 Core Dynamic Metrics Cards */}
                <div className="admin-metrics-grid">
                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <Package size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{metrics.totalProducts}</div>
                      <div className="metric-label">Total Seed Products</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box" style={{ background: '#FEE2E2', color: 'var(--status-danger)' }}>
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{metrics.lowStockItems}</div>
                      <div className="metric-label">Low-Stock Varieties (≤15)</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <ShoppingCart size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{metrics.totalOrders}</div>
                      <div className="metric-label">Demo Orders Placed</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box" style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)' }}>
                      <IndianRupee size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{formatPrice(metrics.totalSales)}</div>
                      <div className="metric-label">Demo Sales Value</div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Snapshot */}
                <div className="surface-card" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                      Recent Demo Orders Pipeline
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                      View All Orders →
                    </Button>
                  </div>

                  {orders.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No demo orders recorded yet. Place an order from the checkout flow to see it reflected here.
                    </div>
                  ) : (
                    <div className="data-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((o) => (
                            <tr key={o.orderId}>
                              <td><strong>{o.orderId}</strong></td>
                              <td>{o.shippingAddress?.fullName || 'Customer'}</td>
                              <td>{formatDate(o.date)}</td>
                              <td><strong>{formatPrice(o.total)}</strong></td>
                              <td>
                                <span className={`badge ${o.status === 'Delivered' ? 'badge-success' : o.status === 'Shipped' ? 'badge-primary' : 'badge-accent'}`}>
                                  {o.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => setInspectedOrder(o)}
                                  style={{ color: 'var(--color-primary)', fontSize: '0.82rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                >
                                  <Eye size={14} /> View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Stock Attention Snapshot */}
                <div className="surface-card" style={{ padding: 'var(--space-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                      Inventory Requiring Attention (Low or Depleted)
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('inventory')}>
                      Manage Stock →
                    </Button>
                  </div>

                  {products.filter((p) => p.stock <= 15).length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--status-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={18} />
                      <span>All certified seed varieties have healthy depot reserves!</span>
                    </div>
                  ) : (
                    <div className="data-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Seed Variety</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.filter((p) => p.stock <= 15).slice(0, 5).map((p) => (
                            <tr key={p.id}>
                              <td><strong>{p.name}</strong></td>
                              <td>{p.categoryName || p.category}</td>
                              <td>{formatPrice(p.price)}</td>
                              <td>
                                <strong style={{ color: p.stock === 0 ? 'var(--status-danger)' : 'var(--color-terracotta)' }}>
                                  {p.stock} pkts
                                </strong>
                              </td>
                              <td>
                                <span className={`badge ${p.stock === 0 ? 'badge-danger' : 'badge-accent'}`}>
                                  {p.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 2. PRODUCT MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'products' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1, maxWidth: '640px' }}>
                    {/* Search */}
                    <div className="search-input-wrapper" style={{ flex: 1, minWidth: '220px' }}>
                      <Search size={16} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search seeds by name, ID or category..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="search-input"
                      />
                    </div>

                    {/* Category Filter */}
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="form-select"
                      style={{ width: 'auto', minWidth: '150px' }}
                    >
                      <option value="all">All Categories</option>
                      {categoriesList.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    {/* Stock status filter */}
                    <select
                      value={stockStatusFilter}
                      onChange={(e) => setStockStatusFilter(e.target.value)}
                      className="form-select"
                      style={{ width: 'auto', minWidth: '140px' }}
                    >
                      <option value="all">All Stock States</option>
                      <option value="inStock">In Stock (&gt;15)</option>
                      <option value="lowStock">Low Stock (1-15)</option>
                      <option value="outOfStock">Out of Stock (0)</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={Plus}
                    onClick={handleOpenAddProduct}
                  >
                    Add Product
                  </Button>
                </div>

                {/* Products Table */}
                <div className="data-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Seed Name & Details</th>
                        <th>Category</th>
                        <th>Base Price</th>
                        <th>Pack Sizes</th>
                        <th>Depot Stock</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                            No seed varieties match the selected filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => {
                          const isOutOfStock = p.stock === 0 || !p.inStock;
                          const isLowStock = p.stock > 0 && p.stock <= 15;

                          return (
                            <tr key={p.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    onError={handleImageError}
                                    style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                                  />
                                  <div>
                                    <strong style={{ color: 'var(--color-primary-dark)', display: 'block', fontSize: '0.9rem' }}>
                                      {p.name}
                                    </strong>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                      ID: {p.id} • {p.germinationRate}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td>{p.categoryName || p.category}</td>
                              <td><strong>{formatPrice(p.price)}</strong></td>
                              <td>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  {p.packageSizes?.length || 1} {p.packageSizes?.length === 1 ? 'size' : 'sizes'}
                                </span>
                              </td>
                              <td>{p.stock} pkts</td>
                              <td>
                                {isOutOfStock ? (
                                  <span className="badge badge-danger">Out of Stock</span>
                                ) : isLowStock ? (
                                  <span className="badge badge-accent">Low Stock</span>
                                ) : (
                                  <span className="badge badge-success">In Stock</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditProduct(p)}
                                    title="Edit Seed Variety"
                                    style={{ padding: '4px 6px', color: 'var(--color-primary)', background: 'var(--bg-sage-light)', borderRadius: 'var(--radius-xs)' }}
                                  >
                                    <Edit2 size={15} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDeletingProduct(p)}
                                    title="Delete Seed"
                                    style={{ padding: '4px 6px', color: 'var(--status-danger)', background: '#FEE2E2', borderRadius: 'var(--radius-xs)' }}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 3. CATEGORY MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'categories' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                      Botanical & Crop Categories
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Organize seed varieties by botanical classification and agricultural utility.
                    </p>
                  </div>
                  <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowCategoryModal(true)}>
                    New Category
                  </Button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {categoriesList.map((cat) => {
                    const countInCat = products.filter((p) => p.category === cat.id).length;

                    return (
                      <div key={cat.id} className="surface-card" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-dark)', margin: 0 }}>{cat.name}</h4>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontWeight: 600 }}>{cat.hindiName}</span>
                          </div>
                          <span className="badge badge-primary">{countInCat} Products</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem', lineHeight: '1.5' }}>
                          {cat.description}
                        </p>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Identifier Slug: <code>{cat.id}</code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 4. INVENTORY / STOCK MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'inventory' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                      Depot Reserve & Stock Counter
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Real-time packet quantities available in central climate-controlled seed warehouse.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="badge badge-success">
                      {products.filter((p) => p.stock > 15).length} In Stock
                    </span>
                    <span className="badge badge-accent">
                      {metrics.lowStockItems} Low Stock
                    </span>
                    <span className="badge badge-danger">
                      {metrics.outOfStockItems} Out of Stock
                    </span>
                  </div>
                </div>

                <div className="data-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Variety Name</th>
                        <th>Category</th>
                        <th>Current Packets</th>
                        <th>Depot Status</th>
                        <th>Quick Update Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const isEditingThis = editingStockId === p.id;
                        const isOutOfStock = p.stock === 0 || !p.inStock;
                        const isLowStock = p.stock > 0 && p.stock <= 15;

                        return (
                          <tr key={p.id}>
                            <td>
                              <strong style={{ color: 'var(--color-primary-dark)', display: 'block' }}>{p.name}</strong>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.id}</span>
                            </td>
                            <td>{p.categoryName || p.category}</td>
                            <td>
                              <strong style={{ fontSize: '1rem', color: isOutOfStock ? 'var(--status-danger)' : isLowStock ? 'var(--color-terracotta)' : 'var(--color-primary-dark)' }}>
                                {p.stock}
                              </strong> packets
                            </td>
                            <td>
                              {isOutOfStock ? (
                                <span className="badge badge-danger">Out of Stock</span>
                              ) : isLowStock ? (
                                <span className="badge badge-accent">Low Stock (&le;15)</span>
                              ) : (
                                <span className="badge badge-success">Optimal Reserve</span>
                              )}
                            </td>
                            <td>
                              {isEditingThis ? (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <input
                                    type="number"
                                    min={0}
                                    value={tempStockValue}
                                    onChange={(e) => setTempStockValue(e.target.value)}
                                    className="form-input"
                                    style={{ width: '80px', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                                    autoFocus
                                  />
                                  <Button variant="primary" size="sm" onClick={() => handleSaveStock(p.id)}>
                                    Save
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setEditingStockId(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingStockId(p.id);
                                      setTempStockValue(String(p.stock));
                                    }}
                                    style={{ fontSize: '0.8rem', color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 }}
                                  >
                                    Adjust Stock
                                  </button>
                                  <span style={{ color: 'var(--border-strong)' }}>|</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = products.map((item) =>
                                        item.id === p.id ? { ...item, stock: 50, inStock: true } : item
                                      );
                                      saveProducts(updated);
                                      showToast(`Replenished "${p.shortName || p.name}" to 50 packets!`, 'success');
                                    }}
                                    style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}
                                  >
                                    Restock +50
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* 5. CUSTOMER LIST BASED ON DEMO ORDERS */}
            {/* ============================================================ */}
            {activeTab === 'customers' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    Grower & Customer Directory
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Identified growers and farms aggregated from locally placed demo orders.
                  </p>
                </div>

                {customersList.length === 0 ? (
                  <div className="surface-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No customers registered yet. Once demo orders are placed, grower profiles will automatically populate here.
                  </div>
                ) : (
                  <div className="data-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Grower Name</th>
                          <th>Contact Details</th>
                          <th>Farm Location</th>
                          <th>Profile Type</th>
                          <th>Total Orders</th>
                          <th>Gross Value</th>
                          <th>Last Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customersList.map((c) => (
                          <tr key={c.id}>
                            <td>
                              <strong style={{ color: 'var(--color-primary-dark)', display: 'block' }}>{c.name}</strong>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.82rem' }}>{c.phone}</div>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.email}</span>
                            </td>
                            <td>{c.city}, {c.state}</td>
                            <td>
                              <span className="badge badge-primary">{c.farmerType}</span>
                            </td>
                            <td><strong>{c.totalOrders}</strong> demo order(s)</td>
                            <td><strong>{formatPrice(c.totalSpent)}</strong></td>
                            <td>{formatDate(c.latestOrderDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 6. ORDER MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                      Farmer Orders Processing Pipeline
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Change simulated statuses (e.g. Placed, Confirmed, Packed, Shipped, Delivered) to immediately sync with My Orders.
                    </p>
                  </div>
                  <span className="badge badge-accent">{orders.length} Total Orders</span>
                </div>

                {orders.length === 0 ? (
                  <div className="surface-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No orders placed yet. Simulate an order through the store's checkout page!
                  </div>
                ) : (
                  <div className="data-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Items Quantity</th>
                          <th>Total Amount</th>
                          <th>Payment Method</th>
                          <th>Update Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.orderId}>
                            <td><strong>{order.orderId}</strong></td>
                            <td>
                              <strong style={{ color: 'var(--text-primary)', display: 'block' }}>
                                {order.shippingAddress?.fullName}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {order.shippingAddress?.city}, {order.shippingAddress?.state}
                              </span>
                            </td>
                            <td>{formatDate(order.date)}</td>
                            <td>
                              {(order.items || []).reduce((s, i) => s + (i.quantity || 1), 0)} packets
                            </td>
                            <td><strong>{formatPrice(order.total)}</strong></td>
                            <td>
                              <span style={{ fontSize: '0.78rem' }}>{order.paymentMethod}</span>
                            </td>
                            <td>
                              {/* Status dropdown to change demo order status */}
                              <select
                                value={order.status || 'Placed'}
                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                className="form-select"
                                style={{ padding: '0.3rem 0.5rem', fontSize: '0.78rem', width: 'auto', fontWeight: 600 }}
                              >
                                <option value="Placed">Placed</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Packed">Packed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                            <td>
                              <Button
                                variant="outline"
                                size="sm"
                                icon={Eye}
                                onClick={() => setInspectedOrder(order)}
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 7. BASIC SALES SUMMARY */}
            {/* ============================================================ */}
            {activeTab === 'sales' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    Sales & Revenue Summary
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Dynamically calculated financial metrics from stored demo checkout transactions.
                  </p>
                </div>

                <div className="admin-metrics-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div className="metric-card">
                    <div className="metric-icon-box" style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)' }}>
                      <IndianRupee size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{formatPrice(metrics.totalSales)}</div>
                      <div className="metric-label">Gross Demo Revenue</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <ShoppingCart size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{metrics.totalOrders}</div>
                      <div className="metric-label">Fulfilled Transactions</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{formatPrice(metrics.avgOrderValue)}</div>
                      <div className="metric-label">Average Order Value (AOV)</div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-icon-box">
                      <Users size={24} />
                    </div>
                    <div>
                      <div className="metric-val">{customersList.length}</div>
                      <div className="metric-label">Unique Growers</div>
                    </div>
                  </div>
                </div>

                {/* Sales Breakdown by Category */}
                <div className="surface-card" style={{ padding: 'var(--space-xl)' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                    Calculated Sales Breakdown
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subtotal of Items</span>
                      <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginTop: '4px' }}>
                        {formatPrice(metrics.totalSubtotal)}
                      </strong>
                    </div>

                    <div style={{ padding: '1rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Collected Delivery Charges</span>
                      <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginTop: '4px' }}>
                        {formatPrice(metrics.totalSales - metrics.totalSubtotal)}
                      </strong>
                    </div>

                    <div style={{ padding: '1rem', background: 'var(--bg-sage-light)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', textTransform: 'uppercase' }}>Total Demo Ledger</span>
                      <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginTop: '4px' }}>
                        {formatPrice(metrics.totalSales)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ============================================================ */}
        {/* MODAL: ADD / EDIT PRODUCT */}
        {/* ============================================================ */}
        {showProductModal && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                  {editingProduct ? 'Edit Seed Product' : 'Register New Seed Variety'}
                </h3>
                <button type="button" onClick={() => setShowProductModal(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">
                    <span>Full Variety Name <span className="input-label-required">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className={`form-input ${formErrors.name ? 'has-error' : ''}`}
                    placeholder="e.g. Desi F1 Hybrid Tomato (Pusa Ruby Plus)"
                  />
                  {formErrors.name && <span className="input-error-msg"><AlertTriangle size={13} /> {formErrors.name}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="form-select"
                    >
                      {categoriesList.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">
                      <span>Base Price (₹) <span className="input-label-required">*</span></span>
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className={`form-input ${formErrors.price ? 'has-error' : ''}`}
                      placeholder="185"
                    />
                    {formErrors.price && <span className="input-error-msg"><AlertTriangle size={13} /> {formErrors.price}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="input-group">
                    <label className="input-label">
                      <span>Depot Stock <span className="input-label-required">*</span></span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className={`form-input ${formErrors.stock ? 'has-error' : ''}`}
                    />
                    {formErrors.stock && <span className="input-error-msg"><AlertTriangle size={13} /> {formErrors.stock}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Germination Rate</label>
                    <input
                      type="text"
                      value={productForm.germinationRate}
                      onChange={(e) => setProductForm({ ...productForm, germinationRate: e.target.value })}
                      className="form-input"
                      placeholder="e.g. 92% Certified"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span>Pack Sizes & Rates (Format: "Size: Price" per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.packSizesText}
                    onChange={(e) => setProductForm({ ...productForm, packSizesText: e.target.value })}
                    className="form-textarea"
                    placeholder="10g packet: 185&#10;50g packet: 420"
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Example: 10g packet: 185
                  </span>
                </div>

                <div className="input-group">
                  <label className="input-label">Agronomic Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="form-textarea"
                    placeholder="Provide details about yield, virus resistance, and soil adaptability."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Button variant="ghost" type="button" onClick={() => setShowProductModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {editingProduct ? 'Save Changes' : 'Register Product'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: DELETE CONFIRMATION DIALOG */}
        {/* ============================================================ */}
        {deletingProduct && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal-card" style={{ maxWidth: '440px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: '#FEE2E2', color: 'var(--status-danger)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Trash2 size={28} />
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                Delete Seed Variety?
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Are you sure you want to remove <strong>"{deletingProduct.name}"</strong>? This will remove the product from the catalog (existing demo order snapshots will remain preserved).
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                <Button variant="ghost" onClick={() => setDeletingProduct(null)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                  Yes, Delete Product
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: INSPECT ORDER DETAILS */}
        {/* ============================================================ */}
        {inspectedOrder && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    Order Inspection #{inspectedOrder.orderId}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Placed on {formatDate(inspectedOrder.date)}</span>
                </div>
                <button type="button" onClick={() => setInspectedOrder(null)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Status Update Control */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                  Current Status:
                </span>
                <select
                  value={inspectedOrder.status || 'Placed'}
                  onChange={(e) => handleStatusChange(inspectedOrder.orderId, e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', fontWeight: 600 }}
                >
                  <option value="Placed">Placed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Customer & Address */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Grower Dispatch Address
                </span>
                <strong style={{ color: 'var(--text-primary)' }}>{inspectedOrder.shippingAddress?.fullName}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {inspectedOrder.shippingAddress?.street}<br />
                  {inspectedOrder.shippingAddress?.city}, {inspectedOrder.shippingAddress?.state} - {inspectedOrder.shippingAddress?.pincode}<br />
                  Phone: {inspectedOrder.shippingAddress?.phone}
                </div>
              </div>

              {/* Items Snapshot */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Immutable Items Snapshot
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(inspectedOrder.items || []).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem' }}>
                      <div>
                        <strong>{item.shortName || item.name}</strong>
                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>{item.selectedSize} × {item.quantity}</span>
                      </div>
                      <strong>{formatPrice(item.selectedPrice * item.quantity)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Totals */}
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(inspectedOrder.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span>Delivery Charge</span>
                  <span>{inspectedOrder.shippingFee === 0 ? 'FREE' : formatPrice(inspectedOrder.shippingFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span>Total Amount</span>
                  <span>{formatPrice(inspectedOrder.total)}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <Button variant="secondary" size="sm" onClick={() => setInspectedOrder(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL: ADD CATEGORY */}
        {/* ============================================================ */}
        {showCategoryModal && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal-card" style={{ maxWidth: '480px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                  Create New Crop Category
                </h3>
                <button type="button" onClick={() => setShowCategoryModal(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Fodder & Forage Seeds"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Hindi Title</label>
                  <input
                    type="text"
                    value={categoryForm.hindiName}
                    onChange={(e) => setCategoryForm({ ...categoryForm, hindiName: e.target.value })}
                    className="form-input"
                    placeholder="e.g. चारा फसल बीज"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Description</label>
                  <textarea
                    rows={3}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="form-textarea"
                    placeholder="Brief description of the crop category."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Button variant="ghost" type="button" onClick={() => setShowCategoryModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Category
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
