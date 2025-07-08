import React, { useEffect, useState } from 'react';
import styles from './NutsDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import NutReview from './NutReview';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import { useTranslation } from 'react-i18next';

const NutsDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [nut, setNut] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [nuts, setNuts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/nuts/${id}`)
      .then(res => {
              console.log("GƏLƏN NUT:", res.data);
        const staticSizes = ['150g', '8x150g'];
        setNut({
          ...res.data,
          sizes: staticSizes
        });
        setSelectedSize(staticSizes[0]);
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/nuts')
      .then(res => setNuts(res.data.slice(0, 6)))
      .catch(err => console.error('Nuts alınmadı', err));
  }, [id]);

  if (loading) return <p>{t('nutDetail.loading', 'Loading...')}</p>;
  if (!nut) return <p>{t('nutDetail.notFound', 'Product not found')}</p>;

  const totalPrice = (nut.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  const handleAddToCart = () => {
    if (nut.sizes?.length > 0 && !selectedSize) {
      alert(t('nutDetail.selectSizeAlert', 'Please select a size'));
      return;
    }

    dispatch(addToCart({
      id: nut._id,
      name: nut.title,
      image: nut.image,
      price: nut.price,
      quantity,
      size: selectedSize || null
    }));

    openDrawer();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={mainImage} alt={nut.title} loading="lazy" />
          <div className={styles.galleryRow}>
            {[nut.image, ...(nut.gallery || [])].map((img, i) => (
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
   <h1 className={styles.title}>{nut.name}</h1>





          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>
              {nut.reviews || 0} {t('nutDetail.reviews', 'reviews')}
            </span>
          </div>

          <p className={styles.sku}>{nut.code || 'N/A'}</p>
          <p className={styles.price}>${nut.price}</p>
          <p className={styles.shipping}>{t('nutDetail.shippingNote', 'Shipping calculated at checkout')}</p>

          <div className={styles.shippingNotice}>
            {t('nutDetail.freeShipping', { amount: remainingForFreeShipping })}
          </div>
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          {nut.sizes?.length > 0 && (
            <>
              <p className={styles.sectionLabel}>{t('nutDetail.size', 'Size')}</p>
              <div className={styles.sizeSelect}>
                {nut.sizes.map((size) => (
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

          <p className={styles.sectionLabel}>{t('nutDetail.quantity', 'Quantity')}</p>
          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t('nutDetail.addToCart', 'Add to Cart')}
          </button>

          <button className={styles.shopPay}>
            {t('nutDetail.buyWith', 'Buy with')} <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>
            {t('nutDetail.morePayment', 'More payment options')}
          </a>

          <div className={styles.description}>
            <p><strong>{nut.title}</strong> {nut.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t('nutDetail.certified', 'Certified')}: {nut.certifications}</span>
            <span>{nut.features}</span>
            <span>{t('nutDetail.storage', 'Store in a cool, dry place')}</span>
            <span>{t('nutDetail.origin', 'Origin')}: {nut.origin}</span>
            <span>{t('nutDetail.ingredients', 'Ingredients')}: {nut.ingredients}</span>
            <span>{t('nutDetail.allergy', 'May contain')}: {nut.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t('nutDetail.share', 'Share')}:</span>
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

      <NutReview nutId={nut._id} />

      <div className={styles.mayAlsoLikeWrapper}>
        <h2>{t('nutDetail.alsoLike', 'You may also like')}</h2>
        <div className={styles.grid}>
          {nuts.map(n => (
            <div className={styles.card} key={n._id}>
              <img src={n.image} alt={n.title} />
              <h3>{n.title}</h3>
              <div className={styles.reviews}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.star} />
                ))}
                <span>{n.reviews || 0} {t('nutDetail.reviews', 'reviews')}</span>
              </div>
              <p className={styles.price}>{t('nutDetail.from', 'from')} ${n.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NutsDetail;
