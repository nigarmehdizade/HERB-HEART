import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Snack.module.scss';

const Snack = () => {
  const [snacks, setSnacks] = useState([]);
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getSortParam = (sort) => {
    const sortMap = {
      featured: 'featured',
      lowToHigh: 'priceAsc',
      highToLow: 'priceDesc',
    };
    return sortMap[sort] || 'featured';
  };

  useEffect(() => {
    const fetchSnacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const sortParam = getSortParam(sort);
        const res = await axios.get(`http://localhost:5000/api/snacks?sort=${sortParam}`);
        setSnacks(res.data);
      } catch (err) {
        console.error('Məhsullar alınmadı:', err);
        setError('Məhsullar yüklənmədi.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnacks();
  }, [sort]);

  return (
    <div className={styles.snackPage}>
      <div className={styles.hero}>
        <img
          src="https://elanbio.ca/cdn/shop/collections/Artboard_1_1512x.jpg?v=1617222764"
          alt="snack banner"
        />
        <h1>SPECIALTY SNACKS</h1>
      </div>

      <div className={styles.productsSection}>
        <div className={styles.topBar}>
          <p>{loading ? 'Loading...' : `${snacks.length} products`}</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.snackGrid}>
          {!loading &&
            snacks.map((snack) => (
              <div
                key={snack._id}
                className={styles.card}
                onClick={() => navigate(`/snack/${snack._id}`)} // 👈 yönləndirmə
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.imageWrapper}>
                  <img src={snack.image} alt={snack.title} className={styles.mainImage} />
                  <img src={snack.hoverImage} alt={snack.title} className={styles.hoverImage} />
                </div>
                <h3>{snack.title}</h3>
                <p className={styles.reviews}>★★★★★ {snack.reviews || 0} reviews</p>
                <p className={styles.price}>from ${snack.price}</p>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.description}>
        <p>
          Meet Elan’s collection of tasty nutritious snack mixes that offer unique flavours and energy to fuel your busiest days.
          Elan’s creative line of mixed snacks offer a variety of delicious, natural food blends. We are committed to expanding
          our wholesome product range and to provide the delicious, healthy snacks that people crave. Our tasty mixed snacks include
          a wide range of natural, organic, vegan and gluten free ingredients that make a positive impact on the body and tickle your taste buds.
          They include functional foods that are nutrient-rich like dried fruits, nuts, seeds, spices, and superfoods.
        </p>
      </div>
    </div>
  );
};

export default Snack;
