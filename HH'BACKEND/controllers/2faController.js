import speakeasy from "speakeasy";
import qrcode from "qrcode";
import User from "../models/userModel.js";

export const generate2FA = async (req, res) => {
  const user = await User.findById(req.user.id);

  const secret = speakeasy.generateSecret({
    name: "Elan 2FA",
  });

 
  const qrCode = await qrcode.toDataURL(secret.otpauth_url);

  res.status(200).json({
    qrCode,
    secret: secret.base32,
  });
};

export const verify2FA = async (req, res) => {
  const { token, secret } = req.body;
  const user = await User.findById(req.user.id);

  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });

  if (!verified) {
    return res.status(401).json({ message: "Kod yanlışdır" });
  }

  user.twoFactorSecret = secret;
  await user.save();

  res.status(200).json({ message: "2FA aktivləşdirildi" });
};


export const disable2FA = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.twoFactorSecret = null;
  await user.save();

  res.status(200).json({ message: "2FA deaktiv edildi" });
};
