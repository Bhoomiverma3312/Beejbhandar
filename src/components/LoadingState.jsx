import React from 'react';
import { Sprout } from 'lucide-react';

export const LoadingState = ({ message = 'Loading certified seed varieties...', count = 4 }) => {
  return (
    <div className="loading-state-wrapper">
      <div className="loading-indicator">
        <div className="loading-sprout-pulse">
          <Sprout size={32} className="sprout-icon" />
        </div>
        <p className="loading-text">{message}</p>
      </div>

      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-badge" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-subtitle" />
              <div className="skeleton-footer">
                <div className="skeleton-line skeleton-price" />
                <div className="skeleton-line skeleton-btn" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
