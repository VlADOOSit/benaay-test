import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cancelIcon from '../../assets/icons/cancel.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import '../LoginModal/LoginModal.css';

function RegistrationModal({ onClose, onSwitchToLogin, onSubmit }) {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 180);
  };

  const handleSwitch = (event) => {
    event.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      onSwitchToLogin?.();
    }, 180);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit?.({ fullName, email, password });
      handleClose();
    } catch (err) {
      setError(err?.message || t('common.modals.register.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`login-overlay ${isClosing ? 'is-closing' : ''}`}>
      <div
        className={`login-modal ${isClosing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('common.modals.register.ariaLabel')}
      >
        <button
          type="button"
          className="login-modal__close"
          onClick={handleClose}
          aria-label={t('common.actions.close')}
        >
          <img src={cancelIcon} alt="" className="login-modal__close-icon" />
        </button>
        <div className="login-modal__content">
          <div className="login-modal__header">
            <h2 className="login-modal__title">{t('common.modals.register.title')}</h2>
            <p className="login-modal__subtitle">{t('common.modals.register.subtitle')}</p>
          </div>
          <form className="login-modal__form" onSubmit={handleSubmit}>
            <input
              className="login-modal__input"
              type="text"
              id="register-full-name"
              name="fullName"
              placeholder={t('common.modals.register.fullNamePlaceholder')}
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
            <input
              className="login-modal__input"
              type="email"
              id="register-email"
              name="email"
              placeholder={t('common.modals.register.emailPlaceholder')}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <div className="login-modal__input-wrap">
              <input
                className="login-modal__input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="register-password"
                name="password"
                placeholder={t('common.modals.register.passwordPlaceholder')}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="login-modal__icon"
                aria-label={
                  isPasswordVisible ? t('common.actions.hidePassword') : t('common.actions.showPassword')
                }
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <img src={eyeIcon} alt="" className="login-modal__icon-image" />
              </button>
            </div>
            {error ? <p className="login-modal__error">{error}</p> : null}
            <button type="submit" className="login-modal__button" disabled={isSubmitting}>
              {isSubmitting ? t('common.modals.register.submitting') : t('common.modals.register.submit')}
            </button>
          </form>
          <p className="login-modal__register">
            {t('common.modals.register.alreadyRegistered')}{' '}
            <a className="login-modal__register-link" href="#" onClick={handleSwitch}>
              {t('common.modals.register.login')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
