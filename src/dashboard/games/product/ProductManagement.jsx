import React, { useState, useContext } from 'react';
import DataGames from './DataGames';
import AddGamesForm from './AddGamesForm';
import { useGetGamesQuery } from '../../tools/api/games';
import { LangContext } from '../../../context/LangContext';

const ProductManagement = () => {
    const { lang } = useContext(LangContext);
    const { data: games=[],refetch } = useGetGamesQuery();
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='product-management'>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-purple text-white">
                                        <h5 className="modal-title">{lang === 'AZ' ? 'Yeni Oyun Əlavə et' : 'Add New Game'}</h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <AddGamesForm
                                            refetch={refetch}
                                            onClose={() => setShowModal(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className='p-3'>
                <h1>{lang === 'AZ' ? 'Oyun İdarəetməsi' : 'Game Management'}</h1>
                <button
                    type="button"
                    className="btn add-button"
                    onClick={() => setShowModal(true)}
                >
                    {lang === 'AZ' ? 'Yeni Oyun Əlavə et' : 'Add New Game'}
                </button>
            </div>

            <DataGames games={games || []} refetch={refetch} />
        </div>
    );
};

export default ProductManagement;
