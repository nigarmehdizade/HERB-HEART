import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const basket = useSelector(state => state.basket);

  return (
    <nav className={styles.nav}>
      <Link to="/">Herb & Heart</Link>
      <div className={styles.links}>
   
        <Link to="/basket">Basket ({basket.reduce((sum, item) => sum + item.count, 0)})</Link>
      </div>
    </nav>
  );
};

export default Navbar;