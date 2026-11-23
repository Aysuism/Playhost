import { useState, useContext } from 'react';
import { useEditCategoryMutation } from '../../tools/api/games-category';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const EditCatForm = ({ category, onClose, refetch }) => {
    const { lang } = useContext(LangContext);
    const [formData, setFormData] = useState({
        category: category.category,
    });

    const [editCategory, { isLoading }] = useEditCategoryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editCategory({
                id: category._id,
                category: formData.category,
            }).unwrap();

            notify.updated();

            onClose();
            refetch();
        } catch (error) {
            console.error('Error:', error);
            notify.updateFailed(error.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
            <div className="mb-3">
                <label htmlFor="category" className="form-label">{lang === 'AZ' ? 'Kateqoriya Adı' : 'Category Name'}</label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    maxLength={50}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            {lang === 'AZ' ? 'Yenilənir...' : 'Updating...'}
                        </>
                    ) : (lang === 'AZ' ? 'Kateqoriyanı Yenilə' : 'Update Category')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
                </button>
            </div>
        </form>
    );
};

export default EditCatForm;