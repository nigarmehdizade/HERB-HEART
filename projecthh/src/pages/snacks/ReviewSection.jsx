import React, { useState, useEffect } from 'react';
import styles from './ReviewSection.module.scss';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: '',
  });

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews?productId=${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Rəylər yüklənmədi', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleRating = (val) => {
    setForm({ ...form, rating: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/reviews`, {
        ...form,
        productId,
        date: new Date().toISOString(),
      });
      fetchReviews(); // Refresh
      setForm({ name: '', email: '', rating: 0, title: '', comment: '' });
    } catch (err) {
      console.error('Göndərilmədi:', err);
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h2>Customer Reviews</h2>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your email"
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((val) => (
            <FaStar
              key={val}
              onClick={() => handleRating(val)}
              className={form.rating >= val ? styles.active : ''}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Review title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Write your review..."
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className={styles.reviewList}>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r, i) => (
          <div key={i} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <span className={styles.letter}>{r.name.charAt(0)}</span>
              <div>
                <strong>{r.name}</strong>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <FaStar key={n} className={r.rating >= n ? styles.active : ''} />
                  ))}
                </div>
              </div>
              <span className={styles.date}>{new Date(r.date).toLocaleDateString()}</span>
            </div>
            <h4>{r.title}</h4>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
