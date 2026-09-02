import React from 'react'
import { useState } from 'react'
import { useAddHomeFooterMutation } from '../../tools/api/home-footer'

const AddHomeFooterForm = ({ refetch }) => {
  const [formData, setFormData] = useState({
    headingAze: '',
    headingEng: '',
    descriptionAze: '',
    descriptionEng: '',
    spanAze: '',
    spanEng: '',
    backgroundImageUrl: null,
  })

  const [addFooter, { isLoading }] = useAddHomeFooterMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, backgroundImageUrl: file });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.backgroundImageUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select an image for the slider.',
        confirmButtonText: 'OK',
      });
      return;
    }
addFooter
    const data = new FormData()
    data.append('headingAze', formData.headingAze);
    data.append('headingEng', formData.headingEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);
    data.append('spanAze', formData.spanAze);
    data.append('spanEng', formData.spanEng);
    data.append('backgroundImageUrl', formData.backgroundImageUrl);

    try {
      await addFooter(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Slider successfully added.',
        confirmButtonText: 'OK',
      });
      setFormData({
        headingAze: '',
        headingEng: '',
        descriptionAze: '',
        descriptionEng: '',
        spanAze: '',
        spanEng: '',
        backgroundImageUrl: null,
      });
      refetch();
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
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h4 className="mb-4">Add Home Footer</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label htmlFor="headingAze" className="form-label">HeadingAze</label>
            <input name="headingAze" value={formData.headingAze} onChange={handleChange} type="text" className="form-control" id="headingAze" required />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label htmlFor="headingEng" className="form-label">HeadingEng</label>
            <input name="headingEng" value={formData.heading} onChange={handleChange} type="text" className="form-control" id="headingEng" required />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="spanAze" className="form-label">Span (Aze)</label>
          <input name="spanAze" value={formData.spanAze} onChange={handleChange} type="text" className="form-control" id="spanAze" />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="spanEng" className="form-label">Span (Eng)</label>
          <input name="spanEng" value={formData.spanEng} onChange={handleChange} type="text" className="form-control" id="spanEng" />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionAze" className="form-label">Description (Aze)</label>
        <input name="descriptionAze" value={formData.descriptionAze} onChange={handleChange} type="text" className="form-control" id="descriptionAze" required />
      </div>

      <div className="mb-3">
        <label htmlFor="descriptionEng" className="form-label">Description (Eng)</label>
        <input name="descriptionEng" value={formData.descriptionEng} onChange={handleChange} type="text" className="form-control" id="descriptionEng" required />
      </div>

      <div className="mb-3">
        <label htmlFor="backgroundImageUrl" className="form-label">Background Image</label>
        <input type="file" name="backgroundImageUrl" onChange={handleFileChange} className="form-control" id="backgroundImageUrl" />
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-dark px-4" disabled={isLoading} >
          {isLoading ? 'Adding...' : 'Add Slider'}
        </button>
      </div>
    </form>
  );
};

export default AddHomeFooterForm