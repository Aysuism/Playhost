import React, { useState } from 'react';
import { useEditIntroductionMutation } from '../../tools/api/about-introduction';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const EditIntroductionForm = ({ introduction, onClose, refetch }) => {
  const { lang } = useContext(LangContext)
  const [formData, setFormData] = useState({
    spanAze: introduction.spanAze || '',
    spanEng: introduction.spanEng || '',
    headingAze: introduction.headingAze || '',
    headingEng: introduction.headingEng || '',
    descriptionAze: introduction.descriptionAze || '',
    descriptionEng: introduction.descriptionEng || '',
    imageUrl: null,
    titleFirstAze: introduction.titleFirstAze || '',
    titleFirstEng: introduction.titleFirstEng || '',
    subdescriptionFirstAze: introduction.subdescriptionFirstAze || '',
    subdescriptionFirstEng: introduction.subdescriptionFirstEng || '',
    titleSecondAze: introduction.titleSecondAze || '',
    titleSecondEng: introduction.titleSecondEng || '',
    subdescriptionSecondAze: introduction.subdescriptionSecondAze || '',
    subdescriptionSecondEng: introduction.subdescriptionSecondEng || '',
  });

  const [editIntroduction, { isLoading }] = useEditIntroductionMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all text fields
    data.append('spanAze', formData.spanAze);
    data.append('spanEng', formData.spanEng);
    data.append('headingAze', formData.headingAze);
    data.append('headingEng', formData.headingEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('titleFirstAze', formData.titleFirstAze);
    data.append('titleFirstEng', formData.titleFirstEng);
    data.append('subdescriptionFirstAze', formData.subdescriptionFirstAze);
    data.append('subdescriptionFirstEng', formData.subdescriptionFirstEng);
    data.append('titleSecondAze', formData.titleSecondAze);
    data.append('titleSecondEng', formData.titleSecondEng);
    data.append('subdescriptionSecondAze', formData.subdescriptionSecondAze);
    data.append('subdescriptionSecondEng', formData.subdescriptionSecondEng);

    // Append image if exists
    if (formData.imageUrl) {
      data.append('imageUrl', formData.imageUrl);
    }

    try {
      await editIntroduction({ id: introduction._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Introduction updated successfully!',
        timer: 2000,
        showConfirmButton: true
      });
      refetch();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.data?.message || 'Failed to update introduction',
      });
    }
  };

  return (
    <div className="col-lg-12">
      <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
        <div className="row">
          {/* Span Fields */}
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Span (AZ)' : 'Span (AZ)'}</label>
            <input name="spanAze" value={formData.spanAze} onChange={handleChange}
              className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Span (EN)' : 'Span (EN)'}</label>
            <input name="spanEng" value={formData.spanEng} onChange={handleChange}
              className="form-control" />
          </div>
        </div>

        {/* Heading Fields */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (AZ)' : 'Heading (AZ)'}</label>
            <input name="headingAze" value={formData.headingAze} onChange={handleChange}
              className="form-control" required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (EN)' : 'Heading (EN)'}</label>
            <input name="headingEng" value={formData.headingEng} onChange={handleChange}
              className="form-control" required />
          </div>
        </div>

        {/* Description Fields */}
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">{lang === 'AZ' ? 'Təsvir (AZ)' : 'Description (AZ)'}</label>
              <textarea name="descriptionAze" value={formData.descriptionAze} onChange={handleChange}
                className="form-control" rows="3" required />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">{lang === 'AZ' ? 'Təsvir (EN)' : 'Description (EN)'}</label>
              <textarea name="descriptionEng" value={formData.descriptionEng} onChange={handleChange}
                className="form-control" rows="3" required />
            </div>
          </div>
        </div>

        {/* First Section */}
        <h5 className="mt-4">{lang === 'AZ' ? 'Birinci Bölmə' : 'First Section'}</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (AZ)' : 'Title (AZ)'}</label>
            <input name="titleFirstAze" value={formData.titleFirstAze} onChange={handleChange}
              className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (EN)' : 'Title (EN)'}</label>
            <input name="titleFirstEng" value={formData.titleFirstEng} onChange={handleChange}
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Alt təsvir (AZ)' : 'Subdescription (AZ)'}</label>
            <textarea name="subdescriptionFirstAze" value={formData.subdescriptionFirstAze}
              onChange={handleChange} className="form-control" rows="2" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Alt təsvir (EN)' : 'Subdescription (EN)'}</label>
            <textarea name="subdescriptionFirstEng" value={formData.subdescriptionFirstEng}
              onChange={handleChange} className="form-control" rows="2" />
          </div>
        </div>

        {/* Second Section */}
        <h5 className="mt-4">{lang === 'AZ' ? 'İkinci Bölmə' : 'Second Section'}</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (AZ)' : 'Title (AZ)'}</label>
            <input name="titleSecondAze" value={formData.titleSecondAze} onChange={handleChange}
              className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Başlıq (EN)' : 'Title (EN)'}</label>
            <input name="titleSecondEng" value={formData.titleSecondEng} onChange={handleChange}
              className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Alt təsvir (AZ)' : 'Subdescription (AZ)'}</label>
            <textarea name="subdescriptionSecondAze" value={formData.subdescriptionSecondAze}
              onChange={handleChange} className="form-control" rows="2" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">{lang === 'AZ' ? 'Alt təsvir (EN)' : 'Subdescription (EN)'}</label>
            <textarea name="subdescriptionSecondEng" value={formData.subdescriptionSecondEng}
              onChange={handleChange} className="form-control" rows="2" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="form-label">{lang === 'AZ' ? 'Şəkil' : 'Image'}</label>
          <input type="file" onChange={handleFileChange} className="form-control" />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : (lang === 'AZ' ? 'Təqdimatı Yenilə' : 'Update Introduction')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIntroductionForm;