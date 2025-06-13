import React from 'react';
import styles from './Dashboard.module.scss'
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div style={{ padding: '30px' }}>
      <h2>Şəxsi Kabinet</h2>
      <p>Ad: {user?.user?.name}</p>
      <p>Email: {user?.user?.email}</p>
    </div>
  );
};

export default Dashboard;
