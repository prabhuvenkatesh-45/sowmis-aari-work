import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, MapPin, Phone, Mail, MessageCircle, Clock, Heart } from 'lucide-react';
import Button from '../common/Button';
import './Footer.css';

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address');
      return;
    }
    setNewsletterError('');
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="aari-footer">
      {/* Newsletter Strip */}
      <div className="aari-newsletter-strip">
        <div className="container aari-newsletter-strip__container">
          <div className="aari-newsletter-strip__text">
            <span className="aari-newsletter-strip__badge">
              <Sparkles size={13} /> The Atelier Gazette
            </span>
            <h3 className="aari-newsletter-strip__title">
              Receive Curated Bridal Color Palettes & Secret Trunk Show Invites
            </h3>
            <p className="aari-newsletter-strip__desc">
              Subscribe for monthly stories on endangered Indian needlecrafts, bridal trends, and early access to limited bridal slots.
            </p>
          </div>

          <div className="aari-newsletter-strip__form-wrap">
            {newsletterSubscribed ? (
              <div className="aari-newsletter-success">
                <CheckCircle2 size={20} className="gold-text" />
                <span>Welcome to the Atelier Family. Check your inbox soon!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="aari-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError('');
                  }}
                  className={`aari-newsletter-input ${newsletterError ? 'input-error' : ''}`}
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  icon={Send}
                  iconPosition="right"
                >
                  Join Gazette
                </Button>
              </form>
            )}
            {newsletterError && <span className="newsletter-error-msg">{newsletterError}</span>}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container aari-footer__main">
        <div className="aari-footer__grid">
          {/* Column 1: Brand & Craft Philosophy */}
          <div className="aari-footer__col aari-footer__col--brand">
            <div className="aari-footer__brand-title">
              <span className="gold-text">Sowmis</span> Aari Work
            </div>
            <p className="aari-footer__brand-bio">
              Traditional embroidery with a touch of elegance. Stitched with love in Negamam, Tamil Nadu. Quality materials, custom designs, and transparent rates starting from only ₹500.
            </p>
            <div className="aari-footer__craft-promise">
              <Sparkles size={14} className="gold-text" />
              <span>100% Handcrafted • As Per Customer Choice</span>
            </div>
          </div>

          {/* Column 2: Haute Collections */}
          <div className="aari-footer__col">
            <h4 className="aari-footer__heading">Haute Collections</h4>
            <ul className="aari-footer__links">
              <li><a href="#collection">Muhurtham Bridal Blouses</a></li>
              <li><a href="#collection">Heirloom Kanjeevaram Sarees</a></li>
              <li><a href="#collection">Architectural Royal Lehengas</a></li>
              <li><a href="#collection">Scalloped Cutwork Veils & Dupattas</a></li>
              <li><a href="#collection">Chhoti Begum Kids Pattu Pavadai</a></li>
              <li><a href="#collection">Saree Border Restoration</a></li>
            </ul>
          </div>

          {/* Column 3: Atelier & Heritage */}
          <div className="aari-footer__col">
            <h4 className="aari-footer__heading">Atelier Experience</h4>
            <ul className="aari-footer__links">
              <li><a href="#about">The Heritage of Aari Needle</a></li>
              <li><a href="#process">The 5-Step Khaka Journey</a></li>
              <li><a href="#packages">Bridal Trousseau Packages</a></li>
              <li><a href="#custom-order">Bespoke Design Commission</a></li>
              <li><a href="#faq">Fabric & International Shipping</a></li>
              <li><a href="#testimonials">Real Brides & Heirloom Stories</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Visiting Hours */}
          <div className="aari-footer__col aari-footer__col--contact">
            <h4 className="aari-footer__heading">Studio Contact</h4>
            <div className="aari-footer__contact-items">
              <div className="aari-footer__contact-item">
                <MapPin size={17} className="gold-text" />
                <span>Sowmis Aari Work, Negamam, Tamil Nadu (Near Pollachi & Coimbatore)</span>
              </div>
              <div className="aari-footer__contact-item">
                <Phone size={17} className="gold-text" />
                <span>+91 88388 77100 (Call & WhatsApp)</span>
              </div>
              <div className="aari-footer__contact-item">
                <Mail size={17} className="gold-text" />
                <span>Instagram: @._sowmis.aari.work._</span>
              </div>
              <div className="aari-footer__contact-item">
                <Clock size={17} className="gold-text" />
                <span>Mon – Sat: 9:30 AM – 8:00 PM (Direct Consultations)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="aari-footer__socials">
              <a
                href="https://instagram.com/_sowmis.aari.work._"
                target="_blank"
                rel="noopener noreferrer"
                className="aari-footer__social-btn"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/918838877100"
                target="_blank"
                rel="noopener noreferrer"
                className="aari-footer__social-btn"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#contact"
                className="aari-footer__social-btn"
                aria-label="Studio Location"
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="aari-footer__bottom">
          <p className="aari-footer__copyright">
            &copy; {new Date().getFullYear()} Sowmis Aari Work. Stitched with Love in Negamam. All rights reserved.
          </p>
          <div className="aari-footer__bottom-tags">
            <span>Pure Mulberry Silk</span>
            <span>•</span>
            <span>Authentic Zardozi Bullion</span>
            <span>•</span>
            <span>Worldwide Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
