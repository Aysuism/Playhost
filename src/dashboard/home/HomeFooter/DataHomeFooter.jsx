import React, { useState, useContext } from 'react';
import EditHomeFooterForm from './EditHomeFooterForm';
import { LangContext } from '../../../context/LangContext';

const DataHomeFooter = ({ footer, refetch }) => {
  const [editingFooter, setEditingFooter] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { lang } = useContext(LangContext);

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
        <div className="dashboard-card">
          <div className="dashboard-image-container">
            {footer?.backgroundImageUrl ? (
              <img
                src={footer?.backgroundImageUrl
                  ? `http://localhost:3333/${footer?.backgroundImageUrl?.replace(/\\/g, '/')}`
                  : null}
                alt={lang === 'AZ' ? footer?.headingAze : footer?.headingEng}
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
              {footer?.headingAze}
            </h3>
            <h3 className="dashboard-heading">
              <span className='dashboard-heading-label'>
                {lang === 'AZ' ? 'Başlıq (EN) : ' : 'Heading (En) : '}
              </span>
              {footer?.headingEng}
            </h3>

            <div className="dashboard-description">
              <div className="description-item">
                <span className="description-label">
                  {lang === 'AZ' ? 'Açıqlama (AZ):' : 'Description (AZ):'}
                </span>
                <p>{footer?.descriptionAze}</p>
              </div>
              <div className="description-item">
                <span className="description-label">
                  {lang === 'AZ' ? 'Açıqlama (EN):' : 'Description (EN):'}
                </span>
                <p>{footer?.descriptionEng}</p>
              </div>
            </div>
            <div className="dashboard-meta">
              <div className="meta-item">
                <span className="meta-label">
                  {lang === 'AZ' ? 'Span (AZ):' : 'Span (Az):'}
                </span>
                <span className="meta-value">{footer?.spanAze}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">
                  {lang === 'AZ' ? 'Span (EN):' : 'Span (En):'}
                </span>
                <span className="meta-value">{footer?.spanEng}</span>
              </div>
            </div>
            <div className="dashboard-actions" style={{ display: 'inline-block', }}>
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => {
                  setEditingFooter(footer);
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

export default DataHomeFooter;