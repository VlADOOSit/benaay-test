import Header from '../../components/Header/Header.jsx';
import LogosMarquee from '../../components/LogosMarquee/LogosMarquee.jsx';
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
    </main>
  );
}

export default HomePage;
