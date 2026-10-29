/**
 * BeejBhandar – Seed Categories Master Data
 * 85 unique subcategories organized across 6 parent categories
 * Each supports role targeting: farmer, coop, gardener
 */

export const PARENT_CATEGORIES = [
  { id: 'vegetable', name: 'Vegetable Seeds', hindiName: 'सब्जियों के बीज', icon: '🥦', color: '#3a7d44' },
  { id: 'fruit', name: 'Fruit Seeds', hindiName: 'फलों के बीज', icon: '🍅', color: '#c0392b' },
  { id: 'flower', name: 'Flower Seeds', hindiName: 'फूलों के बीज', icon: '🌸', color: '#8e44ad' },
  { id: 'field-crop', name: 'Field Crop Seeds', hindiName: 'खेत की फसल बीज', icon: '🌾', color: '#b7950b' },
  { id: 'herb', name: 'Herb & Medicinal Seeds', hindiName: 'जड़ी-बूटी बीज', icon: '🌿', color: '#1a7a5e' },
  { id: 'specialty', name: 'Gardening & Specialty', hindiName: 'विशेष बागवानी बीज', icon: '🪴', color: '#2e86ab' },
];

export const seedCategories = [
  // ═══════════════════════════════════════════════
  // A. VEGETABLE SEEDS (30 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'veg-tomato', parentId: 'vegetable', slug: 'tomato',
    name: 'Tomato', hindiName: 'टमाटर', shortDesc: 'High-yield hybrid & desi tomato varieties',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: true, isActive: true,
    season: 'Kharif & Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-cherry-tomato', parentId: 'vegetable', slug: 'cherry-tomato',
    name: 'Cherry Tomato', hindiName: 'चेरी टमाटर', shortDesc: 'Sweet small-fruited cherry tomatoes for gardens',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-brinjal', parentId: 'vegetable', slug: 'brinjal',
    name: 'Brinjal / Eggplant', hindiName: 'बैंगन', shortDesc: 'Round & long brinjal varieties for all regions',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Vegetable'
  },
  {
    id: 'veg-green-chilli', parentId: 'vegetable', slug: 'green-chilli',
    name: 'Green Chilli', hindiName: 'हरी मिर्च', shortDesc: 'Hot & mild green chilli seed varieties',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: false, isActive: true, season: 'Summer & Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-capsicum', parentId: 'vegetable', slug: 'capsicum',
    name: 'Capsicum / Bell Pepper', hindiName: 'शिमला मिर्च', shortDesc: 'Colorful capsicum for kitchen & polyhouse',
    image: 'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-cucumber', parentId: 'vegetable', slug: 'cucumber',
    name: 'Cucumber', hindiName: 'खीरा', shortDesc: 'Crispy, disease-resistant cucumber varieties',
    image: 'https://images.unsplash.com/photo-1568584263167-81b6e959c4e5?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Vegetable'
  },
  {
    id: 'veg-bottle-gourd', parentId: 'vegetable', slug: 'bottle-gourd',
    name: 'Bottle Gourd', hindiName: 'लौकी', shortDesc: 'Long & round bottle gourd varieties',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Vegetable'
  },
  {
    id: 'veg-bitter-gourd', parentId: 'vegetable', slug: 'bitter-gourd',
    name: 'Bitter Gourd', hindiName: 'करेला', shortDesc: 'High-yielding bitter gourd with medicinal value',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Summer & Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-ridge-gourd', parentId: 'vegetable', slug: 'ridge-gourd',
    name: 'Ridge Gourd', hindiName: 'तोरई', shortDesc: 'Tender ridge gourd for Indian cooking',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Vegetable'
  },
  {
    id: 'veg-pumpkin', parentId: 'vegetable', slug: 'pumpkin',
    name: 'Pumpkin', hindiName: 'कद्दू', shortDesc: 'Large orange pumpkin & decorative varieties',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-okra', parentId: 'vegetable', slug: 'okra',
    name: 'Okra / Bhindi', hindiName: 'भिंडी', shortDesc: 'Dark green bhindi with high pod count per plant',
    image: 'https://images.unsplash.com/photo-1612257998531-947f85f3a1b0?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: true, isActive: true, season: 'Summer & Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-cauliflower', parentId: 'vegetable', slug: 'cauliflower',
    name: 'Cauliflower', hindiName: 'फूलगोभी', shortDesc: 'Compact white curd cauliflower varieties',
    image: 'https://images.unsplash.com/photo-1568584236236-bee2e46cbdb4?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-cabbage', parentId: 'vegetable', slug: 'cabbage',
    name: 'Cabbage', hindiName: 'पत्तागोभी', shortDesc: 'Tight compact-headed cabbage for market & home',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-broccoli', parentId: 'vegetable', slug: 'broccoli',
    name: 'Broccoli', hindiName: 'ब्रोकली', shortDesc: 'Nutritious green broccoli for health-conscious growers',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener', 'farmer'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-spinach', parentId: 'vegetable', slug: 'spinach',
    name: 'Spinach / Palak', hindiName: 'पालक', shortDesc: 'Fast-growing spinach for year-round harvest',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-coriander', parentId: 'vegetable', slug: 'coriander-leaf',
    name: 'Coriander / Dhaniya', hindiName: 'धनिया', shortDesc: 'Multi-cut aromatic dhaniya for kitchen gardens',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'Rabi', cropType: 'Herb-Vegetable'
  },
  {
    id: 'veg-fenugreek', parentId: 'vegetable', slug: 'fenugreek',
    name: 'Fenugreek / Methi', hindiName: 'मेथी', shortDesc: 'Aromatic fenugreek leaves & grain seeds',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Herb-Vegetable'
  },
  {
    id: 'veg-radish', parentId: 'vegetable', slug: 'radish',
    name: 'Radish / Mooli', hindiName: 'मूली', shortDesc: 'Long white & round radish for quick harvest',
    image: 'https://images.unsplash.com/photo-1602218088786-08cbdba32ccf?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-carrot', parentId: 'vegetable', slug: 'carrot',
    name: 'Carrot / Gajar', hindiName: 'गाजर', shortDesc: 'Smooth orange carrots for juice & cooking',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-beetroot', parentId: 'vegetable', slug: 'beetroot',
    name: 'Beetroot / Chukandar', hindiName: 'चुकंदर', shortDesc: 'Deep red beetroot for salad & juicing',
    image: 'https://images.unsplash.com/photo-1597169432647-af21de9ed30c?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-onion', parentId: 'vegetable', slug: 'onion',
    name: 'Onion / Pyaaz', hindiName: 'प्याज', shortDesc: 'High TSS red & white onion for all seasons',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Rabi & Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-spring-onion', parentId: 'vegetable', slug: 'spring-onion',
    name: 'Spring Onion', hindiName: 'हरा प्याज', shortDesc: 'Tender spring onion for salads & cooking',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Vegetable'
  },
  {
    id: 'veg-lettuce', parentId: 'vegetable', slug: 'lettuce',
    name: 'Lettuce', hindiName: 'सलाद पत्ता', shortDesc: 'Crispy lettuce for salads & continental cooking',
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-kale', parentId: 'vegetable', slug: 'kale',
    name: 'Kale', hindiName: 'केल', shortDesc: 'Superfood kale for home gardens & health gardens',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-peas', parentId: 'vegetable', slug: 'garden-peas',
    name: 'Garden Peas / Matar', hindiName: 'मटर', shortDesc: 'Sweet tender peas for cooking & export',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-french-beans', parentId: 'vegetable', slug: 'french-beans',
    name: 'French Beans', hindiName: 'फ्रेंच बीन्स', shortDesc: 'Tender pods for fresh market & export',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Kharif', cropType: 'Vegetable'
  },
  {
    id: 'veg-sponge-gourd', parentId: 'vegetable', slug: 'sponge-gourd',
    name: 'Sponge Gourd / Torai', hindiName: 'तोरई/नेनुआ', shortDesc: 'Smooth sponge gourd for Indian vegetable dishes',
    image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Vegetable'
  },
  {
    id: 'veg-turnip', parentId: 'vegetable', slug: 'turnip',
    name: 'Turnip / Shalgam', hindiName: 'शलगम', shortDesc: 'Crispy white-purple turnip for winter harvest',
    image: 'https://images.unsplash.com/photo-1602218088786-08cbdba32ccf?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Vegetable'
  },
  {
    id: 'veg-watermelon-veg', parentId: 'vegetable', slug: 'watermelon',
    name: 'Watermelon / Tarbuj', hindiName: 'तरबूज', shortDesc: 'Sweet crisp watermelon varieties',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Summer', cropType: 'Fruit-Vegetable'
  },
  {
    id: 'veg-muskmelon', parentId: 'vegetable', slug: 'muskmelon',
    name: 'Muskmelon / Kharbooja', hindiName: 'खरबूजा', shortDesc: 'Aromatic sweet muskmelon for summer markets',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Fruit-Vegetable'
  },

  // ═══════════════════════════════════════════════
  // B. FRUIT SEEDS (10 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'fruit-papaya', parentId: 'fruit', slug: 'papaya',
    name: 'Papaya / Papita', hindiName: 'पपीता', shortDesc: 'Dwarf & tall papaya for year-round fruiting',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-strawberry', parentId: 'fruit', slug: 'strawberry',
    name: 'Strawberry', hindiName: 'स्ट्रॉबेरी', shortDesc: 'Sweet-aromatic strawberry for hill regions & gardens',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Winter', cropType: 'Fruit'
  },
  {
    id: 'fruit-pomegranate', parentId: 'fruit', slug: 'pomegranate',
    name: 'Pomegranate / Anar', hindiName: 'अनार', shortDesc: 'Ruby red pomegranate seed varieties',
    image: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Fruit'
  },
  {
    id: 'fruit-lemon', parentId: 'fruit', slug: 'lemon',
    name: 'Lemon / Nimbu', hindiName: 'नींबू', shortDesc: 'Acid-lime & lemon for beverages & cooking',
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-guava', parentId: 'fruit', slug: 'guava',
    name: 'Guava / Amrood', hindiName: 'अमरूद', shortDesc: 'White & pink-fleshed guava for orchard planting',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-custard-apple', parentId: 'fruit', slug: 'custard-apple',
    name: 'Custard Apple / Sitaphal', hindiName: 'सीताफल', shortDesc: 'Creamy custard apple for tropical orchards',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Fruit'
  },
  {
    id: 'fruit-dragon-fruit', parentId: 'fruit', slug: 'dragon-fruit',
    name: 'Dragon Fruit', hindiName: 'ड्रैगन फ्रूट', shortDesc: 'Exotic dragon fruit for emerging export market',
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-passion-fruit', parentId: 'fruit', slug: 'passion-fruit',
    name: 'Passion Fruit', hindiName: 'पैशन फ्रूट', shortDesc: 'Aromatic passion fruit for hill regions',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-banana', parentId: 'fruit', slug: 'banana-sucker',
    name: 'Banana / Kela', hindiName: 'केला', shortDesc: 'Tissue culture banana planting material',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Fruit'
  },
  {
    id: 'fruit-melons', parentId: 'fruit', slug: 'hybrid-melon',
    name: 'Hybrid Melons', hindiName: 'संकर खरबूजा', shortDesc: 'High brix content hybrid melon varieties',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Summer', cropType: 'Fruit'
  },

  // ═══════════════════════════════════════════════
  // C. FLOWER SEEDS (15 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'flower-sunflower', parentId: 'flower', slug: 'sunflower',
    name: 'Sunflower / Surajmukhi', hindiName: 'सूरजमुखी', shortDesc: 'Single & multi-petal sunflower varieties',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'Kharif & Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-marigold', parentId: 'flower', slug: 'marigold',
    name: 'Marigold / Genda', hindiName: 'गेंदा फूल', shortDesc: 'Orange & yellow marigold for festivals & export',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop', 'gardener'], isFeatured: true, isActive: true, season: 'Kharif & Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-rose', parentId: 'flower', slug: 'rose',
    name: 'Rose / Gulab', hindiName: 'गुलाब', shortDesc: 'Aromatic hybrid rose varieties for gardens',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Flower'
  },
  {
    id: 'flower-zinnia', parentId: 'flower', slug: 'zinnia',
    name: 'Zinnia', hindiName: 'जीनिया', shortDesc: 'Colorful zinnia mixes for borders & gardens',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Summer & Kharif', cropType: 'Flower'
  },
  {
    id: 'flower-petunia', parentId: 'flower', slug: 'petunia',
    name: 'Petunia', hindiName: 'पेटुनिया', shortDesc: 'Cascading petunia for hanging baskets & borders',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Winter & Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-cosmos', parentId: 'flower', slug: 'cosmos',
    name: 'Cosmos', hindiName: 'कॉस्मॉस', shortDesc: 'Airy cosmos flowers for wildflower meadows',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Kharif & Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-dahlia', parentId: 'flower', slug: 'dahlia',
    name: 'Dahlia', hindiName: 'डेहलिया', shortDesc: 'Pompom & decorative dahlia tubers & seeds',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Winter', cropType: 'Flower'
  },
  {
    id: 'flower-aster', parentId: 'flower', slug: 'aster',
    name: 'Aster', hindiName: 'एस्टर', shortDesc: 'Star-shaped aster flowers for cottage gardens',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-chrysanthemum', parentId: 'flower', slug: 'chrysanthemum',
    name: 'Chrysanthemum / Guldaudi', hindiName: 'गुलदाउदी', shortDesc: 'Pompom & spider mum varieties for festive seasons',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Flower'
  },
  {
    id: 'flower-calendula', parentId: 'flower', slug: 'calendula',
    name: 'Calendula / Pot Marigold', hindiName: 'कैलेंडुला', shortDesc: 'Medicinal calendula for garden & pharmacy',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-portulaca', parentId: 'flower', slug: 'portulaca',
    name: 'Portulaca / Moss Rose', hindiName: 'पोर्चुलाका', shortDesc: 'Drought-tolerant colorful portulaca for balconies',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: true, isActive: true, season: 'Summer', cropType: 'Flower'
  },
  {
    id: 'flower-nasturtium', parentId: 'flower', slug: 'nasturtium',
    name: 'Nasturtium', hindiName: 'नैस्टर्शियम', shortDesc: 'Edible nasturtium flowers for salads & gardens',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Flower'
  },
  {
    id: 'flower-pansy', parentId: 'flower', slug: 'pansy',
    name: 'Pansy', hindiName: 'पैन्सी', shortDesc: 'Velvety pansy for winter containers & borders',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Winter', cropType: 'Flower'
  },
  {
    id: 'flower-snapdragon', parentId: 'flower', slug: 'snapdragon',
    name: 'Snapdragon / Antirrhinum', hindiName: 'स्नैपड्रैगन', shortDesc: 'Tall spike snapdragon for cut flower production',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Flower'
  },
  {
    id: 'flower-morning-glory', parentId: 'flower', slug: 'morning-glory',
    name: 'Morning Glory', hindiName: 'मॉर्निंग ग्लोरी', shortDesc: 'Fast-climbing morning glory for fences',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Flower'
  },

  // ═══════════════════════════════════════════════
  // D. FIELD CROP SEEDS (20 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'field-wheat', parentId: 'field-crop', slug: 'wheat',
    name: 'Wheat / Gehun', hindiName: 'गेहूँ', shortDesc: 'HD-2967 & Sharbati high-yield wheat foundation seed',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Rabi', cropType: 'Grain'
  },
  {
    id: 'field-paddy', parentId: 'field-crop', slug: 'paddy-rice',
    name: 'Paddy / Rice / Dhan', hindiName: 'धान', shortDesc: 'Basmati & non-basmati paddy seed varieties',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Kharif', cropType: 'Grain'
  },
  {
    id: 'field-maize', parentId: 'field-crop', slug: 'maize-corn',
    name: 'Maize / Sweet Corn', hindiName: 'मक्का', shortDesc: 'Hybrid maize for grain, silage & sweet corn',
    image: 'https://images.unsplash.com/photo-1602524816-754db2f0d0e0?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Kharif & Rabi', cropType: 'Grain'
  },
  {
    id: 'field-sorghum', parentId: 'field-crop', slug: 'sorghum-jowar',
    name: 'Sorghum / Jowar', hindiName: 'ज्वार', shortDesc: 'Grain & dual-purpose sorghum varieties',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Grain'
  },
  {
    id: 'field-pearl-millet', parentId: 'field-crop', slug: 'pearl-millet-bajra',
    name: 'Pearl Millet / Bajra', hindiName: 'बाजरा', shortDesc: 'High-grain hybrid bajra for arid regions',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Grain'
  },
  {
    id: 'field-finger-millet', parentId: 'field-crop', slug: 'finger-millet-ragi',
    name: 'Finger Millet / Ragi', hindiName: 'रागी', shortDesc: 'Nutritious iron-rich finger millet for tribal belts',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Grain'
  },
  {
    id: 'field-chickpea', parentId: 'field-crop', slug: 'chickpea-gram',
    name: 'Chickpea / Gram / Chana', hindiName: 'चना', shortDesc: 'Desi & kabuli gram for protein-rich cultivation',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Rabi', cropType: 'Pulse'
  },
  {
    id: 'field-pigeon-pea', parentId: 'field-crop', slug: 'pigeon-pea-arhar',
    name: 'Pigeon Pea / Arhar / Tur', hindiName: 'अरहर दाल', shortDesc: 'Wilt-resistant pigeon pea for dryland farming',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Pulse'
  },
  {
    id: 'field-green-gram', parentId: 'field-crop', slug: 'green-gram-moong',
    name: 'Green Gram / Moong', hindiName: 'मूंग', shortDesc: 'Mung bean varieties for summer & Kharif season',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif & Summer', cropType: 'Pulse'
  },
  {
    id: 'field-black-gram', parentId: 'field-crop', slug: 'black-gram-urad',
    name: 'Black Gram / Urad', hindiName: 'उड़द', shortDesc: 'High-protein black gram for yellow dal market',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Pulse'
  },
  {
    id: 'field-soybean', parentId: 'field-crop', slug: 'soybean',
    name: 'Soybean / Soya', hindiName: 'सोयाबीन', shortDesc: 'High-protein soybean for oil & food processing',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Oilseed'
  },
  {
    id: 'field-groundnut', parentId: 'field-crop', slug: 'groundnut-peanut',
    name: 'Groundnut / Peanut', hindiName: 'मूंगफली', shortDesc: 'High-shelling% groundnut for oil & confectionery',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Kharif & Summer', cropType: 'Oilseed'
  },
  {
    id: 'field-mustard', parentId: 'field-crop', slug: 'mustard-sarson',
    name: 'Mustard / Sarson', hindiName: 'सरसों', shortDesc: '42%+ oil-recovery hybrid & desi mustard',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: true, isActive: true, season: 'Rabi', cropType: 'Oilseed'
  },
  {
    id: 'field-sesame', parentId: 'field-crop', slug: 'sesame-til',
    name: 'Sesame / Til', hindiName: 'तिल', shortDesc: 'White & black sesame varieties for oil & cooking',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Oilseed'
  },
  {
    id: 'field-sunflower-crop', parentId: 'field-crop', slug: 'sunflower-crop',
    name: 'Sunflower (Crop)', hindiName: 'सूरजमुखी (फसल)', shortDesc: 'High-oil hybrid sunflower for commercial farming',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Rabi & Kharif', cropType: 'Oilseed'
  },
  {
    id: 'field-cotton', parentId: 'field-crop', slug: 'cotton-kapas',
    name: 'Cotton / Kapas', hindiName: 'कपास', shortDesc: 'BG-II hybrid cotton with bollworm resistance',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Cash Crop'
  },
  {
    id: 'field-kidney-bean', parentId: 'field-crop', slug: 'kidney-bean-rajma',
    name: 'Kidney Bean / Rajma', hindiName: 'राजमा', shortDesc: 'Red & white kidney bean for Rabi season',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Pulse'
  },
  {
    id: 'field-berseem', parentId: 'field-crop', slug: 'berseem-fodder',
    name: 'Berseem (Fodder)', hindiName: 'बरसीम हरा चारा', shortDesc: 'Multi-cut berseem clover for dairy cattle nutrition',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Fodder'
  },
  {
    id: 'field-fodder-maize', parentId: 'field-crop', slug: 'fodder-maize',
    name: 'Fodder Maize / African Tall', hindiName: 'हरी मक्का चारा', shortDesc: 'High-biomass African tall maize for cattle feed',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Fodder'
  },
  {
    id: 'field-jute', parentId: 'field-crop', slug: 'jute-pat',
    name: 'Jute / Pat', hindiName: 'जूट', shortDesc: 'Fiber jute for industrial & eco-packaging markets',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Cash Crop'
  },

  // ═══════════════════════════════════════════════
  // E. HERB & MEDICINAL SEEDS (10 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'herb-basil', parentId: 'herb', slug: 'sweet-basil',
    name: 'Sweet Basil / Tulsi', hindiName: 'तुलसी / बेसिल', shortDesc: 'Italian & holy basil for cooking & health',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener', 'farmer'], isFeatured: true, isActive: true, season: 'Summer & Kharif', cropType: 'Herb'
  },
  {
    id: 'herb-dill', parentId: 'herb', slug: 'dill-soya',
    name: 'Dill / Soya Herb', hindiName: 'सोया / डिल', shortDesc: 'Aromatic dill leaf & seed for culinary use',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Herb'
  },
  {
    id: 'herb-ajwain', parentId: 'herb', slug: 'ajwain-leaf',
    name: 'Ajwain / Carom', hindiName: 'अजवाइन', shortDesc: 'Medicinal ajwain seeds with digestive benefits',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Herb'
  },
  {
    id: 'herb-parsley', parentId: 'herb', slug: 'parsley',
    name: 'Parsley / Italian Herb', hindiName: 'पार्सले', shortDesc: 'Curly & flat-leaf parsley for gourmet kitchens',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Herb'
  },
  {
    id: 'herb-mint', parentId: 'herb', slug: 'mint-pudina',
    name: 'Mint / Pudina', hindiName: 'पुदीना', shortDesc: 'Spearmint & peppermint for culinary & oil extraction',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener', 'farmer'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Herb'
  },
  {
    id: 'herb-thyme', parentId: 'herb', slug: 'thyme',
    name: 'Thyme', hindiName: 'थाइम', shortDesc: 'Common thyme for Mediterranean herb gardens',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Herb'
  },
  {
    id: 'herb-oregano', parentId: 'herb', slug: 'oregano',
    name: 'Oregano', hindiName: 'ओरेगैनो', shortDesc: 'Aromatic oregano for pizza & pasta herb gardens',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi & Winter', cropType: 'Herb'
  },
  {
    id: 'herb-chamomile', parentId: 'herb', slug: 'chamomile',
    name: 'Chamomile', hindiName: 'कैमोमाइल', shortDesc: 'Apple-scented chamomile for teas & aromatherapy',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Rabi', cropType: 'Medicinal'
  },
  {
    id: 'herb-ashwagandha', parentId: 'herb', slug: 'ashwagandha',
    name: 'Ashwagandha / Indian Ginseng', hindiName: 'अश्वगंधा', shortDesc: 'Adaptogen medicinal root for Ayurvedic farming',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: true, isActive: true, season: 'Kharif', cropType: 'Medicinal'
  },
  {
    id: 'herb-lemongrass', parentId: 'herb', slug: 'lemongrass',
    name: 'Lemongrass / Citronella', hindiName: 'लेमनग्रास', shortDesc: 'Aromatic lemongrass for tea & essential oil production',
    image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Medicinal'
  },

  // ═══════════════════════════════════════════════
  // F. GARDENING & SPECIALTY (10 subcategories)
  // ═══════════════════════════════════════════════
  {
    id: 'spec-microgreens', parentId: 'specialty', slug: 'microgreens',
    name: 'Microgreens Mix', hindiName: 'माइक्रोग्रीन्स', shortDesc: 'Nutrient-dense microgreens for health kitchens',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-wheatgrass', parentId: 'specialty', slug: 'wheatgrass',
    name: 'Wheatgrass', hindiName: 'गेहूं की घास', shortDesc: 'Organic wheatgrass for juicing & wellness',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-sprouts', parentId: 'specialty', slug: 'sprouts',
    name: 'Sprouting Seeds', hindiName: 'अंकुरण बीज', shortDesc: 'Mixed sprouting beans & seeds for raw nutrition',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-kitchen-garden', parentId: 'specialty', slug: 'kitchen-garden-mix',
    name: 'Kitchen Garden Mix', hindiName: 'किचन गार्डन किट', shortDesc: 'Curated 10-variety mix for home kitchen gardens',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-balcony-garden', parentId: 'specialty', slug: 'balcony-garden-mix',
    name: 'Balcony Garden Mix', hindiName: 'बालकनी गार्डन मिक्स', shortDesc: 'Container-friendly seeds for small balcony spaces',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: true, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-pollinator', parentId: 'specialty', slug: 'pollinator-garden-mix',
    name: 'Pollinator Garden Mix', hindiName: 'पॉलिनेटर गार्डन', shortDesc: 'Bee & butterfly-friendly wildflower mix',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Kharif & Rabi', cropType: 'Specialty'
  },
  {
    id: 'spec-drought-tolerant', parentId: 'specialty', slug: 'drought-tolerant',
    name: 'Drought-Tolerant Plants', hindiName: 'सूखा सहिष्णु पौधे', shortDesc: 'Water-saving plants for dry regions & low maintenance',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'gardener'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Specialty'
  },
  {
    id: 'spec-cover-crops', parentId: 'specialty', slug: 'cover-crops',
    name: 'Cover Crops', hindiName: 'कवर क्रॉप्स', shortDesc: 'Soil-enriching cover crop blends for farm health',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'All Season', cropType: 'Specialty'
  },
  {
    id: 'spec-green-manure', parentId: 'specialty', slug: 'green-manure',
    name: 'Green Manure Crops', hindiName: 'हरी खाद', shortDesc: 'Dhaincha, sunn hemp & senji for soil nitrogen fixing',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=75',
    roles: ['farmer', 'coop'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Specialty'
  },
  {
    id: 'spec-lawn-grass', parentId: 'specialty', slug: 'lawn-grass',
    name: 'Lawn Grass', hindiName: 'लॉन घास', shortDesc: 'Bermuda, Zoysia & Korea lawn grass for landscapes',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=75',
    roles: ['gardener'], isFeatured: false, isActive: true, season: 'Kharif', cropType: 'Specialty'
  },
];

// Helper: get categories by parent
export const getCategoriesByParent = (parentId) =>
  seedCategories.filter(c => c.parentId === parentId && c.isActive);

// Helper: get categories by role
export const getCategoriesByRole = (role) =>
  seedCategories.filter(c => c.roles.includes(role) && c.isActive);

// Helper: get featured categories
export const getFeaturedCategories = () =>
  seedCategories.filter(c => c.isFeatured && c.isActive);

// Helper: find category by id or slug
export const findCategory = (idOrSlug) =>
  seedCategories.find(c => c.id === idOrSlug || c.slug === idOrSlug);

export default seedCategories;
