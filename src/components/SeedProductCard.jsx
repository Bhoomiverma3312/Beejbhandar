import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductImage } from './ProductImage';

export const SeedProductCard = ({ product, showBulkHint = false }) => {
  if (!product) return null;

  const rawPackSizes = product.packSizes || product.packageSizes || [
    { size: 'Standard Pack', price: product.price || 150 }
  ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const activePack = rawPackSizes[selectedPackIndex] || rawPackSizes[0];
  const currentPrice = activePack?.price || product.price || 150;
  const isWishlisted = isInWishlist(product.id);

  const imageUrl = product.images?.[0]?.url || product.image || '/images/seed-placeholder.svg';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, activePack, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="role-product-card">
      <div className="role-card-thumb-wrap">
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <ProductImage 
            src={imageUrl} 
            alt={product.name} 
            className="role-card-thumb"
            fallbackSrc="/images/seed-placeholder.svg"
            loading="lazy"
          />
        </Link>
        {product.badge && (
          <span className="role-card-tag">{product.badge}</span>
        )}
        {product.discount > 0 && (
          <span className="role-card-discount">-{product.discount}%</span>
        )}
      </div>

      <div className="role-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span className="role-card-crop-type">{product.subCategory || product.categoryName || 'Seed Variety'}</span>
          <button
            type="button"
            onClick={handleToggleWishlist}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isWishlisted ? '#BE2828' : '#84968C' }}
            title={isWishlisted ? "Remove from saved" : "Save variety"}
          >
            <Heart size={16} fill={isWishlisted ? '#BE2828' : 'none'} />
          </button>
        </div>

        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h4 className="role-card-title">{product.name}</h4>
        </Link>

        <div className="role-card-specs-row">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <Star size={13} fill="#C68A36" color="#C68A36" />
            <strong>{product.rating || 4.7}</strong> ({product.reviewCount || 45})
          </span>
          <span>•</span>
          <span>{product.season || 'All Season'}</span>
        </div>

        <div className="role-card-price-row">
          <span className="role-card-current-price">₹{currentPrice}</span>
          {product.originalPrice && product.originalPrice > currentPrice && (
            <span className="role-card-orig-price">₹{product.originalPrice}</span>
          )}
        </div>

        {showBulkHint && (
          <div className="role-card-bulk-hint">
            🚜 Bulk discount: 15% off on 5+ packs
          </div>
        )}

        {rawPackSizes.length > 1 && (
          <select 
            className="role-card-pack-select"
            value={selectedPackIndex}
            onChange={(e) => setSelectedPackIndex(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
          >
            {rawPackSizes.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.size} — ₹{p.price}
              </option>
            ))}
          </select>
        )}

        <div className="role-card-actions">
          <button 
            type="button" 
            className="role-card-add-btn"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={15} />
            <span>Add to Cart</span>
          </button>
          <Link 
            to={`/product/${product.id}`} 
            className="role-card-details-btn"
            title="View technical growing specs"
          >
            Specs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeedProductCard;
