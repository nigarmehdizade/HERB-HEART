import React, { useEffect, useState } from 'react';
import styles from './DriedDetail.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

// Redux və Drawer
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';

const DriedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();

  const [fruit, setFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [driedList, setDriedList] = useState([]);

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

    axios.get('http://localhost:5000/api/driedfruits')
      .then(res => setDriedList(res.data.slice(0, 5)))
      .catch(err => console.error('Dried alınmadı', err));
  }, [id]);

  if (loading) return <p>Yüklənir...</p>;
  if (!fruit) return <p>Məhsul tapılmadı</p>;

  const totalPrice = (fruit.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  const handleAddToCart = () => {
    if (fruit.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size.");
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
        {/* LEFT IMAGE */}
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

        {/* RIGHT INFO */}
        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{fruit.title}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>{fruit.reviews?.length || 0} reviews</span>
          </div>

          <p className={styles.sku}>SKU: {fruit.code || 'N/A'}</p>
          <p className={styles.price}>${fruit.price}</p>
          <p className={styles.shipping}>Shipping calculated at checkout.</p>

          {remainingForFreeShipping > 0 && (
            <>
              <div className={styles.shippingNotice}>
                You're <span>${remainingForFreeShipping}</span> away from free shipping!
              </div>
              <div className={styles.progressWrapper}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
              </div>
            </>
          )}

          {/* SIZE + QUANTITY ROW */}
          <div className={styles.rowOptions}>
            {fruit.sizes?.length > 0 && (
              <div className={styles.sizeBlock}>
                <p className={styles.sectionLabel}>Size</p>
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
              <p className={styles.sectionLabel}>Quantity</p>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className={styles.shopPay} onClick={handleCheckout}>
            Buy with <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>More payment options</a>

          <div className={styles.description}>
            <p><strong>{fruit.title}</strong> {fruit.description}</p>
          </div>

          <div className={styles.meta}>
            <span>Certified: {fruit.certifications}</span>
            <span>{fruit.features}</span>
            <span>Keep cool and dry</span>
            <span>Country of origin: {fruit.origin}</span>
            <span>Ingredients: {fruit.ingredients}</span>
            <span>May contain: {fruit.allergyInfo}</span>
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

      {/* YOU MAY ALSO LIKE */}
      <div className={styles.mayAlsoLikeWrapper}>
        <h2>YOU MAY ALSO LIKE</h2>
        <div className={styles.grid}>
          {driedList.map(d => (
            <div className={styles.card} key={d._id}>
              <img src={d.image} alt={d.title} />
              <h3>{d.title}</h3>
              <div className={styles.reviews}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.star} />
                ))}
                <span>{d.reviews?.length || 0} reviews</span>
              </div>
              <p className={styles.price}>from ${d.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DriedDetail;
