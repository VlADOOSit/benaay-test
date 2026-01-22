import { useEffect, useMemo, useRef, useState } from 'react';
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
  const measureRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(1);

  const repeatedLogos = useMemo(
    () =>
      Array.from({ length: repeatCount }, (_, setIndex) =>
        LOGOS.map((logo) => ({
          ...logo,
          key: `${setIndex}-${logo.id}`,
        })),
      ).flat(),
    [repeatCount],
  );

  useEffect(() => {
    const marquee = marqueeRef.current;
    const strip = stripRef.current;
    const measure = measureRef.current;

    if (!marquee || !strip || !measure) {
      return;
    }

    const speed = 30;

    const updateMarquee = () => {
      const setWidth = measure.offsetWidth;
      const marqueeWidth = marquee.offsetWidth;
      if (!setWidth || !marqueeWidth) {
        return;
      }

      const nextRepeatCount = Math.max(1, Math.ceil(marqueeWidth / setWidth));
      if (nextRepeatCount !== repeatCount) {
        setRepeatCount(nextRepeatCount);
      }

      const distance = setWidth * nextRepeatCount;
      marquee.style.setProperty('--marquee-distance', `${distance}px`);
      marquee.style.setProperty('--marquee-duration', `${distance / speed}s`);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateMarquee);
    };

    let rafId = requestAnimationFrame(updateMarquee);
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(marquee);
    resizeObserver.observe(measure);
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [i18n.language, repeatCount]);

  return (
    <div className="logos-marquee" aria-label={t('common.suppliers.marqueeLabel')} ref={marqueeRef}>
      <div className="logos-marquee__strip logos-marquee__measure" aria-hidden="true" ref={measureRef}>
        {LOGOS.map((logo) => (
          <div key={`measure-${logo.id}`} className="logos-marquee__item">
            <img src={logo.src} alt="" className="logos-marquee__icon" aria-hidden="true" />
            <span className="logos-marquee__label">{t('common.suppliers.logoLabel')}</span>
          </div>
        ))}
      </div>
      <div className="logos-marquee__track">
        <div className="logos-marquee__strip" ref={stripRef}>
          {repeatedLogos.map((logo) => (
            <div key={logo.key} className="logos-marquee__item">
              <img src={logo.src} alt="" className="logos-marquee__icon" aria-hidden="true" />
              <span className="logos-marquee__label">{t('common.suppliers.logoLabel')}</span>
            </div>
          ))}
        </div>
        <div className="logos-marquee__strip logos-marquee__strip--duplicate" aria-hidden="true">
          {repeatedLogos.map((logo) => (
            <div key={`dup-${logo.key}`} className="logos-marquee__item">
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
