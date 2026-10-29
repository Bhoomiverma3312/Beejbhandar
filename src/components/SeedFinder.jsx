import React, { useState, useMemo } from 'react';
import { initialProducts, categories } from '../data/seedsData';
import { ProductImage } from './ProductImage';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import {
  Compass,
  Sprout,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sun,
  Droplets,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeedFinder = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Wizard state
  const [role, setRole] = useState('farmer'); // 'farmer', 'gardener', 'coop'
  const [cropGroup, setCropGroup] = useState('any'); // 'vegetable', 'grain', 'pulse', 'oilseed', 'flower', 'fodder', 'any'
  const [season, setSeason] = useState('any'); // 'Kharif', 'Rabi', 'Summer', 'any'
  const [space, setSpace] = useState('any'); // 'field', 'pot', 'tray', 'any'
  const [experience, setExperience] = useState('any'); // 'beginner', 'experienced', 'any'

  // Match recommendations based on transparent heuristics
  const recommendations = useMemo(() => {
    return initialProducts.map(product => {
      let score = 0;
      const reasons = [];

      // 1. Role match
      if (product.roles && product.roles.includes(role)) {
        score += 30;
        reasons.push(`Matched your profile as ${role === 'farmer' ? 'Commercial Farmer' : role === 'gardener' ? 'Home / Terrace Gardener' : 'Cooperative Buyer'}`);
      } else if (!product.roles) {
        score += 15;
      }

      // 2. Crop group match
      if (cropGroup !== 'any') {
        if (product.category === cropGroup) {
          score += 35;
          const catName = categories.find(c => c.id === cropGroup)?.name || cropGroup;
          reasons.push(`Direct match for ${catName}`);
        }
      } else {
        score += 10;
      }

      // 3. Season match
      if (season !== 'any') {
        const prodSeason = (product.season || '').toLowerCase();
        if (prodSeason.includes(season.toLowerCase()) || prodSeason.includes('all season') || prodSeason.includes('year-round')) {
          score += 25;
          reasons.push(`Optimal for ${season} season cultivation`);
        }
      } else {
        score += 10;
      }

      // 4. Space match
      const sub = (product.subCategory || '').toLowerCase();
      const tags = (product.tags || []).map(t => t.toLowerCase());
      if (space === 'pot') {
        if (sub.includes('pot') || sub.includes('balcony') || sub.includes('container') || tags.includes('pots') || tags.includes('balcony') || tags.includes('container')) {
          score += 25;
          reasons.push('Thrives in pots, grow bags, and small balconies');
        } else if (product.category === 'flower' || product.category === 'vegetable') {
          score += 10;
        }
      } else if (space === 'tray') {
        if (sub.includes('microgreen') || sub.includes('sprout') || tags.includes('microgreens') || tags.includes('tray')) {
          score += 35;
          reasons.push('Ideal for shallow indoor windowsill microgreen trays');
        }
      } else if (space === 'field') {
        if (product.category === 'grain' || product.category === 'pulse' || product.category === 'oilseed' || product.category === 'fodder' || tags.includes('commercial')) {
          score += 25;
          reasons.push('High-yield field crop with heavy acreage productivity');
        }
      }

      // 5. Experience match
      if (experience === 'beginner') {
        if (product.isBestseller || product.germinationRate?.includes('9') || sub.includes('microgreen') || product.category === 'flower') {
          score += 15;
          reasons.push('High germination rate & forgiving for beginner cultivators');
        }
      }

      return {
        product,
        score,
        reasons
      };
    })
    .filter(item => item.score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  }, [role, cropGroup, season, space, experience]);

  const handleReset = () => {
    setRole('farmer');
    setCropGroup('any');
    setSeason('any');
    setSpace('any');
    setExperience('any');
  };

  return (
    <section className="seed-finder-section" style={{ background: '#F8F7F0', padding: '3.5rem 0', borderTop: '1px solid #E6E8DE', borderBottom: '1px solid #E6E8DE' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4EB', color: '#24563C', padding: '0.35rem 0.85rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Compass size={15} />
            <span>Smart Seed Finder Wizard</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#173D2B', margin: '0 0 0.5rem 0' }}>
            Find the Perfect Seed for Your Soil & Season
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#56685D', margin: 0 }}>
            Answer 5 simple questions to get transparent, data-backed seed recommendations directly from our catalog of {initialProducts.length}+ verified varieties.
          </p>
        </div>

        {/* Wizard Filter Controls */}
        <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', marginBottom: '2.5rem', boxShadow: '0 4px 20px rgba(23,61,43,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* 1. Grower Role */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#19271E', textTransform: 'uppercase', marginBottom: '6px' }}>
                1. I Am Cultivating As:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="farmer">🚜 Commercial Farmer</option>
                <option value="gardener">🪴 Home & Balcony Gardener</option>
                <option value="coop">🏢 Cooperative / FPO Buyer</option>
              </select>
            </div>

            {/* 2. Crop Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#19271E', textTransform: 'uppercase', marginBottom: '6px' }}>
                2. Crop Group / Purpose:
              </label>
              <select
                value={cropGroup}
                onChange={(e) => setCropGroup(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="any">🌾 Any Agricultural Group</option>
                <option value="vegetable">🥦 Vegetables & Kitchen Herbs</option>
                <option value="grain">🌾 Cereals & Millets (Shree Anna)</option>
                <option value="pulse">🌱 Pulses & Legumes</option>
                <option value="oilseed">🌻 Oilseeds & Cash Crops</option>
                <option value="flower">🌸 Flowers & Pollinators</option>
                <option value="fodder">🐄 Green Fodder & Dairy Feed</option>
                <option value="fruit">🍈 Fruit Crops (Seed-Grown)</option>
              </select>
            </div>

            {/* 3. Sowing Season */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#19271E', textTransform: 'uppercase', marginBottom: '6px' }}>
                3. Sowing Season:
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="any">☀️ All Seasons / Any Time</option>
                <option value="Kharif">🌧️ Kharif (Monsoon: June – Sept)</option>
                <option value="Rabi">❄️ Rabi (Winter: Oct – Feb)</option>
                <option value="Summer">🔥 Zaid / Summer (Feb – May)</option>
              </select>
            </div>

            {/* 4. Growing Space */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#19271E', textTransform: 'uppercase', marginBottom: '6px' }}>
                4. Available Growing Space:
              </label>
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="any">🏡 Any Space Size</option>
                <option value="field">🚜 Open Field (Acres / Hectares)</option>
                <option value="pot">🪴 Pots, Grow Bags & Balconies</option>
                <option value="tray">🌱 Indoor Windowsill Trays</option>
              </select>
            </div>

            {/* 5. Experience */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#19271E', textTransform: 'uppercase', marginBottom: '6px' }}>
                5. Experience Level:
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.75rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem', background: '#FFFFFF', cursor: 'pointer' }}
              >
                <option value="any">⭐ Any Experience</option>
                <option value="beginner">🌱 Beginner-Friendly (Easy Germination)</option>
                <option value="experienced">🏆 Commercial / Experienced</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #E6E8DE', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#56685D' }}>
              Showing top <strong>{recommendations.length}</strong> transparent matching varieties from local catalog:
            </span>
            <button
              type="button"
              onClick={handleReset}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', color: '#BE2828', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <RotateCcw size={14} />
              <span>Reset Wizard</span>
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {recommendations.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {recommendations.map(({ product, score, reasons }) => {
              const pack = product.packSizes?.[0] || { size: 'Standard Pack', price: product.price };
              return (
                <div
                  key={product.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E6E8DE',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ position: 'relative', height: '170px', width: '100%', background: '#F1EFE6' }}>
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      style={{ height: '100%', width: '100%' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#24563C', color: '#FFFFFF', padding: '3px 9px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {score}% Match
                    </div>
                    {product.badge && (
                      <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#C68A36', color: '#FFFFFF', padding: '3px 9px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.75rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                      {product.subCategory || product.categoryName} • {product.season || 'All Season'}
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#173D2B', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    {product.hindiName && (
                      <div style={{ fontSize: '0.8rem', color: '#56685D', marginBottom: '8px' }}>
                        {product.hindiName}
                      </div>
                    )}

                    {/* Why this matched explanation box */}
                    <div style={{ background: '#F8F7F0', border: '1px solid #E6E8DE', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1rem', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#24563C', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <CheckCircle2 size={13} /> Why this matched:
                      </span>
                      <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.75rem', color: '#56685D', lineHeight: 1.35 }}>
                        {reasons.slice(0, 2).map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #E6E8DE' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#84968C', display: 'block' }}>{pack.size}</span>
                        <strong style={{ fontSize: '1.2rem', color: '#173D2B' }}>{formatPrice(pack.price)}</strong>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/product/${product.id}`}>
                          <Button variant="outline" size="sm" title="View Full Agronomic Specifications">
                            Details
                          </Button>
                        </Link>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={ShoppingBag}
                          onClick={() => {
                            addToCart(product, 1, pack);
                            showToast(`${product.shortName || product.name} added to cart`);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E6E8DE' }}>
            <Sprout size={42} style={{ color: '#84968C', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#173D2B', marginBottom: '0.5rem' }}>No Seeds Match This Combination</h3>
            <p style={{ fontSize: '0.85rem', color: '#56685D', maxWidth: '450px', margin: '0 auto 1.25rem' }}>
              Try broadening your selection (e.g. choose "Any Agricultural Group" or "All Seasons") to view all matching varieties.
            </p>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset Finder
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeedFinder;
