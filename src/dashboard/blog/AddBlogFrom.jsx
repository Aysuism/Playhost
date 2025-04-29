import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useAddBlogMutation } from '../tools/api/blog';
import { LangContext } from '../../context/LangContext';

const AddBlogForm = ({ refetch, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    titleAze: '',
    titleEng: '',
    descriptionAze: '',
    descriptionEng: '',
    imageUrl: null,
  });

  const [addBlog, { isLoading }] = useAddBlogMutation();

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

    if (!formData.imageUrl) {
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: lang === 'AZ' ? 'Zəhmət olmasa şəkil seçin' : 'Please select an image',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = new FormData();
    data.append('titleAze', formData.titleAze);
    data.append('titleEng', formData.titleEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('imageUrl', formData.imageUrl);

    try {
      await addBlog(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Bloq əlavə olundu.' : 'Blog successfully added.',
        confirmButtonText: 'OK',
      });
      setFormData({
        titleAze: '',
        titleEng: '',
        descriptionAze: '',
        descriptionEng: '',
        imageUrl: null,
      });
      refetch();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: lang === 'AZ' ? 'Bir xəta baş verdi, yenidən cəhd edin.' : 'Something went wrong, please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="titleAze" className="form-label">{lang === 'AZ' ? 'Başlıq (Az)' : 'Title (Az)'}</label>
          <input type="text" className="form-control" id="titleAze" name="titleAze" value={formData.titleAze} onChange={handleChange} required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="titleEng" className="form-label">{lang === 'AZ' ? 'Başlıq (En)' : 'Title (En)'}</label>
          <input type="text" className="form-control" id="titleEng" name="titleEng" value={formData.titleEng} onChange={handleChange} required />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="descriptionAze" className="form-label">{lang === 'AZ' ? 'Təsvir (Az)' : 'Description (Az)'}</label>
          <textarea className="form-control" id="descriptionAze" name="descriptionAze" value={formData.descriptionAze} onChange={handleChange} rows="2" />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="descriptionEng" className="form-label">{lang === 'AZ' ? 'Təsvir (En)' : 'Description (En)'}</label>
          <textarea className="form-control" id="descriptionEng" name="descriptionEng" value={formData.descriptionEng} onChange={handleChange} rows="2" />
        </div>

        <div className="col-md-12 mb-4">
          <label htmlFor="image" className="form-label">{lang === 'AZ' ? 'Şəkil' : 'Image'}</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} required />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-dark px-4" disabled={isLoading}>
            {isLoading ? (lang === 'AZ' ? 'Əlavə olunur...' : 'Adding...') : (lang === 'AZ' ? 'Bloq Əlavə Et' : 'Add Blog')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlogForm;
