import React, { useEffect, useState } from 'react';
import styles from './Matcha.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const Matcha = () => {
  const [matchaItems, setMatchaItems] = useState([]);
  const [sort, setSort] = useState('featured');
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/matcha?sort=${sort}`)
      .then(res => setMatchaItems(res.data))
      .catch(err => console.error("Matcha fetch error:", err));
  }, [sort]);

  return (
    <div className={styles.matchaPage}>
      {/* Banner */}
      <div className={styles.banner}>
        <img
          src="https://elanbio.ca/cdn/shop/collections/ELAN_SHOP_BY_CATEGORY_MATCHA_1728x.jpg?v=1617291961"
          alt="Matcha Banner"
        />
        <h1>{i18n.language === 'az' ? t('matcha.title') : 'MATCHA'}</h1>
      </div>

      {/* Top Filter Bar */}
      <div className={styles.topBar}>
        <p>{matchaItems.length} {i18n.language === 'az' ? t('matcha.products') : 'products'}</p>
        <div>
          <label htmlFor="sort">{i18n.language === 'az' ? t('matcha.sortBy') : 'Sort By:'} </label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">{i18n.language === 'az' ? t('matcha.featured') : 'Featured'}</option>
            <option value="priceAsc">{i18n.language === 'az' ? t('matcha.priceLow') : 'Price: Low to High'}</option>
            <option value="priceDesc">{i18n.language === 'az' ? t('matcha.priceHigh') : 'Price: High to Low'}</option>
            <option value="rating">{i18n.language === 'az' ? t('matcha.rating') : 'Rating'}</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.grid}>
        {matchaItems.map((item) => (
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
              <Link to={`/matcha/${item._id}`} className={styles.quickView}>
                {i18n.language === 'az' ? t('matcha.quickView') : 'Quick View'}
              </Link>
            </div>

            <h3>{item.name.toUpperCase()}</h3>

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.round(item.rating) ? '#000' : '#ccc'} />
              ))}
              <span>
                {item.reviews || 0} {i18n.language === 'az' ? t('matcha.reviews') : 'reviews'}
              </span>
            </div>

            <p>
              {i18n.language === 'az' ? t('matcha.from') : 'from'} ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matcha;
