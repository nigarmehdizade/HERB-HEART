import React, { useEffect, useState } from 'react';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { SiMastercard } from "react-icons/si";
import { FaCcVisa, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

// Redux və Drawer
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { openDrawer } = useDrawer();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('225g');

  const descriptions = {
    "1": "are dried, plump, whole fruits without added sugar. They are soft, sticky, naturally sweet and a source of fiber. Ideal for snacking, baking, or smoothies.",
    "2": "are crunchy, protein-rich nuts perfect for snacking or baking.",
    "3": "are sun-dried and rich in antioxidants. Great as a snack or addition to dishes.",
    "4": "are delicious, chewy treats with natural sweetness, ideal for desserts or healthy snacking.",
    "5": "are nutrient-packed snacks loaded with healthy fats and fiber. Great for energy boost.",
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Xəta:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      selectedSize,
      quantity
    }));
    openDrawer();
  };

  if (loading) return <p>Yüklənir...</p>;
  if (!product) return <p>Məhsul tapılmadı</p>;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>
          <span className={styles.reviewCount}>24 reviews</span>
        </div>

        <p className={styles.sku}>SKU: 08045</p>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.shipping}>Shipping calculated at checkout.</p>

        <div className={styles.shippingNotice}>
          You're <span>$35.00</span> away from free shipping!
        </div>

        {/* ✅ SIZE seçimi */}
        <div className={styles.sizeSelect}>
          <button
            className={selectedSize === '225g' ? styles.active : ''}
            onClick={() => setSelectedSize('225g')}
          >
            225g
          </button>
          <button
            className={selectedSize === '8x225g' ? styles.active : ''}
            onClick={() => setSelectedSize('8x225g')}
          >
            8x225g
          </button>
        </div>

        {/* ✅ Quantity seçimi */}
        <div className={styles.quantityControl}>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        {/* ✅ Cart düymələri */}
        <button className={styles.addToCart} onClick={handleAddToCart}>
          ADD TO CART
        </button>

        <button className={styles.shopPay}>
          Buy with <strong>shop</strong><span>Pay</span>
        </button>

        <a href="#" className={styles.moreOptions}>More payment options</a>

        {/* Məhsul haqqında təsvir */}
        <div className={styles.description}>
          <p><strong>{product.name}</strong> {descriptions[product.id] || "Delicious and healthy product, perfect for your daily needs."}</p>
        </div>

        <div className={styles.meta}>
          <span>Certified: organic, gluten-free and Kosher</span>
          <span>Non-GMO, vegan, all-natural</span>
          <span>Keep cool and dry</span>
          <span>Country of origin: United States</span>
          <span>Ingredients: Organic pitted prunes</span>
          <span>May contain: Peanuts, Tree nuts, pits or pit fragments</span>
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
  );
};

export default ProductDetail;
