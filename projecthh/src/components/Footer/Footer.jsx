import React from 'react';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
import {
  FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaEnvelope,
  FaCcApplePay, FaCcDiscover, FaGooglePay, FaCcVisa
} from 'react-icons/fa';
import { SiAmazonpay } from "react-icons/si";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.logoColumn}>
          <img src="https://elanbio.ca/cdn/shop/files/ELAN_LOGO-01_x120@2x.png?v=1614307768" alt="Elan Logo" />
        </div>

        <div className={styles.linksColumn}>
          <ul>
            <li>{t('footer.about', 'About Us')}</li>
            <li>{t('footer.whereToBuy', 'Where to Buy?')}</li>
            <li>{t('footer.faq', 'FAQ')}</li>
            <li>{t('footer.return', 'Return Policy')}</li>
            <li>{t('footer.privacy', 'Privacy Policy')}</li>
            <li>{t('footer.shipping', 'Shipping Policy')}</li>
            <li>{t('footer.contact', 'Contact Us')}</li>
            <li>{t('footer.search', 'Search')}</li>
            <li>{t('footer.terms', 'Terms and Conditions')}</li>
            <li>{t('footer.refund', 'Refund policy')}</li>
            <li>{t('footer.social', 'Social Consciousness')}</li>
            <li>{t('footer.accessibility', 'Web Accessibility')}</li>
          </ul>
        </div>

        <div className={styles.signupColumn}>
          <h4>{t('footer.signup', 'SIGN UP AND SAVE')}</h4>
          <p>{t('footer.subscribe', 'Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.')}</p>
          <div className={styles.emailForm}>
            <input type="email" placeholder={t('footer.emailPlaceholder', 'Enter your email')} />
            <FaEnvelope className={styles.icon} />
          </div>
          <div className={styles.socialIcons}>
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
            <FaTiktok />
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.language}>English ▼</div>
        <div className={styles.payments}>
          <FaCcApplePay />
          <FaGooglePay />
          <FaCcDiscover />
          <SiAmazonpay />
          <FaCcVisa />
        </div>
        <div className={styles.copyright}>© 2025 Elan</div>
      </div>
    </footer>
  );
};

export default Footer;
