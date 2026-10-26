import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import faqsData from '../../data/faqs.json';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import './FaqSection.css';

const FaqSection = () => {
  const [openId, setOpenId] = useState(faqsData[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-padding aari-faq" id="faq">
      <div className="container">
        <SectionTitle
          badge="Curated Clarifications"
          title="Frequently Asked"
          highlight="Bridal Questions"
          subtitle="Everything you need to know about fabric selection, remote measurements, international courier, and needlework timelines."
        />

        <div className="aari-faq__wrapper">
          <div className="aari-accordion">
            {faqsData.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`aari-accordion-item stitched-card ${isOpen ? 'open' : ''}`}
                >
                  <button
                    className="aari-accordion-header"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="aari-accordion-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="aari-accordion-question">
                      {faq.question}
                    </span>
                    <motion.div
                      className="aari-accordion-icon"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        className="aari-accordion-collapse"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="aari-accordion-body">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact Strip */}
          <div className="aari-faq__support-strip">
            <div className="support-strip-content">
              <HelpCircle size={22} className="gold-text" />
              <div>
                <h4>Have a custom bridal query or unusual heirloom requirement?</h4>
                <p>Our lead designer and master karigar are available for personalized consultations.</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={MessageCircle}
              href="https://wa.me/918838877100?text=Hello%20Sowmis%20Aari%20Work!%20I%20have%20a%20question%20regarding%20hand%20embroidery."
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
