import React, { useContext, useState } from 'react';
import DataReview from './DataReview';
import AddReviewForm from './AddReviewForm';
import { useGetReviewsQuery } from '../../tools/api/about-review';
import { LangContext } from '../../../context/LangContext';

const ReviewManagement = () => {
  const { lang } = useContext(LangContext)

  const { data: reviews=[], refetch } = useGetReviewsQuery();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="review-management">
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{lang === 'AZ' ? 'Rəy Əlavə Et' : 'Add Review'}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <AddReviewForm
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

      <div className="p-3">
        <h1>{lang === 'AZ' ? 'Müştəri Rəylərinin İdarəsi' : 'Customer Reviews Management'}</h1>
        <button
          type="button"
          className="btn add-button"
          onClick={() => setShowModal(true)}
        >
          {lang === 'AZ' ? 'Yeni Rəy Əlavə et' : 'Add New Review'}
        </button>
      </div>

      <DataReview reviews={reviews} refetch={refetch} />
    </div>
  );
};

export default ReviewManagement;