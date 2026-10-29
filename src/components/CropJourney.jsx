import React, { useState, useEffect } from 'react';
import { initialProducts } from '../data/seedsData';
import { Button } from './Button';
import { useToast } from '../context/ToastContext';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Sprout,
  Edit2,
  AlertCircle,
  Download,
  Info
} from 'lucide-react';

const CROP_JOURNEY_STORAGE_KEY = 'beejbhandar_crop_journey_v1';

// Initial demo plans
const DEFAULT_PLANS = [
  {
    id: 'plan-demo-01',
    cropName: 'Kharif Basmati Rice (PB 1121)',
    productId: 'seed-cat-063',
    sowingDate: '2026-06-15',
    area: '4 Acres',
    notes: 'Pre-treated with Trichoderma viride. Main field green manured with Dhaincha.',
    tasks: [
      { id: 't1', title: 'Prepare nursery bed & apply well-rotted FYM', dayOffset: -5, done: true },
      { id: 't2', title: 'Seed soaking & bio-fertilizer treatment', dayOffset: 0, done: true },
      { id: 't3', title: 'Nursery sowing & initial gentle flooding', dayOffset: 1, done: true },
      { id: 't4', title: 'Transplant 25-day old seedlings into puddled field', dayOffset: 25, done: false },
      { id: 't5', title: 'First top dressing (Urea & Zinc Sulphate)', dayOffset: 45, done: false },
      { id: 't6', title: 'Panicle initiation stage water management', dayOffset: 75, done: false },
      { id: 't7', title: 'Pre-harvest drainage & grain maturity inspection', dayOffset: 120, done: false }
    ]
  },
  {
    id: 'plan-demo-02',
    cropName: 'Terrace Cherry Tomato & Salad Pot Mix',
    productId: 'seed-home-balcony-tomato',
    sowingDate: '2026-10-10',
    area: '6 Balcony Pots (12-inch)',
    notes: 'Mixed 50% cocopeat + 30% vermicompost + 20% soil with neem cake.',
    tasks: [
      { id: 't1', title: 'Sow seeds in 50-cell plug tray under bright shade', dayOffset: 0, done: true },
      { id: 't2', title: 'Check germination & introduce to 4h morning sun', dayOffset: 6, done: true },
      { id: 't3', title: 'Transplant into individual 12-inch hanging baskets', dayOffset: 22, done: false },
      { id: 't4', title: 'Feed with seaweed extract & vermicompost tea', dayOffset: 40, done: false },
      { id: 't5', title: 'First ripe cherry tomato harvest', dayOffset: 65, done: false }
    ]
  }
];

export const CropJourney = () => {
  const { showToast } = useToast();

  const [plans, setPlans] = useState(() => {
    try {
      const stored = localStorage.getItem(CROP_JOURNEY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PLANS;
    } catch {
      return DEFAULT_PLANS;
    }
  });

  const [activePlanId, setActivePlanId] = useState(() => plans[0]?.id || null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New plan form state
  const [newCropName, setNewCropName] = useState('');
  const [newProductId, setNewProductId] = useState(initialProducts[0]?.id || '');
  const [newSowingDate, setNewSowingDate] = useState(new Date().toISOString().split('T')[0]);
  const [newArea, setNewArea] = useState('1 Acre');
  const [newNotes, setNewNotes] = useState('');

  // Persist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CROP_JOURNEY_STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {
      console.error('Failed to save crop journey', e);
    }
  }, [plans]);

  const activePlan = plans.find(p => p.id === activePlanId) || plans[0] || null;

  // Toggle task complete
  const handleToggleTask = (planId, taskId) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
      };
    }));
  };

  // Add new plan
  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const selectedProduct = initialProducts.find(p => p.id === newProductId);
    const harvestDays = parseInt(selectedProduct?.harvestTime) || 90;

    // Standard agronomic task template
    const generatedTasks = [
      { id: 't1', title: 'Soil Tilth & Organic Manure Preparation', dayOffset: -5, done: false },
      { id: 't2', title: 'Seed Treatment (Trichoderma / Bio-fertilizer)', dayOffset: 0, done: false },
      { id: 't3', title: 'Sowing / Seedbed Broadcasting', dayOffset: 1, done: false },
      { id: 't4', title: 'First Critical Irrigation & Thinning', dayOffset: Math.round(harvestDays * 0.2), done: false },
      { id: 't5', title: 'Weed Management & Nutritional Top Dressing', dayOffset: Math.round(harvestDays * 0.45), done: false },
      { id: 't6', title: 'Flowering Stage Moisture Monitoring', dayOffset: Math.round(harvestDays * 0.7), done: false },
      { id: 't7', title: 'Crop Maturity & Harvesting', dayOffset: harvestDays, done: false }
    ];

    const newPlan = {
      id: `plan-${Date.now()}`,
      cropName: newCropName.trim(),
      productId: newProductId,
      sowingDate: newSowingDate,
      area: newArea.trim() || '1 Acre',
      notes: newNotes.trim() || 'Cultivated with certified BeejBhandar foundation seed.',
      tasks: generatedTasks
    };

    setPlans([newPlan, ...plans]);
    setActivePlanId(newPlan.id);
    setShowAddModal(false);
    showToast(`Created new crop journey plan for ${newPlan.cropName}`);

    // Reset form
    setNewCropName('');
    setNewNotes('');
  };

  // Delete plan
  const handleDeletePlan = (planId) => {
    if (plans.length <= 1) {
      showToast('You must keep at least one crop plan.', 'error');
      return;
    }
    const updated = plans.filter(p => p.id !== planId);
    setPlans(updated);
    setActivePlanId(updated[0]?.id || null);
    showToast('Crop plan removed.');
  };

  // Printable Summary
  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #CBD2C1', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(23,61,43,0.05)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E6E8DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#EEF4EB', color: '#24563C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', margin: 0 }}>
              My Crop Journey & Sowing Timeline
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#56685D' }}>
              Track farm & garden milestones, mark completed agronomic tasks, and save crop plans in LocalStorage
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handlePrintSummary}
          >
            Print Timeline
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setShowAddModal(true)}
          >
            New Crop Plan
          </Button>
        </div>
      </div>

      {/* Plan Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {plans.map(p => {
          const completedTasks = p.tasks.filter(t => t.done).length;
          const progressPct = Math.round((completedTasks / p.tasks.length) * 100);
          const isActive = p.id === activePlan?.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePlanId(p.id)}
              style={{
                background: isActive ? '#24563C' : '#FAF9F5',
                color: isActive ? '#FFFFFF' : '#19271E',
                border: `1px solid ${isActive ? '#24563C' : '#CBD2C1'}`,
                borderRadius: '10px',
                padding: '0.65rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: '220px',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.cropName}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', opacity: 0.85 }}>
                <span>{p.area} • Sown {p.sowingDate}</span>
                <span>{progressPct}% Done</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Plan Detail & Interactive Timeline */}
      {activePlan && (
        <div>
          {/* Plan Info Card */}
          <div style={{ background: '#FAF9F5', border: '1px solid #E6E8DE', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#173D2B', margin: '0 0 4px 0' }}>
                  {activePlan.cropName}
                </h4>
                <span style={{ fontSize: '0.82rem', color: '#56685D' }}>
                  Cultivating Area: <strong>{activePlan.area}</strong> • Sowing Date: <strong>{activePlan.sowingDate}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDeletePlan(activePlan.id)}
                style={{ background: 'transparent', border: 'none', color: '#BE2828', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={14} /> Remove Plan
              </button>
            </div>

            {activePlan.notes && (
              <p style={{ fontSize: '0.85rem', color: '#56685D', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>
                "{activePlan.notes}"
              </p>
            )}

            {/* In-app reminder notice */}
            <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: '#1D5E79', background: '#E0F2FE', padding: '3px 8px', borderRadius: '12px' }}>
              <Clock size={12} />
              <span>In-App Timeline Reminders (Logged in browser session & LocalStorage)</span>
            </div>
          </div>

          {/* Timeline Tasks List */}
          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#173D2B', margin: '0 0 1rem 0' }}>
              Milestones & Scheduled Agronomy Actions ({activePlan.tasks.filter(t => t.done).length}/{activePlan.tasks.length} Completed):
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {activePlan.tasks.map((task) => {
                const targetDate = new Date(activePlan.sowingDate);
                targetDate.setDate(targetDate.getDate() + task.dayOffset);
                const dateStr = targetDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

                return (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(activePlan.id, task.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      background: task.done ? '#E8F5ED' : '#FFFFFF',
                      border: `1px solid ${task.done ? '#A3D9B5' : '#E6E8DE'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {task.done ? (
                        <CheckCircle2 size={18} color="#226D3F" />
                      ) : (
                        <Circle size={18} color="#84968C" />
                      )}
                      <div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: task.done ? '#226D3F' : '#19271E', textDecoration: task.done ? 'line-through' : 'none' }}>
                          {task.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#84968C', display: 'block' }}>
                          Day {task.dayOffset >= 0 ? `+${task.dayOffset}` : task.dayOffset} ({dateStr})
                        </span>
                      </div>
                    </div>

                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: task.done ? '#226D3F' : '#84968C' }}>
                      {task.done ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Crop Plan */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '1.75rem', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#173D2B', margin: '0 0 1.25rem 0' }}>
              Create New Crop Plan
            </h4>

            <form onSubmit={handleCreatePlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#173D2B', marginBottom: '4px' }}>
                  Crop & Variety Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  placeholder="e.g. Sharbati Wheat (HD-2967) / Summer Okra"
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#173D2B', marginBottom: '4px' }}>
                    Sowing Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newSowingDate}
                    onChange={(e) => setNewSowingDate(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#173D2B', marginBottom: '4px' }}>
                    Growing Area / Scale
                  </label>
                  <input
                    type="text"
                    required
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="e.g. 2 Acres / 8 Pots"
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#173D2B', marginBottom: '4px' }}>
                  Associated Seed Product
                </label>
                <select
                  value={newProductId}
                  onChange={(e) => setNewProductId(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.82rem', background: '#FFFFFF' }}
                >
                  {initialProducts.slice(0, 60).map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#173D2B', marginBottom: '4px' }}>
                  Field Notes & Cultural Practices
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Soil pH 6.8, seed treated with Trichoderma, 3 planned irrigations."
                  style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD2C1', borderRadius: '8px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Crop Journey
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropJourney;
