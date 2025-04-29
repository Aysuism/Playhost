import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import EditReviewForm from './EditReviewForm';
import { useDeleteReviewMutation } from '../../tools/api/about-review';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataReview = ({ reviews, refetch }) => {
  const { lang } = useContext(LangContext)
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Delete Review?',
      text: "This action cannot be undone!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteReview(id).unwrap();
          Swal.fire('Deleted!', 'Review deleted successfully!', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', error.data?.message || 'Failed to delete review.', 'error');
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
                  <div className="modal-header">
                    <h5 className="modal-title">{lang === 'AZ' ? 'Rəyi Redaktə Et' : 'Edit Review'}</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => {
                        setEditingReview(null);
                        setShowEditModal(false);
                      }}
                      aria-label={lang === 'AZ' ? 'Bağla' : 'Close'}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editingReview && (
                      <EditReviewForm
                        review={editingReview}
                        onClose={() => {
                          setEditingReview(null);
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

      {/* Reviews Grid */}
      <div className="dashboard-grid">
        {reviews?.map((item) => {
          const avatarUrl = item.avatarUrl
            ? `https://playhost-backend.onrender.com/${item.avatarUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={item._id} className="dashboard-card">
              <div style={{ height: 'max-content', padding: '30px 0 20px 0' }} className="dashboard-image-container d-flex justify-content-center align-items-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={item.fullname}
                    className="dashboard-avatar"
                    style={{ borderRadius: '50%', width:'100px', height:'100px', objectFit:'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-avatar-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>

              <div className="dashboard-content" style={{ height: 'max-content' }}>
                <h3 className="dashboard-heading">{item.fullname}</h3>

                <div className="dashboard-rating">
                  {[...Array(5)].map((_, i) => (
                    i < item.reyting ? (
                      <FaStar key={i} className="text-warning" />
                    ) : (
                      <FaRegStar key={i} className="text-secondary" />
                    )
                  ))}
                  <span className="ms-2">{item.reyting}/5</span>
                </div>

                <div className="dashboard-description">
                  <p>{item.comment}</p>
                </div>

                <div className="dashboard-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingReview(item);
                      setShowEditModal(true);
                    }}
                  >
                    {lang === 'AZ' ? 'Redaktə et' : 'Edit'}
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

export default DataReview;