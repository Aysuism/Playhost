import React, { useState, useContext } from 'react';
import { useEditCounterMutation } from '../../tools/api/about-counter';
import Swal from 'sweetalert2';
import { LangContext } from '../../../context/LangContext';

const EditCounterForm = ({ counter, onClose, refetch }) => {
  const { lang } = useContext(LangContext);

  const [formData, setFormData] = useState({
    headingAze: counter.headingAze,
    headingEng: counter.headingEng,
    value: counter.value,
  });

  const [editCounter, { isLoading }] = useEditCounterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editCounter({ 
        id: counter._id, 
        formData: {
          headingAze: formData.headingAze,
          headingEng: formData.headingEng,
          value: formData.value
        },
        isJson: true
      }).unwrap();

      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Sayğac uğurla yeniləndi!' : 'Counter updated successfully!',
        timer: 2000,
        showConfirmButton: true
      });
      refetch();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: error?.data?.message || (lang === 'AZ' ? 'Sayğacı yeniləmək mümkün olmadı' : 'Failed to update counter'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {lang === 'AZ' ? 'Başlıq (AZ)' : 'Heading (AZ)'}
          </label>
          <input name="headingAze" value={formData.headingAze} onChange={handleChange} 
                 className="form-control" required />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {lang === 'AZ' ? 'Başlıq (EN)' : 'Heading (EN)'}
          </label>
          <input name="headingEng" value={formData.headingEng} onChange={handleChange} 
                 className="form-control" required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          {lang === 'AZ' ? 'Dəyər' : 'Value'}
        </label>
        <input name="value" type="number" value={formData.value} onChange={handleChange} 
               className="form-control" required />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading
            ? lang === 'AZ' ? 'Yenilənir...' : 'Updating...'
            : lang === 'AZ' ? 'Sayğacı Yenilə' : 'Update Counter'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export default EditCounterForm;
