import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  children,
  variant = 'primary', // 'primary', 'gold', 'outline', 'ghost', 'subtle'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  to,
  href,
  className = '',
  ...props
}) => {
  const buttonClasses = `aari-btn aari-btn--${variant} aari-btn--${size} ${className}`;

  const content = (
    <>
      <span className="aari-btn__shimmer" />
      {Icon && iconPosition === 'left' && <Icon className="aari-btn__icon aari-btn__icon--left" size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18} />}
      <span className="aari-btn__text">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="aari-btn__icon aari-btn__icon--right" size={size === 'sm' ? 15 : size === 'lg' ? 20 : 18} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={onClick} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
