import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useEditSettingsMutation } from '../tools/api/settings';
import { LangContext } from '../../context/LangContext';

const EditSettingForm = ({ setting, onClose, refetch }) => {
    const { lang } = useContext(LangContext);
    const [formData, setFormData] = useState({
        titleAze: '',
        titleEng: '',
        descriptionAze: '',
        descriptionEng: '',
        // favIcon: null,
        logo: null,
        socialMedia: {
            twitterBtnUrl: '',
            facebookBtnUrl: '',
            tikTokBtnUrl: '',
            instagramBtnUrl: '',
            whatsappBtnUrl: ''
        }
    });

    const [editSettings, { isLoading }] = useEditSettingsMutation();

    useEffect(() => {
        if (setting) {
            setFormData({
                titleAze: setting.titleAze || '',
                titleEng: setting.titleEng || '',
                descriptionAze: setting.descriptionAze || '',
                descriptionEng: setting.descriptionEng || '',
                // favIcon: null,
                logo: null,
                socialMedia: {
                    twitterBtnUrl: setting.socialMedia?.twitterBtnUrl || '',
                    facebookBtnUrl: setting.socialMedia?.facebookBtnUrl || '',
                    tikTokBtnUrl: setting.socialMedia?.tikTokBtnUrl || '',
                    instagramBtnUrl: setting.socialMedia?.instagramBtnUrl || '',
                    whatsappBtnUrl: setting.socialMedia?.whatsappBtnUrl || ''
                }
            });
        }
    }, [setting]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!setting || !setting._id) {
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: lang === 'AZ' ? 'Yanlış parametr məlumatı' : 'Invalid setting data',
            });
            return;
        }

        try {
            const data = new FormData();

            data.append('titleAze', formData.titleAze);
            data.append('titleEng', formData.titleEng);
            data.append('descriptionAze', formData.descriptionAze);
            data.append('descriptionEng', formData.descriptionEng);

            // if (formData.favIcon) data.append('favIcon', formData.favIcon);
            if (formData.logo) data.append('logo', formData.logo);

            data.append('socialMedia[twitterBtnUrl]', formData.socialMedia.twitterBtnUrl);
            data.append('socialMedia[facebookBtnUrl]', formData.socialMedia.facebookBtnUrl);
            data.append('socialMedia[tikTokBtnUrl]', formData.socialMedia.tikTokBtnUrl);
            data.append('socialMedia[instagramBtnUrl]', formData.socialMedia.instagramBtnUrl);
            data.append('socialMedia[whatsappBtnUrl]', formData.socialMedia.whatsappBtnUrl);

            await editSettings({
                id: setting._id,
                formData: data
            }).unwrap();

            Swal.fire({
                icon: 'success',
                title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
                text: lang === 'AZ' ? 'Parametrlər uğurla yeniləndi!' : 'Settings updated successfully!',
                timer: 2000,
                confirmButtonText: 'OK',
            });
            refetch();
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: error.data?.message || (lang === 'AZ' ? 'Parametrlər yenilənərkən xəta baş verdi' : 'Failed to update settings'),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-4 border rounded">

            <div className="mb-3">
                <label htmlFor="titleAze" className="form-label">
                    {lang === 'AZ' ? 'Başlıq (AZ)' : 'Title (Aze)'}
                </label>
                <input
                    type="text"
                    id="titleAze"
                    name="titleAze"
                    className="form-control"
                    value={formData.titleAze}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="titleEng" className="form-label">
                    {lang === 'AZ' ? 'Başlıq (EN)' : 'Title (Eng)'}
                </label>
                <input
                    type="text"
                    id="titleEng"
                    name="titleEng"
                    className="form-control"
                    value={formData.titleEng}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descriptionAze" className="form-label">
                    {lang === 'AZ' ? 'Açıqlama (AZ)' : 'Description (Aze)'}
                </label>
                <textarea
                    id="descriptionAze"
                    name="descriptionAze"
                    className="form-control"
                    value={formData.descriptionAze}
                    onChange={handleChange}
                    required
                    rows={3}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descriptionEng" className="form-label">
                    {lang === 'AZ' ? 'Açıqlama (EN)' : 'Description (Eng)'}
                </label>
                <textarea
                    id="descriptionEng"
                    name="descriptionEng"
                    className="form-control"
                    value={formData.descriptionEng}
                    onChange={handleChange}
                    required
                    rows={3}
                />
            </div>
{/* 
            <div className="mb-3">
                <label htmlFor="favIcon" className="form-label">
                    {lang === 'AZ' ? 'Favicon' : 'Favicon'}
                </label>
                <input
                    type="file"
                    id="favIcon"
                    name="favIcon"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {setting.favIcon?.[0] && (
                    <div className="mt-2">
                        <small>{lang === 'AZ' ? 'Hazırki:' : 'Current:'} </small>
                        <a
                            href={`https://playhost-backend.onrender.com/${setting.favIcon[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {setting.favIcon[0].split('\\').pop()}
                        </a>
                    </div>
                )}
            </div> */}

            <div className="mb-3">
                <label htmlFor="logo" className="form-label">
                    {lang === 'AZ' ? 'Loqo' : 'Logo'}
                </label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {setting.logo?.[0] && (
                    <div className="mt-2">
                        <small>{lang === 'AZ' ? 'Hazırki:' : 'Current:'} </small>
                        <a
                            href={`https://playhost-backend.onrender.com/${setting.logo[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {setting.logo[0].split('\\').pop()}
                        </a>
                    </div>
                )}
            </div>

            <h6 className="mt-4 mb-3">
                {lang === 'AZ' ? 'Sosial Media Linkləri' : 'Social Media Links'}
            </h6>

            <div className="mb-3">
                <label htmlFor="twitterBtnUrl" className="form-label">
                    {lang === 'AZ' ? 'Twitter Linki' : 'Twitter URL'}
                </label>
                <input
                    type="url"
                    id="twitterBtnUrl"
                    name="twitterBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.twitterBtnUrl}
                    onChange={handleSocialMediaChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="facebookBtnUrl" className="form-label">
                    {lang === 'AZ' ? 'Facebook Linki' : 'Facebook URL'}
                </label>
                <input
                    type="url"
                    id="facebookBtnUrl"
                    name="facebookBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.facebookBtnUrl}
                    onChange={handleSocialMediaChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="tikTokBtnUrl" className="form-label">
                    {lang === 'AZ' ? 'TikTok Linki' : 'TikTok URL'}
                </label>
                <input
                    type="url"
                    id="tikTokBtnUrl"
                    name="tikTokBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.tikTokBtnUrl}
                    onChange={handleSocialMediaChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="instagramBtnUrl" className="form-label">
                    {lang === 'AZ' ? 'Instagram Linki' : 'Instagram URL'}
                </label>
                <input
                    type="url"
                    id="instagramBtnUrl"
                    name="instagramBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.instagramBtnUrl}
                    onChange={handleSocialMediaChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="whatsappBtnUrl" className="form-label">
                    {lang === 'AZ' ? 'Discord Linki' : 'Discord URL'}
                </label>
                <input
                    type="url"
                    id="whatsappBtnUrl"
                    name="whatsappBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.whatsappBtnUrl}
                    onChange={handleSocialMediaChange}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 
                        (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') : 
                        (lang === 'AZ' ? 'Parametrləri Yenilə' : 'Update Settings')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
                </button>
            </div>
        </form>
    );
};

export default EditSettingForm;