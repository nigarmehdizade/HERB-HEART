// src/pages/register/Register.jsx

import React, { useState, useEffect } from 'react';
import styles from './Register.module.scss';
import { useDispatch } from 'react-redux';
import { registerUser, loginWithGoogle, loginWithFacebook } from '../../redux/userSlice';
import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert('Şifrələr uyğun deyil');
    }

    if (!formData.agree) {
      return alert('Şərtləri qəbul etməlisiniz!');
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

  console.log('GÖNDƏRİLİR:', payload);
dispatch(registerUser(payload)).then((res) => {
  console.log('SERVER CAVABI:', res);
  if (res.meta.requestStatus === 'fulfilled') {
    navigate('/home');
  } else {
    alert(res.payload || 'Xəta baş verdi');
  }
});

  };

  const handleFBLogin = () => {
    if (window.FB) {
      window.FB.getLoginStatus((response) => {
        if (response.status !== 'connected') {
          window.FB.login((res) => {
            dispatch(loginWithFacebook(res)).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                navigate('/home');
              }
            });
          });
        } else {
          dispatch(loginWithFacebook(response)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              navigate('/home');
            }
          });
        }
      });
    } else {
      console.error('Facebook SDK hələ yüklənməyib.');
    }
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'SENIN_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <div className={styles.register}>
      <div className={styles.formBox}>
        <div className={styles.formLeft}>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <i className="fa fa-user" />
              <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
            </div>
            <div className={styles.inputWrapper}>
              <i className="fa fa-envelope" />
              <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
            </div>
            <div className={styles.inputWrapper}>
              <i className="fa fa-lock" />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className={styles.inputWrapper}>
              <i className="fa fa-lock" />
              <input type="password" name="confirmPassword" placeholder="Repeat your password" onChange={handleChange} required />
            </div>

            <div className={styles.checkboxRow}>
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
              <label>I agree all statements in <a href="#">Terms of service</a></label>
            </div>

            <button type="submit" className={styles.registerBtn}>Register</button>

            <div className={styles.loginRedirect}>
              Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
            </div>
          </form>

          <div className={styles.social}>
            <p>Or sign up with</p>
            <div className={styles.socialBtns}>
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  dispatch(loginWithGoogle(credentialResponse)).then((res) => {
                    if (res.meta.requestStatus === 'fulfilled') {
                      navigate('/home');
                    }
                  })
                }
                onError={() => console.log('Google login failed')}
              />
              <FacebookLogin
                appId="SENIN_APP_ID"
                onSuccess={(res) => dispatch(loginWithFacebook(res))}
                onFail={(err) => console.log('FB login error:', err)}
                render={({ onClick }) => (
                  <button className={styles.fbBtn} onClick={handleFBLogin}>
                    Facebook
                  </button>
                )}
              />
            </div>
          </div>
        </div>

        <div className={styles.imgBox}>
          <img
            src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
