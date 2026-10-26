import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutSection from '../components/home/AboutSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aari-page-padding" style={{ paddingTop: '7.5rem' }}>
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--gold-primary)' }}>Home</Link>
          <span>/</span>
          <span>Heritage of Aari Needlecraft</span>
        </div>
      </div>
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
};

export default AboutPage;
