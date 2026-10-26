import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for thread trailing effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower trail for thread effect
  const trailConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Interactive element detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.stitched-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Trailing golden zari thread bead */}
      <motion.div
        className="aari-cursor-trail"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Main Aari needle point */}
      <motion.div
        className={`aari-cursor-needle ${isHovered ? 'aari-cursor--hover' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <svg
          className="aari-needle-svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Hooked Aari needle head */}
          <path
            d="M5 19L17 7M17 7C17.5 5 19 4 20 5C21 6 20 7.5 18 8L17 7Z"
            stroke="#FDE68A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Thread loop */}
          <circle cx="5" cy="19" r="2.5" fill="#D4AF37" />
          <path
            d="M5 19C1 16 3 11 8 13"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeDasharray="2,2"
            fill="none"
          />
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
