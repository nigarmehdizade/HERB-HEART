import React, { useEffect, useState } from 'react';
import styles from './Matcha.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Matcha = () => {
  const [matchaItems, setMatchaItems] = useState([]);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/matcha?sort=${sort}`)
      .then(res => setMatchaItems(res.data))
      .catch(err => console.error("Matcha fetch error:", err));
  }, [sort]);

  return (
    <div className={styles.matchaPage}>
      {/* Banner */}
      <div className={styles.banner}>
        <img src="https://elanbio.ca/cdn/shop/collections/ELAN_SHOP_BY_CATEGORY_MATCHA_1728x.jpg?v=1617291961" alt="Matcha Banner" />
        <h1>MATCHA</h1>
      </div>

      {/* Top Filter Bar */}
      <div className={styles.topBar}>
        <p>{matchaItems.length} products</p>
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
        {matchaItems.map(item => (
          <div className={styles.card} key={item._id}>
            <div
              className={styles.imageWrapper}
              onMouseEnter={(e) => {
                if (item.hoverImage) {
                  e.currentTarget.querySelector('img').src = item.hoverImage;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').src = item.image;
              }}
            >
              <img src={item.image} alt={item.name} />
              <Link to={`/matcha/${item._id}`} className={styles.quickView}>Quick View</Link>
            </div>

            <h3>{item.name.toUpperCase()}</h3>

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.round(item.rating) ? '#000' : '#ccc'} />
              ))}
              <span>{item.reviews} reviews</span>
            </div>

            <p>from ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matcha;
