import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Button } from '../components/Button';

export const AboutPage = () => {
  return (
    <div className="about-page section-py">
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Hero Header */}
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-subtitle">Academic & Software Project</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
            Online Seed Shopping System
          </h1>
          <p className="section-desc" style={{ margin: '0 auto', fontSize: '1.1rem' }}>
            Project Architect: <strong>Bhoomi Verma</strong>
          </p>
        </div>

        {/* Project Overview Card */}
        <div className="surface-card" style={{ padding: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-sage-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sprout size={22} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Project Mission & Vision</h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            <strong>BeejBhandar</strong> was conceived and developed by <strong>Bhoomi Verma</strong> to solve one of the most critical challenges facing modern Indian agriculture: <em>reliable, transparent access to certified high-germination seed genetics</em>.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Counterfeit and low-vigor seeds cause substantial crop failure and economic distress among farmers. BeejBhandar establishes an intuitive, resilient, and aesthetically sophisticated digital storefront where farmers, terrace horticulturists, and rural growers can inspect scientific germination statistics, season timing, and packet sizing before buying.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Physical Purity Verification</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Minimum 98.5%–99.5% genetic purity standards across all catalog entries.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Farmer Education First</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Integrated agronomy advisories covering row spacing, soil chemistry, and irrigation.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Non-GMO Heritage Stocks</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preservation of indigenous heirloom varieties alongside certified commercial hybrids.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="surface-card" style={{ padding: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-sage-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={22} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Frontend Architecture & Standards</h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.25rem' }}>
            Constructed with rigorous software engineering best practices without external CSS framework bloat:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>React 19 & Vite 8 Core</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Ultra-fast HMR, component modularity, hooks-based state orchestration, and lightweight bundle footprint.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>Pure Vanilla CSS Design System</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Meticulously designed with custom CSS variables for ivory palette (#F8F7F0), forest green (#24563C), and refined typography.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>Multi-Context State Management</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                CartContext, WishlistContext, OrdersContext, and ToastContext with automatic browser persistence.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: '4px' }}>Accessible & Responsive</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Tested for touch targets, keyboard navigation, high-contrast readability, and responsive mobile drawers.
              </p>
            </div>
          </div>
        </div>

        {/* Project Developer Profile */}
        <div className="surface-card" style={{ padding: 'var(--space-2xl)', background: 'linear-gradient(135deg, #173D2B 0%, #24563C 100%)', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-pill)', background: 'var(--bg-sage)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              BV
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>Bhoomi Verma</h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Lead Developer & Designer
              </span>
            </div>
          </div>

          <p style={{ color: '#D3E0D8', lineHeight: '1.65', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            "This Online Seed Shopping System was developed with the goal of combining high aesthetic refinement with grounded agricultural utility. Every element—from germination rate indicators to moisture barrier packaging details—reflects real Indian farming conditions."
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <Button variant="accent" size="md" icon={ArrowRight} iconPosition="right">
                Explore Seed Products
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="secondary" size="md">
                Open Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
