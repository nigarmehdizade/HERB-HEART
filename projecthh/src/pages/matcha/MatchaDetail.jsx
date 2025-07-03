import React, { useEffect, useState } from 'react';
import styles from './MatchaDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import { useSelector } from 'react-redux';

const MatchaDetail = () => {
  const { id } = useParams();
  const [matcha, setMatcha] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [matchaList, setMatchaList] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/matcha/${id}`)
      .then(res => {
        setMatcha(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });

  axios.get('http://localhost:5000/api/products')
    .then(res => setMatchaList(res.data.slice(0, 5)))
    .catch(err => console.error('Products alınmadı', err));
}, []);


  if (loading) return <p>Yüklənir...</p>;
  if (!matcha) return <p>Məhsul tapılmadı</p>;

  const totalPrice = (matcha.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={mainImage} alt={matcha.title} loading="lazy" />
          <div className={styles.galleryRow}>
            {[matcha.image, ...(matcha.gallery || [])].map((img, i) => (
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
          <h1 className={styles.title}>{matcha.title}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>{matcha.reviews || 0} reviews</span>
          </div>

          <p className={styles.sku}>{matcha.code || 'N/A'}</p>
          <p className={styles.price}>${matcha.price}</p>
          <p className={styles.shipping}>Shipping calculated at checkout.</p>

          <div className={styles.shippingNotice}>
            You're <span>${remainingForFreeShipping}</span> away from free shipping!
          </div>
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          {matcha.sizes?.length > 0 && (
            <>
              <p className={styles.sectionLabel}>Size</p>
              <div className={styles.sizeSelect}>
                {matcha.sizes.map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? styles.active : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <p className={styles.sectionLabel}>Quantity</p>
          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className={styles.addToCart}>Add to Cart</button>
          <button className={styles.shopPay}>
            Buy with <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>More payment options</a>

          <div className={styles.description}>
            <p><strong>{matcha.title}</strong> {matcha.description}</p>
          </div>

          <div className={styles.meta}>
            <span>Certified: {matcha.certifications}</span>
            <span>{matcha.features}</span>
            <span>Keep cool and dry</span>
            <span>Country of origin: {matcha.origin}</span>
            <span>Ingredients: {matcha.ingredients}</span>
            <span>May contain: {matcha.allergyInfo}</span>
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

    <div className={styles.mayAlsoLikeWrapper}>
  <h2>YOU MAY ALSO LIKE</h2>
  <div className={styles.grid}>
    {matchaList.map((item) => (
      <div className={styles.card} key={item._id}>
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <div className={styles.reviews}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={styles.star} />
          ))}
          <span>{item.reviews || 0} reviews</span>
        </div>
        <p className={styles.price}>from ${item.price}</p>
      </div>
    ))}
  </div>
</div>

    </>
  );
};

export default MatchaDetail;
