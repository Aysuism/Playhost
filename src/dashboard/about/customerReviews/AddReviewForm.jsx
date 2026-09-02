import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useAddReviewMutation } from '../../tools/api/about-review';
import { LangContext } from '../../../context/LangContext';

const AddReviewForm = ({ refetch, onClose }) => {
  const { lang } = useContext(LangContext)

  const [formData, setFormData] = useState({
    fullname: '',
    comment: '',
    reyting: 5,
    avatarUrl: null,
  });

  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatarUrl: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.avatarUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select an avatar image.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('comment', formData.comment);
    data.append('reyting', formData.reyting.toString());
    data.append('avatarUrl', formData.avatarUrl);

    try {
      await addReview(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Review successfully added.',
        confirmButtonText: 'OK',
      });
      // Reset form
      setFormData({
        fullname: '',
        comment: '',
        reyting: 5,
        avatarUrl: null,
      });
      // Clear file input
      document.querySelector('input[type="file"]').value = '';
      // Refetch reviews
      refetch();
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.data?.message || 'Failed to add review. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">
          {lang === 'AZ' ? 'Tam Ad *' : 'Full Name *'}
        </label>
        <input
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="form-control"
          required
          maxLength={100}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          {lang === 'AZ' ? 'Reytinq (1-5) *' : 'Rating (1-5) *'}
        </label>
        <select
          name="reyting"
          value={formData.reyting}
          onChange={handleChange}
          className="form-select"
          required
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>
              {num} {lang === 'AZ' ? 'Ulduz' : 'Star'}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          {lang === 'AZ' ? 'Rəy *' : 'Comment *'}
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="form-control"
          rows="3"
          required
          maxLength={500}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">
          {lang === 'AZ' ? 'Profil Şəkli *' : 'Avatar Image *'}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
          accept="image/*"
          required
        />
        <small className="text-muted">
          {lang === 'AZ' ? 'Qəbul olunan formatlar: JPG, PNG və s.' : 'Accepted formats: JPG, PNG, etc.'}
        </small>
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-dark px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {lang === 'AZ' ? 'Əlavə olunur...' : 'Adding...'}
            </>
          ) : lang === 'AZ' ? 'Rəy Əlavə Et' : 'Add Review'}
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;