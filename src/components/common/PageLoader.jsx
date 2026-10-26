import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

const PageLoader = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Keep intro animation active for 2.4 seconds, then transition out
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="aari-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Decorative Corner Borders */}
          <div className="aari-loader__corner aari-loader__corner--tl" />
          <div className="aari-loader__corner aari-loader__corner--tr" />
          <div className="aari-loader__corner aari-loader__corner--bl" />
          <div className="aari-loader__corner aari-loader__corner--br" />

          <div className="aari-loader__content">
            {/* SVG Stitching Animation */}
            <div className="aari-loader__svg-wrapper">
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                className="aari-loader__svg"
              >
                {/* Outer Dashed Embroidery Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  className="stitch-circle-outer"
                />

                {/* Inner Golden Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="stitch-circle-inner"
                />

                {/* Stitched Monogram "A" */}
                <path
                  d="M70 28 L46 95 H56 L64 72 H76 L84 95 H94 L70 28 Z M67 64 L70 52 L73 64 H67 Z"
                  className="stitch-letter-a"
                />

                {/* Aari Needle piercing through */}
                <g className="stitch-needle-icon">
                  <path
                    d="M35 105 L95 45"
                    stroke="#FFE58F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="95" cy="45" r="3" fill="#D4AF37" />
                  <path
                    d="M35 105 C25 95 28 80 45 85 C65 90 75 110 95 105"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    className="stitch-trailing-thread"
                  />
                </g>
              </svg>
            </div>

            {/* Brand Typography */}
            <motion.h1
              className="aari-loader__brand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Sowmis Aari Work
            </motion.h1>

            <motion.div
              className="aari-loader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <span className="aari-loader__dot">✦</span>
              <span>Traditional Embroidery with Elegance</span>
              <span className="aari-loader__dot">✦</span>
            </motion.div>

            {/* Subtle Progress Thread */}
            <div className="aari-loader__progress-bar">
              <motion.div
                className="aari-loader__progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </div>

            {/* Skip Button */}
            <button
              className="aari-loader__skip"
              onClick={handleSkip}
              aria-label="Skip intro animation"
            >
              Enter Atelier &rarr;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
