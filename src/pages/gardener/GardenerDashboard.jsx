import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Flower2,
  Sprout,
  Sun,
  Droplets,
  Heart,
  ShoppingBag,
  Sparkles,
  BookOpen,
  ArrowRight,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { SeedProductCard } from '../../components/SeedProductCard';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { initialProducts } from '../../data/seedsData';
import { getCategoriesByRole } from '../../data/seedCategories';

// Beginner friendly collections
const GARDEN_COLLECTIONS = [
  { id: 'kitchen', icon: '🥗', title: 'Kitchen Salad Garden', desc: 'Cherry tomatoes, crisp lettuce, coriander & baby spinach for fresh daily harvesting.' },
  { id: 'balcony', icon: '🪴', title: 'Balcony Container Mix', desc: 'Compact bush varieties and herbs that thrive in 8–12 inch earthen pots.' },
  { id: 'flowers', icon: '🌸', title: 'Pollinator Flower Blooms', desc: 'Marigold, zinnia, sunflower & cosmos that attract beneficial bees and butterflies.' },
  { id: 'microgreens', icon: '🌱', title: '7-Day Microgreens Tray', desc: 'Wheatgrass, radish, mustard & fenugreek microgreens for superfood nutrition on your windowsill.' },
  { id: 'herbs', icon: '🌿', title: 'Culinary Herbal Oasis', desc: 'Sweet basil, Italian oregano, thyme, mint and chamomile for herbal tea and cooking.' }
];

// Beginner friendly sowing guide
const BEGINNER_STEPS = [
  {
    step: 1,
    title: 'Seed Soil Potting Mix',
    icon: '🪴',
    text: 'Blend 50% coco-peat, 30% vermicompost, and 20% garden soil. Ensure the mix is loose, airy, and drains freely.'
  },
  {
    step: 2,
    title: 'Sowing Depth Rule',
    icon: '🌱',
    text: 'Sow seeds at a depth approximately twice their diameter (around 0.5 cm for fine seeds). Do not bury too deep!'
  },
  {
    step: 3,
    title: 'Gentle Mist Watering',
    icon: '💧',
    text: 'Use a fine mist sprayer. Keep topsoil evenly damp like a wrung-out sponge, but never soaked or waterlogged.'
  },
  {
    step: 4,
    title: 'Sunlight Acclimatization',
    icon: '☀️',
    text: 'Keep in bright filtered light until germination (4–8 days), then gradually introduce to 4–6 hours of morning sun.'
  }
];

export const GardenerDashboard = () => {
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();
  const [selectedSpace, setSelectedSpace] = useState('balcony');

  // Gardener curated products
  const gardenProducts = useMemo(() => {
    return initialProducts.filter(p => !p.roles || p.roles.includes('gardener')).slice(0, 12);
  }, []);

  return (
    <DashboardLayout activeRole="gardener">
      {/* 1. Gardener Hero */}
      <section 
        className="dashboard-hero"
        style={{
          background: 'linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)'
        }}
      >
        <span className="hero-tag" style={{ background: 'rgba(255,255,255,0.2)', color: '#D8F3DC' }}>
          <Sparkles size={15} /> Urban & Terrace Garden Sanctuary
        </span>
        <h1>Happy Gardening, {user?.name || 'Green Thumb'}!</h1>
        <p>
          Your friendly rooftop, balcony, and windowsill garden headquarters. Discover small handy seed packs,
          fragrant blossoms, aromatic culinary herbs, vibrant microgreens, and step-by-step organic growing wisdom.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="hero-btn hero-btn-primary" style={{ background: '#E0A955', color: '#173D2B' }}>
            <ShoppingBag size={17} />
            <span>Explore Small Garden Packs</span>
          </Link>
          <a href="#gardening-guide" className="hero-btn hero-btn-secondary">
            <BookOpen size={17} />
            <span>Beginner's Sowing Guide</span>
          </a>
          <a href="#collections" className="hero-btn hero-btn-secondary">
            <Flower2 size={17} />
            <span>Theme Collections</span>
          </a>
        </div>
      </section>

      {/* 2. Personal Garden Space Selector */}
      <section className="dashboard-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong style={{ fontSize: '0.95rem', color: '#173D2B', display: 'block' }}>
              Select Your Growing Setup:
            </strong>
            <span style={{ fontSize: '0.78rem', color: '#56685D' }}>
              Tailors variety recommendations to your sunlight and pot volume
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'balcony', label: '🪴 Balcony Pots (4–6h sun)' },
              { id: 'terrace', label: '☀️ Terrace Garden (Full day sun)' },
              { id: 'kitchen', label: '🪟 Kitchen Windowsill (Indirect)' },
              { id: 'backyard', label: '🏡 Backyard Soil Beds' }
            ].map(space => (
              <button
                key={space.id}
                type="button"
                onClick={() => setSelectedSpace(space.id)}
                style={{
                  background: selectedSpace === space.id ? '#2D6A4F' : '#FFFFFF',
                  color: selectedSpace === space.id ? '#FFFFFF' : '#19271E',
                  border: `1px solid ${selectedSpace === space.id ? '#2D6A4F' : '#CBD2C1'}`,
                  borderRadius: '20px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {space.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Theme Seed Collections */}
      <section className="dashboard-panel" id="collections">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Home Garden Curated Collections</h2>
            <p className="section-desc">Hand-picked seed kits designed for urban spaces, kitchen salads & colorful blooms</p>
          </div>
          <Link to="/categories" className="view-all-link">
            <span>Explore All Categories</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="gardener-collection-cards">
          {GARDEN_COLLECTIONS.map((col) => (
            <div key={col.id} className="garden-collection-box">
              <span className="garden-icon-large">{col.icon}</span>
              <h3 className="garden-box-title">{col.title}</h3>
              <p className="garden-box-desc">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Small Pack Seeds for Home Growers */}
      <section className="dashboard-panel">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Fresh Small-Pack Seed Varieties</h2>
            <p className="section-desc">Priced affordably from ₹95 with high germination rates for home hobbyists</p>
          </div>
          <Link to="/shop" className="view-all-link">
            <span>Shop All Packs</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="dashboard-products-grid">
          {gardenProducts.map((prod) => (
            <SeedProductCard key={prod.id} product={prod} showBulkHint={false} />
          ))}
        </div>
      </section>

      {/* 5. Beginner's Sowing & Plant Care Masterclass */}
      <section className="dashboard-panel" id="gardening-guide">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Beginner's 4-Step Sowing Masterclass</h2>
            <p className="section-desc">Follow these fundamentals for healthy sprouts and abundant home harvests</p>
          </div>
        </div>

        <div className="guide-steps-grid">
          {BEGINNER_STEPS.map((step) => (
            <div key={step.step} className="guide-step-card">
              <div className="guide-step-number" style={{ background: '#2D6A4F' }}>
                {step.step}
              </div>
              <h4 className="guide-step-title">{step.title}</h4>
              <p className="guide-step-text">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Sunlight & Watering Cheat Sheet */}
        <div style={{ marginTop: '1.5rem', background: '#F1EFE6', borderRadius: '12px', padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Sun size={24} style={{ color: '#C68A36', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#173D2B' }}>Sunlight Needs:</strong>
              <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#56685D' }}>
                Fruiting vegetables (Tomatoes, Chillies) require 6h direct sunlight. Leafy greens (Spinach, Mint) flourish in 3–4h morning sun.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Droplets size={24} style={{ color: '#0284C7', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.88rem', color: '#173D2B' }}>Finger-Dip Watering Test:</strong>
              <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#56685D' }}>
                Insert your index finger 1 inch into the pot soil. If it feels dry, water gently. If moist, wait another day to prevent root fungus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default GardenerDashboard;
