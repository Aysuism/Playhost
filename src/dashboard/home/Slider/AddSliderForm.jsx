import { useState, useContext } from 'react';
import { useAddSliderMutation } from '../../tools/api/home-slider';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const AddSliderForm = ({ refetch, onClose }) => {
    const { lang } = useContext(LangContext);
    const [formData, setFormData] = useState({
        heading: '',
        descriptionAze: '',
        descriptionEng: '',
        price: 44,
        backgroundImageUrl: null,
    });

    const [addSlider, { isLoading }] = useAddSliderMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, backgroundImageUrl: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.backgroundImageUrl) {
            notify.error('Zəhmət olmasa slayder üçün şəkil seçin.', 'Please select an image for the slider.');
            return;
        }

        const data = new FormData();
        data.append('heading', formData.heading);
        data.append('descriptionAze', formData.descriptionAze);
        data.append('descriptionEng', formData.descriptionEng);
        data.append('price', parseFloat(formData.price));
        data.append('backgroundImageUrl', formData.backgroundImageUrl);

        try {
            await addSlider(data).unwrap();
            notify.added();
            setFormData({
                heading: '',
                descriptionAze: '',
                descriptionEng: '',
                price: 44,
                backgroundImageUrl: null,
            });
            refetch();
            onClose();
        } catch (err) {
            console.error('Error:', err);
            notify.addFailed(err.data?.message);
        }
    };

    return (
        <form className='form-container p-4 border rounded shadow-sm' onSubmit={handleSubmit}>
            <div className="row">

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        {lang === 'AZ' ? 'Qiymət' : 'Price'}
                    </label>
                    <input type="number" step="0.01" className="form-control" id="price" name="price" placeholder={formData.price} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="heading" className="form-label">
                        {lang === 'AZ' ? 'Başlıq' : 'Heading'}
                    </label>
                    <input type="text" className="form-control" id="heading" name="heading" value={formData.heading} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionAze" className="form-label">
                        {lang === 'AZ' ? 'Açıqlama (AZ)' : 'Description (Aze)'}
                    </label>
                    <textarea className="form-control" id="descriptionAze" name="descriptionAze" value={formData.descriptionAze} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionEng" className="form-label">
                        {lang === 'AZ' ? 'Açıqlama (EN)' : 'Description (Eng)'}
                    </label>
                    <textarea className="form-control" id="descriptionEng" name="descriptionEng" value={formData.descriptionEng} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label htmlFor="backgroundImageUrl" className="form-label">
                        {lang === 'AZ' ? 'Arxa fon şəkli' : 'Background Image'}
                    </label>
                    <input type="file" className="form-control" id="backgroundImageUrl" name="backgroundImageUrl" onChange={handleFileChange} required />
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className={`btn btn-dark px-4 ${isLoading ? 'opacity-75' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            {lang === 'AZ' ? 'Əlavə edilir...' : 'Adding...'}
                        </>
                    ) : (lang === 'AZ' ? 'Slayder Əlavə Et' : 'Add Slider')}
                </button>
            </div>
        </form>
    );
};

export default AddSliderForm;