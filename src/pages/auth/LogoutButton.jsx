import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../dashboard/tools/api/auth-slice';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { wishlistApi } from '../../dashboard/tools/api/wishlist';
import { cartApi } from '../../dashboard/tools/api/cart';
import { toast } from '../../components/Toaster';

const LogoutButton = () => {
  const { lang } = useContext(LangContext)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(wishlistApi.util.resetApiState());
    dispatch(cartApi.util.resetApiState());
    toast.info(lang === 'AZ' ? 'Hesabdan çıxdınız' : 'You have been logged out');
    navigate('/sign-in');
  };

  return (
    <button onClick={handleLogout}>
      {lang === 'AZ' ? 'Çıxış' : 'Logout'}
    </button>
  );
};

export default LogoutButton