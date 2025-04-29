import React, { useState } from 'react';
import EditIntroductionForm from './EditIntroductionForm';
import { useDeleteIntroductionMutation } from '../../tools/api/about-introduction';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataIntroduction = ({ introductions, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingIntro, setEditingIntro] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [deleteIntroduction] = useDeleteIntroductionMutation();

  // const handleDelete = async (id) => {
  //   if (window.confirm(lang === 'AZ' ? 'Bu təqdimatı silmək istədiyinizə əminsiniz?' : 'Are you sure you want to delete this introduction?')) {
  //     try {
  //       await deleteIntroduction(id).unwrap();
  //       refetch();
  //     } catch (error) {
  //       alert(lang === 'AZ' ? 'Təqdimat silinmədi' : 'Failed to delete introduction');
  //     }
  //   }
  // };

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
                    <h5 className="modal-title">{lang === 'AZ' ? 'Təqdimatı redaktə et' : 'Edit Introduction'}</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => {
                        setEditingIntro(null);
                        setShowEditModal(false);
                      }}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {editingIntro && (
                      <EditIntroductionForm
                        introduction={editingIntro}
                        onClose={() => {
                          setEditingIntro(null);
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

      {/* Introductions Grid */}
      <div className="dashboard-grid d-flex">
        {introductions?.map((item) => {
          const imageUrl = item.imageUrl
            ? `https://playhost-backend.onrender.com/${item.imageUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={item._id} className="dashboard-card">
              <div className="dashboard-image-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Introduction"
                    className="dashboard-image"
                    style={{objectFit:'contain'}}
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-image-placeholder">
                    {lang === 'AZ' ? 'Şəkil yoxdur' : 'No Image Available'}
                  </div>
                )}
              </div>

              <div className="dashboard-content">
                <h3 className="dashboard-heading">
                  {item.headingEng} / {item.headingAze}
                </h3>

                <div className="dashboard-description">
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Span (EN/AZ):' : 'Span (EN/AZ):'}</span>
                    <p>{item.spanEng} / {item.spanAze}</p>
                  </div>
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Təsvir (EN):' : 'Description (EN):'}</span>
                    <p>{item.descriptionEng}</p>
                  </div>
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Təsvir (AZ):' : 'Description (AZ):'}</span>
                    <p>{item.descriptionAze}</p>
                  </div>
                </div>

                <div className="dashboard-meta">
                  <div className="meta-section">
                    <h4>{lang === 'AZ' ? 'Birinci bölmə' : 'First Section'}</h4>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Başlıq (EN):' : 'Title (EN):'}</span>
                      <span className="meta-value">{item.titleFirstEng}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Başlıq (AZ):' : 'Title (AZ):'}</span>
                      <span className="meta-value">{item.titleFirstAze}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (EN):' : 'Subdescription (EN):'}</span>
                      <p className="meta-value">{item.subdescriptionFirstEng}</p>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (AZ):' : 'Subdescription (AZ):'}</span>
                      <p className="meta-value">{item.subdescriptionFirstAze}</p>
                    </div>
                  </div>

                  <div className="meta-section">
                    <h4>{lang === 'AZ' ? 'İkinci bölmə' : 'Second Section'}</h4>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Başlıq (EN):' : 'Title (EN):'}</span>
                      <span className="meta-value">{item.titleSecondEng}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Başlıq (AZ):' : 'Title (AZ):'}</span>
                      <span className="meta-value">{item.titleSecondAze}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (EN):' : 'Subdescription (EN):'}</span>
                      <p className="meta-value">{item.subdescriptionSecondEng}</p>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (AZ):' : 'Subdescription (AZ):'}</span>
                      <p className="meta-value">{item.subdescriptionSecondAze}</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-actions" style={{display:'inline-block'}}>
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingIntro(item);
                      setShowEditModal(true);
                    }}
                  >
                    {lang === 'AZ' ? 'Redaktə et' : 'Edit'}
                  </button>
                  {/* <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fas fa-trash-alt me-2"></i>
                    {lang === 'AZ' ? 'Sil' : 'Delete'}
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataIntroduction;