import React, { useState } from 'react';
import DataTeam from './DataTeam';
import AddTeamForm from './AddTeamForm';
import { useGetTeamMembersQuery } from '../../tools/api/about-team';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const TeamManagement = () => {
  const { lang } = useContext(LangContext);
  const { data: teamMembers=[], refetch } = useGetTeamMembersQuery();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="team-management">
      {/* Modal Implementation */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {lang === 'AZ' ? 'Yeni Komanda Üzvü Əlavə Et' : 'Add New Team Member'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label={lang === 'AZ' ? 'Bağla' : 'Close'}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <AddTeamForm
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

      {/* Main Content */}
      <div className="p-3">
        <h1>{lang === 'AZ' ? 'Komanda Üzvlərinin İdarə Edilməsi' : 'Team Members Management'}</h1>
        <button
          type="button"
          className="btn add-button"
          onClick={() => setShowModal(true)}
        >
          {lang === 'AZ' ? 'Yeni Komanda Üzvü Əlavə Et' : 'Add New Team Member'}
        </button>
      </div>

      <DataTeam teamMembers={teamMembers} refetch={refetch} />
    </div>
  );
};

export default TeamManagement;