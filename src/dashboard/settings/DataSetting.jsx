import { useState, useContext } from 'react';
import EditSettingForm from './EditSettingForm';
import { LangContext } from '../../context/LangContext';

const DataSetting = ({ settings, refetch, isLoading, isError }) => {
    const { lang } = useContext(LangContext);
    const [editingSetting, setEditingSetting] = useState(null);
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

                <div className="dashboard-card">

                    <div className="dashboard-content">
                        <div className="dashboard-description">
                            <div className="description-item">
                                <span className="description-label">
                                    {lang === 'AZ' ? 'Açıqlama (EN):' : 'Description (EN):'}
                                </span>
                                <p>{settings?.descriptionEng}</p>
                            </div>
                            <div className="description-item">
                                <span className="description-label">
                                    {lang === 'AZ' ? 'Açıqlama (AZ):' : 'Description (AZ):'}
                                </span>
                                <p>{settings?.descriptionAze}</p>
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
                            {settings?.logo && (
                                <div className="meta-item">
                                    <span className="meta-label">Logo:</span>
                                    <img
                                        src={settings?.logo?.[0]
                                            ? `http://localhost:3333/${settings?.logo[0].replace(/\\/g, '/')}`
                                            : null}
                                        alt="logo"
                                    />
                                </div>
                            )}
                            <div className="meta-item">
                                <span className="meta-label">Facebook:</span>
                                <span className="meta-value">{settings?.socialMedia?.facebookBtnUrl}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Twitter:</span>
                                <span className="meta-value">{settings?.socialMedia?.twitterBtnUrl}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Instagram:</span>
                                <span className="meta-value">{settings?.socialMedia?.instagramBtnUrl}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">TikTok:</span>
                                <span className="meta-value">{settings?.socialMedia?.tikTokBtnUrl}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Discord:</span>
                                <span className="meta-value">{settings?.socialMedia?.whatsappBtnUrl}</span>
                            </div>
                        </div>

                        <div className="dashboard-actions" style={{ display: 'inline-block', }}>
                            <button
                                type="button"
                                className="btn btn-edit"
                                onClick={() => {
                                    setEditingSetting(settings);
                                    setShowEditModal(true);
                                }}
                            >
                                {lang === 'AZ' ? 'Redaktə Et' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataSetting;