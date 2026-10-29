import React from 'react';

export const ROLES_CONFIG = [
  {
    id: 'farmer',
    title: 'Farmer / किसान',
    icon: '🚜',
    subtitle: 'Agricultural Cultivation & Bulk Sowing',
    desc: 'Bulk packs, commercial hybrid varieties, season calendars, farm subsidies info',
    badgeClass: 'role-badge-farmer'
  },
  {
    id: 'coop',
    title: 'Co-operative / समिति',
    icon: '🏢',
    subtitle: 'Farmer Groups & Bulk Buyers',
    desc: 'Volume pricing tiers, RFQ quotations, multi-member bulk ordering & billing',
    badgeClass: 'role-badge-coop'
  },
  {
    id: 'gardener',
    title: 'Gardener / बागवानी',
    icon: '🪴',
    subtitle: 'Home, Terrace & Balcony Growers',
    desc: 'Small handy packs, herb & flower kits, kitchen garden guides, seed germination tips',
    badgeClass: 'role-badge-gardener'
  }
];

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="role-selector-container">
      {ROLES_CONFIG.map((role) => {
        const isSelected = selectedRole === role.id;
        return (
          <div
            key={role.id}
            className={`role-select-box ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectRole(role.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectRole(role.id);
              }
            }}
          >
            <span className="role-box-icon" aria-hidden="true">{role.icon}</span>
            <strong className="role-box-title">{role.title}</strong>
            <span className="role-box-desc">{role.subtitle}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RoleSelector;
