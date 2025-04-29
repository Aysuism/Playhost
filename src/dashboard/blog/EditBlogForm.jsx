import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useEditBlogMutation } from '../tools/api/blog';
import { LangContext } from '../../context/LangContext';

const EditBlogForm = ({ blogs, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    titleAze: blogs.titleAze,
    titleEng: blogs.titleEng,
    descriptionAze: blogs.descriptionAze,
    descriptionEng: blogs.descriptionEng,
    imageUrl: null,
  });

  const [editBlog, { isLoading }] = useEditBlogMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('titleAze', formData.titleAze);
    data.append('titleEng', formData.titleEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);

    if (formData.imageUrl instanceof File) {
      data.append('imageUrl', formData.imageUrl);
    }

    try {
      await editBlog({ id: blogs._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğur!' : 'Success!',
        text: lang === 'AZ' ? 'Blog uğurla redaktə edildi.' : 'Blog successfully edited.',
        confirmButtonText: 'OK',
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: lang === 'AZ' ? 'Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.' : 'Something went wrong, please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm bg-light">
      <div className="row">
        <div className="col-md-6 col-md-6 col-sm-12 mb-3">
          <label htmlFor="titleAze" className="form-label">
            {lang === 'AZ' ? 'Başlıq (AZ)' : 'Title (AZ)'}
          </label>
          <input 
            type="text" 
            className="form-control" 
            id="titleAze" 
            name="titleAze" 
            value={formData.titleAze} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-md-6 col-md-6 col-sm-12 mb-3">
          <label htmlFor="titleEng" className="form-label">
            {lang === 'AZ' ? 'Başlıq (EN)' : 'Title (EN)'}
          </label>
          <input 
            type="text" 
            className="form-control" 
            id="titleEng" 
            name="titleEng" 
            value={formData.titleEng} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="descriptionAze" className="form-label">
            {lang === 'AZ' ? 'Təsvir (AZ)' : 'Description (AZ)'}
          </label>
          <textarea 
            className="form-control" 
            id="descriptionAze" 
            name="descriptionAze" 
            value={formData.descriptionAze} 
            onChange={handleChange} 
            rows="2" 
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="descriptionEng" className="form-label">
            {lang === 'AZ' ? 'Təsvir (EN)' : 'Description (EN)'}
          </label>
          <textarea 
            className="form-control" 
            id="descriptionEng" 
            name="descriptionEng" 
            value={formData.descriptionEng} 
            onChange={handleChange} 
            rows="2" 
          />
        </div>

        <div className="col-md-12 mb-4">
          <label htmlFor="imageUrl" className="form-label">
            {lang === 'AZ' ? 'Şəkil' : 'Image'}
          </label>
          <input 
            type="file" 
            className="form-control" 
            id="imageUrl" 
            name="imageUrl" 
            onChange={handleFileChange} 
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 
              (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : 
              (lang === 'AZ' ? 'Blogu Yenilə' : 'Update Blog')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditBlogForm;