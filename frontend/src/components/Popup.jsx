import React, { useEffect } from 'react';

function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${name}-popup ${isOpen && 'popup_opened'}`}
      onClick={handleOverlay}
      onKeyDown={handleOverlay}
      role="button"
      tabIndex={0}>
      {children}
    </div>
  );
}

export default Popup;
