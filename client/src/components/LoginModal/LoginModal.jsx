import { useState } from 'react';
import cancelIcon from '../../assets/icons/cancel.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import './LoginModal.css';

function LoginModal({ onClose }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 180);
  };

  return (
    <div className={`login-overlay ${isClosing ? 'is-closing' : ''}`}>
      <div
        className={`login-modal ${isClosing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Login"
      >
        <button type="button" className="login-modal__close" onClick={handleClose} aria-label="Close">
          <img src={cancelIcon} alt="" className="login-modal__close-icon" />
        </button>
        <div className="login-modal__content">
          <div className="login-modal__header">
            <h2 className="login-modal__title">Enter the office</h2>
            <p className="login-modal__subtitle">
              Lorem ipsum dolor sit amet consectetur. Sit nisl vulputate euismod et id.
            </p>
          </div>
          <div className="login-modal__form">
            <input
              className="login-modal__input"
              type="email"
              id="login-email"
              name="email"
              placeholder="Login or e-mail"
            />
            <div className="login-modal__input-wrap">
              <input
                className="login-modal__input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="login-password"
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
            <a className="login-modal__forgot" href="#">
              Forgot your password?
            </a>
          </div>
          <a className="login-modal__button" href="#">
            Sign in
          </a>
          <p className="login-modal__register">
            Don&apos;t have an account yet?{' '}
            <a className="login-modal__register-link" href="#">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
