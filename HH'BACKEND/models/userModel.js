import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  address: { type: String },
  cardInfo: { type: String },
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String },
  facebookId: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
  