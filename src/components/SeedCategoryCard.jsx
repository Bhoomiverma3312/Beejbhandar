import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { initialProducts } from '../data/seedsData';

export const SeedCategoryCard = ({ category }) => {
  if (!category) return null;

  // Compute live available matching varieties count from catalog
  const matchingCount = useMemo(() => {
    const slug = (category.slug || category.id).toLowerCase();
    const name = category.name.toLowerCase();
    return initialProducts.filter(p => {
      const sub = (p.subCategory || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      const tags = (p.tags || []).map(t => t.toLowerCase());
      return sub.includes(slug) || sub.includes(name) || pName.includes(name) || tags.includes(slug) || tags.includes(name) || cat === slug;
    }).length;
  }, [category]);

  return ( 
    <Link 
      to={`/shop?category=${category.slug || category.id}`}
      className="seed-cat-card"
    >
      <div className="seed-cat-img-wrap">
        <ProductImage 
          src={category.image} 
          alt={category.name} 
          className="seed-cat-img"
          fallbackSrc="/images/category-placeholder.svg"
          loading="lazy"
        />
        {category.season && (
          <span className="seed-cat-badge">
            {category.season}
          </span>
        )}
      </div>

      <div className="seed-cat-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
          <h3 className="seed-cat-title" style={{ margin: 0 }}>{category.name}</h3>
          {matchingCount > 0 && (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#E8F5ED', color: '#226D3F', padding: '2px 7px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
              {matchingCount} in catalog
            </span>
          )}
        </div>
        {category.hindiName && (
          <span className="seed-cat-hindi">{category.hindiName}</span>
        )}
        <p className="seed-cat-desc">{category.shortDesc}</p>

        <div className="seed-cat-footer">
          <span>{category.cropType || 'Seed Variety'}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {category.roles?.includes('farmer') && <span title="Suitable for Farmers">🚜</span>}
            {category.roles?.includes('coop') && <span title="Bulk Cooperative Supply">🏢</span>}
            {category.roles?.includes('gardener') && <span title="Home Gardening">🪴</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeedCategoryCard;
