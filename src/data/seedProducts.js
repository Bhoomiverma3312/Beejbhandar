/**
 * BeejBhandar – Verified Seed Products Master Dataset
 * 
 * Realistic sample seed products covering:
 * - Vegetable seeds
 * - Fruit seeds
 * - Flower seeds
 * - Field crop seeds (Grain / Pulse / Oilseed)
 * - Herb seeds
 * - Organic gardening seeds
 * 
 * Conforms to all Prompt requirements:
 * id, name, slug, category, subCategory, brand, price, originalPrice, discount, currency,
 * stock, sku, packSizes, images, description, rating, reviewCount, growingDetails,
 * features, specifications, availability, isFeatured, isBestSeller, tags, shipping,
 * createdAt, updatedAt.
 * 
 * Note: Unverified product information is strictly demo data for demonstration purposes.
 */

export const seedProducts = [
  // ================= 1. VEGETABLE SEEDS =================
  {
    id: "seed-veg-01",
    name: "Desi F1 Hybrid Tomato (Pusa Ruby Plus)",
    shortName: "Pusa Ruby Plus Tomato",
    hindiName: "देसी टमाटर संकर बीज",
    slug: "pusa-ruby-tomato",
    category: "vegetable",
    categoryName: "Vegetable Seeds",
    subCategory: "Solanaceous Crops",
    brand: "BeejBhandar Elite Line",
    variety: "Hybrid F1 Semi-Determinate",
    price: 185,
    originalPrice: 240,
    discount: 23,
    discountPercent: 23,
    currency: "INR",
    stock: 85,
    inStock: true,
    sku: "BB-VEG-TOM-001",
    badge: "Bestseller",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 164,
    isDemoRating: true,
    germinationRate: "92% Guarantee",
    purity: "99.0%",
    season: "Kharif & Rabi (All Season)",
    sowingMethod: "Nursery bed transplant (25-30 days)",
    harvestTime: "65-75 Days from transplant",
    availability: "In Stock (Central Depot Dispatch)",
    tags: ["Tomato", "F1 Hybrid", "High Yield", "Leaf Curl Resistant", "Kitchen Garden", "Commercial"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=800&q=80",
        alt: "Fresh ripe cluster of Desi F1 Hybrid Tomato on vine"
      },
      {
        url: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
        alt: "Close-up of premium certified hybrid tomato seed pouch"
      },
      {
        url: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80",
        alt: "Healthy tomato seedlings ready for farm transplantation"
      }
    ],
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80",
    description: "Deep red, firm fruit with high pulp content and thick pericarp. Exceptional heat tolerance and resistance to tomato leaf curl virus (ToLCV). Ideal for both commercial field cultivation and rooftop kitchen gardens. Produced under strict physical and genetic purity protocols.",
    shortDescription: "High-yield semi-determinate tomato with deep red color and thick virus-tolerant pericarp.",
    packSizes: [
      { size: "10g (approx. 3,000 seeds)", price: 185 },
      { size: "50g packet", price: 420 },
      { size: "100g bulk pack", price: 790 },
      { size: "500g farmer tin", price: 3400 }
    ],
    packageSizes: [
      { size: "10g (approx. 3,000 seeds)", price: 185 },
      { size: "50g packet", price: 420 },
      { size: "100g bulk pack", price: 790 },
      { size: "500g farmer tin", price: 3400 }
    ],
    growingDetails: {
      season: "Kharif (June–July) & Rabi (Oct–Nov)",
      soilType: "Well-drained sandy loam with pH 6.0 – 7.0",
      sunlight: "Full sunshine (6–8 hours daily)",
      watering: "Regular moderate irrigation; avoid pooling water",
      germinationDays: "5–8 Days",
      harvestDays: "65–75 Days from transplanting",
      sowingDepth: "0.5 cm in nursery beds",
      plantSpacing: "60 cm (row) x 45 cm (plant)"
    },
    cultivationTips: {
      spacing: "60 cm x 45 cm",
      soilType: "Well-drained sandy loam with pH 6.0 - 7.0",
      sunlight: "Full sunshine (6-8 hours daily)",
      watering: "Moderate regular irrigation, avoid waterlogging",
      expectedYield: "25-30 tonnes per acre under scientific cultivation"
    },
    features: [
      "92% laboratory tested germination guarantee",
      "Tolerance to Tomato Leaf Curl Virus (ToLCV)",
      "Uniform fruit weight: 80–100 grams per tomato",
      "High lycopene content with exceptional shelf life",
      "Hermetically foil-sealed for moisture barrier protection"
    ],
    specifications: {
      "Botanical Name": "Solanum lycopersicum",
      "Genetic Type": "F1 Hybrid",
      "Physical Purity": "99.0% Min",
      "Germination (Min)": "92%",
      "Moisture Content": "7.0% Max",
      "Origin": "Karnal Agri Genetics Depot, India"
    },
    shipping: {
      dispatchTime: "Same day dispatch before 2 PM",
      deliveryWindow: "3–5 Business Days Pan-India",
      packaging: "Hermetic moisture-proof 4-layer aluminum pouch"
    },
    createdAt: "2026-01-15T08:30:00Z",
    updatedAt: "2026-03-20T11:15:00Z"
  },

  {
    id: "seed-veg-02",
    name: "Dark Green Bhindi / Okra (Kashi Kranti F1)",
    shortName: "Kashi Kranti Okra",
    hindiName: "काशी क्रांति भिंडी संकर",
    slug: "kashi-kranti-okra",
    category: "vegetable",
    categoryName: "Vegetable Seeds",
    subCategory: "Warm Season Malvaceae",
    brand: "IARI Certified Line",
    variety: "F1 Hybrid Resistant",
    price: 145,
    originalPrice: 195,
    discount: 25,
    discountPercent: 25,
    currency: "INR",
    stock: 120,
    inStock: true,
    sku: "BB-VEG-OKR-002",
    badge: "High Yield",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 218,
    isDemoRating: true,
    germinationRate: "90% Certified",
    purity: "99.5%",
    season: "Summer & Rainy (Feb-July)",
    sowingMethod: "Direct ridge & furrow sowing",
    harvestTime: "45-50 Days after sowing",
    availability: "In Stock",
    tags: ["Okra", "Bhindi", "YVMV Resistant", "Summer Crop", "High Fiber"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80",
        alt: "Tender 5-ridged dark green okra pods fresh from farm"
      },
      {
        url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
        alt: "Organic bhindi plantation row with vibrant yellow flowers"
      }
    ],
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=700&q=80",
    description: "Short inter-nodal distance yielding 18–22 tender, spineless, dark green 5-ridged pods per plant. Resistant to Yellow Vein Mosaic Virus (YVMV) and enation leaf curl virus. High market preference across wholesale mandis.",
    shortDescription: "Tender, dark green, virus-resistant okra with short internodes and high pickings.",
    packSizes: [
      { size: "50g packet (approx. 750 seeds)", price: 145 },
      { size: "100g pack", price: 260 },
      { size: "250g pack", price: 580 },
      { size: "1kg commercial pack", price: 1950 }
    ],
    packageSizes: [
      { size: "50g packet (approx. 750 seeds)", price: 145 },
      { size: "100g pack", price: 260 },
      { size: "250g pack", price: 580 },
      { size: "1kg commercial pack", price: 1950 }
    ],
    growingDetails: {
      season: "Spring-Summer (Feb–March) & Kharif (June–July)",
      soilType: "Rich organic loamy soil with pH 6.5 – 7.5",
      sunlight: "Abundant hot sunlight (minimum 7 hours)",
      watering: "Regular furrow irrigation every 4–5 days in summer",
      germinationDays: "4–6 Days",
      harvestDays: "45–50 Days from emergence",
      sowingDepth: "2.0 – 2.5 cm depth",
      plantSpacing: "45 cm between rows, 30 cm plant to plant"
    },
    cultivationTips: {
      spacing: "45 cm x 30 cm",
      soilType: "Rich, well-manured loamy soil with pH 6.5 - 7.5",
      sunlight: "Warm full sunlight (minimum 6 hours daily)",
      watering: "Every 4-5 days during summer; maintain uniform moisture",
      expectedYield: "6-8 tonnes per acre with multiple pickings"
    },
    features: [
      "Field resistance to Yellow Vein Mosaic Virus (YVMV)",
      "High continuous picking cycle every 2–3 days",
      "Spineless, smooth pods retain tenderness longer",
      "High market value due to deep dark green luster"
    ],
    specifications: {
      "Botanical Name": "Abelmoschus esculentus",
      "Pod Length": "12–14 cm at harvest",
      "Germination (Min)": "90%",
      "Physical Purity": "99.5%",
      "Genetic Purity": "98.0%"
    },
    shipping: {
      dispatchTime: "Ships in 24 hours",
      deliveryWindow: "3–4 Business Days",
      packaging: "Airtight foil pack"
    },
    createdAt: "2026-01-18T09:00:00Z",
    updatedAt: "2026-03-21T14:00:00Z"
  },

  {
    id: "seed-veg-03",
    name: "Golden Hybrid Carrot (Pusa Kesar Elite)",
    shortName: "Pusa Kesar Carrot",
    hindiName: "पूसा केसर गाजर बीज",
    slug: "pusa-kesar-carrot",
    category: "vegetable",
    categoryName: "Vegetable Seeds",
    subCategory: "Root Crops",
    brand: "BeejBhandar Elite Line",
    variety: "Tropical Red & Amber Cross",
    price: 130,
    originalPrice: 175,
    discount: 26,
    discountPercent: 26,
    currency: "INR",
    stock: 95,
    inStock: true,
    sku: "BB-VEG-CAR-003",
    badge: "High Carotene",
    isFeatured: false,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 94,
    isDemoRating: true,
    germinationRate: "88% Tested",
    purity: "98.5%",
    season: "Early Winter (Aug-Oct)",
    sowingMethod: "Direct raised bed broadcasting/drilling",
    harvestTime: "80-90 Days after sowing",
    availability: "In Stock",
    tags: ["Carrot", "Pusa Kesar", "Winter Vegetable", "High Vitamin A", "Crisp Root"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
        alt: "Freshly pulled crisp orange-red carrots washed in morning light"
      }
    ],
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80",
    description: "Deep red-orange roots with narrow core and sweet, crisp flesh. High beta-carotene and lycopene content. Developed for early winter sowing across Northern and Central Indian plains.",
    shortDescription: "Sweet, carotene-rich deep orange carrots with small core and uniform straight taproots.",
    packSizes: [
      { size: "25g packet", price: 130 },
      { size: "100g tin", price: 390 },
      { size: "500g farmer pack", price: 1650 }
    ],
    packageSizes: [
      { size: "25g packet", price: 130 },
      { size: "100g tin", price: 390 },
      { size: "500g farmer pack", price: 1650 }
    ],
    growingDetails: {
      season: "August to November across Indian plains",
      soilType: "Deep, loose, stone-free sandy loam",
      sunlight: "Full sun to partial winter shade",
      watering: "Gentle moisture; avoid dry spells to prevent root cracking",
      germinationDays: "7–10 Days",
      harvestDays: "80–90 Days",
      sowingDepth: "1.0 cm deep in fine raised beds",
      plantSpacing: "30 cm lines x 8–10 cm thinning"
    },
    cultivationTips: {
      spacing: "30 cm x 8 cm",
      soilType: "Deep, fine sandy loam free from pebbles to prevent root forking",
      sunlight: "Full sunny exposure",
      watering: "Regular gentle sprinkle watering",
      expectedYield: "12-15 tonnes per acre"
    },
    features: [
      "Small self-colored inner core reduces fiber texture",
      "High natural sugar and vitamin A concentration",
      "Stays crisp up to 2 weeks post harvest"
    ],
    specifications: {
      "Botanical Name": "Daucus carota subsp. sativus",
      "Root Length": "18–22 cm",
      "Germination": "88% Min",
      "Purity": "98.5%"
    },
    shipping: {
      dispatchTime: "Ships in 24 hours",
      deliveryWindow: "3–5 Days",
      packaging: "Sealed foil packet"
    },
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-03-22T09:30:00Z"
  },

  {
    id: "seed-veg-04",
    name: "Crisp Green Capsicum / Shimla Mirch (Bharat F1)",
    shortName: "Bharat Green Capsicum",
    hindiName: "भारत शिमला मिर्च संकर",
    slug: "bharat-green-capsicum",
    category: "vegetable",
    categoryName: "Vegetable Seeds",
    subCategory: "Solanaceous Crops",
    brand: "BeejBhandar Elite Line",
    variety: "Blocky 4-Lobe F1",
    price: 210,
    originalPrice: 280,
    discount: 25,
    discountPercent: 25,
    currency: "INR",
    stock: 60,
    inStock: true,
    sku: "BB-VEG-CAP-004",
    badge: "Polyhouse & Field",
    isFeatured: true,
    isBestSeller: false,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 78,
    isDemoRating: true,
    germinationRate: "90% Certified",
    purity: "99.0%",
    season: "Rabi & Polyhouse Year-Round",
    sowingMethod: "Pro-tray nursery transplanting",
    harvestTime: "70-75 Days from transplant",
    availability: "In Stock",
    tags: ["Capsicum", "Shimla Mirch", "Polyhouse", "High Value", "Blocky"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
        alt: "Glossy blocky green bell peppers on compact bushy plants"
      }
    ],
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=700&q=80",
    description: "Vigorous plants with dense foliage cover protecting fruit from sun scald. Produces heavy, 4-lobed, square-shaped shiny green bell peppers weighing 160–180g with thick crunchy walls.",
    shortDescription: "Thick-walled, blocky 4-lobed bell peppers with glossy dark green exterior.",
    packSizes: [
      { size: "10g (approx. 1,500 seeds)", price: 210 },
      { size: "50g packet", price: 790 },
      { size: "200g commercial tin", price: 2950 }
    ],
    packageSizes: [
      { size: "10g (approx. 1,500 seeds)", price: 210 },
      { size: "50g packet", price: 790 },
      { size: "200g commercial tin", price: 2950 }
    ],
    growingDetails: {
      season: "Transplant in Sept–Oct for open field; round-the-year in polyhouse",
      soilType: "Loamy soil rich in organic humus, pH 6.0 – 6.8",
      sunlight: "Filtered bright light to full sunlight",
      watering: "Drip irrigation with fertigation schedules",
      germinationDays: "6–9 Days",
      harvestDays: "70–75 Days from transplant",
      sowingDepth: "0.5 cm in pro-trays",
      plantSpacing: "50 cm x 45 cm on raised beds"
    },
    cultivationTips: {
      spacing: "50 cm x 45 cm",
      soilType: "Humus-rich loamy soil with optimal drainage",
      sunlight: "6-8 hours sunlight",
      watering: "Keep root zone moist with drip irrigation",
      expectedYield: "15-20 tonnes per acre"
    },
    features: [
      "4-lobed blocky shape with 6 mm thick walls",
      "Strong tolerance to Bacterial Spot & Tobacco Mosaic Virus (TMV)",
      "High transport tolerance over long distances"
    ],
    specifications: {
      "Botanical Name": "Capsicum annuum grossum",
      "Fruit Weight": "160–180 grams",
      "Wall Thickness": "6–7 mm",
      "Germination": "90% Guarantee"
    },
    shipping: {
      dispatchTime: "Ships within 24h",
      deliveryWindow: "3–4 Business Days",
      packaging: "Hermetic pouch"
    },
    createdAt: "2026-01-22T11:00:00Z",
    updatedAt: "2026-03-24T12:00:00Z"
  },

  // ================= 2. FRUIT SEEDS =================
  {
    id: "seed-fruit-01",
    name: "Sugar Queen Hybrid Watermelon (Black Diamond F1)",
    shortName: "Sugar Queen Watermelon",
    hindiName: "शुगर क्वीन तरबूज संकर",
    slug: "sugar-queen-watermelon",
    category: "fruit",
    categoryName: "Fruit Seeds",
    subCategory: "Cucurbit Fruits",
    brand: "BeejBhandar Elite Line",
    variety: "Icebox Black Rind F1",
    price: 240,
    originalPrice: 320,
    discount: 25,
    discountPercent: 25,
    currency: "INR",
    stock: 75,
    inStock: true,
    sku: "BB-FRT-WML-005",
    badge: "13% Sugar Brix",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 142,
    isDemoRating: true,
    germinationRate: "93% Certified",
    purity: "99.0%",
    season: "Summer (Jan-March)",
    sowingMethod: "Direct dibbling on channels/drip beds",
    harvestTime: "75-80 Days after sowing",
    availability: "In Stock",
    tags: ["Watermelon", "Tarbooj", "High Brix", "Summer Fruit", "Black Rind"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
        alt: "Sliced dark rind hybrid watermelon revealing vibrant sweet red flesh"
      }
    ],
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80",
    description: "Deep blackish-green rind with firm, crisp, deep-crimson flesh. Extremely sweet with a natural Refractometer Brix reading of 12.5% to 13.5%. Tough rind prevents transit damage during long-haul dispatches.",
    shortDescription: "Ultra-sweet icebox watermelon with dark rind, dense crimson flesh and 13% Brix.",
    packSizes: [
      { size: "10g packet (approx. 220 seeds)", price: 240 },
      { size: "50g pack", price: 920 },
      { size: "200g commercial can", price: 3450 }
    ],
    packageSizes: [
      { size: "10g packet (approx. 220 seeds)", price: 240 },
      { size: "50g pack", price: 920 },
      { size: "200g commercial can", price: 3450 }
    ],
    growingDetails: {
      season: "January to March sowing in Indian plains",
      soilType: "Sandy riverbeds or deep sandy loam rich in potassium",
      sunlight: "Intense hot sunshine (8+ hours daily)",
      watering: "Regular water until fruit set, then reduce to maximize sweetness",
      germinationDays: "4–6 Days",
      harvestDays: "75–80 Days",
      sowingDepth: "2.5 cm depth",
      plantSpacing: "2.5 meters between rows x 60 cm between vines"
    },
    cultivationTips: {
      spacing: "2.5 m x 0.6 m",
      soilType: "Light sandy loam with pH 6.5 - 7.5",
      sunlight: "Full sun",
      watering: "Stop irrigation 7 days before harvesting to spike Brix sweetness",
      expectedYield: "20-25 tonnes per acre"
    },
    features: [
      "12.5% – 13.5% natural sugar Brix content",
      "Average melon weight: 6–8 kg with small seed cavity",
      "Tough elastic rind resists cracking in rain or heat"
    ],
    specifications: {
      "Botanical Name": "Citrullus lanatus",
      "Rind Color": "Dark lustrous green-black",
      "Flesh Color": "Deep ruby crimson",
      "Germination": "93% Min"
    },
    shipping: {
      dispatchTime: "Same day dispatch",
      deliveryWindow: "3–4 Business Days",
      packaging: "Alu-foil pouch"
    },
    createdAt: "2026-01-25T14:30:00Z",
    updatedAt: "2026-03-25T16:00:00Z"
  },

  {
    id: "seed-fruit-02",
    name: "Taiwan Red Lady F1 Hybrid Papaya",
    shortName: "Red Lady 786 Papaya",
    hindiName: "रेड लेडी पपीता संकर",
    slug: "red-lady-papaya",
    category: "fruit",
    categoryName: "Fruit Seeds",
    subCategory: "Tropical Orchard",
    brand: "Known-You Certified Import",
    variety: "Gynodioecious F1",
    price: 380,
    originalPrice: 480,
    discount: 21,
    discountPercent: 21,
    currency: "INR",
    stock: 50,
    inStock: true,
    sku: "BB-FRT-PAP-006",
    badge: "100% Productive",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 186,
    isDemoRating: true,
    germinationRate: "90% Sealed",
    purity: "99.0%",
    season: "Spring & Monsoon",
    sowingMethod: "Pro-tray nursery under polyhouse",
    harvestTime: "8-9 Months after planting",
    availability: "In Stock",
    tags: ["Papaya", "Red Lady", "Gynodioecious", "High Yield", "Commercial Orchard"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=800&q=80",
        alt: "Heavy cluster of Red Lady papaya fruits growing on sturdy dwarf trunk"
      }
    ],
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=700&q=80",
    description: "World-renowned gynodioecious early-bearing papaya. Every single plant bears fruit (no male barren plants). Thick orange-red fragrant flesh, high tolerance to Papaya Ring Spot Virus (PRSV).",
    shortDescription: "Gynodioecious dwarf papaya where 100% of planted saplings yield sweet red fruit.",
    packSizes: [
      { size: "10 seeds pack", price: 380 },
      { size: "50 seeds grower pouch", price: 1650 },
      { size: "100 seeds orchard tin", price: 3100 }
    ],
    packageSizes: [
      { size: "10 seeds pack", price: 380 },
      { size: "50 seeds grower pouch", price: 1650 },
      { size: "100 seeds orchard tin", price: 3100 }
    ],
    growingDetails: {
      season: "Feb–March & July–August in frost-free regions",
      soilType: "Deep well-drained volcanic/alluvial soil with zero waterlogging",
      sunlight: "Intense full sunshine",
      watering: "Ring method irrigation keeping tree stem bone dry",
      germinationDays: "12–18 Days",
      harvestDays: "240–270 Days to first harvest",
      sowingDepth: "1.0 cm in sterile potting mix",
      plantSpacing: "2.1 m x 2.1 m (7 ft x 7 ft)"
    },
    cultivationTips: {
      spacing: "7 ft x 7 ft",
      soilType: "Porous loamy soil on raised mounds",
      sunlight: "Full sun",
      watering: "Never let water stand near collar/trunk",
      expectedYield: "60-80 kg fruit per tree annually"
    },
    features: [
      "100% productive gynodioecious genetics",
      "First fruiting begins just 60 cm above ground level",
      "Flesh is thick, tender, aromatic and highly transportable"
    ],
    specifications: {
      "Botanical Name": "Carica papaya",
      "Average Fruit Weight": "1.5 – 2.0 kg",
      "Brix Sweetness": "13.0%",
      "Germination": "90% Certified"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Business Days",
      packaging: "Desiccant sealed container"
    },
    createdAt: "2026-01-28T09:00:00Z",
    updatedAt: "2026-03-26T10:00:00Z"
  },

  // ================= 3. FLOWER SEEDS =================
  {
    id: "seed-flower-01",
    name: "Royal Orange African Marigold (Genda F1)",
    shortName: "Royal Orange Marigold",
    hindiName: "गेंदा फूल संकर बीज",
    slug: "royal-orange-marigold",
    category: "flower",
    categoryName: "Flower Seeds",
    subCategory: "Floriculture & Puja Flowers",
    brand: "BeejBhandar Elite Line",
    variety: "Giant Ball African F1",
    price: 160,
    originalPrice: 220,
    discount: 27,
    discountPercent: 27,
    currency: "INR",
    stock: 110,
    inStock: true,
    sku: "BB-FLW-MRG-007",
    badge: "Festival Bloom",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 135,
    isDemoRating: true,
    germinationRate: "90% Certified",
    purity: "98.5%",
    season: "All Season (Peak Diwali / Festive)",
    sowingMethod: "Nursery sowing and seedling transplanting",
    harvestTime: "55-60 Days from transplant",
    availability: "In Stock",
    tags: ["Marigold", "Genda", "Puja Flower", "Pest Repellent", "Commercial Garland"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
        alt: "Vibrant golden orange ball-shaped African Marigold in full bloom"
      }
    ],
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=700&q=80",
    description: "Compact sturdy plants with heavy branching. Bears deep golden-orange spherical blooms with firm petals that hold freshness for days without wilting. Excellent companion plant for repelling soil nematodes.",
    shortDescription: "Dense, spherical golden-orange blooms with long shelf life for festive garlands.",
    packSizes: [
      { size: "10g (approx. 3,200 seeds)", price: 160 },
      { size: "50g pack", price: 680 },
      { size: "250g commercial pack", price: 2950 }
    ],
    packageSizes: [
      { size: "10g (approx. 3,200 seeds)", price: 160 },
      { size: "50g pack", price: 680 },
      { size: "250g commercial pack", price: 2950 }
    ],
    growingDetails: {
      season: "Year-round; June–July sowing for Diwali harvest",
      soilType: "Sandy loam to clay loam with good drainage",
      sunlight: "Full sun",
      watering: "Moderate regular watering",
      germinationDays: "4–6 Days",
      harvestDays: "55–60 Days from transplanting",
      sowingDepth: "0.5 cm in nursery beds",
      plantSpacing: "40 cm x 40 cm"
    },
    cultivationTips: {
      spacing: "40 cm x 40 cm",
      soilType: "Well-drained garden loam",
      sunlight: "Full sunshine",
      watering: "Water base of plant; avoid wetting open blooms",
      expectedYield: "8-10 tonnes garland flowers per acre"
    },
    features: [
      "Tight ball-shaped double petals hold freshness for 4–5 days",
      "Natural nematicidal root secretions protect tomato & brinjal crops",
      "High carotenoid pigment for poultry feed and garland trade"
    ],
    specifications: {
      "Botanical Name": "Tagetes erecta",
      "Flower Diameter": "8–10 cm",
      "Plant Height": "60–75 cm",
      "Germination": "90% Certified"
    },
    shipping: {
      dispatchTime: "Ships in 24 hours",
      deliveryWindow: "3–4 Business Days",
      packaging: "Airtight foil pack"
    },
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-03-28T11:00:00Z"
  },

  {
    id: "seed-flower-02",
    name: "Giant Russian Sunflower (Surajmukhi Elite)",
    shortName: "Giant Russian Sunflower",
    hindiName: "विशाल सूरजमुखी बीज",
    slug: "giant-russian-sunflower",
    category: "flower",
    categoryName: "Flower Seeds",
    subCategory: "Show Garden & Pollinator",
    brand: "BeejBhandar Elite Line",
    variety: "Single Giant Head",
    price: 120,
    originalPrice: 160,
    discount: 25,
    discountPercent: 25,
    currency: "INR",
    stock: 80,
    inStock: true,
    sku: "BB-FLW-SNF-008",
    badge: "Pollinator Magnet",
    isFeatured: false,
    isBestSeller: false,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 62,
    isDemoRating: true,
    germinationRate: "92% Tested",
    purity: "99.0%",
    season: "Spring to Summer",
    sowingMethod: "Direct seeding in garden borders",
    harvestTime: "75-85 Days",
    availability: "In Stock",
    tags: ["Sunflower", "Surajmukhi", "Pollinators", "Honeybee", "Giant Bloom"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
        alt: "Giant golden sunflower facing the summer sun with heavy seed head"
      }
    ],
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=700&q=80",
    description: "Majestic giant sunflowers growing 8 to 10 feet tall with massive golden dinner-plate blooms measuring 12 to 14 inches across. Attracts hundreds of honeybees and wild pollinators to boost vegetable garden yields.",
    shortDescription: "Towering 10-foot sunflowers with 14-inch golden heads packed with edible seeds.",
    packSizes: [
      { size: "25g packet (approx. 200 seeds)", price: 120 },
      { size: "100g pack", price: 340 },
      { size: "500g bulk pack", price: 1250 }
    ],
    packageSizes: [
      { size: "25g packet (approx. 200 seeds)", price: 120 },
      { size: "100g pack", price: 340 },
      { size: "500g bulk pack", price: 1250 }
    ],
    growingDetails: {
      season: "January–April & July–August",
      soilType: "Deep moderately fertile soil",
      sunlight: "Unrestricted all-day sunlight (8+ hours)",
      watering: "Deep weekly watering once root system penetrates",
      germinationDays: "5–8 Days",
      harvestDays: "75–85 Days",
      sowingDepth: "2.0 cm",
      plantSpacing: "45 cm x 45 cm along fence lines"
    },
    cultivationTips: {
      spacing: "45 cm apart",
      soilType: "Rich deep soil with good drainage",
      sunlight: "Full sun",
      watering: "Water deeply around roots rather than shallow sprinkles",
      expectedYield: "Giant 30 cm seed heads"
    },
    features: [
      "Stalks reach up to 3 meters in rich organic soil",
      "Tremendous attractant for honeybee pollination",
      "Produces edible, striped, protein-dense seeds"
    ],
    specifications: {
      "Botanical Name": "Helianthus annuus",
      "Head Diameter": "30–35 cm",
      "Height": "2.5 – 3.0 meters",
      "Germination": "92% Minimum"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–5 Days",
      packaging: "Sealed seed packet"
    },
    createdAt: "2026-02-01T12:00:00Z",
    updatedAt: "2026-03-29T14:00:00Z"
  },

  // ================= 4. FIELD CROP SEEDS (GRAIN / PULSE / OILSEED) =================
  {
    id: "seed-grain-01",
    name: "Certified Sharbati Wheat (HD-2967 Foundation)",
    shortName: "HD-2967 Sharbati Wheat",
    hindiName: "एचडी-२९६७ शरबती गेहूं बीज",
    slug: "hd-2967-sharbati-wheat",
    category: "grain",
    categoryName: "Grain Seeds",
    subCategory: "Cereal Grains",
    brand: "National Seeds Corp (NSC) Certified",
    variety: "Foundation Certified Seed",
    price: 950,
    originalPrice: 1200,
    discount: 21,
    discountPercent: 21,
    currency: "INR",
    stock: 150,
    inStock: true,
    sku: "BB-GRN-WHT-009",
    badge: "Govt. Notified",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 310,
    isDemoRating: true,
    germinationRate: "95% Certified",
    purity: "99.0%",
    season: "Rabi Sowing (Nov-Dec)",
    sowingMethod: "Seed-cum-fertilizer drill sowing",
    harvestTime: "135-140 Days to maturity",
    availability: "In Stock (Bulk Farm Dispatch)",
    tags: ["Wheat", "Gehun", "HD-2967", "Foundation Seed", "Rust Resistant", "Sharbati"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
        alt: "Golden ripe ears of wheat shimmering across wide agricultural field"
      }
    ],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=700&q=80",
    description: "India's highest adopted rust-resistant bread wheat foundation seed. Bold, amber, lustrous grains with excellent chapati quality and high protein content (12.5%). Stiff straw reduces lodging during harvest season winds.",
    shortDescription: "India's landmark rust-resistant bread wheat with bold amber grains and stiff straw.",
    packSizes: [
      { size: "10kg grower bag", price: 950 },
      { size: "40kg standard farm sack", price: 3400 },
      { size: "100kg cooperative bundle", price: 8100 }
    ],
    packageSizes: [
      { size: "10kg grower bag", price: 950 },
      { size: "40kg standard farm sack", price: 3400 },
      { size: "100kg cooperative bundle", price: 8100 }
    ],
    growingDetails: {
      season: "Optimal sowing window: November 5 to November 25",
      soilType: "Fertile alluvial clay loam with good water retention",
      sunlight: "Full winter sunlight",
      watering: "5–6 irrigations at critical stages (CRI, tillering, flowering, dough)",
      germinationDays: "5–7 Days",
      harvestDays: "135–140 Days",
      sowingDepth: "4.0 – 5.0 cm into moist subsoil",
      plantSpacing: "20 cm line to line spacing"
    },
    cultivationTips: {
      spacing: "20 cm row spacing",
      soilType: "Well-leveled clay loam",
      sunlight: "Full sun",
      watering: "First irrigation at Crown Root Initiation (21 days) is critical",
      expectedYield: "22-26 quintals per acre"
    },
    features: [
      "Immune to Yellow Rust and Brown Rust pathotypes",
      "Stiff 95 cm straw resists stem breakage in pre-harvest storms",
      "Certified blue tag foundation purity verified under Indian Seeds Act"
    ],
    specifications: {
      "Botanical Name": "Triticum aestivum",
      "Notification No.": "S.O. 2805(E) ICAR",
      "1000 Grain Weight": "42–44 grams",
      "Protein Content": "12.5%",
      "Germination": "95% Tested"
    },
    shipping: {
      dispatchTime: "Bulk dispatch via Rural Agri Transport",
      deliveryWindow: "4–6 Business Days",
      packaging: "High-density woven polypropylene bag with inner moisture liner"
    },
    createdAt: "2026-02-05T08:00:00Z",
    updatedAt: "2026-03-30T10:00:00Z"
  },

  {
    id: "seed-pulse-01",
    name: "Organic Desi Chickpea / Chana (Pusa-362 Elite)",
    shortName: "Pusa-362 Desi Chana",
    hindiName: "पूसा-३६२ देसी चना बीज",
    slug: "pusa-362-desi-chana",
    category: "pulse",
    categoryName: "Pulse Seeds",
    subCategory: "Grain Legumes",
    brand: "IARI Certified Line",
    variety: "Desi Brown Seeded",
    price: 280,
    originalPrice: 360,
    discount: 22,
    discountPercent: 22,
    currency: "INR",
    stock: 90,
    inStock: true,
    sku: "BB-PLS-CHN-010",
    badge: "Wilt Resistant",
    isFeatured: false,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 95,
    isDemoRating: true,
    germinationRate: "92% Certified",
    purity: "99.0%",
    season: "Rabi (Oct-Nov)",
    sowingMethod: "Line sowing behind plough / seed drill",
    harvestTime: "130-135 Days",
    availability: "In Stock",
    tags: ["Chana", "Chickpea", "Pulse", "Wilt Resistant", "Nitrogen Fixing"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=800&q=80",
        alt: "Golden brown dry chickpea grains packed with natural plant protein"
      }
    ],
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=700&q=80",
    description: "High-yielding drought-tolerant desi gram variety. Strong root system fixes atmospheric nitrogen and resists Fusarium wilt. High protein value with delicious nutty taste.",
    shortDescription: "High-protein wilt-resistant desi chickpea with deep taproot and drought tolerance.",
    packSizes: [
      { size: "2kg grower bag", price: 280 },
      { size: "10kg farm sack", price: 1250 },
      { size: "30kg certified sack", price: 3450 }
    ],
    packageSizes: [
      { size: "2kg grower bag", price: 280 },
      { size: "10kg farm sack", price: 1250 },
      { size: "30kg certified sack", price: 3450 }
    ],
    growingDetails: {
      season: "Mid-October to early November",
      soilType: "Sandy loam to medium black soil with moderate moisture",
      sunlight: "Full sun",
      watering: "1–2 protective irrigations; highly drought hardy",
      germinationDays: "5–8 Days",
      harvestDays: "130–135 Days",
      sowingDepth: "7–8 cm deep into residual moisture",
      plantSpacing: "30 cm line x 10 cm plant spacing"
    },
    cultivationTips: {
      spacing: "30 cm x 10 cm",
      soilType: "Well-aerated soil; avoid waterlogged lands",
      sunlight: "Full sun",
      watering: "Avoid over-irrigation which triggers excessive vegetative growth",
      expectedYield: "8-10 quintals per acre"
    },
    features: [
      "Field resistance to Fusarium Wilt and Ascochyta Blight",
      "Deep taproots tap into subsoil residual moisture during dry winters",
      "Enriches field soil with 40 kg biological nitrogen per hectare"
    ],
    specifications: {
      "Botanical Name": "Cicer arietinum",
      "Seed Type": "Desi Angular Brown",
      "Protein": "22.5%",
      "Germination": "92% Minimum"
    },
    shipping: {
      dispatchTime: "Ships within 24h",
      deliveryWindow: "3–5 Days",
      packaging: "Lined moisture barrier sack"
    },
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-04-01T12:00:00Z"
  },

  {
    id: "seed-oil-01",
    name: "Yellow Mustard / Sarson (Pusa Bold Elite)",
    shortName: "Pusa Bold Yellow Sarson",
    hindiName: "पूसा बोल्ड पीली सरसों बीज",
    slug: "pusa-bold-yellow-sarson",
    category: "oilseed",
    categoryName: "Oilseed Varieties",
    subCategory: "Brassica Oilseeds",
    brand: "IARI Certified Line",
    variety: "Bold Seeded Brassica",
    price: 190,
    originalPrice: 250,
    discount: 24,
    discountPercent: 24,
    currency: "INR",
    stock: 105,
    inStock: true,
    sku: "BB-OIL-SRS-011",
    badge: "42%+ Oil Content",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 175,
    isDemoRating: true,
    germinationRate: "92% Certified",
    purity: "99.0%",
    season: "Rabi (Oct-Nov)",
    sowingMethod: "Line sowing with seed drill",
    harvestTime: "115-125 Days",
    availability: "In Stock",
    tags: ["Mustard", "Sarson", "Pusa Bold", "High Oil", "Rabi Oilseed"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
        alt: "Vast golden yellow blooming mustard field under crisp winter sky"
      }
    ],
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=700&q=80",
    description: "Extremely popular bold-seeded Indian mustard with high oil recovery (42%+). Dense pod setting on main shoot and branches. High tolerance to white rust and alternaria blight.",
    shortDescription: "High-oil-recovery bold seeded mustard with heavy pod clusters and frost resistance.",
    packSizes: [
      { size: "1kg pouch (approx. 200,000 seeds)", price: 190 },
      { size: "5kg farm sack", price: 880 },
      { size: "20kg bulk bag", price: 3250 }
    ],
    packageSizes: [
      { size: "1kg pouch (approx. 200,000 seeds)", price: 190 },
      { size: "5kg farm sack", price: 880 },
      { size: "20kg bulk bag", price: 3250 }
    ],
    growingDetails: {
      season: "October 1 to October 25 optimal sowing",
      soilType: "Sandy loam to alluvial loam",
      sunlight: "Abundant bright winter sunlight",
      watering: "2 irrigations (flower initiation and pod filling stage)",
      germinationDays: "3–5 Days",
      harvestDays: "115–125 Days",
      sowingDepth: "3.0 – 4.0 cm",
      plantSpacing: "30 cm row x 10 cm plant thinning"
    },
    cultivationTips: {
      spacing: "30 cm x 10 cm",
      soilType: "Alluvial loam",
      sunlight: "Full sun",
      watering: "Avoid excess moisture near harvest",
      expectedYield: "8-10 quintals per acre"
    },
    features: [
      "42% to 43.5% lab certified cold-press oil recovery",
      "Bold uniform seeds (1000-grain weight: 5.5g)",
      "High pungency and golden oil clarity"
    ],
    specifications: {
      "Botanical Name": "Brassica juncea",
      "Oil Content": "42.0% Min",
      "Purity": "99.0%",
      "Germination": "92% Guarantee"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Days",
      packaging: "Sealed moisture barrier pack"
    },
    createdAt: "2026-02-12T11:30:00Z",
    updatedAt: "2026-04-02T13:00:00Z"
  },

  // ================= 5. HERB SEEDS =================
  {
    id: "seed-herb-01",
    name: "Desi Multi-Cut Aroma Coriander (Pant Haritima)",
    shortName: "Pant Haritima Coriander",
    hindiName: "पंत हरीतिमा धनिया बीज",
    slug: "pant-haritima-coriander",
    category: "vegetable",
    categoryName: "Herb & Spice Seeds",
    subCategory: "Aromatic Herbs",
    brand: "BeejBhandar Elite Line",
    variety: "Multi-Cut Slow Bolting",
    price: 95,
    originalPrice: 130,
    discount: 27,
    discountPercent: 27,
    currency: "INR",
    stock: 140,
    inStock: true,
    sku: "BB-HRB-COR-012",
    badge: "Multi-Cut",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 205,
    isDemoRating: true,
    germinationRate: "88% Tested",
    purity: "99.0%",
    season: "Round the Year (Avoid extreme heat)",
    sowingMethod: "Split seed broadcasting/drilling",
    harvestTime: "30-35 Days to first cut",
    availability: "In Stock",
    tags: ["Coriander", "Dhaniya", "Multi-Cut", "Kitchen Garden", "Aromatic Herb"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1589135233689-d56075677d20?auto=format&fit=crop&w=800&q=80",
        alt: "Fresh vibrant green coriander leaves with deep aromatic fragrance"
      }
    ],
    image: "https://images.unsplash.com/photo-1589135233689-d56075677d20?auto=format&fit=crop&w=700&q=80",
    description: "Highly fragrant, lush green multi-cut coriander with slow bolting tendency. Yields up to 3 to 4 fresh cuts when harvested 2 inches above the root crown. Outstanding aroma for culinary seasoning.",
    shortDescription: "Ultra-aromatic slow-bolting coriander offering 3 to 4 lush cuts per sowing.",
    packSizes: [
      { size: "100g pack", price: 95 },
      { size: "250g pack", price: 195 },
      { size: "1kg bulk bag", price: 650 }
    ],
    packageSizes: [
      { size: "100g pack", price: 95 },
      { size: "250g pack", price: 195 },
      { size: "1kg bulk bag", price: 650 }
    ],
    growingDetails: {
      season: "September to March in plains; summer in shaded terrace pots",
      soilType: "Loose organic loam rich in vermicompost",
      sunlight: "Partial shade to morning sun",
      watering: "Light, frequent watering with fine spray",
      germinationDays: "8–12 Days (speed up by gently splitting seeds into halves)",
      harvestDays: "30–35 Days for first cut",
      sowingDepth: "1.0 cm depth",
      plantSpacing: "15 cm lines x continuous sowing"
    },
    cultivationTips: {
      spacing: "15 cm lines",
      soilType: "Organic rich soil",
      sunlight: "Morning sun / mild shade",
      watering: "Keep surface evenly moist",
      expectedYield: "3-4 cuts per bed"
    },
    features: [
      "Slow-bolting: resists premature flowering during heat spikes",
      "High essential oil content gives powerful traditional desi aroma",
      "Ideal for pots, terrace grow bags and open field beds"
    ],
    specifications: {
      "Botanical Name": "Coriandrum sativum",
      "Seed Treatment": "Untreated Non-GMO Natural",
      "Germination": "88% Minimum",
      "Purity": "99.0%"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Days",
      packaging: "Moisture seal pouch"
    },
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-04-05T11:00:00Z"
  },

  {
    id: "seed-herb-02",
    name: "Sacred Holy Basil / Krishna Tulsi (Ocimum Sanctum)",
    shortName: "Krishna Tulsi Seeds",
    hindiName: "कृष्ण तुलसी बीज",
    slug: "krishna-tulsi-seeds",
    category: "vegetable",
    categoryName: "Herb & Spice Seeds",
    subCategory: "Ayurvedic Herbs",
    brand: "BeejBhandar Elite Line",
    variety: "Purple Stem Ayurvedic",
    price: 85,
    originalPrice: 120,
    discount: 29,
    discountPercent: 29,
    currency: "INR",
    stock: 130,
    inStock: true,
    sku: "BB-HRB-TLS-013",
    badge: "Immunity Herb",
    isFeatured: false,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 220,
    isDemoRating: true,
    germinationRate: "90% Certified",
    purity: "99.0%",
    season: "Spring & Monsoon",
    sowingMethod: "Surface sowing in moist potting mix",
    harvestTime: "40-45 Days to leaf harvest",
    availability: "In Stock",
    tags: ["Tulsi", "Basil", "Ayurveda", "Medicinal", "Sacred Herb", "Immunity"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
        alt: "Vibrant medicinal Krishna Tulsi plant with purple-tinged aromatic leaves"
      }
    ],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80",
    description: "Revered Ayurvedic holy basil with dark purple-tinted serrated leaves and high eugenol content. Excellent for brewing herbal teas, building seasonal immunity, and spiritual home gardens.",
    shortDescription: "Dark purple-veined Krishna Tulsi with high eugenol aroma and adaptogenic value.",
    packSizes: [
      { size: "10g (approx. 5,000 tiny seeds)", price: 85 },
      { size: "50g pack", price: 290 },
      { size: "200g grower pack", price: 890 }
    ],
    packageSizes: [
      { size: "10g (approx. 5,000 tiny seeds)", price: 85 },
      { size: "50g pack", price: 290 },
      { size: "200g grower pack", price: 890 }
    ],
    growingDetails: {
      season: "March to August across all Indian zones",
      soilType: "Well-aerated sandy soil mixed with vermicompost & neem cake",
      sunlight: "Bright sunlight (4–6 hours daily)",
      watering: "Gentle moisture; do not waterlog roots",
      germinationDays: "5–8 Days",
      harvestDays: "40–45 Days to begin harvesting leaves",
      sowingDepth: "Surface scattering; press lightly without deep burial",
      plantSpacing: "30 cm x 30 cm"
    },
    cultivationTips: {
      spacing: "30 cm in pots or beds",
      soilType: "Well-drained potting mix with neem compost",
      sunlight: "4-6 hours sunlight",
      watering: "Water gently at base",
      expectedYield: "Perennial bush producing hundreds of medicinal leaves"
    },
    features: [
      "Rich in natural adaptogens, eugenol, and antioxidants",
      "Deters indoor mosquitoes and airborne pathogens",
      "Perennial longevity when protected from winter frosts"
    ],
    specifications: {
      "Botanical Name": "Ocimum tenuiflorum / sanctum",
      "Variety": "Shyama / Krishna Tulsi",
      "Germination": "90% Certified",
      "Purity": "99.0%"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Days",
      packaging: "Hermetic pouch"
    },
    createdAt: "2026-02-18T10:00:00Z",
    updatedAt: "2026-04-06T12:00:00Z"
  },

  // ================= 6. ORGANIC GARDENING SEEDS =================
  {
    id: "seed-org-01",
    name: "Certified Organic Palak / Spinach (All Green)",
    shortName: "Organic All Green Palak",
    hindiName: "जैविक पालक बीज",
    slug: "organic-all-green-palak",
    category: "vegetable",
    categoryName: "Organic Seeds",
    subCategory: "Leafy Greens",
    brand: "BeejBhandar Organic Line",
    variety: "Desi Open Pollinated (OP)",
    price: 110,
    originalPrice: 150,
    discount: 27,
    discountPercent: 27,
    currency: "INR",
    stock: 125,
    inStock: true,
    sku: "BB-ORG-PLK-014",
    badge: "Certified Organic",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 156,
    isDemoRating: true,
    germinationRate: "92% Certified",
    purity: "99.0%",
    season: "All Season (Except heavy rains)",
    sowingMethod: "Direct line sowing in beds or containers",
    harvestTime: "25-30 Days to first cut",
    availability: "In Stock",
    tags: ["Spinach", "Palak", "Organic", "Iron Rich", "Quick Harvest", "Kitchen Garden"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
        alt: "Fresh crisp broad organic spinach leaves in organic farm bed"
      }
    ],
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80",
    description: "Certified chemical-free, untreated organic spinach seed. Produces tender, broad, glossy green leaves rich in dietary iron, folate, and calcium. Re-grows vigorously for 4 to 5 repeated cuttings.",
    shortDescription: "Chemical-free certified organic spinach providing 4 to 5 iron-rich cuttings.",
    packSizes: [
      { size: "50g packet", price: 110 },
      { size: "150g pack", price: 280 },
      { size: "500g grower bag", price: 790 }
    ],
    packageSizes: [
      { size: "50g packet", price: 110 },
      { size: "150g pack", price: 280 },
      { size: "500g grower bag", price: 790 }
    ],
    growingDetails: {
      season: "September to March optimal; year-round in mild microclimates",
      soilType: "Nutrient-rich loamy soil packed with vermicompost",
      sunlight: "4–6 hours sunlight",
      watering: "Moist soil; water early morning",
      germinationDays: "4–7 Days",
      harvestDays: "25–30 Days for first picking",
      sowingDepth: "1.0 cm deep in rows",
      plantSpacing: "20 cm row x 5 cm thinning"
    },
    cultivationTips: {
      spacing: "20 cm x 5 cm",
      soilType: "Compost rich loamy soil",
      sunlight: "Partial to full sun",
      watering: "Regular gentle watering",
      expectedYield: "4-5 cuts per bed"
    },
    features: [
      "100% untreated, chemical-free foundation seed",
      "High natural iron, chlorophyll and dietary fiber",
      "Fast 25-day cycle ideal for beginner terrace gardeners"
    ],
    specifications: {
      "Botanical Name": "Spinacia oleracea",
      "Organic Certification": "NPOP / Jaivik Bharat Standard",
      "Germination": "92% Guarantee",
      "Purity": "99.0%"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Days",
      packaging: "Bio-degradable inner foil"
    },
    createdAt: "2026-02-20T12:00:00Z",
    updatedAt: "2026-04-08T14:00:00Z"
  },

  {
    id: "seed-org-02",
    name: "Heirloom Red Radish / Desi Lal Mooli",
    shortName: "Heirloom Red Radish",
    hindiName: "देसी लाल मूली बीज",
    slug: "heirloom-red-radish",
    category: "vegetable",
    categoryName: "Organic Seeds",
    subCategory: "Root Crops",
    brand: "BeejBhandar Organic Line",
    variety: "Traditional Desi Heirloom",
    price: 90,
    originalPrice: 125,
    discount: 28,
    discountPercent: 28,
    currency: "INR",
    stock: 115,
    inStock: true,
    sku: "BB-ORG-RDH-015",
    badge: "28-Day Quick Crop",
    isFeatured: false,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 88,
    isDemoRating: true,
    germinationRate: "94% Certified",
    purity: "99.0%",
    season: "Autumn & Winter",
    sowingMethod: "Direct seeding in garden beds / pots",
    harvestTime: "25-28 Days",
    availability: "In Stock",
    tags: ["Radish", "Mooli", "Organic", "Heirloom", "Fast Growing", "Salad"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=800&q=80",
        alt: "Bunch of fresh organic crimson-red round radishes with bright green tops"
      }
    ],
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80",
    description: "Crisp, pungent, bright ruby-red globe radishes with pure white interior flesh. Grows exceptionally fast—ready for salad harvesting within 28 days of sowing. 100% natural heirloom seed lineage.",
    shortDescription: "Crunchy ruby-red globe radishes ready for fresh kitchen harvesting in 28 days.",
    packSizes: [
      { size: "50g packet (approx. 4,500 seeds)", price: 90 },
      { size: "150g pack", price: 230 },
      { size: "500g bulk pack", price: 690 }
    ],
    packageSizes: [
      { size: "50g packet (approx. 4,500 seeds)", price: 90 },
      { size: "150g pack", price: 230 },
      { size: "500g bulk pack", price: 690 }
    ],
    growingDetails: {
      season: "September to February in plains",
      soilType: "Loose, stone-free sandy soil with compost",
      sunlight: "Full sun to mild shade",
      watering: "Regular gentle watering to prevent pithiness",
      germinationDays: "3–5 Days",
      harvestDays: "25–28 Days",
      sowingDepth: "1.0 cm",
      plantSpacing: "15 cm row x 6 cm plant spacing"
    },
    cultivationTips: {
      spacing: "15 cm x 6 cm",
      soilType: "Light sandy soil",
      sunlight: "Full sun",
      watering: "Keep consistently moist so radishes remain crisp",
      expectedYield: "Crisp 3-4 cm globes"
    },
    features: [
      "Rapid 28-day harvest turnaround for fast kitchen returns",
      "Crisp, spicy, juicy texture with zero woodiness",
      "Edible tender green leaves can be cooked as saag"
    ],
    specifications: {
      "Botanical Name": "Raphanus sativus",
      "Variety": "Desi Round Scarlet",
      "Germination": "94% Minimum",
      "Purity": "99.0%"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–4 Days",
      packaging: "Resealable moisture pack"
    },
    createdAt: "2026-02-22T08:30:00Z",
    updatedAt: "2026-04-10T09:00:00Z"
  },

  // ================= 7. FODDER SEED =================
  {
    id: "seed-fodder-01",
    name: "Multi-Cut Egyptian Clover / Berseem (Mescavi)",
    shortName: "Mescavi Berseem Clover",
    hindiName: "बरसीम चारा बीज",
    slug: "mescavi-berseem-clover",
    category: "fodder",
    categoryName: "Fodder Seeds",
    subCategory: "Leguminous Forage",
    brand: "National Dairy Genetics Line",
    variety: "Multi-Cut Foundation",
    price: 360,
    originalPrice: 460,
    discount: 22,
    discountPercent: 22,
    currency: "INR",
    stock: 100,
    inStock: true,
    sku: "BB-FDR-BRS-016",
    badge: "5 to 6 Cuts",
    isFeatured: true,
    isBestSeller: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 168,
    isDemoRating: true,
    germinationRate: "90% Certified",
    purity: "98.5%",
    season: "Rabi (Oct-Nov)",
    sowingMethod: "Standing water broadcasting in well-leveled fields",
    harvestTime: "50-55 Days to first cut, every 25 days thereafter",
    availability: "In Stock",
    tags: ["Fodder", "Berseem", "Dairy Cattle", "High Protein", "Multi-Cut"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        alt: "Lush green dense berseem clover field providing nutritious cattle forage"
      }
    ],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80",
    description: "The 'King of Fodders' for Indian dairy farmers. Highly palatable, succulent, protein-rich (20% crude protein) winter forage clover. Yields 5 to 6 heavy cuts through winter and spring to boost milk production.",
    shortDescription: "High-protein succulent dairy cattle forage providing 5 to 6 heavy multi-cuts.",
    packSizes: [
      { size: "2kg grower pack", price: 360 },
      { size: "10kg farm sack", price: 1650 },
      { size: "25kg dairy commercial sack", price: 3850 }
    ],
    packageSizes: [
      { size: "2kg grower pack", price: 360 },
      { size: "10kg farm sack", price: 1650 },
      { size: "25kg dairy commercial sack", price: 3850 }
    ],
    growingDetails: {
      season: "October 1 to November 15",
      soilType: "Well-leveled clay loam to loamy soil",
      sunlight: "Full sun",
      watering: "Frequent irrigation every 10–12 days",
      germinationDays: "3–5 Days",
      harvestDays: "50–55 Days for first cut; every 25–28 days after",
      sowingDepth: "Broadcast in thin standing water layer",
      plantSpacing: "Broadcast 8–10 kg per acre"
    },
    cultivationTips: {
      spacing: "Broadcast method",
      soilType: "Heavy loams with high moisture retention",
      sunlight: "Full sun",
      watering: "Immediate irrigation after each cutting boosts rapid regrowth",
      expectedYield: "35-40 tonnes green fodder per acre across 5 cuts"
    },
    features: [
      "Contains 20% crude protein & 70% digestible nutrients",
      "Significant boost to cow and buffalo milk yield and butterfat",
      "Restores soil fertility by fixing atmospheric nitrogen"
    ],
    specifications: {
      "Botanical Name": "Trifolium alexandrinum",
      "Variety": "Mescavi Diploid",
      "Germination": "90% Certified",
      "Purity": "98.5%"
    },
    shipping: {
      dispatchTime: "Ships in 24h",
      deliveryWindow: "3–5 Days",
      packaging: "Lined moisture-barrier bag"
    },
    createdAt: "2026-02-25T10:00:00Z",
    updatedAt: "2026-04-12T11:00:00Z"
  }
];

export default seedProducts;
