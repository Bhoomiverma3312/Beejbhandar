import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth, ROLE_ROUTES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { RoleSelector } from '../components/RoleSelector';

export const RegisterPage = () => {
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    organization: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name or representative name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 5) {
      setErrorMessage('Password must be at least 5 characters.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      ...formData,
      role
    });
    setIsSubmitting(false);

    if (result.success) {
      showToast(`Account registered as ${role.toUpperCase()}! Welcome to BeejBhandar.`, 'success');
      const target = ROLE_ROUTES[role] || '/';
      navigate(target, { replace: true });
    } else {
      setErrorMessage(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: '580px' }}>
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sprout size={16} />
            <span>BeejBhandar Registration</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Choose your agricultural role to receive personalized catalogs & pricing
          </p>
        </div>

        {/* Step 1: Role Selector */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="auth-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Select Your Agricultural Profile:
          </label>
          <RoleSelector selectedRole={role} onSelectRole={setRole} />
        </div>

        {errorMessage && (
          <div className="auth-error-banner" role="alert" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-name">
              {role === 'coop' ? 'Contact Person Name' : 'Full Name'}
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              className="auth-input"
              value={formData.name}
              onChange={handleChange}
              placeholder={role === 'coop' ? 'Secretary or Manager Name' : 'e.g. Ramesh Kumar'}
              required
            />
          </div>

          {role === 'coop' && (
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-org">Cooperative Society / Organization Name</label>
              <input
                id="reg-org"
                name="organization"
                type="text"
                className="auth-input"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Ludhiana Kisan Cooperative Society Ltd."
                required
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-phone">Mobile Number</label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className="auth-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 00000"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 5 characters"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-loc">State & District</label>
              <input
                id="reg-loc"
                name="location"
                type="text"
                className="auth-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Karnal, Haryana"
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            <UserPlus size={18} />
            <span>{isSubmitting ? 'Registering Account...' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="auth-footer">
          Already registered?{' '}
          <Link to="/login">Sign in with your email</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
