import illustrationImage from '../../assets/illustrations/get-started-image.svg';
import './ReadyToGetStartedSection.css';
import { useTranslation } from 'react-i18next';

function ReadyToGetStartedSection({ onRegisterClick }) {
  const { t } = useTranslation();

  return (
    <section className="ready-cta">
      <div className="ready-cta__card">
        <div className="ready-cta__content">
          <div className="ready-cta__text">
            <h2 className="ready-cta__title">{t('common.ready.title')}</h2>
            <p className="ready-cta__supporting">{t('common.ready.supporting')}</p>
          </div>
          <button type="button" className="ready-cta__button" onClick={onRegisterClick}>
            {t('common.ready.button')}
          </button>
        </div>
        <div className="ready-cta__illustration">
          <img src={illustrationImage} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default ReadyToGetStartedSection;
