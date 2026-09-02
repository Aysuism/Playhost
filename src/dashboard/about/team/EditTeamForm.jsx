import React, { useState } from 'react';
import { useEditTeamMemberMutation } from '../../tools/api/about-team';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const EditTeamForm = ({ member, onClose, refetch }) => {
  const {lang}=useContext(LangContext)
  const [formData, setFormData] = useState({
    fullname: member.fullname,
    roleAze: member.roleAze,
    roleEng: member.roleEng,
    teamImage: null,
  });

  const [editTeamMember, { isLoading }] = useEditTeamMemberMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, teamImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('fullname', formData.fullname);
    data.append('roleAze', formData.roleAze);
    data.append('roleEng', formData.roleEng);

    if (formData.teamImage) {
      data.append('teamImage', formData.teamImage);
    }

    try {
      await editTeamMember({ id: member._id, formData: data }).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: lang === 'AZ' ? 'Komanda üzvü uğurla redaktə edildi.' : 'Team member successfully updated.',

        timer: 2000,
        showConfirmButton: true
      });
      refetch();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.data?.message || 'Failed to update team member',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
  
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
        />
      </div>
  
      <div className="d-flex justify-content-between mt-4">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? 
            (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : 
            (lang === 'AZ' ? 'Üzvü Yenilə' : 'Update Member')}
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

export default EditTeamForm;