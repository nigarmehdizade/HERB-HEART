import React, { useState } from 'react';
import styles from './Auth.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const Auth = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }, {
        withCredentials: true
      });

      alert("Qeydiyyat uğurla tamamlandı!");
      console.log(res.data);

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Qeydiyyat zamanı xəta baş verdi");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.imageSection}>
        <img
          src="https://www.shutterstock.com/image-photo/matcha-powder-heart-isolated-love-260nw-2574234459.jpg"
          alt="Matcha heart"
          className={styles.image}
        />
      </div>

      <div className={styles.formSection}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} required />
          <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          <input type="password" placeholder="Repeat Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <label className={styles.checkboxContainer}>
            <input type="checkbox" required />
            <span>I agree to the Terms of User</span>
          </label>

          <button type="submit" className={styles.signupBtn}>Sign Up</button>
        </form>

        <div className={styles.socialLogin}>
          <button className={styles.fbBtn}><FaFacebookF /> Sign up with Facebook</button>
          <button className={styles.googleBtn}><FaGoogle /> Sign up with Google</button>
        </div>

        <p>Already have an account? <Link to="/login">Sign In →</Link></p>
      </div>
    </div>
  );
};

export default Auth;


