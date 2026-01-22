import logoImage from '../../assets/brand/logo-mark.png';
import emailIcon from '../../assets/footer-icons/icon-email.svg';
import locationIcon from '../../assets/footer-icons/icon-location.svg';
import phoneIcon from '../../assets/footer-icons/icon-phone.svg';
import './Footer.css';
import { useTranslation } from 'react-i18next';

const FOOTER_LINKS = [
  [
    'common.footer.links.insulation',
    'common.footer.links.exteriorPaints',
    'common.footer.links.healthProducts',
    'common.footer.links.pipesValves',
  ],
  [
    'common.footer.links.electricalSupplies',
    'common.footer.links.powerTools',
    'common.footer.links.safetyEquipment',
    'common.footer.links.handTools',
  ],
];

function Footer() {
  const { t } = useTranslation();
  const addressLines = t('common.footer.addressLines', { returnObjects: true });

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-row">
              <span className="footer__brand-mark">
                <img src={logoImage} alt="" aria-hidden="true" />
              </span>
              <span className="footer__brand-name">{t('common.brand.name')}</span>
            </div>
            <p className="footer__brand-text">{t('common.footer.brandText')}</p>
          </div>

          <div className="footer__links">
            {FOOTER_LINKS.map((column, index) => (
              <div className="footer__link-column" key={`footer-col-${index}`}>
                {column.map((key) => (
                  <a key={key} href="#" className="footer__link">
                    {t(key)}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="footer__contact">
            <a className="footer__contact-row" href="mailto:hi@untitledui.com">
              <img src={emailIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>{t('common.footer.email')}</span>
            </a>
            <a
              className="footer__contact-row"
              href="https://maps.google.com/?q=100%20Smith%20Street%20Collingwood%20VIC%203066%20AU"
              target="_blank"
              rel="noreferrer"
            >
              <img src={locationIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>
                {Array.isArray(addressLines)
                  ? addressLines.map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}
                        {index === addressLines.length - 1 ? null : <br />}
                      </span>
                    ))
                  : addressLines}
              </span>
            </a>
            <a className="footer__contact-row" href="tel:+15550000000">
              <img src={phoneIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>{t('common.footer.phone')}</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>{t('common.footer.copyright')}</span>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">
              {t('common.footer.terms')}
            </a>
            <a href="#" className="footer__bottom-link">
              {t('common.footer.privacy')}
            </a>
            <a href="#" className="footer__bottom-link">
              {t('common.footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
