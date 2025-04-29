import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminAccess = () => {
  const { secret } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Block if a regular user is logged in
    if (loggedInUser) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Log out as a user first to access admin.',
        timer: 2000,
      });
      navigate('/');
      return;
    }

    // Only set admin flag (DON'T TOUCH OTHER DATA)
    if (secret === 'helloiamadmin') {
      localStorage.setItem('adminAccess', 'true'); // ✅ Only adds this key
      Swal.fire({
        title: 'Admin Access Granted',
        text: 'Proceed to admin login.',
        icon: 'success',
        timer: 2000,
      });
      navigate('/admin-login');
    } else {
      navigate('/'); // Invalid secret
    }
  }, [secret, navigate]);

  return null;
};

export default AdminAccess;