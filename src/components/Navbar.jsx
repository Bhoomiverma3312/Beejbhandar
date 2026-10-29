import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Sprout,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Search,
  ShieldCheck,
  User,
  ChevronDown,
  LayoutDashboard,
  Package,
  Check,
  Layers,
  LogOut,
  LogIn,
  ExternalLink,
  Languages
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useAuth, ROLE_ROUTES, ROLE_LABELS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categoriesData';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, login, logout } = useAuth();
  const { cartCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();
  const { lang, toggleLanguage, t, isHindi } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const categoriesRef = useRef(null);
  const profileRef = useRef(null);

  // Subtle scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCategoriesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const handleGrowingGuideClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('growing-guide');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#growing-guide');
      setTimeout(() => {
        const el = document.getElementById('growing-guide');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
    setMobileMenuOpen(false);
  };

  const handleSwitchPersona = async (email, roleLabel) => {
    const res = await login(email, 'demo123');
    setProfileOpen(false);
    if (res.success) {
      showToast(`Switched active account to: ${res.user.name} (${roleLabel})`, 'success');
      navigate(ROLE_ROUTES[res.user.role]);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    showToast('Signed out of demo session.', 'info');
    navigate('/');
  };

  const userDashboardUrl = user ? (ROLE_ROUTES[user.role] || '/farmer/dashboard') : '/login';

  return (
    <>
      {/* Slim Announcement Bar for Seasonal Offers */}
      <div className="top-announcement" role="region" aria-label="Seasonal Announcements">
        <div className="container announcement-content">
          <div className="announcement-left">
            <span className="announcement-pulse-dot" aria-hidden="true" />
            <span>
              🌱 <strong>Seasonal Sowing Offer:</strong> Use code <span className="promo-code-tag">KISAN10</span> for 10% off foundation seeds • Free Pan-India Delivery on orders over ₹499
            </span>
          </div>
          <div className="announcement-right hide-mobile">
            <span className="announcement-badge">
              <ShieldCheck size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Certified Foundation Lots
            </span>
          </div>
        </div>
      </div>

      {/* Main Professional Header */}
      <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-main">
          {/* Logo / Brand */}
          <Link to="/" className="brand-link" aria-label="BeejBhandar Home">
            <div className="brand-icon">
              <Sprout size={22} />
            </div>
            <div className="brand-title-wrap">
              <span className="brand-name">BeejBhandar</span>
              <span className="brand-tagline">Online Seed Shopping System</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('home', 'Home')}
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('shop', 'Shop Seeds')}
            </NavLink>

            {/* 85 Categories Link */}
            <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('categories', 'Categories')}
            </NavLink>

            {/* Categories Dropdown */}
            <div className="nav-dropdown-wrap" ref={categoriesRef}>
              <button
                type="button"
                className={`nav-link nav-dropdown-btn ${categoriesOpen ? 'open' : ''}`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                aria-expanded={categoriesOpen}
              >
                <span>Quick Groups</span>
                <ChevronDown size={14} className={`dropdown-chevron ${categoriesOpen ? 'rotated' : ''}`} />
              </button>

              {categoriesOpen && (
                <div className="nav-dropdown-menu categories-dropdown">
                  <div className="dropdown-grid">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug || cat.id}`}
                        className="dropdown-category-item"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <div className="dropdown-cat-icon-wrap">
                          <img src={cat.image} alt={cat.name} className="dropdown-cat-thumb" />
                        </div>
                        <div>
                          <strong className="dropdown-cat-name">{cat.name}</strong>
                          <span className="dropdown-cat-hindi">{cat.hindiName}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <Link to="/categories" className="dropdown-footer-link" onClick={() => setCategoriesOpen(false)}>
                      View All 85 Subcategories Directory →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Growing Guide Link */}
            <a href="#growing-guide" onClick={handleGrowingGuideClick} className="nav-link">
              Growing Guide
            </a>

            {/* Role Dashboards Quick Direct Link */}
            {user && (
              <NavLink
                to={userDashboardUrl}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ color: '#24563C', fontWeight: 600 }}
              >
                My {ROLE_LABELS[user.role]} Hub
              </NavLink>
            )}

            {/* About Link */}
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            {/* Language Switcher */}
            <button
              type="button"
              className="action-btn"
              onClick={() => {
                toggleLanguage();
                showToast(isHindi ? 'Switched to English' : 'हिंदी भाषा सक्षम की गई');
              }}
              aria-label="Toggle Language / भाषा बदलें"
              title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
              style={{ fontWeight: 700, fontSize: '0.8rem', padding: '0 6px', width: 'auto', minWidth: '38px', color: '#24563C' }}
            >
              <Languages size={15} style={{ marginRight: '3px' }} />
              <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              className={`action-btn ${searchOpen ? 'active' : ''}`}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search seeds"
              title="Search seeds"
            >
              <Search size={18} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="action-btn"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              className="action-btn cart-btn-highlight"
              onClick={openCartDrawer}
              aria-label={`Open shopping cart with ${cartCount} items`}
              title="Shopping Cart Drawer"
              style={{ cursor: 'pointer' }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </button>

            {/* Profile Dropdown Menu with Auth & Roles */}
            <div className="nav-dropdown-wrap" ref={profileRef}>
              <button
                type="button"
                className={`action-btn profile-action-btn ${profileOpen ? 'active' : ''}`}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Account Menu"
                title={user ? `${user.name} (${user.role})` : "Sign In to Account"}
              >
                <User size={18} />
              </button>

              {profileOpen && (
                <div className="nav-dropdown-menu profile-dropdown">
                  {user ? (
                    <>
                      <div className="profile-dropdown-header">
                        <div className="profile-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong className="profile-user-name" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {user.name}
                          </strong>
                          <span className="profile-user-role" style={{ color: '#24563C', fontWeight: 600 }}>
                            {ROLE_LABELS[user.role] || user.role} Portal
                          </span>
                        </div>
                      </div>

                      <div className="profile-dropdown-list">
                        <Link
                          to={userDashboardUrl}
                          className="profile-menu-item"
                          onClick={() => setProfileOpen(false)}
                          style={{ background: '#EEF4EB', color: '#24563C', fontWeight: 700 }}
                        >
                          <LayoutDashboard size={15} />
                          <span>Open {ROLE_LABELS[user.role]} Dashboard</span>
                        </Link>
                        <Link to="/orders" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                          <Package size={15} />
                          <span>My Seed Orders & Tracking</span>
                        </Link>
                        <Link to="/wishlist" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                          <Heart size={15} />
                          <span>My Saved Varieties ({wishlistCount})</span>
                        </Link>
                        <Link to="/admin" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                          <LayoutDashboard size={15} />
                          <span>Store Admin Inventory Portal</span>
                        </Link>
                      </div>

                      <div className="profile-dropdown-section">
                        <span className="profile-section-label">Switch Role Persona:</span>
                        <button
                          type="button"
                          className={`profile-switch-btn ${user.role === 'farmer' ? 'selected' : ''}`}
                          onClick={() => handleSwitchPersona('farmer@demo.com', 'Farmer')}
                        >
                          <span>🚜 Ramesh Kumar (Farmer)</span>
                          {user.role === 'farmer' && <Check size={13} />}
                        </button>
                        <button
                          type="button"
                          className={`profile-switch-btn ${user.role === 'coop' ? 'selected' : ''}`}
                          onClick={() => handleSwitchPersona('coop@demo.com', 'Cooperative')}
                        >
                          <span>🏢 Punjab Agri Co-op (Cooperative)</span>
                          {user.role === 'coop' && <Check size={13} />}
                        </button>
                        <button
                          type="button"
                          className={`profile-switch-btn ${user.role === 'gardener' ? 'selected' : ''}`}
                          onClick={() => handleSwitchPersona('gardener@demo.com', 'Gardener')}
                        >
                          <span>🪴 Priya Sharma (Gardener)</span>
                          {user.role === 'gardener' && <Check size={13} />}
                        </button>
                      </div>

                      <div style={{ padding: '0.6rem 0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <button
                          type="button"
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            background: '#FEE2E2',
                            color: '#991B1B',
                            border: '1px solid #FCA5A5',
                            borderRadius: '6px',
                            padding: '0.45rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px'
                          }}
                        >
                          <LogOut size={14} />
                          <span>Sign Out Session</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                      <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#56685D' }}>
                        Sign in to access Farmer, Co-op, or Gardener dashboards
                      </p>
                      <Link
                        to="/login"
                        className="btn btn-primary btn-sm"
                        style={{ display: 'block', width: '100%', marginBottom: '0.5rem', textDecoration: 'none' }}
                        onClick={() => setProfileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        style={{ fontSize: '0.78rem', color: '#24563C', fontWeight: 600, textDecoration: 'underline' }}
                        onClick={() => setProfileOpen(false)}
                      >
                        Create New Account
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className="action-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar Drawer */}
        {searchOpen && (
          <div className="header-search-bar-wrap">
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-expand-form">
                <Search size={18} className="search-expand-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search seeds by crop, variety or Hindi name (e.g., Tomato, Wheat, Berseem, Mustard)..."
                  className="search-expand-input"
                  autoFocus
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
                <button
                  type="button"
                  className="search-expand-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="container mobile-nav-drawer open">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search certified seeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
            </form>

            <NavLink to="/" end className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Shop Seeds
            </NavLink>
            <NavLink to="/categories" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              85 Seed Categories
            </NavLink>

            {user ? (
              <NavLink
                to={userDashboardUrl}
                className="nav-link"
                style={{ color: '#24563C', fontWeight: 700 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                My {ROLE_LABELS[user.role]} Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Sign In / Register
              </NavLink>
            )}

            <a href="#growing-guide" onClick={handleGrowingGuideClick} className="nav-link">
              Growing Guide
            </a>
            <NavLink to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              About Project
            </NavLink>
            <NavLink to="/orders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              My Orders & Tracking
            </NavLink>
            <NavLink to="/wishlist" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Wishlist ({wishlistCount})
            </NavLink>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                openCartDrawer();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0',
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit'
              }}
            >
              <span>Shopping Cart</span>
              <span className="badge badge-primary">{cartCount}</span>
            </button>
            <NavLink to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Admin Inventory Dashboard
            </NavLink>

            {/* Mobile Categories Quick List */}
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
                Quick Seed Categories
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug || cat.id}`}
                    className="badge badge-primary"
                    style={{ textDecoration: 'none', padding: '0.35rem 0.65rem' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
