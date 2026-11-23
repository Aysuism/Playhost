import React, { useState, useContext } from 'react';
import { useDeleteServiceMutation } from '../../tools/api/home-service';
import EditServiceForm from './EditServiceForm';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const DataService = ({ services, refetch }) => {
    const { lang } = useContext(LangContext);
    const [editingService, setEditingService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteService] = useDeleteServiceMutation();

  const handleDelete = (id) => notify.deleteItem(() => deleteService(id).unwrap(), refetch);

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
                        ? `http://localhost:3333/${item.iconUrl.replace(/\\/g, '/')}`
                        : null;

                    return (
                        <div key={item._id} className="dashboard-card">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={lang === 'AZ' ? item.titleAze : item.titleEng}
                                    className="object-fit-contain"
                                    style={{ width: '64px', height: '64px', margin: '20px' }}
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