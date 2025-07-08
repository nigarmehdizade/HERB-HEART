import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useDrawer } from '../../context/DrawerContext';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { openDrawer } = useDrawer();
  const cartItems = useSelector((state) => state.cart.items);

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
        <Link to="/category/snacks">{t('navbar.snacks', 'SNACKS')}</Link>
        <Link to="/category/nuts">{t('navbar.nuts', 'NUTS')}</Link>
        <Link to="/category/dried-fruits">{t('navbar.dried', 'DRIED FRUITS')}</Link>
        <Link to="/category/seeds">{t('navbar.seeds', 'SEEDS')}</Link>
        <Link to="/category/matcha">{t('navbar.matcha', 'MATCHA')}</Link>
        <Link to="/category/recipes">{t('navbar.recipes', 'RECIPES')}</Link>
        <Link to="#">{t('navbar.madeInCanada', 'MADE IN CANADA')}</Link>
      </div>

      <div className={styles.right}>
        <Link to="/dashboard"><FaUser /></Link>

         <ThemeToggle />
        <button onClick={toggleSearch} className={styles.iconBtn}><FaSearch /></button>

        <div className={styles.cartIcon} onClick={openDrawer}>
          <FaShoppingBag />
          {cartItems.length > 0 && (
            <span className={styles.cartDot}>{cartItems.length}</span>
          )}
        </div>
      </div>

      {showSearch && (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder={t('navbar.searchPlaceholder', 'Search...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
