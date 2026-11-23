import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const { secret } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(secret === 'helloiamadmin' ? '/admin-login' : '/', { replace: true });
  }, [secret, navigate]);

  return null;
};

export default AdminAccess;