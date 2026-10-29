import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth, ROLE_ROUTES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target
  const searchParams = new URLSearchParams(location.search);
  const redirectTarget = searchParams.get('redirect');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your registered email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`, 'success');
      const target = redirectTarget || ROLE_ROUTES[result.user.role] || '/';
      navigate(target, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setErrorMessage('');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sprout size={16} />
            <span>BeejBhandar Portal Access</span>
          </div>
          <h1 className="auth-title">Sign In to Dashboard</h1>
          <p className="auth-subtitle">
            Access role-tailored agricultural catalogs, sowing calendars & bulk pricing
          </p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="demo-accounts-panel">
          <div className="demo-accounts-title">
            <span>⚡ One-Click Demo Personas:</span>
            <span style={{ fontSize: '0.65rem', color: '#B45309' }}>Password: demo123</span>
          </div>
          <div className="demo-pills-row">
            <button
              type="button"
              className="demo-quick-btn"
              onClick={() => handleQuickDemo('farmer@demo.com', 'farmer')}
            >
              <span>🚜 Farmer</span>
              <span className="demo-pill-sub">Ramesh Kumar</span>
            </button>
            <button
              type="button"
              className="demo-quick-btn"
              onClick={() => handleQuickDemo('coop@demo.com', 'coop')}
            >
              <span>🏢 Cooperative</span>
              <span className="demo-pill-sub">Punjab Agri Co-op</span>
            </button>
            <button
              type="button"
              className="demo-quick-btn"
              onClick={() => handleQuickDemo('gardener@demo.com', 'gardener')}
            >
              <span>🪴 Gardener</span>
              <span className="demo-pill-sub">Priya Sharma</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Registered Email Address</label>
            <input
              id="login-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. farmer@demo.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            <LogIn size={18} />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        <div className="auth-footer">
          Don't have an agricultural account yet?{' '}
          <Link to="/register">Create new account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
