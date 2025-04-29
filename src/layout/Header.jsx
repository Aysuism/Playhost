import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { useCart } from 'react-use-cart';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import { useGetSettingsQuery } from '../dashboard/tools/api/settings';
import Loader from '../preloader/Loader';

const Header = ({ togglePanel }) => {

    // ------------------------------- Language Change -----------------
    const { lang, setLang } = useContext(LangContext);
    const toggleLanguage = () => {
        setLang(prevLang => (prevLang === "AZ" ? "EN" : "AZ"));
    };

    // ------------------------------- Theme Change -----------------
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    // ------------------------------- Cart -----------------
    const { totalItems } = useCart();

    // ------------------------------- Genral Seting Logo -----------------
    const { data: settings, isLoading, isError } = useGetSettingsQuery()

    // ------------------------------- Mobile Menu -----------------
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000 && showMobileMenu) {
                setShowMobileMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showMobileMenu]);


    // ------------------------------- Logged In User -----------------

    const checkUser = () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user) {
            Swal.fire({
                title: lang === "AZ" ? "Daxil olmağınız tələb edilir" : "Login Required",
                text: lang === "AZ" ? "İstək siyahısına əlavə etmək üçün daxil olun" : "Please login to add to wishlist",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: lang === "AZ" ? "Daxil ol" : "Login",
                cancelButtonText: lang === "AZ" ? "Ləğv et" : "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/auth/login';
                }
            });
            return;
        }
    }

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const isAdmin = loggedInUser?.role === 'admin';

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('adminAccess');
        setLoggedInUser(null);
        window.location.reload();
    };




    if (isLoading) return <Loader/>;
    if (isError) return <div>Error loading settings</div>;
    if (!settings) return <div>No settings found</div>;

    return (
        <header>
            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${showMobileMenu ? 'show' : ''}`} onClick={toggleMobileMenu} />

            <nav className="navbar navbar-expand">
                {settings.map((item) => (
                    <Link key={item._id} className='navbar-brand'><img src={`https://playhost-backend.onrender.com/${item.logo}`} alt="Logo" /></Link>
                ))}
                {/* Mobile Menu Close Button (shown only when menu is open) */}
                {showMobileMenu && (
                    <button className="mobile-menu-close" onClick={toggleMobileMenu}>
                        <FaTimes />
                    </button>
                )}


                <div className={`navbar-collapse ${showMobileMenu ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        {/* Only show Dashboard link if user is an admin */}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to='/dashboard' onClick={toggleMobileMenu}>{lang === 'AZ' ? 'İdarə Paneli' : 'Dashboard'}</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Ev' : 'Home'}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/games' onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Oyunlar' : 'Games'}</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                {lang === 'AZ' ? 'Şirkət' : 'Company'}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/blog" onClick={toggleMobileMenu}>Blog</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/about" onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Haqqımızda' : 'About Us'}</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                {lang === 'AZ' ? 'Dəstək' : 'Support'}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/faq" onClick={toggleMobileMenu}>FAQ</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/contact" onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Ələqə saxla' : 'Contact Us'}</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Right Side Buttons */}
                <div className="buttons">
                    <button className="btn lang-btn" onClick={toggleLanguage}>
                        {lang === "AZ" ? "EN" : "AZ"}
                    </button>

                    <button className="btn theme-btn" onClick={toggleTheme}>
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    <button className='btn cart-btn' onClick={togglePanel}>
                        <FaCartShopping className='cart' />({totalItems})
                    </button>

                    <Link to={'/wishlist'} onClick={checkUser} className='btn heart-btn'>
                        <FaHeart className='heart' />
                    </Link>

                    {loggedInUser ? (
                        <div className="dropdown">
                            <button className="btn user-dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                👋 {loggedInUser.username}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout} > Logout </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={'/auth'} className='btn sign-in-btn'>
                            Sign in
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button className="navbar-toggler" type="button" onClick={toggleMobileMenu} aria-label="Toggle navigation" > <RiMenuFill /> </button>

            </nav>
        </header>
    );
};

export default Header;