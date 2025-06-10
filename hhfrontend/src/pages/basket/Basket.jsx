import { useSelector, useDispatch } from 'react-redux';
import { decreaseCount, increaseCount, removeFromBasket } from '../../redux/basket/basketSlice';

const Basket = () => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '1rem' }}>
      {basket.map(item => (
        <div key={item._id}>
          <h4>{item.name}</h4>
          <p>{item.price} AZN</p>
          <button onClick={() => dispatch(decreaseCount(item._id))}>-</button>
          <span> {item.count} </span>
          <button onClick={() => dispatch(increaseCount(item._id))}>+</button>
          <button onClick={() => dispatch(removeFromBasket(item._id))}>Sil</button>
        </div>
      ))}
    </div>
  );
};

export default Basket;
