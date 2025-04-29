import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useAddFaqMutation } from '../tools/api/faq';
import { LangContext } from '../../context/LangContext';

const AddFaqForm = ({ refetch, onClose }) => {
    const { lang } = useContext(LangContext);  
    const [formData, setFormData] = useState({
        questionId: 1,
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
            // Send as plain JSON object instead of FormData
            await addFaq({
                questionId: Number(formData.questionId),
                titleAze: formData.titleAze,
                titleEng: formData.titleEng,
                descriptionAze: formData.descriptionAze,
                descriptionEng: formData.descriptionEng
            }).unwrap();

            Swal.fire({
                icon: 'success',
                title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
                text: lang === 'AZ' ? 'FAQ uğurla əlavə edildi.' : 'FAQ successfully added.',
                confirmButtonText: 'OK',
            });

            setFormData(prev => ({
                questionId: prev.questionId + 1,
                titleAze: '',
                titleEng: '',
                descriptionAze: '',
                descriptionEng: '',
            }));
            refetch();
            onClose();
        } catch (err) {
            console.error('Error adding faq:', err);
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: err.data?.message || (lang === 'AZ' ? 'FAQ əlavə edilmədi' : 'Failed to add FAQ'),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-3 border rounded">
            <div className="mb-3">
                <label htmlFor="questionId" className="form-label">{lang === 'AZ' ? 'Sual ID' : 'Question ID'}</label>
                <input
                    type="number"
                    id="questionId"
                    name="questionId"
                    className="form-control"
                    value={formData.questionId}
                    onChange={handleChange}
                    required
                    min="1"
                />
            </div>
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
