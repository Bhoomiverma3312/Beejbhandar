import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { initialProducts } from '../data/seedsData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import { ProductImage } from '../components/ProductImage';
import { SeedPassport } from '../components/SeedPassport';

import {
  Heart,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  ChevronRight,
  ArrowLeft,
  Ban,
  Zap,
  Sun,
  Droplets,
  Ruler,
  ThermometerSun,
  Calendar,
  Send,
  User,
  MessageSquare
} from 'lucide-react';

/* ---------- Demo Gallery Images ---------- */
const GALLERY_VARIANTS = [
  { label: 'Product', suffix: '' },
  { label: 'Field View', suffix: '&sat=30&bri=5' },
  { label: 'Close Up', suffix: '&blur=1&w=600' },
  { label: 'Harvest', suffix: '&flip=h&w=600' }
];

/* ---------- Demo Reviews ---------- */
const generateDemoReviews = (product) => [
  {
    id: 'rev-1',
    name: 'Rajesh Kumar',
    location: 'Lucknow, UP',
    rating: 5,
    date: '12 Sep 2026',
    title: 'Excellent germination rate!',
    comment: `Very satisfied with ${product.shortName || product.name}. Got almost 95% germination in my nursery beds. Great quality seeds from BeejBhandar.`,
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Sunita Devi',
    location: 'Jaipur, Rajasthan',
    rating: 4,
    date: '28 Aug 2026',
    title: 'Good quality, fast delivery',
    comment: 'Seeds arrived well-packed in sealed pouches. Sowed them last week and can already see healthy sprouts. Will order again for next season.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Prakash Patel',
    location: 'Anand, Gujarat',
    rating: 5,
    date: '15 Jul 2026',
    title: 'Best variety for our climate',
    comment: `This ${product.variety} variety performed exceptionally well in our summer heat. Yield was better than what we used from the local market last year.`,
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Meena Sharma',
    location: 'Indore, MP',
    rating: 4,
    date: '03 Jun 2026',
    title: 'Healthy plants, good harvest',
    comment: 'Used this for my kitchen garden. Very easy to grow with the instructions provided. The harvest was plentiful and the taste was excellent.',
    verified: false
  }
];

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = initialProducts.find((p) => p.id === id || p.slug === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, title: '', comment: '' });

  useEffect(() => {
    if (product) {
      const sizes = product.packageSizes || product.packSizes || [];
      setSelectedSize(sizes[0] || { size: 'Standard Pack', price: product.price });
      setQuantity(1);
      setActiveGalleryIdx(0);
      setActiveTab('description');
      setReviews(generateDemoReviews(product));
      setShowReviewForm(false);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  /* Gallery images: use product.images array if available, otherwise derive from image URL */
  const galleryImages = useMemo(() => {
    if (!product) return [];
    // New products have an images array with {url, alt}
    if (product.images && product.images.length > 0) {
      return product.images.map((img) => ({ label: img.alt || product.name, src: img.url }));
    }
    // Fallback: build variants from the base image URL
    const base = product.image || '';
    return GALLERY_VARIANTS.map((v, i) => ({
      label: v.label,
      src: i === 0 ? base : `${base}${v.suffix}`
    }));
  }, [product]);

  if (!product) {
    return (
      <div className="container section-py text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Seed Variety Not Found</h2>
        <p style={{ margin: '1rem 0' }}>The requested seed variety could not be found or may have been retired.</p>
        <Link to="/shop">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const isOutOfStock = !product.inStock || product.stock <= 0;
  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedSize?.price || product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const success = addToCart(product, selectedSize, quantity);
    if (success !== false) {
      navigate('/checkout');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      showToast('Please fill in your name and comment.', 'error');
      return;
    }
    const newReview = {
      id: `rev-user-${Date.now()}`,
      name: reviewForm.name.trim(),
      location: 'India',
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: reviewForm.title.trim() || 'My Review',
      comment: reviewForm.comment.trim(),
      verified: false
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ name: '', rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
    showToast('Thank you! Your demo review has been submitted.', 'success');
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  const relatedProducts = initialProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // import { SeedPassport } from '../components/SeedPassport';

  const TABS = [
    { key: 'description', label: 'Description' },
    { key: 'specs', label: 'Seed Specs' },
    { key: 'passport', label: 'Seed Passport & Intake' },
    { key: 'sowing', label: 'Sowing Guide' },
    { key: 'tips', label: 'Growing Tips' },
    { key: 'reviews', label: `Reviews (${reviews.length})` }
  ];

  const renderStars = (rating, size = 14) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.round(rating) ? '#C68A36' : 'none'}
        color={i < Math.round(rating) ? '#C68A36' : '#ccc'}
      />
    ));
  };

  return (
    <div className="product-details-page section-py">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop Seeds</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">{product.shortName || product.name}</span>
        </nav>

        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="pdp-back-link"
        >
          <ArrowLeft size={16} />
          <span>Back to previous view</span>
        </button>

        {/* Main Product Showcase Grid */}
        <div className="product-details-grid">
          {/* Left Column: Image Gallery */}
          <div className="product-gallery-wrap">
            <div className="main-product-img">
              <ProductImage
                src={galleryImages[activeGalleryIdx]?.src || product.image}
                alt={product.name}
                fallbackSrc="/images/seed-placeholder.svg"
              />
              {isOutOfStock && (
                <div className="pdp-sold-out-overlay">
                  <span>SOLD OUT</span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="pdp-thumbnail-strip">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pdp-thumb ${activeGalleryIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveGalleryIdx(idx)}
                  aria-label={`View ${img.label}`}
                >
                  <ProductImage src={img.src} alt={img.label} fallbackSrc="/images/seed-placeholder.svg" />
                </button>
              ))}
            </div>

            {/* Quality Seals */}
            <div className="pdp-trust-seals">
              <div className="pdp-trust-seal">
                <ShieldCheck size={20} color="var(--color-primary)" />
                <div>
                  <strong>Physical Purity</strong>
                  <span>{product.purity} Guaranteed</span>
                </div>
              </div>
              <div className="pdp-trust-seal">
                <Leaf size={20} color="var(--color-primary)" />
                <div>
                  <strong>Lab Germination</strong>
                  <span>{product.germinationRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Ordering */}
          <div className="product-info-wrap">
            <div className="detail-brand-badge">{product.brand} • {product.variety}</div>
            <h1 className="detail-title">{product.name}</h1>
            {product.hindiName && <div className="detail-hindi">{product.hindiName}</div>}

            {/* Rating & Stock */}
            <div className="pdp-rating-stock-row">
              <div className="pdp-rating-display">
                <div className="pdp-stars-row">
                  {renderStars(product.rating, 16)}
                </div>
                <strong>{product.rating}</strong>
                <span className="pdp-review-meta">({product.reviewCount} reviews • Demo Data)</span>
              </div>
              {isOutOfStock ? (
                <span className="stock-status-pill out-of-stock">
                  ● Currently Out of Stock
                </span>
              ) : (
                <span className="stock-status-pill in-stock">
                  ● Ready for Dispatch ({product.stock} packets)
                </span>
              )}
            </div>

            {/* Price Presentation */}
            <div className="pdp-price-row">
              <span className="pdp-current-price">
                {formatPrice(currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="pdp-original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="badge badge-danger">
                  SAVE {product.discountPercent}%
                </span>
              )}
            </div>

            <p className="pdp-description">
              {product.description}
            </p>

            {/* Package Size Picker — supports both packageSizes and packSizes */}
            {(product.packageSizes || product.packSizes) && (
              <div className="size-selector-wrap">
                <label className="input-label">Select Package Size / Weight:</label>
                <div className="size-options-grid">
                  {(product.packageSizes || product.packSizes).map((pack) => (
                    <button
                      key={pack.size}
                      type="button"
                      className={`size-option-card ${selectedSize?.size === pack.size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(pack)}
                    >
                      <span className="size-weight">{pack.size}</span>
                      <span className="size-price">{formatPrice(pack.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="pdp-actions-row">
              {/* Quantity */}
              <div className={`qty-control ${isOutOfStock ? 'disabled' : ''}`}>
                <button
                  type="button"
                  className="qty-btn"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                variant="primary"
                size="lg"
                icon={isOutOfStock ? Ban : ShoppingBag}
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="pdp-add-to-cart-btn"
              >
                {isOutOfStock ? 'Currently Out of Stock' : `Add to Cart (${formatPrice(currentPrice * quantity)})`}
              </Button>

              {/* Buy Now */}
              <Button
                variant="accent"
                size="lg"
                icon={isOutOfStock ? Ban : Zap}
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="pdp-buy-now-btn"
              >
                Buy Now
              </Button>

              {/* Wishlist */}
              <button
                type="button"
                className={`pdp-wishlist-btn ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isFavorited ? '#BE2828' : 'none'} color={isFavorited ? '#BE2828' : 'currentColor'} />
              </button>
            </div>

            {/* Stock warning when quantity is close */}
            {!isOutOfStock && quantity >= product.stock - 2 && product.stock <= 10 && (
              <div className="pdp-stock-warning">
                ⚠️ Only {product.stock} packets left in depot — order soon!
              </div>
            )}

            {/* Quick Specs Grid */}
            <div className="detail-specs-grid">
              <div className="spec-cell">
                <span className="spec-label">Sowing Season</span>
                <span className="spec-val">{product.season}</span>
              </div>
              <div className="spec-cell">
                <span className="spec-label">Harvest Duration</span>
                <span className="spec-val">{product.harvestTime}</span>
              </div>
              <div className="spec-cell">
                <span className="spec-label">Sowing Method</span>
                <span className="spec-val">{product.sowingMethod}</span>
              </div>
              <div className="spec-cell">
                <span className="spec-label">Seed Classification</span>
                <span className="spec-val">{product.variety}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========= Tabbed Content Section ========= */}
        <div className="pdp-tabs-section">
          <div className="pdp-tabs-header">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`pdp-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pdp-tab-content">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="pdp-tab-panel">
                <h3>About {product.shortName || product.name}</h3>
                <p>{product.description}</p>
                <p>{product.shortDescription}</p>
                <div className="pdp-feature-highlights">
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} color="var(--color-primary)" />
                    <span>Lab-tested with {product.germinationRate} germination guarantee</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} color="var(--color-primary)" />
                    <span>Physical purity of {product.purity} certified</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} color="var(--color-primary)" />
                    <span>Packed in hermetic barrier pouches for maximum shelf life</span>
                  </div>
                  <div className="pdp-feature-item">
                    <CheckCircle2 size={18} color="var(--color-primary)" />
                    <span>Available in {(product.packageSizes || product.packSizes)?.length || 1} convenient pack sizes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Seed Specs Tab */}
            {activeTab === 'specs' && (
              <div className="pdp-tab-panel">
                <h3>Seed Specifications</h3>
                <table className="pdp-specs-table">
                  <tbody>
                    <tr><td>Seed Classification</td><td>{product.variety}</td></tr>
                    <tr><td>Brand</td><td>{product.brand}</td></tr>
                    <tr><td>Category</td><td>{product.categoryName}</td></tr>
                    <tr><td>Germination Rate</td><td>{product.germinationRate}</td></tr>
                    <tr><td>Physical Purity</td><td>{product.purity}</td></tr>
                    <tr><td>Sowing Season</td><td>{product.season}</td></tr>
                    <tr><td>Harvest Duration</td><td>{product.harvestTime}</td></tr>
                    <tr><td>Sowing Method</td><td>{product.sowingMethod}</td></tr>
                    {(product.packageSizes || product.packSizes) && (
                      <tr>
                        <td>Available Sizes</td>
                        <td>{(product.packageSizes || product.packSizes).map((p) => p.size).join(', ')}</td>
                      </tr>
                    )}
                    <tr><td>Stock Availability</td><td>{isOutOfStock ? 'Out of Stock' : `${product.stock} packets available`}</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Seed Passport Tab */}
            {activeTab === 'passport' && (
              <div className="pdp-tab-panel" style={{ padding: 0 }}>
                <SeedPassport product={product} />
              </div>
            )}

            {/* Sowing Guide Tab */}
            {activeTab === 'sowing' && (
              <div className="pdp-tab-panel">
                <h3>Sowing Instructions</h3>
                <div className="pdp-sowing-steps">
                  <div className="pdp-sowing-step">
                    <div className="pdp-step-num">1</div>
                    <div>
                      <strong>Soil Preparation</strong>
                      <p>Prepare {product.cultivationTips?.soilType || 'well-drained fertile soil'}. Add compost or vermicompost (2-3 kg per sq meter) for nutrient-rich beds.</p>
                    </div>
                  </div>
                  <div className="pdp-sowing-step">
                    <div className="pdp-step-num">2</div>
                    <div>
                      <strong>Sowing Method</strong>
                      <p>{product.sowingMethod}. Sow during {product.season} for best results.</p>
                    </div>
                  </div>
                  <div className="pdp-sowing-step">
                    <div className="pdp-step-num">3</div>
                    <div>
                      <strong>Spacing & Depth</strong>
                      <p>Maintain spacing of {product.cultivationTips?.spacing || '30-45 cm'}. Sow seeds at 1-2 cm depth in moist soil.</p>
                    </div>
                  </div>
                  <div className="pdp-sowing-step">
                    <div className="pdp-step-num">4</div>
                    <div>
                      <strong>Watering</strong>
                      <p>{product.cultivationTips?.watering || 'Water regularly, keeping soil moist but not waterlogged. Reduce frequency once established.'}</p>
                    </div>
                  </div>
                  <div className="pdp-sowing-step">
                    <div className="pdp-step-num">5</div>
                    <div>
                      <strong>Expected Harvest</strong>
                      <p>Harvest begins in approximately {product.harvestTime}. {product.cultivationTips?.expectedYield ? `Expected yield: ${product.cultivationTips.expectedYield}` : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Growing Tips Tab */}
            {activeTab === 'tips' && (
              <div className="pdp-tab-panel">
                <h3>Scientific Cultivation Advisory</h3>
                {product.cultivationTips ? (
                  <div className="pdp-tips-grid">
                    <div className="pdp-tip-card">
                      <Ruler size={22} color="var(--color-primary)" />
                      <strong>Recommended Spacing</strong>
                      <p>{product.cultivationTips.spacing}</p>
                    </div>
                    <div className="pdp-tip-card">
                      <Leaf size={22} color="var(--color-primary)" />
                      <strong>Optimal Soil</strong>
                      <p>{product.cultivationTips.soilType}</p>
                    </div>
                    <div className="pdp-tip-card">
                      <Sun size={22} color="var(--color-primary)" />
                      <strong>Sunlight Requirement</strong>
                      <p>{product.cultivationTips.sunlight}</p>
                    </div>
                    <div className="pdp-tip-card">
                      <Droplets size={22} color="var(--color-primary)" />
                      <strong>Watering Protocol</strong>
                      <p>{product.cultivationTips.watering}</p>
                    </div>
                    <div className="pdp-tip-card">
                      <ThermometerSun size={22} color="var(--color-primary)" />
                      <strong>Expected Yield</strong>
                      <p>{product.cultivationTips.expectedYield}</p>
                    </div>
                    <div className="pdp-tip-card">
                      <Calendar size={22} color="var(--color-primary)" />
                      <strong>Harvest Timeline</strong>
                      <p>{product.harvestTime}</p>
                    </div>
                  </div>
                ) : product.growingDetails ? (
                  <div className="pdp-tips-grid">
                    {product.growingDetails.soilType && (
                      <div className="pdp-tip-card">
                        <Leaf size={22} color="var(--color-primary)" />
                        <strong>Optimal Soil</strong>
                        <p>{product.growingDetails.soilType}</p>
                      </div>
                    )}
                    {product.growingDetails.sunlight && (
                      <div className="pdp-tip-card">
                        <Sun size={22} color="var(--color-primary)" />
                        <strong>Sunlight</strong>
                        <p>{product.growingDetails.sunlight}</p>
                      </div>
                    )}
                    {product.growingDetails.watering && (
                      <div className="pdp-tip-card">
                        <Droplets size={22} color="var(--color-primary)" />
                        <strong>Watering</strong>
                        <p>{product.growingDetails.watering}</p>
                      </div>
                    )}
                    {(product.growingDetails.harvestDays || product.harvestTime) && (
                      <div className="pdp-tip-card">
                        <Calendar size={22} color="var(--color-primary)" />
                        <strong>Harvest Timeline</strong>
                        <p>{product.growingDetails.harvestDays || product.harvestTime}</p>
                      </div>
                    )}
                    {product.growingDetails.plantSpacing && (
                      <div className="pdp-tip-card">
                        <Ruler size={22} color="var(--color-primary)" />
                        <strong>Plant Spacing</strong>
                        <p>{product.growingDetails.plantSpacing}</p>
                      </div>
                    )}
                    {product.growingDetails.germinationDays && (
                      <div className="pdp-tip-card">
                        <ThermometerSun size={22} color="var(--color-primary)" />
                        <strong>Germination</strong>
                        <p>{product.growingDetails.germinationDays}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>Detailed cultivation tips for this variety will be available soon. Please refer to the Sowing Guide tab for general instructions.</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="pdp-tab-panel">
                <div className="pdp-reviews-header">
                  <div>
                    <h3>Customer Reviews</h3>
                    <div className="pdp-reviews-summary">
                      <div className="pdp-stars-row">{renderStars(averageRating, 18)}</div>
                      <span className="pdp-avg-rating">{averageRating}</span>
                      <span className="pdp-review-meta">based on {reviews.length} reviews (Demo Data)</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={MessageSquare}
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </Button>
                </div>

                {/* Review Submission Form */}
                {showReviewForm && (
                  <form className="pdp-review-form" onSubmit={handleSubmitReview}>
                    <div className="pdp-review-form-row">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rajesh Kumar"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="pdp-review-form-row">
                      <label>Rating</label>
                      <div className="pdp-rating-selector">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                            className="pdp-rating-star-btn"
                          >
                            <Star
                              size={22}
                              fill={star <= reviewForm.rating ? '#C68A36' : 'none'}
                              color={star <= reviewForm.rating ? '#C68A36' : '#ccc'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pdp-review-form-row">
                      <label>Review Title</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Great germination rate!"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm((f) => ({ ...f, title: e.target.value }))}
                      />
                    </div>
                    <div className="pdp-review-form-row">
                      <label>Your Review *</label>
                      <textarea
                        className="form-input"
                        rows={4}
                        placeholder="Share your experience with this seed variety..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                        required
                      />
                    </div>
                    <Button variant="primary" type="submit" icon={Send}>
                      Submit Demo Review
                    </Button>
                  </form>
                )}

                {/* Review Cards */}
                <div className="pdp-reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="pdp-review-card">
                      <div className="pdp-review-card-header">
                        <div className="pdp-reviewer-avatar">
                          <User size={18} />
                        </div>
                        <div className="pdp-reviewer-info">
                          <strong>{review.name}</strong>
                          <span>{review.location} • {review.date}</span>
                        </div>
                        {review.verified && (
                          <span className="pdp-verified-badge">
                            <CheckCircle2 size={13} /> Verified
                          </span>
                        )}
                      </div>
                      <div className="pdp-review-rating-row">
                        {renderStars(review.rating, 14)}
                        <strong className="pdp-review-title">{review.title}</strong>
                      </div>
                      <p className="pdp-review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Varieties Section */}
        {relatedProducts.length > 0 && (
          <div className="pdp-related-section">
            <div className="section-header">
              <span className="section-subtitle">Complementary Genetics</span>
              <h2 className="section-title">Similar {product.categoryName}</h2>
            </div>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
