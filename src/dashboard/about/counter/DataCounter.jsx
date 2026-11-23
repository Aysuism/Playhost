import { useState, useContext } from 'react';
import EditCounterForm from './EditCounterForm';
import { useDeleteCounterMutation } from '../../tools/api/about-counter';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const DataCounter = ({ counters, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingCounter, setEditingCounter] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteCounter, { isLoading: isDeleting }] = useDeleteCounterMutation();

  const handleDelete = (id) => notify.deleteItem(() => deleteCounter(id).unwrap(), refetch);

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
                  <h5 className="modal-title">
                    {lang === 'AZ' ? 'Sayğacı Redaktə Et' : 'Edit Counter'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowEditModal(false)}
                    aria-label={lang === 'AZ' ? 'Bağla' : 'Close'}
                  ></button>
                </div>
                <div className="modal-body">
                  {editingCounter && (
                    <EditCounterForm
                      counter={editingCounter}
                      onClose={() => {
                        setEditingCounter(null);
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

      {/* Counters Grid */}
      <div className="dashboard-grid">
        {counters?.map((item) => (
          <div key={item._id} className="dashboard-card">
            <div className="dashboard-content">
              <div className="dashboard-description">
                <div className="description-item">
                  <span className="description-label">
                    {lang === 'AZ' ? 'Başlıq (AZ):' : 'Heading (AZ):'}
                  </span>
                  <p>{item.headingAze}</p>
                </div>
                <div className="description-item">
                  <span className="description-label">
                    {lang === 'AZ' ? 'Başlıq (EN):' : 'Heading (EN):'}
                  </span>
                  <p>{item.headingEng}</p>
                </div>
              </div>

              <div className="dashboard-meta">
                <div className="meta-item">
                  <span className="meta-label">
                    {lang === 'AZ' ? 'Dəyər:' : 'Value:'}
                  </span>
                  <span className="meta-value">{item.value}</span>
                </div>
              </div>

              <div className="dashboard-actions">
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => {
                    setEditingCounter(item);
                    setShowEditModal(true);
                  }}
                >
                  {lang === 'AZ' ? 'Redaktə' : 'Edit'}
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
                  {isDeleting ?
                    (lang === 'AZ' ? 'Silinir...' : 'Deleting...') :
                    (lang === 'AZ' ? 'Sil' : 'Delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCounter;