import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CollectionsSection from '../components/home/CollectionsSection';
import SectionTitle from '../components/common/SectionTitle';

const CollectionsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectForCommission = (item) => {
    navigate('/custom-order', { state: { preselectedItem: item } });
  };

  return (
    <div className="aari-page-padding" style={{ paddingTop: '7.5rem' }}>
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--gold-primary)' }}>Home</Link>
          <span>/</span>
          <span>Haute Collections</span>
        </div>
      </div>
      <CollectionsSection onSelectForCommission={handleSelectForCommission} />
    </div>
  );
};

export default CollectionsPage;
