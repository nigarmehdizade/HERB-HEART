import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const [formData, setFormData] = useState({
    name: userInfo?.user?.name || '',
    email: userInfo?.user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: 'Azerbaijan',
    postalCode: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Data:', formData);
    // axios.post('/api/profile', formData)
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/home');
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.header}>
        <h2>Profil Məlumatlarım</h2>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Çıxış
        </button>
      </div>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label>Ad Soyad</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className={styles.section}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.section}>
          <label>Mobil Nömrə</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles.section}>
          <label>Ünvan</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className={styles.double}>
          <div>
            <label>Şəhər</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div>
            <label>Poçt Kodu</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn}>Yadda saxla</button>
      </form>
    </div>
  );
};

export default Profile;
