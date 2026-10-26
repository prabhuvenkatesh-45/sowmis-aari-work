import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Clock, Sparkles, Scissors, MessageCircle, Check } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import Button from './Button';
import './LightboxModal.css';

const LightboxModal = ({ item, isOpen, onClose, onCommission }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const isFavorited = isInWishlist(item.id);

  const handleWhatsApp = () => {
    const text = `Hello Sowmis Aari Work! I am interested in commissioning "${item.title}" (${item.price}). Could we discuss design options?`;
    window.open(`https://wa.me/918838877100?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="lightbox-overlay" onClick={onClose}>
        <motion.div
          className="lightbox-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button className="lightbox-close" onClick={onClose} aria-label="Close dialog">
            <X size={22} />
          </button>

          <div className="lightbox-grid">
            {/* Left: Image with Stitched Frame */}
            <div className="lightbox-media">
              <div className="lightbox-image-frame">
                <img src={item.image} alt={item.title} className="lightbox-img" />
                <div className="lightbox-badge-float">
                  <Sparkles size={12} />
                  <span>Handcrafted Maggam Art</span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Specification */}
            <div className="lightbox-details">
              <div className="lightbox-header-meta">
                <span className="lightbox-category">{item.categoryLabel || item.category}</span>
                <button
                  className={`lightbox-wishlist-btn ${isFavorited ? 'active' : ''}`}
                  onClick={() => toggleWishlist(item)}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={18} fill={isFavorited ? '#D4AF37' : 'none'} color="#D4AF37" />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <h3 className="lightbox-title">{item.title}</h3>

              <div className="lightbox-pricing-block">
                <span className="lightbox-price">{item.price}</span>
                <span className="lightbox-price-label">Estimated Artisan Commission</span>
              </div>

              <p className="lightbox-description">{item.description}</p>

              {/* Spec Cards */}
              <div className="lightbox-specs">
                <div className="lightbox-spec-card">
                  <div className="lightbox-spec-icon">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="lightbox-spec-label">Artisan Duration</span>
                    <span className="lightbox-spec-value">{item.hours}</span>
                  </div>
                </div>

                <div className="lightbox-spec-card">
                  <div className="lightbox-spec-icon">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="lightbox-spec-label">Needle Technique</span>
                    <span className="lightbox-spec-value">{item.technique}</span>
                  </div>
                </div>

                <div className="lightbox-spec-card">
                  <div className="lightbox-spec-icon">
                    <Scissors size={16} />
                  </div>
                  <div>
                    <span className="lightbox-spec-label">Recommended Fabric</span>
                    <span className="lightbox-spec-value">{item.fabric}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {item.tags && (
                <div className="lightbox-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="lightbox-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Guarantees */}
              <div className="lightbox-guarantee">
                <div className="lightbox-guarantee-item">
                  <Check size={14} className="gold-text" /> 100% Hand-stitched without machinery
                </div>
                <div className="lightbox-guarantee-item">
                  <Check size={14} className="gold-text" /> Custom tailored to your exact measurements
                </div>
                <div className="lightbox-guarantee-item">
                  <Check size={14} className="gold-text" /> Weekly video updates from the embroidery frame
                </div>
              </div>

              {/* CTAs */}
              <div className="lightbox-actions">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => {
                    onClose();
                    if (onCommission) {
                      onCommission(item);
                    } else {
                      const el = document.getElementById('custom-order');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Commission This Silhouette
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  icon={MessageCircle}
                  onClick={handleWhatsApp}
                >
                  Quick Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
