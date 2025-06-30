import React from 'react';
import styles from './NutsDetail.module.scss';
import { useParams } from 'react-router-dom';

const NutsDetail = () => {
  const { id } = useParams();

  
  const dummyNuts = {
    1: { name: 'Almond', description: 'Rich in Vitamin E', price: '9.99', image: 'https://example.com/almond.jpg' },
    2: { name: 'Cashew', description: 'Creamy and delicious', price: '12.49', image: 'https://example.com/cashew.jpg' },
  };

  const product = dummyNuts[id];

  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.detail}>
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default NutsDetail;
