import React, { useEffect, useState } from 'react';
import styles from './Nuts.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Nuts = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNuts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/nuts'); // URL backendində necədirsə ora uyğun dəyiş
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch nuts');
      } finally {
        setLoading(false);
      }
    };

    fetchNuts();
  }, []);

  return (
    <div className={styles.container}>

      <section className={styles.banner}>
        <img src="" alt="Nuts Banner" className={styles.bannerImg} />
        <h1 className={styles.title}>NUTS</h1>
      </section>

      <div className={styles.topBar}>
        <p>{products.length} products</p>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="bestselling">Best selling</option>
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          <option value="lowhigh">Price, low to high</option>
          <option value="highlow">Price, high to low</option>
          <option value="oldnew">Date, old to new</option>
          <option value="newold">Date, new to old</option>
        </select>
      </div>

      {loading ? (
        <p className={styles.status}>Loading...</p>
      ) : error ? (
        <p className={styles.status}>{error}</p>
      ) : (
        <div className={styles.grid}>
          {products.map((item) => (
            <div
              key={item._id}
              className={styles.card}
              onClick={() => navigate(`/nuts/${item._id}`)}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <div className={styles.rating}>
                {'★'.repeat(Math.floor(item.rating || 0))}
                {'☆'.repeat(5 - Math.floor(item.rating || 0))}
                <span> {item.reviews?.length || 0} reviews</span>
              </div>
              <p>from ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nuts;
