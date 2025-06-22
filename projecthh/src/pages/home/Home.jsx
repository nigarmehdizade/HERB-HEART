// pages/home/Home.jsx
import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <Navbar />

      {/* Məhsullar */}
     
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.text}>
          <h1>FRESHNESS<br />AND<br />FLAVOR</h1>
          <p>Packed with the highest quality ingredients</p>
        </div>
        <div className={styles.image}>
          <img
            src="https://elanbio.ca/cdn/shop/files/ELAN_BIO_SLIDER_4_3024x.webp?v=1686149110"
            alt="healthy foods"
          />
        </div>
      </div>

      {/* Organic bölməsi */}
      <div className={styles.organicSection}>
        <h2>NATURALLY ORGANIC</h2>
        <p>
          Our exclusive organic products are carefully chosen to offer you a selection that is rich in flavour,
          texture, and freshness. Every one of our products is certified organic, gluten-free, and GMO free.
        </p>
      </div>
       <h2>OUR PRODUCTS</h2>
      {loading && <p>Yüklənir...</p>}
      {error && <p>Xəta baş verdi: {error}</p>}
      
      <div className={styles.productGrid}>
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default Home;
