import Header from '../../components/Header/Header.jsx';
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx';
import FeatureCard from '../../components/FeatureCard/FeatureCard.jsx';
import LogosMarquee from '../../components/LogosMarquee/LogosMarquee.jsx';
import deliveryIcon from '../../assets/feature-icons/icon-delivery.svg';
import priceIcon from '../../assets/feature-icons/icon-price.svg';
import laptopIcon from '../../assets/feature-icons/icon-laptop.svg';
import './HomePage.css';

function HomePage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero__content">
          <div className="hero__text-group">
            <h1 className="hero__title">Bannai - Building Materials Market</h1>
            <p className="hero__supporting">
              B2B platform specializing in plumbing and building materials compare prices and order
              from certified suppliers
            </p>
          </div>
          <div className="hero__cta">
            <button type="button" className="hero__button hero__button--primary">
              Start now
            </button>
            <button type="button" className="hero__button hero__button--secondary">
              Browse the catalog
            </button>
          </div>
        </div>
      </section>
      <section className="suppliers">
        <div className="suppliers__inner">
          <div className="suppliers__heading">
            <h2 className="suppliers__title">Our approved suppliers</h2>
            <p className="suppliers__supporting">
              We work only with verified suppliers to ensure quality, reliability, and fair pricing
              for every order
            </p>
          </div>
          <LogosMarquee />
        </div>
      </section>
      <section className="advantages">
        <div className="advantages__inner">
          <div className="advantages__heading">
            <h2 className="advantages__title">Our advantages</h2>
            <p className="advantages__supporting">
              We combine quality, speed and care so that you get the best result without
              unnecessary effort.
            </p>
          </div>
          <div className="advantages__row">
            <FeatureCard
              icon={deliveryIcon}
              title="Fast delivery"
              description="Receive your order quickly — guaranteed delivery across all regions of the Kingdom"
            />
            <FeatureCard
              icon={priceIcon}
              title="Compare prices"
              description="Get instant quotes from trusted suppliers and choose the best offer for your needs"
            />
            <FeatureCard
              icon={laptopIcon}
              title="Upload your list"
              description="Upload a photo or PDF of your materials list — we’ll find matching products for you"
            />
          </div>
        </div>
      </section>
      <section className="categories">
        <div className="categories__inner">
          <div className="categories__heading">
            <h2 className="categories__title">Main categories</h2>
            <p className="categories__supporting">
              Quickly find the materials you need. Choose a category and explore ready offers from
              trusted suppliers
            </p>
          </div>
          <div className="categories__row">
            <CategoryCard
              badgeText="1"
              title="Plumbing connections"
              description="Durable connectors for reliable water flow in any plumbing system"
              theme="blue"
            />
            <CategoryCard
              badgeText="2"
              title="UPVC fittings"
              description="Lightweight, corrosion-resistant fittings for modern piping solutions"
              theme="green"
            />
            <CategoryCard
              badgeText="3"
              title="PPR fittings"
              description="High-pressure, heat-resistant fittings built for long-term performance"
              theme="purple"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
