import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Tractor,
  Sprout,
  Package,
  Calendar,
  Layers,
  Heart,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Droplets,
  Sun,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { SeedProductCard } from '../../components/SeedProductCard';
import { SeedCategoryCard } from '../../components/SeedCategoryCard';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import { useWishlist } from '../../context/WishlistContext';
import { seedCategories, getCategoriesByRole } from '../../data/seedCategories';
import { initialProducts } from '../../data/seedsData';

// Agricultural sowing calendar table data
const SOWING_CALENDAR = [
  { crop: 'Paddy / Basmati Rice', season: 'Kharif', sowingWindow: 'June 1 – July 15', soil: 'Heavy clay loam', harvest: '110–135 Days', yield: '24–28 Quintals/Acre' },
  { crop: 'Sharbati Durum Wheat', season: 'Rabi', sowingWindow: 'Oct 25 – Nov 20', soil: 'Loamy soil with good drainage', harvest: '120–130 Days', yield: '20–25 Quintals/Acre' },
  { crop: 'Desi Pusa Mustard', season: 'Rabi', sowingWindow: 'Oct 1 – Oct 25', soil: 'Light to medium loam', harvest: '105–120 Days', yield: '8–11 Quintals/Acre' },
  { crop: 'Desi F1 Hybrid Tomato', season: 'All Season', sowingWindow: 'July & October', soil: 'Rich sandy loam (pH 6.2–7.0)', harvest: '70–80 Days', yield: '25–30 Tonnes/Acre' },
  { crop: 'Berseem Green Fodder', season: 'Rabi', sowingWindow: 'Oct 1 – Nov 15', soil: 'Clay loam with moisture', harvest: '50 Days (5 cuts)', yield: '35–40 Tonnes/Acre' },
  { crop: 'Desi Chickpea / Chana', season: 'Rabi', sowingWindow: 'Oct 15 – Nov 10', soil: 'Medium to heavy black soil', harvest: '100–115 Days', yield: '9–12 Quintals/Acre' }
];

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { orders = [] } = useOrders();
  const { wishlistCount } = useWishlist();

  const [selectedSeason, setSelectedSeason] = useState('All');
  const [activeCropTab, setActiveCropTab] = useState('all');

  // Filter categories relevant for farmers
  const farmerCategories = useMemo(() => {
    return getCategoriesByRole('farmer');
  }, []);

  // Filter products for farmers (field crops, vegetables, pulses, grains)
  const farmerProducts = useMemo(() => {
    return initialProducts.filter(p => !p.roles || p.roles.includes('farmer')).slice(0, 12);
  }, []);

  // Stats calculation
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  return (
    <DashboardLayout activeRole="farmer">
      {/* 1. Farmer Hero Welcome Section */}
      <section className="dashboard-hero">
        <span className="hero-tag">
          <Tractor size={15} /> Commercial Cultivator Portal
        </span>
        <h1>Ram Ram, {user?.name || 'Kisan Bhai'}!</h1>
        <p>
          Welcome to your high-yield agricultural control center. Sourcing certified foundation & certified seeds,
          bulk field quantities, sowing schedules, and ICAR-aligned cultivation tips for your land.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="hero-btn hero-btn-primary">
            <ShoppingBag size={17} />
            <span>Browse All Field Seeds</span>
          </Link>
          <a href="#calendar" className="hero-btn hero-btn-secondary">
            <Calendar size={17} />
            <span>View Sowing Calendar</span>
          </a>
          <Link to="/categories" className="hero-btn hero-btn-secondary">
            <Layers size={17} />
            <span>Explore 85 Categories</span>
          </Link>
        </div>
      </section>

      {/* 2. Key Farm Purchasing Metrics */}
      <section className="metrics-grid" aria-label="Farm Purchasing Overview">
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Total Seed Orders</span>
            <span className="metric-value">{totalOrdersCount}</span>
            <span className="metric-sub">Across all growing seasons</span>
          </div>
          <div className="metric-icon-wrap metric-green">
            <Package size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Active / In-Transit</span>
            <span className="metric-value">{pendingOrdersCount}</span>
            <span className="metric-sub">Dispatch tracked in real-time</span>
          </div>
          <div className="metric-icon-wrap metric-amber">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Saved Varieties</span>
            <span className="metric-value">{wishlistCount}</span>
            <span className="metric-sub">Shortlisted for next season</span>
          </div>
          <div className="metric-icon-wrap metric-purple">
            <Heart size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Bulk Discount Tier</span>
            <span className="metric-value">Level 2</span>
            <span className="metric-sub">Up to 25% off on 50kg+</span>
          </div>
          <div className="metric-icon-wrap metric-blue">
            <ShieldCheck size={24} />
          </div>
        </div>
      </section>

      {/* 3. Bulk Sowing & Seasonal Crop Categories */}
      <section className="dashboard-panel" id="bulk-catalog">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div>
              <h2 className="section-title">Field & Commercial Crop Categories</h2>
              <p className="section-desc">Grains, pulses, oilseeds, commercial vegetables, and fodder varieties</p>
            </div>
          </div>
          <Link to="/categories" className="view-all-link">
            <span>View All 85 Subcategories</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="categories-slider-grid">
          {farmerCategories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug || cat.id}`}
              className="cat-pill-card"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="cat-pill-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=400&q=75';
                }}
              />
              <div className="cat-pill-info">
                <strong className="cat-pill-name">{cat.name}</strong>
                <span className="cat-pill-hindi">{cat.hindiName}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. High-Yield Seeds with Pack Size Selection & Bulk Discounts */}
      <section className="dashboard-panel">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div>
              <h2 className="section-title">Recommended Bulk Seeds for Sowing</h2>
              <p className="section-desc">High germination certified lots with bulk bag pricing options</p>
            </div>
          </div>
          <Link to="/shop" className="view-all-link">
            <span>Browse Full Catalog</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="dashboard-products-grid">
          {farmerProducts.map((prod) => (
            <SeedProductCard key={prod.id} product={prod} showBulkHint={true} />
          ))}
        </div>
      </section>

      {/* 5. Agricultural Sowing Calendar & Agronomic Guide */}
      <section className="dashboard-panel" id="calendar">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div>
              <h2 className="section-title">Agricultural Sowing Calendar & Scientific Soil Guide</h2>
              <p className="section-desc">Recommended sowing periods, soil conditions, and expected yields for Indian farm zones</p>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="sowing-calendar-table">
            <thead>
              <tr>
                <th>Crop Variety</th>
                <th>Season</th>
                <th>Recommended Sowing Window</th>
                <th>Optimal Soil Condition</th>
                <th>Maturity</th>
                <th>Expected Yield</th>
              </tr>
            </thead>
            <tbody>
              {SOWING_CALENDAR.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.crop}</strong></td>
                  <td>
                    <span className={`season-chip season-${row.season.toLowerCase()}`}>
                      {row.season}
                    </span>
                  </td>
                  <td>{row.sowingWindow}</td>
                  <td>{row.soil}</td>
                  <td>{row.harvest}</td>
                  <td><strong style={{ color: '#24563C' }}>{row.yield}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Farmer Knowledge & Crop-Care Tips */}
      <section className="dashboard-panel">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <div>
              <h2 className="section-title">Certified Agronomy Practices (Kisan Gyan)</h2>
              <p className="section-desc">Proven seed treatment and soil preparation guidelines</p>
            </div>
          </div>
        </div>

        <div className="guide-steps-grid">
          <div className="guide-step-card">
            <div className="guide-step-number">1</div>
            <h4 className="guide-step-title">Beej Sanskar (Seed Treatment)</h4>
            <p className="guide-step-text">
              Treat seeds with Trichoderma viride (4g/kg) or Azotobacter bio-fertilizer before sowing to safeguard against root rot and damping-off.
            </p>
          </div>

          <div className="guide-step-card">
            <div className="guide-step-number">2</div>
            <h4 className="guide-step-title">Soil Tilth & Organic Manure</h4>
            <p className="guide-step-text">
              Apply 8–10 tonnes of well-rotted FYM (Farmyard Manure) per acre during final ploughing for optimum moisture retention.
            </p>
          </div>

          <div className="guide-step-card">
            <div className="guide-step-number">3</div>
            <h4 className="guide-step-title">Depth & Spacing Discipline</h4>
            <p className="guide-step-text">
              Avoid deep sowing beyond 3–4 cm for wheat and mustard. Ensure proper row spacing for sun penetration and weed aeriation.
            </p>
          </div>

          <div className="guide-step-card">
            <div className="guide-step-number">4</div>
            <h4 className="guide-step-title">Critical Irrigation Stages</h4>
            <p className="guide-step-text">
              Crown root initiation (CRI) for wheat and pre-flowering for pulses are critical stages where water stress directly cuts yield by 30%.
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
