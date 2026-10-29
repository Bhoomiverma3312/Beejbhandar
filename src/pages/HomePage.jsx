import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Sprout,
  Truck,
  Headphones,
  Award,
  Sparkles,
  ChevronRight,
  Star,
  BookOpen,
  Thermometer,
  Tag
} from 'lucide-react';
import {
  initialProducts,
  categories,
  trustHighlights,
  qualityAndStorageInfo,
  growingTips,
  testimonials
} from '../data/seedsData';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { Button } from '../components/Button';
import { SeedFinder } from '../components/SeedFinder';
import { SeedComparison } from '../components/SeedComparison';

export const HomePage = () => {
  // Popular this season products
  const popularSeasonProducts = initialProducts.filter((p) => p.isBestseller || p.isFeatured).slice(0, 8);

  // Active step in growing guide interactive display
  const [activeTipStep, setActiveTipStep] = useState(0);

  const handleScrollToGuide = (e) => {
    e.preventDefault();
    const el = document.getElementById('growing-guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section" aria-label="Hero Banner">
        <div className="container hero-grid">
          <div className="hero-content hero-entrance-fade">
            <div className="hero-badge-pill">
              <Sprout size={14} className="hero-badge-icon" />
              <span>Certified Indian Agricultural Genetics</span>
            </div>

            <h1 className="hero-title">
              Good Things Grow From Great Seeds.
            </h1>

            <p className="hero-description">
              Discover quality seeds for your farm, garden and every growing season. Verified laboratory germination, true-to-type physical purity, and direct foundation varieties for Indian growers.
            </p>

            <div className="hero-actions">
              <Link to="/shop">
                <Button variant="accent" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore Seeds
                </Button>
              </Link>
              <a href="#growing-guide" onClick={handleScrollToGuide}>
                <Button variant="secondary" size="lg" icon={BookOpen}>
                  Explore Growing Guide
                </Button>
              </a>
            </div>

            {/* Quick Hero Statistics */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">90%+</span>
                <span className="stat-label">Lab Tested Germination</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Physical Purity Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Crop Categories</span>
              </div>
            </div>
          </div>

          <div className="hero-media-wrap hero-entrance-fade-delayed">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
                alt="Lush green healthy Indian agricultural farm showing vigorous crop growth from certified seeds"
                loading="eager"
              />
            </div>

            {/* Floating Trust Badge Card */}
            <div className="hero-floating-card">
              <div className="floating-icon">
                <Award size={22} />
              </div>
              <div>
                <div className="floating-title">Govt. Notified Genetics</div>
                <div className="floating-sub">ICAR & IARI Foundation Lines</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar (Quality Assurances) */}
      <section className="trust-bar-section" aria-label="Quality Assurances">
        <div className="container trust-grid">
          {trustHighlights.map((item) => {
            const IconComponent =
              item.icon === 'ShieldCheck'
                ? ShieldCheck
                : item.icon === 'Sprout'
                ? Sprout
                : item.icon === 'Truck'
                ? Truck
                : Headphones;

            return (
              <div key={item.id} className="trust-item">
                <div className="trust-icon-box">
                  <IconComponent size={20} />
                </div>
                <div>
                  <h3 className="trust-title">{item.title}</h3>
                  <p className="trust-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Categories (All 7 Image-Led Cards) */}
      <section className="section-py" aria-label="Seed Categories">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-subtitle">Catalog Categories</span>
              <h2 className="section-title">Explore by Seed Classification</h2>
              <p className="section-desc">
                High-yield hybrid, research-grade, and indigenous heritage seeds across all 7 essential agricultural categories.
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" size="sm" icon={ChevronRight} iconPosition="right">
                View Full Catalog
              </Button>
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products: Popular This Season */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-surface-alt)' }} aria-label="Popular This Season">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-subtitle">Trending Sowing Selections</span>
              <h2 className="section-title">Popular This Season</h2>
              <p className="section-desc">
                Field-tested foundation varieties with high germination and proven disease tolerance in Indian agro-climatic conditions.
              </p>
            </div>
            <Link to="/shop?sort=bestseller">
              <Button variant="outline" size="sm" icon={ChevronRight} iconPosition="right">
                View All Bestsellers
              </Button>
            </Link>
          </div>

          <div className="products-grid">
            {popularSeasonProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Smart Seed Finder Wizard */}
      <SeedFinder />

      {/* 6. Seed Comparison Tool */}
      <SeedComparison />

      {/* 7. Seasonal Collection Banner */}
      <section className="section-py" aria-label="Seasonal Collection Banner">
        <div className="container">
          <div className="seasonal-banner-card">
            <div className="seasonal-banner-grid">
              <div className="seasonal-banner-content">
                <span className="seasonal-badge">
                  <Tag size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  Kharif & Rabi Transition Sowing
                </span>
                <h2 className="seasonal-title">
                  Prepare Your Fields for the Upcoming Growing Season
                </h2>
                <p className="seasonal-desc">
                  Lock in your foundation seed stock now. Get 10% instant discount across vegetable, grain and fodder varieties with code <span className="seasonal-coupon-code">KISAN10</span>. Moisture-barrier foil sealed for guaranteed vigor.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/shop?sort=bestseller">
                    <Button variant="accent" size="lg" icon={ArrowRight} iconPosition="right">
                      Shop Seasonal Varieties
                    </Button>
                  </Link>
                  <Link to="/shop?category=vegetable">
                    <Button variant="secondary" size="lg">
                      Vegetable Seeds
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="seasonal-banner-media hide-mobile">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80"
                  alt="Fresh vibrant agricultural harvest"
                  className="seasonal-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Shop With Us Section */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-surface)' }} aria-label="Why Shop With Us">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-2xl)' }}>
            <span className="section-subtitle">Our Promise to Growers</span>
            <h2 className="section-title">Why Shop Seeds with BeejBhandar?</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              We eliminate counterfeit seeds and substandard germination by procuring exclusively from government-notified seed producers and accredited breeders.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h3 className="why-title">Laboratory Certified 90%+ Germination</h3>
              <p className="why-text">
                Every seed lot undergoes rigorous sand-bench and towel tests in accredited seed laboratories. If germination falls short, we provide a 100% free lot replacement.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <Sprout size={28} />
              </div>
              <h3 className="why-title">100% True-to-Type Pure Genetics</h3>
              <p className="why-text">
                Physical purity of 99%+ ensures uniform stand establishment, synchronized flowering, and zero rogue weeds or foreign species in your farm or garden.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <Truck size={28} />
              </div>
              <h3 className="why-title">Moisture-Proof Pan-India Dispatch</h3>
              <p className="why-text">
                Sealed in climate-resistant 5-layer aluminum foil barrier pouches that block ambient humidity and maintain embryonic vitality during courier transit.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <Headphones size={28} />
              </div>
              <h3 className="why-title">Scientific Agronomy Guidance</h3>
              <p className="why-text">
                Clear agronomic advisories on every packet: spacing, seed treatment, irrigation intervals, and expected yield potential for diverse Indian agro-climates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Quality and Storage Information */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-primary)' }} aria-label="Quality and Storage Information">
        <div className="container">
          <div className="surface-card quality-storage-box">
            <div className="quality-storage-header">
              <div>
                <span className="section-subtitle">Scientific Preservation</span>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                  Seed Quality, Vigor & Storage Standards
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.95rem' }}>
                  Seed is a living biological embryo. Here is how BeejBhandar guarantees physical vigor from warehouse depot to your sowing furrow.
                </p>
              </div>
              <div className="storage-badge-pill hide-mobile">
                <Thermometer size={16} />
                <span>Depot Stored at 16°C & &lt;45% RH</span>
              </div>
            </div>

            <div className="storage-cards-grid">
              {qualityAndStorageInfo.map((info) => (
                <div key={info.id} className="storage-card">
                  <div className="storage-tag">{info.tag}</div>
                  <h3 className="storage-card-title">{info.title}</h3>
                  <p className="storage-card-desc">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Simple Seed-Growing Tips Section */}
      <section className="section-py" id="growing-guide" aria-label="Simple Seed Growing Tips">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center', maxWidth: '660px', margin: '0 auto var(--space-2xl)' }}>
            <span className="section-subtitle">Agronomist Knowledge Base</span>
            <h2 className="section-title">Simple Seed-Growing Tips for Maximum Yield</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Follow these foundational principles to ensure vigorous germination, strong root establishment, and abundant harvests.
            </p>
          </div>

          <div className="growing-guide-layout">
            {/* Step navigation tabs */}
            <div className="guide-steps-list">
              {growingTips.map((tip, index) => (
                <button
                  key={tip.step}
                  type="button"
                  className={`guide-step-btn ${activeTipStep === index ? 'active' : ''}`}
                  onClick={() => setActiveTipStep(index)}
                >
                  <span className="step-num">{tip.step}</span>
                  <div className="step-text-wrap">
                    <strong className="step-title">{tip.title}</strong>
                    <span className="step-hint">{index === 0 ? 'Foundation' : index === 1 ? 'Precision' : index === 2 ? 'Hydration' : 'Growth'}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Step detail card */}
            <div className="guide-detail-card surface-card">
              <div className="guide-step-badge">
                Step {growingTips[activeTipStep].step} of 04
              </div>
              <h3 className="guide-active-title">
                {growingTips[activeTipStep].title}
              </h3>
              <p className="guide-active-summary">
                {growingTips[activeTipStep].summary}
              </p>

              <div className="guide-pro-tip-box">
                <div className="pro-tip-header">
                  <Sparkles size={16} color="var(--color-accent)" />
                  <strong>Scientific Field Tip:</strong>
                </div>
                <p className="pro-tip-text">
                  {growingTips[activeTipStep].keyTip}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/shop">
                  <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                    Find Seeds for this Step
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="ghost" size="sm">
                    Read Full Advisory Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Customer Review Cards (Labelled Sample / Demo Content) */}
      <section className="section-py" style={{ backgroundColor: 'var(--bg-surface)' }} aria-label="Customer Reviews">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-2xl)' }}>
            <span className="section-subtitle">Real Grower Feedback</span>
            <h2 className="section-title">Tested in Fields & Gardens Across India</h2>
            <div className="demo-notice-pill">
              <span>Sample / Demo Grower Reviews</span>
            </div>
            <p className="section-desc" style={{ margin: '0.5rem auto 0' }}>
              Simulated agricultural testimonials based on real harvest metrics and seed performance data.
            </p>
          </div>

          <div className="reviews-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="review-card surface-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="#C68A36" color="#C68A36" />
                    ))}
                  </div>
                  <span className="demo-tag-label">Sample Data</span>
                </div>

                <p className="review-comment">
                  "{t.comment}"
                </p>

                <div className="review-author-wrap">
                  <strong className="review-author-name">{t.farmerName}</strong>
                  <span className="review-author-location">{t.location} • {t.crop}</span>
                  <span className="review-badge-sub">{t.badge || 'Verified Seed Cultivator'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pre-footer Call to Action */}
      <section className="section-py" style={{ background: 'linear-gradient(135deg, #173D2B 0%, #24563C 100%)', color: '#FFFFFF' }} aria-label="Call to Action">
        <div className="container text-center" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Online Seed Shopping System • Bhoomi Verma
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.25rem', margin: '0.75rem 0 1rem' }}>
            Ready to Sow for an Abundant Harvest?
          </h2>
          <p style={{ color: '#D3E0D8', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Explore certified vegetable, grain, flower, pulse, oilseed, and fodder varieties. Order with guaranteed 90%+ germination and express door delivery.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <Button variant="accent" size="lg" icon={ArrowRight} iconPosition="right">
                Explore All 7 Seed Categories
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="secondary" size="lg">
                Track Existing Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
