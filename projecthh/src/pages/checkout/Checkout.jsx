import React, { useState } from 'react';
import styles from './Checkout.module.scss';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [discount, setDiscount] = useState('');
  const handleDiscountChange = (e) => setDiscount(e.target.value);

  const handleGooglePay = () => {
    alert(`Google Pay ilə ${total.toFixed(2)} CAD ödənildi ✅`);
  };

  return (
    <div className={styles.checkoutPage}>
      {/* TOP HEADER */}
      <div className={styles.checkoutHeader}>
        <img src="/logo.svg" alt="Logo" className={styles.logo} />
        <p className={styles.express}>Express checkout</p>
        <div className={styles.paymentOptions}>
          <button className={styles.shopPay}>shop <span>Pay</span></button>
          <button className={styles.gpay} onClick={handleGooglePay}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="G Pay"
            />
            Pay
          </button>
        </div>
        <div className={styles.orLine}><span>OR</span></div>
      </div>

      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <h2>Delivery</h2>
          <form className={styles.form}>
            <input value="Azerbaijan" disabled />
            <div className={styles.row}>
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
            </div>
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" />
            <div className={styles.row}>
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Province" value="Bakı" />
              <input type="text" placeholder="Postal code" />
            </div>
            <input type="text" placeholder="Phone (optional)" />
          </form>

          <div className={styles.shipping}>
            <h3>Shipping method</h3>
            <p>Enter your shipping address to view available shipping methods.</p>
          </div>

          <h2>Payment</h2>
          <div className={styles.paymentBox}>
            <div className={styles.cardTabs}>
              <span className={styles.activeTab}>Credit card</span>
              <div className={styles.cardIcons}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MC" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Discover_Card_logo.svg" alt="Discover" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Diners_Club_Logo3.svg" alt="DC" />
                <span>+1</span>
              </div>
            </div>

            <form className={styles.form}>
              <input type="text" placeholder="Card number" />
              <div className={styles.row}>
                <input type="text" placeholder="Expiration date (MM / YY)" />
                <input type="text" placeholder="Security code" />
              </div>
              <input type="text" placeholder="Name on card" />
              <label className={styles.checkbox}>
                <input type="checkbox" defaultChecked />
                <span>Use shipping address as billing address</span>
              </label>
            </form>

            <h3>Remember me</h3>
            <label className={styles.checkbox}>
              <input type="checkbox" defaultChecked />
              <span>Save my information for a faster checkout with a Shop account</span>
            </label>
            <input className={styles.phoneInput} type="text" placeholder="Mobile phone number" defaultValue="+1" />
          </div>

          {/* FOOTER LINKS */}
          <div className={styles.footerNotice}>
            <p>
              Your info will be saved to a Shop account. By continuing, you agree to Shop’s
              <a href="#"> Terms of Service </a> and acknowledge the
              <a href="#"> Privacy Policy</a>.
            </p>
            <div className={styles.links}>
              <a href="#">Refund policy</a>
              <a href="#">Shipping policy</a>
              <a href="#">Privacy policy</a>
              <a href="#">Terms of service</a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Cart</h2>
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
              placeholder="Discount code"
              value={discount}
              onChange={handleDiscountChange}
            />
            <button>Apply</button>
          </div>

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>Enter shipping address</span>
            </div>
            <div className={styles.totalRowBold}>
              <span>Total</span>
              <span>CAD ${total.toFixed(2)}</span>
            </div>
          </div>

          <button className={styles.payBtn}>Pay now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
