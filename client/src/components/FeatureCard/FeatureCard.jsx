import './FeatureCard.css';

function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <img src={icon} alt="" className="feature-card__icon-image" aria-hidden="true" />
      </div>
      <div className="feature-card__content">
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__text">{description}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
