import React, { useState, useMemo } from 'react';
import { initialProducts } from '../data/seedsData';
import { Button } from './Button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import {
  Calculator,
  RotateCcw,
  ShoppingBag,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Standard unit conversions into Acres
const UNIT_CONVERSIONS_TO_ACRE = {
  acre: 1.0,
  hectare: 2.47105,
  bigha_punjab: 0.2,       // 1 Acre = 5 Bigha in Punjab/Haryana
  bigha_up_mp: 0.625,      // Standard Pucca Bigha ~ 0.625 Acre
  bigha_bengal: 0.33,      // Bengal Bigha ~ 0.33 Acre
  guntha: 0.025,           // 1 Acre = 40 Gunthas (Maharashtra/Karnataka)
  kanal: 0.125,            // 1 Acre = 8 Kanals
  marla: 0.00625,          // 1 Kanal = 20 Marlas
  sq_meter: 0.000247105,
  sq_feet: 0.0000229568
};

// Seed Rate Assumptions (Kg per Acre) with documented agricultural ranges
const DEFAULT_SEED_RATES = {
  wheat: { rateKgPerAcre: 40, label: 'Wheat (Sharbati/Durum): 40 kg/acre (normal timely sowing)' },
  paddy: { rateKgPerAcre: 10, label: 'Paddy / Basmati Rice (Transplanted): 8-10 kg/acre nursery seed' },
  mustard: { rateKgPerAcre: 2.0, label: 'Mustard / Sarson: 1.5 - 2.0 kg/acre (fine line drilling)' },
  chickpea: { rateKgPerAcre: 30, label: 'Desi Chickpea / Chana: 25 - 30 kg/acre' },
  maize: { rateKgPerAcre: 8, label: 'Maize / Sweet Corn: 7 - 8 kg/acre' },
  berseem: { rateKgPerAcre: 10, label: 'Berseem Fodder: 10 - 12 kg/acre broadcast with water' },
  lucerne: { rateKgPerAcre: 6, label: 'Lucerne / Alfalfa: 6 - 8 kg/acre shallow drilling' },
  barley: { rateKgPerAcre: 35, label: 'Barley / Jau: 35 kg/acre' },
  moong: { rateKgPerAcre: 8, label: 'Green Gram / Moong: 8 - 10 kg/acre' },
  urad: { rateKgPerAcre: 8, label: 'Black Gram / Urad: 8 - 10 kg/acre' },
  soybean: { rateKgPerAcre: 28, label: 'Soybean: 25 - 30 kg/acre' },
  groundnut: { rateKgPerAcre: 45, label: 'Groundnut (Kernels): 40 - 50 kg/acre' },
  cotton: { rateKgPerAcre: 1.5, label: 'Hybrid Cotton: 1.5 - 2.0 kg/acre (dibbled)' },
  sesame: { rateKgPerAcre: 1.5, label: 'Sesame / Til: 1.5 kg/acre mixed with sand' },
  sunflower: { rateKgPerAcre: 2.5, label: 'Hybrid Sunflower: 2.0 - 2.5 kg/acre' },
  dhaincha: { rateKgPerAcre: 15, label: 'Dhaincha Green Manure: 12 - 15 kg/acre' },
  sunnhemp: { rateKgPerAcre: 16, label: 'Sunn Hemp Green Manure: 15 - 18 kg/acre' },
  general_vegetable: { rateKgPerAcre: 0.15, label: 'Hybrid Tomato / Chilli / Brinjal Nursery: 120 - 180 g/acre' }
};

export const LandBudgetCalculator = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Inputs
  const [areaValue, setAreaValue] = useState(2.5);
  const [areaUnit, setAreaUnit] = useState('acre');
  const [selectedCropKey, setSelectedCropKey] = useState('wheat');
  const [selectedProductId, setSelectedProductId] = useState('seed-grain-01');
  const [budgetLimit, setBudgetLimit] = useState(10000);

  // Conversion to Acres
  const acres = useMemo(() => {
    const factor = UNIT_CONVERSIONS_TO_ACRE[areaUnit] || 1.0;
    return Number(areaValue || 0) * factor;
  }, [areaValue, areaUnit]);

  // Selected crop rate assumption
  const cropAssumption = DEFAULT_SEED_RATES[selectedCropKey] || DEFAULT_SEED_RATES.wheat;

  // Selected product
  const product = useMemo(() => {
    return initialProducts.find(p => p.id === selectedProductId) || initialProducts[0];
  }, [selectedProductId]);

  // Calculations
  const calculation = useMemo(() => {
    const totalKgNeeded = Math.max(0.1, Number((acres * cropAssumption.rateKgPerAcre).toFixed(2)));
    
    // Find best pack configuration from product packSizes
    const packs = product?.packSizes || [
      { size: '1 kg Standard Pack', price: product?.price || 150 }
    ];

    // Determine unit cost benchmark
    let estimatedCost = 0;
    const suggestedPacks = [];

    // Check if large field pack exists (e.g. 20kg, 25kg, 40kg, 50kg)
    const sortedPacks = [...packs].sort((a, b) => {
      const aWeight = parseFloat(a.size) || 1;
      const bWeight = parseFloat(b.size) || 1;
      return bWeight - aWeight;
    });

    let remainingKg = totalKgNeeded;
    for (const pack of sortedPacks) {
      let packKg = 1;
      if (pack.size.includes('50 kg') || pack.size.includes('50 Kg')) packKg = 50;
      else if (pack.size.includes('40 kg') || pack.size.includes('40 Kg')) packKg = 40;
      else if (pack.size.includes('25 kg') || pack.size.includes('25 Kg')) packKg = 25;
      else if (pack.size.includes('20 kg') || pack.size.includes('20 Kg')) packKg = 20;
      else if (pack.size.includes('10 kg') || pack.size.includes('10 Kg')) packKg = 10;
      else if (pack.size.includes('5 kg') || pack.size.includes('5 Kg')) packKg = 5;
      else if (pack.size.includes('2.5 kg') || pack.size.includes('2.5 Kg')) packKg = 2.5;
      else if (pack.size.includes('2 kg') || pack.size.includes('2 Kg')) packKg = 2;
      else if (pack.size.includes('1 kg') || pack.size.includes('1 Kg')) packKg = 1;
      else if (pack.size.includes('500g')) packKg = 0.5;
      else if (pack.size.includes('250g')) packKg = 0.25;
      else if (pack.size.includes('100g')) packKg = 0.1;
      else packKg = 0.05;

      const count = Math.floor(remainingKg / packKg);
      if (count > 0) {
        suggestedPacks.push({
          pack,
          count,
          totalPrice: count * pack.price,
          packKg
        });
        estimatedCost += count * pack.price;
        remainingKg -= count * packKg;
      }
    }

    // Top off remainder with smallest pack
    if (remainingKg > 0) {
      const smallestPack = sortedPacks[sortedPacks.length - 1];
      suggestedPacks.push({
        pack: smallestPack,
        count: 1,
        totalPrice: smallestPack.price,
        packKg: 1
      });
      estimatedCost += smallestPack.price;
    }

    const budgetDifference = Number(budgetLimit || 0) - estimatedCost;
    const isWithinBudget = budgetDifference >= 0;

    return {
      totalKgNeeded,
      estimatedCost,
      suggestedPacks,
      budgetDifference,
      isWithinBudget
    };
  }, [acres, cropAssumption, product, budgetLimit]);

  const handleAddSuggestedToCart = () => {
    if (!calculation.suggestedPacks.length) return;
    calculation.suggestedPacks.forEach(({ pack, count }) => {
      addToCart(product, count, pack);
    });
    showToast(`Added ${calculation.suggestedPacks.length} pack items to cart for ${areaValue} ${areaUnit}`);
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(23,61,43,0.05)' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EEF4EB', color: '#24563C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
            Land & Seed Budget Calculator
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#56685D' }}>
            Estimates required seed volume & optimal bag combinations based on real catalog packs
          </span>
        </div>
      </div>

      {/* Input Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: '#F8F7F0', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E6E8DE' }}>
        {/* 1. Land Area & Unit */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Land Area:
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={areaValue}
              onChange={(e) => setAreaValue(parseFloat(e.target.value) || 0)}
              style={{ width: '60%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.88rem' }}
            />
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value)}
              style={{ width: '40%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.82rem', background: '#FFFFFF' }}
            >
              <option value="acre">Acre</option>
              <option value="hectare">Hectare</option>
              <option value="bigha_punjab">Bigha (Punjab/HR)</option>
              <option value="bigha_up_mp">Bigha (UP/MP)</option>
              <option value="guntha">Guntha</option>
              <option value="kanal">Kanal</option>
              <option value="sq_meter">Sq. Meter</option>
            </select>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '3px', display: 'block' }}>
            ≈ {acres.toFixed(2)} Acres normalized
          </span>
        </div>

        {/* 2. Crop Type */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Target Crop Assumption:
          </label>
          <select
            value={selectedCropKey}
            onChange={(e) => setSelectedCropKey(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.82rem', background: '#FFFFFF' }}
          >
            <option value="wheat">🌾 Wheat (40 kg / Acre)</option>
            <option value="paddy">🌾 Basmati Paddy (10 kg / Acre nursery)</option>
            <option value="mustard">🌻 Mustard / Sarson (2 kg / Acre)</option>
            <option value="chickpea">🌱 Desi Chickpea / Chana (30 kg / Acre)</option>
            <option value="maize">🌽 Maize / Sweet Corn (8 kg / Acre)</option>
            <option value="barley">🌾 Barley / Jau (35 kg / Acre)</option>
            <option value="berseem">🐄 Berseem Fodder (10 kg / Acre)</option>
            <option value="lucerne">🐄 Lucerne / Alfalfa (6 kg / Acre)</option>
            <option value="moong">🌱 Green Gram / Moong (8 kg / Acre)</option>
            <option value="urad">🌱 Black Gram / Urad (8 kg / Acre)</option>
            <option value="soybean">🌱 Soybean (28 kg / Acre)</option>
            <option value="groundnut">🥜 Groundnut Kernels (45 kg / Acre)</option>
            <option value="dhaincha">🌿 Dhaincha Green Manure (15 kg / Acre)</option>
            <option value="sunnhemp">🌿 Sunn Hemp Green Manure (16 kg / Acre)</option>
            <option value="general_vegetable">🍅 Vegetable Nursery (150 g / Acre)</option>
          </select>
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '3px', display: 'block' }}>
            Standard agricultural rate
          </span>
        </div>

        {/* 3. Choose Catalog Seed Variety */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Seed Product in Catalog:
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.82rem', background: '#FFFFFF' }}
          >
            {initialProducts.filter(p => p.category === 'grain' || p.category === 'pulse' || p.category === 'oilseed' || p.category === 'fodder' || p.category === 'vegetable').slice(0, 50).map(p => (
              <option key={p.id} value={p.id}>
                {p.shortName || p.name} ({formatPrice(p.price)})
              </option>
            ))}
          </select>
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '3px', display: 'block' }}>
            Packs & prices loaded live
          </span>
        </div>

        {/* 4. Budget Constraint */}
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#173D2B', textTransform: 'uppercase', marginBottom: '4px' }}>
            Your Budget Limit (INR):
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#84968C' }}>₹</span>
            <input
              type="number"
              min={500}
              step={500}
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', padding: '0.55rem 0.55rem 0.55rem 1.6rem', border: '1px solid #CBD2C1', borderRadius: '6px', fontSize: '0.88rem' }}
            />
          </div>
          <span style={{ fontSize: '0.72rem', color: '#84968C', marginTop: '3px', display: 'block' }}>
            Evaluates financial feasibility
          </span>
        </div>
      </div>

      {/* Results Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
        {/* Quantity & Cost Summary */}
        <div style={{ background: '#FAF9F5', border: '1px solid #E6E8DE', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: '#84968C', marginBottom: '6px' }}>
            Calculated Requirement
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#173D2B' }}>
              {calculation.totalKgNeeded >= 1 ? `${calculation.totalKgNeeded} Kg` : `${Math.round(calculation.totalKgNeeded * 1000)} Grams`}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#56685D' }}>for {areaValue} {areaUnit}</span>
          </div>

          <div style={{ borderTop: '1px solid #E6E8DE', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '4px' }}>
              <span>Estimated Seed Investment:</span>
              <strong style={{ fontSize: '1.15rem', color: '#24563C' }}>{formatPrice(calculation.estimatedCost)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: calculation.isWithinBudget ? '#226D3F' : '#BE2828' }}>
              <span>Budget Variance:</span>
              <strong>{calculation.isWithinBudget ? `Under budget by ${formatPrice(calculation.budgetDifference)}` : `Over budget by ${formatPrice(Math.abs(calculation.budgetDifference))}`}</strong>
            </div>
          </div>
        </div>

        {/* Suggested Pack Combination */}
        <div style={{ background: '#FAF9F5', border: '1px solid #E6E8DE', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: '#84968C', marginBottom: '6px' }}>
            Suggested Pack Combinations (Catalog)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
            {calculation.suggestedPacks.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', background: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E6E8DE' }}>
                <span><strong>{item.count}×</strong> {item.pack.size}</span>
                <span style={{ fontWeight: 700, color: '#173D2B' }}>{formatPrice(item.totalPrice)}</span>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            icon={ShoppingBag}
            onClick={handleAddSuggestedToCart}
          >
            Add Calculated Packs to Cart
          </Button>
        </div>
      </div>

      {/* Disclaimers & Assumptions Box */}
      <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#92400E', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Agronomic Seed-Rate Assumption:</strong> Based on standard State Agricultural University (SAU) guidelines for normal timely sowing. Actual seed rate varies depending on soil moisture, germination percentage, sowing method (broadcasting vs. seed drill), and seed size. Adjust according to local Krishi Vigyan Kendra (KVK) advisory.
        </div>
      </div>
    </div>
  );
};

export default LandBudgetCalculator;
