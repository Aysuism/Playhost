import React, { useState, useContext } from 'react';
import { useEditSliderMutation } from '../../tools/api/home-slider';
import Swal from 'sweetalert2';
import { LangContext } from '../../../context/LangContext';

const EditSliderForm = ({ slider, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    gameId: slider?.gameId?.toString() || '',
    heading: slider?.heading || '',
    descriptionAze: slider?.descriptionAze || '',
    descriptionEng: slider?.descriptionEng || '',
    spanAze: slider?.spanAze || '',
    spanEng: slider?.spanEng || '',
    price: slider?.price || 0,
    backgroundImageUrl: null,
  });

  const [editSlider, { isLoading }] = useEditSliderMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, backgroundImageUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('gameId', Number(formData.gameId));
    data.append('heading', formData.heading);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('spanAze', formData.spanAze);
    data.append('spanEng', formData.spanEng);
    data.append('price', parseFloat(formData.price));

    if (formData.backgroundImageUrl instanceof File) {
      data.append('backgroundImageUrl', formData.backgroundImageUrl);
    }

    try {
      await editSlider({ id: slider._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Slayder uğurla yeniləndi!' : 'Slider updated successfully!',
        timer: 2000,
        showConfirmButton: true
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: error.data?.message || (lang === 'AZ' ? 'Slayder yenilənərkən xəta baş verdi' : 'Failed to update slider'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="gameId" className="form-label">
            {lang === 'AZ' ? 'Oyun ID' : 'Game Id'}
          </label>
          <input name="gameId" value={formData.gameId} onChange={handleChange} type="number" className="form-control" id="gameId" required min="1" step="1" />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            {lang === 'AZ' ? 'Qiymət' : 'Price'}
          </label>
          <input type="number" step="0.01" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="spanAze" className="form-label">
            {lang === 'AZ' ? 'Span (AZ)' : 'Span (Aze)'}
          </label>
          <input name="spanAze" value={formData.spanAze} onChange={handleChange} type="text" className="form-control" id="spanAze" />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="spanEng" className="form-label">
            {lang === 'AZ' ? 'Span (EN)' : 'Span (Eng)'}
          </label>
          <input name="spanEng" value={formData.spanEng} onChange={handleChange} type="text" className="form-control" id="spanEng" />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="heading" className="form-label">
          {lang === 'AZ' ? 'Slayder Başlığı' : 'Slider Heading'}
        </label>
        <input name="heading" value={formData.heading} onChange={handleChange} type="text" className="form-control" id="heading" required />
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionAze" className="form-label">
          {lang === 'AZ' ? 'Açıqlama (AZ)' : 'Description (Aze)'}
        </label>
        <input name="descriptionAze" value={formData.descriptionAze} onChange={handleChange} type="text" className="form-control" id="descriptionAze" required />
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionEng" className="form-label">
          {lang === 'AZ' ? 'Açıqlama (EN)' : 'Description (Eng)'}
        </label>
        <input name="descriptionEng" value={formData.descriptionEng} onChange={handleChange} type="text" className="form-control" id="descriptionEng" required />
      </div>

      <div className="mb-3">
        <label htmlFor="backgroundImageUrl" className="form-label">
          {lang === 'AZ' ? 'Arxa fon şəkli' : 'Background Image'}
        </label>
        <input type="file" name="backgroundImageUrl" onChange={handleFileChange} className="form-control" id="backgroundImageUrl" />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 
            (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : 
            (lang === 'AZ' ? 'Slayderi Yenilə' : 'Update Slider')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export default EditSliderForm;