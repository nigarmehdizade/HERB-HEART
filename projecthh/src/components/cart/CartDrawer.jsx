import React from 'react';
import styles from './CartDrawer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>CART</h2>
        <button onClick={closeDrawer}>×</button>
      </div>

      <div className={styles.body}>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map(item => (
            <div key={item.id + item.size} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div className={styles.details}>
                <p>{item.name}</p>
                <small>{item.size}</small>
                <div className={styles.controls}>
                  <button onClick={() => dispatch(decrementQuantity(item))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
                </div>
              </div>
              <div className={styles.price}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <div>
          <strong>Subtotal:</strong> ${subtotal}
        </div>
        <button className={styles.checkout} onClick={handleCheckout}>CHECK OUT</button>
      </div>
    </div>
  );
};

export default CartDrawer;
