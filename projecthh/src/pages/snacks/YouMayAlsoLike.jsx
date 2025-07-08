import React, { useEffect, useState } from 'react';
import styles from './YouMayAlsoLike.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const YouMayAlsoLike = ({ apiEndpoint = 'snacks', detailRoute = 'snackdetail' }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${apiEndpoint}`);
        setProducts(res.data.slice(0, 6));
      } catch (err) {
        console.error('Data fetch error:', err);
      }
    };
    fetchData();
  }, [apiEndpoint]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('youMayAlsoLike.title', 'You may also like')}</h2>
      <div className={styles.grid}>
        {products.map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() => navigate(`/${detailRoute}/${item._id}`)}
          >
            <img src={item.image} alt={item.name || item.title} />
            <h3>{item.name || item.title}</h3>
            <div className={styles.reviews}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={styles.star} />
              ))}
              <span>{item.reviews?.length || 0} {t('youMayAlsoLike.reviews', 'reviews')}</span>
            </div>
            <p>{t('youMayAlsoLike.from', 'from')} ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
