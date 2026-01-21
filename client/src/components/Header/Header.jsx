import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoImage from '../../assets/brand/logo-mark.png';
import searchIcon from '../../assets/icons/search.svg';
import cartIcon from '../../assets/icons/shopping-cart.svg';
import dropdownIcon from '../../assets/icons/dropdown.svg';
import searchInputIcon from '../../assets/icons/search-gray.svg';
import './Header.css';
import HeaderTabletMenu from './HeaderTabletMenu';

const NAV_LINK_KEYS = [
  'common.nav.link1',
  'common.nav.link2',
  'common.nav.link3',
  'common.nav.link4',
  'common.nav.link5',
];

const LANGUAGES = [
  { code: 'en', labelKey: 'common.language.english' },
  { code: 'ar', labelKey: 'common.language.arabic' },
];

function Header({ isAuthenticated, onLoginClick, onLogoutClick }) {
  const { t, i18n } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const tabletLanguageRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);
  const activeLanguage = i18n.language === 'ar' ? 'ar' : 'en';

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
      setIsTabletMenuOpen(false);
    }

    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }

      const clickedInsideLanguage =
        languageRef.current?.contains(event.target) ||
        tabletLanguageRef.current?.contains(event.target);

      if (!clickedInsideLanguage) {
        setIsLanguageOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTabletMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isTabletMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isTabletMenuOpen]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageOpen(false);
    setIsTabletMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__side header__side--left">
          <div className="header__logo">
            <div className="header__logo-mark" aria-hidden="true">
              <img src={logoImage} alt="" className="header__logo-image" />
            </div>
            <span className="header__logo-text">{t('common.brand.name')}</span>
          </div>
        </div>

        <nav className="header__nav" aria-label={t('common.header.primaryNav')}>
          {NAV_LINK_KEYS.map((key) => (
            <a key={key} href="#" className="header__nav-link">
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="header__side header__side--right">
          <div className="header__actions">
            <div className="header__action" ref={searchRef}>
              <button
                type="button"
                className="header__icon-button"
                aria-label={t('common.header.openSearch')}
                aria-expanded={isSearchOpen}
                onClick={() =>
                  setIsSearchOpen((prev) => {
                    const next = !prev;
                    if (next) {
                      setIsTabletMenuOpen(false);
                      setIsLanguageOpen(false);
                    }
                    return next;
                  })
                }
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
                      placeholder={t('common.header.searchPlaceholder')}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <button type="button" className="header__icon-button" aria-label={t('common.header.cart')}>
              <img src={cartIcon} alt="" className="header__icon-image" />
            </button>

            <div className="header__action header__language" ref={languageRef}>
              <button
                type="button"
                className="header__language-button"
                aria-expanded={isLanguageOpen}
                onClick={() =>
                  setIsLanguageOpen((prev) => {
                    const next = !prev;
                    if (next) {
                      setIsTabletMenuOpen(false);
                      setIsSearchOpen(false);
                    }
                    return next;
                  })
                }
              >
                <span className="header__language-text">{t('common.language.short')}</span>
                <img src={dropdownIcon} alt="" className="header__chevron-image" />
              </button>

              {isLanguageOpen ? (
                <div className="header__language-menu" role="menu">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      className={`header__language-item ${
                        activeLanguage === language.code ? 'is-active' : ''
                      }`.trim()}
                      onClick={() => {
                        handleLanguageChange(language.code);
                      }}
                    >
                      {t(language.labelKey)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <HeaderTabletMenu
              isOpen={isTabletMenuOpen}
              menuRef={menuRef}
              tabletLanguageRef={tabletLanguageRef}
              navLinks={NAV_LINK_KEYS}
              languages={LANGUAGES}
              activeLanguage={activeLanguage}
              isLanguageOpen={isLanguageOpen}
              setIsLanguageOpen={setIsLanguageOpen}
              setIsSearchOpen={setIsSearchOpen}
              setIsTabletMenuOpen={setIsTabletMenuOpen}
              onLanguageChange={handleLanguageChange}
              isAuthenticated={isAuthenticated}
              onLoginClick={onLoginClick}
              onLogoutClick={onLogoutClick}
            />

            <button
              type="button"
              className="header__login"
              onClick={isAuthenticated ? onLogoutClick : onLoginClick}
            >
              {isAuthenticated ? t('common.auth.logout') : t('common.auth.login')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
