import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'beejbhandar_cart_v2';
const COUPON_STORAGE_KEY = 'beejbhandar_coupon_v2';

// Configurable Demo Coupons
export const DEMO_COUPONS = {
  KISAN10: { type: 'percent', value: 10, label: 'Kisan 10% Sowing Discount', minOrder: 0 },
  BHOOMI10: { type: 'percent', value: 10, label: 'Bhoomi Verma 10% Special', minOrder: 0 },
  AGRI20: { type: 'percent', value: 20, label: 'Agri Bulk 20% Discount (Orders ₹1000+)', minOrder: 1000 },
  FREESHIP: { type: 'freeship', value: 0, label: 'Zero Delivery Fee Promo', minOrder: 0 },
  FIRSTSEED: { type: 'flat', value: 50, label: 'First Seed Order ₹50 Off', minOrder: 200 }
};

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  // 1. Cart Items with localStorage Persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('beejbhandar_cart_v1');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) => item && item.id && item.selectedSize && typeof item.selectedPrice === 'number'
      );
    } catch {
      return [];
    }
  });

  // 2. Coupon State with Persistence
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  // 3. Mini-Cart Drawer Visibility
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync coupon to localStorage
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {}
  }, [appliedCoupon]);

  // Drawer handlers
  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setIsCartDrawerOpen(prev => !prev), []);

  /**
   * Flexible Add to Cart supporting multiple parameter signatures:
   * 1. addToCart(product, sizeObj, quantity) -> e.g. from ProductCard / ShopPage
   * 2. addToCart(product, quantity, sizeStr, priceNum) -> e.g. from SeedProductCard
   * 3. addToCart(product) -> default pack size and 1 qty
   */
  const addToCart = useCallback((product, param2, param3, param4) => {
    if (!product) return false;

    // Stock validation
    const availableStock = typeof product.stock === 'number' ? product.stock : 99;
    if (!product.inStock || availableStock <= 0) {
      showToast(`Sorry, ${product.shortName || product.name} is currently out of stock.`, 'error');
      return false;
    }

    let size = 'Standard Pack';
    let price = product.price || 150;
    let quantity = 1;

    // Normalize parameters
    if (typeof param2 === 'object' && param2 !== null && param2.size) {
      // Signature 1: (product, sizeObj, quantity)
      size = param2.size;
      price = typeof param2.price === 'number' ? param2.price : (product.price || 150);
      quantity = typeof param3 === 'number' && param3 > 0 ? param3 : 1;
    } else if (typeof param2 === 'number' && typeof param3 === 'string') {
      // Signature 2: (product, quantity, sizeStr, priceNum)
      quantity = param2 > 0 ? param2 : 1;
      size = param3;
      price = typeof param4 === 'number' ? param4 : (product.price || 150);
    } else if (typeof param2 === 'string') {
      size = param2;
      quantity = typeof param3 === 'number' && param3 > 0 ? param3 : 1;
      price = typeof param4 === 'number' ? param4 : (product.price || 150);
    } else {
      // Default to first pack size
      const rawSizes = product.packageSizes || product.packSizes || [];
      if (rawSizes[0]) {
        size = rawSizes[0].size;
        price = rawSizes[0].price || product.price;
      }
      quantity = typeof param2 === 'number' && param2 > 0 ? param2 : 1;
    }

    setCartItems((prevItems) => {
      // Match by composite key: id + selectedSize
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const currentQty = prevItems[existingIndex].quantity;
        if (currentQty >= availableStock) {
          showToast(`Maximum available stock (${availableStock} packets) is already in your cart.`, 'error');
          return prevItems;
        }

        const allowedQty = Math.min(availableStock, currentQty + quantity);
        const addedAmount = allowedQty - currentQty;

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: allowedQty,
          stock: availableStock,
          selectedPrice: price
        };

        if (addedAmount < quantity) {
          showToast(`Added ${addedAmount} packet(s). Depot stock limit is ${availableStock}.`, 'info');
        } else {
          showToast(`Updated ${product.shortName || product.name} (${size}) quantity to ${allowedQty}`, 'success');
        }
        return updated;
      } else {
        const allowedQty = Math.min(availableStock, quantity);
        const newItem = {
          id: product.id,
          slug: product.slug,
          name: product.name,
          shortName: product.shortName || product.name,
          image: product.image || product.images?.[0]?.url || '/images/seed-placeholder.svg',
          categoryName: product.categoryName || 'Seed Variety',
          category: product.category || 'vegetable',
          brand: product.brand || 'BeejBhandar Elite Line',
          selectedSize: size,
          selectedPrice: price,
          originalPrice: product.originalPrice || Math.round(price * 1.2),
          germinationRate: product.germinationRate || '90%+ Certified',
          stock: availableStock,
          quantity: allowedQty,
          packSizes: product.packSizes || product.packageSizes || [{ size, price }]
        };

        if (allowedQty < quantity) {
          showToast(`Added ${allowedQty} packet(s). Depot stock limit is ${availableStock}.`, 'info');
        } else {
          showToast(`Added ${newItem.shortName} (${size}) to your cart`, 'success');
        }
        return [...prevItems, newItem];
      }
    });

    return true;
  }, [showToast]);

  // Remove single line item
  const removeFromCart = useCallback((productId, selectedSize) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === productId && i.selectedSize === selectedSize);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.shortName} (${itemToRemove.selectedSize}) from cart`, 'info');
      }
      return prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      );
    });
  }, [showToast]);

  // Update item quantity
  const updateQuantity = useCallback((productId, selectedSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          const maxStock = typeof item.stock === 'number' ? item.stock : 99;
          if (newQuantity > maxStock) {
            showToast(`Cannot exceed available depot stock of ${maxStock} packets.`, 'error');
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, [removeFromCart, showToast]);

  // Change pack size of an item in the cart
  const changeItemPackSize = useCallback((productId, oldSize, newSize, newPrice) => {
    setCartItems((prev) => {
      const existingTarget = prev.find((i) => i.id === productId && i.selectedSize === newSize);
      const currentItem = prev.find((i) => i.id === productId && i.selectedSize === oldSize);

      if (!currentItem) return prev;

      if (existingTarget) {
        // Merge quantities if target size already exists in cart
        return prev
          .filter((i) => !(i.id === productId && i.selectedSize === oldSize))
          .map((i) => {
            if (i.id === productId && i.selectedSize === newSize) {
              const maxStock = i.stock || 99;
              return { ...i, quantity: Math.min(maxStock, i.quantity + currentItem.quantity) };
            }
            return i;
          });
      }

      // Otherwise simply update size and price
      return prev.map((item) => {
        if (item.id === productId && item.selectedSize === oldSize) {
          return {
            ...item,
            selectedSize: newSize,
            selectedPrice: newPrice
          };
        }
        return item;
      });
    });
    showToast(`Pack size updated to ${newSize}`, 'info');
  }, [showToast]);

  // Clear cart with optional confirmation
  const clearCart = useCallback((confirmPrompt = false) => {
    if (confirmPrompt) {
      const confirmed = window.confirm('Are you sure you want to empty your entire seed cart?');
      if (!confirmed) return false;
    }
    setCartItems([]);
    setAppliedCoupon(null);
    showToast('Your shopping cart has been cleared.', 'info');
    return true;
  }, [showToast]);

  // Coupon application logic
  const applyCoupon = useCallback((code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      showToast('Please enter a coupon code.', 'error');
      return { success: false, message: 'Please enter a coupon code.' };
    }

    const coupon = DEMO_COUPONS[cleanCode];
    if (!coupon) {
      showToast(`Invalid code "${cleanCode}". Try KISAN10, BHOOMI10, AGRI20, or FREESHIP.`, 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }

    // Minimum order check
    const currentSubtotal = cartItems.reduce(
      (acc, item) => acc + item.selectedPrice * item.quantity,
      0
    );

    if (coupon.minOrder && currentSubtotal < coupon.minOrder) {
      const msg = `Code ${cleanCode} requires a minimum cart subtotal of ₹${coupon.minOrder}.`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    setAppliedCoupon(cleanCode);
    showToast(`Coupon ${cleanCode} applied! ${coupon.label}`, 'success');
    return { success: true, coupon };
  }, [cartItems, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Promo code removed.', 'info');
  }, [showToast]);

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice * item.quantity,
    0
  );
  const originalSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.selectedPrice) * item.quantity,
    0
  );

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Shipping rules: Free if subtotal > 499, or empty, or FREESHIP coupon applied
  const isFreeShipping = appliedCoupon === 'FREESHIP' || cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 50;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon && DEMO_COUPONS[appliedCoupon]) {
    const c = DEMO_COUPONS[appliedCoupon];
    if (c.type === 'percent') {
      discountAmount = Math.round(cartSubtotal * (c.value / 100));
    } else if (c.type === 'flat') {
      discountAmount = Math.min(cartSubtotal, c.value);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);
  const totalSavings = Math.max(0, (originalSubtotal - cartSubtotal) + discountAmount + (isFreeShipping && cartSubtotal > 0 ? 50 : 0));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        changeItemPackSize,
        clearCart,
        cartCount,
        cartSubtotal,
        originalSubtotal,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        remainingForFreeShipping,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        cartTotal,
        totalSavings,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
