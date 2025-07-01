// src/pages/dried/Dried.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dried.module.scss';

const Dried = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dried')
      .then(res => {
        setFruits(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Dried fruits not found:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.driedPage}>
      <h1>Dried Fruits</h1>
      <div className={styles.grid}>
        {fruits.map(fruit => (
          <div key={fruit._id} className={styles.card}>
            <img src={fruit.image} alt={fruit.name} />
            <h3>{fruit.name}</h3>
            <p>{fruit.price} AZN</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dried;
