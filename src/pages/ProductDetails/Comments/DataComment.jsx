import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import EditCommentForm from './EditCommentForm';
import { format } from 'date-fns';
import { LangContext } from '../../../context/LangContext';
import { useDeleteCommentMutation, useGetCommentsQuery } from '../../../dashboard/tools/api/games-comment';

const DataComment = ({ gameId, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingComment, setEditingComment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  // Fetch comments for the current game using `gameId`
  const { data: comments = [], isLoading: isFetching, isError } = useGetCommentsQuery(gameId);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: lang === 'AZ' ? 'Rəyi silmək?' : 'Delete Comment?',
      text: lang === 'AZ' ? 'Bu əməliyyat geri alına bilməz!' : 'This action cannot be undone!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: lang === 'AZ' ? 'Sil' : 'Delete',
      cancelButtonText: lang === 'AZ' ? 'İmtina et' : 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteComment(id).unwrap();
        Swal.fire(
          lang === 'AZ' ? 'Silindi!' : 'Deleted!',
          lang === 'AZ' ? 'Rəy uğurla silindi!' : 'Comment deleted successfully!',
          'success'
        );
        refetch();
      } catch (error) {
        Swal.fire(
          lang === 'AZ' ? 'Xəta!' : 'Error!',
          lang === 'AZ' ? 'Rəyi silmək mümkün olmadı.' : 'Failed to delete comment.',
          'error'
        );
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy HH:mm');
  };

  return (
    <div className="dashboard-container">
      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-purple text-white">
                  <h5 className="modal-title">
                    {lang === 'AZ' ? 'Rəyi Düzəliş Et' : 'Edit Comment'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowEditModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {editingComment && (
                    <EditCommentForm
                      comment={editingComment}
                      onClose={() => {
                        setEditingComment(null);
                        setShowEditModal(false);
                      }}
                      refetch={refetch}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Comments List */}
      {isFetching ? (
        <p>{lang === 'AZ' ? 'Yüklənir...' : 'Loading...'}</p>
      ) : isError ? (
        <p>{lang === 'AZ' ? 'Şərhlər yüklənərkən xəta baş verdi.' : 'There was an error loading the comments.'}</p>
      ) : (
        <div className="dashboard-grid">
          {comments.map((item) => {
            const avatar = item.avatarUrl
              ? `https://playhost-backend.onrender.com/${item.avatarUrl.replace(/\\/g, '/')}`
              : null;

            return (
              <div key={item._id || item.commentId} className="dashboard-card">
                <div className="dashboard-image-container">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={item.fullname}
                      className="dashboard-avatar rounded-circle"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                      }}
                    />
                  ) : (
                    <div className="dashboard-image-placeholder rounded-circle">
                      <i className="fas fa-user fa-3x text-muted"></i>
                    </div>
                  )}
                </div>

                <div className="dashboard-content">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="dashboard-heading mb-0">
                      {item.fullname}
                    </h3>
                    <span className="text-muted small">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <div className="dashboard-rating mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star${i < item.reyting ? ' text-warning' : ' text-secondary'}`}
                      ></i>
                    ))}
                    <span className="ms-2">{item.reyting}.0</span>
                  </div>

                  <div className="dashboard-description mb-3">
                    <p className="mb-0">{item.comment}</p>
                  </div>

                  <div className="dashboard-actions">
                    <button
                      type="button"
                      className="btn btn-edit me-2"
                      onClick={() => {
                        setEditingComment(item);
                        setShowEditModal(true);
                      }}
                    >
                      <i className="fas fa-edit me-2"></i>
                      {lang === 'AZ' ? 'Düzəliş Et' : 'Edit'}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id || item.commentId)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <i className="fas fa-spinner fa-spin me-2"></i>
                      ) : (
                        <i className="fas fa-trash-alt me-2"></i>
                      )}
                      {isDeleting
                        ? lang === 'AZ'
                          ? 'Silinir...'
                          : 'Deleting...'
                        : lang === 'AZ'
                        ? 'Sil'
                        : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DataComment;
