import { useState } from 'react';
import cancelIcon from '../../assets/icons/cancel.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import '../LoginModal/LoginModal.css';

function RegistrationModal({ onClose, onSwitchToLogin }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div className={`login-overlay ${isClosing ? 'is-closing' : ''}`}>
      <div
        className={`login-modal ${isClosing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Registration"
      >
        <button type="button" className="login-modal__close" onClick={handleClose} aria-label="Close">
          <img src={cancelIcon} alt="" className="login-modal__close-icon" />
        </button>
        <div className="login-modal__content">
          <div className="login-modal__header">
            <h2 className="login-modal__title">Registration</h2>
            <p className="login-modal__subtitle">
              Lorem ipsum dolor sit amet consectetur. Sit nisl vulputate euismod et id.
            </p>
          </div>
          <div className="login-modal__form">
            <input
              className="login-modal__input"
              type="text"
              id="register-full-name"
              name="fullName"
              placeholder="Full Name"
            />
            <input
              className="login-modal__input"
              type="email"
              id="register-email"
              name="email"
              placeholder="E-mail"
            />
            <div className="login-modal__input-wrap">
              <input
                className="login-modal__input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="register-password"
                name="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="login-modal__icon"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                <img src={eyeIcon} alt="" className="login-modal__icon-image" />
              </button>
            </div>
          </div>
          <a className="login-modal__button" href="#">
            Sign Up
          </a>
          <p className="login-modal__register">
            Already registered?{' '}
            <a className="login-modal__register-link" href="#" onClick={handleSwitch}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
