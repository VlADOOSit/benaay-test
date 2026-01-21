import dropdownIcon from '../../assets/icons/dropdown.svg';
import { useTranslation } from 'react-i18next';

function HeaderTabletMenu({
  isOpen,
  menuRef,
  tabletLanguageRef,
  navLinks,
  languages,
  activeLanguage,
  isLanguageOpen,
  setIsLanguageOpen,
  setIsSearchOpen,
  setIsTabletMenuOpen,
  onLanguageChange,
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) {
  const { t } = useTranslation();

  return (
    <div className="header__action header__action--menu" ref={menuRef}>
      <button
        type="button"
        className={`header__icon-button header__menu-toggle ${isOpen ? 'is-open' : ''}`.trim()}
        aria-label={isOpen ? t('common.header.closeMenu') : t('common.header.openMenu')}
        aria-expanded={isOpen}
        aria-controls="tablet-navigation"
        onClick={() =>
          setIsTabletMenuOpen((prev) => {
            const next = !prev;
            if (next) {
              setIsSearchOpen(false);
            }
            setIsLanguageOpen(false);
            return next;
          })
        }
      >
        <span className="header__menu-icon" aria-hidden="true">
          <span className="header__menu-line" />
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </span>
      </button>

      {isOpen ? (
        <div className="header__tablet-menu" id="tablet-navigation">
          <div className="header__tablet-menu-inner">
            <div className="header__tablet-menu-header">
              <span className="header__tablet-menu-title">{t('common.header.menu')}</span>
              <div className="header__tablet-language" ref={tabletLanguageRef}>
                <button
                  type="button"
                  className="header__language-button"
                  aria-expanded={isLanguageOpen}
                  onClick={() =>
                    setIsLanguageOpen((prev) => {
                      const next = !prev;
                      if (next) {
                        setIsSearchOpen(false);
                      }
                      return next;
                    })
                  }
                >
                  <span className="header__language-text">{t('common.language.short')}</span>
                  <div className="header__chevron-icon">
                    <img src={dropdownIcon} alt="" className="header__chevron-image" />
                  </div>
                </button>

                {isLanguageOpen ? (
                  <div className="header__language-menu" role="menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        className={`header__language-item ${
                          activeLanguage === language.code ? 'is-active' : ''
                        }`.trim()}
                        onClick={() => {
                          onLanguageChange(language.code);
                        }}
                      >
                        {t(language.labelKey)}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <ul className="header__tablet-menu-list" aria-label={t('common.header.tabletNav')}>
              {navLinks.map((key) => (
                <li key={key} className="header__tablet-menu-item">
                  <a
                    href="#"
                    className="header__tablet-menu-link"
                    onClick={() => setIsTabletMenuOpen(false)}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="header__tablet-menu-login"
              onClick={() => {
                setIsTabletMenuOpen(false);
                if (isAuthenticated) {
                  onLogoutClick();
                } else {
                  onLoginClick();
                }
              }}
            >
              {isAuthenticated ? t('common.auth.logout') : t('common.auth.login')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HeaderTabletMenu;
