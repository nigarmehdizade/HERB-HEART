import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Dried.module.scss';

const Dried = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/driedfruits?sort=${sort}`);
        setFruits(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Dried fruits not found:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [sort]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.driedPage}>
      {/* Banner */}
      <div className={styles.hero}>
        <h1>DRIED FRUITS</h1>
      </div>

      {/* Sort */}
      <div className={styles.topBar}>
        <p>{fruits.length} products</p>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Featured</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="date-new">Date, new to old</option>
          <option value="date-old">Date, old to new</option>
        </select>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {fruits.map(fruit => (
          <Link to={`/dried-detail/${fruit._id}`} key={fruit._id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={fruit.image} alt={fruit.title} />
              {fruit.hoverImage && (
                <img src={fruit.hoverImage} alt="hover" className={styles.hoverImg} />
              )}
            </div>
            <h3>{fruit.title}</h3>
            <div className={styles.reviews}>
              <span className={styles.stars}>★★★★★</span>
              {fruit.reviews?.length || 0} reviews
            </div>
            <div className={styles.price}>from ${fruit.price.toFixed(2)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dried;
