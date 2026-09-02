import React, { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';

const HomeManagement = () => {
    const navigate = useNavigate();
    const { lang } = useContext(LangContext);

    return (
        <section className='home-management'>
            <div className='container-fluid'>
                <div className="row home-menu">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 d-flex justify-content-center">
                        <div className="home-menu-item" onClick={() => navigate('/dashboard/home-management/slider-management')}>
                            {lang === 'AZ' ? 'Hero Slayder' : 'Hero Slider'}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 d-flex justify-content-center">
                        <div className="home-menu-item" onClick={() => navigate('/dashboard/home-management/home-footer-management')}>
                            {lang === 'AZ' ? 'Əsas Footer' : 'Home Footer'}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 d-flex justify-content-center">
                        <div className="home-menu-item" onClick={() => navigate('/dashboard/home-management/service-management')}>
                            {lang === 'AZ' ? 'Xidmətlər' : 'Hero Services'}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 d-flex justify-content-center">
                        <div className="home-menu-item" onClick={() => navigate('/dashboard/home-management/payment-management')}>
                            {lang === 'AZ' ? 'Ödəniş Xidmətləri' : 'Payment Services'}
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default HomeManagement;