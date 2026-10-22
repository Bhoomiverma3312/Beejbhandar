import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "No seeds found",
  description = "We couldn't find any seed varieties matching your selected filters.",
  actionText = "Browse Seed Catalog",
  actionLink = "/shop",
  onActionClick
}) => {
  return (
    <div className="empty-state-card surface-card">
      <div className="empty-state-icon-wrap">
        <Icon size={36} className="empty-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      
      {actionLink && !onActionClick && (
        <Link to={actionLink}>
          <Button variant="primary" icon={ArrowRight} iconPosition="right">
            {actionText}
          </Button>
        </Link>
      )}

      {onActionClick && (
        <Button variant="primary" onClick={onActionClick} icon={ArrowRight} iconPosition="right">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
