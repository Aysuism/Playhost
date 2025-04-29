import React, { useState, useContext } from 'react';
import EditSettingForm from './EditSettingForm';
import { useDeleteSettingsMutation } from '../tools/api/settings';
import Swal from 'sweetalert2';
import { LangContext } from '../../context/LangContext';

const DataSetting = ({ settings, refetch, isLoading, isError }) => {
    const { lang } = useContext(LangContext);
    const [editingSetting, setEditingSetting] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    // const [deleteSettings] = useDeleteSettingsMutation();

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
                                        <h5 className="modal-title">{lang === 'AZ' ? 'Parametrləri Redaktə Et' : 'Edit Settings'}</h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => setShowEditModal(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {editingSetting && (
                                            <EditSettingForm
                                                setting={editingSetting}
                                                onClose={() => {
                                                    setEditingSetting(null);
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

            {/* Settings Grid */}
            <div className="dashboard-grid d-flex">
                {settings.map((item) => {
                    const logoUrl = item.logo?.[0]
                        ? `https://playhost-backend.onrender.com/${item.logo[0].replace(/\\/g, '/')}`
                        : null;

                    // const faviconUrl = item.favIcon?.[0]
                    //     ? `https://playhost-backend.onrender.com/${item.favIcon[0].replace(/\\/g, '/')}`
                    //     : null;

                    return (
                        <div key={item._id} className="dashboard-card">

                            <div className="dashboard-content">
                                <h3 className="dashboard-heading">(Az){item.titleAze} / (En){item.titleEng}</h3>

                                <div className="dashboard-description">
                                    <div className="description-item">
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Açıqlama (EN):' : 'Description (EN):'}
                                        </span>
                                        <p>{item.descriptionEng}</p>
                                    </div>
                                    <div className="description-item">
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Açıqlama (AZ):' : 'Description (AZ):'}
                                        </span>
                                        <p>{item.descriptionAze}</p>
                                    </div>
                                </div>

                                <div className="dashboard-meta flex-column">
                                    {/* {faviconUrl && (
                                        <div className="meta-item">
                                            <span className="meta-label">Favicon:</span>
                                            <img
                                                src={faviconUrl}
                                                alt="Favicon"
                                            />
                                        </div>
                                    )} */}
                                    {logoUrl && (
                                        <div className="meta-item">
                                            <span className="meta-label">Logo:</span>
                                            <img
                                                src={logoUrl}
                                                alt="logo"
                                            />
                                        </div>
                                    )}
                                    <div className="meta-item">
                                        <span className="meta-label">Facebook:</span>
                                        <span className="meta-value">{item.socialMedia.facebookBtnUrl}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Twitter:</span>
                                        <span className="meta-value">{item.socialMedia.twitterBtnUrl}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Instagram:</span>
                                        <span className="meta-value">{item.socialMedia.instagramBtnUrl}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">TikTok:</span>
                                        <span className="meta-value">{item.socialMedia.tikTokBtnUrl}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Discord:</span>
                                        <span className="meta-value">{item.socialMedia.whatsappBtnUrl}</span>
                                    </div>
                                </div>

                                <div className="dashboard-actions" style={{display:'inline-block',}}>
                                    <button
                                        type="button"
                                        className="btn btn-edit"
                                        onClick={() => {
                                            setEditingSetting(item);
                                            setShowEditModal(true);
                                        }}
                                    >
                                       {lang==='AZ'?'Redaktə Et':'Edit'}
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

export default DataSetting;