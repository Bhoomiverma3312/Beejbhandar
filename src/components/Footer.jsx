import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Truck, Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        {/* Brand & Project Info */}
        <div className="footer-brand">
          <div className="brand-link" style={{ cursor: 'default' }}>
            <div className="brand-icon" style={{ backgroundColor: '#24563C', color: '#DDE8D7' }}>
              <Sprout size={22} />
            </div>
            <div className="brand-title-wrap">
              <span className="footer-brand-title">BeejBhandar</span>
              <span className="footer-brand-sub">Online Seed Shopping System</span>
            </div>
          </div>
          <p className="footer-desc">
            A premium Indian agricultural seed platform engineered with certified genetic purity, high germination assurance, and scientific cultivation advisories for commercial farmers and passionate garden growers.
          </p>
          <div className="footer-badge-pill">
            <ShieldCheck size={14} />
            <span>Govt. Notified & Certified Seed Stocks</span>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Seed Categories</h4>
          <ul className="footer-links">
            <li><Link to="/shop?category=vegetable">Vegetable Seeds</Link></li>
            <li><Link to="/shop?category=crops">Field Crops & Grains</Link></li>
            <li><Link to="/shop?category=fruit">Fruit Seeds</Link></li>
            <li><Link to="/shop?category=flower">Flower & Pollinator</Link></li>
            <li><Link to="/shop?category=herbs">Herbs & Spices</Link></li>
            <li><Link to="/shop?category=organic">Desi & Heirloom Varieties</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/shop">Complete Catalog</Link></li>
            <li><Link to="/wishlist">Saved Wishlist</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/orders">Order Tracking</Link></li>
            <li><Link to="/about">About Developer & Project</Link></li>
            <li><Link to="/admin">Admin Inventory Portal</Link></li>
          </ul>
        </div>

        {/* Quality & Trust */}
        <div className="footer-col">
          <h4 className="footer-heading">Kisan Seed Assurance</h4>
          <ul className="footer-links" style={{ gap: '0.8rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CAD5CE' }}>
              <ShieldCheck size={18} color="#DDE8D7" />
              <span>90%+ Laboratory Tested Germination</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CAD5CE' }}>
              <Truck size={18} color="#DDE8D7" />
              <span>Moisture-Barrier Aluminum Foil Pouching</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CAD5CE' }}>
              <Headphones size={18} color="#DDE8D7" />
              <span>Free Crop Agronomy Guidance</span>
            </li>
          </ul>
          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: '#A3B3A9', display: 'block' }}>Project Submitter:</span>
            <strong style={{ fontSize: '0.9rem', color: '#FFFFFF' }}>Bhoomi Verma</strong>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <div>
          © {new Date().getFullYear()} <strong>BeejBhandar</strong> — Online Seed Shopping System. Designed & Developed by <strong>Bhoomi Verma</strong>.
        </div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span>Frontend-Only React Application</span>
          <span>•</span>
          <span>Seed Act & Certification Standards Compliant</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
