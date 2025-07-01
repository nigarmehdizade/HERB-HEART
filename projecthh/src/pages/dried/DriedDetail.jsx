import React, { useEffect, useState } from 'react';
import styles from './DriedDetail.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DriedDetail = () => {
  const { id } = useParams();
  const [fruit, setFruit] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/driedfruits/${id}`)
      .then(res => {
        setFruit(res.data);
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('Məhsul tapılmadı:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yüklənir...</p>;
  if (!fruit) return <p>Məhsul tapılmadı</p>;

  return (
    <div className={styles.detailPage}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={mainImage} alt={fruit.title} className={styles.mainImage} />
          <div className={styles.gallery}>
            {[fruit.image, ...(fruit.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`gallery-${i}`}
                onClick={() => setMainImage(img)}
                className={`${styles.thumbnail} ${mainImage === img ? styles.active : ''}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1>{fruit.title}</h1>
          <p className={styles.price}>${fruit.price}</p>
          <p className={styles.desc}>{fruit.description}</p>
          <ul className={styles.meta}>
            <li><strong>Origin:</strong> {fruit.origin}</li>
            <li><strong>Ingredients:</strong> {fruit.ingredients}</li>
            <li><strong>Features:</strong> {fruit.features}</li>
            <li><strong>Allergy Info:</strong> {fruit.allergyInfo}</li>
            <li><strong>Certifications:</strong> {fruit.certifications}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DriedDetail;
