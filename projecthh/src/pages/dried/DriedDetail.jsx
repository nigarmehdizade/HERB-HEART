import React, { useEffect, useState } from 'react';
import styles from './DriedDetail.module.scss';
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

const DriedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation();

  const [fruit, setFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/driedfruits/${id}`)
      .then(res => {
        setFruit(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>{t('dried.loading')}</p>;
  if (!fruit) return <p>{t('dried.notFound')}</p>;

  const totalPrice = (fruit.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  const handleAddToCart = () => {
    if (fruit.sizes?.length > 0 && !selectedSize) {
      alert(t('dried.selectSizeAlert'));
      return;
    }

    dispatch(addToCart({
      id: fruit._id,
      name: fruit.title,
      image: fruit.image,
      price: fruit.price,
      quantity,
      size: selectedSize || null,
    }));

    openDrawer();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={mainImage} alt={fruit.title} />
          <div className={styles.galleryRow}>
            {[fruit.image, ...(fruit.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`gallery-${i}`}
                className={styles.thumbnail}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{fruit.title}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>
              {fruit.reviews?.length || 0} {t('dried.reviews')}
            </span>
          </div>

          <p className={styles.sku}>{t('dried.sku')}: {fruit.code || 'N/A'}</p>
          <p className={styles.price}>${fruit.price}</p>
          <p className={styles.shipping}>{t('dried.shippingNote')}</p>

          {remainingForFreeShipping > 0 && (
            <>
              <div className={styles.shippingNotice}>
                {t('dried.freeShipping', { amount: remainingForFreeShipping })}
              </div>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>
            </>
          )}

          <div className={styles.rowOptions}>
            {fruit.sizes?.length > 0 && (
              <div className={styles.sizeBlock}>
                <p className={styles.sectionLabel}>{t('dried.size')}</p>
                <div className={styles.sizeSelect}>
                  {fruit.sizes.map((size) => (
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
            )}

            <div className={styles.quantityBlock}>
              <p className={styles.sectionLabel}>{t('dried.quantity')}</p>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t('dried.addToCart')}
          </button>

          <button className={styles.shopPay} onClick={handleCheckout}>
            {t('dried.buyWith')} <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>{t('dried.morePayment')}</a>

          <div className={styles.description}>
            <p><strong>{fruit.title}</strong> {fruit.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t('dried.certified')}: {fruit.certifications}</span>
            <span>{fruit.features}</span>
            <span>{t('dried.storage')}</span>
            <span>{t('dried.origin')}: {fruit.origin}</span>
            <span>{t('dried.ingredients')}: {fruit.ingredients}</span>
            <span>{t('dried.mayContain')}: {fruit.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t('dried.share')}</span>
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

     
      <YouMayAlsoLike apiEndpoint="driedfruits" detailRoute="dried-detail" />
    </>
  );
};

export default DriedDetail;
