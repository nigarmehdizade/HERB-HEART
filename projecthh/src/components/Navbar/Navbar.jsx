import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useDrawer } from '../../context/DrawerContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { openDrawer } = useDrawer(); // 🟢 CartDrawer-u açmaq üçün
  const cartItems = useSelector((state) => state.cart.items); // 🛒 Səbətdə neçə məhsul var

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/home">
          <img
            src="https://elanbio.ca/cdn/shop/files/ELAN_LOGO-01_60x@2x.png?v=1614307768"
            alt="Logo"
          />
        </Link>
      </div>

      <div className={styles.center}>
        <Link to="/category/snacks">SNACKS</Link>
        <Link to="/category/nuts">NUTS</Link>
        <Link to="/category/dried-fruits">DRIED FRUITS</Link>
        <Link to="/category/seeds">SEEDS</Link>
        <Link to="/category/matcha">MATCHA</Link>
        <Link to="/category/recipes">RECIPES</Link>
        <Link to="#">MADE IN CANADA</Link>
      </div>

      <div className={styles.right}>
        <Link to="/dashboard"><FaUser /></Link>
        <Link to="/wishlist"><FaHeart /></Link>
        <button onClick={toggleSearch} className={styles.iconBtn}><FaSearch /></button>

        {/* 🟢 Cart Icon — Drawer açır */}
        <div className={styles.cartIcon} onClick={openDrawer}>
          <FaShoppingBag />
          {cartItems.length > 0 && <span className={styles.cartDot}>{cartItems.length}</span>}
        </div>
      </div>

      {/* 🔍 Axtarış qutusu */}
      {showSearch && (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
