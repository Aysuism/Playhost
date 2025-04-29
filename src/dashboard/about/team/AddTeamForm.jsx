import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAddTeamMemberMutation } from '../../tools/api/about-team';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const AddTeamForm = ({ refetch, onClose }) => {
  const { lang } = useContext(LangContext)
  const [formData, setFormData] = useState({
    fullname: '',
    roleAze: '',
    roleEng: '',
    teamImage: null,
  });

  const [addTeamMember, { isLoading }] = useAddTeamMemberMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, teamImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.teamImage) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select a profile image.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('roleAze', formData.roleAze);
    data.append('roleEng', formData.roleEng);
    data.append('teamImage', formData.teamImage);

    try {
      await addTeamMember(data).unwrap();
      Swal.fire({
        icon: 'success',
        title: lang === 'AZ' ? 'Uğur!' : 'Success!',
        text: lang === 'AZ' ? 'Komanda üzvü uğurla əlavə edildi.' : 'Team member successfully added.',
        confirmButtonText: lang === 'AZ' ? 'Tamam' : 'OK',
      });
      setFormData({
        fullname: '',
        roleAze: '',
        roleEng: '',
        teamImage: null,
      });
      refetch();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: lang === 'AZ' ? 'Xəta!' : 'Error!',
        text: lang === 'AZ' ? 'Zəhmət olmasa profil şəkli seçin.' : 'Please select a profile image.',
        confirmButtonText: lang === 'AZ' ? 'Tamam' : 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <h4 className="mb-4 text-center">
        {lang === 'AZ' ? 'Yeni Komanda Üzvü Əlavə Et' : 'Add New Team Member'}
      </h4>

      <div className="mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Tam Ad' : 'Full Name'}</label>
        <input
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">{lang === 'AZ' ? 'Vəzifə (AZ)' : 'Role (AZ)'}</label>
          <input
            name="roleAze"
            value={formData.roleAze}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">{lang === 'AZ' ? 'Vəzifə (EN)' : 'Role (EN)'}</label>
          <input
            name="roleEng"
            value={formData.roleEng}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">{lang === 'AZ' ? 'Profil Şəkli' : 'Profile Image'}</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
          required
        />
      </div>

      <div className="d-flex justify-content-center mt-4">
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
          ) : (
            lang === 'AZ' ? 'Üzvü Əlavə Et' : 'Add Member'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTeamForm;