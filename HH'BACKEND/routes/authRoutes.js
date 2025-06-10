import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
export default router;