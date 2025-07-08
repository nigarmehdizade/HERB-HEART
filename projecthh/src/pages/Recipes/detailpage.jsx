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
  const [comment, setComment] = useState({ name: '', email: '', message: '' });

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
      alert(t('detailPage.commentSent', 'Comment submitted'));

      const updated = await axios.get(`http://localhost:5000/api/comments/recipe/${id}`);
      setComments(updated.data || []);
    } catch (error) {
      console.error(error);
      alert(t('detailPage.commentError', 'Failed to submit comment'));
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
      const updated = await axios.get(`http://localhost:5000/api/comments/recipe/${id}`);
      setComments(updated.data || []);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!recipe) return <div className={styles.loading}>{t('detailPage.loading', 'Loading...')}</div>;

  return (
    <div className={styles.detailWrapper}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <p>{recipe.description}</p>

      <h3>{t('detailPage.ingredients', 'Ingredients')}</h3>
      <ul>
        {recipe.ingredients?.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <h3>{t('detailPage.method', 'Method')}</h3>
      <ol>
        {recipe.method?.map((step, index) => <li key={index}>{step}</li>)}
      </ol>

      <div className={styles.commentSection}>
        <h3>{t('detailPage.leaveComment', 'Leave a Comment')}</h3>

        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">{t('detailPage.name', 'Name')}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t('detailPage.name', 'Name')}
                value={comment.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">{t('detailPage.email', 'Email')}</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={t('detailPage.email', 'Email')}
                value={comment.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.textareaGroup}>
            <label htmlFor="message">{t('detailPage.message', 'Message')}</label>
            <textarea
              id="message"
              name="message"
              placeholder={t('detailPage.message', 'Message')}
              value={comment.message}
              onChange={handleChange}
              required
            />
          </div>

          <p className={styles.note}>
            {t('detailPage.note', 'Please note, comments must be approved before they are published')}
          </p>

          <button type="submit">{t('detailPage.post', 'Post Comment')}</button>
        </form>

        {Array.isArray(comments) && comments.length > 0 && (
          <div className={styles.commentList}>
            <h3>{t('detailPage.comments', 'Comments')}</h3>
            {comments.map((c, i) => (
              <div key={i} className={styles.singleComment}>
                <p>
                  <strong>{c.name}</strong>
                  <em> ({new Date(c.createdAt).toLocaleDateString()})</em>
                </p>
                <p>{c.comment}</p>
                <button className={styles.deleteBtn} onClick={() => handleDelete(c._id)}>
                  {t('detailPage.delete', 'Delete')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.backBtn} onClick={() => navigate('/recipes')}>
        ← {t('detailPage.back', 'Back to Recipes')}
      </button>
    </div>
  );
};

export default DetailPage;