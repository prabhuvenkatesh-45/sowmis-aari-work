import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle2, Sparkles, Send, Image as ImageIcon, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import './CustomOrderSection.css';

const designTypes = [
  'Simple Bead Work / Stone Border (₹500)',
  'Minimal Work & Buttas (₹600 – ₹1,200)',
  'Sleeve Covered Aari Jaal (₹1,000 – ₹2,000)',
  'Net Attached Designer Work (₹1,000 – ₹4,000)',
  'Bridal Aari Blouse (₹2,500 – ₹5,000)',
  'Heavy Muhurtham Royal Bridal (₹5,000+)',
];

const budgetRanges = [
  '₹500 – ₹1,000 (Simple Bead / Stone Work)',
  '₹1,000 – ₹2,500 (Minimal Work & Full Sleeves)',
  '₹2,500 – ₹5,000 (Bridal & Net Designer Work)',
  '₹5,000+ (Heavy Muhurtham Bridal Aari Work)',
];

const fabricOptions = [
  'I will courier/bring my own blouse material to Negamam studio',
  'Sowmis Aari Work to provide matching Raw Silk material',
  'Need artisan guidance during consultation',
];

const CustomOrderSection = ({ preselectedItem, onResetPreselected }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    designType: preselectedItem ? (preselectedItem.categoryLabel || preselectedItem.category) : 'Bridal Aari Blouse (₹2,500 – ₹5,000)',
    budget: '₹1,000 – ₹2,500 (Minimal Work & Full Sleeves)',
    fabric: 'I will courier/bring my own blouse material to Negamam studio',
    eventDate: '',
    message: preselectedItem ? `I am inquiring to commission a design based on: "${preselectedItem.title}" (${preselectedItem.price}).` : '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRefId, setOrderRefId] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Image Upload Preview Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPreviews = files.slice(0, 3 - uploadedImages.length).map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(0) + ' KB',
      url: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp / phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.eventDate) {
      newErrors.eventDate = 'Approximate event date is required to reserve artisan slots';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate artisan booking generation
    setTimeout(() => {
      const generatedId = `AARI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderRefId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory golden confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FDE68A', '#751428', '#FFE79A'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleWhatsAppForward = () => {
    const msg = `Hello Sowmis Aari Work! I just booked a custom hand embroidery consultation.
Reference ID: ${orderRefId}
Name: ${formData.name}
Phone: ${formData.phone}
Design: ${formData.designType}
Budget: ${formData.budget}
Target Date: ${formData.eventDate}
Notes: ${formData.message}`;

    window.open(`https://wa.me/918838877100?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setOrderRefId('');
    setUploadedImages([]);
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      designType: 'Bridal Blouse',
      budget: '₹15,000 – ₹30,000 (Royal Heritage)',
      fabric: 'I will courier my own saree/fabric to the studio',
      eventDate: '',
      message: '',
    });
    if (onResetPreselected) onResetPreselected();
  };

  return (
    <section className="section-padding aari-custom-order" id="custom-order">
      <div className="container">
        <SectionTitle
          badge="Bespoke Studio"
          title="Commission Your Singular"
          highlight="Bridal Masterpiece"
          subtitle="Share your wedding theme, silhouette ideas, and reference photos. Our master designers will craft your personalized khaka blueprint."
        />

        <div className="aari-order-wrapper stitched-card">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success View */
              <motion.div
                key="success"
                className="aari-order-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aari-order-success__icon-wrap">
                  <CheckCircle2 size={54} className="gold-text" />
                </div>

                <span className="aari-order-success__badge">
                  Consultation Request Confirmed
                </span>

                <h3 className="aari-order-success__title">
                  Your Bespoke Slot Has Been Reserved
                </h3>

                <p className="aari-order-success__text">
                  Thank you, <strong>{formData.name}</strong>. Your consultation docket has been assigned to our Lead Bridal Stylist & Master Karigar. We will review your silhouette request and contact you via WhatsApp within 4 to 12 business hours.
                </p>

                <div className="aari-order-success__ticket">
                  <div className="ticket-row">
                    <span className="ticket-label">Docket Ref:</span>
                    <span className="ticket-val gold-text font-serif">{orderRefId}</span>
                  </div>
                  <div className="ticket-row">
                    <span className="ticket-label">Design Type:</span>
                    <span className="ticket-val">{formData.designType}</span>
                  </div>
                  <div className="ticket-row">
                    <span className="ticket-label">Target Date:</span>
                    <span className="ticket-val">{formData.eventDate}</span>
                  </div>
                  <div className="ticket-row">
                    <span className="ticket-label">Budget Tier:</span>
                    <span className="ticket-val">{formData.budget}</span>
                  </div>
                </div>

                <div className="aari-order-success__actions">
                  <Button
                    variant="gold"
                    size="md"
                    icon={MessageCircle}
                    onClick={handleWhatsAppForward}
                  >
                    Open Docket in WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleResetForm}
                  >
                    Book Another Silhouette
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Form View */
              <form key="form" onSubmit={handleSubmit} className="aari-order-form">
                <div className="aari-order-form__grid">
                  {/* Step 1: Personal Details */}
                  <div className="aari-form-col">
                    <h4 className="aari-form-section-title">
                      <span className="step-num">01</span> Client & Event Details
                    </h4>

                    {/* Name */}
                    <div className="aari-form-group">
                      <label className="aari-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Radhika Menon"
                        className={`aari-input ${errors.name ? 'input-error' : ''}`}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* Phone & Email Row */}
                    <div className="aari-form-row">
                      <div className="aari-form-group">
                        <label className="aari-label">
                          WhatsApp / Phone <span className="req">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`aari-input ${errors.phone ? 'input-error' : ''}`}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>

                      <div className="aari-form-group">
                        <label className="aari-label">Email Address (Optional)</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="radhika@example.com"
                          className={`aari-input ${errors.email ? 'input-error' : ''}`}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                    </div>

                    {/* City & Event Date Row */}
                    <div className="aari-form-row">
                      <div className="aari-form-group">
                        <label className="aari-label">City / Country</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Chennai, Hyderabad, London..."
                          className="aari-input"
                        />
                      </div>

                      <div className="aari-form-group">
                        <label className="aari-label">
                          Wedding / Event Date <span className="req">*</span>
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className={`aari-input ${errors.eventDate ? 'input-error' : ''}`}
                        />
                        {errors.eventDate && <span className="error-text">{errors.eventDate}</span>}
                      </div>
                    </div>

                    {/* Fabric Handling */}
                    <div className="aari-form-group">
                      <label className="aari-label">Silk Fabric Arrangement</label>
                      <select
                        name="fabric"
                        value={formData.fabric}
                        onChange={handleChange}
                        className="aari-select"
                      >
                        {fabricOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 2: Design Specifications & Upload */}
                  <div className="aari-form-col">
                    <h4 className="aari-form-section-title">
                      <span className="step-num">02</span> Embroidery Silhouette & Mood Board
                    </h4>

                    {/* Design Type */}
                    <div className="aari-form-group">
                      <label className="aari-label">Garment Silhouette</label>
                      <select
                        name="designType"
                        value={formData.designType}
                        onChange={handleChange}
                        className="aari-select"
                      >
                        {designTypes.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Tier */}
                    <div className="aari-form-group">
                      <label className="aari-label">Estimated Budget Tier</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="aari-select"
                      >
                        {budgetRanges.map((range, i) => (
                          <option key={i} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Inspiration Upload */}
                    <div className="aari-form-group">
                      <label className="aari-label">
                        Inspiration Photos or Saree Reference (Up to 3 images)
                      </label>
                      <div className="aari-upload-zone">
                        <input
                          type="file"
                          id="aari-file-input"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="aari-file-input"
                          disabled={uploadedImages.length >= 3}
                        />
                        <label htmlFor="aari-file-input" className="aari-upload-label">
                          <Upload size={22} className="gold-text" />
                          <span className="upload-main-text">
                            Click to upload or drag & drop reference images
                          </span>
                          <span className="upload-sub-text">
                            PNG, JPG or WEBP (Max 5MB per image)
                          </span>
                        </label>
                      </div>

                      {/* Image Preview List */}
                      {uploadedImages.length > 0 && (
                        <div className="aari-preview-list">
                          {uploadedImages.map((img, idx) => (
                            <div key={idx} className="aari-preview-chip">
                              <img src={img.url} alt={`Upload ${idx + 1}`} className="aari-preview-thumb" />
                              <div className="aari-preview-info">
                                <span className="aari-preview-name">{img.name}</span>
                                <span className="aari-preview-size">{img.size}</span>
                              </div>
                              <button
                                type="button"
                                className="aari-preview-remove"
                                onClick={() => removeImage(idx)}
                                aria-label="Remove image"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Notes / Message */}
                    <div className="aari-form-group">
                      <label className="aari-label">
                        Special Motif Requests & Saree Color Palette
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Mention your preferred neckline (boat neck, sweetheart, deep U), embroidery motifs (peacock, lotus, temple coin), or specific jewelry pairing..."
                        className="aari-textarea"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Row */}
                <div className="aari-order-submit-row">
                  <div className="aari-form-trust-note">
                    <ShieldCheck size={16} className="gold-text" />
                    <span>Your measurements & bridal motifs remain confidential and exclusive to you.</span>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    icon={Send}
                    iconPosition="right"
                    disabled={isSubmitting}
                    className="aari-submit-btn"
                  >
                    {isSubmitting ? 'Reserving Artisan Docket...' : 'Reserve Bespoke Consultation'}
                  </Button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
