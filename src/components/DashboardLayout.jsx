import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  Calendar,
  FileText,
  Users,
  Layers,
  BookOpen,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth, ROLE_LABELS, ROLE_ROUTES } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const DashboardLayout = ({ children, activeRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('You have been logged out safely.', 'info');
    navigate('/login');
  };

  // Role specific menu configuration
  const roleNavItems = {
    farmer: [
      { label: 'Overview', to: '/farmer/dashboard', icon: LayoutDashboard },
      { label: 'Crop Sowing Guide', to: '/farmer/dashboard#calendar', icon: Calendar },
      { label: 'Bulk Seed Orders', to: '/farmer/dashboard#bulk-catalog', icon: Package },
      { label: 'Order History', to: '/orders', icon: FileText, badge: null },
      { label: 'Saved Varieties', to: '/wishlist', icon: Heart, badge: wishlistCount || null },
    ],
    coop: [
      { label: 'Cooperative Hub', to: '/coop/dashboard', icon: LayoutDashboard },
      { label: 'Bulk Pricing Catalog', to: '/coop/dashboard#bulk-catalog', icon: Package },
      { label: 'Request Quotation (RFQ)', to: '/coop/dashboard#rfq-form', icon: FileText },
      { label: 'Member Societies', to: '/coop/dashboard#members', icon: Users },
      { label: 'Invoices & Reports', to: '/coop/dashboard#invoices', icon: Layers },
    ],
    gardener: [
      { label: 'Garden Sanctuary', to: '/gardener/dashboard', icon: LayoutDashboard },
      { label: 'Garden Collections', to: '/gardener/dashboard#collections', icon: Sparkles },
      { label: 'Beginner Sowing Guide', to: '/gardener/dashboard#gardening-guide', icon: BookOpen },
      { label: 'My Saved Varieties', to: '/wishlist', icon: Heart, badge: wishlistCount || null },
      { label: 'Order Tracking', to: '/orders', icon: Package },
    ]
  };

  const currentNav = roleNavItems[activeRole || user?.role || 'farmer'] || roleNavItems.farmer;
  const roleBadgeClass = `role-badge-${user?.role || activeRole || 'farmer'}`;

  return (
    <div className="dashboard-shell">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 90
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <Sprout size={22} />
            </div>
            <div>
              <span className="sidebar-brand-title">BeejBhandar</span>
              <span className="sidebar-brand-sub">Agricultural Portal</span>
            </div>
          </Link>
          <button 
            type="button" 
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="sidebar-user-card">
          <div className="sidebar-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name" title={user?.name || 'Demo User'}>
              {user?.name || 'Demo User'}
            </div>
            <span className={`sidebar-role-badge ${roleBadgeClass}`}>
              {ROLE_LABELS[user?.role || activeRole] || 'User'}
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav-label">Dashboard Views</span>
          {currentNav.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge ? <span className="sidebar-nav-badge">{item.badge}</span> : null}
              </NavLink>
            );
          })}

          <span className="sidebar-nav-label">Marketplace & Catalog</span>
          <Link to="/categories" className="sidebar-nav-item" onClick={() => setSidebarOpen(false)}>
            <Layers size={17} />
            <span>85 Seed Categories</span>
          </Link>
          <Link to="/shop" className="sidebar-nav-item" onClick={() => setSidebarOpen(false)}>
            <ShoppingBag size={17} />
            <span>Shop All Seeds</span>
          </Link>
          <Link to="/" className="sidebar-nav-item" onClick={() => setSidebarOpen(false)}>
            <ExternalLink size={17} />
            <span>Storefront Home</span>
          </Link>

          <span className="sidebar-nav-label">Demo Role Switcher</span>
          <Link 
            to="/farmer/dashboard" 
            className={`sidebar-nav-item ${user?.role === 'farmer' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span>🚜 Farmer View</span>
          </Link>
          <Link 
            to="/coop/dashboard" 
            className={`sidebar-nav-item ${user?.role === 'coop' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span>🏢 Co-op View</span>
          </Link>
          <Link 
            to="/gardener/dashboard" 
            className={`sidebar-nav-item ${user?.role === 'gardener' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span>🪴 Gardener View</span>
          </Link>
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="sidebar-footer">
          <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={20} />
            </button>
            <div className="topbar-greeting">
              <h2>Welcome, {user?.name || 'Agri Member'}</h2>
              <p>Active Portal: <strong>{ROLE_LABELS[user?.role || activeRole]} Hub</strong> • {user?.location || 'India'}</p>
            </div>
          </div>

          <div className="topbar-right">
            <Link to="/categories" className="topbar-action-btn hide-on-mobile">
              <Layers size={15} />
              <span>85 Categories</span>
            </Link>
            <Link to="/shop" className="topbar-action-btn primary">
              <ShoppingBag size={15} />
              <span>Browse Seeds</span>
            </Link>
            <button
              type="button"
              onClick={openCartDrawer}
              className="topbar-action-btn"
              title="View Cart Drawer"
              style={{ cursor: 'pointer', background: 'var(--bg-surface-alt)' }}
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && <span style={{ background: '#24563C', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>{cartCount}</span>}
            </button>
          </div>
        </header>

        {/* Dynamic Children Content */}
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
