import { useState, useContext } from 'react';
import { useDeleteBlogMutation } from '../tools/api/blog';
import EditBlogForm from './EditBlogForm';
import { LangContext } from '../../context/LangContext';
import { notify } from '../../hooks/useNotify';

const DataBlog = ({ blogs, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDelete = (id) => notify.deleteItem(() => deleteBlog(id).unwrap(), refetch);

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
                  <h5 className="modal-title">{lang === 'AZ' ? 'Bloqu Düzəliş Et' : 'Edit Blog'}</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowEditModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {editingBlog && (
                    <EditBlogForm
                      blogs={editingBlog}
                      onClose={() => {
                        setEditingBlog(null);
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

      {/* Blog Cards Grid */}
      <div className="dashboard-grid">
        {blogs.map((item) => {
          const image = item.imageUrl
            ? `http://localhost:3333/${item.imageUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={item._id} className="dashboard-card">
              <div className="dashboard-image-container">
                {image ? (
                  <img
                    src={image}
                    alt={item.titleEng}
                    className="dashboard-image"
                    onError={(e) => {
                      e.target.src = 'https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg';
                    }}
                  />
                ) : (
                  <div className="dashboard-image-placeholder">
                    {lang === 'AZ' ? 'Şəkil Mövcud deyil' : 'No Image Available'}
                  </div>
                )}
              </div>

              <div className="dashboard-content">
                <h3 className="dashboard-heading">
                  <span className="dashboard-heading-label">{lang === 'AZ' ? 'Başlıq (Az)' : 'Title (Az)'}</span>{item.titleAze}
                </h3>
                <h5 className="dashboard-heading">
                  <span className="dashboard-heading-label">{lang === 'AZ' ? 'Başlıq (En)' : 'Title (En)'}</span>{item.titleEng}
                </h5>

                <div className="dashboard-description">
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Təsvir (AZ):' : 'Description (AZ):'}</span>
                    <p>{item.descriptionAze.slice(0, 300)}...</p>
                  </div>
                  <div className="description-item">
                    <span className="description-label">{lang === 'AZ' ? 'Təsvir (EN):' : 'Description (EN):'}</span>
                    <p>{item.descriptionEng.slice(0, 300)}...</p>
                  </div>
                </div>

                <div className="dashboard-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => {
                      setEditingBlog(item);
                      setShowEditModal(true);
                    }}
                  >
                    {lang === 'AZ' ? 'Düzəliş Et' : 'Edit'}
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
                    {isDeleting ? (lang === 'AZ' ? 'Silinir...' : 'Deleting...') : (lang === 'AZ' ? 'Sil' : 'Delete')}
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

export default DataBlog;
