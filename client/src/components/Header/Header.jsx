import { useEffect, useRef, useState } from 'react';
import logoImage from '../../assets/brand/logo-mark.png';
import searchIcon from '../../assets/icons/search.svg';
import cartIcon from '../../assets/icons/shopping-cart.svg';
import dropdownIcon from '../../assets/icons/dropdown.svg';
import searchInputIcon from '../../assets/icons/search-gray.svg';
import './Header.css';

const NAV_LINKS = ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'];

const LANGUAGES = ['English', 'Arabic'];

function Header({ onLoginClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('English');
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
                    <img src={searchInputIcon} alt="" className="header__search-icon" />
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
                <img src={dropdownIcon} alt="" className="header__chevron-image" />
              </button>

              {isLanguageOpen ? (
                <div className="header__language-menu" role="menu">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language}
                      type="button"
                      className={`header__language-item ${
                        activeLanguage === language ? 'is-active' : ''
                      }`.trim()}
                      onClick={() => {
                        setActiveLanguage(language);
                        setIsLanguageOpen(false);
                      }}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button type="button" className="header__login" onClick={onLoginClick}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
