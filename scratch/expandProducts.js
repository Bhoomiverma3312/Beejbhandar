import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read seedCategories.js
const categoriesPath = path.resolve(__dirname, '../src/data/seedCategories.js');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

// Read existing seedProducts.js to extract the first 16 products
const productsPath = path.resolve(__dirname, '../src/data/seedProducts.js');
const productsContent = fs.readFileSync(productsPath, 'utf8');

// Match the existing 16 products
// We'll parse the categories array by evaluating in a clean context or regex
import('../src/data/seedCategories.js').then(async (catModule) => {
  const { seedCategories, PARENT_CATEGORIES } = catModule;
  const prodModule = await import('../src/data/seedProducts.js');
  const existingProducts = prodModule.seedProducts || [];

  console.log(`Existing products count: ${existingProducts.length}`);
  console.log(`Categories count: ${seedCategories.length}`);

  // Map category to existing products
  const products = [...existingProducts];
  const existingSubCatSlugs = new Set(existingProducts.map(p => p.slug));

  // Category mapping to shop category string
  const parentToShopCat = {
    'vegetable': 'vegetable',
    'fruit': 'fruit',
    'flower': 'flower',
    'field-crop': 'grain', // or pulse/oilseed
    'herb': 'vegetable',
    'specialty': 'vegetable'
  };

  let counter = existingProducts.length + 1;

  for (const cat of seedCategories) {
    // If we already have a product matching this slug or name, skip or add variety
    const alreadyExists = products.some(p => p.subCategoryId === cat.id || p.slug.includes(cat.slug));
    if (alreadyExists) continue;

    const id = `seed-cat-${counter.toString().padStart(3, '0')}`;
    const sku = `BB-${cat.parentId.slice(0,3).toUpperCase()}-${cat.slug.slice(0,3).toUpperCase()}-${counter.toString().padStart(3, '0')}`;
    
    // Price calculation based on role and category
    let basePrice = 120;
    if (cat.parentId === 'flower') basePrice = 95;
    else if (cat.parentId === 'fruit') basePrice = 145;
    else if (cat.parentId === 'herb') basePrice = 110;
    else if (cat.parentId === 'field-crop') basePrice = 280;
    else if (cat.parentId === 'specialty') basePrice = 160;
    else basePrice = 135;

    const discount = (counter % 4) === 0 ? 15 : ((counter % 3) === 0 ? 20 : 10);
    const originalPrice = Math.round(basePrice * (1 + discount / 100));

    // Pack sizes
    let packSizes = [];
    if (cat.parentId === 'field-crop') {
      packSizes = [
        { size: '1 Kg Breeder Pack', price: basePrice },
        { size: '5 Kg Farm Pack', price: Math.round(basePrice * 4.6) },
        { size: '20 Kg Field Bag', price: Math.round(basePrice * 17.5) },
        { size: '50 Kg Wholesale Sacking', price: Math.round(basePrice * 42) }
      ];
    } else {
      packSizes = [
        { size: 'Standard Pouch (approx. 50-100 seeds)', price: basePrice },
        { size: 'Grower Kit (3 pouches)', price: Math.round(basePrice * 2.7) },
        { size: 'Bulk Economy Pack (250g)', price: Math.round(basePrice * 5.2) }
      ];
    }

    const product = {
      id,
      name: `${cat.name} Certified Seeds`,
      shortName: cat.name,
      hindiName: `${cat.hindiName || cat.name} उन्नत बीज`,
      slug: `${cat.slug}-seeds`,
      category: parentToShopCat[cat.parentId] || 'vegetable',
      categoryName: PARENT_CATEGORIES.find(p => p.id === cat.parentId)?.name || 'Vegetable Seeds',
      parentId: cat.parentId,
      subCategoryId: cat.id,
      subCategory: cat.name,
      brand: (counter % 2 === 0) ? "BeejBhandar Elite Line" : "Kisan Bharti Research Seeds",
      variety: "Certified True-to-Type F1 / Desi Selection",
      price: basePrice,
      originalPrice,
      discount,
      discountPercent: discount,
      currency: "INR",
      stock: 40 + (counter * 3 % 60),
      inStock: true,
      sku,
      badge: (counter % 5 === 0) ? "Bestseller" : ((counter % 7 === 0) ? "Seasonal" : "Certified"),
      isFeatured: cat.isFeatured || (counter % 6 === 0),
      isBestSeller: (counter % 5 === 0),
      isBestseller: (counter % 5 === 0),
      rating: Number((4.5 + (counter % 5) * 0.1).toFixed(1)),
      reviewCount: 30 + (counter * 7 % 120),
      isDemoRating: true,
      germinationRate: "88%–94% Lab Verified",
      purity: "99.0%",
      season: cat.season || "All Season",
      sowingMethod: "Direct sowing or nursery transplant",
      harvestTime: "60–90 Days",
      availability: "In Stock (Central Depot Dispatch)",
      roles: cat.roles || ['farmer', 'gardener'],
      tags: [cat.name, cat.cropType || "Seeds", "Certified", "High Germination"],
      images: [
        {
          url: cat.image,
          alt: `${cat.name} seeds pouch and mature crop`
        }
      ],
      image: cat.image,
      description: `${cat.shortDesc}. High vigor seed lot with tested physical purity, uniform emergence, and high tolerance to common regional pathogens. Suitable for ${cat.roles.join(', ')} growers.`,
      shortDescription: cat.shortDesc,
      packSizes,
      packageSizes: packSizes,
      growingDetails: {
        season: cat.season || "Kharif & Rabi",
        soilType: "Well-drained fertile loam rich in organic matter",
        sunlight: "Full sun (6–8 hours daily)",
        watering: "Moderate regular irrigation; avoid waterlogging",
        germinationDays: "5–10 Days",
        harvestDays: "60–90 Days",
        sowingDepth: "0.5 cm – 1.5 cm",
        plantSpacing: "30 cm x 15 cm"
      },
      cultivationTips: {
        spacing: "30 cm x 15 cm",
        soilType: "Well-drained fertile loam",
        sunlight: "Full sun",
        watering: "Moderate regular irrigation",
        expectedYield: "High standard harvest per unit area"
      },
      features: [
        "Rigorous seed lot germination and moisture tested",
        "High genetic purity with uniform crop canopy",
        "Hermetically sealed foil pouch for extended vigor"
      ],
      specifications: {
        "Crop": cat.name,
        "Type": cat.cropType || "Agricultural",
        "Germination": "90% Min Certified",
        "Genetic Purity": "99% Min"
      },
      shipping: {
        dispatchTime: "Ships in 24h",
        deliveryWindow: "3–5 Days",
        packaging: "Hermetic barrier pack"
      },
      createdAt: "2026-03-01T10:00:00Z",
      updatedAt: "2026-04-10T12:00:00Z"
    };

    products.push(product);
    counter++;
  }

  console.log(`Total products generated: ${products.length}`);

  const outputCode = `/**
 * BeejBhandar – Verified Seed Products Master Dataset
 * 
 * ${products.length} Comprehensive sample seed products covering:
 * - Vegetable seeds (Solanaceous, Cucurbits, Cole crops, Roots & Leafy)
 * - Fruit seeds (Papaya, Watermelon, Muskmelon, Strawberry, etc.)
 * - Flower seeds (Marigold, Sunflower, Zinnia, Petunia, etc.)
 * - Field crop seeds (Grains, Pulses, Oilseeds, Fodder)
 * - Herb & Medicinal seeds (Basil, Mint, Thyme, Ashwagandha, etc.)
 * - Specialty & Gardening mixes (Microgreens, Lawn Grass, Cover Crops)
 * 
 * Conforms to all requirements:
 * id, name, slug, category, subCategory, brand, price, originalPrice, discount, currency,
 * stock, sku, packSizes, packageSizes, images, image, description, rating, reviewCount,
 * growingDetails, cultivationTips, features, specifications, roles, availability.
 * 
 * Note: Unverified product information is demo data for demonstration purposes.
 */

export const seedProducts = ${JSON.stringify(products, null, 2)};

export default seedProducts;
`;

  fs.writeFileSync(productsPath, outputCode, 'utf8');
  console.log('Successfully wrote expanded seedProducts.js!');
});
