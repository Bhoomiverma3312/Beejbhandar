import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'beejbhandar_cart_v1';

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      // Sanitize stored items to ensure valid numbers & non-corrupted state
      return parsed.filter(
        (item) => item && item.id && item.selectedSize && typeof item.selectedPrice === 'number'
      );
    } catch (e) {
      console.warn('Failed to parse cart from localStorage, initializing fresh', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSizeObj, quantity = 1) => {
    if (!product) return false;

    // 1. Stock check
    const availableStock = typeof product.stock === 'number' ? product.stock : 99;
    if (!product.inStock || availableStock <= 0) {
      showToast(`Sorry, ${product.shortName || product.name} is currently out of stock.`, 'error');
      return false;
    }

    const sizes = product.packageSizes || product.packSizes || [];
    const size = selectedSizeObj?.size || sizes[0]?.size || 'Standard Pack';
    const price = selectedSizeObj?.price || product.price;

    setCartItems((prevItems) => {
      // Find matching item by composite key: id + selectedSize
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
          showToast(`Added ${addedAmount} packet(s). Maximum depot stock reached (${availableStock}).`, 'info');
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
          image: product.image || product.images?.[0]?.url || '',
          categoryName: product.categoryName,
          category: product.category,
          brand: product.brand,
          selectedSize: size,
          selectedPrice: price,
          germinationRate: product.germinationRate,
          stock: availableStock,
          quantity: allowedQty
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
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === productId && i.selectedSize === selectedSize);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.shortName} (${itemToRemove.selectedSize}) from cart`, 'info');
      }
      return prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      );
    });
  };

  const updateQuantity = (productId, selectedSize, newQuantity) => {
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
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice * item.quantity,
    0
  );
  // Free delivery above ₹499
  const shippingFee = cartSubtotal > 499 || cartSubtotal === 0 ? 0 : 60;
  const cartTotal = cartSubtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal
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
