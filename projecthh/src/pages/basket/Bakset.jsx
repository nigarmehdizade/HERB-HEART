import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount, removeFromBasket, clearBasket } from '../../redux/basketSlice';
import styles from './Basket.module.scss';

const Basket = () => {
  const { items } = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className={styles.basket}>
      <h2>🛒 Səbətim</h2>
      {items.length === 0 ? (
        <p>Səbət boşdur</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item._id} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Qiymət: {item.price} ₼</p>
                <p>Miqdar: {item.count}</p>
                <div>
                  <button onClick={() => dispatch(decrementCount(item._id))}>-</button>
                  <button onClick={() => dispatch(incrementCount(item._id))}>+</button>
                  <button onClick={() => dispatch(removeFromBasket(item._id))}>Sil</button>
                </div>
              </div>
            </div>
          ))}
          <h3>Ümumi məbləğ: {total.toFixed(2)} ₼</h3>
          <button onClick={() => dispatch(clearBasket())}>Səbəti təmizlə</button>
        </>
      )}
    </div>
  );
};

export default Basket;
