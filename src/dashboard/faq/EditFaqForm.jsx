import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useEditFaqMutation } from '../tools/api/faq';
import { LangContext } from '../../context/LangContext';

const EditFaqForm = ({ faq, onClose, refetch }) => {  
    const { lang } = useContext(LangContext); 
    const [formData, setFormData] = useState({
        questionId: '',
        titleAze: '',
        titleEng: '',
        descriptionAze: '',
        descriptionEng: '',
    });

    const [editFaq, { isLoading }] = useEditFaqMutation();

    // Initialize form data when faq prop changes
    useEffect(() => {
        if (faq) {
            setFormData({
                questionId: faq.questionId || '',
                titleAze: faq.titleAze || '',
                titleEng: faq.titleEng || '',
                descriptionAze: faq.descriptionAze || '',
                descriptionEng: faq.descriptionEng || '',
            });
        }
    }, [faq]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === 'questionId' ? Number(value) : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!faq || !faq._id) {
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: lang === 'AZ' ? 'Yanlış FAQ məlumatı' : 'Invalid FAQ data',
            });
            return;
        }

        try {
            await editFaq({ 
                id: faq._id,
                ...formData
            }).unwrap();

            Swal.fire({
                icon: 'success',
                title: lang === 'AZ' ? 'Uğur!' : 'Success!',
                text: lang === 'AZ' ? 'FAQ uğurla yeniləndi.' : 'FAQ updated successfully!',
                timer: 2000,
                showConfirmButton: false
            });
            refetch();
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: error.data?.message || (lang === 'AZ' ? 'FAQ yenilənə bilmədi' : 'Failed to update FAQ'),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-4 border rounded">
            <div className="mb-3">
                <label htmlFor="questionId" className="form-label">{lang === 'AZ' ? 'Sual ID' : 'Question ID'}</label>
                <input 
                    type="number" 
                    id="questionId" 
                    name="questionId" 
                    className="form-control" 
                    value={formData.questionId} 
                    onChange={handleChange} 
                    placeholder={lang === 'AZ' ? 'Sual ID daxil edin' : 'Enter question ID'}
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
                    placeholder={lang === 'AZ' ? 'Sualı Azərbaycan dilində daxil edin' : 'Enter question in Azerbaijani'}
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
                    placeholder={lang === 'AZ' ? 'Sualı İngilis dilində daxil edin' : 'Enter question in English'}
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
                    placeholder={lang === 'AZ' ? 'Cavabı Azərbaycan dilində daxil edin' : 'Enter answer in Azerbaijani'}
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
                    placeholder={lang === 'AZ' ? 'Cavabı İngilis dilində daxil edin' : 'Enter answer in English'}
                    required
                    rows={3}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : (lang === 'AZ' ? 'FAQ Yenilə' : 'Update FAQ')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
                </button>
            </div>
        </form>
    );
};

export default EditFaqForm;
