import React, { useState, useMemo, useEffect } from 'react';
import { initialProducts } from '../data/seedsData';
import { Button } from './Button';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
  Flower2,
  Sun,
  Droplets,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

const GARDEN_PLAN_STORAGE_KEY = 'beejbhandar_garden_plan_v1';

const DEFAULT_POTS = [
  { id: 'pot-1', name: 'Terrace Pot #1 (12-inch)', crop: 'Tumbler Cherry Tomato', productId: 'seed-home-balcony-tomato', sun: 'full', soil: 'Cocopeat 50% + Vermicompost 30% + Soil 20%' },
  { id: 'pot-2', name: 'Terrace Pot #2 (10-inch)', crop: 'Compact Balcony Brinjal', productId: 'seed-home-balcony-eggplant', sun: 'full', soil: 'Potting mix + Neem cake' },
  { id: 'pot-3', name: 'Railing Planter #1', crop: 'Desi Multi-Cut Coriander', productId: 'seed-veg-12', sun: 'partial', soil: 'Sandy loam + compost' },
  { id: 'pot-4', name: 'Railing Planter #2', crop: 'Organic Palak / Spinach', productId: 'seed-veg-14', sun: 'partial', soil: 'Light rich potting mix' },
  { id: 'pot-5', name: 'Windowsill Tray', crop: '6-Day Red Radish Microgreens', productId: 'seed-home-radish-micro', sun: 'bright_indirect', soil: 'Coco-mat or shallow cocopeat' }
];

export const BalconyGardenPlanner = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [balconySpace, setBalconySpace] = useState('medium'); // 'compact', 'medium', 'large'
  const [sunlightHours, setSunlightHours] = useState('4-6');   // '2-4', '4-6', '6-8'
  const [pots, setPots] = useState(() => {
    try {
      const stored = localStorage.getItem(GARDEN_PLAN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_POTS;
    } catch {
      return DEFAULT_POTS;
    }
  });

  // Persist pots to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(GARDEN_PLAN_STORAGE_KEY, JSON.stringify(pots));
    } catch (e) {
      console.error('Failed to save garden plan', e);
    }
  }, [pots]);

  // Suitable seeds for urban setups
  const suggestedSeeds = useMemo(() => {
    return initialProducts.filter(p => {
      const sub = (p.subCategory || '').toLowerCase();
      const tags = (p.tags || []).map(t => t.toLowerCase());
      return p.category === 'flower' || sub.includes('microgreen') || sub.includes('balcony') || sub.includes('pot') || tags.includes('balcony') || tags.includes('pots') || p.category === 'vegetable';
    }).slice(0, 30);
  }, []);

  const handleAddPot = () => {
    const newId = `pot-${Date.now()}`;
    const newPot = {
      id: newId,
      name: `Container #${pots.length + 1} (10-inch)`,
      crop: 'Pot Marigold / Calendula',
      productId: 'seed-flw-calendula',
      sun: 'partial',
      soil: 'Standard organic potting mix'
    };
    setPots([...pots, newPot]);
    showToast('Added container to your garden planner');
  };

  const handleUpdatePot = (id, field, value) => {
    setPots(pots.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleRemovePot = (id) => {
    if (pots.length <= 1) return;
    setPots(pots.filter(p => p.id !== id));
  };

  const handlePrintPlan = () => {
    window.print();
  };

  const handleAddAllToCart = () => {
    pots.forEach(pot => {
      const prod = initialProducts.find(p => p.id === pot.productId) || initialProducts[0];
      const pack = prod.packSizes?.[0] || { size: 'Home Garden Pack', price: prod.price };
      addToCart(prod, 1, pack);
    });
    showToast(`Added all ${pots.length} garden plan seeds to cart!`);
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(23,61,43,0.05)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E6E8DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flower2 size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
              Balcony & Kitchen Garden Planner
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#56685D' }}>
              Design container layouts, assign pot varieties, track sunlight hours & export garden blueprint
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handlePrintPlan}
          >
            Print Layout
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ShoppingBag}
            onClick={handleAddAllToCart}
          >
            Add All Seeds ({pots.length}) to Cart
          </Button>
        </div>
      </div>

      {/* Growing Setup Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: '#F8F7F0', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E6E8DE', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Balcony / Terrace Area:
          </label>
          <select
            value={balconySpace}
            onChange={(e) => setBalconySpace(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.85rem', background: '#FFFFFF' }}
          >
            <option value="compact">🪴 Compact Window / Railing (2–4 pots)</option>
            <option value="medium">🪴🪴 Medium Balcony (5–10 pots)</option>
            <option value="large">☀️ Open Rooftop Terrace (10+ pots & grow bags)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Direct Daily Sunlight:
          </label>
          <select
            value={sunlightHours}
            onChange={(e) => setSunlightHours(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.85rem', background: '#FFFFFF' }}
          >
            <option value="2-4">🌤️ 2–4 Hours (Leafy greens, mint, coriander, microgreens)</option>
            <option value="4-6">☀️ 4–6 Hours (Tomatoes, chillies, bush brinjals, herbs)</option>
            <option value="6-8">☀️☀️ 6–8+ Hours Full Sun (Gourds, marigolds, capsicum)</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 700 }}>
            Planned Containers
          </span>
          <strong style={{ fontSize: '1.3rem', color: '#24563C' }}>
            {pots.length} Pots Assigned
          </strong>
        </div>
      </div>

      {/* Visual Containers Layout Grid */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
            Active Pot & Planter Cards ({pots.length} Containers):
          </h4>
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={handleAddPot}
          >
            Add New Container
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {pots.map((pot, idx) => {
            const prod = initialProducts.find(p => p.id === pot.productId) || initialProducts[0];
            return (
              <div
                key={pot.id}
                style={{
                  background: '#FAF9F5',
                  border: '1px solid #CBD2C1',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={pot.name}
                    onChange={(e) => handleUpdatePot(pot.id, 'name', e.target.value)}
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: '#173D2B', background: 'transparent', border: 'none', borderBottom: '1px dashed #CBD2C1', padding: '2px 0', width: '80%' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePot(pot.id)}
                    style={{ background: 'transparent', border: 'none', color: '#BE2828', cursor: 'pointer', padding: '2px' }}
                    title="Remove pot"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.7rem', color: '#84968C', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Cultivated Crop:
                  </label>
                  <select
                    value={pot.productId}
                    onChange={(e) => {
                      const sel = suggestedSeeds.find(s => s.id === e.target.value);
                      handleUpdatePot(pot.id, 'productId', e.target.value);
                      handleUpdatePot(pot.id, 'crop', sel?.shortName || sel?.name || '');
                    }}
                    style={{ width: '100%', padding: '0.45rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.8rem', background: '#FFFFFF' }}
                  >
                    {suggestedSeeds.map(s => (
                      <option key={s.id} value={s.id}>{s.shortName || s.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#84968C', textTransform: 'uppercase', display: 'block' }}>Sunlight</label>
                    <select
                      value={pot.sun}
                      onChange={(e) => handleUpdatePot(pot.id, 'sun', e.target.value)}
                      style={{ width: '100%', padding: '0.35rem', border: '1px solid #CBD2C1', borderRadius: '4px', fontSize: '0.75rem', background: '#FFFFFF' }}
                    >
                      <option value="full">Full Sun</option>
                      <option value="partial">Partial</option>
                      <option value="bright_indirect">Bright Shade</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#84968C', textTransform: 'uppercase', display: 'block' }}>Seed Price</label>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#24563C', lineHeight: '28px' }}>
                      {formatPrice(prod.price)}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #E6E8DE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#56685D' }}>{prod.season || 'All Season'}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ShoppingBag}
                    onClick={() => {
                      const pack = prod.packSizes?.[0] || { size: 'Home Garden Pack', price: prod.price };
                      addToCart(prod, 1, pack);
                      showToast(`Added ${prod.shortName || prod.name} to cart`);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urban Potting Soil Recipe Advisory */}
      <div style={{ background: '#EEF4EB', border: '1px solid #C8DEC3', borderRadius: '10px', padding: '1rem', fontSize: '0.78rem', color: '#24563C', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Sparkles size={20} style={{ flexShrink: 0 }} />
        <div>
          <strong>Recommended Urban Potting Mix Formula:</strong> 50% coco-peat (moisture retention & aeration), 30% seasoned vermicompost (vital slow-release organic nutrition), and 20% garden soil or perlite (root anchorage & drainage). Add a handful of neem cake powder per pot to prevent root grubs.
        </div>
      </div>
    </div>
  );
};

export default BalconyGardenPlanner;
