import arrowIcon from '../../assets/icons/arrow.svg';
import './CategoryCard.css';

function CategoryCard({ badgeText, title, description, theme }) {
  const themeClass = theme ? `category-card--${theme}` : '';

  return (
    <article className={`category-card ${themeClass}`.trim()}>
      <div className="category-card__header">
        <div className="category-card__badge">{badgeText}</div>
        <h3 className="category-card__title">{title}</h3>
      </div>
      <div className="category-card__footer">
        <p className="category-card__text">{description}</p>
        <button type="button" className="category-card__button">
          <span>Browse products</span>
          <img src={arrowIcon} alt="" aria-hidden="true" className="category-card__button-icon" />
        </button>
      </div>
    </article>
  );
}

export default CategoryCard;
