import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "İstifadəçi adı boş ola bilməz"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email boş ola bilməz"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Şifrə boş ola bilməz"],
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  cardInfo: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    default: null,
  },
  facebookId: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
