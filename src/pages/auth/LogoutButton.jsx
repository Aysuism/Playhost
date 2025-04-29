import { useDispatch } from 'react-redux';
import { logout } from '../dashboard/tools/api/authSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

const LogoutButton = () => {
  const { lang } = useContext(LangContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <button onClick={handleLogout}>
      {lang === 'AZ' ? 'Çıxış' : 'Logout'}
    </button>
  );
};

export default LogoutButton