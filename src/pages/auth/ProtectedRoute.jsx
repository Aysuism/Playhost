import { useContext, useEffect, useState } from "react";
import { LangContext } from "../../context/LangContext";
import Swal from "sweetalert2";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();

  const [isAllowed, setIsAllowed] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = localStorage.getItem("adminAccess") === "true";

  useEffect(() => {
    // No user = not logged in
    if (!user) {
      Swal.fire({
        title: lang === "AZ" ? "Daxil olmağınız tələb edilir" : "Login Required",
        text: lang === "AZ"
          ? "Bu səhifəyə daxil olmaq üçün hesabınıza daxil olmalısınız"
          : "You need to login to access this page",
        icon: "warning",
        confirmButtonText: lang === "AZ" ? "Daxil ol" : "Login",
        allowOutsideClick: false
      }).then(() => {
        navigate("/auth/login");
      });
    } else if (adminOnly && !isAdmin) {
      localStorage.removeItem("adminAccess");
      Swal.fire({
        title: lang === "AZ" ? "Giriş qadağandır" : "Access Denied",
        text: lang === "AZ"
          ? "Admin panelinə giriş hüququnuz yoxdur"
          : "You don't have permission to access admin panel",
        icon: "error"
      }).then(() => {
        navigate("/");
      });
    } else {
      setIsAllowed(true);
    }
  }, [user, isAdmin, adminOnly, lang, navigate]);

  // Block rendering until we know access is allowed
  if (!isAllowed) return null;

  return children || <Outlet />;
};

export default ProtectedRoute;
