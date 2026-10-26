import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = ({ phoneNumber = "+918838877100", defaultMessage = "Hello Sowmis Aari Work! I am interested in custom aari hand embroidery design and pricing." }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="wa-floating-wrapper">
      {showTooltip && (
        <div className="wa-tooltip">
          <button
            className="wa-tooltip__close"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Dismiss chat tip"
          >
            <X size={12} />
          </button>
          <div className="wa-tooltip__header">
            <span className="wa-tooltip__status" />
            <span className="wa-tooltip__title">Sowmis Artisan Online</span>
          </div>
          <p className="wa-tooltip__text">
            Need design advice or quick quote? Chat with Sowmis Aari Work on WhatsApp.
          </p>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-floating-btn"
        aria-label="Chat with Sowmis Aari Work on WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        <span className="wa-floating-btn__pulse" />
        <span className="wa-floating-btn__ring" />
        <MessageCircle size={28} className="wa-icon" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
