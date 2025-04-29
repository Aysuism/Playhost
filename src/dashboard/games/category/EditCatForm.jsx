import React, { useState, useContext } from 'react';
import { useEditCategoryMutation } from '../../tools/api/games-category';
import Swal from 'sweetalert2';
import { LangContext } from '../../../context/LangContext';

const EditCatForm = ({ category, onClose, refetch }) => {
    const { lang } = useContext(LangContext);  // Accessing lang from context
    const [formData, setFormData] = useState({
        category: category.category,
        categoryId: category.categoryId
    });

    const [editCategory, { isLoading }] = useEditCategoryMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'categoryId' ? Number(value) || '' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send as a regular object instead of FormData
            await editCategory({ 
                id: category._id, 
                category: formData.category,
                categoryId: formData.categoryId
            }).unwrap();
            
            Swal.fire({
                icon: 'success',
                title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
                text: lang === 'AZ' ? 'Kateqoriya uğurla yeniləndi!' : 'Category updated successfully!',
                timer: 2000,
                showConfirmButton: false
            });
            
            onClose();
            refetch();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: error.data?.message || (lang === 'AZ' ? 'Kateqoriya yenilənərkən xətaya yol verildi' : 'Failed to update category'),
            });
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

            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">{lang === 'AZ' ? 'Kateqoriya ID' : 'Category ID'}</label>
                <input
                    type="number"
                    className="form-control"
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    min="1"
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
