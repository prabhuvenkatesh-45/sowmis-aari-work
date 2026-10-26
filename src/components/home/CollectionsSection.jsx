import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Sparkles, Clock, Search, SlidersHorizontal } from 'lucide-react';
import collectionsData from '../../data/collections.json';
import { useWishlist } from '../../context/WishlistContext';
import SectionTitle from '../common/SectionTitle';
import LightboxModal from '../common/LightboxModal';
import Button from '../common/Button';
import './CollectionsSection.css';

const categories = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'Bridal', label: 'Bridal' },
  { id: 'Blouse', label: 'Blouse' },
  { id: 'Saree', label: 'Saree' },
  { id: 'Lehenga', label: 'Lehenga' },
  { id: 'Kids', label: 'Kids' },
];

const CollectionsSection = ({ onSelectForCommission }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'hours-desc', 'price-asc', 'price-desc'
  const [selectedItem, setSelectedItem] = useState(null);

  const { isInWishlist, toggleWishlist } = useWishlist();

  // Filter & Sort
  const filteredItems = useMemo(() => {
    return collectionsData
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.technique.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
        if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
        if (sortBy === 'hours-desc') {
          const aHours = parseInt(a.hours, 10) || 0;
          const bHours = parseInt(b.hours, 10) || 0;
          return bHours - aHours;
        }
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section className="section-padding aari-collections" id="collection">
      <div className="container">
        <SectionTitle
          badge="Bespoke Catalog"
          title="Curated Haute"
          highlight="Embroidery Collections"
          subtitle="Explore hand-stitched bridal masterpieces. Each silhouette is customizable in your chosen color, neckline, and embellishment density."
        />

        {/* Filter Controls Bar */}
        <div className="aari-collections__controls">
          {/* Category Tabs */}
          <div className="aari-category-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`aari-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="aari-category-tab__pill"
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="aari-collections__search-sort">
            <div className="aari-search-box">
              <Search size={16} className="aari-search-icon" />
              <input
                type="text"
                placeholder="Search motifs, zardozi, kundan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="aari-search-input"
              />
              {searchQuery && (
                <button
                  className="aari-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="aari-sort-box">
              <SlidersHorizontal size={15} className="aari-sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="aari-sort-select"
                aria-label="Sort collections"
              >
                <option value="featured">Featured First</option>
                <option value="hours-desc">Most Craft Hours</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="aari-collections__no-results">
            <Sparkles size={36} className="gold-text" />
            <h3>No Silhouettes Match Your Criteria</h3>
            <p>Try resetting your search query or selecting a different category tab.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <motion.div className="aari-collections__grid" layout>
            <AnimatePresence>
              {filteredItems.map((item) => {
                const isFavorited = isInWishlist(item.id);

                return (
                  <motion.div
                    key={item.id}
                    className="aari-card stitched-card"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Card Media */}
                    <div className="aari-card__media">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aari-card__img"
                        loading="lazy"
                      />
                      <div className="aari-card__overlay">
                        <button
                          className="aari-card__quick-view"
                          onClick={() => setSelectedItem(item)}
                          aria-label={`Quick view ${item.title}`}
                        >
                          <Eye size={17} />
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        className={`aari-card__wishlist-btn ${isFavorited ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart
                          size={18}
                          fill={isFavorited ? '#D4AF37' : 'none'}
                          color={isFavorited ? '#D4AF37' : '#FFFFFF'}
                        />
                      </button>

                      {/* Category Badge */}
                      <span className="aari-card__category-badge">
                        {item.categoryLabel || item.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="aari-card__body">
                      <div className="aari-card__hours-tag">
                        <Clock size={12} />
                        <span>{item.hours}</span>
                      </div>

                      <h3
                        className="aari-card__title"
                        onClick={() => setSelectedItem(item)}
                        title={item.title}
                      >
                        {item.title}
                      </h3>

                      <p className="aari-card__technique">
                        {item.technique}
                      </p>

                      <div className="aari-card__footer">
                        <div className="aari-card__price-box">
                          <span className="aari-card__price">{item.price}</span>
                          <span className="aari-card__price-sub">Est. Bespoke</span>
                        </div>

                        <Button
                          variant="subtle"
                          size="sm"
                          onClick={() => {
                            if (onSelectForCommission) {
                              onSelectForCommission(item);
                            } else {
                              const form = document.getElementById('custom-order');
                              if (form) form.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          Commission &rarr;
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Popup Modal */}
      <LightboxModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onCommission={(item) => {
          if (onSelectForCommission) {
            onSelectForCommission(item);
          } else {
            const form = document.getElementById('custom-order');
            if (form) form.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </section>
  );
};

export default CollectionsSection;
