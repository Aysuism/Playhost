import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { LangContext } from '../../context/LangContext';

const GamesManagement = () => {
    const { lang } = useContext(LangContext);
    const navigate = useNavigate();

    return (
        <div className="games-management">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="games-menu row g-3 pt-5">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="games-menu-item" onClick={() => navigate('/dashboard/games-management/product-management')}>
                                    {lang === 'AZ' ? 'Oyun Məhsulları' : 'Game Products'}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="games-menu-item" onClick={() => navigate('/dashboard/games-management/category-management')}>
                                    {lang === 'AZ' ? 'Kateqoriya' : 'Category'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamesManagement;
