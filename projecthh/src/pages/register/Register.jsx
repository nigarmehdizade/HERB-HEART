import React, { useState, useEffect } from 'react';
import styles from './Register.module.scss';
import registerImg from '../../assets/register-bg.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/home'); // qeydiyyatdan sonra yönləndir
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className={styles.register}>
      <div className={styles.left}>
        <img src={registerImg} alt="register" />
      </div>
      <div className={styles.right}>
        <h2>Qeydiyyat</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ad" onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Soyad" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>Hesabın var? <a href="/login">Daxil ol</a></p>
      </div>
    </div>
  );
};

export default Register;
