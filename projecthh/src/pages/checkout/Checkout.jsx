import React, { useState } from 'react';
import styles from './Checkout.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sanitizeInput } from '../../utils/sanitizeInput';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const { t } = useTranslation();

  const [discount, setDiscount] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    province: 'Bakı',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiration: '',
    cardCvv: '',
    cardName: '',
    mobilePhone: '+994',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleDiscountChange = (e) => setDiscount(sanitizeInput(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, address, postalCode, phone, cardNumber, cardExpiration, cardCvv, cardName } = formData;

    if (!firstName || !lastName || !address || !postalCode || !phone || !cardNumber || !cardExpiration || !cardCvv || !cardName) {
      alert("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    if (!formData.phone.match(/^\+994\d{9}$/)) {
      alert("Telefon nömrəsi düzgün deyil. Format: +994XXXXXXXXX");
      return;
    }

    if (!cardNumber.match(/^\d{12,19}$/)) {
      alert("Kart nömrəsi düzgün daxil edilməyib.");
      return;
    }

    if (!formData.cardExpiration.match(/^\d{2}\/\d{2}$/)) {
      alert("Tarix MM/YY formatında olmalıdır.");
      return;
    }

    if (!cardCvv.match(/^\d{3,4}$/)) {
      alert("CVV kodu düzgün deyil.");
      return;
    }

    alert("Ödəniş məlumatları qəbul edildi ✅");
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutHeader}>
        <img src="https://cdn.shopify.com/s/files/1/0504/7530/3081/files/ELAN_LOGO-01_x320.png?v=1614307768" alt="Logo" className={styles.logo} />
        <div className={styles.paymentOptions}>
          <h3 className={styles.express}>{t('express')}</h3>
          <div className={styles.paymentButtons}>
            <button className={styles.shopPay}>shop <span>Pay</span></button>
            <button className={styles.gpay}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" />
              Pay
            </button>
          </div>
        </div>
        <div className={styles.orLine}><span>{t('or')}</span></div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h2>{t('delivery')}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input value="Azerbaijan" disabled />
            <div className={styles.row}>
              <input type="text" name="firstName" placeholder={t('firstName')} onChange={handleChange} required />
              <input type="text" name="lastName" placeholder={t('lastName')} onChange={handleChange} required />
            </div>
            <input type="text" name="address" placeholder={t('address')} onChange={handleChange} required />
            <input type="text" name="apartment" placeholder={t('apartment')} onChange={handleChange} />
            <div className={styles.row}>
              <input type="text" name="city" placeholder={t('city')} onChange={handleChange} />
              <input type="text" name="province" value="Bakı" readOnly />
              <input type="text" name="postalCode" placeholder={t('postalCode')} onChange={handleChange} required />
            </div>
            <input type="text" name="phone" placeholder={t('phone')} onChange={handleChange} required />

            <h2>{t('payment')}</h2>
            <div className={styles.paymentBox}>
              <div className={styles.cardTabs}>
                <span className={styles.activeTab}>{t('creditCard')}</span>
                <div className={styles.cardIcons}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                  <img src="https://sumsub.com/wp/wp-content/uploads/2024/02/296x222-3.png" alt="MC" />
                  <img src="https://www.pymnts.com/wp-content/uploads/2014/03/Discover-logo-e1416429693676.jpg" alt="Discover" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFANCSqpqghoJ-qaiCNIsXsZ_BqWa9lxSaxQ&s" alt="DC" />
                  <span>+1</span>
                </div>
              </div>
              <div className={styles.paymentInputs}>
                <input type="text" name="cardNumber" placeholder={t('cardNumber')} onChange={handleChange} required />
                <input type="text" name="cardExpiration" placeholder={t('expiration')} onChange={handleChange} required />
                <input type="text" name="cardCvv" placeholder={t('securityCode')} onChange={handleChange} required />
                <input type="text" name="cardName" placeholder={t('nameOnCard')} onChange={handleChange} required />
              </div>
              <label className={styles.checkbox}>
                <input type="checkbox" defaultChecked />
                <span>{t('useAsBilling')}</span>
              </label>
              <h3>{t('rememberMe')}</h3>
              <label className={styles.checkbox}>
                <input type="checkbox" defaultChecked />
                <span>{t('saveInfo')}</span>
              </label>
              <input
                className={styles.phoneInput}
                type="text"
                name="mobilePhone"
                placeholder={t('mobilePhone')}
                value={formData.mobilePhone}
                onChange={handleChange}
              />
              <div className={styles.secureNote}>
                <p className={styles.secureText}>🔒 {t('secureEncrypted')}</p>
                <button className={styles.payNowBtn} type="submit">{t('payNow')}</button>
                <p className={styles.infoNote}>
                  {t('infoNote')} <a href="#">{t('terms')}</a> {t('and')} <a href="#">{t('privacy')}</a>.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.right}>
          <h2>{t('cart')}</h2>
          {cart.map((item, idx) => (
            <div key={idx} className={styles.cartItem}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>{item.quantity} x ${item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}

          <div className={styles.discount}>
            <input
              type="text"
              placeholder={t('discountCode')}
              value={discount}
              onChange={handleDiscountChange}
            />
            <button>{t('apply')}</button>
          </div>

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>{t('subtotal')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>{t('shipping')}</span>
              <span>{t('enterShipping')}</span>
            </div>
            <div className={styles.totalRowBold}>
              <span>{t('total')}</span>
              <span>CAD ${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footerLinks}>
        <a href="#">{t('refund')}</a>
        <a href="#">{t('shippingPolicy')}</a>
        <a href="#">{t('privacyPolicy')}</a>
        <a href="#">{t('termsOfService')}</a>
      </footer>
    </div>
  );
};

export default Checkout;
