import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Scissors, Gem, HeartHandshake, CheckCircle } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import './AboutSection.css';

// Animated Counter Component
const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const endValue = parseInt(end, 10);
    const incrementTime = (duration * 1000) / endValue;
    const step = Math.ceil(endValue / 60);

    const timer = setInterval(() => {
      start += step;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime * step);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="aari-counter__number">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const AboutSection = () => {
  return (
    <section className="section-padding aari-about" id="about">
      <div className="container">
        <SectionTitle
          badge="The Heritage & Legacy"
          title="The Ancient Art of the"
          highlight="Hooked Aari Needle"
          subtitle="Centuries of Mughal and South Indian Maggam tradition, passed from father to son, now elevated for modern bespoke celebrations."
        />

        <div className="aari-about__grid">
          {/* Left: Visual Collage */}
          <motion.div
            className="aari-about__media-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="aari-about__image-cluster">
              <div className="aari-about__main-image-wrap stitched-card">
                <img
                  src="/images/sowmis-pink-craft-process.png"
                  alt="Sowmis Aari Work artisan needlecraft on traditional Adda frame"
                  className="aari-about__main-img"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Detail Image */}
              <div className="aari-about__detail-image-wrap stitched-card">
                <img
                  src="/images/sowmis-teal-kundan.png"
                  alt="Sowmis Intricate Kundan stone embroidery cutwork detail"
                  className="aari-about__detail-img"
                  loading="lazy"
                />
                <div className="aari-about__stamp">
                  <Sparkles size={16} />
                  <span>Stitched with Love</span>
                </div>
              </div>

              {/* Floating Quote Card */}
              <div className="aari-about__quote-card glass-panel">
                <p className="aari-about__quote-text">
                  "Your vision, our stitches, timeless beauty. We create custom embroidery with heart and precision."
                </p>
                <span className="aari-about__quote-author">— Sowmiya, Founder & Master Artisan, Sowmis Aari Work</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative & Pillars */}
          <motion.div
            className="aari-about__text-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="aari-about__subheading">
              Preserving Authentic <span className="gold-text">Needle Poetry</span> in Negamam, Tamil Nadu
            </h3>

            <p className="aari-about__paragraph">
              Aari work takes its name from the hooked needle (<em>muthia</em>), an ancient Indian tool requiring extraordinary patience and dexterity. Unlike mechanized computerized embroidery that produces stiff, rigid motifs, human hand-stitching with Aari needles creates durable, organic, fluid curves that contour gracefully around your blouse necklines and sleeves.
            </p>

            <p className="aari-about__paragraph">
              Based in <strong>Negamam</strong>, <strong>Sowmis Aari Work</strong> offers custom-designed hand embroidery tailored to your exact choice, colors, and budget. From simple ₹500 border bead work for festive pujas to opulent ₹5,000+ bridal muhurtham masterpieces, every stitch is crafted with love.
            </p>

            {/* Core Values Pillars */}
            <div className="aari-about__pillars">
              <div className="aari-pillar">
                <div className="aari-pillar__icon">
                  <Scissors size={18} />
                </div>
                <div>
                  <h4 className="aari-pillar__title">Bespoke Khaka Blueprint</h4>
                  <p className="aari-pillar__desc">
                    Every piece starts with hand-sketched parchment calibrated to your exact body measurements.
                  </p>
                </div>
              </div>

              <div className="aari-pillar">
                <div className="aari-pillar__icon">
                  <Gem size={18} />
                </div>
                <div>
                  <h4 className="aari-pillar__title">Heirloom Materials Only</h4>
                  <p className="aari-pillar__desc">
                    Tarnish-resistant antique gold wire, natural seed pearls, and handloom silks.
                  </p>
                </div>
              </div>

              <div className="aari-pillar">
                <div className="aari-pillar__icon">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="aari-pillar__title">Artisan Dignity & Fair Wages</h4>
                  <p className="aari-pillar__desc">
                    We directly support our karigars' families with ethical wages, healthcare, and recognition.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Counters Strip */}
        <div className="aari-about__counters-wrap stitched-card">
          <div className="aari-counters-grid">
            <div className="aari-counter-item">
              <Counter end={1200} suffix="+" />
              <span className="aari-counter-label">Designs Made</span>
              <span className="aari-counter-desc">Bridal Blouses, Sarees & Lehengas</span>
            </div>

            <div className="aari-counter-item">
              <Counter end={450} suffix="+" />
              <span className="aari-counter-label">Happy Brides</span>
              <span className="aari-counter-desc">Worldwide from Chennai to California</span>
            </div>

            <div className="aari-counter-item">
              <Counter end={15} suffix="+" />
              <span className="aari-counter-label">Years of Craft</span>
              <span className="aari-counter-desc">Preserving South Indian Maggam Heritage</span>
            </div>

            <div className="aari-counter-item">
              <Counter end={100} suffix="%" />
              <span className="aari-counter-label">Handcrafted</span>
              <span className="aari-counter-desc">Zero Automation • Pure Human Artistry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
