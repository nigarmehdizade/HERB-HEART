import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Dried.module.scss';
import { useTranslation } from 'react-i18next';

const Dried = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const { t, i18n } = useTranslation();

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

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className={styles.driedPage}>
      {/* Banner */}
      <div className={styles.hero}>
      <h1 className={styles.title}>{t('dried.title')}</h1>

      </div>

      {/* Top bar */}
      <div className={styles.topBar}>
        <p>{fruits.length} {i18n.language === 'az' ? 'məhsul' : 'products'}</p>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">{i18n.language === 'az' ? 'Seçilmiş' : 'Featured'}</option>
          <option value="price-asc">{i18n.language === 'az' ? 'Əvvəlcə ucuz' : 'Price: Low to High'}</option>
          <option value="price-desc">{i18n.language === 'az' ? 'Əvvəlcə bahalı' : 'Price: High to Low'}</option>
          <option value="date-new">{i18n.language === 'az' ? 'Ən yenilər' : 'Newest'}</option>
          <option value="date-old">{i18n.language === 'az' ? 'Ən köhnələr' : 'Oldest'}</option>
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
              <span className={styles.quickView}>QUICK VIEW</span>
            </div>
            <h3>{fruit.title?.toUpperCase()}</h3>
            <div className={styles.reviews}>
              <span className={styles.stars}>★★★★★</span>
              {fruit.reviews?.length || 0} {i18n.language === 'az' ? 'rəy' : 'reviews'}
            </div>
            <div className={styles.price}>
              {i18n.language === 'az' ? '₼' : 'From'} ${fruit.price.toFixed(2)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dried;
