import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import speakeasy from "speakeasy"; 


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const logoutUser = (req, res) => {
  console.log(`User logged out: ${req.user?.email}`);
  res.status(200).json({ message: 'Çıxış edildi' });
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Zəhmət olmasa bütün xanaları doldurun." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu email artıq mövcuddur." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: "",
      address: "",
      cardInfo: "",
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        cardInfo: user.cardInfo,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Serverdə xəta baş verdi" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email və parol tələb olunur." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Hesab müvəqqəti bloklanıb. Bir neçə dəqiqədən sonra yenidən yoxlayın.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 dəqiqə blok
        await user.save();
        return res.status(403).json({ message: "Hesab 10 dəqiqəlik bloklanıb." });
      }

      await user.save();
      return res.status(401).json({ message: "Yanlış parol." });
    }

    
    if (user.twoFactorSecret) {
      if (!token) {
        return res.status(401).json({ message: "2FA kodu tələb olunur." });
      }

      const isValid = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
      });

      if (!isValid) {
        return res.status(401).json({ message: "Yanlış 2FA kodu." });
      }
    }

    // Uğurlu giriş – sıfırla
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    res.status(200).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        cardInfo: user.cardInfo,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Giriş zamanı xəta baş verdi." });
  }
};
