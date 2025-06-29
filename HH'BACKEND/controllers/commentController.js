import Comment from '../models/commentModel.js';



export const getCommentsByProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ productId: id }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Product şərhləri yüklənə bilmədi.' });
  }
};

export const createProductComment = async (req, res) => {
  const { name, email, rating, title, comment } = req.body;
  const { id } = req.params;

  try {
    const newComment = new Comment({
      name,
      email,
      rating,
      title,
      comment,
      productId: id,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Product üçün şərh əlavə edilə bilmədi.' });
  }
};



export const getCommentsBySnack = async (req, res) => {
  const { snackId } = req.params;
  try {
    const comments = await Comment.find({ snackId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Snack şərhləri yüklənə bilmədi.' });
  }
};

export const createSnackComment = async (req, res) => {
  const { name, email, rating, title, comment } = req.body;
  const { snackId } = req.params;

  try {
    const newComment = new Comment({
      name,
      email,
      rating,
      title,
      comment,
      snackId,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Snack üçün şərh əlavə edilə bilmədi.', error });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Şərh tapılmadı' });
    }
    res.status(200).json({ message: 'Silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Silinmə zamanı xəta', error: error.message });
  }
};

