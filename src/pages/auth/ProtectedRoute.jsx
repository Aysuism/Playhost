import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { notify } from "../../hooks/useNotify";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isAdmin = user?.role === "admin";
  const isAllowed = isAuthenticated && (!adminOnly || isAdmin);

  useEffect(() => {
    if (isAllowed) return;

    if (!isAuthenticated) {
      notify.warning('Bu səhifəyə daxil olmaq üçün hesabınıza daxil olmalısınız', 'You need to login to access this page');
      navigate('/auth/login', { replace: true });
    } else {
      notify.error('Admin panelinə giriş hüququnuz yoxdur', "You don't have permission to access admin panel");
      navigate('/', { replace: true });
    }
  }, [isAllowed, isAuthenticated, navigate]);
  if (!isAllowed) return null;

  return children || <Outlet />;
};

export default ProtectedRoute;