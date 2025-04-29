import React, { useState, useContext } from 'react';
import DataCounter from './DataCounter';
import AddCounterForm from './AddCounterForm';
import { useGetCountersQuery } from '../../tools/api/about-counter';
import { LangContext } from '../../../context/LangContext';

const CounterManagement = () => {
  const { lang } = useContext(LangContext);
  const { data: counters=[], refetch } = useGetCountersQuery();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="counter-management">
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {lang === 'AZ' ? 'Yeni Sayğac Əlavə Et' : 'Add New Counter'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <AddCounterForm
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
        <h1>{lang === 'AZ' ? 'Sayğac İdarəetməsi' : 'Counter Management'}</h1>
        <button
          type="button"
          className="btn add-button"
          onClick={() => setShowModal(true)}
        >
          {lang === 'AZ' ? 'Yeni Sayğac Əlavə Et' : 'Add New Counter'}
        </button>
      </div>

      <DataCounter counters={counters} refetch={refetch} />
    </div>
  );
};

export default CounterManagement;
