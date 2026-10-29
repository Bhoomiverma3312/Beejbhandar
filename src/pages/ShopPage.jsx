import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initialProducts, categories } from '../data/seedsData';
import { seedCategories } from '../data/seedCategories';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/formatters';
import {
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowUpDown
} from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Price boundaries calculated from catalog
  const priceLimits = useMemo(() => {
    const prices = initialProducts.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Filter States initialized from URL params where available
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSeason, setSelectedSeason] = useState(searchParams.get('season') || 'all');
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice')) || priceLimits.min);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || priceLimits.max);
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStock') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popularity');

  // Pagination & Loading States
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize state when URL query parameters change externally
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    setSelectedSeason(searchParams.get('season') || 'all');
    setSortBy(searchParams.get('sort') || 'popularity');
    setInStockOnly(searchParams.get('inStock') === 'true');
    if (searchParams.get('minPrice')) setMinPrice(Number(searchParams.get('minPrice')));
    if (searchParams.get('maxPrice')) setMaxPrice(Number(searchParams.get('maxPrice')));
    setCurrentPage(1);
  }, [searchParams]);

  // Update URL search parameters whenever filters change
  const updateUrlParams = useCallback(
    (updates) => {
      setIsFiltering(true);
      setCurrentPage(1);
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === undefined || val === '' || val === 'all' || val === false) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(val));
        }
      });

      setSearchParams(newParams, { replace: true });
      setTimeout(() => setIsFiltering(false), 120);
    },
    [searchParams, setSearchParams]
  );

  // Filter handlers
  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    updateUrlParams({ category: catSlug });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateUrlParams({ search: query.trim() });
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
    updateUrlParams({ season });
  };

  const handleMinPriceChange = (val) => {
    const num = Number(val);
    setMinPrice(num);
    updateUrlParams({ minPrice: num > priceLimits.min ? num : null });
  };

  const handleMaxPriceChange = (val) => {
    const num = Number(val);
    setMaxPrice(num);
    updateUrlParams({ maxPrice: num < priceLimits.max ? num : null });
  };

  const handleStockToggle = (checked) => {
    setInStockOnly(checked);
    updateUrlParams({ inStock: checked ? 'true' : null });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    updateUrlParams({ sort: val });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSeason('all');
    setMinPrice(priceLimits.min);
    setMaxPrice(priceLimits.max);
    setInStockOnly(false);
    setSortBy('popularity');
    setCurrentPage(1);
    setSearchParams({});
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 120);
  };

  // Helper to resolve active category object (from primary categories or 85 subcategories)
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return null;
    const catMatch = categories.find((c) => c.id === selectedCategory || c.slug === selectedCategory);
    if (catMatch) return catMatch;
    const subMatch = seedCategories.find((sc) => sc.id === selectedCategory || sc.slug === selectedCategory);
    if (subMatch) return subMatch;
    return null;
  }, [selectedCategory]);

  // Dynamic count of products per category
  const categoryCounts = useMemo(() => {
    const counts = { all: initialProducts.length };
    categories.forEach((cat) => {
      counts[cat.id] = initialProducts.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, []);

  // Multi-facet filtering logic
  const filteredProducts = useMemo(() => {
    const collection = searchParams.get('collection');
    return initialProducts.filter((product) => {
      // 0. Collection Filter (featured / bestseller quick-pills)
      if (collection === 'featured' && !product.isFeatured) return false;
      if (collection === 'bestseller' && !(product.isBestseller || product.isBestSeller)) return false;

      // 1. Category Filter (Matches broad category or specific subcategory slug/id)
      if (selectedCategory !== 'all') {
        const selLower = selectedCategory.toLowerCase().trim();
        const prodCat = (product.category || '').toLowerCase();
        const prodSub = (product.subCategory || '').toLowerCase();
        const prodName = (product.name || '').toLowerCase();
        const prodShort = (product.shortName || '').toLowerCase();
        const prodHindi = (product.hindiName || '').toLowerCase();
        const prodTags = (product.tags || []).map(t => t.toLowerCase());

        // Check if selectedCategory directly equals product category
        const directCatMatch = prodCat === selLower;

        // Check subcategory match or seedCategories match
        const matchedSubcat = seedCategories.find(
          (sc) => sc.id.toLowerCase() === selLower || sc.slug.toLowerCase() === selLower
        );

        let subcatMatch = false;
        if (matchedSubcat) {
          const subName = matchedSubcat.name.toLowerCase();
          const subSlug = matchedSubcat.slug.toLowerCase();
          const subHindi = (matchedSubcat.hindiName || '').toLowerCase();

          subcatMatch =
            prodSub.includes(subName) ||
            prodSub.includes(subSlug) ||
            prodTags.some(t => t.includes(subName) || t.includes(subSlug) || subName.includes(t)) ||
            prodName.includes(subName) ||
            prodShort.includes(subName) ||
            (subHindi && prodHindi.includes(subHindi));

          // If no specific variety matched yet, fall back to parent category match if available
          if (!subcatMatch && matchedSubcat.parentId) {
            const parentKey = matchedSubcat.parentId === 'field-crop' ? 'grain' : matchedSubcat.parentId === 'herb' || matchedSubcat.parentId === 'specialty' ? 'vegetable' : matchedSubcat.parentId;
            if (prodCat === parentKey || prodCat === matchedSubcat.parentId) {
              subcatMatch = true;
            }
          }
        } else {
          // General match against subcategory string or tags
          subcatMatch = prodSub.includes(selLower) || prodTags.some(t => t.includes(selLower)) || prodName.includes(selLower);
        }

        if (!directCatMatch && !subcatMatch) {
          return false;
        }
      }

      // 2. Season Filter
      if (selectedSeason !== 'all') {
        const seasonMatch = (product.season || '').toLowerCase().includes(selectedSeason.toLowerCase());
        if (!seasonMatch) return false;
      }

      // 3. In-Stock Filter
      if (inStockOnly && (!product.inStock || product.stock <= 0)) {
        return false;
      }

      // 4. Price Filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // 5. Search Query Filter (Matches Name, Variety, Hindi name, Crop/Category, Description, Tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchShort = product.shortName?.toLowerCase().includes(q);
        const matchVariety = product.variety?.toLowerCase().includes(q);
        const matchHindi = product.hindiName?.toLowerCase().includes(q);
        const matchCrop = product.categoryName?.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchBrand = product.brand?.toLowerCase().includes(q);
        const matchTags = product.tags?.some(t => t.toLowerCase().includes(q));

        if (!matchName && !matchShort && !matchVariety && !matchHindi && !matchCrop && !matchDesc && !matchBrand && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedSeason, inStockOnly, minPrice, maxPrice, searchQuery, searchParams]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'popularity' default: bestsellers & featured first
      const aScore = (a.isBestseller ? 2 : 0) + (a.isFeatured ? 1 : 0);
      const bScore = (b.isBestseller ? 2 : 0) + (b.isFeatured ? 1 : 0);
      if (bScore !== aScore) return bScore - aScore;
      return b.rating - a.rating;
    });
  }, [filteredProducts, sortBy]);

  // Pagination calculation
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSeason !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice > priceLimits.min || maxPrice < priceLimits.max ? 1 : 0);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="shop-page section-py">
      <div className="container">
        {/* Header Section */}
        <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
          <span className="section-subtitle">Certified Indian Seed Catalog</span>
          <h1 className="section-title">Shop All Seed Varieties</h1>
          <p className="section-desc">
            Browse {initialProducts.length}+ laboratory-tested seed varieties across all 7 essential Indian agricultural categories. Authentic foundation lines, certified germination, and doorstep delivery.
          </p>
        </div>

        {/* Global Search Bar */}
        <div style={{ marginBottom: 'var(--space-md)', maxWidth: '640px' }}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by variety name, crop, Hindi keyword (e.g. Tomato, Sarson, Wheat, Berseem)..."
          />
        </div>

        {/* Featured & Bestseller Quick Highlights */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
          <button
            type="button"
            className={`btn btn-sm ${!searchParams.get('collection') ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => {
              updateUrlParams({ collection: null });
              setCurrentPage(1);
            }}
          >
            All Seeds ({initialProducts.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${searchParams.get('collection') === 'featured' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              updateUrlParams({ collection: 'featured' });
              setCurrentPage(1);
            }}
          >
            ★ Featured Varieties ({initialProducts.filter(p => p.isFeatured).length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${searchParams.get('collection') === 'bestseller' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => {
              updateUrlParams({ collection: 'bestseller' });
              setCurrentPage(1);
            }}
          >
            🔥 Best-Selling Seeds ({initialProducts.filter(p => p.isBestseller || p.isBestSeller).length})
          </button>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="active-filters-bar" role="region" aria-label="Active filters">
            <span className="active-filters-label">Active Filters:</span>

            {selectedCategory !== 'all' && (
              <span className="filter-chip">
                <span>Category: {activeCategoryObj?.name || selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="filter-chip-remove"
                  aria-label="Remove category filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="filter-chip">
                <span>Keyword: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="filter-chip-remove"
                  aria-label="Remove search filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            {selectedSeason !== 'all' && (
              <span className="filter-chip">
                <span>Season: {selectedSeason}</span>
                <button
                  type="button"
                  onClick={() => handleSeasonSelect('all')}
                  className="filter-chip-remove"
                  aria-label="Remove season filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            {(minPrice > priceLimits.min || maxPrice < priceLimits.max) && (
              <span className="filter-chip">
                <span>Price: {formatPrice(minPrice)} – {formatPrice(maxPrice)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMinPrice(priceLimits.min);
                    setMaxPrice(priceLimits.max);
                    updateUrlParams({ minPrice: null, maxPrice: null });
                  }}
                  className="filter-chip-remove"
                  aria-label="Reset price filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="filter-chip">
                <span>In Stock Only</span>
                <button
                  type="button"
                  onClick={() => handleStockToggle(false)}
                  className="filter-chip-remove"
                  aria-label="Remove in-stock filter"
                >
                  <X size={13} />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="clear-all-chips-btn"
            >
              Clear All ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* Mobile Filter Toggle Button */}
        <div className="mobile-filter-toggle-row" style={{ display: 'none', marginBottom: '1rem' }}>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            icon={SlidersHorizontal}
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            {mobileFilterOpen ? 'Hide Filters' : `Filters & Refinements (${activeFiltersCount})`}
          </Button>
        </div>

        {/* Main Shop Grid & Sidebar Layout */}
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`} aria-label="Seed Catalog Filters">
            <div className="sidebar-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                <SlidersHorizontal size={16} />
                <span>Filter Seeds</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  title="Reset all filters"
                >
                  <RotateCcw size={12} />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div className="filter-group">
              <h3 className="filter-title">Crop Category</h3>
              <div className="filter-options">
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategorySelect('all')}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{categoryCounts.all}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`filter-option-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{categoryCounts[cat.id] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Filter (Min & Max Range) */}
            <div className="filter-group">
              <h3 className="filter-title">Price Range (INR)</h3>
              <div className="price-filter-box">
                <div className="price-inputs-row">
                  <div className="price-input-field">
                    <span className="price-currency-symbol">₹</span>
                    <input
                      type="number"
                      min={priceLimits.min}
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      className="price-input"
                      aria-label="Minimum price in Rupees"
                    />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>to</span>
                  <div className="price-input-field">
                    <span className="price-currency-symbol">₹</span>
                    <input
                      type="number"
                      min={minPrice}
                      max={priceLimits.max}
                      value={maxPrice}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      className="price-input"
                      aria-label="Maximum price in Rupees"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  value={maxPrice}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="price-slider-track"
                  aria-label="Maximum price slider"
                />
                <div className="price-slider-labels">
                  <span>Min: {formatPrice(priceLimits.min)}</span>
                  <span>Max: {formatPrice(priceLimits.max)}</span>
                </div>
              </div>
            </div>

            {/* 3. Availability Filter (In-Stock Only) */}
            <div className="filter-group">
              <h3 className="filter-title">Availability</h3>
              <label className="stock-toggle-label">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => handleStockToggle(e.target.checked)}
                  className="stock-toggle-checkbox"
                />
              </label>
            </div>

            {/* 4. Sowing Season Filter */}
            <div className="filter-group">
              <h3 className="filter-title">Sowing Season</h3>
              <div className="filter-options">
                {['all', 'Kharif', 'Rabi', 'Summer', 'All Season'].map((season) => (
                  <button
                    key={season}
                    type="button"
                    className={`filter-option-btn ${selectedSeason === season ? 'active' : ''}`}
                    onClick={() => handleSeasonSelect(season)}
                  >
                    <span>{season === 'all' ? 'All Seasons' : season}</span>
                    {selectedSeason === season && <Check size={14} color="var(--color-primary)" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Seed Quality Assurance Note */}
            <div style={{ padding: '0.85rem', background: 'var(--bg-sage-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--bg-sage)' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>
                Germination Guarantee
              </strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                All 30+ seed varieties carry 90%+ lab germination and true-to-type physical purity certification.
              </p>
            </div>
          </aside>

          {/* Product Listing Main Area */}
          <main className="shop-content">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="results-count">
                Showing <strong>{filteredProducts.length > 0 ? startIndex + 1 : 0} – {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</strong> of <strong>{totalItems}</strong> varieties
                {selectedCategory !== 'all' && ` in ${categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </div>

              <div className="sort-select-wrap">
                <label htmlFor="shop-sort-select" style={{ color: 'var(--text-secondary)' }}>
                  <ArrowUpDown size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  Sort by:
                </label>
                <select
                  id="shop-sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="form-select"
                  style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                >
                  <option value="popularity">Popularity / Bestsellers</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products Grid or Empty / Loading State */}
            {isFiltering ? (
              <LoadingState message="Updating seed catalog filters..." count={6} />
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="products-grid">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination-wrapper" role="navigation" aria-label="Catalog Pagination">
                    <div className="pagination-controls">
                      <button
                        type="button"
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous Page"
                      >
                        <ChevronLeft size={16} />
                        <span>Prev</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next Page"
                      >
                        <span>Next</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="pagination-info-text">
                      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> • Total <strong>{totalItems}</strong> varieties
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No seed varieties match your criteria"
                description={`We couldn't find any seeds matching your active filter criteria (${searchQuery ? `"${searchQuery}", ` : ''}${selectedCategory !== 'all' ? `Category: ${activeCategoryObj?.name || selectedCategory}, ` : ''}Price: ${formatPrice(minPrice)}–${formatPrice(maxPrice)}${inStockOnly ? ', In Stock Only' : ''}).`}
                actionText="Reset All Filters"
                onActionClick={handleResetFilters}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
