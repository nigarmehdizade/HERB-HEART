import React from 'react';
import styles from './TopBanner.module.scss';
import { useTranslation } from 'react-i18next';

const TopBanner = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('i18nextLng', selectedLang);
  };

  return (
    <div className={styles.topBannerWrapper}>
      <div className={styles.top}>
        <p>{t('free_shipping_message')}</p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.social}>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-tiktok"></i>
        </div>

        <div className={styles.right}>
          <div className={styles.region}>
            <span>{t('region')}:</span>
            <img src="https://flagcdn.com/w40/ca.png" alt="Canada" />
          </div>

          <div className={styles.languageSelect}>
            <img
              src={i18n.language === 'az'
                ? 'https://flagcdn.com/w40/az.png'
                : 'https://flagcdn.com/w40/us.png'}
              alt="lang"
            />
            <select value={i18n.language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="az">Azərbaycanca</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
