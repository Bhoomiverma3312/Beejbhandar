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
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { categories } from '../data/categoriesData';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Demo profile state
  const [activeProfile, setActiveProfile] = useState('Bhoomi Verma (Farmer)');

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { showToast } = useToast();
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

  const handleSwitchProfile = (name) => {
    setActiveProfile(name);
    setProfileOpen(false);
    showToast(`Switched active demo persona to: ${name}`, 'info');
  };

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
              100% Certified Germination Guaranteed
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
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Shop Seeds
            </NavLink>

            {/* Categories Dropdown */}
            <div className="nav-dropdown-wrap" ref={categoriesRef}>
              <button
                type="button"
                className={`nav-link nav-dropdown-btn ${categoriesOpen ? 'open' : ''}`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                aria-expanded={categoriesOpen}
              >
                <span>Categories</span>
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
                    <Link to="/shop" className="dropdown-footer-link" onClick={() => setCategoriesOpen(false)}>
                      View All 7 Seed Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Growing Guide Link */}
            <a href="#growing-guide" onClick={handleGrowingGuideClick} className="nav-link">
              Growing Guide
            </a>

            {/* About Link */}
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
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

            {/* Cart Link */}
            <Link
              to="/cart"
              className="action-btn cart-btn-highlight"
              aria-label={`Cart with ${cartCount} items`}
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </Link>

            {/* Profile Dropdown Menu for Demo Account Options */}
            <div className="nav-dropdown-wrap" ref={profileRef}>
              <button
                type="button"
                className={`action-btn profile-action-btn ${profileOpen ? 'active' : ''}`}
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Demo Account Menu"
                title="Demo Account Options"
              >
                <User size={18} />
              </button>

              {profileOpen && (
                <div className="nav-dropdown-menu profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-avatar">
                      {activeProfile.charAt(0)}
                    </div>
                    <div>
                      <strong className="profile-user-name">{activeProfile}</strong>
                      <span className="profile-user-role">Demo Seed Buyer</span>
                    </div>
                  </div>

                  <div className="profile-dropdown-list">
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
                    <span className="profile-section-label">Switch Demo Persona:</span>
                    <button
                      type="button"
                      className={`profile-switch-btn ${activeProfile.includes('Bhoomi') ? 'selected' : ''}`}
                      onClick={() => handleSwitchProfile('Bhoomi Verma (Commercial Farmer)')}
                    >
                      <span>Bhoomi Verma (Farmer)</span>
                      {activeProfile.includes('Bhoomi') && <Check size={13} />}
                    </button>
                    <button
                      type="button"
                      className={`profile-switch-btn ${activeProfile.includes('Kisan') ? 'selected' : ''}`}
                      onClick={() => handleSwitchProfile('Kisan Organic Co-op (Grower)')}
                    >
                      <span>Kisan Organic Co-op</span>
                      {activeProfile.includes('Kisan') && <Check size={13} />}
                    </button>
                    <button
                      type="button"
                      className={`profile-switch-btn ${activeProfile.includes('Terrace') ? 'selected' : ''}`}
                      onClick={() => handleSwitchProfile('Sunita (Terrace Gardener)')}
                    >
                      <span>Sunita (Terrace Gardener)</span>
                      {activeProfile.includes('Terrace') && <Check size={13} />}
                    </button>
                  </div>
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
                  className="search-close-btn"
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
            <a href="#growing-guide" onClick={handleGrowingGuideClick} className="nav-link">
              Growing Guide
            </a>
            <NavLink to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              About Project (Bhoomi Verma)
            </NavLink>
            <NavLink to="/orders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              My Orders & Tracking
            </NavLink>
            <NavLink to="/wishlist" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Wishlist ({wishlistCount})
            </NavLink>
            <NavLink to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Shopping Cart ({cartCount})
            </NavLink>
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
