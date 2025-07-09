import styles from './CartDrawer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../redux/cartSlice';
import { useDrawer } from '../../context/DrawerContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2>{t('cart.title')}</h2>
        <button onClick={closeDrawer}>×</button>
      </div>

      <div className={styles.body}>
        {items.length === 0 ? (
          <p>{t('cart.empty')}</p>
        ) : (
          items.map(item => (
            <div key={item.id + item.size} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div className={styles.details}>
                <p>{item.name}</p>
                <small>{t('cart.size')}: {item.size}</small>
                <div className={styles.controls}>
                  <button onClick={() => dispatch(decrementQuantity(item))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
                  <button
                    className={styles.remove}
                    onClick={() => dispatch(removeFromCart(item))}
                    title={t('cart.remove')}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className={styles.price}>${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className={styles.footer}>
          <div>
            <strong>{t('cart.subtotal')}:</strong> ${subtotal}
          </div>
          <button className={styles.checkout} onClick={handleCheckout}>
            {typeof t('cart.checkout') === 'string' ? t('cart.checkout') : t('cart.checkout.label')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
