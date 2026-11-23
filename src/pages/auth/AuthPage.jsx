import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { useGetSettingsQuery } from "../../dashboard/tools/api/settings";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

const AuthPage = () => {
    const { data: settings } = useGetSettingsQuery();
    const { lang } = useContext(LangContext);

    // ------------------------------- Theme Change -----------------
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    const az = lang === 'AZ';

    return (
        <div className="auth-page">
            {/* <div className="auth-header">
                <Link key={settings?._id || Math.random()} className='navbar-brand' to="/">
                    <img src={`http://localhost:3333/${settings?.logo}`} alt="Logo" />
                </Link>
                <button className="auth-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === "light" ? <IoSunny size={20} /> : <IoMoon size={20} />}
                </button>
            </div> */}

            <div className="auth-layout">
                {/* Left: hero text */}
                <section className="auth-intro">
                    <p className="auth-eyebrow">
                        {az ? 'OYUN DÜNYASINA BİR ADDIM DAHA YAXIN' : 'ONE STEP CLOSER TO THE GAMING WORLD'}
                    </p>
                    <h2 className="auth-hero-title">
                        {az ? 'OYUNLARIN' : 'THE BEST ADDRESS'}
                        <span>{az ? 'ƏN YAXŞI ÜNVANI' : 'FOR GAMES'}</span>
                    </h2>
                    <p className="auth-hero-text">
                        {az
                            ? 'Sevdiyin oyunları daha sərfəli qiymətlərlə əldə et, oyun təcrübəni zirvəyə daşı!'
                            : 'Get your favorite games at better prices and take your gaming experience to the top!'}
                    </p>
                    <Link to="/games" className="auth-store-btn">
                        <span aria-hidden="true"><FaCartShopping size={'20px'} /></span>
                        {az ? 'Mağazaya Get' : 'Go to Store'}
                        <span className="auth-store-arrow" aria-hidden="true">›</span>
                    </Link>
                </section>

                {/* Right: form card */}
                <div className="container">
                    <span className="auth-card-mark" aria-hidden="true">▰▰▰</span>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;