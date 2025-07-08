import React, { useEffect, useState } from 'react';
import styles from './MatchaDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import { useTranslation } from 'react-i18next';

const MatchaDetail = () => {
  const { id } = useParams();
  const [matcha, setMatcha] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [matchaList, setMatchaList] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();
  const { t } = useTranslation();

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
  }, [id]);

  if (loading) return <p>{t("matcha.loading")}</p>;
  if (!matcha) return <p>{t("matcha.notFound")}</p>;

  const handleAddToCart = () => {
    if (!selectedSize) return alert(t("matcha.selectSizeAlert"));

    dispatch(addToCart({
      id: matcha._id,
      name: matcha.title,
      image: matcha.image,
      price: matcha.price,
      size: selectedSize,
      quantity
    }));

    openDrawer();
  };

  const totalPrice = (matcha.price * quantity).toFixed(2);
  const freeShippingThreshold = 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice).toFixed(2);
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <>
      <div className={styles.container}>
        {/* Image and gallery */}
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

        {/* Info section */}
        <div className={styles.infoWrapper}>
       <h1 className={styles.title}>{matcha.name}</h1>

          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.reviewCount}>
              {matcha.reviews || 0} {t("matcha.reviews")}
            </span>
          </div>

          <p className={styles.sku}>{t("matcha.sku")}: {matcha.code || 'N/A'}</p>
          <p className={styles.price}>${matcha.price}</p>
          <p className={styles.shipping}>{t("matcha.shippingNote")}</p>

          <div className={styles.shippingNotice}>
            {t("matcha.freeShipping", { amount: remainingForFreeShipping })}
          </div>
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          {matcha.sizes?.length > 0 && (
            <>
              <p className={styles.sectionLabel}>{t("matcha.size")}</p>
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

          <p className={styles.sectionLabel}>{t("matcha.quantity")}</p>
          <div className={styles.quantityControl}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className={styles.addToCart} onClick={handleAddToCart}>
            {t("matcha.addToCart")}
          </button>

          <button className={styles.shopPay}>
            {t("matcha.buyWith")} <strong>shop</strong><span>Pay</span>
          </button>

          <a href="#" className={styles.moreOptions}>{t("matcha.morePayment")}</a>

          <div className={styles.description}>
            <p><strong>{matcha.title}</strong> {matcha.description}</p>
          </div>

          <div className={styles.meta}>
            <span>{t("matcha.certified")}: {matcha.certifications}</span>
            <span>{matcha.features}</span>
            <span>{t("matcha.storage")}</span>
            <span>{t("matcha.origin")}: {matcha.origin}</span>
            <span>{t("matcha.ingredients")}: {matcha.ingredients}</span>
            <span>{t("matcha.mayContain")}: {matcha.allergyInfo}</span>
          </div>

          <div className={styles.share}>
            <span>🔗 {t("matcha.share")}</span>
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

      {/* Related products */}
      <div className={styles.mayAlsoLikeWrapper}>
        <h2>{t("matcha.youMayAlsoLike")}</h2>
        <div className={styles.grid}>
          {matchaList.map((item) => (
            <div className={styles.card} key={item._id}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <div className={styles.reviews}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.star} />
                ))}
                <span>{item.reviews || 0} {t("matcha.reviews")}</span>
              </div>
              <p className={styles.price}>{t("matcha.from")} ${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchaDetail;
