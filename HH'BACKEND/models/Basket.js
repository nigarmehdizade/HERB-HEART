import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}, { timestamps: true });

const Basket = mongoose.model("Basket", basketSchema);
export default Basket;