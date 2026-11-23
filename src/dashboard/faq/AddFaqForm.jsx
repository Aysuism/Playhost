import React, { useContext, useState } from 'react';
import { useAddFaqMutation } from '../tools/api/faq';
import { LangContext } from '../../context/LangContext';
import { notify } from '../../hooks/useNotify';

const AddFaqForm = ({ refetch, onClose }) => {
    const { lang } = useContext(LangContext);
    const [formData, setFormData] = useState({
        titleAze: '',
        titleEng: '',
        descriptionAze: '',
        descriptionEng: '',
    });

    const [addFaq, { isLoading }] = useAddFaqMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addFaq({
                titleAze: formData.titleAze,
                titleEng: formData.titleEng,
                descriptionAze: formData.descriptionAze,
                descriptionEng: formData.descriptionEng
            }).unwrap();

            notify.added();

            setFormData(prev => ({
                titleAze: '',
                titleEng: '',
                descriptionAze: '',
                descriptionEng: '',
            }));
            refetch();
            onClose();
        } catch (err) {
            console.error('Error adding faq:', err);
            notify.addFailed(err.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-3 border rounded">
            <div className="mb-3">
                <label htmlFor="titleAze" className="form-label">{lang === 'AZ' ? 'Sual (Aze)' : 'Question (Aze)'}</label>
                <input
                    type="text"
                    id="titleAze"
                    name="titleAze"
                    className="form-control"
                    value={formData.titleAze}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="titleEng" className="form-label">{lang === 'AZ' ? 'Sual (Eng)' : 'Question (Eng)'}</label>
                <input
                    type="text"
                    id="titleEng"
                    name="titleEng"
                    className="form-control"
                    value={formData.titleEng}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descriptionAze" className="form-label">{lang === 'AZ' ? 'Cavab (Aze)' : 'Answer (Aze)'}</label>
                <textarea
                    id="descriptionAze"
                    name="descriptionAze"
                    className="form-control"
                    value={formData.descriptionAze}
                    onChange={handleChange}
                    required
                    rows={3}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descriptionEng" className="form-label">{lang === 'AZ' ? 'Cavab (Eng)' : 'Answer (Eng)'}</label>
                <textarea
                    id="descriptionEng"
                    name="descriptionEng"
                    className="form-control"
                    value={formData.descriptionEng}
                    onChange={handleChange}
                    required
                    rows={3}
                />
            </div>

            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark px-4" disabled={isLoading}>
                    {isLoading ? (lang === 'AZ' ? 'Əlavə olunur...' : 'Adding...') : (lang === 'AZ' ? 'FAQ Əlavə Et' : 'Add FAQ')}
                </button>
            </div>
        </form>
    );
};

export default AddFaqForm;
