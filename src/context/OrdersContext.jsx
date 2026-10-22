import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext(null);
const ORDERS_STORAGE_KEY = 'beejbhandar_orders_v1';

const defaultOrders = [
  {
    orderId: "BB-94821",
    date: "2026-03-12T10:30:00Z",
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    items: [
      {
        id: "seed-veg-01",
        name: "Desi F1 Hybrid Tomato (Pusa Ruby Plus)",
        shortName: "Pusa Ruby Plus Tomato",
        selectedSize: "50g packet",
        selectedPrice: 420,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "seed-flower-01",
        name: "Royal Orange African Marigold (Genda F1)",
        shortName: "Royal Orange Marigold",
        selectedSize: "10g (approx. 3,200 seeds)",
        selectedPrice: 160,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=700&q=80"
      }
    ],
    shippingAddress: {
      fullName: "Bhoomi Verma",
      phone: "+91 98765 43210",
      street: "Plot 14, Kisan Krishi Vihar, GT Road",
      city: "Karnal",
      state: "Haryana",
      pincode: "132001"
    },
    subtotal: 1000,
    shippingFee: 0,
    total: 1000,
    trackingNumber: "DTDC-IN-78491024",
    estimatedDelivery: "2026-03-15"
  }
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultOrders;
    } catch {
      return defaultOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  const placeOrder = (orderData) => {
    const orderId = `BB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      status: "Confirmed",
      paymentStatus: "Paid",
      trackingNumber: `AGRI-IND-${Math.floor(10000000 + Math.random() * 90000000)}`,
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.orderId === id || o.orderId === `BB-${id}`);
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
