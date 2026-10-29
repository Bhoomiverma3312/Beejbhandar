import React, { useState, useEffect } from 'react';

const DEFAULT_FALLBACK = '/images/seed-placeholder.svg';

/**
 * Reusable ProductImage with smooth loading, error fallback, lazy loading, and aspect ratio support
 */
export const ProductImage = ({
  src,
  alt = 'Seed Product',
  className = '',
  style = {},
  fallbackSrc = DEFAULT_FALLBACK,
  loading = 'lazy',
  objectFit = 'cover',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(!src);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`product-img-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor: '#F1EFE6',
        ...style
      }}
    >
      {!isLoaded && !hasError && (
        <div
          className="img-skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #F1EFE6 25%, #E6E8DE 50%, #F1EFE6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            zIndex: 1
          }}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          display: 'block',
          transition: 'opacity 0.25s ease-in-out',
          opacity: isLoaded || hasError ? 1 : 0
        }}
        {...props}
      />
    </div>
  );
};

export default ProductImage;
