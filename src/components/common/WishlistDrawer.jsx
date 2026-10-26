import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import Button from './Button';
import './WishlistDrawer.css';

const WishlistDrawer = ({ onSelectDesignForOrder }) => {
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();

  const handleInquireAll = () => {
    const itemNames = wishlist.map(i => i.title).join(', ');
    const msg = `Hello Sowmis Aari Work! I have saved these designs in my wishlist and would like to consult on order & pricing: ${itemNames}`;
    const url = `https://wa.me/918838877100?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div
            className="wishlist-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          >
            {/* Header */}
            <div className="wishlist-drawer__header">
              <div className="wishlist-drawer__title-wrap">
                <Heart size={20} className="wishlist-drawer__heart-icon" fill="currentColor" />
                <h3 className="wishlist-drawer__title">Curated Wishlist</h3>
                <span className="wishlist-drawer__count">{wishlistCount}</span>
              </div>
              <button
                className="wishlist-drawer__close"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close wishlist drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="wishlist-drawer__body">
              {wishlist.length === 0 ? (
                <div className="wishlist-drawer__empty">
                  <div className="wishlist-drawer__empty-icon">
                    <Heart size={44} strokeWidth={1.2} />
                  </div>
                  <h4>Your Atelier Keepsake is Empty</h4>
                  <p>
                    Explore our bridal collection and tap the heart icon on any design to save your inspirations.
                  </p>
                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      const el = document.getElementById('collection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Collections
                  </Button>
                </div>
              ) : (
                <div className="wishlist-drawer__list">
                  <div className="wishlist-drawer__actions-top">
                    <span className="wishlist-drawer__subtitle">
                      Saved Handcrafted Designs
                    </span>
                    <button
                      className="wishlist-drawer__clear-btn"
                      onClick={clearWishlist}
                    >
                      <Trash2 size={13} />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      className="wishlist-item"
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="wishlist-item__image-wrap">
                        <img src={item.image} alt={item.title} className="wishlist-item__img" loading="lazy" />
                      </div>
                      <div className="wishlist-item__info">
                        <span className="wishlist-item__category">{item.categoryLabel || item.category}</span>
                        <h4 className="wishlist-item__title">{item.title}</h4>
                        <div className="wishlist-item__meta">
                          <span className="wishlist-item__hours">
                            <Sparkles size={11} /> {item.hours}
                          </span>
                          <span className="wishlist-item__price">{item.price}</span>
                        </div>
                        <div className="wishlist-item__actions">
                          <button
                            className="wishlist-item__order-btn"
                            onClick={() => {
                              setIsWishlistOpen(false);
                              if (onSelectDesignForOrder) {
                                onSelectDesignForOrder(item);
                              } else {
                                const formEl = document.getElementById('custom-order');
                                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            Commission This &rarr;
                          </button>
                          <button
                            className="wishlist-item__remove-btn"
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="wishlist-drawer__footer">
                <Button
                  variant="primary"
                  size="md"
                  icon={MessageCircle}
                  onClick={handleInquireAll}
                  className="wishlist-drawer__inquire-all-btn"
                >
                  Inquire All via WhatsApp
                </Button>
                <p className="wishlist-drawer__footer-note">
                  Direct pricing & bridal consultation with our master designers.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
