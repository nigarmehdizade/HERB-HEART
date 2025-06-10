import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { addToBasket } from '../../redux/basket/basketSlice';
import { fetchProducts } from '../../redux/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {loading ? 'Yüklənir...' : items.map(product => (
        <div key={product._id} className={styles.card}>
          <h3>{product.name}</h3>
          <p>{product.price} AZN</p>
          <button onClick={() => dispatch(addToBasket(product))}>Səbətə əlavə et</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
