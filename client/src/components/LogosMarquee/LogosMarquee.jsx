import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './LogosMarquee.css';

const LOGOS = [
  { id: 1, src: new URL('../../assets/logo/logo1.svg', import.meta.url).href, label: 'Logo' },
  { id: 2, src: new URL('../../assets/logo/logo2.svg', import.meta.url).href, label: 'Logo' },
  { id: 3, src: new URL('../../assets/logo/logo3.svg', import.meta.url).href, label: 'Logo' },
  { id: 4, src: new URL('../../assets/logo/logo4.svg', import.meta.url).href, label: 'Logo' },
  { id: 5, src: new URL('../../assets/logo/logo5.svg', import.meta.url).href, label: 'Logo' },
  { id: 6, src: new URL('../../assets/logo/logo6.svg', import.meta.url).href, label: 'Logo' },
  { id: 7, src: new URL('../../assets/logo/logo7.svg', import.meta.url).href, label: 'Logo' },
];

function LogosMarquee() {
  const { t, i18n } = useTranslation();
  const marqueeRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const strip = stripRef.current;

    if (!marquee || !strip) {
      return;
    }

    const speed = 30;

    const updateMarquee = () => {
      const distance = strip.offsetWidth;
      if (!distance) {
        return;
      }

      marquee.style.setProperty('--marquee-distance', `${distance}px`);
      marquee.style.setProperty('--marquee-duration', `${distance / speed}s`);
    };

    updateMarquee();
    const rafId = requestAnimationFrame(updateMarquee);
    window.addEventListener('resize', updateMarquee);

    return () => {
      window.removeEventListener('resize', updateMarquee);
      cancelAnimationFrame(rafId);
    };
  }, [i18n.language]);

  return (
    <div className="logos-marquee" aria-label={t('common.suppliers.marqueeLabel')} ref={marqueeRef}>
      <div className="logos-marquee__track">
        <div className="logos-marquee__strip" ref={stripRef}>
          {LOGOS.map((logo) => (
            <div key={logo.id} className="logos-marquee__item">
              <img src={logo.src} alt="" className="logos-marquee__icon" aria-hidden="true" />
              <span className="logos-marquee__label">{t('common.suppliers.logoLabel')}</span>
            </div>
          ))}
        </div>
        <div className="logos-marquee__strip logos-marquee__strip--duplicate" aria-hidden="true">
          {LOGOS.map((logo) => (
            <div key={`dup-${logo.id}`} className="logos-marquee__item">
              <img src={logo.src} alt="" className="logos-marquee__icon" aria-hidden="true" />
              <span className="logos-marquee__label">{t('common.suppliers.logoLabel')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogosMarquee;
