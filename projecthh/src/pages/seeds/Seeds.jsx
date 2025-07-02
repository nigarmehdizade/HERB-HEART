// src/pages/seeds/Seeds.jsx
import React, { useEffect, useState } from 'react';
import styles from './Seeds.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Seeds = () => {
  const [seeds, setSeeds] = useState([]);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/seeds?sort=${sort}`)
      .then(res => setSeeds(res.data))
      .catch(err => console.error("Seed fetch error:", err));
  }, [sort]);

  return (
    <div className={styles.seedsPage}>
      {/* Banner */}
      <div className={styles.banner}>
        <img src="https://elanbio.ca/cdn/shop/collections/ELAN_SHOP_BY_CATEGORY_SEEDS_GRAINS_1728x.jpg?v=1620737104" alt="Seeds Banner" />
        <h1>SEEDS</h1>
      </div>

      {/* Top Filter Bar */}
      <div className={styles.topBar}>
        <p>{seeds.length} products</p>
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.grid}>
        {seeds.map(seed => (
          <Link to={`/seeds/${seed._id}`} className={styles.card} key={seed._id}>
            <div
              className={styles.imageWrapper}
              onMouseEnter={(e) => {
                if (seed.hoverImage) {
                  e.currentTarget.querySelector('img').src = seed.hoverImage;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').src = seed.image;
              }}
            >
              <img src={seed.image} alt={seed.name} />
            </div>

            <h3>{seed.name.toUpperCase()}</h3>

            <div className={styles.rating}>
              {Array(5).fill().map((_, i) => (
                <FaStar key={i} color={i < Math.round(seed.rating) ? '#000' : '#ccc'} />
              ))}
              <span>{seed.reviews} reviews</span>
            </div>

            <p>from ${seed.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Seeds;
