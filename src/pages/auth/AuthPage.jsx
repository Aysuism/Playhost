import { Outlet } from "react-router-dom";

const AuthPage = () => {

    return (
        <div className="auth-page">
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthPage;