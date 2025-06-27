import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/wishlistSlice';
import { addToBasket } from '../../redux/basketSlice';
import styles from './Wishlist.module.scss';

const Wishlist = () => {
  const { items } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className={styles.wishlist}>
      <h2>💖 Arzular Siyahısı</h2>
      {items.length === 0 ? (
        <p>Siyahı boşdur</p>
      ) : (
        items.map(item => (
          <div key={item._id} className={styles.item}>
            <img src={item.image} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>Qiymət: {item.price} ₼</p>
              <button onClick={() => dispatch(addToBasket(item))}>Səbətə at</button>
              <button onClick={() => dispatch(removeFromWishlist(item._id))}>Sil</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
