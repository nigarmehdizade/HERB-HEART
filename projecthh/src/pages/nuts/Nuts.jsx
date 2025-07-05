import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Nuts.module.scss';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Nuts = () => {
  const [nuts, setNuts] = useState([]);
  const [sort, setSort] = useState('featured');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/nuts?sort=${sort}`)
      .then(res => setNuts(res.data))
      .catch(() => setError('Failed to fetch nuts'));
  }, [sort]);

  return (
    <div className={styles.nutsPage}>
      {/* Banner */}
      <div className={styles.hero}>
        <img src="https://elanbio.ca/cdn/shop/collections/AdobeStock_256156726_1512x.jpg?v=1617293926" alt="Nuts Banner" />
        <h1>NUTS</h1>
      </div>

      {/* Filter */}
      <div className={styles.productsSection}>
        <div className={styles.topBar}>
          <p>{nuts.length} products</p>
          <div className={styles.filter}>
            <label htmlFor="sort">Sort:</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.productGrid}>
          {error && <p>{error}</p>}
       {nuts.map((nut) => (
  <div key={nut._id} className={styles.card}>
    <div className={styles.imageWrapper}>
      <img
        src={nut.image}
        alt={nut.name}
        onMouseOver={(e) => nut.hoverImage && (e.currentTarget.src = nut.hoverImage)}
        onMouseOut={(e) => (e.currentTarget.src = nut.image)}
      />
      <Link to={`/nuts/${nut._id}`}>
        <div className={styles.quickView}>QUICK VIEW</div>
      </Link>
    </div>
    <h3>{nut.name.toUpperCase()}</h3>
    <div className={styles.reviews}>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={styles.star} />
      ))}
      <span>{nut.reviews || 0} reviews</span>
    </div>
    <p>from ${nut.price.toFixed(2)}</p>
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Nuts;
