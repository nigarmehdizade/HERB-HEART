import React, { useEffect, useState } from 'react';
import styles from './SeedsDetail.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import { useTranslation } from 'react-i18next';
import YouMayAlsoLike from '../snacks/YouMayAlsoLike'; 

const SeedsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [seed, setSeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedSeeds, setRelatedSeeds] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/seeds/${id}`)
      .then(res => {
        const staticSizes = ['150g', '8x150g'];
        setSeed({ ...res.data, sizes: staticSizes });
        setSelectedSize(staticSizes[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/seeds')
      .then(res => setRelatedSeeds(res.data.slice(0, 6)))
      .catch(err => console.error('Seeds alınmadı', err));
  }, [id]);

  if (loading) return <p>{t('seedsDetail.loading', 'Loading...')}</p>;
  if (!seed) return <p>{t('seedsDetail.notFound', 'Product not found.')}</p>;

  const totalPrice = (seed.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(t('seedsDetail.selectSizeAlert', 'Please select a size.'));
      return;
    }

    dispatch(addToCart({
      id: seed._id,
      name: seed.title,
      image: seed.image,
      price: seed.price,
      quantity,
      size: selectedSize
    }));

    openDrawer();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={seed.image} alt={seed.title} loading="lazy" />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>
            {t('seedsDetail.productTitle', { title: seed.title || seed.name || seed.productTitle })}
          </h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>{seed.reviews || 0} {t('seedsDetail.reviews', 'reviews')}</span>
          </div>

          <p className={styles.sku}>{t('seedsDetail.sku', 'SKU')}: {seed.code || 'N/A'}</p>
          <p className={styles.price}>${seed.price}</p>
          <p className={styles.shipping}>{t('seedsDetail.shippingNote', 'Shipping calculated at checkout')}</p>

          {remainingForFreeShipping > 0 && (
            <div className={styles.shippingNotice}>
              {t('seedsDetail.freeShipping', { amount: remainingForFreeShipping, defaultValue: 'Add ${{amount}} more for free shipping' })}
            </div>
          )}

          {seed.sizes?.length > 0 && (
            <>
              <label className={styles.sectionLabel}>{t('seedsDetail.size', 'Size')}</label>
              <div className={styles.sizeSelect}>
                {seed.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.active : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <label className={styles.sectionLabel}>{t('seedsDetail.quantity', 'Quantity')}</label>
          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t('seedsDetail.addToCart', 'Add to Cart')}
          </button>

          <button className={styles.shopPay}>
            {t('seedsDetail.buyWith', 'Buy with')} <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>{t('seedsDetail.morePayment', 'More payment options')}</a>

          <div className={styles.description}>
            <p><strong>{seed.title}</strong> {seed.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t('seedsDetail.certified', 'Certified')}: {seed.certifications}</span>
            <span>{seed.features}</span>
            <span>{t('seedsDetail.storage', 'Store in a cool dry place')}</span>
            <span>{t('seedsDetail.origin', 'Origin')}: {seed.origin}</span>
            <span>{t('seedsDetail.ingredients', 'Ingredients')}: {seed.ingredients}</span>
            <span>{t('seedsDetail.mayContain', 'May contain')}: {seed.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t('seedsDetail.share', 'Share')}</span>
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

      <YouMayAlsoLike apiEndpoint="seeds" detailRoute="seeds" />
    </>
  );
};

export default SeedsDetail;
