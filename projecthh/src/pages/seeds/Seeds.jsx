import React, { useEffect, useState } from 'react';
import styles from './Seeds.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Seeds = () => {
  const [seeds, setSeeds] = useState([]);
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const getSortParam = (sort) => {
    const sortMap = {
      featured: 'featured',
      priceAsc: 'priceAsc',
      priceDesc: 'priceDesc',
      rating: 'rating'
    };
    return sortMap[sort] || 'featured';
  };

  useEffect(() => {
    const fetchSeeds = async () => {
      setLoading(true);
      setError(null);
      try {
        const sortParam = getSortParam(sort);
        const res = await axios.get(`http://localhost:5000/api/seeds?sort=${sortParam}`);
        setSeeds(res.data);
      } catch (err) {
        console.error('Seeds fetch error:', err);
        setError(t('seeds.loadError', 'Products could not be loaded.'));
      } finally {
        setLoading(false);
      }
    };

    fetchSeeds();
  }, [sort, t]);

  return (
    <div className={styles.seedsPage}>
      <div className={styles.banner}>
        <img
          src="https://elanbio.ca/cdn/shop/collections/ELAN_SHOP_BY_CATEGORY_SEEDS_GRAINS_1728x.jpg?v=1620737104"
          alt="Seeds Banner"
        />
        <h1>{t('seeds.bannerTitle', 'SEEDS')}</h1>
      </div>

      <div className={styles.topBar}>
        <p>{loading ? t('seeds.loading', 'Loading...') : `${seeds.length} ${t('seeds.products', 'products')}`}</p>
        <div>
          <label htmlFor="sort">{t('seeds.sortBy', 'Sort By:')}</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">{t('seeds.featured', 'Featured')}</option>
            <option value="priceAsc">{t('seeds.priceLow', 'Price: Low to High')}</option>
            <option value="priceDesc">{t('seeds.priceHigh', 'Price: High to Low')}</option>
            <option value="rating">{t('seeds.rating', 'Rating')}</option>
          </select>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {!loading && seeds.map(seed => (
          <div className={styles.card} key={seed._id}>
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
              <Link to={`/seeds/${seed._id}`} className={styles.quickView}>
                {t('seeds.quickView', 'Quick View')}
              </Link>
            </div>

            <h3>{seed.name}</h3>

            <div className={styles.rating}>
              {Array(5).fill().map((_, i) => (
                <FaStar key={i} color={i < Math.round(seed.rating) ? '#000' : '#ccc'} />
              ))}
              <span>{seed.reviews} {t('seeds.reviews', 'reviews')}</span>
            </div>

            <p>{t('seeds.from', 'from')} ${seed.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className={styles.description}>
        <p>
          {t('seeds.description',
            `Elan’s wholesome seeds and grains are a great source of plant-based nutrients.
            Our natural and organic line-up includes chia, flax, hemp, and pumpkin seeds –
            full of fiber, protein, and essential minerals to boost your diet. Carefully
            selected and minimally processed, these ingredients support healthy living
            and add crunch and flavor to your meals.`)}
        </p>
      </div>
    </div>
  );
};

export default Seeds;