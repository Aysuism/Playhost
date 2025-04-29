import React, { useState } from 'react';
import EditTeamForm from './EditTeamForm';
import { useDeleteTeamMemberMutation } from '../../tools/api/about-team';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataTeam = ({ teamMembers, refetch }) => {
  const { lang } = useContext(LangContext)
  const [editingMember, setEditingMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Delete Team Member?',
      text: "This action cannot be undone!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTeamMember(id).unwrap();
          Swal.fire('Deleted!', 'Team member deleted successfully!', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', error.data?.message || 'Failed to delete team member.', 'error');
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-purple text-white">
                    <h5 className="modal-title">
                      {lang === 'AZ' ? 'Komanda Üzvünü Redaktə Et' : 'Edit Team Member'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => {
                        setEditingMember(null);
                        setShowEditModal(false);
                      }}
                      aria-label={lang === 'AZ' ? 'Bağla' : 'Close'}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editingMember && (
                      <EditTeamForm
                        member={editingMember}
                        onClose={() => {
                          setEditingMember(null);
                          setShowEditModal(false);
                        }}
                        refetch={refetch}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Team Members Grid */}
      <div className="dashboard-grid">
        {teamMembers?.map((item) => (
          <div key={item._id} className="dashboard-card">
            <div className="d-flex justify-content-center py-3">
              <img
                src={`https://playhost-backend.onrender.com/${item.teamImage}`}
                alt={item.fullname}
                className="dashboard-image"
                style={{ height: '200px', transition:'all .3s ease', borderRadius:'20px' }}

                onError={(e) => {
                  e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                }}
              />
            </div>

            <div className="dashboard-content">
              <h3 className="dashboard-heading">{item.fullname}</h3>

              <div className="dashboard-meta">
                <div className="meta-item">
                  <span className="meta-label">
                    {lang === 'AZ' ? 'Vəzifə (EN):' : 'Role (EN):'}
                  </span>
                  <span className="meta-value">{item.roleEng}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">
                    {lang === 'AZ' ? 'Vəzifə (AZ):' : 'Role (AZ):'}
                  </span>
                  <span className="meta-value">{item.roleAze}</span>
                </div>
              </div>

              <div className="dashboard-actions">
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => {
                    setEditingMember(item);
                    setShowEditModal(true);
                  }}
                >
                  {lang === 'AZ' ? 'Redaktə' : 'Edit'}
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <i className="fas fa-spinner fa-spin me-2"></i>
                  ) : (
                    <i className="fas fa-trash-alt me-2"></i>
                  )}
                  {isDeleting ?
                    (lang === 'AZ' ? 'Silinir...' : 'Deleting...') :
                    (lang === 'AZ' ? 'Sil' : 'Delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTeam;