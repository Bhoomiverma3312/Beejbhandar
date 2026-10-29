import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { handleImageError } from '../utils/imageFallback';
import { ProductImage } from '../components/ProductImage';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Trash2,
  Star,
  Package,
  Eye,
  Ban,
  ChevronRight
} from 'lucide-react';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    if (!product.inStock || product.stock <= 0) {
      showToast(`${product.shortName || product.name} is currently out of stock.`, 'error');
      return;
    }
    const defaultSize = product.packageSizes?.[0] || { size: 'Standard Pack', price: product.price };
    addToCart(product, defaultSize, 1);
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter((p) => p.inStock && p.stock > 0);
    if (inStockItems.length === 0) {
      showToast('No in-stock items to add to cart.', 'error');
      return;
    }
    inStockItems.forEach((product) => {
      const defaultSize = product.packageSizes?.[0] || { size: 'Standard Pack', price: product.price };
      addToCart(product, defaultSize, 1);
    });
    showToast(`Added ${inStockItems.length} item${inStockItems.length > 1 ? 's' : ''} to your cart!`, 'success');
  };

  const inStockCount = wishlistItems.filter((p) => p.inStock && p.stock > 0).length;
  const outOfStockCount = wishlistItems.length - inStockCount;

  return (
    <div className="wishlist-page section-py">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span className="pdp-breadcrumb-current">My Wishlist</span>
        </nav>

        <div className="wishlist-header">
          <div>
            <span className="section-subtitle">Saved Varieties</span>
            <h1 className="section-title">My Seed Wishlist</h1>
            <p className="section-desc">
              {wishlistItems.length > 0
                ? `You have ${wishlistItems.length} saved seed ${wishlistItems.length === 1 ? 'variety' : 'varieties'}${outOfStockCount > 0 ? ` (${outOfStockCount} currently unavailable)` : ''}.`
                : 'Curate your favorite crops and seasonal plantings before ordering.'}
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <div className="wishlist-header-actions">
              <Button
                variant="primary"
                size="sm"
                icon={ShoppingBag}
                onClick={handleAddAllToCart}
                disabled={inStockCount === 0}
              >
                Add All ({inStockCount}) to Cart
              </Button>
            </div>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-items-grid">
            {wishlistItems.map((product) => {
              const isOutOfStock = !product.inStock || product.stock <= 0;
              const defaultPrice = product.packageSizes?.[0]?.price || product.price;

              return (
                <div
                  key={product.id}
                  className={`wishlist-item-card surface-card ${isOutOfStock ? 'wishlist-out-of-stock' : ''}`}
                >
                  {/* Image */}
                  <Link to={`/product/${product.slug || product.id}`} className="wishlist-item-image">
                    <ProductImage src={product.image} alt={product.name} fallbackSrc="/images/seed-placeholder.svg" />
                    {isOutOfStock && (
                      <div className="wishlist-sold-out-badge">
                        <Ban size={14} />
                        <span>Sold Out</span>
                      </div>
                    )}
                    {product.badge && !isOutOfStock && (
                      <span className="wishlist-product-badge">{product.badge}</span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="wishlist-item-info">
                    <div className="wishlist-item-meta">
                      <span className="wishlist-item-category">{product.categoryName}</span>
                      <span className="wishlist-item-brand">{product.brand}</span>
                    </div>

                    <Link to={`/product/${product.slug || product.id}`} className="wishlist-item-name">
                      {product.shortName || product.name}
                    </Link>

                    {product.hindiName && (
                      <div className="wishlist-item-hindi">{product.hindiName}</div>
                    )}

                    {/* Rating */}
                    <div className="wishlist-item-rating">
                      <Star size={14} fill="#C68A36" color="#C68A36" />
                      <strong>{product.rating}</strong>
                      <span>({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="wishlist-item-price-row">
                      <span className="wishlist-item-price">{formatPrice(defaultPrice)}</span>
                      {product.originalPrice && (
                        <span className="wishlist-item-mrp">{formatPrice(product.originalPrice)}</span>
                      )}
                      {product.discountPercent > 0 && (
                        <span className="wishlist-item-discount">{product.discountPercent}% off</span>
                      )}
                    </div>

                    {/* Stock indicator */}
                    <div className="wishlist-stock-indicator">
                      {isOutOfStock ? (
                        <span className="wishlist-stock out-of-stock">● Out of Stock</span>
                      ) : product.stock <= 10 ? (
                        <span className="wishlist-stock low-stock">● Only {product.stock} left</span>
                      ) : (
                        <span className="wishlist-stock in-stock">● In Stock ({product.stock} available)</span>
                      )}
                    </div>

                    {/* Pack sizes preview */}
                    {product.packageSizes && product.packageSizes.length > 1 && (
                      <div className="wishlist-pack-sizes">
                        <Package size={12} />
                        <span>{product.packageSizes.length} pack sizes from {formatPrice(Math.min(...product.packageSizes.map(p => p.price)))}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="wishlist-item-actions">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ShoppingBag}
                      disabled={isOutOfStock}
                      onClick={() => handleAddToCart(product)}
                      fullWidth
                    >
                      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>

                    <div className="wishlist-secondary-actions">
                      <Link to={`/product/${product.slug || product.id}`} className="wishlist-view-btn">
                        <Eye size={14} />
                        <span>View Details</span>
                      </Link>
                      <button
                        type="button"
                        className="wishlist-remove-btn"
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="Your Wishlist is Empty"
            description="You haven't saved any seed varieties yet. Browse our certified collection and click the heart icon on any variety to save it here."
            actionText="Browse Seed Catalog"
            actionLink="/shop"
          />
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-footer">
            <Link to="/shop" className="wishlist-continue-link">
              <ArrowRight size={16} />
              <span>Continue Browsing More Seeds</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
