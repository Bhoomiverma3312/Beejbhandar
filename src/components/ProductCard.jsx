import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, CheckCircle, ShoppingBag, Eye, Ban } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isOutOfStock = !product.inStock || product.stock <= 0;
  const isFavorited = isInWishlist(product.id);
  const sizes = product.packageSizes || product.packSizes || [];
  const defaultSize = sizes[0] || { size: 'Standard Pack', price: product.price };
  const productUrl = `/product/${product.id}`;
  const imgSrc = product.image || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultSize, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className={`product-card ${isOutOfStock ? 'card-out-of-stock' : ''}`} id={`product-${product.id}`}>
      <div className="card-image-wrap">
        <Link to={productUrl} className="card-image-link" aria-label={product.name}>
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
          />
        </Link>

        {/* Top Badges */}
        <div className="card-badges">
          {isOutOfStock ? (
            <span className="badge badge-danger badge-stock-alert">
              Out of Stock
            </span>
          ) : (
            <>
              {product.badge && (
                <span className={`badge ${product.badge.toLowerCase().includes('organic') ? 'badge-primary' : 'badge-accent'}`}>
                  {product.badge}
                </span>
              )}
              {(product.discountPercent > 0 || product.discount > 0) && (
                <span className="badge badge-danger">
                  -{product.discountPercent || product.discount}% OFF
                </span>
              )}
            </>
          )}
        </div>

        {/* Wishlist toggle button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorited ? '#BE2828' : 'none'} color={isFavorited ? '#BE2828' : '#19271E'} />
        </button>

        {/* Quick view overlay link on hover */}
        <Link to={productUrl} className="card-quick-view-overlay">
          <Eye size={16} />
          <span>View Seed Details</span>
        </Link>
      </div>

      <div className="card-body">
        {/* Variety & Brand */}
        <div className="card-meta-row">
          <span className="card-brand">{product.brand || 'BeejBhandar'}</span>
          <span className="card-season">{product.season}</span>
        </div>

        {/* Title */}
        <h3 className="card-title">
          <Link to={productUrl}>
            {product.name}
          </Link>
        </h3>

        {/* Quality assurance indicator */}
        <div className="card-germination-pill">
          <CheckCircle size={13} className="check-icon" />
          <span>{product.germinationRate || '90%+ Germination Verified'}</span>
        </div>

        {/* Rating */}
        <div className="card-rating-row">
          <div className="rating-stars" aria-label={`Rated ${product.rating} out of 5 (Sample Rating)`}>
            <Star size={13} fill="#C68A36" color="#C68A36" />
            <span className="rating-value">{product.rating}</span>
          </div>
          <span className="rating-count">({product.reviewCount} reviews)</span>

          {isOutOfStock ? (
            <span className="stock-status-pill out-of-stock">
              Sold Out
            </span>
          ) : (
            <span className="stock-status-pill in-stock">
              {product.stock} in stock
            </span>
          )}
        </div>

        {/* Price & Action */}
        <div className="card-footer-row">
          <div className="price-stack">
            <span className="current-price">{formatPrice(defaultSize.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="pack-label">{defaultSize.size}</span>
          </div>

          <button
            type="button"
            className={`card-add-btn ${isOutOfStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
            title={isOutOfStock ? 'Currently out of stock' : 'Add to Cart'}
          >
            {isOutOfStock ? (
              <>
                <Ban size={14} />
                <span>Sold Out</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
