import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Sun, Menu, X, Sparkles, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import Button from '../common/Button';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home', path: '/' },
  { name: 'About', href: '#about', path: '/about' },
  { name: 'Collection', href: '#collection', path: '/collections' },
  { name: 'Process', href: '#process', path: '/#process' },
  { name: 'Packages', href: '#packages', path: '/#packages' },
  { name: 'Custom Order', href: '#custom-order', path: '/custom-order' },
  { name: 'Stories', href: '#testimonials', path: '/#testimonials' },
  { name: 'FAQ', href: '#faq', path: '/#faq' },
  { name: 'Contact', href: '#contact', path: '/#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Section tracking on home page
      if (location.pathname === '/') {
        if (window.scrollY < 180) {
          setActiveSection('home');
          return;
        }

        const sections = ['home', 'about', 'collection', 'process', 'packages', 'custom-order', 'testimonials', 'faq', 'contact'];
        const scrollPosition = window.scrollY + 220;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = sections[i];
          const el = document.getElementById(sec);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(sec);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      if (link.href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
        return;
      }
      const targetId = link.href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
  };

  return (
    <>
      <header className={`aari-navbar ${isScrolled ? 'aari-navbar--scrolled' : ''}`}>
        <div className="aari-navbar__container">
          {/* Logo */}
          <Link to="/" className="aari-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="aari-logo__icon-wrap">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2,2" />
                <path d="M10 22 L22 10" stroke="url(#navGoldGrad)" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="22" cy="10" r="2" fill="#FDE68A" />
                <path d="M10 22 C6 18 8 12 14 14" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
                <defs>
                  <linearGradient id="navGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF1C5" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="aari-logo__text-group">
              <span className="aari-logo__brand">Sowmis</span>
              <span className="aari-logo__sub">Aari Work • Negamam</span>
            </div>
          </Link>

          {/* Artisan Thread Divider */}
          <div className="aari-navbar__thread-divider" aria-hidden="true">
            <span className="aari-navbar__thread-knot">✦</span>
          </div>

          {/* Desktop Nav Links - Positioned Next to Logo */}
          <nav className="aari-nav" aria-label="Main Navigation">
            <ul className="aari-nav__list">
              {navLinks.map((link) => {
                const isHomeRoute = location.pathname === '/';
                const isActive = isHomeRoute
                  ? activeSection === link.href.replace('#', '')
                  : location.pathname === link.path;

                return (
                  <li key={link.name} className="aari-nav__item">
                    {isHomeRoute ? (
                      <a
                        href={link.href}
                        className={`aari-nav__link ${isActive ? 'aari-nav__link--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link);
                        }}
                      >
                        {link.name}
                        {isActive && (
                          <motion.span layoutId="navGoldIndicator" className="aari-nav__gold-indicator">
                            <span className="aari-nav__stitch-dot" />
                          </motion.span>
                        )}
                      </a>
                    ) : (
                      <Link
                        to={link.path || `/${link.href}`}
                        className={`aari-nav__link ${isActive ? 'aari-nav__link--active' : ''}`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.span layoutId="navGoldIndicator" className="aari-nav__gold-indicator">
                            <span className="aari-nav__stitch-dot" />
                          </motion.span>
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Controls: Utility Pill (Heart + Dark Mode) & Consultation CTA */}
          <div className="aari-navbar__actions">
            {/* Atelier Utility Pill */}
            <div className="aari-navbar__utility-pill">
              {/* Wishlist Heart Button */}
              <button
                className="aari-pill-btn aari-pill-btn--wishlist"
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View curated wishlist"
                title="View your saved wishlist"
              >
                <Heart size={18} className={wishlistCount > 0 ? 'heart-active' : ''} fill={wishlistCount > 0 ? '#D4AF37' : 'none'} />
                {wishlistCount > 0 && (
                  <span className="aari-wishlist-badge">{wishlistCount}</span>
                )}
              </button>

              <span className="aari-pill-divider" aria-hidden="true" />

              {/* Dark Mode / Theme Toggle */}
              <button
                className="aari-pill-btn aari-pill-btn--theme"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} className="gold-text" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* CTA Button */}
            <Button
              variant="gold"
              size="sm"
              icon={Sparkles}
              onClick={() => {
                if (location.pathname === '/') {
                  const el = document.getElementById('custom-order');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#custom-order';
                }
              }}
              className="aari-navbar__cta-btn"
            >
              Book Consultation
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              className="aari-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="aari-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aari-mobile-menu__inner container">
              <nav className="aari-mobile-menu__nav">
                {navLinks.map((link) => {
                  const isHomeRoute = location.pathname === '/';
                  return isHomeRoute ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="aari-mobile-menu__link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link);
                      }}
                    >
                      <span>{link.name}</span>
                      <span className="aari-mobile-menu__arrow">&rarr;</span>
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path || `/${link.href}`}
                      className="aari-mobile-menu__link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      <span className="aari-mobile-menu__arrow">&rarr;</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="aari-mobile-menu__footer">
                <Button
                  variant="gold"
                  size="md"
                  icon={Sparkles}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('custom-order');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="aari-mobile-menu__cta"
                >
                  Book Bridal Consultation
                </Button>
                <div className="aari-mobile-menu__contact-hint">
                  <MessageSquare size={14} className="gold-text" />
                  <span>Studio: Negamam, Tamil Nadu • WhatsApp: 8838877100</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
