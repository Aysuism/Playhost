import React, { useState, useContext } from 'react';
import { useDeleteServiceMutation } from '../../tools/api/home-service';
import EditServiceForm from './EditServiceForm';
import { LangContext } from '../../../context/LangContext';
import Swal from 'sweetalert2';

const DataService = ({ services, refetch }) => {
    const { lang } = useContext(LangContext);
    const [editingService, setEditingService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteService] = useDeleteServiceMutation();

    const handleDelete = async (id) => {
        if (window.confirm(lang === 'AZ'
            ? 'Bu xidməti silmək istədiyinizə əminsiniz?'
            : 'Are you sure you want to delete this service?')) {
            try {
                await deleteService(id).unwrap();
                Swal.fire({
                    icon: 'success',
                    title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
                    text: lang === 'AZ' ? 'Xidmət uğurla silindi!' : 'Service deleted successfully!',
                    timer: 2000,
                    showConfirmButton: true
                });
                refetch();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                    text: lang === 'AZ' ? 'Xidmət silinərkən xəta baş verdi' : 'Failed to delete service',
                });
            }
        }
    };

    return (
        <div className="dashboard-container">
            {/* Edit Modal with Backdrop */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div
                        className="modal fade show"
                        style={{ display: 'block' }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header bg-purple text-white">
                                    <h5 className="modal-title">
                                        {lang === 'AZ' ? 'Xidməti redaktə et' : 'Edit Service'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowEditModal(false)}
                                        aria-label={lang === 'AZ' ? 'Bağla' : 'Close'}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {editingService && (
                                        <EditServiceForm
                                            service={editingService}
                                            onClose={() => {
                                                setEditingService(null);
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

            {/* Services Grid */}
            <div className="dashboard-grid ">
                {services.map((item) => {
                    const imageUrl = item.iconUrl
                        ? `https://playhost-backend.onrender.com/${item.iconUrl.replace(/\\/g, '/')}`
                        : null;

                    return (
                        <div key={item._id} className="dashboard-card">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={lang === 'AZ' ? item.titleAze : item.titleEng}
                                    className="dashboard-image"
                                    style={{ width: '200px', height: '200px', padding: '20px' }}
                                    onError={(e) => {
                                        e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                                    }}
                                />
                            ) : (
                                <div className="dashboard-image-placeholder">
                                    {lang === 'AZ' ? 'Şəkil yoxdur' : 'No Image'}
                                </div>
                            )}
                            <div className="dashboard-content">
                                <h3 className="dashboard-heading"><span className='dashboard-heading-label'>{lang === 'AZ' ? 'Başlıq (Az)' : 'Title (Az)'} : </span>{item.titleAze}</h3>
                                <h3 className="dashboard-heading"><span className='dashboard-heading-label'>{lang === 'AZ' ? 'Başlıq (En)' : 'Title (En)'} : </span>{item.titleEng}</h3>
                                <div className="dashboard-description">
                                    <div className="description-item">
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Təsvir(AZ):' : 'Description(AZ):'}
                                        </span>
                                        <p>{item.descriptionAze}</p>
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Təsvir(En):' : 'Description(En):'}
                                        </span>
                                        <p>{item.descriptionEng}</p>
                                    </div>
                                </div>

                                <div className="dashboard-actions">
                                    <button
                                        type="button"
                                        className="btn btn-edit"
                                        onClick={() => {
                                            setEditingService(item);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        {lang === 'AZ' ? 'Redaktə Et' : 'Edit'}
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        {lang === 'AZ' ? 'Sil' : 'Delete'}
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

export default DataService;