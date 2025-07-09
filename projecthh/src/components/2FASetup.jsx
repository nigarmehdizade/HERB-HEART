import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TwoFA.module.scss"; // istəyə uyğun SCSS yaza bilərik
import { useSelector } from "react-redux";

const TwoFASetup = () => {
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const { data } = await axios.get("/api/2fa/setup", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setQrCode(data.qrCode);
        setSecret(data.secret);
      } catch (err) {
        setError("QR kod alınarkən xəta baş verdi");
      }
    };

    fetchQRCode();
  }, [userInfo.token]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "/api/2fa/verify",
        { token, secret },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSuccess("2FA uğurla aktivləşdirildi ✅");
    } catch (err) {
      setError("Daxil etdiyiniz kod yanlışdır ❌");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Google Authenticator ilə 2FA Aktivləşdir</h2>

      {qrCode && (
        <>
          <p>QR kodu telefonundakı Google Authenticator app ilə oxut:</p>
          <img src={qrCode} alt="QR code" />
        </>
      )}

      <form onSubmit={handleVerify}>
        <label>Kodu daxil edin (6 rəqəm):</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength="6"
          required
        />
        <button type="submit">Təsdiqlə</button>
      </form>

      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TwoFASetup;
