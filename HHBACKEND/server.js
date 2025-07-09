import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import seedsRoutes from './routes/seedsRoutes.js';
import snackRoutes from './routes/snackRoutes.js';
import nutRoutes from './routes/nutRoutes.js';
import nutReviewRoutes from './routes/nutReviewRoutes.js';
import recipeRoutes from "./routes/recipeRoutes.js";
import commentRoutes from './routes/commentRoutes.js';
import matchaRoutes from './routes/matchaRoutes.js';
import fruitReviewRoutes from './routes/fruitReviewRoutes.js';
import twoFARoutes from "./routes/2faRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { secureHeaders } from "./middleware/secureHeaders.js";


import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(secureHeaders);


app.use('/uploads', express.static('uploads'));

app.use("/api/2fa", twoFARoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/snacks", snackRoutes);
app.use("/api/nuts", nutRoutes);
app.use("/api/nutreviews", nutReviewRoutes);
app.use("/api/recipes", recipeRoutes);
app.use('/api/matcha', matchaRoutes);
app.use('/api/fruitreviews', fruitReviewRoutes);
app.use('/api/seeds', seedsRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);


app.listen(PORT, () => console.log(`Backend running ${PORT}`));
