// Polished local SVG fallback for seed imagery
export const SEED_FALLBACK_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="none"><rect width="600" height="450" fill="%23EEF2EA"/><circle cx="300" cy="210" r="70" fill="%23DDE8D7"/><path d="M300 160C300 160 260 200 260 235C260 257.091 277.909 275 300 275C322.091 275 340 257.091 340 235C340 200 300 160 300 160Z" fill="%2324563C"/><path d="M300 180V260M300 215C312 205 324 212 328 220M300 235C288 225 276 232 272 240" stroke="%23DDE8D7" stroke-width="3" stroke-linecap="round"/><text x="300" y="325" fill="%23173D2B" font-family="-apple-system, sans-serif" font-size="16" font-weight="600" text-anchor="middle" letter-spacing="1">BEEJBHANDAR CERTIFIED SEED</text></svg>`;

export const handleImageError = (e) => {
  if (e?.currentTarget && e.currentTarget.src !== SEED_FALLBACK_IMAGE) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = SEED_FALLBACK_IMAGE;
  }
};
