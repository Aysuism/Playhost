import React from 'react';
import { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';

const AboutManagement = () => {
    const { lang } = useContext(LangContext);
    const navigate = useNavigate();

    return (
        <section className='about-management'>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="about-menu row g-3">
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="about-menu-item" onClick={() => navigate('/dashboard/about-management/introduction-management')}>
                                    {lang === 'AZ' ? 'Təqdimat' : 'Introduction'}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="about-menu-item" onClick={() => navigate('/dashboard/about-management/review-management')}>
                                    {lang === 'AZ' ? 'Müştəri Rəyləri' : 'Customer Reviews'}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="about-menu-item" onClick={() => navigate('/dashboard/about-management/team-management')}>
                                    {lang === 'AZ' ? 'Komanda' : 'Team'}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div className="about-menu-item" onClick={() => navigate('/dashboard/about-management/counter-management')}>
                                    {lang === 'AZ' ? 'Sayğac' : 'Counter'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutManagement;