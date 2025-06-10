import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/auth/authSlice';

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);

      dispatch(setCredentials({ token, user: { oauth: true } }));
      navigate('/');
    } 
  }, [token]);

  return <p>Redirecting...</p>;
};

export default OAuthSuccess;
