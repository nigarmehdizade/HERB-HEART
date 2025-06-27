import React, { useEffect } from 'react';
import styles from './Dashboard.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  const isAdmin = userInfo.user?.isAdmin;

  return (
    <div className={styles.dashboard}>
      <h2>👤 Şəxsi Kabinet</h2>

      <div className={styles.section}>
        <h3>Məlumatlarım</h3>
        <p><strong>Ad:</strong> {userInfo.user?.name}</p>
        <p><strong>Email:</strong> {userInfo.user?.email}</p>
        <p><strong>Telefon:</strong> {userInfo.user?.phone || 'Yoxdur'}</p>
        <p><strong>Ünvan:</strong> {userInfo.user?.address || 'Yoxdur'}</p>
        <p><strong>Status:</strong> {isAdmin ? '✅ Admin' : 'İstifadəçi'}</p>
      </div>

      <div className={styles.section}>
        <h3>🛍 Sifarişlərim</h3>
        <p>Hazırda bu bölmə aktiv deyil. Tezliklə!</p>
      
      </div>

      {isAdmin && (
        <div className={styles.sectionAdmin}>
          <h3>⚙️ Admin Panel</h3>
          <p>
            Məhsulları idarə etmək, əlavə etmək, silmək və istifadəçiləri görmək üçün
            <strong> Admin Panel</strong> səhifəsinə keç.
          </p>
          <button onClick={() => navigate('/admin')}>Admin Panelə keç</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
