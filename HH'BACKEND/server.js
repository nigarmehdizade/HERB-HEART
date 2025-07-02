import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import snackRoutes from './routes/snackRoutes.js';
import nutRoutes from './routes/nutRoutes.js';
import nutReviewRoutes from './routes/nutReviewRoutes.js';
import driedFruitRoutes from './routes/driedFruitRoutes.js'; 
import recipeRoutes from "./routes/recipeRoutes.js";
import commentRoutes from './routes/commentRoutes.js';
import fruitReviewRoutes from './routes/fruitReviewRoutes.js';


// MIDDLEWARE
import { errorHandler } from "./middleware/errorHandler.js";
import { secureHeaders } from "./middleware/secureHeaders.js";

// CONFIG
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// BODY PARSING
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// COOKIES + SECURITY
app.use(cookieParser());
app.use(secureHeaders);

// STATIC FILES
app.use('/uploads', express.static('uploads'));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/snacks", snackRoutes);
app.use("/api/nuts", nutRoutes);
app.use("/api/nutreviews", nutReviewRoutes);
app.use('/api/driedfruits', driedFruitRoutes);
app.use("/api/recipes", recipeRoutes);
app.use('/api/fruitreviews', fruitReviewRoutes);
app.use("/api/comments", commentRoutes);

// ERROR HANDLER
app.use(errorHandler);

// SERVER START
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
