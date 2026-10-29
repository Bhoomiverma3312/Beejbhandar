import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { initialProducts } from '../data/seedsData';
import { handleCategoryError } from '../utils/imageFallback';

export const CategoryCard = ({ category }) => {
  if (!category) return null;

  // Compute live count from catalog
  const actualCount = useMemo(() => {
    const matching = initialProducts.filter(p => p.category === category.id || p.category === category.slug);
    return matching.length;
  }, [category.id, category.slug]);

  return (
    <Link
      to={`/shop?category=${category.slug || category.id}`}
      className="category-card"
      id={`cat-card-${category.id}`}
    >
      <div className="cat-card-image-wrap">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          onError={handleCategoryError}
        />
        {category.badge && (
          <span className="cat-badge">{category.badge}</span>
        )}
      </div>

      <div className="cat-card-content">
        <div className="cat-title-row">
          <h3 className="cat-title">{category.name}</h3>
          <ArrowUpRight size={16} className="cat-arrow" />
        </div>
        {category.hindiName && (
          <span className="cat-hindi-name">{category.hindiName}</span>
        )}
        <p className="cat-desc">{category.description}</p>
        <span className="cat-count-pill">{actualCount > 0 ? `${actualCount} Varieties` : category.count}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
