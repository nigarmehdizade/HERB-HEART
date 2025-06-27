// pages/productDetail/ProductDetail.jsx

import React, { useEffect } from 'react';
import styles from './ProductDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../redux/productSlice';
import { addToBasket } from '../../redux/basketSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) return <p>Yüklənir...</p>;

  return (
    <div className={styles.detail}>
      <img src={selectedProduct.image} alt={selectedProduct.name} />
      <div className={styles.info}>
        <h2>{selectedProduct.name}</h2>
        <p>{selectedProduct.description}</p>
        <p>Qiymət: {selectedProduct.price} ₼</p>
        <button onClick={() => dispatch(addToBasket(selectedProduct))}>Səbətə əlavə et</button>
      </div>
    </div>
  );
};

export default ProductDetail;
