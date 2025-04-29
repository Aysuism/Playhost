import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import EditFaqForm from './EditFaqForm';
import { useDeleteFaqMutation } from '../tools/api/faq';
import { LangContext } from '../../context/LangContext';

const DataFaq = ({ faqs, refetch, isLoading, isError }) => {
    const { lang } = useContext(LangContext);
    const [editingFaq, setEditingFaq] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete FAQ?',
            text: 'This action cannot be undone!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteFaq(id).unwrap();
                    Swal.fire('Deleted!', 'FAQ removed successfully.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error!', error.data?.message || 'Failed to delete FAQ.', 'error');
                }
            }
        });
    };

    if (isLoading) return <div className="text-center py-4">Loading FAQs...</div>;
    if (isError) return <div className="text-center py-4 text-danger">Error loading FAQs</div>;

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
                                        <h5 className="modal-title">Edit FAQ</h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => {
                                                setEditingFaq(null);
                                                setShowEditModal(false);
                                            }}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {editingFaq && (
                                            <EditFaqForm
                                                faq={editingFaq}
                                                onClose={() => {
                                                    setEditingFaq(null);
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

            {/* FAQ Grid */}
            <div className="dashboard-grid">
                {faqs.map((item) => (
                    <div key={item._id} className="dashboard-card">
                        <div className="dashboard-content">
                            <h6>#{item.questionId}</h6>
                            <h5 className="dashboard-heading"><span className="dashboard-heading-label">{lang === 'AZ' ? 'Başlıq (Az): ' : 'Title (Az): '}</span>{item.titleAze}</h5>
                            <h5 className="dashboard-heading"><span className="dashboard-heading-label">{lang === 'AZ' ? 'Başlıq (En): ' : 'Title (En): '}</span>{item.titleEng}</h5>
                            <div className="dashboard-description">
                                <div className="description-item">
                                    <span className="description-label">
                                        {lang === 'AZ' ? 'Cavab (AZ):' : 'Answer (AZ):'}
                                    </span>
                                    <p>{item.descriptionAze}</p>
                                </div>
                                <div className="description-item">
                                    <span className="description-label">
                                        {lang === 'AZ' ? 'Cavab (EN):' : 'Answer (EN):'}
                                    </span>
                                    <p>{item.descriptionEng}</p>
                                </div>
                            </div>
                            <div className="dashboard-actions">
                                <button type="button" className="btn btn-edit"
                                    onClick={() => {
                                        setEditingFaq(item);
                                        setShowEditModal(true);
                                    }}>
                                    Edit
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
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default DataFaq;
