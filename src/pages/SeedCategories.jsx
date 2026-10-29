import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Search, Filter, Sprout, ArrowLeft } from 'lucide-react';
import { PARENT_CATEGORIES, seedCategories } from '../data/seedCategories';
import { SeedCategoryCard } from '../components/SeedCategoryCard';

export const SeedCategories = () => {
  const [selectedParent, setSelectedParent] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return seedCategories.filter((cat) => {
      // Parent category filter
      if (selectedParent !== 'all' && cat.parentId !== selectedParent) {
        return false;
      }
      // Role filter
      if (selectedRole !== 'all' && !cat.roles?.includes(selectedRole)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = cat.name.toLowerCase().includes(q);
        const matchesHindi = cat.hindiName && cat.hindiName.includes(q);
        const matchesDesc = cat.shortDesc && cat.shortDesc.toLowerCase().includes(q);
        if (!matchesName && !matchesHindi && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedParent, selectedRole, searchQuery]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4EB', color: '#24563C', padding: '0.35rem 0.85rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Layers size={15} />
          <span>Complete Agricultural Taxonomy</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 700, color: '#173D2B', margin: '0 0 0.5rem 0' }}>
          85 Distinct Seed Subcategories
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', color: '#56685D' }}>
          Explore our complete verified repository of vegetable, fruit, field crop, pulse, cereal, flower, herbal, and specialty gardening seeds.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E6E8DE', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#84968C' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category (e.g. Tomato, Wheat, Basil, लौकी)..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                border: '1px solid #CBD2C1',
                borderRadius: '8px',
                fontSize: '0.88rem',
                background: '#FFFFFF'
              }}
            />
          </div>

          {/* Role Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#56685D', whiteSpace: 'nowrap' }}>Target Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                border: '1px solid #CBD2C1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                background: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Roles (Universal)</option>
              <option value="farmer">🚜 Commercial Farmers</option>
              <option value="coop">🏢 Cooperatives & Bulk FPOs</option>
              <option value="gardener">🪴 Home & Terrace Gardeners</option>
            </select>
          </div>
        </div>

        {/* Parent Category Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #E6E8DE' }}>
          <button
            type="button"
            onClick={() => setSelectedParent('all')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1px solid ${selectedParent === 'all' ? '#24563C' : '#CBD2C1'}`,
              background: selectedParent === 'all' ? '#24563C' : '#FFFFFF',
              color: selectedParent === 'all' ? '#FFFFFF' : '#19271E',
              transition: 'all 0.2s'
            }}
          >
            All Parents ({seedCategories.length})
          </button>
          {PARENT_CATEGORIES.map((p) => {
            const count = seedCategories.filter(c => c.parentId === p.id).length;
            const isSelected = selectedParent === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedParent(p.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? p.color || '#24563C' : '#CBD2C1'}`,
                  background: isSelected ? p.color || '#24563C' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#19271E',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s'
                }}
              >
                <span>{p.icon}</span>
                <span>{p.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#56685D' }}>
          Showing <strong>{filteredCategories.length}</strong> matching seed subcategories
        </p>
        {(selectedParent !== 'all' || selectedRole !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => { setSelectedParent('all'); setSelectedRole('all'); setSearchQuery(''); }}
            style={{ background: 'transparent', border: 'none', color: '#BE2828', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filteredCategories.map((cat) => (
            <SeedCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E6E8DE' }}>
          <Sprout size={48} style={{ color: '#84968C', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#173D2B', marginBottom: '0.5rem' }}>No Categories Match Your Filters</h3>
          <p style={{ fontSize: '0.85rem', color: '#56685D', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Try adjusting your search query or selecting "All Parents" to see all 85 seed varieties.
          </p>
          <button
            type="button"
            onClick={() => { setSelectedParent('all'); setSelectedRole('all'); setSearchQuery(''); }}
            style={{ background: '#24563C', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1.25rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SeedCategories;
