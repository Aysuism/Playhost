import React, { useState } from 'react';
import EditSliderForm from './EditSliderForm';
import Swal from 'sweetalert2';
import { useDeleteSliderMutation } from '../../tools/api/home-slider';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataSlider = ({ sliders, refetch }) => {
  const { lang } = useContext(LangContext)
  const [editingSlider, setEditingSlider] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteSlider, { isLoading: isDeleting }] = useDeleteSliderMutation();

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Delete Slider?',
      text: "This action cannot be undone!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSlider(id).unwrap();
          Swal.fire('Deleted!', 'Slider deleted successfully!', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', error.data?.message || 'Failed to delete slider.', 'error');

        }
      }
    })
  };

  return (
    <div className="dashboard-container">
      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-purple text-white">
                    <h5 className="modal-title">{lang === 'AZ' ? 'Slayderi Redaktə Et' : 'Edit Slider'}</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowEditModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editingSlider && (
                      <EditSliderForm
                        slider={editingSlider}
                        onClose={() => {
                          setEditingSlider(null);
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

      {/* Sliders Grid */}
      <div className="dashboard-grid">
        {sliders.map((item) => {
          const imageUrl = item.backgroundImageUrl
            ? `https://playhost-backend.onrender.com/${item.backgroundImageUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={item._id} className="dashboard-card">
              <div className="dashboard-image-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.heading}
                    className="dashboard-image"
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-image-placeholder">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="dashboard-content">
                <h3 className="dashboard-heading">{item.heading}</h3>

                <div className="dashboard-description">
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Açıqlama' : 'Description'} (AZ):</span>
                    <p>{item.descriptionAze}</p>
                  </div>
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Açıqlama' : 'Description'} (EN):</span>
                    <p>{item.descriptionEng}</p>
                  </div>
                </div>

                <div className="dashboard-meta">
                  <div className="meta-item">
                    <span className="meta-label">{lang === 'AZ' ? 'Qiymət' : 'Price'}:</span>
                    <span className="meta-value">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Game ID:</span>
                    <span className="meta-value">{item.gameId}</span>
                  </div>
                </div>

                <div className="dashboard-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingSlider(item);
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
                    {isDeleting ? (lang === 'AZ' ? 'Silinir...' : 'Deleting...') : (lang === 'AZ' ? 'Sil' : 'Delete')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSlider;