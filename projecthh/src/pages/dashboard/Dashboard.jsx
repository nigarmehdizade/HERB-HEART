import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import { FaUser, FaShoppingCart, FaBox, FaChartBar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUsers, logout } from '../../redux/userSlice';

const Dashboard = () => {
  const [selected, setSelected] = useState('users');
  const [searchUser, setSearchUser] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '' });

  const { userInfo, userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!userInfo || !userInfo.user?.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = userInfo?.token;
        const res = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    };
    fetchProducts();
  }, [userInfo]);

  // ➕ Məhsul əlavə et
  const handleAddProduct = async () => {
    const { name, stock, price } = newProduct;
    if (name && stock && price) {
      try {
        const token = userInfo?.token;
        const res = await axios.post('http://localhost:5000/api/products', newProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts([...products, res.data]);
        setNewProduct({ name: '', stock: '', price: '' });
      } catch (err) {
        console.error('Add product error:', err);
      }
    }
  };

  // 🚪 Çıxış
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // 🔍 Filtrlənmiş istifadəçilər
  const filteredUsers = userList?.filter((u) =>
    u.name?.toLowerCase().includes(searchUser.toLowerCase())
  ) || [];

  const totalStock = products.reduce((acc, p) => acc + Number(p.stock), 0);

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h1>Elan</h1>
        <div
          className={`${styles.navLink} ${selected === 'users' ? styles.active : ''}`}
          onClick={() => setSelected('users')}
        >
          <FaUser /> İstifadəçilər
        </div>
        <div
          className={`${styles.navLink} ${selected === 'orders' ? styles.active : ''}`}
          onClick={() => setSelected('orders')}
        >
          <FaShoppingCart /> Sifarişlər
        </div>
        <div
          className={`${styles.navLink} ${selected === 'products' ? styles.active : ''}`}
          onClick={() => setSelected('products')}
        >
          <FaBox /> Məhsullar
        </div>
        <div
          className={`${styles.navLink} ${selected === 'stock' ? styles.active : ''}`}
          onClick={() => setSelected('stock')}
        >
          <FaChartBar /> Stok & Analytics
        </div>

        <div className={styles.navLink} onClick={handleLogout}>
          🚪 Çıxış
        </div>
      </aside>

      <main className={styles.mainContent}>
        {selected === 'users' && (
          <div className={styles.tableSection}>
            <h2>İstifadəçilər</h2>
            <input
              type="text"
              placeholder="Axtar..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.cardList}>
              {filteredUsers.map((user, i) => (
                <div key={i} className={styles.userCard}>
                  <div className={styles.avatar}>{user.name?.charAt(0)}</div>
                  <div className={styles.info}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.email}>{user.email}</p>
                  </div>
                  <span className={styles.roleBadge}>{user.role || 'user'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected === 'products' && (
          <div className={styles.tableSection}>
            <h2>Bütün Məhsullar</h2>
            <table>
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Stok</th>
                  <th>Qiymət</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.stock}</td>
                    <td>{p.price} ₼</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.addProductBox}>
              <input
                type="text"
                placeholder="Məhsul adı"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stok"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
              <input
                type="number"
                placeholder="Qiymət (₼)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <button className={styles.addBtn} onClick={handleAddProduct}>
                + Əlavə et
              </button>
            </div>
          </div>
        )}

        {selected === 'stock' && (
          <div className={styles.tableSection}>
            <h2>Stok və Statistikalar</h2>
            <div className={styles.statsBox}>
              <p>Ümumi Məhsul Sayı: <strong>{products.length}</strong></p>
              <p>Ümumi Stok Miqdarı: <strong>{totalStock}</strong></p>
            </div>
            <div className={styles.stockTable}>
              <table>
                <thead>
                  <tr>
                    <th>Məhsul</th>
                    <th>Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selected === 'orders' && (
          <div className={styles.tableSection}>
            <h2>Sifarişlər</h2>
            <p>Hazırda sifariş məlumatı əlavə olunmayıb.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
