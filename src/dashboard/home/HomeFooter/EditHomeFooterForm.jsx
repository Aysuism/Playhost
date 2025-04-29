import React, { useState } from 'react';
import { useEditHomeFooterMutation } from '../../tools/api/home-footer';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const EditHomeFooterForm = ({ footer, onClose, refetch }) => {
  const { lang } = useContext(LangContext)
  const [formData, setFormData] = useState({
    headingAze: footer?.headingAze || '',
    headingEng: footer?.headingEng || '',
    descriptionAze: footer?.descriptionAze || '',
    descriptionEng: footer?.descriptionEng || '',
    spanAze: footer?.spanAze || '',
    spanEng: footer?.spanEng || '',
    backgroundImageUrl: null,
  });

  const [editFooter, { isLoading }] = useEditHomeFooterMutation();

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
    data.append('headingAze', formData.headingAze);
    data.append('headingEng', formData.headingEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('spanAze', formData.spanAze);
    data.append('spanEng', formData.spanEng);

    if (formData.backgroundImageUrl instanceof File) {
      data.append('backgroundImageUrl', formData.backgroundImageUrl);
    }

    try {
      await editFooter({ id: footer._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Footer updated successfully!',
        timer: 2000,
        showConfirmButton: true
      });
      refetch();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.data?.message || 'Failed to update footer',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="headingAze" className="form-label">
            {lang === 'AZ' ? 'Başlıq (AZ)' : 'Heading (AZ)'}
          </label>
          <input
            name="headingAze"
            value={formData.headingAze}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="headingAze"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="headingEng" className="form-label">
            {lang === 'AZ' ? 'Başlıq (EN)' : 'Heading (EN)'}
          </label>
          <input
            name="headingEng"
            value={formData.headingEng}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="headingEng"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="spanAze" className="form-label">
            {lang === 'AZ' ? 'Span (AZ)' : 'Span (AZ)'}
          </label>
          <input
            name="spanAze"
            value={formData.spanAze}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="spanAze"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="spanEng" className="form-label">
            {lang === 'AZ' ? 'Span (EN)' : 'Span (EN)'}
          </label>
          <input
            name="spanEng"
            value={formData.spanEng}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="spanEng"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionAze" className="form-label">
          {lang === 'AZ' ? 'Açıqlama (AZ)' : 'Description (AZ)'}
        </label>
        <textarea
          name="descriptionAze"
          value={formData.descriptionAze}
          onChange={handleChange}
          className="form-control"
          id="descriptionAze"
          required
          rows="3"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionEng" className="form-label">
          {lang === 'AZ' ? 'Açıqlama (EN)' : 'Description (EN)'}
        </label>
        <textarea
          name="descriptionEng"
          value={formData.descriptionEng}
          onChange={handleChange}
          className="form-control"
          id="descriptionEng"
          required
          rows="3"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="backgroundImageUrl" className="form-label">
          {lang === 'AZ' ? 'Arxa fon şəkli' : 'Background Image'}
        </label>
        <input
          type="file"
          name="backgroundImageUrl"
          onChange={handleFileChange}
          className="form-control"
          id="backgroundImageUrl"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ?
            (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') :
            (lang === 'AZ' ? 'Footer-i Yenilə' : 'Update Footer')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export default EditHomeFooterForm;