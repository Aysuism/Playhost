import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAddServiceMutation } from '../../tools/api/home-service';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const AddServiceForm = ({ refetch }) => {
  const {lang}=useContext(LangContext)
  const [formData, setFormData] = useState({
    titleAze: '',
    titleEng: '',
    descriptionAze: '',
    descriptionEng: '',
    iconUrl: null,
  });

  const [addService, { isLoading }] = useAddServiceMutation();

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

    if (!formData.iconUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select an icon',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = new FormData();
    data.append('titleAze', formData.titleAze);
    data.append('titleEng', formData.titleEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('iconUrl', formData.iconUrl);

    try {
      await addService(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Service successfully added.',
        confirmButtonText: 'OK',
      });
      setFormData({
        titleAze: '',
        titleEng: '',
        descriptionAze: '',
        descriptionEng: '',
        iconUrl: null,
      });
      refetch();

      // Proper way to access Bootstrap modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('addServiceModal'));
      if (modal) modal.hide();
      
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong, please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm bg-light">
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="titleAze" className="form-label">{lang === 'AZ' ? 'Başlıq (Azərbaycanca)' : 'Title (Azerbaijani)'}</label>
        <input 
          type="text" 
          className="form-control dashboard-input" 
          id="titleAze" 
          name="titleAze" 
          value={formData.titleAze} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="titleEng" className="form-label">{lang === 'AZ' ? 'Başlıq (İngiliscə)' : 'Title (English)'}</label>
        <input 
          type="text" 
          className="form-control dashboard-input" 
          id="titleEng" 
          name="titleEng" 
          value={formData.titleEng} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="descriptionAze" className="form-label">{lang === 'AZ' ? 'Təsvir (Azərbaycanca)' : 'Description (Azerbaijani)'}</label>
        <textarea 
          className="form-control dashboard-textarea" 
          id="descriptionAze" 
          name="descriptionAze" 
          value={formData.descriptionAze} 
          onChange={handleChange} 
          rows="3" 
        />
      </div>

      <div className="col-md-6 mb-3">
        <label htmlFor="descriptionEng" className="form-label">{lang === 'AZ' ? 'Təsvir (İngiliscə)' : 'Description (English)'}</label>
        <textarea 
          className="form-control dashboard-textarea" 
          id="descriptionEng" 
          name="descriptionEng" 
          value={formData.descriptionEng} 
          onChange={handleChange} 
          rows="3" 
        />
      </div>

      <div className="col-12 mb-4">
        <label htmlFor="iconUrl" className="form-label">{lang === 'AZ' ? 'Xidmət İkonu' : 'Service Icon'}</label>
        <input 
          type="file" 
          className="form-control dashboard-file-input" 
          id="iconUrl" 
          name="iconUrl" 
          onChange={handleFileChange} 
          required 
        />
      </div>

      <div className="dashboard-actions">
        <button 
          type="button" 
          className="btn btn-secondary me-2" 
          data-bs-dismiss="modal"
        >
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          ) : null}
          {isLoading ? (lang === 'AZ' ? 'Əlavə edilir...' : 'Adding...') : (lang === 'AZ' ? 'Xidmət Əlavə Et' : 'Add Service')}
        </button>
      </div>
    </div>
  </form>
  );
};

export default AddServiceForm;