import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setCredentials, logout } from '../../dashboard/tools/api/auth-slice';
import { wishlistApi } from '../../dashboard/tools/api/wishlist';
import { cartApi } from '../../dashboard/tools/api/cart';
import { LangContext } from '../../context/LangContext';
import { notify } from '../../hooks/useNotify';
import { apiFetch } from '../../app';
import Aos from 'aos';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14v3" />
  </svg>
);

const LoginForm = () => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 130, easing: 'ease-in-out', once: true });
  }, []);

  const getName = (u) => u?.username || u?.name || '';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(wishlistApi.util.resetApiState());
    dispatch(cartApi.util.resetApiState());

    notify.info('Hesabdan çıxdınız', 'You have been logged out');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiFetch('auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        notify.error('Yanlış Email və ya Şifrə', 'Incorrect Email or Password!', await res.text());
        return;
      }

      const data = await res.json();
      dispatch(setCredentials({ token: data.token, user: data.user }));

      notify.success(`Xoşgəldiniz, ${getName(data.user)}!`, `Welcome, ${getName(data.user)}!`);
      navigate('/');
    } catch (err) {
      notify.error('Server ilə əlaqə yoxdur', 'Cannot reach the server');
    }
  };

  return (
    <section className="form-container sign-in">
      {isAuthenticated ? (
        <div className="welcome-section">
          <h1>{lang === 'AZ' ? 'Xoşgəldiniz' : 'Welcome'}, {getName(user)}!</h1>
          <div className="auth-links">
            <button onClick={handleLogout} className="auth-button">
              {lang === 'AZ' ? 'Hesabdan Çıx' : 'Log Out'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <h1>{lang === 'AZ' ? 'Hesabına Giriş Et' : 'Log In to Your Account'}</h1>
          <p className="auth-subtitle">
            {lang === 'AZ' ? 'Davam etmək üçün hesabına daxil ol' : 'Sign in to continue'}
          </p>

          <div className="form-group">
            <label htmlFor="login-email">
              {lang === 'AZ' ? 'Email Ünvanı' : 'Email Address'}
            </label>
            <div className="input-wrap">
              <span className="input-icon"><MailIcon /></span>
              <input
                type="email"
                id="login-email"
                value={email}
                placeholder={lang === 'AZ' ? 'Email Ünvanı' : 'Email Address'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">
              {lang === 'AZ' ? 'Şifrə' : 'Password'}
            </label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                type="password"
                id="login-password"
                value={password}
                placeholder={lang === 'AZ' ? 'Şifrə' : 'Password'}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
          </div>

          <button type="submit" className="auth-submit">
            {lang === 'AZ' ? 'Daxil Ol' : 'Log In'} <span aria-hidden="true">›</span>
          </button>

          <div className="auth-toggle">
            {lang === 'AZ' ? 'Hesabınız yoxdur?' : "Don't have an account?"}{' '}
            <Link to="/auth/register" className="auth-switch">
              {lang === 'AZ' ? 'Qeydiyyatdan keçin' : 'Register'}
            </Link>
          </div>
        </form>
      )}
    </section>
  );
};

export default LoginForm;