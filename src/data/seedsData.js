export { categories } from './categoriesData';
export { seedProducts } from './seedProducts';
import { seedProducts } from './seedProducts';

export const initialProducts = seedProducts;

export const heroSlides = [
  {
    id: 1,
    tagline: "India's Trusted Seed Destination",
    title: "Good Things Grow From Great Seeds.",
    description: "Discover quality seeds for your farm, garden and every growing season.",
    primaryCtaText: "Explore Seeds",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Explore Growing Guide",
    secondaryCtaLink: "#growing-guide",
    badge: "100% Certified Germination Rate",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
  }
];

export const trustHighlights = [
  {
    id: 1,
    title: "90%+ Tested Germination",
    desc: "Rigorous batch-testing in government-accredited seed testing laboratories.",
    icon: "ShieldCheck"
  },
  {
    id: 2,
    title: "100% Non-GMO & Pure Genetics",
    desc: "True-to-type certified foundation genetics with zero noxious weed mixes.",
    icon: "Sprout"
  },
  {
    id: 3,
    title: "Hermetic Barrier Pouching",
    desc: "Aluminum-foil moisture-sealed packaging preserves seed vigor for 24+ months.",
    icon: "Truck"
  },
  {
    id: 4,
    title: "Dedicated Agronomy Support",
    desc: "Step-by-step guidance on sowing depth, spacing, and plant nutrition.",
    icon: "Headphones"
  }
];

export const qualityAndStorageInfo = [
  {
    id: 1,
    title: "5-Layer Moisture Barrier",
    desc: "Each pack is hermetically sealed in multi-layer aluminum foil that shields seed embryo vigor from ambient humidity and air degradation.",
    tag: "Packaging Standard"
  },
  {
    id: 2,
    title: "Optimal Storage Temperature",
    desc: "Stored in temperature-controlled warehouses at 15°C – 18°C and below 45% relative humidity to maintain high seedling emergence energy.",
    tag: "Depot Climate"
  },
  {
    id: 3,
    title: "IMSCS Batch Verification",
    desc: "Complies with Indian Minimum Seed Certification Standards (IMSCS). Each bag features distinct physical lot numbers for complete traceability.",
    tag: "Govt. Notified"
  },
  {
    id: 4,
    title: "Seed Health & Vigor Testing",
    desc: "Subjected to tetrazolium and standard sand/towel germination tests prior to clearance for distribution.",
    tag: "Laboratory Tested"
  }
];

export const growingTips = [
  {
    step: "01",
    title: "Soil Preparation & Organic Matter",
    summary: "Create a loose, friable seedbed free of large clods. Incorporate aged compost or vermicompost to ensure healthy aeration and natural moisture retention.",
    keyTip: "Optimal soil pH is 6.2 – 7.2 for most Indian vegetable and field crops."
  },
  {
    step: "02",
    title: "Seed Sowing Depth Rule",
    summary: "As a general botanical rule, sow seeds at a depth equal to 2 to 3 times their diameter. Very tiny seeds (like Marigold or Tomato) should be lightly pressed onto the surface.",
    keyTip: "Never bury small seeds too deep; they need light and moisture to sprout."
  },
  {
    step: "03",
    title: "Even Moisture & Temperature",
    summary: "Keep the upper 2 inches of soil consistently damp like a wrung-out sponge, never waterlogged. Use a fine-rose watering can or gentle drip irrigation.",
    keyTip: "Warm soil (22°C – 28°C) triggers uniform, vigorous emergence within 4-7 days."
  },
  {
    step: "04",
    title: "Thinning & Early Nutrition",
    summary: "Once true leaves appear, thin out weaker seedlings to the recommended plant-to-plant spacing to prevent nutrient competition and stunted root balls.",
    keyTip: "Mulch with clean dry straw to keep soil cool and retain soil biology."
  }
];

export const testimonials = [
  {
    id: 1,
    farmerName: "Shivam Yadav",
    location: "Anand, Gujarat",
    crop: "Kashi Kranti Okra & Pusa Ruby Tomato",
    comment: "The germination was above 95% in my 4-acre field. Pod quality was uniform dark green with no virus infestation even during heavy monsoon. BeejBhandar is truly dependable.",
    rating: 5,
    date: "Harvest Season 2026",
    isDemo: true,
    badge: "Verified Farm Cultivator"
  },
  {
    id: 2,
    farmerName: "Gurpreet Singh Sandhu",
    location: "Ludhiana, Punjab",
    crop: "HD-2967 Sharbati Wheat",
    comment: "Bold lustrous grains and zero lodging even during untimely winds. Sowed 40kg foundation pack and harvested 25 quintals per acre. Excellent packaging.",
    rating: 5,
    date: "Rabi Season 2026",
    isDemo: true,
    badge: "Commercial Grain Producer"
  },
  {
    id: 3,
    farmerName: "Sunita Deshmukh",
    location: "Nashik, Maharashtra",
    crop: "Desi Coriander & Marigold",
    comment: "For my terrace kitchen garden and nursery, the multi-cut coriander gave 4 full flushes. Beautiful aroma and tender leaves.",
    rating: 5,
    date: "Spring 2026",
    isDemo: true,
    badge: "Terrace Horticulturist"
  }
];
