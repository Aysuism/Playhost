import { useState, useContext } from 'react';
import { useAddCategoryMutation } from '../../tools/api/games-category';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const AddCatForm = ({ refetch, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    category: '',
  });

  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category.trim()) {
      notify.error('Kateqoriya adı tələb olunur', 'Category name is required');
      return;
    }

    try {
      await addCategory({
        category: formData.category.trim(),
      }).unwrap();

      notify.added();

      setFormData({ category: '' });
      refetch();
      if (onClose) onClose();
    } catch (err) {
      console.error('Error adding category:', err);
      notify.addFailed(err.data?.message);
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