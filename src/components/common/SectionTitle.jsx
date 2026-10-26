import React from 'react';
import { Sparkles } from 'lucide-react';
import './SectionTitle.css';

const SectionTitle = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center', // 'center', 'left'
  className = ''
}) => {
  return (
    <div className={`section-header section-header--${align} ${className}`}>
      {badge && (
        <div className="section-header__badge">
          <Sparkles size={13} className="section-header__badge-icon" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="section-header__title">
        {title}{' '}
        {highlight && <span className="gold-text section-header__highlight">{highlight}</span>}
      </h2>

      <div className="thread-divider">
        <span className="thread-line" />
        <span className="thread-needle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.2" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </span>
        <span className="thread-line" />
      </div>

      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
