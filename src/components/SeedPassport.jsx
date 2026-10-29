import React, { useState } from 'react';
import { Button } from './Button';
import { formatPrice } from '../utils/formatters';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  Printer,
  FileText,
  AlertCircle,
  Package,
  Layers,
  Thermometer,
  Calendar,
  Info
} from 'lucide-react';

export const SeedPassport = ({ product }) => {
  if (!product) return null;

  // Local checklist state
  const [checklist, setChecklist] = useState({
    sealIntact: true,
    lotNumberPresent: true,
    packagingDateVerified: true,
    expiryDateValid: true,
    purityPercentageConfirmed: true,
    noTearsOrMoisture: false
  });

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecksPassed = Object.values(checklist).every(Boolean);

  // Sample batch / lot data generated consistently from product ID
  const lotNumber = `IN-LOT-${product.sku ? product.sku.replace('BB-', '') : product.id.toUpperCase()}-2026`;
  const packDate = '15-Jan-2026';
  const validUntil = '14-Jan-2028 (24 Months)';
  const testLab = 'Central State Seed Testing Laboratory (Notified Batch #441)';

  const handlePrintPassport = () => {
    window.print();
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      {/* Passport Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #E6E8DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#E8F5ED', color: '#226D3F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#226D3F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Standard Agronomic Passport
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
              Seed Quality Dossier & Batch Certificate
            </h3>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Printer}
          onClick={handlePrintPassport}
        >
          Print Passport & Checklist
        </Button>
      </div>

      {/* Distinction Badge Notice */}
      <div style={{ background: '#F8F7F0', border: '1px solid #E6E8DE', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#56685D', marginBottom: '1.5rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Info size={16} color="#84968C" style={{ flexShrink: 0 }} />
        <span>
          <strong>Transparency Notice:</strong> Verified specifications (Germination rate, purity, crop variety) are sourced from local research stock. Lot numbers and packaging test dates below are standardized sample demonstration data.
        </span>
      </div>

      {/* Two Column Layout: Passport Specs & Quality Inspection Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Product & Batch Passport Details */}
        <div style={{ background: '#FAF9F5', border: '1px solid #E6E8DE', borderRadius: '12px', padding: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173D2B', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Package size={17} color="#24563C" /> Official Batch Specifications
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Variety Name:</span>
              <strong style={{ color: '#173D2B' }}>{product.name}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Sample Lot / Batch Number:</span>
              <strong style={{ color: '#24563C', fontFamily: 'monospace' }}>{lotNumber}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Breeder / Source Entity:</span>
              <span>{product.brand || 'BeejBhandar Foundation Line'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Germination Minimum Guarantee:</span>
              <strong style={{ color: '#226D3F' }}>{product.germinationRate || '90%+ Certified'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Physical Purity:</span>
              <strong style={{ color: '#226D3F' }}>{product.purity || '99.0%'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Packaging Test Date:</span>
              <span>{packDate}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E6E8DE', paddingBottom: '5px' }}>
              <span style={{ color: '#84968C' }}>Viability Shelf Life:</span>
              <span>{validUntil}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#84968C' }}>Packaging Material Standard:</span>
              <span>Hermetic Foil Barrier (Moisture-Proof)</span>
            </div>
          </div>
        </div>

        {/* Right: User Quality Intake Checklist */}
        <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '12px', padding: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173D2B', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckSquare size={17} color="#226D3F" /> Recipient Quality Intake Checklist
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#56685D', margin: '0 0 1rem 0' }}>
            Perform these basic physical checks upon delivery before opening master foil seals:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { key: 'sealIntact', label: '1. Tamper-evident aluminum foil pouch is completely sealed' },
              { key: 'lotNumberPresent', label: '2. Batch / Lot number & certification code clearly legible' },
              { key: 'packagingDateVerified', label: '3. Packaging date & testing validity within 24 months' },
              { key: 'purityPercentageConfirmed', label: '4. Physical purity (98%+) & germination rate confirmed' },
              { key: 'expiryDateValid', label: '5. Sowing season window aligns with current sowing calendar' },
              { key: 'noTearsOrMoisture', label: '6. Outer packaging free from water ingress, tears or punctures' }
            ].map(item => (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  background: checklist[item.key] ? '#E8F5ED' : '#FAF9F5',
                  border: `1px solid ${checklist[item.key] ? '#A3D9B5' : '#E6E8DE'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: checklist[item.key] ? '#226D3F' : '#19271E',
                  fontWeight: checklist[item.key] ? 600 : 400
                }}
              >
                {checklist[item.key] ? (
                  <CheckSquare size={16} color="#226D3F" />
                ) : (
                  <Square size={16} color="#84968C" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #E6E8DE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#84968C' }}>Inspection Status:</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: allChecksPassed ? '#226D3F' : '#B45309' }}>
              {allChecksPassed ? '✓ 100% Verified Intake Passed' : 'In Progress (Pending checks)'}
            </span>
          </div>
        </div>
      </div>

      {/* Safe Storage Advisory Footer */}
      <div style={{ background: '#FAF9F5', border: '1px solid #E6E8DE', borderRadius: '10px', padding: '1rem', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Thermometer size={22} color="#C68A36" />
        <div style={{ flex: 1 }}>
          <strong style={{ fontSize: '0.85rem', color: '#173D2B', display: 'block' }}>Optimal Storage Protocol:</strong>
          <span style={{ fontSize: '0.78rem', color: '#56685D' }}>
            Store unopened seed pouches at 15°C – 18°C in relative humidity below 45%. Once seal is broken, preserve unused seeds in an airtight tin with a silica gel sachet to maintain germination vigor.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeedPassport;
