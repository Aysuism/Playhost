import { useState, useContext } from 'react';
import { useEditSliderMutation } from '../../tools/api/home-slider';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const EditSliderForm = ({ slider, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    heading: slider?.heading || '',
    descriptionAze: slider?.descriptionAze || '',
    descriptionEng: slider?.descriptionEng || '',
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
    data.append('heading', formData.heading);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('price', parseFloat(formData.price));

    if (formData.backgroundImageUrl instanceof File) {
      data.append('backgroundImageUrl', formData.backgroundImageUrl);
    }

    try {
      await editSlider({ id: slider._id, formData: data }).unwrap();
      notify.updated();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      notify.updateFailed(error.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="price" className="form-label">
            {lang === 'AZ' ? 'Qiymət' : 'Price'}
          </label>
          <input type="number" step="0.01" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
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