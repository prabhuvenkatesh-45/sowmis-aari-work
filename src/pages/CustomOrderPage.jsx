import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomOrderSection from '../components/home/CustomOrderSection';
import FaqSection from '../components/home/FaqSection';

const CustomOrderPage = () => {
  const location = useLocation();
  const preselectedItem = location.state?.preselectedItem || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aari-page-padding" style={{ paddingTop: '7.5rem' }}>
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--gold-primary)' }}>Home</Link>
          <span>/</span>
          <span>Bespoke Commission Studio</span>
        </div>
      </div>
      <CustomOrderSection preselectedItem={preselectedItem} />
      <FaqSection />
    </div>
  );
};

export default CustomOrderPage;
