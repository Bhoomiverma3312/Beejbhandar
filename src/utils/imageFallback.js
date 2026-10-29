// Local verified SVG fallback asset for seed imagery
export const SEED_FALLBACK_IMAGE = '/images/seed-placeholder.svg';
export const CATEGORY_FALLBACK_IMAGE = '/images/category-placeholder.svg';

export const handleImageError = (e) => {
  if (e?.currentTarget && e.currentTarget.src !== SEED_FALLBACK_IMAGE) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = SEED_FALLBACK_IMAGE;
  }
};

export const handleCategoryError = (e) => {
  if (e?.currentTarget && e.currentTarget.src !== CATEGORY_FALLBACK_IMAGE) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = CATEGORY_FALLBACK_IMAGE;
  }
};

export default handleImageError;
