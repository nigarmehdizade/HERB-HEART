import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/home">
<img src="https://i.pinimg.com/736x/80/01/82/800182770ca3b668f906634b02f89ef6.jpg" alt="" />

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
        <Link to="/profile"><FaUser /></Link>
        <Link to="/wishlist"><FaHeart /></Link>
        <button onClick={toggleSearch} className={styles.iconBtn}><FaSearch /></button>
        <Link to="/basket"><FaShoppingBag /></Link>
      </div>

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
