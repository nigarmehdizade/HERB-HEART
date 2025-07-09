import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Token error:", error);
      res.status(401).json({ message: "Token düzgün deyil" });
    }
  } else {
    res.status(401).json({ message: "Token yoxdur" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    console.error("isAdmin error: req.user =", req.user); // Debug üçün
    res.status(403).json({ message: "Admin deyilsiniz" });
  }
};
