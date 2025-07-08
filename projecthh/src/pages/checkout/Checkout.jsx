import React, { useState } from 'react';
import styles from './Checkout.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [discount, setDiscount] = useState('');
  const handleDiscountChange = (e) => setDiscount(e.target.value);

  const { t } = useTranslation();

  const handleGooglePay = () => {
    alert(`${t('checkout.alert')} ${total.toFixed(2)} CAD ✅`);
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutHeader}>
        <img src="g" alt="Logo" className={styles.logo} />
        <p className={styles.express}>{t('checkout.express')}</p>
       <div className={styles.paymentOptions}>
  <h3 className={styles.express}>{t('checkout.express')}</h3>
  <div className={styles.paymentButtons}>
    <button className={styles.shopPay}>
      shop <span>Pay</span>
    </button>
    <button className={styles.gpay} onClick={handleGooglePay}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png"
        alt="Google Pay"
      />
      Pay
       
    </button>
  </div>
</div>

        <div className={styles.orLine}><span>{t('checkout.or')}</span></div>
      </div>

      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <h2>{t('checkout.delivery')}</h2>
          <form className={styles.form}>
            <input value="Azerbaijan" disabled />
            <div className={styles.row}>
              <input type="text" placeholder={t('checkout.firstName')} />
              <input type="text" placeholder={t('checkout.lastName')} />
            </div>
            <input type="text" placeholder={t('checkout.address')} />
            <input type="text" placeholder={t('checkout.apartment')} />
            <div className={styles.row}>
              <input type="text" placeholder={t('checkout.city')} />
              <input type="text" placeholder={t('checkout.province')} value="Bakı" />
              <input type="text" placeholder={t('checkout.postalCode')} />
            </div>
            <input type="text" placeholder={t('checkout.phone')} />
          </form>

          <div className={styles.shipping}>
            <h3>{t('checkout.shippingMethod')}</h3>
            <p>{t('checkout.enterShippingToView')}</p>
          </div>

          <h2>{t('checkout.payment')}</h2>
          <div className={styles.paymentBox}>
            <div className={styles.cardTabs}>
              <span className={styles.activeTab}>{t('checkout.creditCard')}</span>
              <div className={styles.cardIcons}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MC" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Discover_Card_logo.svg" alt="Discover" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Diners_Club_Logo3.svg" alt="DC" />
                <span>+1</span>
              </div>
            </div>

            <form className={styles.form}>
              <input type="text" placeholder={t('checkout.cardNumber')} />
              <div className={styles.row}>
                <input type="text" placeholder={t('checkout.expiration')} />
                <input type="text" placeholder={t('checkout.securityCode')} />
              </div>
              <input type="text" placeholder={t('checkout.nameOnCard')} />
              <label className={styles.checkbox}>
                <input type="checkbox" defaultChecked />
                <span>{t('checkout.useAsBilling')}</span>
              </label>
            </form>

            <h3>{t('checkout.rememberMe')}</h3>
            <label className={styles.checkbox}>
              <input type="checkbox" defaultChecked />
              <span>{t('checkout.saveInfo')}</span>
            </label>
            <input className={styles.phoneInput} type="text" placeholder={t('checkout.mobilePhone')} defaultValue="+994" />
          </div>

          <div className={styles.footerNotice}>
            <p>
              {t('checkout.saveInfoNotice')}{' '}
              <a href="#">{t('checkout.terms')}</a>{' '}
              {t('checkout.and')}{' '}
              <a href="#">{t('checkout.privacy')}</a>.
            </p>
            <div className={styles.links}>
              <a href="#">{t('checkout.refund')}</a>
              <a href="#">{t('checkout.shippingPolicy')}</a>
              <a href="#">{t('checkout.privacyPolicy')}</a>
              <a href="#">{t('checkout.termsOfService')}</a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>{t('checkout.cart')}</h2>
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
            <input type="text" placeholder={t('checkout.discountCode')} value={discount} onChange={handleDiscountChange} />
            <button>{t('checkout.apply')}</button>
          </div>

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>{t('checkout.subtotal')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>{t('checkout.shipping')}</span>
              <span>{t('checkout.enterShipping')}</span>
            </div>
            <div className={styles.totalRowBold}>
              <span>{t('checkout.total')}</span>
              <span>CAD ${total.toFixed(2)}</span>
            </div>
          </div>

          <button className={styles.payBtn}>{t('checkout.payNow')}</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
