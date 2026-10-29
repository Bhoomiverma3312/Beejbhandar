import React, { useState } from 'react';
import { initialProducts } from '../data/seedsData';
import { ProductImage } from './ProductImage';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import {
  Scale,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Layers,
  Sprout
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeedComparison = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Select up to 3 seed IDs for side-by-side comparison
  const [selectedIds, setSelectedIds] = useState([
    initialProducts[0]?.id || 'seed-veg-01',
    initialProducts[8]?.id || 'seed-grain-01',
    initialProducts[10]?.id || 'seed-oil-01'
  ]);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get active products
  const comparedProducts = selectedIds.map(id => initialProducts.find(p => p.id === id) || null);

  const handleSelectProduct = (index, newId) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
    setActiveDropdownIndex(null);
    setSearchTerm('');
  };

  const handleRemoveProduct = (index) => {
    const updated = [...selectedIds];
    updated[index] = null;
    setSelectedIds(updated);
  };

  // Filter products for dropdown picker
  const selectableProducts = initialProducts.filter(p => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.hindiName && p.hindiName.includes(q)) || (p.subCategory && p.subCategory.toLowerCase().includes(q));
  });

  return (
    <section className="seed-comparison-section" style={{ padding: '3.5rem 0', background: '#FFFFFF', borderTop: '1px solid #E6E8DE' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4EB', color: '#24563C', padding: '0.35rem 0.85rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Scale size={15} />
            <span>Side-by-Side Agronomic Comparison</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#173D2B', margin: '0 0 0.5rem 0' }}>
            Compare Seed Varieties
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#56685D', margin: 0 }}>
            Compare up to 3 distinct seed products across maturity period, sowing depth, price, germination, and intended agricultural usage.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div style={{ overflowX: 'auto', border: '1px solid #CBD2C1', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', background: '#FFFFFF' }}>
          <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8F7F0', borderBottom: '2px solid #CBD2C1' }}>
                <th style={{ padding: '1.25rem', width: '22%', fontSize: '0.88rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Specifications
                </th>
                {[0, 1, 2].map((slotIdx) => {
                  const prod = comparedProducts[slotIdx];
                  return (
                    <th key={slotIdx} style={{ padding: '1.25rem', width: '26%', verticalAlign: 'top', position: 'relative' }}>
                      {prod ? (
                        <div style={{ position: 'relative' }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(slotIdx)}
                            title="Remove from comparison"
                            style={{ position: 'absolute', top: 0, right: 0, background: '#F1EFE6', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#BE2828' }}
                          >
                            <X size={14} />
                          </button>

                          <div style={{ width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem', background: '#F1EFE6' }}>
                            <ProductImage src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%' }} />
                          </div>

                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#173D2B', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                            {prod.shortName || prod.name}
                          </h4>
                          {prod.hindiName && (
                            <div style={{ fontSize: '0.78rem', color: '#56685D', marginBottom: '8px' }}>
                              {prod.hindiName}
                            </div>
                          )}
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#24563C', marginBottom: '8px' }}>
                            {formatPrice(prod.price)}
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Button
                              variant="primary"
                              size="sm"
                              icon={ShoppingBag}
                              fullWidth
                              onClick={() => {
                                const pack = prod.packSizes?.[0] || { size: 'Standard Pack', price: prod.price };
                                addToCart(prod, 1, pack);
                                showToast(`${prod.shortName || prod.name} added to cart`);
                              }}
                            >
                              Add
                            </Button>
                            <Link to={`/product/${prod.id}`}>
                              <Button variant="outline" size="sm" title="View details">
                                <ExternalLink size={14} />
                              </Button>
                            </Link>
                          </div>

                          {/* Change product trigger */}
                          <button
                            type="button"
                            onClick={() => setActiveDropdownIndex(activeDropdownIndex === slotIdx ? null : slotIdx)}
                            style={{ width: '100%', marginTop: '6px', background: 'transparent', border: 'none', color: '#24563C', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                          >
                            Change seed...
                          </button>
                        </div>
                      ) : (
                        <div style={{ border: '2px dashed #CBD2C1', borderRadius: '12px', padding: '2rem 1rem', textAlign: 'center', background: '#FAF9F5' }}>
                          <Sprout size={32} style={{ color: '#84968C', marginBottom: '0.5rem' }} />
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#56685D', marginBottom: '0.75rem' }}>
                            Select Seed Variety
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Plus}
                            onClick={() => setActiveDropdownIndex(slotIdx)}
                          >
                            Choose
                          </Button>
                        </div>
                      )}

                      {/* Dropdown picker modal/overlay for this slot */}
                      {activeDropdownIndex === slotIdx && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '10px',
                            right: '10px',
                            background: '#FFFFFF',
                            border: '1px solid #CBD2C1',
                            borderRadius: '10px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            zIndex: 100,
                            maxHeight: '280px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                          }}
                        >
                          <div style={{ padding: '8px', borderBottom: '1px solid #E6E8DE', background: '#F8F7F0' }}>
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Search seed..."
                              autoFocus
                              style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.82rem' }}
                            />
                          </div>
                          <div style={{ overflowY: 'auto', flex: 1 }}>
                            {selectableProducts.slice(0, 40).map(p => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handleSelectProduct(slotIdx, p.id)}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  textAlign: 'left',
                                  border: 'none',
                                  borderBottom: '1px solid #F1EFE6',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <div>
                                  <strong style={{ display: 'block', color: '#173D2B' }}>{p.shortName || p.name}</strong>
                                  <span style={{ fontSize: '0.72rem', color: '#84968C' }}>{p.subCategory || p.categoryName}</span>
                                </div>
                                <span style={{ fontWeight: 700, color: '#24563C' }}>{formatPrice(p.price)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {/* Row 1: Crop Group & Subcategory */}
              <tr style={{ borderBottom: '1px solid #E6E8DE' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Crop Group & Subcategory
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#56685D' }}>
                    {p ? <strong>{p.categoryName || p.category} — {p.subCategory || 'General'}</strong> : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 2: Foundation Line / Variety */}
              <tr style={{ borderBottom: '1px solid #E6E8DE', background: '#FAF9F5' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Breeder Line / Variety
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#56685D' }}>
                    {p ? (p.variety || p.brand || 'Research Hybrid') : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 3: Suitable Growing Season */}
              <tr style={{ borderBottom: '1px solid #E6E8DE' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Suitable Growing Season
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#56685D' }}>
                    {p ? (p.season || 'All Season') : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 4: Maturity Period */}
              <tr style={{ borderBottom: '1px solid #E6E8DE', background: '#FAF9F5' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Approx. Maturity / Harvest
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#56685D' }}>
                    {p ? (p.harvestTime || p.harvestDays || '65–80 Days') : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 5: Germination Rate Guarantee */}
              <tr style={{ borderBottom: '1px solid #E6E8DE' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Germination Rate Guarantee
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#226D3F', fontWeight: 700 }}>
                    {p ? (p.germinationRate || '90%+ Tested') : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 6: Sowing Instructions */}
              <tr style={{ borderBottom: '1px solid #E6E8DE', background: '#FAF9F5' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Sowing Method
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.82rem', color: '#56685D' }}>
                    {p ? (p.sowingMethod || 'Direct sowing or nursery transplant') : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 7: Target Roles */}
              <tr style={{ borderBottom: '1px solid #E6E8DE' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Intended Target Roles
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.82rem', color: '#56685D' }}>
                    {p ? (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {(!p.roles || p.roles.includes('farmer')) && <span style={{ background: '#EEF4EB', color: '#24563C', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>🚜 Farmer</span>}
                        {(!p.roles || p.roles.includes('coop')) && <span style={{ background: '#E0F2FE', color: '#1D5E79', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>🏢 Co-op</span>}
                        {(!p.roles || p.roles.includes('gardener')) && <span style={{ background: '#FEF3C7', color: '#B45309', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem' }}>🪴 Gardener</span>}
                      </div>
                    ) : '—'}
                  </td>
                ))}
              </tr>

              {/* Row 8: Available Pack Sizes */}
              <tr>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: '#173D2B', fontSize: '0.85rem' }}>
                  Available Pack Sizes
                </td>
                {comparedProducts.map((p, idx) => (
                  <td key={idx} style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', color: '#56685D' }}>
                    {p && p.packSizes ? (
                      <ul style={{ margin: 0, paddingLeft: '1rem', lineHeight: 1.4 }}>
                        {p.packSizes.map((ps, i) => (
                          <li key={i}>{ps.size}: {formatPrice(ps.price)}</li>
                        ))}
                      </ul>
                    ) : 'Standard Pack only'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SeedComparison;
