import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />

        <div className={styles.quickView}>
          <Link to={`/product/${product._id}`}>Quick view</Link>
        </div>
      </div>

      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>from ${product.price}</p>
    </div>
  );
};

export default ProductCard;
