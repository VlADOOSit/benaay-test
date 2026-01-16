import logoImage from '../../assets/image 41@2x.png';
import emailIcon from '../../assets/footer-icons/icon-email.svg';
import locationIcon from '../../assets/footer-icons/icon-location.svg';
import phoneIcon from '../../assets/footer-icons/icon-phone.svg';
import './Footer.css';

const FOOTER_LINKS = [
  ['Insulation materials', 'Exterior paints', 'Health products', 'Pipes and valves'],
  ['Electrical supplies', 'Power tools', 'Safety equipment', 'Hand tools'],
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-row">
              <span className="footer__brand-mark">
                <img src={logoImage} alt="" aria-hidden="true" />
              </span>
              <span className="footer__brand-name">Benaay</span>
            </div>
            <p className="footer__brand-text">
              Join hundreds of contractors and plumbers who use Bannai to save time and money
            </p>
          </div>

          <div className="footer__links">
            {FOOTER_LINKS.map((column, index) => (
              <div className="footer__link-column" key={`footer-col-${index}`}>
                {column.map((label) => (
                  <a key={label} href="#" className="footer__link">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="footer__contact">
            <a className="footer__contact-row" href="mailto:hi@untitledui.com">
              <img src={emailIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>hi@untitledui.com</span>
            </a>
            <a
              className="footer__contact-row"
              href="https://maps.google.com/?q=100%20Smith%20Street%20Collingwood%20VIC%203066%20AU"
              target="_blank"
              rel="noreferrer"
            >
              <img src={locationIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>
                100 Smith Street Collingwood
                <br />
                VIC 3066 AU
              </span>
            </a>
            <a className="footer__contact-row" href="tel:+15550000000">
              <img src={phoneIcon} alt="" aria-hidden="true" className="footer__icon" />
              <span>+1 (555) 000-0000</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2025 Logo. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">
              Terms
            </a>
            <a href="#" className="footer__bottom-link">
              Privacy
            </a>
            <a href="#" className="footer__bottom-link">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
