import React, { useContext, useState, useMemo } from 'react';
import { useGetCommentsQuery, useDeleteCommentMutation } from '../../../dashboard/tools/api/games-comment';
import { LangContext } from '../../../context/LangContext';
import AddCommentForm from './AddCommentForm';
import EditCommentForm from './EditCommentForm';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa';

const CommentSection = ({ gameId }) => {
    const { lang } = useContext(LangContext);
    const { data: comments=[], refetch } = useGetCommentsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [deleteComment] = useDeleteCommentMutation();

    const user = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('loggedInUser'));
        } catch {
            return null;
        }
    }, []);

    const gameComments = useMemo(() => {
        return comments?.filter(c => c.gameId === gameId) || [];
    }, [comments, gameId]);

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

    const openEditModal = (comment) => {
        setEditingComment(comment);
        setShowEditModal(true);
    };

    return (
        <section className="comment-section">
            <div className="container">
                {/* Title and Add Button */}
                <div className="mb-4">
                    <h1 className='mb-4'>{lang === 'AZ' ? 'Oyun Rəyləri' : 'Game Reviews'}</h1>
                 
                        <button className="btn add-button" onClick={() => setShowAddModal(true)}>
                            {lang === 'AZ' ? 'Rəy əlavə et' : 'Add Review'}
                        </button>
          
                </div>

                {/* Add Comment Modal */}
                {showAddModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h5 className="modal-title">
                                            {lang === 'AZ' ? 'Yeni Rəy əlavə et' : 'Add New Review'}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => setShowAddModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <AddCommentForm
                                            gameId={gameId}
                                            refetch={refetch}
                                            onClose={() => setShowAddModal(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Edit Comment Modal */}
                {/* {showEditModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
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
                                        <EditCommentForm
                                            comment={editingComment}
                                            onClose={() => setShowEditModal(false)}
                                            refetch={refetch}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )} */}

                <div className="dashboard-container">
                    {/* Showing Comments */}
                    {gameComments.length > 0 ? (
                        <div className="dashboard-grid">
                            {gameComments.map(comment => (
                                <div key={comment._id} className="dashboard-card">

                                    <div className="dashboard-content d-flex mb-2">
                                        {/* Image */}
                                        <img alt={comment.fullname} className="rounded-circle me-3"
                                            onError={(e) => { e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg'; }}
                                            src={comment.avatarUrl
                                                ? `https://playhost-backend.onrender.com/${comment.avatarUrl.replace(/\\/g, '/')}`
                                                : 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg'
                                            } />
                                        <div className="dashboard-description">
                                            <h5 className="dashboard-heading">{comment.fullname}</h5>
                                            <div className="rating">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    i < comment.reyting ? (
                                                        <FaStar key={i} className="text-warning" />
                                                    ) : (
                                                        <FaRegStar key={i} className="text-secondary" />
                                                    )
                                                ))}
                                            </div>
                                            <span className="mb-0 text-muted small">
                                                {new Date(comment.createdAt).toLocaleDateString(
                                                    lang === 'AZ' ? 'az-AZ' : 'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </span>
                                            <p className="mt-2 mb-0">{comment.comment}</p>

                                        </div>
                                    </div>
                                    {/* {(user?._id === comment.userId || user?.role === 'admin') && (
                                        <div className="dashboard-actions">
                                            <button className="btn btn-edit" onClick={() => openEditModal(comment)} >
                                                {lang === 'AZ' ? 'Düzəliş et' : 'Edit'}
                                            </button>
                                            <button className="btn btn-delete" onClick={() => handleDelete(comment._id)} >
                                                {lang === 'AZ' ? 'Sil' : 'Delete'}
                                            </button>
                                        </div>
                                    )} */}
                                </div>
                            ))}
                        </div>
                    ) : (

                        //------------ If there is no comment Yet 

                        <div className="no-comment-yet text-center py-4 rounded">
                            <p>{lang === 'AZ' ? 'Bu oyun üçün hələ rəy yoxdur' : 'No reviews yet for this game'}</p>
                          
                                <button className="btn " onClick={() => setShowAddModal(true)} >
                                    {lang === 'AZ' ? 'İlk rəyi siz yazın' : 'Be the first to review'}
                                </button>
                       
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
};

export default CommentSection;