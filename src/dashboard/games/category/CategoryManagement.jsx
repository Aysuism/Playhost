import React, { useState, useContext } from 'react';
import DataCat from './DataCat';
import AddCatForm from './AddCatForm';
import { useGetCategoryQuery } from '../../tools/api/games-category';
import { LangContext } from '../../../context/LangContext';

const CategoryManagement = () => {
    const { lang } = useContext(LangContext);
    const { data: categories=[], refetch } = useGetCategoryQuery();
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='category-management'>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{lang === 'AZ' ? 'Yeni Kateqoriya Əlavə et' : 'Add New Category'}</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <AddCatForm
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
                <h1>{lang === 'AZ' ? 'Kateqoriya İdarəetməsi' : 'Category Management'}</h1>
                <button
                    type="button"
                    className="btn add-button"
                    onClick={() => setShowModal(true)}
                >
                    {lang === 'AZ' ? 'Yeni Kateqoriya Əlavə et' : 'Add New Category'}
                </button>
            </div>

            <DataCat categories={categories} refetch={refetch} />
        </div>
    );
};

export default CategoryManagement;
