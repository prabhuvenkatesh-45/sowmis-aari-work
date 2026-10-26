import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, MapPin } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';
import SectionTitle from '../common/SectionTitle';
import './TestimonialsSection.css';

/* Helper: get 3 visible testimonials starting from index */
const getVisible = (data, startIdx, count = 3) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(data[(startIdx + i) % data.length]);
  }
  return result;
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const total = testimonialsData.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, total]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = testimonialsData[currentIndex];

  /* Feature Card variant — the highlighted center card */
  const FeaturedCard = ({ item }) => (
    <div className="aari-testimonial-card aari-testimonial-card--featured stitched-card">
      {/* Giant quote mark */}
      <div className="aari-t-quote-icon">
        <Quote size={40} />
      </div>

      {/* Stars */}
      <div className="aari-t-stars">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={17} fill="#D4AF37" color="#D4AF37" />
        ))}
      </div>

      {/* Outfit Badge */}
      <div className="aari-t-outfit-badge">
        <Sparkles size={12} className="gold-text" />
        <span>{item.outfit}</span>
      </div>

      {/* Quote */}
      <blockquote className="aari-t-quote">
        &ldquo;{item.text}&rdquo;
      </blockquote>

      {/* Client */}
      <div className="aari-t-client">
        <div className="aari-t-avatar-wrap">
          <img
            src={item.avatar}
            alt={item.name}
            className="aari-t-avatar"
            loading="lazy"
          />
        </div>
        <div className="aari-t-client-meta">
          <strong className="aari-t-name">{item.name}</strong>
          <span className="aari-t-role">{item.role}</span>
          <span className="aari-t-date">
            <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
            {item.city || 'Chennai'} · {item.date}
          </span>
        </div>
      </div>
    </div>
  );

  /* Side card (smaller preview) */
  const SideCard = ({ item, side }) => (
    <motion.div
      className={`aari-testimonial-card aari-testimonial-card--side aari-testimonial-card--${side}`}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="aari-t-side-stars">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
        ))}
      </div>
      <blockquote className="aari-t-side-quote">
        &ldquo;{item.text.slice(0, 90)}...&rdquo;
      </blockquote>
      <div className="aari-t-side-client">
        <img
          src={item.avatar}
          alt={item.name}
          className="aari-t-side-avatar"
          loading="lazy"
        />
        <div>
          <strong className="aari-t-side-name">{item.name}</strong>
          <span className="aari-t-side-outfit">{item.outfit}</span>
        </div>
      </div>
    </motion.div>
  );

  const prevItem = testimonialsData[(currentIndex - 1 + total) % total];
  const nextItem = testimonialsData[(currentIndex + 1) % total];

  return (
    <section
      className="section-padding aari-testimonials"
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <SectionTitle
          badge="Voices of Our Brides"
          title="Heirloom Memories &"
          highlight="Bridal Reverence"
          subtitle="Real brides and connoisseurs share their experience commissioning custom Aari hand embroidery for their most cherished celebrations."
        />

        <div className="aari-testimonials__carousel-wrap">
          {/* Three-Column Layout */}
          <div className="aari-testimonials__three-col">
            {/* Left Side Card */}
            <div className="aari-t-side-col aari-t-side-col--left" onClick={prevSlide}>
              <AnimatePresence mode="wait">
                <SideCard key={`prev-${currentIndex}`} item={prevItem} side="left" />
              </AnimatePresence>
            </div>

            {/* Center Featured Card */}
            <div className="aari-t-center-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.45 }}
                >
                  <FeaturedCard item={current} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side Card */}
            <div className="aari-t-side-col aari-t-side-col--right" onClick={nextSlide}>
              <AnimatePresence mode="wait">
                <SideCard key={`next-${currentIndex}`} item={nextItem} side="right" />
              </AnimatePresence>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="aari-testimonials__controls">
            <button
              className="aari-arrow-btn"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dot Indicators */}
            <div className="aari-carousel-dots">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  className={`aari-carousel-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  {i === currentIndex && (
                    <motion.div
                      layoutId="activeDotPill"
                      className="aari-dot-fill"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              className="aari-arrow-btn"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="aari-testimonials__stats">
          <div className="aari-t-stat">
            <span className="aari-t-stat-num">1,200+</span>
            <span className="aari-t-stat-label">Happy Brides</span>
          </div>
          <div className="aari-t-stat-divider" />
          <div className="aari-t-stat">
            <span className="aari-t-stat-num">5.0★</span>
            <span className="aari-t-stat-label">Average Rating</span>
          </div>
          <div className="aari-t-stat-divider" />
          <div className="aari-t-stat">
            <span className="aari-t-stat-num">12+</span>
            <span className="aari-t-stat-label">Countries Served</span>
          </div>
          <div className="aari-t-stat-divider" />
          <div className="aari-t-stat">
            <span className="aari-t-stat-num">15+</span>
            <span className="aari-t-stat-label">Years of Craft</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
