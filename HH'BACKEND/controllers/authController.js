import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Token yaradan funksiya
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Qeydiyyat
export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    console.log('Gelen register datasi:', req.body);


    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Zəhmət olmasa bütün xanaları doldurun.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Bu email artıq mövcuddur.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(500).json({ message: 'İstifadəçi yaradılmadı.' });
    }

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Zəhmət olmasa email və şifrəni daxil edin." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Şifrə yalnışdır." });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: "Daxil olarkən xəta baş verdi." });
  }
};
