import React, { useState, useContext } from 'react';
import { useDeleteHomeFooterMutation } from '../../tools/api/home-footer';
import EditHomeFooterForm from './EditHomeFooterForm';
import { LangContext } from '../../../context/LangContext';

const DataHomeFooter = ({ footer, refetch }) => {
  const [editingFooter, setEditingFooter] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { lang } = useContext(LangContext);
  
  // const [deleteFooter] = useDeleteHomeFooterMutation();

  // const handleDelete = async (id) => {
  //   if (window.confirm('Are you sure you want to delete this info?')) {
  //     try {
  //       await deleteFooter(id).unwrap();
  //       alert('Footer info deleted successfully!');
  //       refetch();
  //     } catch (error) {
  //       alert('Failed to delete footer info');
  //     }
  //   }
  // };

  return (
    <div className="dashboard-container d-flex flex-column gap-4">
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
                <div className="modal-header">
                  <h5 className="modal-title">
                    {lang === 'AZ' ? 'Footer-i Redaktə Et' : 'Edit Footer'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowEditModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {editingFooter && (
                    <EditHomeFooterForm
                      footer={editingFooter}
                      onClose={() => {
                        setEditingFooter(null);
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

      <div className="dashboard-grid">
        {footer.map((item) => {
          const imageUrl = item.backgroundImageUrl
            ? `https://playhost-backend.onrender.com/${item.backgroundImageUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={item._id} className="dashboard-card">
              <div className="dashboard-image-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={lang === 'AZ' ? item.headingAze : item.headingEng}
                    className="dashboard-image"
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-image-placeholder">
                    {lang === 'AZ' ? 'Şəkil yoxdur' : 'No Image'}
                  </div>
                )}
              </div>

              <div className="dashboard-content">
                <h3 className="dashboard-heading">
                  <span className='dashboard-heading-label'>
                    {lang === 'AZ' ? 'Başlıq (AZ) : ' : 'Heading (Az) : '}
                  </span>
                  {item.headingAze}
                </h3>
                <h3 className="dashboard-heading">
                  <span className='dashboard-heading-label'>
                    {lang === 'AZ' ? 'Başlıq (EN) : ' : 'Heading (En) : '}
                  </span>
                  {item.headingEng}
                </h3>

                <div className="dashboard-description">
                  <div className="description-item">
                    <span className="description-label">
                      {lang === 'AZ' ? 'Açıqlama (AZ):' : 'Description (AZ):'}
                    </span>
                    <p>{item.descriptionAze}</p>
                  </div>
                  <div className="description-item">
                    <span className="description-label">
                      {lang === 'AZ' ? 'Açıqlama (EN):' : 'Description (EN):'}
                    </span>
                    <p>{item.descriptionEng}</p>
                  </div>
                </div>
                <div className="dashboard-meta">
                  <div className="meta-item">
                    <span className="meta-label">
                      {lang === 'AZ' ? 'Span (AZ):' : 'Span (Az):'}
                    </span>
                    <span className="meta-value">{item.spanAze}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">
                      {lang === 'AZ' ? 'Span (EN):' : 'Span (En):'}
                    </span>
                    <span className="meta-value">{item.spanEng}</span>
                  </div>
                </div>
                <div className="dashboard-actions" style={{display:'inline-block',}}>
                  <button 
                    type="button" 
                    className="btn btn-edit" 
                    onClick={() => {
                      setEditingFooter(item);
                      setShowEditModal(true);
                    }}
                  >
                    {lang === 'AZ' ? 'Redaktə et' : 'Edit'}
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

export default DataHomeFooter;