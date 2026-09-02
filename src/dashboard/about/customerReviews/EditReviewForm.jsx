import React, { useState } from 'react';
import { useEditReviewMutation } from '../../tools/api/about-review';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const EditReviewForm = ({ review, onClose, refetch }) => {
  const { lang } = useContext(LangContext)
  const [formData, setFormData] = useState({
    fullname: review.fullname,
    comment: review.comment,
    reyting: review.reyting,
    avatarUrl: null,
  });

  const [editReview, { isLoading }] = useEditReviewMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatarUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await editReview({ id: review._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Review updated successfully!',
        timer: 2000,
        showConfirmButton: true
      });
      refetch();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.data?.message || 'Failed to update review',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded">
      <div className="col-md-6 mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Tam Ad' : 'Full Name'}</label>
        <input
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Reytinq (1-5)' : 'Rating (1-5)'}</label>
        <input
          name="reyting"
          type="number"
          min="1"
          max="5"
          value={formData.reyting}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Rəy' : 'Comment'}</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="form-control"
          rows="3"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Profil Şəkli' : 'Avatar Image'}</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            lang === 'AZ' ? 'Yenilənir...' : 'Updating...'
          ) : (
            lang === 'AZ' ? 'Rəyi Yenilə' : 'Update Review'
          )}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export default EditReviewForm;