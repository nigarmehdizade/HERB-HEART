import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import loginImg from '../../assets/login-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { sanitizeInput } from '../../utils/sanitizeInput';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.token) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert('Zəhmət olmasa bütün xanaları doldurun.');
      return;
    }

    dispatch(loginUser(formData));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
            <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"alt="Login visual" />
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
              Hesabın yoxdur? <Link to="/register">Qeydiyyatdan keç</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
