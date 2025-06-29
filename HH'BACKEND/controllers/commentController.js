import Comment from '../models/commentModel.js';

export const createComment = async (req, res) => {
  try {
    const { recipeId, name, email, message } = req.body;

    const comment = new Comment({ recipeId, name, email, message });
    await comment.save();

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommentsByRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
