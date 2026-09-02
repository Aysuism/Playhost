import React, { useState } from 'react';
import { useDeleteCategoryMutation } from '../../tools/api/games-category';
import EditCatForm from './EditCatForm';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataCat = ({ categories = [], refetch, isLoading, isError }) => {
    const {lang}=useContext(LangContext)
    const [editingCat, setEditingCat] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteCat, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const handleDelete = async (id) => {
        Swal.fire({
            title: lang === 'AZ' ? 'Kateqoriya Silinsin?' : 'Delete Game Category?',
            text: lang === 'AZ' ? 'Bu əməliyyat geri alına bilməz!' : 'This action cannot be undone!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: lang === 'AZ' ? 'Sil' : 'Delete',
            cancelButtonText: lang === 'AZ' ? 'Ləğv et' : 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCat(id).unwrap();
                    Swal.fire(
                        lang === 'AZ' ? 'Silindi!' : 'Deleted!',
                        lang === 'AZ' ? 'Kateqoriya uğurla silindi.' : 'Game category removed successfully.',
                        'success'
                    );
                    refetch();
                } catch (error) {
                    Swal.fire(
                        lang === 'AZ' ? 'Xəta!' : 'Error!',
                        error.data?.message || (lang === 'AZ' ? 'Kateqoriya silinərkən xətaya yol verildi' : 'Failed to delete game category'),
                        'error'
                    );
                }
            }
        });
    };

    if (isLoading) return <div className="text-center py-4">{lang === 'AZ' ? 'Kateqoriyalar yüklənir...' : 'Loading categories...'}</div>;
    if (isError) return <div className="text-center text-danger py-4">{lang === 'AZ' ? 'Kateqoriyalar yüklənərkən xəta baş verdi' : 'Error loading categories'}</div>;
    if (!categories.length) return <div className="text-center py-4">{lang === 'AZ' ? 'Heç bir kateqoriya tapılmadı' : 'No categories found'}</div>;

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
                                    <h5 className="modal-title">{lang === 'AZ' ? 'Kateqoriya Redaktə et' : 'Edit Category'}</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => {
                                            setEditingCat(null);
                                            setShowEditModal(false);
                                        }}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {editingCat && (
                                        <EditCatForm
                                            category={editingCat}
                                            onClose={() => {
                                                setEditingCat(null);
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

            {/* Category Grid */}
            <div className="dashboard-grid">
                {categories.map((category) => (
                    <div key={category._id} className="dashboard-card">
                        <div className="dashboard-content">
                            <h3>#{category.categoryId || 'N/A'}</h3>

                            <div className="dashboard-description">
                                <div className="description-item">
                                    <span className="description-label">{lang === 'AZ' ? 'Kateqoriya Adı:' : 'Category Name:'}</span>
                                </div>
                            </div>

                            <h5>{category.category || (lang === 'AZ' ? 'Ad verilməyib' : 'Unnamed')}</h5>

                            <div className="dashboard-actions">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => {
                                        setEditingCat(category);
                                        setShowEditModal(true);
                                    }}
                                >
                                    {lang === 'AZ' ? 'Redaktə et' : 'Edit'}
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(category._id)}
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
                ))}
            </div>
        </div>
    );
};

export default DataCat;
