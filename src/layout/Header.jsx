import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LangContext } from '../context/LangContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import { useGetSettingsQuery } from '../dashboard/tools/api/settings';
import { useServerCart } from '../hooks/useServerCart';
import { IoMoon, IoSunny } from 'react-icons/io5';
import Loader from '../preloader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../dashboard/tools/api/auth-slice';
import { wishlistApi } from '../dashboard/tools/api/wishlist';
import { cartApi } from '../dashboard/tools/api/cart';
import { toast } from '../components/Toaster';

const Header = ({ togglePanel }) => {
    const navigate = useNavigate();

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
    const { totalItems } = useServerCart();

    // ------------------------------- General Setting Logo -----------------
    const { data: settings, isLoading, isError } = useGetSettingsQuery();

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

    // ------------------------------- Scroll background -----------------
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ------------------------------- Logged In User -----------------
    const dispatch = useDispatch();
    const { user: loggedInUser } = useSelector((state) => state.auth);

    const isAdmin = loggedInUser?.role === 'admin';

    const handleLogout = () => {
        dispatch(logout());
        dispatch(wishlistApi.util.resetApiState());
        dispatch(cartApi.util.resetApiState());
        toast.info(lang === 'AZ' ? 'Hesabdan çıxdınız' : 'You have been logged out');
        navigate('/');
    };

    if (isLoading) return <Loader />;
    if (isError) return <div>Error loading settings</div>;
    if (!settings) return <div>No settings found</div>;

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${showMobileMenu ? 'show' : ''}`} onClick={toggleMobileMenu} />

            <nav className="navbar navbar-expand">
                <Link key={settings._id || Math.random()} className='navbar-brand' to="/">
                    <img src={`http://localhost:3333/${settings?.logo}`} alt="Logo" />
                </Link>

                {/* Mobile Menu Close Button (shown only when menu is open) */}
                {showMobileMenu && (
                    <button className="mobile-menu-close" onClick={toggleMobileMenu}>
                        <FaTimes />
                    </button>
                )}

                {/* ======================= DESKTOP VERSION ======================= */}
                <div className="desktop-nav">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav">
                            {isAdmin && (
                                <li className="nav-item">
                                    <Link className="nav-link" to='/dashboard'>{lang === 'AZ' ? 'İdarə Paneli' : 'Dashboard'}</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>{lang === 'AZ' ? 'Ev' : 'Home'}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/games'>{lang === 'AZ' ? 'Oyunlar' : 'Games'}</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {lang === 'AZ' ? 'Şirkət' : 'Company'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
                                    <li><Link className="dropdown-item" to="/about">{lang === 'AZ' ? 'Haqqımızda' : 'About Us'}</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {lang === 'AZ' ? 'Dəstək' : 'Support'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                                    <li><Link className="dropdown-item" to="/contact">{lang === 'AZ' ? 'Ələqə saxla' : 'Contact Us'}</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="buttons">
                        <button className="lang-btn" onClick={toggleLanguage}>
                            {lang === "AZ" ? "AZ" : "EN"}
                        </button>

                        <button className="theme-btn" onClick={toggleTheme}>
                            {theme === "light" ? <IoSunny color="#fff" size={20} /> : <IoMoon color="#fff" size={20} />}
                        </button>

                        {loggedInUser && (
                            <>
                                <button className='btn cart-btn' onClick={togglePanel}>
                                    <FaCartShopping className='cart' />({totalItems})
                                </button>

                                <button className='btn heart-btn' onClick={() => navigate('/wishlist')}>
                                    <FaHeart className='heart' />
                                </button>
                            </>
                        )}

                        {loggedInUser ? (
                            <div className="dropdown">
                                <button className="btn user-dropdown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {loggedInUser.username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}> Logout </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to={'/auth'} className='btn sign-in-btn'>Sign in</Link>
                        )}
                    </div>
                </div>

                {/* ======================= MOBILE VERSION ======================= */}
                <div className="mobile-nav">
                    <button className="navbar-toggler" type="button" onClick={toggleMobileMenu} aria-label="Toggle navigation">
                        <RiMenuFill />
                    </button>

                    <div className={`mobile-drawer ${showMobileMenu ? 'show' : ''}`}>
                        <ul className="navbar-nav">
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
                                <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {lang === 'AZ' ? 'Şirkət' : 'Company'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/blog" onClick={toggleMobileMenu}>Blog</Link></li>
                                    <li><Link className="dropdown-item" to="/about" onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Haqqımızda' : 'About Us'}</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {lang === 'AZ' ? 'Dəstək' : 'Support'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/faq" onClick={toggleMobileMenu}>FAQ</Link></li>
                                    <li><Link className="dropdown-item" to="/contact" onClick={toggleMobileMenu}>{lang === 'AZ' ? 'Ələqə saxla' : 'Contact Us'}</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <div className="drawer-buttons">
                            <button className="btn" onClick={toggleLanguage}>
                                {lang === "AZ" ? "AZ" : "EN"}
                            </button>

                            <button className="btn" onClick={toggleTheme}>
                                {theme === "light" ? <IoSunny size={20} /> : <IoMoon size={20} />}
                            </button>

                            {loggedInUser && (
                                <>
                                    <button className='btn' onClick={() => { setShowMobileMenu(false); togglePanel(); }}>
                                        <FaCartShopping /> ({totalItems})
                                    </button>

                                    <button className='btn' onClick={() => { setShowMobileMenu(false); navigate('/wishlist'); }}>
                                        <FaHeart />
                                    </button>
                                </>
                            )}

                            {loggedInUser ? (
                                <button className="btn" onClick={() => { setShowMobileMenu(false); handleLogout(); }}>
                                    Logout
                                </button>
                            ) : (
                                <Link to={'/auth'} className='btn' onClick={() => setShowMobileMenu(false)}>
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;