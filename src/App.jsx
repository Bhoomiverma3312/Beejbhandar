import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';

// Layout & Reusable Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotifications } from './components/ToastNotifications';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CartDrawer } from './components/CartDrawer';

// Public Page Views
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// New Role-Based & Category Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SeedCategories } from './pages/SeedCategories';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { CoopDashboard } from './pages/coop/CoopDashboard';
import { GardenerDashboard } from './pages/gardener/GardenerDashboard';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App Layout Renderer with route awareness
function AppContent() {
  const { pathname } = useLocation();
  const isDashboardRoute =
    pathname.startsWith('/farmer') ||
    pathname.startsWith('/coop') ||
    pathname.startsWith('/co-op') ||
    pathname.startsWith('/gardener');

  if (isDashboardRoute) {
    return (
      <div className="dashboard-root">
        <ScrollToTop />
        <Routes>
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coop/dashboard"
            element={
              <ProtectedRoute requiredRole="coop">
                <CoopDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/co-op/dashboard"
            element={
              <ProtectedRoute requiredRole="coop">
                <CoopDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gardener/dashboard"
            element={
              <ProtectedRoute requiredRole="gardener">
                <GardenerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <CartDrawer />
        <ToastNotifications />
      </div>
    );
  }

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/categories" element={<SeedCategories />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <ToastNotifications />
    </div>
  );
}

import { LanguageProvider } from './context/LanguageContext';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <OrdersProvider>
                  <AppContent />
                </OrdersProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
