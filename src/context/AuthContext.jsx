/**
 * BeejBhandar – Demo Authentication Context
 * 
 * DEMO ONLY: All auth is localStorage-based.
 * For production: replace with JWT/OAuth backend calls.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'beejbhandar_auth_v1';
const USERS_STORAGE_KEY = 'beejbhandar_users_v1';

// Default demo users for each role
const DEFAULT_DEMO_USERS = [
  {
    id: 'demo-farmer-01',
    name: 'Ramesh Kumar',
    email: 'farmer@demo.com',
    password: 'demo123',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Karnal, Haryana',
    avatar: null,
    organization: null,
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'demo-coop-01',
    name: 'Punjab Agri Cooperative',
    email: 'coop@demo.com',
    password: 'demo123',
    role: 'coop',
    phone: '+91 98765 11111',
    location: 'Ludhiana, Punjab',
    avatar: null,
    organization: 'Punjab Agri Cooperative Society Ltd.',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'demo-gardener-01',
    name: 'Priya Sharma',
    email: 'gardener@demo.com',
    password: 'demo123',
    role: 'gardener',
    phone: '+91 98765 55555',
    location: 'Pune, Maharashtra',
    avatar: null,
    organization: null,
    createdAt: '2026-01-01T00:00:00Z'
  }
];

// Role to dashboard path mapping
export const ROLE_ROUTES = {
  farmer: '/farmer/dashboard',
  coop: '/coop/dashboard',
  gardener: '/gardener/dashboard'
};

export const ROLE_LABELS = {
  farmer: 'Farmer',
  coop: 'Co-operative',
  gardener: 'Gardener'
};

const getStoredUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    // Initialize with default demo users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
    return DEFAULT_DEMO_USERS;
  } catch {
    return DEFAULT_DEMO_USERS;
  }
};

const saveUsers = (users) => {
  try { localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users)); } catch {}
};

const getStoredSession = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredSession);
  const [loading, setLoading] = useState(false);

  const persistSession = useCallback((userData) => {
    try {
      if (userData) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate network
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    setLoading(false);
    if (!found) {
      return { success: false, error: 'Invalid email or password. Try farmer@demo.com / demo123' };
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    persistSession(safeUser);
    return { success: true, user: safeUser };
  }, [persistSession]);

  const register = useCallback(async (formData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const users = getStoredUsers();
    const exists = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (exists) {
      setLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role || 'gardener',
      phone: formData.phone || '',
      location: formData.location || '',
      avatar: null,
      organization: formData.organization || null,
      createdAt: new Date().toISOString()
    };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    persistSession(safeUser);
    setLoading(false);
    return { success: true, user: safeUser };
  }, [persistSession]);

  const logout = useCallback(() => {
    setUser(null);
    persistSession(null);
  }, [persistSession]);

  const updateProfile = useCallback((updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    persistSession(updated);
    // Also update in users store
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) {
      users[idx] = { ...users[idx], ...updates };
      saveUsers(users);
    }
  }, [user, persistSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
