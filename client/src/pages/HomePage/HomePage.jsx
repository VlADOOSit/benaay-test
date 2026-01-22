import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header.jsx';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import FeatureCard from '../../components/FeatureCard/FeatureCard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import LogosMarquee from '../../components/LogosMarquee/LogosMarquee.jsx';
import ReadyToGetStartedSection from '../../components/ReadyToGetStartedSection/ReadyToGetStartedSection.jsx';
import LoginModal from '../../components/LoginModal/LoginModal.jsx';
import RegistrationModal from '../../components/RegistrationModal/RegistrationModal.jsx';
import LogoutConfirmModal from '../../components/LogoutConfirmModal/LogoutConfirmModal.jsx';
import { getMe, login, logout, register } from '../../api/authApi.js';
import { refreshAccessToken } from '../../api/httpClient.js';
import deliveryIcon from '../../assets/feature-icons/icon-delivery.svg';
import priceIcon from '../../assets/feature-icons/icon-price.svg';
import laptopIcon from '../../assets/feature-icons/icon-laptop.svg';
import './HomePage.css';

function HomePage() {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const numberFormatter = new Intl.NumberFormat(i18n.language);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        await refreshAccessToken();
        const data = await getMe();
        if (isMounted) {
          setUser(data.user);
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    setUser(data.user);
  };

  const handleRegister = async ({ fullName, email, password }) => {
    const data = await register({ fullName, email, password });
    setUser(data.user);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setActiveModal(null);
  };

  const handleLogoutConfirm = async () => {
    try {
      await handleLogout();
    } finally {
      setIsLogoutConfirmOpen(false);
    }
  };

  return (
    <main className="login-page">
      <Header
        isAuthenticated={Boolean(user)}
        onLoginClick={() => setActiveModal('login')}
        onLogoutClick={() => setIsLogoutConfirmOpen(true)}
      />
      <section className="hero">
        <div className="hero__content">
          <div className="hero__text-group">
            <h1 className="hero__title">{t('common.hero.title')}</h1>
            <p className="hero__supporting">{t('common.hero.supporting')}</p>
          </div>
          <div className="hero__cta">
            {user ? (
              <div className="hero__welcome">
                {t('common.hero.welcome', { name: user.fullName })}
              </div>
            ) : (
              <button
                type="button"
                className="hero__button hero__button--primary"
                onClick={() => setActiveModal('register')}
              >
                {t('common.hero.startNow')}
              </button>
            )}
            <button
              type="button"
              className="hero__button hero__button--secondary"
              onClick={() => setActiveModal('register')}
            >
              {t('common.hero.browseCatalog')}
            </button>
          </div>
        </div>
      </section>
      <section className="suppliers">
        <div className="suppliers__inner">
          <div className="suppliers__heading">
            <h2 className="suppliers__title">{t('common.suppliers.title')}</h2>
            <p className="suppliers__supporting">{t('common.suppliers.supporting')}</p>
          </div>
          <LogosMarquee />
        </div>
      </section>
      <section className="advantages">
        <div className="advantages__inner">
          <div className="advantages__heading">
            <h2 className="advantages__title">{t('common.advantages.title')}</h2>
            <p className="advantages__supporting">{t('common.advantages.supporting')}</p>
          </div>
          <div className="advantages__row">
            <FeatureCard
              icon={deliveryIcon}
              title={t('common.advantages.cards.delivery.title')}
              description={
                <Trans
                  i18nKey="common.advantages.cards.delivery.description"
                  components={[<br key="line-break" />]}
                />
              }
            />
            <FeatureCard
              icon={priceIcon}
              title={t('common.advantages.cards.pricing.title')}
              description={t('common.advantages.cards.pricing.description')}
            />
            <FeatureCard
              icon={laptopIcon}
              title={t('common.advantages.cards.upload.title')}
              description={t('common.advantages.cards.upload.description')}
            />
          </div>
        </div>
      </section>
      <section className="categories">
        <div className="categories__inner">
          <div className="categories__heading">
            <h2 className="categories__title">{t('common.categories.title')}</h2>
            <p className="categories__supporting">{t('common.categories.supporting')}</p>
          </div>
          <div className="categories__row">
            <CategoryCard
              badgeText={numberFormatter.format(1)}
              title={t('common.categories.cards.plumbing.title')}
              description={t('common.categories.cards.plumbing.description')}
              theme="blue"
            />
            <CategoryCard
              badgeText={numberFormatter.format(2)}
              title={t('common.categories.cards.upvc.title')}
              description={t('common.categories.cards.upvc.description')}
              theme="green"
            />
            <CategoryCard
              badgeText={numberFormatter.format(3)}
              title={t('common.categories.cards.ppr.title')}
              description={t('common.categories.cards.ppr.description')}
              theme="purple"
            />
          </div>
        </div>
      </section>
      {user ? null : (
        <ReadyToGetStartedSection onRegisterClick={() => setActiveModal('register')} />
      )}
      <Footer />
      {activeModal === 'login' ? (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSwitchToRegister={() => setActiveModal('register')}
          onSubmit={handleLogin}
        />
      ) : null}
      {activeModal === 'register' ? (
        <RegistrationModal
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal('login')}
          onSubmit={handleRegister}
        />
      ) : null}
      {isLogoutConfirmOpen ? (
        <LogoutConfirmModal
          onCancel={() => setIsLogoutConfirmOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      ) : null}
    </main>
  );
}

export default HomePage;
