import React from 'react';
import styles from './Footer.module.scss';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { FaCcApplePay } from "react-icons/fa6";
import { FaCcDiscover } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { SiAmazonpay } from "react-icons/si";
import { FaCcVisa } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.logoColumn}>
          <img src="https://elanbio.ca/cdn/shop/files/ELAN_LOGO-01_x120@2x.png?v=1614307768" alt="Elan Logo" />
        </div>

        <div className={styles.linksColumn}>
          <ul>
            <li>About Us</li>
            <li>Where to Buy?</li>
            <li>FAQ</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Contact Us</li>
            <li>Search</li>
            <li>Terms and Conditions</li>
            <li>Refund policy</li>
            <li>Social Consciousness</li>
            <li>Web Accessibility</li>
          </ul>
        </div>

        <div className={styles.signupColumn}>
          <h4>SIGN UP AND SAVE</h4>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className={styles.emailForm}>
            <input type="email" placeholder="Enter your email" />
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
