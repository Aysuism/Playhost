import { useState } from 'react';
import EditIntroductionForm from './EditIntroductionForm';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const DataIntroduction = ({ introductions, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingIntro, setEditingIntro] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
        <div className="dashboard-card">
          <div className="dashboard-image-container">
            {introductions?.imageUrl ? (
              <img
                src={introductions?.imageUrl
                  ? `http://localhost:3333/${introductions?.imageUrl?.replace(/\\/g, '/')}`
                  : null}
                alt="Introduction"
                className="dashboard-image"
                style={{ objectFit: 'contain' }}
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
              {introductions?.headingEng} / {introductions?.headingAze}
            </h3>

            <div className="dashboard-description">
              <div className="description-item">
                <span className="description-label">{lang === 'AZ' ? 'Span (EN/AZ):' : 'Span (EN/AZ):'}</span>
                <p>{introductions?.spanEng} / {introductions?.spanAze}</p>
              </div>
              <div className="description-item">
                <span className="description-label">{lang === 'AZ' ? 'Təsvir (EN):' : 'Description (EN):'}</span>
                <p>{introductions?.descriptionEng}</p>
              </div>
              <div className="description-item">
                <span className="description-label">{lang === 'AZ' ? 'Təsvir (AZ):' : 'Description (AZ):'}</span>
                <p>{introductions?.descriptionAze}</p>
              </div>
            </div>

            <div className="dashboard-meta">
              <div className="meta-section">
                <h4>{lang === 'AZ' ? 'Birinci bölmə' : 'First Section'}</h4>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Başlıq (EN):' : 'Title (EN):'}</span>
                  <span className="meta-value">{introductions?.titleFirstEng}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Başlıq (AZ):' : 'Title (AZ):'}</span>
                  <span className="meta-value">{introductions?.titleFirstAze}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (EN):' : 'Subdescription (EN):'}</span>
                  <p className="meta-value">{introductions?.subdescriptionFirstEng}</p>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (AZ):' : 'Subdescription (AZ):'}</span>
                  <p className="meta-value">{introductions?.subdescriptionFirstAze}</p>
                </div>
              </div>

              <div className="meta-section">
                <h4>{lang === 'AZ' ? 'İkinci bölmə' : 'Second Section'}</h4>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Başlıq (EN):' : 'Title (EN):'}</span>
                  <span className="meta-value">{introductions?.titleSecondEng}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Başlıq (AZ):' : 'Title (AZ):'}</span>
                  <span className="meta-value">{introductions?.titleSecondAze}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (EN):' : 'Subdescription (EN):'}</span>
                  <p className="meta-value">{introductions?.subdescriptionSecondEng}</p>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{lang === 'AZ' ? 'Alt təsvir (AZ):' : 'Subdescription (AZ):'}</span>
                  <p className="meta-value">{introductions?.subdescriptionSecondAze}</p>
                </div>
              </div>
            </div>

            <div className="dashboard-actions" style={{ display: 'inline-block' }}>
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => {
                  setEditingIntro(introductions);
                  setShowEditModal(true);
                }}
              >
                {lang === 'AZ' ? 'Redaktə et' : 'Edit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataIntroduction;