import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Clock, Calendar, ArrowRight, Eye, ShieldCheck, Tag } from 'lucide-react';
import pricingPackages from '../../data/pricingPackages.json';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import LightboxModal from '../common/LightboxModal';
import './PricingSection.css';

const PricingSection = ({ onSelectPackage }) => {
  const [selectedPosterItem, setSelectedPosterItem] = useState(null);

  const posterItemData = {
    id: 'sowmis-price-chart-full',
    title: 'Sowmis Aari Work Official Price List Chart',
    categoryLabel: 'Verified Rate Card',
    price: 'Starting ₹500',
    image: '/images/sowmis-price-list-chart.png',
    description: 'Complete official price list: Simple bead/stone work ₹500, Minimal work ₹600 - ₹2000, Bridal work ₹2500 - ₹5000+, Net attached work ₹1000 - ₹4000, Additional services ₹200 - ₹350. Contact WhatsApp: 8838877100, Negamam.',
    technique: 'Transparent Pricing Chart'
  };

  return (
    <section className="section-padding aari-pricing" id="packages">
      <div className="container">
        <SectionTitle
          badge="Verified Transparent Pricing"
          title="Sowmis Aari Work"
          highlight="Investment & Rate List"
          subtitle="Honest, affordable artisan rates starting from just ₹500. Handcrafted with love in Negamam using premium materials customized as per your choice."
        />

        {/* 4 Main Service Packages Grid */}
        <div className="aari-pricing__grid">
          {pricingPackages.map((pkg, idx) => {
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                className={`aari-pricing-card stitched-card ${isPopular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                {/* Popular Crown Ribbon */}
                {isPopular && (
                  <div className="aari-pricing-ribbon">
                    <Sparkles size={13} />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="aari-pricing-card__header">
                  <span className="aari-pricing-badge">{pkg.badge}</span>
                  <h3 className="aari-pricing-name">{pkg.name}</h3>
                  <p className="aari-pricing-tagline">{pkg.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="aari-pricing-price-box">
                  <div className="aari-pricing-amount">
                    <span className="amount-val gold-text">{pkg.startingPrice}</span>
                    <span className="amount-sub">/ {pkg.priceSub}</span>
                  </div>
                </div>

                {/* Craft Specs */}
                <div className="aari-pricing-specs">
                  <div className="pricing-spec-pill">
                    <Clock size={13} className="gold-text" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="pricing-spec-pill">
                    <Calendar size={13} className="gold-text" />
                    <span>{pkg.delivery}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="aari-pricing-features">
                  <span className="features-header">Service Includes:</span>
                  <ul className="features-list">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-item">
                        <div className="feature-check">
                          <Check size={14} />
                        </div>
                        <span className="feature-text">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended For */}
                <div className="aari-pricing-ideal">
                  <span className="ideal-label">Best Suited For:</span>
                  <p className="ideal-text">{pkg.idealFor}</p>
                </div>

                {/* CTA */}
                <div className="aari-pricing-cta-wrap">
                  <Button
                    variant={isPopular ? 'gold' : 'outline'}
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="pricing-btn"
                    onClick={() => {
                      if (onSelectPackage) {
                        onSelectPackage(pkg);
                      } else {
                        const el = document.getElementById('custom-order');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Select {pkg.name.split(' ')[0]} Tier
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services & Custom Add-ons */}
        <div className="aari-pricing-addons">
          <div className="aari-addons-header">
            <span className="aari-addons-badge">
              <Tag size={13} className="gold-text" /> Value Add-ons
            </span>
            <h3 className="aari-addons-title">Additional Finishing Services</h3>
            <p className="aari-addons-sub">Complete your blouse with matching handcrafted tassels, hanging bells, and neck combos</p>
          </div>

          <div className="aari-addons-grid">
            <div className="aari-addon-card">
              <div className="aari-addon-icon">✦</div>
              <div className="aari-addon-info">
                <h4>Hanging Bells on Sleeves</h4>
                <p>Handcrafted golden jhumkis & dangling bells on both sleeves</p>
              </div>
              <span className="aari-addon-price gold-text">₹200/-</span>
            </div>

            <div className="aari-addon-card">
              <div className="aari-addon-icon">✦</div>
              <div className="aari-addon-info">
                <h4>Sleeves & Back Neck Combo</h4>
                <p>Harmonized hand-stitched border covering both sleeves and back neck</p>
              </div>
              <span className="aari-addon-price gold-text">₹350/-</span>
            </div>

            <div className="aari-addon-card">
              <div className="aari-addon-icon">✦</div>
              <div className="aari-addon-info">
                <h4>Back Rope with Custom Tassels</h4>
                <p>Hand-crafted matching silk thread dori with heavy designer latkans</p>
              </div>
              <span className="aari-addon-price gold-text">₹200/-</span>
            </div>
          </div>
        </div>

        {/* Official Rate List Poster Showcase Banner */}
        <div className="aari-pricing-poster-banner">
          <div className="poster-banner-content">
            <div className="poster-banner-badge">
              <ShieldCheck size={14} className="gold-text" />
              <span>Official Atelier Rate Card • Negamam</span>
            </div>
            <h3 className="poster-banner-title">Sowmis Aari Work Verified Price List</h3>
            <p className="poster-banner-desc">
              Transparent, honest, and affordable rates for every bride and family. Stitched with love, using premium materials, customized exactly as per customer choice.
            </p>
            <div className="poster-banner-tags">
              <span>TRADITIONAL</span>
              <span>BRIDAL</span>
              <span>FESTIVE</span>
              <span>CONTEMPORARY</span>
            </div>
            <div className="poster-banner-actions">
              <Button
                variant="gold"
                size="md"
                icon={Eye}
                onClick={() => setSelectedPosterItem(posterItemData)}
              >
                View Full Rate Card Poster
              </Button>
              <a
                href="https://wa.me/918838877100?text=Hello%20Sowmis%20Aari%20Work!%20I%20saw%20your%20price%20list%20and%20want%20to%20discuss%20a%20blouse%20design."
                target="_blank"
                rel="noopener noreferrer"
                className="poster-wa-link"
              >
                Chat on WhatsApp: 8838877100 &rarr;
              </a>
            </div>
          </div>

          <div
            className="poster-banner-preview"
            onClick={() => setSelectedPosterItem(posterItemData)}
            role="button"
            tabIndex={0}
            aria-label="Click to zoom official price list chart"
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPosterItem(posterItemData)}
          >
            <img
              src="/images/sowmis-price-list-chart.png"
              alt="Sowmis Aari Work Official Price List Poster"
              className="poster-thumb"
            />
            <div className="poster-zoom-overlay">
              <Eye size={22} />
              <span>Click to Zoom Poster</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Price Chart Poster */}
      {selectedPosterItem && (
        <LightboxModal
          item={selectedPosterItem}
          isOpen={Boolean(selectedPosterItem)}
          onClose={() => setSelectedPosterItem(null)}
          onCommission={() => {
            setSelectedPosterItem(null);
            const el = document.getElementById('custom-order');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </section>
  );
};

export default PricingSection;
