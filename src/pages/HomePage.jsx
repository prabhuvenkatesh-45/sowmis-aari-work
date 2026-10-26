import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import CollectionsSection from '../components/home/CollectionsSection';
import ProcessSection from '../components/home/ProcessSection';
import CustomOrderSection from '../components/home/CustomOrderSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';

const HomePage = () => {
  const [preselectedItem, setPreselectedItem] = useState(null);

  const handleSelectForCommission = (item) => {
    setPreselectedItem(item);
    const formElement = document.getElementById('custom-order');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg) => {
    setPreselectedItem({
      title: `${pkg.name} Tier Commission`,
      price: pkg.startingPrice,
      categoryLabel: pkg.name,
      category: 'Bridal',
    });
    const formElement = document.getElementById('custom-order');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="aari-home-page">
      {/* 1. Hero */}
      <Hero />

      {/* 2. About Us */}
      <AboutSection />

      {/* 3. Collections & Filterable Gallery */}
      <CollectionsSection onSelectForCommission={handleSelectForCommission} />

      {/* 4. Process (5-Step Timeline) */}
      <ProcessSection />

      {/* 5. Pricing & Packages */}
      <PricingSection onSelectPackage={handleSelectPackage} />

      {/* 6. Custom Order Consultation Form */}
      <CustomOrderSection
        preselectedItem={preselectedItem}
        onResetPreselected={() => setPreselectedItem(null)}
      />

      {/* 7. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 8. FAQ Accordion */}
      <FaqSection />

      {/* 9. Contact Section */}
      <ContactSection />
    </main>
  );
};

export default HomePage;
