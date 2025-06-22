
import React from 'react';
import styles from './ProductCard.module.scss';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../redux/basketSlice';
import { addToWishlist } from '../../redux/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ₼</p>
      <div className={styles.buttons}>
        <button onClick={() => dispatch(addToBasket(product))}>Səbətə əlavə et</button>
        <button onClick={() => dispatch(addToWishlist(product))}>❤️</button>
      </div>
    </div>
  );
};

export default ProductCard;
