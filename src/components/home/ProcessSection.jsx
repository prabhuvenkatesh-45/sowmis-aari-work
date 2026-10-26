import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, PenTool, Sparkles, Scissors, PackageCheck, Check, ArrowRight } from 'lucide-react';
import processSteps from '../../data/processSteps.json';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import './ProcessSection.css';

const stepIcons = {
  MessageSquare: MessageSquare,
  PenTool: PenTool,
  Sparkles: Sparkles,
  Scissors: Scissors,
  PackageCheck: PackageCheck,
};

const stepImages = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=700&q=80",
];

const ProcessSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = processSteps[activeStepIndex];
  const IconComponent = stepIcons[activeStep.icon] || Sparkles;

  return (
    <section className="section-padding aari-process" id="process">
      <div className="container">
        <SectionTitle
          badge="The Artisan Journey"
          title="From Raw Silk to Heirloom:"
          highlight="How We Work"
          subtitle="Explore the meticulous 5-step journey that brings imperial Indian hand needlecraft from your imagination to your bridal day."
        />

        {/* Interactive Steps Progress Track */}
        <div className="aari-process__track-wrap">
          <div className="aari-process__track-line" />
          <div
            className="aari-process__track-progress"
            style={{ width: `${(activeStepIndex / (processSteps.length - 1)) * 100}%` }}
          />

          <div className="aari-process__step-buttons">
            {processSteps.map((s, idx) => {
              const Icon = stepIcons[s.icon] || Sparkles;
              const isPassed = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <button
                  key={s.step}
                  className={`aari-process__node-btn ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                  aria-label={`Step ${s.step}: ${s.title}`}
                >
                  <div className="aari-process__node-circle">
                    {idx < activeStepIndex ? (
                      <Check size={16} />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                  <span className="aari-process__node-label">
                    <span className="node-number">Phase {s.step}</span>
                    <span className="node-title">{s.title.split(' ')[0]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card */}
        <div className="aari-process__showcase stitched-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              className="aari-process__showcase-inner"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Left: Content */}
              <div className="aari-process__content">
                <div className="aari-process__step-header">
                  <span className="aari-process__step-badge">
                    Step {activeStep.step} of 05
                  </span>
                  <span className="aari-process__tagline">
                    {activeStep.tagline}
                  </span>
                </div>

                <h3 className="aari-process__title">
                  {activeStep.title}
                </h3>

                <p className="aari-process__desc">
                  {activeStep.description}
                </p>

                <div className="aari-process__artisan-box">
                  <div className="aari-process__artisan-icon">
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <span className="aari-process__artisan-label">Karigar Secret</span>
                    <p className="aari-process__artisan-detail">{activeStep.artisanDetail}</p>
                  </div>
                </div>

                <div className="aari-process__nav-controls">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  >
                    &larr; Previous Phase
                  </Button>

                  {activeStepIndex < processSteps.length - 1 ? (
                    <Button
                      variant="gold"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                      onClick={() => setActiveStepIndex(prev => Math.min(processSteps.length - 1, prev + 1))}
                    >
                      Next Phase
                    </Button>
                  ) : (
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => {
                        const el = document.getElementById('custom-order');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Start Your Journey &rarr;
                    </Button>
                  )}
                </div>
              </div>

              {/* Right: Media Frame */}
              <div className="aari-process__media">
                <div className="aari-process__media-frame">
                  <img
                    src={stepImages[activeStepIndex]}
                    alt={activeStep.title}
                    className="aari-process__img"
                  />
                  <div className="aari-process__media-overlay">
                    <div className="aari-process__media-icon-badge">
                      <IconComponent size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
