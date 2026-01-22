import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cancelIcon from '../../assets/icons/cancel.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import './LoginModal.css';

function LoginModal({ onClose, onSwitchToRegister, onSubmit }) {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
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
      onSwitchToRegister?.();
    }, 180);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit?.({ email, password });
      handleClose();
    } catch (err) {
      const errorKey = err?.message;
      const resolvedError =
        errorKey && errorKey.startsWith('common.')
          ? t(errorKey)
          : t('common.modals.login.error');
      setError(resolvedError);
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
        aria-label={t('common.modals.login.ariaLabel')}
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
            <h2 className="login-modal__title">{t('common.modals.login.title')}</h2>
            <p className="login-modal__subtitle">{t('common.modals.login.subtitle')}</p>
          </div>
          <form className="login-modal__form" onSubmit={handleSubmit}>
            <input
              className="login-modal__input"
              type="email"
              id="login-email"
              name="email"
              placeholder={t('common.modals.login.emailPlaceholder')}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <div className="login-modal__input-wrap">
              <input
                className="login-modal__input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="login-password"
                name="password"
                placeholder={t('common.modals.login.passwordPlaceholder')}
                autoComplete="current-password"
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
            <a className="login-modal__forgot" href="#">
              {t('common.modals.login.forgot')}
            </a>
            {error ? <p className="login-modal__error">{error}</p> : null}
            <button type="submit" className="login-modal__button" disabled={isSubmitting}>
              {isSubmitting ? t('common.modals.login.submitting') : t('common.modals.login.submit')}
            </button>
          </form>
          <p className="login-modal__register">
            {t('common.modals.login.noAccount')}{' '}
            <a className="login-modal__register-link" href="#" onClick={handleSwitch}>
              {t('common.modals.login.register')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
