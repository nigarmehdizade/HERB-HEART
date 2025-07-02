import React, { useEffect, useState } from 'react';
import styles from './DriedFruitReview.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const DriedFruitReview = ({ fruitId }) => {
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

  useEffect(() => {
    axios.get(`http://localhost:5000/api/fruitreviews/${fruitId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Review fetch error:', err));
  }, [fruitId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      if (files[0]) reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      ...form,
      fruitId, // burda fruitId POST olunur
    };

    try {
      const res = await axios.post('http://localhost:5000/api/fruitreviews', review);
      setReviews([...reviews, res.data]);
      setForm({
        name: '',
        email: '',
        title: '',
        comment: '',
        rating: 0,
        image: null,
      });
    } catch (err) {
      console.error('Review POST error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fruitreviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (err) {
      console.error('Review delete error:', err);
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <input
          type="text"
          name="name"
          placeholder="Ad"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Başlıq"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="comment"
          placeholder="Rəyinizi yazın..."
          value={form.comment}
          onChange={handleChange}
          required
        />
        <div className={styles.starRating}>
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setForm(prev => ({ ...prev, rating: ratingValue }))}
                />
                <FaStar
                  className={styles.star}
                  color={ratingValue <= (hover || form.rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <button type="submit">Rəyi göndər</button>
      </form>

      <div className={styles.reviewsList}>
        <h3>Rəylər</h3>
        {reviews.length === 0 ? <p>Hələ rəy yoxdur</p> : (
          reviews.map(r => (
            <div key={r._id} className={styles.reviewCard}>
              <div className={styles.header}>
                <strong>{r.name}</strong> — <span>{r.title}</span>
              </div>
              <div className={styles.rating}>
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} color="#ffc107" />
                ))}
              </div>
              <p>{r.comment}</p>
              {r.image && <img src={r.image} alt="review" className={styles.reviewImg} />}
              <button onClick={() => handleDelete(r._id)}>Sil</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DriedFruitReview;
