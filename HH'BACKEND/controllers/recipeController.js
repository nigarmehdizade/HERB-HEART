
import Recipe from '../models/recipeModel.js';

export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};


export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

export const createRecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body);
  const saved = await newRecipe.save();
  res.status(201).json(saved);
};
