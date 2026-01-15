import { useEffect, useRef, useState } from 'react';
import logoImage from '../../assets/image 41@2x.png';
import searchIcon from '../../assets/search.png';
import cartIcon from '../../assets/shopping-cart.png';
import './Header.css';

const NAV_LINKS = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'];

const LANGUAGES = ['English', 'Arabic'];

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Escape') {
        return;
      }

      setIsSearchOpen(false);
      setIsLanguageOpen(false);
    }

    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }

      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__side header__side--left">
          <div className="header__logo">
            <div className="header__logo-mark" aria-hidden="true">
              <img src={logoImage} alt="" className="header__logo-image" />
            </div>
            <span className="header__logo-text">Benaay</span>
          </div>
        </div>

        <nav className="header__nav" aria-label="Primary">
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className="header__nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="header__side header__side--right">
          <div className="header__actions">
            <div className="header__action" ref={searchRef}>
            <button
              type="button"
              className="header__icon-button"
              aria-label="Open search"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <img src={searchIcon} alt="" className="header__icon-image" />
            </button>

              {isSearchOpen ? (
                <div className="header__search-panel">
                  <div className="header__search-field">
                    <svg viewBox="0 0 24 24" className="header__search-icon">
                      <path
                        d="M11 4a7 7 0 105.2 11.7l4.05 4.05 1.41-1.41-4.05-4.05A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z"
                        fill="currentColor"
                      />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="header__search-input"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <button type="button" className="header__icon-button" aria-label="Cart">
              <img src={cartIcon} alt="" className="header__icon-image" />
            </button>

            <div className="header__action header__language" ref={languageRef}>
              <button
                type="button"
                className="header__language-button"
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((prev) => !prev)}
              >
                <span className="header__language-text">Eng</span>
                <svg viewBox="0 0 24 24" className="header__chevron" aria-hidden="true">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isLanguageOpen ? (
                <div className="header__language-menu" role="menu">
                  {LANGUAGES.map((language) => (
                    <button key={language} type="button" className="header__language-item">
                      {language}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button type="button" className="header__login">
              Log In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
