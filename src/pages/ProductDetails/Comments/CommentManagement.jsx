import React, { useState, useContext } from 'react';
import { useGetCommentsQuery } from '../../../dashboard/tools/api/games-comment';
import DataComment from './DataComment';
import AddCommentForm from './AddCommentForm';
import { LangContext } from '../../../context/LangContext';

const CommentManagement = ({ gameId }) => {
  const { lang } = useContext(LangContext);
  const { data: comments=[], refetch } = useGetCommentsQuery();
  const [showModal, setShowModal] = useState(false);

  const filteredComments = comments?.filter(comment => comment.gameId === gameId) || [];

  return (
    <div className="comment-management">
      {/* Add Comment Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-purple text-white">
                  <h5 className="modal-title">
                    {lang === 'AZ' ? 'Yeni Rəy Əlavə Et' : 'Add New Comment'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <AddCommentForm
                    gameId={gameId}
                    refetch={refetch}
                    onClose={() => setShowModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header and Add Button */}
      <div className="p-3 d-flex justify-content-between align-items-center">
        <h1 className="mb-0">
          {lang === 'AZ' ? 'Rəy İdarəetməsi' : 'Comment Management'}
        </h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus me-2"></i>
          {lang === 'AZ' ? 'Yeni Rəy Əlavə Et' : 'Add New Comment'}
        </button>
      </div>

      {/* Filtered Comments List */}
      <div className="p-3">
        <DataComment comments={filteredComments} refetch={refetch} />
      </div>
    </div>
  );
};

export default CommentManagement;
