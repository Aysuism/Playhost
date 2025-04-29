import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useAddCommentMutation } from '../../../dashboard/tools/api/games-comment';
import { LangContext } from '../../../context/LangContext';
import { BiSend } from 'react-icons/bi';
import { ImSpinner8 } from 'react-icons/im';

const AddCommentForm = ({ gameId, refetch, onClose }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    fullname: '',
    reyting: 1,
    comment: '',
    avatarUrl: null,
  });

  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatarUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('comment', formData.comment);
    data.append('reyting', formData.reyting);
    data.append('gameId', gameId);
    if (formData.avatarUrl) {
      data.append('avatarUrl', formData.avatarUrl);
    }

    try {
      await addComment(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Rəyiniz əlavə edildi!' : 'Your review has been added!',
        confirmButtonText: 'OK',
      });
      refetch();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: lang === 'AZ' ? 'Rəy əlavə edilərkən xəta baş verdi' : 'Error adding your review',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded">
      <div className="mb-3">
        <label htmlFor="fullname" className="form-label">
          {lang === 'AZ' ? 'Ad Soyad' : 'Full Name'} *
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>

      {/* Changed rating to select dropdown */}
      <div className="mb-3">
        <label htmlFor="reyting" className="form-label">
          {lang === 'AZ' ? 'Reytinq' : 'Rating'} *
        </label>
        <select
          className="form-select"
          id="reyting"
          name="reyting"
          value={formData.reyting}
          onChange={handleChange}
          required
        >
          <option value="5">5 - {lang === 'AZ' ? 'Əla' : 'Excellent'}</option>
          <option value="4">4 - {lang === 'AZ' ? 'Yaxşı' : 'Good'}</option>
          <option value="3">3 - {lang === 'AZ' ? 'Orta' : 'Average'}</option>
          <option value="2">2 - {lang === 'AZ' ? 'Qənaətbəxş' : 'Fair'}</option>
          <option value="1">1 - {lang === 'AZ' ? 'Zəif' : 'Poor'}</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          {lang === 'AZ' ? 'Rəyiniz' : 'Your Review'} *
        </label>
        <textarea
          className="form-control"
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="avatar" className="form-label">
          {lang === 'AZ' ? 'Profil şəkli' : 'Profile Picture'}
        </label>
        <input
          type="file"
          className="form-control"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
          accept="image/*"
        />
        <small className="text-muted">
          {lang === 'AZ' ? 'İstəyə bağlı' : 'Optional'}
        </small>
      </div>

      <div className="d-flex justify-content-end gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="btn btn-primary d-flex align-items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ImSpinner8 className="spin" />
              {lang === 'AZ' ? 'Göndərilir...' : 'Submitting...'}
            </>
          ) : (
            <>
              <BiSend />
              {lang === 'AZ' ? 'Rəyi Göndər' : 'Submit Review'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;