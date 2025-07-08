import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './detailpage.module.scss';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/comments/recipe/${id}`)
      .then(res => setComments(res.data || []))
      .catch(err => {
        console.error(err);
        setComments([]);
      });
  }, [id]);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/comments/recipe/${id}`, {
        name: comment.name,
        email: comment.email,
        comment: comment.message,
      });

      setComment({ name: '', email: '', message: '' });
      alert(t('detailPage.commentSent'));

      const updated = await axios.get(`http://localhost:5000/api/comments/recipe/${id}`);
      setComments(updated.data || []);
    } catch (error) {
      console.error(error);
      alert(t('detailPage.commentError'));
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      const updated = await axios.get(`http://localhost:5000/api/comments/recipe/${id}`);
      setComments(updated.data || []);
    } catch (err) {
      console.error("Silinmə zamanı xəta:", err);
    }
  };

  if (!recipe) return <div className={styles.loading}>{t('detailPage.loading')}</div>;

  return (
    <div className={styles.detailWrapper}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <p>{recipe.description}</p>

      <h3>{t('detailPage.ingredients')}</h3>
      <ul>
        {recipe.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>{t('detailPage.method')}</h3>
      <ol>
        <li>{t('detailPage.step1')}</li>
        <li>{t('detailPage.step2')}</li>
        <li>{t('detailPage.step3')}</li>
        <li>{t('detailPage.step4')}</li>
        <li>{t('detailPage.step5')}</li>
        <li>{t('detailPage.step6')}</li>
      </ol>

      <div className={styles.commentSection}>
        <h3>{t('detailPage.leaveComment')}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              type="text"
              name="name"
              placeholder={t('detailPage.name')}
              value={comment.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t('detailPage.email')}
              value={comment.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder={t('detailPage.message')}
            value={comment.message}
            onChange={handleChange}
            required
          />
          <button type="submit">{t('detailPage.post')}</button>
        </form>
        <p className={styles.note}>{t('detailPage.note')}</p>

        {Array.isArray(comments) && comments.length > 0 && (
          <div className={styles.commentList}>
            <h3>{t('detailPage.comments')}</h3>
            {comments.map((c, i) => (
              <div key={i} className={styles.singleComment}>
                <p>
                  <strong>{c.name}</strong>
                  <em> ({new Date(c.createdAt).toLocaleDateString()})</em>
                </p>
                <p>{c.comment}</p>
                <button className={styles.deleteBtn} onClick={() => handleDelete(c._id)}>
                  {t('detailPage.delete')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.backBtn} onClick={() => navigate('/recipes')}>
        ← {t('detailPage.back')}
      </button>
    </div>
  );
};

export default DetailPage;
