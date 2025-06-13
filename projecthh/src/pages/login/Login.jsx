import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import loginImg from '../../assets/login-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user || userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <img src={loginImg} alt="login" />
      </div>
      <div className={styles.right}>
        <h2>Daxil ol</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Şifrə"
            required
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Gözləyin...' : 'Daxil ol'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Hesabın yoxdur? <a href="/register">Qeydiyyatdan keç</a></p>
      </div>
    </div>
  );
};

export default Login;
