
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import snackRoutes from './routes/snackRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { secureHeaders } from "./middleware/secureHeaders.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use(cookieParser());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(secureHeaders);

app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/snacks', snackRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/recipes", recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend runn ${PORT}`));
