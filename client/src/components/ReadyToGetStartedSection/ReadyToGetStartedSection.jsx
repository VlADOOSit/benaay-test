import illustrationImage from '../../assets/get-started-image.svg';
import './ReadyToGetStartedSection.css';

function ReadyToGetStartedSection() {
  return (
    <section className="ready-cta">
      <div className="ready-cta__card">
        <div className="ready-cta__content">
          <div className="ready-cta__text">
            <h2 className="ready-cta__title">Ready to get started?</h2>
            <p className="ready-cta__supporting">
              Join hundreds of contractors and plumbers who use Bannai to save time and money
            </p>
          </div>
          <a className="ready-cta__button" href="#">
            Register now for free
          </a>
        </div>
        <div className="ready-cta__illustration">
          <img src={illustrationImage} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default ReadyToGetStartedSection;
