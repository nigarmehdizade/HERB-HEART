import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;