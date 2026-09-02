import React, { useState, useContext } from 'react';
import { useGetBlogsQuery } from '../tools/api/blog';
import DataBlog from './DataBlog';
import AddBlogForm from './AddBlogFrom';
import { LangContext } from '../../context/LangContext';

const BlogManagement = () => {
  const { lang } = useContext(LangContext);
  const { data: blogs=[],refetch } = useGetBlogsQuery();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='blog-management'>
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {lang === 'AZ' ? 'Yeni Bloq Əlavə Et' : 'Add New Blog'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <AddBlogForm
                      refetch={refetch}
                      onClose={() => setShowModal(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className='p-3'>
        <h1>{lang === 'AZ' ? 'Bloq İdarəetməsi' : 'Blog Management'}</h1>
        <button
          type="button"
          className="btn add-button"
          onClick={() => setShowModal(true)}
        >
          {lang === 'AZ' ? 'Yeni Bloq Əlavə Et' : 'Add New Blog'}
        </button>
      </div>

      <DataBlog blogs={blogs} refetch={refetch} />
    </div>
  );
};

export default BlogManagement;
