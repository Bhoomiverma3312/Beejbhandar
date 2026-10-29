import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext(null);
const LANG_STORAGE_KEY = 'beejbhandar_lang_v1';

export const DICTIONARY = {
  en: {
    // Navigation
    home: 'Home',
    shop: 'Shop Seeds',
    categories: 'Categories',
    growingGuide: 'Growing Guide',
    about: 'About',
    wishlist: 'Wishlist',
    cart: 'Cart',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    myHub: 'My Hub',
    searchPlaceholder: 'Search 194+ certified seeds (e.g. Tomato, Wheat, Sarson)...',
    
    // Common Actions
    addToCart: 'Add to Cart',
    details: 'Details',
    compare: 'Compare',
    savePlan: 'Save Plan',
    exportData: 'Export Data',
    printSummary: 'Print Summary',
    reset: 'Reset',
    calculate: 'Calculate',
    remove: 'Remove',
    edit: 'Edit',
    markDone: 'Mark Complete',
    downloadPdf: 'Download PDF / Summary',

    // Headers & Labels
    certifiedSeeds: 'Certified Indian Seeds',
    germinationGuarantee: '90%+ Certified Germination',
    price: 'Price',
    season: 'Season',
    packSize: 'Pack Size',
    inStock: 'In Stock',
    outOfStock: 'Sold Out',
    total: 'Total',
    subtotal: 'Subtotal',
    discount: 'Discount',
    status: 'Status',
    crop: 'Crop Variety',
    date: 'Sowing Date',

    // Feature Modules
    seedMatchmaker: 'Smart Seed Matchmaker',
    budgetCalculator: 'Land & Seed Budget Calculator',
    cropJourney: 'My Crop Journey',
    coopOptimizer: 'Cooperative Bulk Order Optimizer',
    seedPassport: 'Seed Passport & Quality Checklist',
    gardenPlanner: 'Balcony & Kitchen Garden Planner',
    agriInsights: 'Personal Agri Insights & Data Export',
    sampleNotice: 'Demo / Sample Mode: Calculations & local data for demonstration purposes.'
  },
  hi: {
    // Navigation
    home: 'मुख्य पृष्ठ (Home)',
    shop: 'बीज खरीदें (Shop)',
    categories: 'वर्गीकरण (Categories)',
    growingGuide: 'बुवाई मार्गदर्शिका (Guide)',
    about: 'हमारे बारे में (About)',
    wishlist: 'पसंदीदा (Wishlist)',
    cart: 'टोकरी (Cart)',
    login: 'लॉग इन (Login)',
    logout: 'लॉग आउट (Logout)',
    dashboard: 'डैशबोर्ड',
    myHub: 'मेरा कृषि केंद्र',
    searchPlaceholder: '194+ प्रमाणित बीज खोजें (जैसे टमाटर, गेहूं, सरसों)...',

    // Common Actions
    addToCart: 'टोकरी में डालें',
    details: 'विवरण देखें',
    compare: 'तुलना करें',
    savePlan: 'योजना सहेजें',
    exportData: 'डेटा निर्यात (Export)',
    printSummary: 'प्रिंट सारांश',
    reset: 'रीसेट करें',
    calculate: 'गणना करें',
    remove: 'हटाएं',
    edit: 'संपादित करें',
    markDone: 'पूर्ण चिह्नित करें',
    downloadPdf: 'पीडीएफ / सारांश डाउनलोड',

    // Headers & Labels
    certifiedSeeds: 'प्रमाणित भारतीय बीज',
    germinationGuarantee: '90%+ प्रमाणित अंकुरण क्षमता',
    price: 'मूल्य',
    season: 'ऋतु / मौसम',
    packSize: 'पैकेट साइज़',
    inStock: 'उपलब्ध है',
    outOfStock: 'समाप्त (Out of Stock)',
    total: 'कुल योग',
    subtotal: 'उप-योग',
    discount: 'छूट',
    status: 'स्थिति',
    crop: 'फसल किस्म',
    date: 'बुवाई तिथि',

    // Feature Modules
    seedMatchmaker: 'स्मार्ट बीज मैचमेकर',
    budgetCalculator: 'भूमि और बीज बजट कैलकुलेटर',
    cropJourney: 'मेरी फसल यात्रा (Crop Journey)',
    coopOptimizer: 'सहकारी समिति थोक ऑर्डर ऑप्टिमाइज़र',
    seedPassport: 'बीज पासपोर्ट और गुणवत्ता चेकलिस्ट',
    gardenPlanner: 'बालकनी व किचन गार्डन प्लानर',
    agriInsights: 'व्यक्तिगत कृषि विश्लेषण और डेटा निर्यात',
    sampleNotice: 'डेमो / नमूना डेटा: यह गणना और स्थानीय डेटा केवल प्रदर्शन हेतु है।'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      return stored === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (key, fallback = '') => {
      return DICTIONARY[lang]?.[key] || fallback || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isHindi: lang === 'hi' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback if accessed outside provider
    return {
      lang: 'en',
      toggleLanguage: () => {},
      t: (key, fallback = '') => fallback || key,
      isHindi: false
    };
  }
  return ctx;
};

export default LanguageContext;
