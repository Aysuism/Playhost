import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAddSettingsMutation } from '../tools/api/settings';

const AddSettingForm = ({ refetch, onClose }) => {
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

    const [addSettings, { isLoading }] = useAddSettingsMutation();

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
    
        try {
            const data = new FormData();
            data.append('titleAze', formData.titleAze);
            data.append('titleEng', formData.titleEng);
            data.append('descriptionAze', formData.descriptionAze);
            data.append('descriptionEng', formData.descriptionEng);
            // if (formData.favIcon) data.append('favIcon', formData.favIcon);
            if (formData.logo) data.append('logo', formData.logo);
            
            // Append social media fields individually
            data.append('socialMedia[twitterBtnUrl]', formData.socialMedia.twitterBtnUrl);
            data.append('socialMedia[facebookBtnUrl]', formData.socialMedia.facebookBtnUrl);
            data.append('socialMedia[tikTokBtnUrl]', formData.socialMedia.tikTokBtnUrl);
            data.append('socialMedia[instagramBtnUrl]', formData.socialMedia.instagramBtnUrl);
            data.append('socialMedia[whatsappBtnUrl]', formData.socialMedia.whatsappBtnUrl);
            
            await addSettings(data).unwrap();
            
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Settings successfully added.',
                confirmButtonText: 'OK',
            });
    
            setFormData({
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
            refetch();
            onClose();
        } catch (err) {
            console.error('Error adding settings:', err);
            let errorMessage = 'Failed to add settings';
            if (err.data) {
                errorMessage = typeof err.data === 'string' ? err.data : JSON.stringify(err.data);
            }
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container p-3 border rounded">            
            <div className="mb-3">
                <label htmlFor="titleAze" className="form-label">Title (Aze)</label>
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
                <label htmlFor="titleEng" className="form-label">Title (Eng)</label>
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
                <label htmlFor="descriptionAze" className="form-label">Description (Aze)</label>
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
                <label htmlFor="descriptionEng" className="form-label">Description (Eng)</label>
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

            {/* <div className="mb-3">
                <label htmlFor="favIcon" className="form-label">Favicon</label>
                <input
                    type="file"
                    id="favIcon"
                    name="favIcon"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div> */}

            <div className="mb-3">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            <h6 className="mt-4 mb-3">Social Media Links</h6>
            
            <div className="mb-3">
                <label htmlFor="twitterBtnUrl" className="form-label">Twitter URL</label>
                <input
                    type="url"
                    id="twitterBtnUrl"
                    name="twitterBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.twitterBtnUrl}
                    onChange={handleSocialMediaChange}
                    placeholder="https://twitter.com/username"
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="facebookBtnUrl" className="form-label">Facebook URL</label>
                <input
                    type="url"
                    id="facebookBtnUrl"
                    name="facebookBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.facebookBtnUrl}
                    onChange={handleSocialMediaChange}
                    placeholder="https://facebook.com/username"
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="tikTokBtnUrl" className="form-label">TikTok URL</label>
                <input
                    type="url"
                    id="tikTokBtnUrl"
                    name="tikTokBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.tikTokBtnUrl}
                    onChange={handleSocialMediaChange}
                    placeholder="https://tiktok.com/username"
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="instagramBtnUrl" className="form-label">Instagram URL</label>
                <input
                    type="url"
                    id="instagramBtnUrl"
                    name="instagramBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.instagramBtnUrl}
                    onChange={handleSocialMediaChange}
                    placeholder="https://instagram.com/username"
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="whatsappBtnUrl" className="form-label">WhatsApp URL</label>
                <input
                    type="url"
                    id="whatsappBtnUrl"
                    name="whatsappBtnUrl"
                    className="form-control"
                    value={formData.socialMedia.whatsappBtnUrl}
                    onChange={handleSocialMediaChange}
                    placeholder="https://wa.me/phone"
                />
            </div>

            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark px-4" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Settings'}
                </button>
            </div>
        </form>
    );
};

export default AddSettingForm;