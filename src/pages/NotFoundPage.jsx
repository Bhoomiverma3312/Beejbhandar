import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  return (
    <div className="container section-py text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '64px', height: '64px', background: 'var(--bg-sage-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <Sprout size={36} />
      </div>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>404 - Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
        The agricultural page you were searching for does not exist or has been relocated.
      </p>
      <Link to="/">
        <Button variant="primary" icon={ArrowRight} iconPosition="right">
          Back to BeejBhandar Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
