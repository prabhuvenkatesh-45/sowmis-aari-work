import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, ChevronDown, Star } from 'lucide-react';
import Button from '../common/Button';
import './Hero.css';

/* ── Animated Embroidery Canvas (thread-drawing effect) ── */
const EmbroideryCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Paisley / floral thread paths
    const points = [
      { x: 0.12, y: 0.15, r: 55 },
      { x: 0.88, y: 0.25, r: 70 },
      { x: 0.5, y: 0.08, r: 40 },
      { x: 0.22, y: 0.75, r: 60 },
      { x: 0.78, y: 0.72, r: 50 },
      { x: 0.5, y: 0.85, r: 45 },
    ];

    let animId;
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.008;

      points.forEach(({ x, y, r }, idx) => {
        const cx = x * canvas.width;
        const cy = y * canvas.height;
        const phase = tick + idx * (Math.PI / 3);

        // Outer dashed paisley ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(phase * 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, r + Math.sin(phase) * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,175,55,${0.07 + 0.04 * Math.sin(phase)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();

        // Inner gold dot cluster
        for (let k = 0; k < 6; k++) {
          const angle = (k / 6) * Math.PI * 2 + phase;
          const pr = r * 0.55;
          ctx.beginPath();
          ctx.arc(Math.cos(angle) * pr, Math.sin(angle) * pr, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253,230,138,${0.18 + 0.08 * Math.sin(phase + k)})`;
          ctx.fill();
        }
        ctx.restore();
      });

      // Flowing thread lines connecting ornaments
      ctx.save();
      ctx.strokeStyle = 'rgba(212,175,55,0.055)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 8]);
      points.forEach((p, i) => {
        if (i === points.length - 1) return;
        const nx = points[i + 1];
        ctx.beginPath();
        ctx.moveTo(p.x * canvas.width, p.y * canvas.height);
        const cpx = ((p.x + nx.x) / 2 + Math.sin(tick + i) * 0.08) * canvas.width;
        const cpy = ((p.y + nx.y) / 2 + Math.cos(tick + i) * 0.06) * canvas.height;
        ctx.quadraticCurveTo(cpx, cpy, nx.x * canvas.width, nx.y * canvas.height);
        ctx.stroke();
      });
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="aari-hero__canvas" aria-hidden="true" />;
};

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: image moves up slower than scroll
  const y = useTransform(scrollY, [0, 600], [0, 100]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="aari-hero" id="home" ref={heroRef}>
      {/* Anchor for legacy #hero references */}
      <span id="hero" style={{ position: 'absolute', top: 0, left: 0 }} aria-hidden="true" />
      {/* Ambient Glow Orbs */}
      <div className="aari-hero__glow aari-hero__glow--maroon" />
      <div className="aari-hero__glow aari-hero__glow--gold" />
      <div className="aari-hero__glow aari-hero__glow--purple" />

      {/* Animated Embroidery Thread Canvas */}
      <EmbroideryCanvas />

      {/* Floating Zari Sparkle Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="aari-hero__particle"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 18}%`,
          }}
          animate={{
            y: [0, -16 - i * 3, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        >
          ✦
        </motion.div>
      ))}

      <div className="container aari-hero__container">
        {/* ── Left Column: Typography & CTAs ── */}
        <div className="aari-hero__text-col">
          {/* Pre-badge */}
          <motion.div
            className="aari-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} className="gold-text" />
            <span>Sowmis Aari Work • Negamam • Stitched with Love</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="aari-hero__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
          >
            Traditional Embroidery With a{' '}
            <span className="aari-hero__headline-italic">
              Touch of Elegance
            </span>
          </motion.h1>

          {/* Thread-line divider */}
          <motion.div
            className="aari-hero__divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          />

          {/* Subtext */}
          <motion.p
            className="aari-hero__subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Your vision, our stitches, timeless beauty. Premium materials, handcrafted
            custom designs, and transparent rates starting from only <strong>₹500</strong>.
            Tailored to your special celebrations in Negamam, Coimbatore & across India.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            className="aari-hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button
              variant="gold"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => scrollToSection('custom-order')}
            >
              Book Custom Design
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('packages')}
            >
              View Price List (from ₹500)
            </Button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            className="aari-hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <div className="aari-hero__trust-item">
              <ShieldCheck size={16} className="gold-text" />
              <span>Premium Materials</span>
            </div>
            <div className="aari-hero__trust-dot">◆</div>
            <div className="aari-hero__trust-item">
              <Award size={16} className="gold-text" />
              <span>Custom Designs</span>
            </div>
            <div className="aari-hero__trust-dot">◆</div>
            <div className="aari-hero__trust-item">
              <Heart size={16} className="gold-text" />
              <span>Affordable Rates from ₹500</span>
            </div>
          </motion.div>

          {/* Star Rating Row */}
          <motion.div
            className="aari-hero__rating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="aari-hero__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
              ))}
            </div>
            <span className="aari-hero__rating-text">
              Trusted by 500+ brides & festive clients • WhatsApp: 8838877100
            </span>
          </motion.div>
        </div>

        {/* ── Right Column: Parallax Visual ── */}
        <motion.div className="aari-hero__visual-col">
          <motion.div
            className="aari-hero__card-stack"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            {/* Main Parallax Frame with Real Sowmis Blouse */}
            <div className="aari-hero__frame">
              <div className="aari-hero__frame-border" />
              <div className="aari-hero__frame-corner aari-hero__frame-corner--tl" />
              <div className="aari-hero__frame-corner aari-hero__frame-corner--tr" />
              <div className="aari-hero__frame-corner aari-hero__frame-corner--bl" />
              <div className="aari-hero__frame-corner aari-hero__frame-corner--br" />
              <motion.img
                src="/images/sowmis-pink-bridal-blouse.png"
                alt="Sowmis Aari Work Pink Hand Embroidery Blouse"
                className="aari-hero__img"
                loading="eager"
                style={{ y }}
              />
              <div className="aari-hero__img-overlay" />
              {/* Shimmer sweep */}
              <div className="aari-hero__frame-shimmer" />
            </div>

            {/* Floating Badge — Top Left */}
            <motion.div
              className="aari-hero__floating-badge aari-hero__floating-badge--top"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="aari-floating-badge__icon">
                <Sparkles size={15} />
              </div>
              <div className="aari-floating-badge__info">
                <span className="aari-floating-badge__title">Trending Aari Work</span>
                <span className="aari-floating-badge__sub">French Knots & Cutdana Sleeve Jaal</span>
              </div>
            </motion.div>

            {/* Floating Badge — Bottom Right */}
            <motion.div
              className="aari-hero__floating-badge aari-hero__floating-badge--bottom"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            >
              <div className="aari-floating-badge__icon aari-floating-badge__icon--maroon">
                <Award size={15} />
              </div>
              <div className="aari-floating-badge__info">
                <span className="aari-floating-badge__title">Affordable Rates from ₹500</span>
                <span className="aari-floating-badge__sub">Customized As Per Customer • Negamam</span>
              </div>
            </motion.div>

            {/* Small thumbnail accents with Real Sowmis Work */}
            <motion.div
              className="aari-hero__thumb-accent aari-hero__thumb-accent--1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <img
                src="/images/sowmis-teal-kundan.png"
                alt="Sowmis Peacock Teal Kundan Cutwork Detail"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="aari-hero__thumb-accent aari-hero__thumb-accent--2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              <img
                src="/images/sowmis-purple-zari-neck.png"
                alt="Sowmis Royal Purple Gold Bead Neckline"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <div
        className="aari-hero__scroll-cue"
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
        onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
      >
        <span className="aari-hero__scroll-text">Explore Craft</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="gold-text" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
