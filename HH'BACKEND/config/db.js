import mongoose from 'mongoose';

const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB bağlantısı uğurla quruldu.");
  } catch (err) {
    console.error("Mongo bağlantı xətası:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
