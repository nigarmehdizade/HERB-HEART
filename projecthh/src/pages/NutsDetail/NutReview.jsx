import React, { useEffect, useState } from 'react';
import styles from './NutReview.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const NutReview = ({ nutId }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    comment: '',
    rating: 0,
    image: null,
  });

  const [hover, setHover] = useState(0);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/nutreviews/${nutId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Review fetch error:', err));
  }, [nutId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { ...form, nutId };
    const res = await axios.post('http://localhost:5000/api/nutreviews', review);
    setReviews([res.data, ...reviews]);
    setForm({ name: '', email: '', title: '', comment: '', rating: 0, image: null });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/nutreviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (err) {
      console.error("Silinmə zamanı xəta:", err);
    }
  };

  const average = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length || 0).toFixed(1);
  const breakdown = [5, 4, 3, 2, 1].map(star =>
    reviews.filter(r => r.rating === star).length
  );

  return (
    <div className={styles.reviewBox}>
      <h2>{t('review.customerReviews', 'Customer Reviews')}</h2>

      <div className={styles.stats}>
        <div>
          <strong>{average}</strong> / 5 {t('review.basedOn', { count: reviews.length })}
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < average ? styles.filled : styles.empty} />
            ))}
          </div>
        </div>

        <div className={styles.breakdown}>
          {breakdown.map((count, i) => {
            const percent = (count / reviews.length) * 100 || 0;
            return (
              <div key={i} className={styles.row}>
                <span>{5 - i}★</span>
                <div className={styles.bar}>
                  <div style={{ width: `${percent}%` }}></div>
                </div>
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder={t('review.name', 'Your Name')}
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={t('review.email', 'Your Email')}
          required
          value={form.email}
          onChange={handleChange}
        />
        <div className={styles.starInput}>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setForm({ ...form, rating: i + 1 })}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              className={(i < (hover || form.rating)) ? styles.filled : styles.empty}
            />
          ))}
        </div>
        <input
          type="text"
          name="title"
          placeholder={t('review.title', 'Review Title')}
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder={t('review.comment', 'Write your review...')}
          value={form.comment}
          onChange={handleChange}
        ></textarea>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{t('review.submit', 'Submit Review')}</button>
      </form>

      <div className={styles.reviewList}>
        {reviews.map((r, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.avatar}>{r.name?.charAt(0)}</div>
            <div className={styles.details}>
              <div className={styles.header}>
                <div className={styles.starLine}>
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className={j < r.rating ? styles.filled : styles.empty} />
                  ))}
                </div>
                <span>{new Date(r.date).toLocaleDateString()}</span>
              </div>
              <strong className={styles.verified}>
                ✔ {t('review.verified', 'Verified')} • {r.name}
              </strong>
              <h4>{r.title}</h4>
              <p>{r.comment}</p>
              {r.image && <img src={r.image} alt="uploaded" />}
              {userInfo?.email?.toLowerCase() === r.email?.toLowerCase() && (
                <button className={styles.deleteBtn} onClick={() => handleDelete(r._id)}>
                  {t('review.delete', 'Delete')}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutReview;
