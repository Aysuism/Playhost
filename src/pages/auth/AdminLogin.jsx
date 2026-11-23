import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';
import { setCredentials } from '../../dashboard/tools/api/auth-slice';
import { notify } from '../../hooks/useNotify';
import { apiFetch } from '../../app';

const AdminLogin = () => {
  const { lang } = useContext(LangContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiFetch('auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        notify.error('Yanlış Email və ya Şifrə', 'Incorrect Email or Password', await res.text());
        return;
      }

      const { token, user } = await res.json();

      if (user.role !== 'admin') {
        notify.error('Admin hüququnuz yoxdur', 'You are not an admin');
        return;
      }

      dispatch(setCredentials({ token, user }));
      navigate('/dashboard');
    } catch (err) {
      notify.error('Server ilə əlaqə yoxdur', 'Cannot reach the server');
    }
  };

  return (
    <section className="admin-page">
      <div className="container">
        <div className="form-container">
          <h1>{lang === 'AZ' ? 'Admin Girişi' : 'Admin Login'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{lang === 'AZ' ? 'E-posta' : 'Email'}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={lang === 'AZ' ? 'E-poçtunuzu daxil edin' : 'Enter your email'}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">{lang === 'AZ' ? 'Şifrə' : 'Password'}</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={lang === 'AZ' ? 'Şifrəni daxil edin' : 'Enter your password'}
                required
              />
            </div>
            <button type="submit">{lang === 'AZ' ? 'Giriş' : 'Login'}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;