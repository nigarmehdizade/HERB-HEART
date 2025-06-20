import React, { useState } from 'react';
import styles from './Login.module.scss';
import loginImg from '../../assets/login-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 console.log('GÖNDƏRİLİR:', payload);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={loginImg} alt="Login visual" />
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.title}>Daxil ol</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
       <div className={styles.inputWrapper}>
  <FaUser className={styles.icon} />
  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    onChange={handleChange}
  />
</div>

{/* Password input */}
<div className={styles.inputWrapper}>
  <FaLock className={styles.icon} />
  <input
    type="password"
    name="password"
    placeholder="Şifrə"
    required
    onChange={handleChange}
  />
</div>
            <button type="submit" disabled={loading}>
              {loading ? 'Gözləyin...' : 'Daxil ol'}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.bottomText}>
            <p>
              Hesabın yoxdur? <a href="/register">Qeydiyyatdan keç</a>
            </p>
            <div className={styles.socialLogin}>
              <span>və ya daxil ol</span>
              <div className={styles.socialIcons}>
                <button className={styles.fb}>f</button>
                <button className={styles.tw}>t</button>
                <button className={styles.gg}>G</button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
