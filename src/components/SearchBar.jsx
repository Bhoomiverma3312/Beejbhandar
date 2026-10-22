import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = "Search certified seeds (e.g., Tomato, Wheat, Marigold, Desi Palak)...",
  autoFocus = false,
  className = ''
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) onChange('');
    if (onSearch) onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(internalValue);
  };

  return (
    <form className={`search-bar-form ${className}`.trim()} onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          type="text"
          value={onChange ? value : internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="search-input"
          aria-label="Search seeds"
        />
        {(onChange ? value : internalValue) && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
