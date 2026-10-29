import React, { useState } from 'react';
import { initialProducts } from '../data/seedsData';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/formatters';
import { useToast } from '../context/ToastContext';
import {
  FileText,
  Building2,
  Users,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Printer,
  Info,
  DollarSign,
  TrendingDown
} from 'lucide-react';

export const CoopBulkOptimizer = () => {
  const { showToast } = useToast();

  // Order items state
  const [items, setItems] = useState([
    { productId: 'seed-grain-01', seedName: 'Certified Sharbati Wheat (HD-2967)', quantityKg: 600, targetCrop: 'Rabi Wheat' },
    { productId: 'seed-oil-01', seedName: 'Yellow Mustard / Sarson (Pusa Bold)', quantityKg: 120, targetCrop: 'Rabi Mustard' },
    { productId: 'seed-pulse-01', seedName: 'Desi Chickpea / Chana (Pusa-362)', quantityKg: 400, targetCrop: 'Rabi Pulse' }
  ]);

  const [societyName, setSocietyName] = useState('Punjab Agri Cooperative Society Ltd.');
  const [memberCount, setMemberCount] = useState(48);
  const [deliveryPincode, setDeliveryPincode] = useState('141001');

  // Add line item
  const handleAddItem = () => {
    setItems([
      ...items,
      { productId: 'seed-fodder-01', seedName: 'Multi-Cut Egyptian Clover / Berseem', quantityKg: 150, targetCrop: 'Fodder' }
    ]);
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Calculations
  const totalVolumeKg = items.reduce((acc, it) => acc + (Number(it.quantityKg) || 0), 0);

  // Volume discount tiers (Transparently labelled sample demo tiers)
  let discountPercent = 5;
  if (totalVolumeKg >= 1500) discountPercent = 22;
  else if (totalVolumeKg >= 1000) discountPercent = 18;
  else if (totalVolumeKg >= 500) discountPercent = 12;

  // Compute pricing
  const itemizedCalculations = items.map(it => {
    const p = initialProducts.find(prod => prod.id === it.productId) || initialProducts[0];
    const baseKgRate = p.price; // Demo benchmark rate
    const grossTotal = baseKgRate * (Number(it.quantityKg) || 0);
    const discountAmount = Math.round(grossTotal * (discountPercent / 100));
    const netTotal = grossTotal - discountAmount;
    const perMemberAllocKg = memberCount > 0 ? (Number(it.quantityKg) / memberCount).toFixed(1) : 0;

    return {
      ...it,
      baseKgRate,
      grossTotal,
      discountAmount,
      netTotal,
      perMemberAllocKg
    };
  });

  const totalGross = itemizedCalculations.reduce((acc, it) => acc + it.grossTotal, 0);
  const totalDiscount = itemizedCalculations.reduce((acc, it) => acc + it.discountAmount, 0);
  const totalNet = totalGross - totalDiscount;
  const costPerMember = memberCount > 0 ? Math.round(totalNet / memberCount) : 0;

  // Print quotation
  const handlePrintQuotation = () => {
    window.print();
  };

  // Export JSON/CSV Summary
  const handleExportSummary = () => {
    const rows = [
      ['Cooperative Bulk Order Quotation & Member Allocation'],
      ['Society Name:', societyName],
      ['Member Cultivators:', memberCount],
      ['Delivery Pincode:', deliveryPincode],
      ['Total Volume (Kg):', totalVolumeKg],
      ['Applied Discount Tier:', `${discountPercent}% (Demo Volume Tier)`],
      ['Net Total Value (INR):', totalNet],
      [],
      ['Seed Variety', 'Target Crop', 'Total Qty (Kg)', 'Rate/Kg', 'Gross Cost', 'Discount', 'Net Cost', 'Per-Member Allocation (Kg)']
    ];

    itemizedCalculations.forEach(it => {
      rows.push([
        it.seedName,
        it.targetCrop,
        it.quantityKg,
        it.baseKgRate,
        it.grossTotal,
        it.discountAmount,
        it.netTotal,
        it.perMemberAllocKg
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BeejBhandar_Bulk_Order_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Cooperative Bulk Order Summary CSV');
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(23,61,43,0.05)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E6E8DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#E0F2FE', color: '#1D5E79', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
              Cooperative Bulk Order Optimizer & Quota Allocator
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#56685D' }}>
              Multi-seed bulk calculations, volume discount tiers, and member quota allocations
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportSummary}
          >
            Export CSV
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={handlePrintQuotation}
          >
            Print Quotation
          </Button>
        </div>
      </div>

      {/* Society Metadata Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: '#F8F7F0', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E6E8DE', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Cooperative / FPO Name:
          </label>
          <input
            type="text"
            value={societyName}
            onChange={(e) => setSocietyName(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.88rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Registered Member Cultivators:
          </label>
          <input
            type="number"
            min={1}
            value={memberCount}
            onChange={(e) => setMemberCount(parseInt(e.target.value) || 1)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.88rem' }}
          />
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '2px', display: 'block' }}>
            Distributes volume quotas equally
          </span>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Delivery Hub Pincode:
          </label>
          <input
            type="text"
            value={deliveryPincode}
            onChange={(e) => setDeliveryPincode(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.88rem' }}
          />
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '2px', display: 'block' }}>
            Central depot freight routing
          </span>
        </div>
      </div>

      {/* Multi-Seed Line Items Table */}
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem', border: '1px solid #E6E8DE', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ background: '#F8F7F0', borderBottom: '1px solid #CBD2C1', fontSize: '0.8rem', color: '#173D2B', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>Seed Variety</th>
              <th style={{ padding: '0.85rem 1rem' }}>Bulk Quantity (Kg)</th>
              <th style={{ padding: '0.85rem 1rem' }}>Per-Member Share</th>
              <th style={{ padding: '0.85rem 1rem' }}>Rate / Kg</th>
              <th style={{ padding: '0.85rem 1rem' }}>Net Estimated Cost</th>
              <th style={{ padding: '0.85rem 1rem', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {itemizedCalculations.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #E6E8DE', fontSize: '0.85rem' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <select
                    value={item.productId}
                    onChange={(e) => {
                      const selected = initialProducts.find(p => p.id === e.target.value);
                      handleUpdateItem(idx, 'productId', e.target.value);
                      handleUpdateItem(idx, 'seedName', selected?.shortName || selected?.name || '');
                    }}
                    style={{ width: '100%', padding: '0.45rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.82rem', background: '#FFFFFF' }}
                  >
                    {initialProducts.filter(p => p.category === 'grain' || p.category === 'pulse' || p.category === 'oilseed' || p.category === 'fodder').map(p => (
                      <option key={p.id} value={p.id}>{p.shortName || p.name} ({p.subCategory})</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={item.quantityKg}
                    onChange={(e) => handleUpdateItem(idx, 'quantityKg', parseFloat(e.target.value) || 0)}
                    style={{ width: '110px', padding: '0.45rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </td>
                <td style={{ padding: '0.85rem 1rem', color: '#56685D', fontWeight: 600 }}>
                  {item.perMemberAllocKg} Kg / member
                </td>
                <td style={{ padding: '0.85rem 1rem', color: '#56685D' }}>
                  {formatPrice(item.baseKgRate)}
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#24563C' }}>
                  {formatPrice(item.netTotal)}
                </td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    style={{ background: 'transparent', border: 'none', color: '#BE2828', cursor: 'pointer' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAddItem}
        >
          Add Another Seed Variety
        </Button>

        {/* Applied Discount Tier Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#E8F5ED', color: '#226D3F', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700 }}>
          <TrendingDown size={16} />
          <span>Applied Demo Tier: {discountPercent}% Bulk Savings ({totalVolumeKg} Kg aggregate)</span>
        </div>
      </div>

      {/* Summary Financial Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#FAF9F5', padding: '1.25rem', borderRadius: '12px', border: '1px solid #CBD2C1' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 700 }}>Gross Wholesale Total</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#173D2B', marginTop: '2px' }}>{formatPrice(totalGross)}</div>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 700 }}>Volume Savings ({discountPercent}%)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#226D3F', marginTop: '2px' }}>− {formatPrice(totalDiscount)}</div>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 700 }}>Final Net Quotation</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#24563C', marginTop: '2px' }}>{formatPrice(totalNet)}</div>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: '#84968C', textTransform: 'uppercase', fontWeight: 700 }}>Avg Cost Per Member</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#173D2B', marginTop: '2px' }}>{formatPrice(costPerMember)}</div>
        </div>
      </div>

      {/* Label Notice */}
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#B45309', background: '#FEF3C7', padding: '6px 12px', borderRadius: '6px' }}>
        <Info size={14} style={{ flexShrink: 0 }} />
        <span>Demo Wholesale Model: Volume discount tiers (500kg=12%, 1000kg=18%, 1500kg=22%) represent simulated cooperative pricing schedules.</span>
      </div>
    </div>
  );
};

export default CoopBulkOptimizer;
