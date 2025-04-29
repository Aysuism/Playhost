import React from 'react';
import { useGetSlidersQuery } from '../../tools/api/home-slider';
import DataSlider from './DataSlider';
import AddSliderForm from './AddSliderForm';
import { useState } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const SliderManagement = () => {
    const { lang } = useContext(LangContext)
    const { data: sliders=[],refetch } = useGetSlidersQuery();
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='slider-management'>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">  {lang === 'AZ' ? 'Yeni Slayder Əlavə Et' : 'Add New Slider'}</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <AddSliderForm
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
                <h1>{lang === 'AZ' ? 'Slayder İdarəsi' : 'Slider Management'}</h1>
                <button type="button" className="btn add-button" onClick={() => setShowModal(true)} >
                    {lang === 'AZ' ? 'Yeni Slayder Əlavə Et' : 'Add New Slider'}
                </button>
            </div>

            <DataSlider sliders={sliders} refetch={refetch} />
        </div>
    );
};

export default SliderManagement;