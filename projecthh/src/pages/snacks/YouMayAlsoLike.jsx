import React, { useEffect, useState } from 'react';
import styles from './YouMayAlsoLike.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const YouMayAlsoLike = () => {
  const [snacks, setSnacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/snacks');
        setSnacks(res.data.slice(0, 6));
      } catch (err) {
        console.error('Snacks yüklənmədi');
      }
    };
    fetchSnacks();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>YOU MAY ALSO LIKE</h2>
      <div className={styles.grid}>
        {snacks.map((snack) => (
          <div key={snack._id} className={styles.card} onClick={() => navigate(`/snackdetail/${snack._id}`)}>
            <img src={snack.image} alt={snack.name} />
            <h3>{snack.name}</h3>
            <div className={styles.reviews}>
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <span>{snack.reviews?.length || 0} reviews</span>
            </div>
            <p>from ${snack.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
