import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/productSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.productPage}>
      <div className={styles.left}>
        <img src={product.image} alt={product.name} />
        <div className={styles.gallery}>
          {product.gallery.map((img, index) => (
            <img key={index} src={img} alt={`gallery-${index}`} />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <h1>{product.name}</h1>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.options}>
          {product.weightOptions.map((opt, index) => (
            <button key={index}>{opt}</button>
          ))}
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
        <p className={styles.desc}>{product.description}</p>
        <ul className={styles.ingredients}>
          {product.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
