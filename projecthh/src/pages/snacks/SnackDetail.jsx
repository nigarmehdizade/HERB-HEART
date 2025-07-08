import React, { useEffect, useState } from 'react';
import styles from './SnackDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import SnackReview from '../snacks/SnackReview';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import YouMayAlsoLike from './YouMayAlsoLike';
import { useTranslation } from 'react-i18next';

const SnackDetail = () => {
  const { id } = useParams();
  const [snack, setSnack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [snacks, setSnacks] = useState([]);
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snacks/${id}`)
      .then(res => {
        const staticSizes = ['150g', '8x150g'];
        setSnack({ ...res.data, sizes: staticSizes });
        setSelectedSize(staticSizes[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/snacks')
      .then(res => setSnacks(res.data.slice(0, 6)))
      .catch(err => console.error('Snacks alınmadı', err));
  }, [id]);

  if (loading) return <p>{t('snack.loading', 'Loading...')}</p>;
  if (!snack) return <p>{t('snack.not_found', 'Product not found')}</p>;

  const totalPrice = (snack.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);

  const handleAddToCart = () => {
    if (snack.sizes?.length > 0 && !selectedSize) {
      alert(t('snack.select_size_alert', 'Please select a size'));
      return;
    }

    dispatch(addToCart({
      id: snack._id,
      name: snack.title,
      image: snack.image,
      price: snack.price,
      quantity,
      size: selectedSize || null,
    }));

    openDrawer();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={snack.image} alt={snack.title} loading="lazy" />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{snack.title}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>
              {snack.reviews || 0} {t('snack.reviews', 'reviews')}
            </span>
          </div>

          <p className={styles.sku}>{t('snack.sku', 'SKU')}: {snack.code || 'N/A'}</p>
          <p className={styles.price}>${snack.price}</p>
          <p className={styles.shipping}>{t('snack.shipping_info', 'Shipping calculated at checkout')}</p>

          {remainingForFreeShipping > 0 && (
            <div className={styles.freeShippingBar}>
              {t('snack.remaining_shipping', { amount: remainingForFreeShipping, defaultValue: 'Add ${{amount}} more for free shipping' })}
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${(totalPrice / freeShippingThreshold) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className={styles.selectorSection}>
            <label className={styles.label}>{t('snack.size', 'Size')}</label>
            <div className={styles.sizeOptions}>
              {snack.sizes?.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.selectorSection}>
            <label className={styles.label}>{t('snack.quantity', 'Quantity')}</label>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t('snack.add_to_cart', 'Add to Cart')}
          </button>

          <button className={styles.shopPay}>{t('snack.shop_pay', 'Buy with')} <strong>shop</strong><span>Pay</span></button>

          <a href="#" className={styles.moreOptions}>{t('snack.more_payment', 'More payment options')}</a>

          <div className={styles.description}>
            <p><strong>{snack.title}</strong> {snack.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t('snack.certified', 'Certified')}: {snack.certifications}</span>
            <span>{snack.features}</span>
            <span>{t('snack.storage', 'Store in a cool dry place')}</span>
            <span>{t('snack.origin', 'Origin')}: {snack.origin}</span>
            <span>{t('snack.ingredients', 'Ingredients')}: {snack.ingredients}</span>
            <span>{t('snack.may_contain', 'May contain')}: {snack.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t('snack.share', 'Share')}</span>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>

          <div className={styles.paymentIcons}>
            <SiMastercard />
            <FaCcVisa />
            <FaCcPaypal />
            <FaCcApplePay />
          </div>
        </div>
      </div>

      <div className={styles.reviewWrapper}>
        <SnackReview snackId={snack._id} />
      </div>

      <YouMayAlsoLike apiEndpoint="snacks" detailRoute="snackdetail" />
    </>
  );
};

export default SnackDetail;