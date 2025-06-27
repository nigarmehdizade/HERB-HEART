import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product._id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.defaultImg}
          />
          <img
            src={product.hoverImage}
            alt="hover"
            className={styles.hoverImg}
          />
        </div>
        <h3>{product.name}</h3>
        <p>from ${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
