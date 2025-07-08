import React, { useEffect, useState } from 'react';
import styles from './Recipes.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.recipesPage}>
      <h1>{t('recipes.title')}</h1>

      <div className={styles.recipeGrid}>
        {recipes.map(recipe => (
          <div
            key={recipe._id}
            className={styles.card}
            onClick={() => navigate(`/recipes/${recipe._id}`)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className={styles.image}
            />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
