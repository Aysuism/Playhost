import React, { useContext, useState } from 'react';
import DataFaq from './DataFaq';
import AddFaqForm from './AddFaqForm';
import { useGetFaqsQuery } from '../tools/api/faq';
import { LangContext } from '../../context/LangContext';

const FAQManagement = () => {
    const { lang } = useContext(LangContext);  
    const { data: faqs=[], refetch } = useGetFaqsQuery();
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='faq-management'>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{lang === 'AZ' ? 'Yeni FAQ Əlavə Et' : 'Add New FAQ'}</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <AddFaqForm
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
                <h1>{lang === 'AZ' ? 'FAQ İdarəetməsi' : 'FAQ Management'}</h1>
                <button
                    type="button"
                    className="btn add-button"
                    onClick={() => setShowModal(true)}
                >
                    {lang === 'AZ' ? 'Yeni FAQ Əlavə Et' : 'Add New FAQ'}
                </button>
            </div>

            <DataFaq faqs={faqs} refetch={refetch} />
        </div>
    );
};

export default FAQManagement;
