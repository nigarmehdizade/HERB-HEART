import React, { useEffect, useState } from 'react';
import styles from './SnackDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import SnackReview from '../snacks/SnackReview';

const SnackDetail = () => {
  const { id } = useParams();
  const [snack, setSnack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/snacks/${id}`)
      .then(res => {
        setSnack(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
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

  if (loading) return <p>Yüklənir...</p>;
  if (!snack) return <p>Məhsul tapılmadı</p>;

  const totalPrice = (snack.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);

  return (
    <>
      {/* ÜST BÖLMƏ — MƏHSUL DETALI */}
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
            <span className={styles.reviewCount}>{snack.reviews || 0} reviews</span>
          </div>

          <p className={styles.sku}>{snack.code || 'N/A'}</p>
          <p className={styles.price}>${snack.price}</p>
          <p className={styles.shipping}>Shipping calculated at checkout.</p>

          {remainingForFreeShipping > 0 && (
            <div className={styles.shippingNotice}>
              You're <span>${remainingForFreeShipping}</span> away from free shipping!
            </div>
          )}

          <div className={styles.sizeSelect}>
            {snack.sizes?.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? styles.active : ''}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className={styles.addToCart}>ADD TO CART</button>
          <button className={styles.shopPay}>Buy with <strong>shop</strong><span>Pay</span></button>

          <a href="#" className={styles.moreOptions}>More payment options</a>

          <div className={styles.description}>
            <p><strong>{snack.title}</strong> {snack.description}</p>
          </div>

          <div className={styles.meta}>
            <span>Certified: {snack.certifications}</span>
            <span>{snack.features}</span>
            <span>Keep cool and dry</span>
            <span>Country of origin: {snack.origin}</span>
            <span>Ingredients: {snack.ingredients}</span>
            <span>May contain: {snack.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 Share: </span>
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

      <div className={styles.mayAlsoLikeWrapper}>
        <h2>You may also like</h2>
       <div className={styles.grid}>
  {snacks.slice(0, 5).map(s => (
    <div className={styles.card} key={s._id}>
      <img src={s.image} alt={s.title} />
      <h3>{s.title}</h3>
      <div className={styles.reviews}>
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={styles.star} />
        ))}
        <span>{s.reviews || 0} reviews</span>
      </div>
      <p>from ${s.price}</p>
    </div>
  ))}
</div>

      </div>
    </>
  );
};

export default SnackDetail;
