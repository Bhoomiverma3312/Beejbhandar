import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, ROLE_ROUTES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { showToast } = useToast();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  // Not logged in -> send to login with redirect param
  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role restriction check
  if (requiredRole && user.role !== requiredRole) {
    // Show polite warning that user doesn't have access to this role
    if (showToast) {
      showToast(`Your account role is '${user.role}'. Redirected to your assigned dashboard.`, 'warning');
    }
    const targetRoute = ROLE_ROUTES[user.role] || '/';
    return <Navigate to={targetRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;
