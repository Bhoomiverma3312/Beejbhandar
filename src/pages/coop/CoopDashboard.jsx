import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Package,
  FileText,
  Users,
  Layers,
  ShoppingBag,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingDown,
  ExternalLink,
  Printer
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { SeedProductCard } from '../../components/SeedProductCard';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { initialProducts } from '../../data/seedsData';

// Initial demo members list for the cooperative
const DEMO_MEMBERS = [
  { id: 'MEM-01', name: 'Gurpreet Singh', village: 'Samrala, Ludhiana', landAcres: 18, quotaKg: 250, status: 'Active' },
  { id: 'MEM-02', name: 'Harbhajan Lal', village: 'Machiwara, Ludhiana', landAcres: 12, quotaKg: 180, status: 'Active' },
  { id: 'MEM-03', name: 'Balwinder Kaur', village: 'Khanna, Ludhiana', landAcres: 24, quotaKg: 400, status: 'Active' },
  { id: 'MEM-04', name: 'Jaswant Sandhu', village: 'Doraha, Ludhiana', landAcres: 9, quotaKg: 120, status: 'Active' },
  { id: 'MEM-05', name: 'Sukhdev Verma', village: 'Sahnewal, Ludhiana', landAcres: 15, quotaKg: 220, status: 'Pending Review' }
];

export const CoopDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // RFQ Interactive State
  const [rfqItems, setRfqItems] = useState([
    { seedName: 'Sharbati Durum Wheat (PBW 550)', quantityKg: 500, deliveryDate: '2026-11-15' }
  ]);
  const [deliveryPincode, setDeliveryPincode] = useState('141001');
  const [remarks, setRemarks] = useState('Requires sealed moisture-proof 50kg master jute bags.');
  const [submittedRfq, setSubmittedRfq] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Members Management State
  const [members, setMembers] = useState(DEMO_MEMBERS);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberVillage, setNewMemberVillage] = useState('');
  const [newMemberAcres, setNewMemberAcres] = useState('');

  // Add item to RFQ
  const handleAddRfqItem = () => {
    setRfqItems([
      ...rfqItems,
      { seedName: 'Desi Mustard (Pusa Bold)', quantityKg: 100, deliveryDate: '2026-11-20' }
    ]);
  };

  // Remove item from RFQ
  const handleRemoveRfqItem = (index) => {
    if (rfqItems.length === 1) {
      showToast('At least one crop product is required in the quotation request.', 'warning');
      return;
    }
    setRfqItems(rfqItems.filter((_, i) => i !== index));
  };

  // Update RFQ item
  const handleUpdateRfqItem = (index, field, value) => {
    const updated = [...rfqItems];
    updated[index][field] = value;
    setRfqItems(updated);
  };

  // Submit RFQ Form
  const handleSubmitRfq = (e) => {
    e.preventDefault();
    const rfqNumber = `RFQ-COOP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newQuote = {
      id: rfqNumber,
      date: new Date().toLocaleDateString('en-IN'),
      society: user?.organization || 'Punjab Agri Cooperative Society Ltd.',
      contactPerson: user?.name || 'Authorized Secretary',
      items: rfqItems,
      deliveryPincode,
      remarks,
      indicativeTotal: rfqItems.reduce((acc, item) => acc + (Number(item.quantityKg) * 115), 0),
      status: 'Submitted for Breeder Review'
    };
    setSubmittedRfq(newQuote);
    showToast(`Quotation ${rfqNumber} generated! Awaiting depot confirmation.`, 'success');
  };

  // Add Member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newM = {
      id: `MEM-0${members.length + 1}`,
      name: newMemberName.trim(),
      village: newMemberVillage.trim() || 'Ludhiana Central',
      landAcres: Number(newMemberAcres) || 10,
      quotaKg: (Number(newMemberAcres) || 10) * 15,
      status: 'Active'
    };
    setMembers([...members, newM]);
    setNewMemberName('');
    setNewMemberVillage('');
    setNewMemberAcres('');
    showToast(`Member ${newM.name} added to society distribution register.`, 'success');
  };

  return (
    <DashboardLayout activeRole="coop">
      {/* 1. Cooperative Hero */}
      <section className="dashboard-hero" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #173D2B 100%)' }}>
        <span className="hero-tag" style={{ background: 'rgba(255,255,255,0.2)', color: '#FEF08A' }}>
          <Building2 size={15} /> Cooperative & Bulk Procurements Hub
        </span>
        <h1>{user?.organization || 'Punjab Agri Cooperative Society Ltd.'}</h1>
        <p>
          Managing collective agricultural inputs, centralized seed distribution, tiered bulk wholesale pricing,
          and formal Requests for Quotation (RFQ) for {members.length} registered member cultivators.
        </p>
        <div className="hero-actions">
          <a href="#rfq-form" className="hero-btn hero-btn-primary">
            <FileText size={17} />
            <span>Submit Bulk RFQ</span>
          </a>
          <a href="#bulk-catalog" className="hero-btn hero-btn-secondary">
            <Package size={17} />
            <span>Bulk Pricing Tiers</span>
          </a>
          <button 
            type="button" 
            className="hero-btn hero-btn-secondary"
            onClick={() => setInvoiceModalOpen(true)}
          >
            <Download size={17} />
            <span>Download Sample Statement</span>
          </button>
        </div>
      </section>

      {/* 2. Cooperative Stats */}
      <section className="metrics-grid" aria-label="Cooperative Operations Overview">
        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Active Quotations (RFQ)</span>
            <span className="metric-value">{submittedRfq ? 1 : 0}</span>
            <span className="metric-sub">Depot review within 24h</span>
          </div>
          <div className="metric-icon-wrap metric-blue">
            <FileText size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Registered Members</span>
            <span className="metric-value">{members.length} Farmers</span>
            <span className="metric-sub">Across 5 regional village blocks</span>
          </div>
          <div className="metric-icon-wrap metric-green">
            <Users size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Collective Demand</span>
            <span className="metric-value">1,170 Kg</span>
            <span className="metric-sub">Total seasonal allocation</span>
          </div>
          <div className="metric-icon-wrap metric-amber">
            <Package size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <span className="metric-label">Wholesale Discount</span>
            <span className="metric-value">Tier IV (32%)</span>
            <span className="metric-sub">Verified cooperative subsidy rate</span>
          </div>
          <div className="metric-icon-wrap metric-purple">
            <TrendingDown size={24} />
          </div>
        </div>
      </section>

      {/* 3. Quantity-based Bulk Pricing Tier Reference */}
      <section className="dashboard-panel" id="bulk-catalog">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Wholesale Volume Discount Tiers (Indicative)</h2>
            <p className="section-desc">Tiered price breaks for cooperative societies and farmer producer organizations (FPO)</p>
          </div>
        </div>

        <div className="bulk-tiers-grid">
          <div className="bulk-tier-box">
            <div className="bulk-tier-qty">Small Batch (10–49 Kg)</div>
            <div className="bulk-tier-disc">10% OFF</div>
            <div className="bulk-tier-note">Auto applied at cart</div>
          </div>
          <div className="bulk-tier-box">
            <div className="bulk-tier-qty">Medium Lot (50–99 Kg)</div>
            <div className="bulk-tier-disc">18% OFF</div>
            <div className="bulk-tier-note">Direct depot dispatch</div>
          </div>
          <div className="bulk-tier-box">
            <div className="bulk-tier-qty">Large Batch (100–499 Kg)</div>
            <div className="bulk-tier-disc">25% OFF</div>
            <div className="bulk-tier-note">Free freight logistics</div>
          </div>
          <div className="bulk-tier-box" style={{ background: '#E8F5ED', borderColor: '#226D3F' }}>
            <div className="bulk-tier-qty" style={{ color: '#226D3F', fontWeight: 700 }}>Mega Bulk (500 Kg+)</div>
            <div className="bulk-tier-disc">32% OFF</div>
            <div className="bulk-tier-note">Special breeder quotation</div>
          </div>
        </div>

        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.82rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>Important Procurement Notice:</strong> Indicative bulk rates are for estimation only. Confirmed pricing, genetic purity certificates, and delivery timelines are formalized upon RFQ quotation approval by the regional seed depot.
          </span>
        </div>
      </section>

      {/* 4. Request for Quotation (RFQ) Multi-Product Form */}
      <section className="dashboard-panel" id="rfq-form">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Request-For-Quotation (RFQ) Engine</h2>
            <p className="section-desc">Submit high-volume collective seed requirements to receive signed supply quotations</p>
          </div>
        </div>

        <div className="rfq-container">
          {/* RFQ Inputs Form */}
          <form onSubmit={handleSubmitRfq} className="rfq-form-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#173D2B' }}>
              Procurement Requisition Form
            </h3>

            <div className="rfq-form-group">
              <label>Organization / Society Name</label>
              <input
                type="text"
                className="rfq-input"
                value={user?.organization || 'Punjab Agri Cooperative Society Ltd.'}
                readOnly
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Crops & Estimated Tonnage:</label>
                <button
                  type="button"
                  onClick={handleAddRfqItem}
                  style={{ background: '#EEF4EB', border: '1px solid #24563C', color: '#24563C', borderRadius: '6px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={13} /> Add Crop
                </button>
              </div>

              {rfqItems.map((item, index) => (
                <div key={index} className="rfq-item-row">
                  <div>
                    <input
                      type="text"
                      className="rfq-input"
                      value={item.seedName}
                      onChange={(e) => handleUpdateRfqItem(index, 'seedName', e.target.value)}
                      placeholder="Seed Variety Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      className="rfq-input"
                      value={item.quantityKg}
                      onChange={(e) => handleUpdateRfqItem(index, 'quantityKg', e.target.value)}
                      placeholder="Kg"
                      min="10"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      className="rfq-input"
                      value={item.deliveryDate}
                      onChange={(e) => handleUpdateRfqItem(index, 'deliveryDate', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRfqItem(index)}
                    style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.2rem' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="rfq-form-group">
                <label>Depot Delivery PIN Code</label>
                <input
                  type="text"
                  className="rfq-input"
                  value={deliveryPincode}
                  onChange={(e) => setDeliveryPincode(e.target.value)}
                  placeholder="e.g. 141001"
                  required
                />
              </div>

              <div className="rfq-form-group">
                <label>Freight / Logistics Preference</label>
                <select className="rfq-select">
                  <option>Depot Doorstep Delivery (Trailer / Truck)</option>
                  <option>Self-Pickup from Regional Warehouse</option>
                  <option>Rail Freight Container Dispatch</option>
                </select>
              </div>
            </div>

            <div className="rfq-form-group">
              <label>Special Instructions / Packaging Requirements</label>
              <textarea
                className="rfq-textarea"
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. 50kg sealed bags with certified lot labels"
              />
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              style={{ background: '#1E3A8A' }}
            >
              <FileText size={17} />
              <span>Generate Official RFQ Quotation Request</span>
            </button>
          </form>

          {/* Live Quotation Summary Preview */}
          <div className="rfq-form-card" style={{ background: '#F8F7F0', border: '1px solid #CBD2C1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #CBD2C1', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: '#173D2B' }}>
                  {submittedRfq ? submittedRfq.id : 'DRAFT QUOTATION PREVIEW'}
                </strong>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#56685D' }}>
                  Cooperative Procurement Schedule • Indicative
                </p>
              </div>
              <span style={{ fontSize: '0.72rem', background: submittedRfq ? '#E8F5ED' : '#FEF3C7', color: submittedRfq ? '#226D3F' : '#B45309', padding: '0.25rem 0.6rem', borderRadius: '20px', fontWeight: 600 }}>
                {submittedRfq ? submittedRfq.status : 'Draft Pending Submission'}
              </span>
            </div>

            <table className="rfq-table-summary">
              <thead>
                <tr style={{ textAlign: 'left', color: '#56685D' }}>
                  <th>Crop Requested</th>
                  <th>Quantity</th>
                  <th>Est. Rate / Kg</th>
                  <th style={{ textAlign: 'right' }}>Est. Total</th>
                </tr>
              </thead>
              <tbody>
                {rfqItems.map((item, idx) => {
                  const estRate = 115;
                  const itemTotal = (Number(item.quantityKg) || 0) * estRate;
                  return (
                    <tr key={idx}>
                      <td><strong>{item.seedName || 'Crop'}</strong></td>
                      <td>{item.quantityKg} Kg</td>
                      <td>₹{estRate}</td>
                      <td style={{ textAlign: 'right' }}>₹{itemTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ borderTop: '2px dashed #CBD2C1', marginTop: '1rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Estimated Subtotal (Before 32% Subsidy):</span>
              <strong style={{ fontSize: '1.25rem', color: '#173D2B' }}>
                ₹{rfqItems.reduce((acc, it) => acc + ((Number(it.quantityKg) || 0) * 115), 0).toLocaleString('en-IN')}
              </strong>
            </div>

            {submittedRfq && (
              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #226D3F' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#226D3F', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={16} /> Requisition Logged Successfully
                </div>
                <p style={{ fontSize: '0.78rem', color: '#56685D', margin: 0 }}>
                  A certified BeejBhandar agronomist will review warehouse lot availability and issue a stamped commercial invoice with genetic purity test reports.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Member Societies & Farmer Allocation Management UI */}
      <section className="dashboard-panel" id="members">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Cooperative Member Farmers & Land Allotment</h2>
            <p className="section-desc">Manage regional farmer member quotas and seed distribution records</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table className="sowing-calendar-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Farmer Name</th>
                <th>Village Block</th>
                <th>Land Holding</th>
                <th>Assigned Seed Quota</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map((mem) => (
                <tr key={mem.id}>
                  <td><code>{mem.id}</code></td>
                  <td><strong>{mem.name}</strong></td>
                  <td>{mem.village}</td>
                  <td>{mem.landAcres} Acres</td>
                  <td>{mem.quotaKg} Kg</td>
                  <td>
                    <span style={{ fontSize: '0.72rem', background: '#E8F5ED', color: '#226D3F', padding: '0.2rem 0.5rem', borderRadius: '12px', fontWeight: 600 }}>
                      {mem.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Member Row */}
        <form onSubmit={handleAddMember} style={{ background: '#F8F7F0', padding: '1rem', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) auto', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="text"
            className="rfq-input"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Farmer Full Name"
            required
          />
          <input
            type="text"
            className="rfq-input"
            value={newMemberVillage}
            onChange={(e) => setNewMemberVillage(e.target.value)}
            placeholder="Village / Block"
          />
          <input
            type="number"
            className="rfq-input"
            value={newMemberAcres}
            onChange={(e) => setNewMemberAcres(e.target.value)}
            placeholder="Cultivated Acres"
            min="1"
          />
          <button
            type="submit"
            style={{ background: '#24563C', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus size={15} /> Add Member
          </button>
        </form>
      </section>

      {/* 6. Downloadable Invoice Modal (Demo statement) */}
      {invoiceModalOpen && (
        <div className="modal-overlay" onClick={() => setInvoiceModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Official Cooperative Procurement Summary (Demo)</h3>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setInvoiceModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E6E8DE', paddingBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: '#173D2B' }}>BeejBhandar Apex Seed Depot</h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#56685D' }}>Certified Foundation Seed Dispatch & Verification Division</p>
                <span style={{ fontSize: '0.7rem', color: '#84968C' }}>Document Ref: BB-STMT-2026-COOP-882</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                <div>
                  <strong>Issued To:</strong>
                  <p style={{ margin: '2px 0' }}>{user?.organization || 'Punjab Agri Cooperative Society Ltd.'}</p>
                  <p style={{ margin: 0, color: '#56685D' }}>District: Ludhiana, Punjab</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Billing Date:</strong>
                  <p style={{ margin: '2px 0' }}>{new Date().toLocaleDateString('en-IN')}</p>
                  <span style={{ color: '#226D3F', fontWeight: 600 }}>Status: Cooperative Verified</span>
                </div>
              </div>

              <table className="sowing-calendar-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th style={{ textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sharbati Durum Wheat PBW-550 (50kg bags)</td>
                    <td>10 Bags</td>
                    <td>₹2,800</td>
                    <td style={{ textAlign: 'right' }}>₹28,000</td>
                  </tr>
                  <tr>
                    <td>Pusa Mustard Certified Breeder Lot (10kg tins)</td>
                    <td>5 Tins</td>
                    <td>₹1,450</td>
                    <td style={{ textAlign: 'right' }}>₹7,250</td>
                  </tr>
                  <tr>
                    <td>Cooperative Volume Rebate (25%)</td>
                    <td>—</td>
                    <td>—</td>
                    <td style={{ textAlign: 'right', color: '#226D3F' }}>-₹8,812</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <strong style={{ fontSize: '1.2rem', color: '#173D2B' }}>Total Payable: ₹26,438</strong>
              </div>

              <p style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: '#84968C', fontStyle: 'italic', textAlign: 'center' }}>
                * Disclaimer: This is a front-end demonstration invoice statement. Commercial tax compliance requires backend ERP verification.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="topbar-action-btn"
                onClick={() => window.print()}
              >
                <Printer size={15} /> Print / Save PDF
              </button>
              <button
                type="button"
                className="topbar-action-btn primary"
                onClick={() => setInvoiceModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CoopDashboard;
