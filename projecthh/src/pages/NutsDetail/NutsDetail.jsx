import React, { useEffect, useState } from 'react';
import styles from './NutsDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import NutReview from './NutReview'; 
const NutsDetail = () => {
  const { id } = useParams();
  const [nut, setNut] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [nuts, setNuts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/nuts/${id}`)
      .then(res => {
        setNut(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
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

  if (loading) return <p>Yüklənir...</p>;
  if (!nut) return <p>Məhsul tapılmadı</p>;

  const totalPrice = (nut.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <>
      <div className={styles.container}>
        {/* LEFT IMAGE */}
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

        {/* RIGHT INFO */}
        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{nut.title}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>{nut.reviews || 0} reviews</span>
          </div>

          <p className={styles.sku}>{nut.code || 'N/A'}</p>
          <p className={styles.price}>${nut.price}</p>
          <p className={styles.shipping}>Shipping calculated at checkout.</p>

          <div className={styles.shippingNotice}>
            You're <span>${remainingForFreeShipping}</span> away from free shipping!
          </div>
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          {nut.sizes?.length > 0 && (
            <>
              <p className={styles.sectionLabel}>Size</p>
              <div className={styles.sizeSelect}>
                {nut.sizes.map((size) => (
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
            <p><strong>{nut.title}</strong> {nut.description}</p>
          </div>

          <div className={styles.meta}>
            <span>Certified: {nut.certifications}</span>
            <span>{nut.features}</span>
            <span>Keep cool and dry</span>
            <span>Country of origin: {nut.origin}</span>
            <span>Ingredients: {nut.ingredients}</span>
            <span>May contain: {nut.allergyInfo}</span>
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
<>
<NutReview nutId={nut._id} />
</>
      
     <div className={styles.mayAlsoLikeWrapper}>
  <h2>YOU MAY ALSO LIKE</h2>
  <div className={styles.grid}>
    {nuts.slice(0, 5).map(n => (
      <div className={styles.card} key={n._id}>
        <img src={n.image} alt={n.title} />
        <h3>{n.title}</h3>
        <div className={styles.reviews}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={styles.star} />
          ))}
          <span>{n.reviews || 0} reviews</span>
        </div>
        <p className={styles.price}>from ${n.price}</p>
      </div>
    ))}
  </div>
</div>

    </>
  );
};

export default NutsDetail;
