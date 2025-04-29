import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { LangContext } from '../../context/LangContext';
const AdminLogin = () => {
  const { lang } = useContext(LangContext); // Access lang context

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.email === 'admin@blabla.com' && formData.password === 'admin123') {
      // Clear any existing user data (optional, but recommended)
      localStorage.removeItem('loggedInUser'); 
  
      const adminUser = {
        username: 'Admin',
        email: formData.email,
        role: 'admin'
      };
  
      localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      localStorage.setItem('adminAccess', 'true'); // Grant admin access
  
      window.location.href = '/dashboard';
    } else {
      Swal.fire({
        title: lang === 'AZ' ? 'Xəta' : 'Error',
        text: lang === 'AZ' ? 'Yanlış məlumatlar' : 'Invalid credentials',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
