import React, { useState, useEffect } from 'react';
import styles from './SnackReview.module.scss';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { MdVerified, MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const SnackReview = ({ snackId, currentUserEmail }) => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [snackId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/snack/${snackId}`);
      setReviews(res.data);
    } catch {
      console.error('Şərhlər yüklənmədi');
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleRating = index => {
    setFormData(prev => ({ ...prev, rating: index + 1 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post(`http://localhost:5000/api/comments/snack/${snackId}`, data);
      setFormData({ name: '', email: '', rating: 0, title: '', comment: '', image: null });
      setPreview(null);
      fetchReviews();
    } catch {
      alert(t('snackReview.submitError', 'Şərh göndərilə bilmədi.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Silinmə zamanı xəta:", err);
      alert(t('snackReview.deleteError', 'Silinmədi!'));
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h2>{t('snackReview.title', 'MÜŞTƏRİ RƏYLƏRİ')}</h2>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <input type="text" name="name" placeholder={t('snackReview.name', 'Adınız')} value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder={t('snackReview.email', 'Email adresiniz')} value={formData.email} onChange={handleChange} required />

        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => handleRating(i)}
              className={i < formData.rating ? styles.active : ''}
            />
          ))}
        </div>

        <input type="text" name="title" placeholder={t('snackReview.reviewTitle', 'Rəy başlığı')} value={formData.title} onChange={handleChange} required />
        <textarea name="comment" placeholder={t('snackReview.comment', 'Rəyinizi yazın...')} value={formData.comment} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="preview" className={styles.previewImage} />}

        <button type="submit" disabled={loading}>
          {loading ? t('snackReview.sending', 'Göndərilir...') : t('snackReview.submit', 'Rəyi göndər')}
        </button>
      </form>

      <div className={styles.commentList}>
        {reviews.map((r, i) => (
          <div key={i} className={styles.commentCard}>
            <div className={styles.avatar}>{r.name[0].toUpperCase()}</div>

            <div className={styles.commentContent}>
              <div className={styles.commentTop}>
                <div className={styles.stars}>
                  {[...Array(r.rating)].map((_, j) => (
                    <FaStar key={j} className={styles.active} />
                  ))}
                </div>
                <span className={styles.date}>{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>

              <div className={styles.userInfo}>
                <MdVerified className={styles.verifiedIcon} />
                <strong>{r.name}</strong>
              </div>

              <h4>{r.title}</h4>
              <p>{r.comment}</p>

              {r.image && (
                <img
                  src={`http://localhost:5000${r.image}`}
                  alt="comment"
                  className={styles.commentImage}
                />
              )}

              {currentUserEmail?.toLowerCase() === r.email?.toLowerCase() && (
                <div className={styles.deleteWrapper}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(r._id);
                    }}
                  >
                    <MdDelete /> {t('snackReview.delete', 'Sil')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnackReview;
