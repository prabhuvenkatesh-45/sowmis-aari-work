import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="section-padding aari-contact" id="contact">
      <div className="container">
        <SectionTitle
          badge="Visit Our Atelier"
          title="Boutique Studio &"
          highlight="Artisan Consultation"
          subtitle="Experience the tactile beauty of raw mulberry silk, pure zari wire spools, and live adda frame embroidery in person."
        />

        <div className="aari-contact__grid">
          {/* Left: Contact Info Cards */}
          <div className="aari-contact__info-col">
            {/* Atelier Card */}
            <div className="aari-contact-card stitched-card">
              <div className="aari-contact-card__icon">
                <MapPin size={22} />
              </div>
              <div className="aari-contact-card__content">
                <span className="card-badge">Main Atelier & Design Studio</span>
                <h3 className="card-title">Negamam Studio</h3>
                <p className="card-desc">
                  Sowmis Aari Work Atelier, Negamam, Tamil Nadu (Near Pollachi & Coimbatore)
                </p>
                <span className="card-hint">
                  Custom hand embroidery services, bridal consultation & fabric trials available.
                </span>
              </div>
            </div>

            {/* Courier Address for Sarees */}
            <div className="aari-contact-card stitched-card">
              <div className="aari-contact-card__icon">
                <Sparkles size={22} />
              </div>
              <div className="aari-contact-card__content">
                <span className="card-badge">Fabric Courier Receiving</span>
                <h3 className="card-title">Courier & Saree Parcel Receiving</h3>
                <p className="card-desc">
                  Courier your blouse material or silk saree directly via ST Courier, DTDC or Professional Courier.
                </p>
                <div className="card-contact-row">
                  <Phone size={14} className="gold-text" />
                  <span>Direct Desk: +91 88388 77100</span>
                </div>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="aari-contact-card stitched-card">
              <div className="aari-contact-card__icon">
                <Clock size={22} />
              </div>
              <div className="aari-contact-card__content">
                <span className="card-badge">Consultation Hours</span>
                <h3 className="card-title">Visiting Schedules</h3>
                <p className="card-desc">
                  <strong>Monday – Saturday:</strong> 9:30 AM – 8:00 PM IST<br />
                  <strong>Sunday:</strong> Open for appointments & phone consultations
                </p>
                <div className="card-contact-row">
                  <Mail size={14} className="gold-text" />
                  <span>WhatsApp: 8838877100 • Instagram: @._sowmis.aari.work._</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Map Interactive Mockup */}
          <div className="aari-contact__map-col">
            <div className="aari-map-wrapper stitched-card">
              {/* Map Background / Styled Canvas */}
              <div className="aari-map-canvas">
                {/* Embedded Responsive Google Map Iframe for Negamam Tamil Nadu */}
                <iframe
                  title="Sowmis Aari Work Negamam Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.228588523317!2d77.01423455!3d10.778844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba846e4b955c451%3A0xe54d6a69ef49b49b!2sNegamam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Pin Badge */}
                <div className="aari-map-pin-badge">
                  <div className="map-pin-dot" />
                  <div className="map-pin-info">
                    <strong>Sowmis Aari Work</strong>
                    <span>Negamam, Tamil Nadu</span>
                  </div>
                </div>
              </div>

              {/* Map Footer Bar */}
              <div className="aari-map-bar">
                <div>
                  <span className="map-bar-title">Planning a Studio Visit?</span>
                  <span className="map-bar-sub">We recommend booking a slot to ensure our lead designer is present for your fabric swatches.</span>
                </div>
                <Button
                  variant="gold"
                  size="sm"
                  icon={Navigation}
                  href="https://maps.google.com/?q=Cathedral+Road+Chennai"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
