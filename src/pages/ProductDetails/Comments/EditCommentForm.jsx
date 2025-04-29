import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useEditCommentMutation } from '../../../dashboard/tools/api/games-comment';
import { LangContext } from '../../../context/LangContext';
import { BiSend } from 'react-icons/bi';
import { ImSpinner8 } from 'react-icons/im';

const EditCommentForm = ({ comment, onClose, refetch }) => {
  const { lang } = useContext(LangContext);
  const [formData, setFormData] = useState({
    fullname: comment.fullname,
    reyting: comment.reyting,
    comment: comment.comment,
    avatarUrl: null,
  });
console.log(comment);

  const [editComment, { isLoading }] = useEditCommentMutation();

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
  
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all fields including gameId
      formDataToSend.append('gameId', comment.gameId); // From original comment
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('comment', formData.comment);
      formDataToSend.append('reyting', formData.reyting.toString()); // Convert to string
      
      if (formData.avatarUrl) {
        formDataToSend.append('avatarUrl', formData.avatarUrl);
      }
  
      // Log FormData contents for debugging
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
  
      await editComment({
        id: comment._id,
        formData: formDataToSend
      }).unwrap();
  
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
        text: lang === 'AZ' ? 'Rəyiniz yeniləndi!' : 'Review updated!',
      });
      refetch();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: error.data?.message || (lang === 'AZ' ? 'Yeniləmə uğursuz oldu' : 'Update failed'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded">
      {/* Form fields remain the same as before */}
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

      {/* Rating dropdown */}
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
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} - {lang === 'AZ' ? 
                ['Əla', 'Yaxşı', 'Orta', 'Qənaətbəxş', 'Zəif'][5 - num] : 
                ['Excellent', 'Good', 'Average', 'Fair', 'Poor'][5 - num]}
            </option>
          ))}
        </select>
      </div>

      {/* Comment textarea */}
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

      {/* Avatar upload */}
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
          {lang === 'AZ' ? 'Yalnız dəyişdirmək istəyirsinizsə seçin' : 'Select only if you want to change'}
        </small>
      </div>

      {/* Form buttons */}
      <div className="d-flex justify-content-end gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
          disabled={isLoading}
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
              {lang === 'AZ' ? 'Yenilənir...' : 'Updating...'}
            </>
          ) : (
            <>
              <BiSend />
              {lang === 'AZ' ? 'Yenilə' : 'Update'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditCommentForm;