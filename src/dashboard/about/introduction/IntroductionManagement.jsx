import React, { useState } from 'react';
import DataIntroduction from './DataIntroduction';
import AddIntroductionForm from './AddIntroduction';
import { useGetIntroductionQuery } from '../../tools/api/about-introduction';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const IntroductionManagement = () => {
  const {lang}=useContext(LangContext)
  const { data: introductions=[], refetch } = useGetIntroductionQuery();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="introduction-management">
      {/* {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Introduction Content</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <AddIntroductionForm
                      refetch={refetch}
                      onClose={() => setShowModal(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
      <div className="p-3">
        <h1>{lang==='AZ'?'Təqdimat Məzmununun İdarəsi':'Introduction Content Management'}</h1>
        {/* <button
          type="button"
          className="btn add-button"
          onClick={() => setShowModal(true)}
        >
          Add Introduction Content
        </button> */}
      </div>

      <DataIntroduction introductions={introductions} refetch={refetch} />
    </div>
  );
};

export default IntroductionManagement;