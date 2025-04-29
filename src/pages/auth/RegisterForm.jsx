import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LangContext } from "../../context/LangContext";

const RegisterForm = () => {
  const { lang } = useContext(LangContext)
  const [error, setError] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    avatar: null
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!registerForm.name || !registerForm.surname || !registerForm.email ||
      !registerForm.password || !registerForm.phone) {
      setError(lang === 'AZ' ? 'Bütün sahələri doldurun' : 'Please fill all fields');
      return;
    }

    if (registerForm.password.length < 6) {
      setError(lang === 'AZ' ? 'Şifrə ən azı 6 simvol olmalıdır' : 'Password must be at least 6 characters');
      return;
    }

    try {
      // Get existing users from localStorage or initialize
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Check if email already exists
      if (users.some(user => user.email === registerForm.email)) {
        setError(lang === 'AZ' ? 'Bu email artıq istifadə olunub' : 'Email already exists');
        return;
      }

      // Create new user
      const newUser = {
        ...registerForm,
        id: Date.now().toString(),
        role: "user",
        active: true,
        // Remove avatar from storage for simplicity (or convert to base64)
      };

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify([...users, newUser]));

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu qeydiyyat!' : 'Registration successful!',
        text: lang === 'AZ' ? 'Hesabınız yaradıldı' : 'Your account has been created'
      });

      // Redirect to login page
      navigate('/auth/login');
    } catch (err) {
      setError(lang === 'AZ' ? 'Xəta baş verdi' : 'An error occurred');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="form-container sign-up">
      <h1>{lang === 'AZ' ? 'Qeydiyyatdan Keç' : 'Register'}</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            value={registerForm.name}
            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
            placeholder={lang === 'AZ' ? 'Ad' : 'Name'}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            value={registerForm.surname}
            onChange={(e) => setRegisterForm({ ...registerForm, surname: e.target.value })}
            placeholder={lang === 'AZ' ? 'Soyad' : 'Surname'}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            placeholder={lang === 'AZ' ? 'E-poçt' : 'Email'}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            placeholder={lang === 'AZ' ? 'Şifrə (minimum 6 simvol)' : 'Password (min 6 chars)'}
            minLength="6"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            value={registerForm.phone}
            onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
            placeholder={lang === 'AZ' ? 'Telefon' : 'Phone'}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar-upload" className="file-upload-label">
            {lang === 'AZ' ? 'Profil şəkli' : 'Profile Picture'}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setRegisterForm({ ...registerForm, avatar: e.target.files[0] })}
            className="file-upload-input"
          />
        </div>

        <button type="submit" className="submit-button">
          {lang === 'AZ' ? 'Qeydiyyatdan Keç' : 'Sign Up'}
        </button>

        <div className="auth-switch">
          {lang === 'AZ' ? 'Artıq hesabınız var?' : 'Already have an account?'}
          <Link to="/auth/login" className="auth-link">
            {lang === 'AZ' ? 'Daxil Ol' : 'Login'}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;