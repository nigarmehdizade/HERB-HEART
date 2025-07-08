import React, { useEffect, useState } from 'react';
import styles from './SnackDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import SnackReview from '../snacks/SnackReview';

// Redux və Drawer
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import YouMayAlsoLike from './YouMayAlsoLike';

// i18n
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
        setSnack({
          ...res.data,
          sizes: staticSizes
        });
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

  if (loading) return <p>{t('snack.loading')}</p>;
  if (!snack) return <p>{t('snack.not_found')}</p>;

  const totalPrice = (snack.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);

  const handleAddToCart = () => {
    if (snack.sizes?.length > 0 && !selectedSize) {
      alert(t('snack.select_size_alert'));
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
              {snack.reviews || 0} {t('snack.reviews')}
            </span>
          </div>

          <p className={styles.sku}>{snack.code || 'N/A'}</p>
          <p className={styles.price}>${snack.price}</p>
          <p className={styles.shipping}>{t('snack.shipping_info')}</p>

          {remainingForFreeShipping > 0 && (
            <div className={styles.freeShippingBar}>
              {t('snack.remaining_shipping', { amount: remainingForFreeShipping })}
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${(totalPrice / freeShippingThreshold) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* ÖLÇÜ */}
          <div className={styles.selectorSection}>
            <label className={styles.label}>{t('snack.size')}</label>
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

          {/* MİQDARI */}
          <div className={styles.selectorSection}>
            <label className={styles.label}>{t('snack.quantity')}</label>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t('snack.add_to_cart')}
          </button>

          <button className={styles.shopPay}>{t('snack.shop_pay')}</button>
          <a href="#" className={styles.moreOptions}>{t('snack.more_payment')}</a>

          <div className={styles.description}>
            <p><strong>{snack.title}</strong> {snack.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t('snack.certified')}: {snack.certifications}</span>
            <span>{snack.features}</span>
            <span>{t('snack.storage')}</span>
            <span>{t('snack.origin')}: {snack.origin}</span>
            <span>{t('snack.ingredients')}: {snack.ingredients}</span>
            <span>{t('snack.may_contain')}: {snack.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t('snack.share')}</span>
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
