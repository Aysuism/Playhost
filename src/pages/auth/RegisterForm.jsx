import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { apiFetch } from "../../app";
import { notify } from "../../hooks/useNotify";

const RegisterForm = () => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerForm, setRegisterForm] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (field) => (e) =>
    setRegisterForm({ ...registerForm, [field]: e.target.value });

  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, '');

    if (digits.length > 9 && digits.startsWith('994')) digits = digits.slice(3);

    digits = digits.replace(/^0+/, '').slice(0, 9);
    setRegisterForm({ ...registerForm, phone: digits });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerForm.password !== confirmPassword) {
      notify.error('Şifrələr eyni deyil', 'Passwords do not match');
      return;
    }

    try {
      const res = await apiFetch('auth/register', {
        method: 'POST',
        body: JSON.stringify({ ...registerForm, phone: `+994${registerForm.phone}` }),
      });

      if (!res.ok) {
        notify.error('Qeydiyyat alınmadı', 'Registration failed', await res.text());
        return;
      }

      notify.success('Hesabınız yaradıldı', 'Your account has been created');
      navigate('/auth/login');
    } catch (err) {
      notify.error('Server ilə əlaqə yoxdur', 'Cannot reach the server');
    }
  };

  return (
    <section className="form-container sign-in register">
      <form onSubmit={handleRegister} className="auth-form">
        <h1>{lang === 'AZ' ? 'Hesab Yarat' : 'Register'}</h1>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reg-name">{lang === 'AZ' ? 'Ad' : 'Name'}</label>
            <input
              id="reg-name"
              type="text"
              value={registerForm.name}
              onChange={handleChange('name')}
              placeholder={lang === 'AZ' ? 'Ad' : 'Name'}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-surname">{lang === 'AZ' ? 'Soyad' : 'Surname'}</label>
            <input
              id="reg-surname"
              type="text"
              value={registerForm.surname}
              onChange={handleChange('surname')}
              placeholder={lang === 'AZ' ? 'Soyad' : 'Surname'}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reg-username">{lang === 'AZ' ? 'İstifadəçi Adı' : 'Username'}</label>
          <input
            id="reg-username"
            type="text"
            value={registerForm.username}
            onChange={handleChange('username')}
            placeholder={lang === 'AZ' ? 'İstifadəçi Adı' : 'Username'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-email">{lang === 'AZ' ? 'E-poçt' : 'Email'}</label>
          <input
            id="reg-email"
            type="email"
            value={registerForm.email}
            onChange={handleChange('email')}
            placeholder={lang === 'AZ' ? 'E-poçt' : 'Email'}
            minLength="10"
            maxLength="50"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-phone">{lang === 'AZ' ? 'Telefon' : 'Phone'}</label>
          <div className="phone-input">
            <span className="phone-prefix">+994</span>
            <input
              id="reg-phone"
              type="tel"
              inputMode="numeric"
              value={registerForm.phone}
              onChange={handlePhoneChange}
              placeholder="501234567"
              pattern="[0-9]{9}"
              maxLength="9"
              title={lang === 'AZ' ? '9 rəqəm daxil edin' : 'Enter 9 digits'}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reg-password">{lang === 'AZ' ? 'Şifrə' : 'Password'}</label>
            <input
              id="reg-password"
              type="password"
              value={registerForm.password}
              onChange={handleChange('password')}
              placeholder={lang === 'AZ' ? 'Şifrə' : 'Password'}
              minLength="8"
              maxLength="50"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm">
              {lang === 'AZ' ? 'Şifrəni təsdiqlə' : 'Confirm Password'}
            </label>
            <input
              id="reg-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={lang === 'AZ' ? 'Şifrəni təsdiqlə' : 'Confirm Password'}
              minLength="8"
              maxLength="50"
              required
            />
          </div>
        </div>

        <button type="submit" className="auth-submit">
          {lang === 'AZ' ? 'Qeydiyyatdan Keç' : 'Sign Up'}
        </button>

        <div className="auth-toggle">
          {lang === 'AZ' ? 'Artıq hesabınız var?' : 'Already have an account?'}
          <br />
          <Link to="/auth/login" className="auth-switch">
            {lang === 'AZ' ? 'Daxil Ol' : 'Login'}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;