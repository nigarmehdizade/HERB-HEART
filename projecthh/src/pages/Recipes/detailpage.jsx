import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './detailpage.module.scss';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const [comment, setComment] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/comments/${id}`)
      .then(res => setComments(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/comments', {
        recipeId: id,
        name: comment.name,
        email: comment.email,
        message: comment.message
      });

      alert("Şərhiniz göndərildi və təsdiq gözləyir.");
      setComment({ name: '', email: '', message: '' });

      const updated = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(updated.data.data);
    } catch (error) {
      console.error(error);
      alert("Şərh göndərilərkən xəta baş verdi.");
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className={styles.detailWrapper}>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <p>{recipe.description}</p>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Method:</h3>
      <ol>
        <li>In a small saucepan, heat almond milk over medium heat.</li>
        <li>Add rolled oats and cook for 5–7 minutes, stirring regularly until mixture is creamy and oats have absorbed the liquid.</li>
      </ol>
      <ol start="3">
        <li>Remove from heat and stir in hemp seeds and cinnamon powder. Mix well.</li>
        <li>Pour oatmeal into a bowl.</li>
        <li>Top with almond butter, pecans, coconut smiles, fresh berries, and extra hemp seeds.</li>
        <li>Drizzle with maple syrup for a touch of sweetness.</li>
      </ol>

      <div className={styles.commentSection}>
        {/* 🔵 Əvvəl form */}
        <h3>Leave a Comment</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={comment.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={comment.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={comment.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Post Comment</button>
        </form>
        <p className={styles.note}>Please note, comments must be approved before they are published.</p>

        {/* 🟢 Sonra comment siyahısı */}
        {comments.length > 0 && (
          <div className={styles.commentList}>
            <h3>Comments:</h3>
            {comments.map((c, i) => (
              <div key={i} className={styles.singleComment}>
                <p><strong>{c.name}</strong> <em>({new Date(c.createdAt).toLocaleDateString()})</em></p>
                <p>{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.backBtn} onClick={() => navigate('/recipes')}>
        ← Back to Recipes
      </button>
    </div>
  );
};

export default DetailPage;
