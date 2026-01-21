import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cancelIcon from '../../assets/icons/cancel.svg';
import './LogoutConfirmModal.css';

function LogoutConfirmModal({ onConfirm, onCancel }) {
  const { t } = useTranslation();
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
        aria-label={t('common.modals.logout.ariaLabel')}
      >
        <button
          type="button"
          className="confirm-modal__close"
          onClick={handleClose}
          aria-label={t('common.actions.close')}
        >
          <img src={cancelIcon} alt="" className="confirm-modal__close-icon" />
        </button>
        <div className="confirm-modal__content">
          <h2 className="confirm-modal__title">{t('common.modals.logout.title')}</h2>
          <p className="confirm-modal__subtitle">{t('common.modals.logout.subtitle')}</p>
          <div className="confirm-modal__actions">
            <button
              type="button"
              className="confirm-modal__button confirm-modal__button--ghost"
              onClick={handleClose}
            >
              {t('common.modals.logout.cancel')}
            </button>
            <button type="button" className="confirm-modal__button" onClick={handleConfirm}>
              {t('common.modals.logout.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
