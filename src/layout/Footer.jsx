import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CgArrowLongRight } from "react-icons/cg";
import { LangContext } from '../context/LangContext';
import { useGetSettingsQuery } from '../dashboard/tools/api/settings';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { useGetGamesQuery } from '../dashboard/tools/api/games';
import slugify from 'slugify';

const Footer = () => {
    const { lang } = useContext(LangContext);
    const currentYear = new Date().getFullYear();
    const { data: settings=[] } = useGetSettingsQuery();
    const { data: games=[] } = useGetGamesQuery()
    console.log(settings);
    console.log(games);

    return (
        <footer>
            <div className="container-fluid">
                {settings.map((item) => (
                    <div key={item._id} className="row d-flex justify">
                        {/* Logo Section */}
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <Link to='/'><img src={`https://playhost-backend.onrender.com/${item.logo}`} alt="Logo" /></Link>
                            <p>
                                {lang === 'AZ'
                                    ? item.descriptionAze
                                    : item.descriptionEng
                                }
                            </p>
                        </div>

                        {/* Game Server Section */}
                        <div className="col-lg-2 col-md-6 col-sm-6 mb-3">
                            <h5>{lang === 'AZ' ? 'Oyun Serverləri' : 'Game Server'}</h5>
                            <ul className="nav flex-column p-0">
                                {games.slice(0, 5).map((item) => (
                                    <li className="nav-item mb-2" key={item._id}>
                                        <Link to={`/games/${slugify(item.gameName, { lower: true })}`} className='nav-link p-0'>{item.gameName}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pages Section */}
                        <div className="col-lg-2 col-md-6 col-sm-6 mb-3">
                            <h5>{lang === 'AZ' ? 'Səhifələr' : 'Pages'}</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2"><Link to={'/'} className="nav-link p-0">{lang === 'AZ' ? 'Əsas Səhifə' : 'Home'}</Link></li>
                                <li className="nav-item mb-2"><Link to={'/games'} className="nav-link p-0">{lang === 'AZ' ? 'Oyunlar' : 'Games'}</Link></li>
                                <li className="nav-item mb-2"><Link to={'/contact'} className="nav-link p-0">{lang === 'AZ' ? 'Dəstək' : 'Support'}</Link></li>
                                <li className="nav-item mb-2"><Link to={'/faq'} className="nav-link p-0">{lang === 'AZ' ? 'Tez-tez verilən suallar' : 'FAQs'}</Link></li>
                                <li className="nav-item mb-2"><Link to={'/about'} className="nav-link p-0">{lang === 'AZ' ? 'Haqqımızda' : 'About Us'}</Link></li>
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                            <form>
                                <h5>{lang === 'AZ' ? 'Bültenimizə abunə olun' : 'Subscribe to our newsletter'}</h5>
                                <p>{lang === 'AZ' ? 'Hər ay bizdən nə yeniliklər olduğunu oxuyun.' : 'Monthly digest of what\'s new and exciting from us.'}</p>
                                <div className="d-flex flex-column flex-sm-row w-100">
                                    <label htmlFor="newsletter1" className="visually-hidden">{lang === 'AZ' ? 'E-poçt ünvanı' : 'Email address'}</label>
                                    <div className="email-bar">
                                        <input id="newsletter1" type="text" className="form-control" placeholder={lang === 'AZ' ? 'E-poçt ünvanınızı daxil edin' : 'Email address'} />
                                        <button className="email-btn" type="button">
                                            <CgArrowLongRight className='right-arrow' />
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="follow-us">
                                <a href={item.socialMedia.twitterBtnUrl}><FaXTwitter className='icon' /></a>
                                <a href={item.socialMedia.facebookBtnUrl}><FaFacebookF className='icon' /></a>
                                <a href={item.socialMedia.tiktokBtnUrl}><FaTiktok className='icon' /></a>
                                <a href={item.socialMedia.instagramBtnUrl}><FaInstagram className='icon' /></a>
                                <a href={item.socialMedia.whatsappBtnUrl}><FaDiscord className='icon' /></a>
                            </div>
                        </div>

                        {/* Terms and Conditions Section */}
                        <div className="terms-and-conditions">
                            <p>Copyright {currentYear} - Playhost by Designesia</p>
                            <p>
                                <span>{lang === 'AZ' ? 'Şərtlər və Qaydalar' : 'Terms & Conditions'}</span>
                                <span>{lang === 'AZ' ? 'Gizlilik Siyasəti' : 'Privacy Policy'}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
