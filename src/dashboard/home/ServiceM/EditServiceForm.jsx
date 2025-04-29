import React, { useContext, useState } from 'react';
import { useEditServiceMutation } from '../../tools/api/home-service';
import Swal from 'sweetalert2';
import { LangContext } from '../../../context/LangContext';

const EditServiceForm = ({ service, onClose, refetch }) => {
    const { lang } = useContext(LangContext)

    const [formData, setFormData] = useState({
        titleAze: service?.titleAze || '',
        titleEng: service?.titleEng || '',
        descriptionAze: service?.descriptionAze || '',
        descriptionEng: service?.descriptionEng || '',
        iconUrl: null,
    });

    const [editService, { isLoading }] = useEditServiceMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, iconUrl: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('titleAze', formData.titleAze);
        data.append('titleEng', formData.titleEng);
        data.append('descriptionAze', formData.descriptionAze);
        data.append('descriptionEng', formData.descriptionEng);

        if (formData.iconUrl instanceof File) {
            data.append('iconUrl', formData.iconUrl);
        }

        try {
            await editService({ id: service._id, formData: data }).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Service updated successfully!',
                timer: 2000,
                showConfirmButton: true
            });
            refetch();
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.data?.message || 'Failed to update service',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="titleAze" className="form-label">{lang === 'AZ' ? 'Başlıq (Azərbaycanca)' : 'Title (Azerbaijani)'}</label>
                    <input type="text" className="form-control" id="titleAze" name="titleAze" value={formData.titleAze} onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="titleEng" className="form-label">{lang === 'AZ' ? 'Başlıq (İngiliscə)' : 'Title (English)'}</label>
                    <input type="text" className="form-control" id="titleEng" name="titleEng" value={formData.titleEng} onChange={handleChange} required />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="descriptionAze" className="form-label">{lang === 'AZ' ? 'Təsvir (Azərbaycanca)' : 'Description (Azerbaijani)'}</label>
                    <textarea className="form-control" id="descriptionAze" name="descriptionAze" value={formData.descriptionAze} onChange={handleChange} rows="3" required />
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="descriptionEng" className="form-label">{lang === 'AZ' ? 'Təsvir (İngiliscə)' : 'Description (English)'}</label>
                    <textarea className="form-control" id="descriptionEng" name="descriptionEng" value={formData.descriptionEng} onChange={handleChange} rows="3" required />
                </div>

                <div className="col-12 mb-4">
                    <label htmlFor="iconUrl" className="form-label">{lang === 'AZ' ? 'İkon' : 'Icon'}</label>
                    <input type="file" className="form-control" id="iconUrl" name="iconUrl" onChange={handleFileChange} accept="image/*" />
                    {service.iconUrl && (
                        <small className="text-muted">
                            {lang === 'AZ' ? 'Cari: ' : 'Current: '}{service.iconUrl.split('/').pop()}
                        </small>
                    )}
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : (lang === 'AZ' ? 'Yenilə' : 'Update')}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditServiceForm;