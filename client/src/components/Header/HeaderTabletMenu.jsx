import dropdownIcon from '../../assets/icons/dropdown.svg';

function HeaderTabletMenu({
  isOpen,
  menuRef,
  tabletLanguageRef,
  navLinks,
  languages,
  activeLanguage,
  setActiveLanguage,
  isLanguageOpen,
  setIsLanguageOpen,
  setIsSearchOpen,
  setIsTabletMenuOpen,
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
}) {
  return (
    <div className="header__action header__action--menu" ref={menuRef}>
      <button
        type="button"
        className={`header__icon-button header__menu-toggle ${isOpen ? 'is-open' : ''}`.trim()}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
              <span className="header__tablet-menu-title">Menu</span>
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
                  <span className="header__language-text">Eng</span>
                  <div className="header__chevron-icon">
                    <img src={dropdownIcon} alt="" className="header__chevron-image" />
                  </div>
                </button>

                {isLanguageOpen ? (
                  <div className="header__language-menu" role="menu">
                    {languages.map((language) => (
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
            </div>
            <ul className="header__tablet-menu-list" aria-label="Tablet navigation">
              {navLinks.map((label) => (
                <li key={label} className="header__tablet-menu-item">
                  <a
                    href="#"
                    className="header__tablet-menu-link"
                    onClick={() => setIsTabletMenuOpen(false)}
                  >
                    {label}
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
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HeaderTabletMenu;
