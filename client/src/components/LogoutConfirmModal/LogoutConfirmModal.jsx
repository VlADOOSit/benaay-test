import { useState } from 'react';
import cancelIcon from '../../assets/icons/cancel.svg';
import './LogoutConfirmModal.css';

function LogoutConfirmModal({ onConfirm, onCancel }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel?.();
    }, 180);
  };

  const handleConfirm = async () => {
    setIsClosing(true);
    setTimeout(() => {
      onConfirm?.();
    }, 180);
  };

  return (
    <div className={`confirm-overlay ${isClosing ? 'is-closing' : ''}`}>
      <div
        className={`confirm-modal ${isClosing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Confirm logout"
      >
        <button type="button" className="confirm-modal__close" onClick={handleClose}>
          <img src={cancelIcon} alt="" className="confirm-modal__close-icon" />
        </button>
        <div className="confirm-modal__content">
          <h2 className="confirm-modal__title">Log out?</h2>
          <p className="confirm-modal__subtitle">Are you sure you want to log out of your account?</p>
          <div className="confirm-modal__actions">
            <button type="button" className="confirm-modal__button confirm-modal__button--ghost" onClick={handleClose}>
              Cancel
            </button>
            <button type="button" className="confirm-modal__button" onClick={handleConfirm}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
