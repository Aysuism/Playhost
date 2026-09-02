import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useAddCategoryMutation } from '../../tools/api/games-category';
import { LangContext } from '../../../context/LangContext';

const AddCatForm = ({ refetch }) => {
  const { lang } = useContext(LangContext);  // Accessing lang from context
  const [formData, setFormData] = useState({
    category: '',
    categoryId: '',
  });

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoryId' ? Number(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      Swal.fire(lang === 'AZ' ? 'Xəta!' : 'Error!', lang === 'AZ' ? 'Kateqoriya adı tələb olunur' : 'Category name is required', 'error');
      return;
    }

    if (!formData.categoryId) {
      Swal.fire(lang === 'AZ' ? 'Xəta!' : 'Error!', lang === 'AZ' ? 'Kateqoriya ID-si tələb olunur' : 'Category ID is required', 'error');
      return;
    }

    try {
      // Send as regular JSON object instead of FormData
      await addCategory({
        category: formData.category.trim(),
        categoryId: formData.categoryId
      }).unwrap();
      
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Kateqoriya uğurla əlavə olundu' : 'Category added successfully',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Reset form and refetch data
      setFormData({
        category: '',
        categoryId: '',
      });
      refetch();
    } catch (err) {
      console.error('Error adding category:', err);
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: err.data?.message || (lang === 'AZ' ? 'Kateqoriya əlavə olunarkən xətaya yol verildi' : 'Failed to add category'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-3 border rounded">
      
      <div className="mb-3">
        <label htmlFor="category" className="form-label">{lang === 'AZ' ? 'Kateqoriya Adı' : 'Category Name'}</label>
        <input
          type="text"
          id="category"
          name="category"
          className="form-control"
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
          id="categoryId"
          name="categoryId"
          className="form-control"
          value={formData.categoryId}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      <div className="d-flex justify-content-end">
        <button 
          type="submit" 
          className="btn btn-primary px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {lang === 'AZ' ? 'Əlavə olunur...' : 'Adding...'}
            </>
          ) : (lang === 'AZ' ? 'Kateqoriya Əlavə et' : 'Add Category')}
        </button>
      </div>
    </form>
  );
};

export default AddCatForm;
