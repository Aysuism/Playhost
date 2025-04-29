import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

export const staticUsers = [
  {
    username: 'RegularUser',
    email: 'user@example.com',
    password: 'user123',
    role: 'user'
  }

];


const LoginPage = () => {
  const { lang } = useContext(LangContext)

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 130, easing: 'ease-in-out', once: true });

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(staticUsers));
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setLoggedInUser(null);
    Swal.fire({
      icon: 'success',
      title: lang === 'AZ' ? 'Daxil Olma Uğurludur' : 'Logged out successfully!',
      confirmButtonText: lang === 'AZ' ? 'Tamam' : 'OK',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignUp) {
      if (users.some((user) => user.email === email)) {
        Swal.fire({ icon: 'error', title: 'Email already in use!' });
        return;
      }

      const newUser = {
        username,
        email,
        password,
        role: "user"
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Hesab Yaradıldı' : 'Account Created!',
        text: lang === 'AZ' ? 'Artıq yeni hesabınızla giriş edə bilərsiniz' : 'You can now login with your new account'
      }).then(() => {
        setIsSignUp(false);
        setUsername('');
        setEmail('');
        setPassword('');
      });
    } else {
      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setIsLoggedIn(true);
        setLoggedInUser(user);

        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: lang === 'AZ' ? `Xoşgəldiniz, ${user.username}!` : `Welcome, ${user.username}!`,
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            navigate('/', { state: { refreshed: true } });
            window.location.reload();
          });
        }, 100);
      } else {
        Swal.fire({ icon: 'error', title: lang === 'AZ' ? 'Yanlış Email və ya Şifrə' : 'Incorrect Email or Password!' });
      }
    }
  };

  return (
    <>

      <section className="form-container sign-in">
        {isLoggedIn ? (
          <div className="welcome-section">
            <h1>{lang === 'AZ' ? 'Xoşgəldiniz' : 'Welcome'}, {loggedInUser?.username}!</h1>
            <p>{lang === 'AZ' ? 'İstifadəçi hesabı' : 'User account'}</p>
            <div className="auth-links">
              <button onClick={handleLogout} className="auth-button">{lang === 'AZ' ? 'Hesabdan Çıx' : 'Log Out'}</button>
            </div>
          </div>
        ) : (

          <form onSubmit={handleSubmit} className="auth-form">
            <h1>{isSignUp ? lang === 'AZ' ? 'Hesab Yarat' : 'Create An Account' : lang === 'AZ' ? 'Daxil Ol' : 'Login'}</h1>
            {isSignUp && (
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder={lang === 'AZ' ? 'Istifadəçi Adı' : 'Username'}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                placeholder={lang === 'AZ' ? 'Email Adres' : 'Email Adress'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                placeholder={lang === 'AZ' ? 'Şifrə' : 'Password'}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="auth-submit">
              {isSignUp ? (lang === 'AZ' ? 'Hesab Yarat' : 'Create Account') : (lang === 'AZ' ? 'Daxil olun' : 'Log In')}
            </button>
            <div className="auth-toggle">
              {isSignUp ? (
                <>{lang === 'AZ' ? 'Artıq Hesabınız var?' : 'Already have an account?'}<br /> <span onClick={() => setIsSignUp(false)} className="auth-switch">{lang === 'AZ' ? 'Daxil Ol' : 'Login'}</span></>
              ) : (
                <>{lang === 'AZ' ? 'Hesabınız Yoxdur?' : 'Don\'t have an account'} <br /> <span onClick={() => setIsSignUp(true)} className="auth-switch">{lang === 'AZ' ? 'Hesab Yarat' : 'Register'}</span></>
              )}
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export default LoginPage;