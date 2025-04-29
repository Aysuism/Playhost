import React, { useState, useEffect, useContext } from 'react';
import { useEditGameMutation } from '../../tools/api/games';
import { useGetCategoryQuery } from '../../tools/api/games-category';
import Swal from 'sweetalert2';
import { LangContext } from '../../../context/LangContext';

const baseFlagUrl = 'https://madebydesignesia.com/themes/playhost/images/flags';

// Predefined locations with country and flag URLs
const PREDEFINED_LOCATIONS = [
  { country: 'London, England', flagUrl: `${baseFlagUrl}/united-kingdom.png` },
  { country: 'Paris, France', flagUrl: `${baseFlagUrl}/france.png` },
  { country: 'Frankfurt, Germany', flagUrl: `${baseFlagUrl}/germany.png` },
  { country: 'Stockholm, Sweden', flagUrl: `${baseFlagUrl}/sweden.png` },
  { country: 'Amsterdam, Netherlands', flagUrl: `${baseFlagUrl}/netherlands.png` },
  { country: 'Helsinki, Finland', flagUrl: `${baseFlagUrl}/finland.png` },
  { country: 'Los Angeles, USA', flagUrl: `${baseFlagUrl}/usa.png` },
  { country: 'Quebec, Canada', flagUrl: `${baseFlagUrl}/canada.png` },
  { country: 'Sydney, Australia', flagUrl: `${baseFlagUrl}/australia.png` },
  { country: 'Sao Paulo, Brazil', flagUrl: `${baseFlagUrl}/brazil.png` },
  { country: 'Bangkok, Thailand', flagUrl: `${baseFlagUrl}/thailand.png` },
  { country: 'Jakarta, Indonesia', flagUrl: `${baseFlagUrl}/indonesia.png` }
];

const EditGamesForm = ({ game, onClose, refetch }) => {
  const { lang } = useContext(LangContext);
  const [editGame, { isLoading }] = useEditGameMutation();
  const { data: categories } = useGetCategoryQuery();

  const [formData, setFormData] = useState({
    gameId: 1,
    gameName: '',
    gameCategory: '',
    originalPrice: 0,
    discountIndicator: false,
    discount: 0,
    discountedPrice: 0,
    rating: 0,
    reviews: 0,
    slot: 0,
    duration: 0,
    location: [{ country: '', flagUrl: '', isSelected: false }],
    imageUrl: null
  });

  useEffect(() => {
    if (game) {
      const matchedCategory = categories?.find(c =>
        c._id === game.gameCategory ||
        c._id === game.gameCategory?._id ||
        c.categoryId === game.gameCategory?.categoryId
      );

      setFormData({
        gameId: game.gameId || 1,
        gameName: game.gameName || '',
        gameCategory: matchedCategory?._id || game.gameCategory || '',
        originalPrice: game.originalPrice || 0,
        discountIndicator: game.discountIndicator || false,
        discount: game.discount || 0,
        discountedPrice: game.discountedPrice || 0,
        rating: game.rating || 0,
        reviews: game.reviews || 0,
        slot: game.slot || 0,
        duration: game.duration || 0,
        location: game.location?.length > 0 ? [...game.location] : [{ country: '', flagUrl: '', isSelected: false }],
        imageUrl: null
      });
    }
  }, [game, categories]);

  // Calculate Discount
  useEffect(() => {
    if (formData.discountIndicator && formData.originalPrice && formData.discount) {
      const discountedPrice = formData.originalPrice * (1 - formData.discount / 100);
      setFormData(prev => ({
        ...prev,
        discountedPrice: parseFloat(discountedPrice.toFixed(2))
      }));
    }
  }, [formData.discount, formData.discountIndicator, formData.originalPrice]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleLocationChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => {
      const updatedLocation = [...prev.location];

      if (name === 'country') {
        // When country changes, find matching flag URL
        const selectedLocation = PREDEFINED_LOCATIONS.find(loc => loc.country === value);
        updatedLocation[index] = {
          ...updatedLocation[index],
          country: value,
          flagUrl: selectedLocation ? selectedLocation.flagUrl : ''
        };
      } else {
        updatedLocation[index] = {
          ...updatedLocation[index],
          [name]: type === 'checkbox' ? checked : value
        };
      }

      return { ...prev, location: updatedLocation };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, imageUrl: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categories?.some(c => c._id === formData.gameCategory)) {
      Swal.fire({ icon: 'error', title: lang === 'AZ' ? 'Yanlış Kateqoriya' : 'Invalid Category', text: lang === 'AZ' ? 'Zəhmət olmasa doğru kateqoriya seçin' : 'Please select a valid category' });
      return;
    }

    const data = new FormData();
    const fields = [
      'gameId', 'gameName', 'originalPrice', 'discountIndicator', 'discount',
      'discountedPrice', 'rating', 'reviews', 'slot', 'duration', 'gameCategory'
    ];

    if (formData.imageUrl instanceof File) data.append('imageUrl', formData.imageUrl);

    fields.forEach(field => formData[field] !== undefined && data.append(field, formData[field]));
    formData.location.forEach((loc, index) => {
      data.append(`location[${index}][country]`, loc.country);
      data.append(`location[${index}][flagUrl]`, loc.flagUrl);
      data.append(`location[${index}][isSelected]`, loc.isSelected);
    });

    try {
      await editGame({ id: game._id, formData: data }).unwrap();
      Swal.fire({ icon: 'success', title: lang === 'AZ' ? 'Uğurlu!' : 'Success!', text: lang === 'AZ' ? 'Oyun yeniləndi!' : 'Game updated!', timer: 2000 });
      refetch();
      onClose();
    } catch (error) {
      Swal.fire({ icon: 'error', title: lang === 'AZ' ? 'Xəta!' : 'Error!', text: error.data?.message || (lang === 'AZ' ? 'Yeniləmə baş vermədi' : 'Update failed') });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 p-md-5 rounded shadow-sm">
      <div className="row g-4">
        {/* Game ID */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Oyun ID' : 'Game ID'}</label>
          <input type="text" name="gameId" className="form-control" value={formData.gameId || ''} onChange={handleChange} required />
        </div>

        {/* Game Name */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Oyun Adı' : 'Game Name'}</label>
          <input type="text" name="gameName" className="form-control" value={formData.gameName || ''} onChange={handleChange} required />
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Kateqoriya' : 'Category'}</label>
          <select name="gameCategory" className="form-select" value={formData.gameCategory || ''} onChange={handleChange} required>
            <option value="">{lang === 'AZ' ? 'Kateqoriya seçin' : 'Select a category'}</option>
            {categories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>

        {/* Original Price */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Əsas Qiymət' : 'Original Price'}</label>
          <input type="number" name="originalPrice" step="0.01" min="0" className="form-control" value={formData.originalPrice || 0} onChange={handleChange} required />
        </div>

        {/* Discount Available */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Endirim Mövcuddur' : 'Discount Available'}</label>
          <select name="discountIndicator" className="form-select" value={formData.discountIndicator ? 'true' : 'false'}
            onChange={(e) => handleChange({
              target: {
                name: 'discountIndicator',
                value: e.target.value === 'true'
              }
            })}>
            <option value="false">{lang === 'AZ' ? 'Yox' : 'No'}</option>
            <option value="true">{lang === 'AZ' ? 'Bəli' : 'Yes'}</option>
          </select>
        </div>

        {/* Discount Section */}
        {formData.discountIndicator && (
          <>
            <div className="col-md-3">
              <label className="form-label">{lang === 'AZ' ? 'Endirim' : 'Discount'}</label>
              <input type="number" name="discount" min="0" max="100" className="form-control" value={formData.discount || 0} onChange={handleChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label">{lang === 'AZ' ? 'Endirimli Qiymət' : 'Discounted Price'}</label>
              <input type="number" name="discountedPrice" className="form-control bg-light" value={formData.discountedPrice || 0} readOnly />
            </div>
          </>
        )}

        {/* Rating */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Reytinq (0-5)' : 'Rating (0-5)'}</label>
          <select
            name="rating"
            className="form-select"
            value={formData.rating || 0}
            onChange={handleChange}
            required
          >
            <option value="0">{lang === 'AZ' ? '0 - Reytinq yoxdur' : '0 - No rating'}</option>
            <option value="1">{lang === 'AZ' ? '1 - Pis' : '1 - Poor'}</option>
            <option value="2">{lang === 'AZ' ? '2 - Orta' : '2 - Fair'}</option>
            <option value="3">{lang === 'AZ' ? '3 - Yaxşı' : '3 - Average'}</option>
            <option value="4">{lang === 'AZ' ? '4 - Çox Yaxşı' : '4 - Good'}</option>
            <option value="5">{lang === 'AZ' ? '5 - Əla' : '5 - Excellent'}</option>
          </select>
        </div>

        {/* Reviews */}
        <div className="col-md-6">
          <label className="form-label">{lang === 'AZ' ? 'Rəylərin sayı' : 'Number of Reviews'}</label>
          <input type="number" name="reviews" min="0" className="form-control" value={formData.reviews || 0} onChange={handleChange} />
        </div>

        {/* Slots */}
        <div className="col-12">
          <h5 className="section-title">🎯 {lang === 'AZ' ? 'Slot Məlumatı' : 'Slot Info'}</h5>
          <label className="form-label">{lang === 'AZ' ? 'Slot sayı' : 'Number of Slots'}</label>
          <input type="number" name="slot" min="0" className="form-control" value={formData.slot || 0} onChange={handleChange} />
        </div>

        {/* Duration */}
        <div className="col-12">
          <h5 className="section-title">⏳ {lang === 'AZ' ? 'Günlər' : 'Days'}</h5>
          <label className="form-label">{lang === 'AZ' ? 'Müddət' : 'Duration'}</label>
          <select name="duration" className="form-select" value={formData.duration || ''} onChange={handleChange} required >
            <option value="1">{lang === 'AZ' ? '1 Gün' : '1 Day'}</option>
            <option value="3">{lang === 'AZ' ? '3 Gün' : '3 Days'}</option>
            <option value="7">{lang === 'AZ' ? '7 Gün' : '7 Days'}</option>
            <option value="30">{lang === 'AZ' ? '30 Gün' : '30 Days'}</option>
            <option value="90">{lang === 'AZ' ? '90 Gün' : '90 Days'}</option>
            <option value="365">{lang === 'AZ' ? '365 Gün' : '365 Days'}</option>
          </select>
        </div>

        {/* Locations */}
        <div className="col-12">
          <h5 className="section-title">🌍 {lang === 'AZ' ? 'Lokasiyalar' : 'Locations'}</h5>

          {formData.location.map((location, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="row g-3">
                {/* Country - Now a select input */}
                <div className="col-md-6">
                  <label className="form-label">{lang === 'AZ' ? 'Ölkə' : 'Country'}</label>
                  <select
                    name="country"
                    className="form-select"
                    value={location.country || ''}
                    onChange={(e) => handleLocationChange(index, e)}
                    required
                  >
                    <option value="">{lang === 'AZ' ? 'Bir yer seçin' : 'Select a location'}</option>
                    {PREDEFINED_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc.country}>
                        {loc.country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Flag URL - Now readonly and auto-filled based on country selection */}
                <div className="col-md-6">
                  <label className="form-label">{lang === 'AZ' ? 'Bayraq URL' : 'Flag URL'}</label>
                  <input
                    type="text"
                    name="flagUrl"
                    className="form-control"
                    value={`https://madebydesignesia.com/themes/playhost/images${location.flagUrl}` || ''}
                    readOnly
                  />
                </div>

                {/* Is Selected */}
                <div className="col-md-6 form-check">
                  <input
                    type="checkbox"
                    name="isSelected"
                    className="form-check-input"
                    checked={location.isSelected || false}
                    onChange={(e) => handleLocationChange(index, e)}
                  />
                  <label className="form-check-label">{lang === 'AZ' ? 'Seçildi' : 'Is Selected'}</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Upload */}
        <div className="col-12">
          <h5 className="section-title">🖼️ {lang === 'AZ' ? 'Oyun Şəkili' : 'Game Image'}</h5>

          {/* Show Previous Image if available */}
          {game.imageUrl?.[0] && !formData.imageUrl && (
            <div className="mb-3">
              <label className="form-label">{lang === 'AZ' ? 'Əvvəlki Şəkil' : 'Previous Image'}</label>
              <img src={`https://playhost-backend.onrender.com/${game.imageUrl[0]}`} alt="Previous Game Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}

          <label className="form-label">{lang === 'AZ' ? 'Yeni Şəkil Yüklə (isteğe bağlı)' : 'Upload New Image (optional)'}</label>
          <input type="file" name="imageUrl" className="form-control" onChange={handleFileChange} accept="image/*" />
        </div>


        {/* Action Buttons */}
        <div className="col-12 d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {lang === 'AZ' ? 'İmtina et' : 'Cancel'}
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                {lang === 'AZ' ? 'Redaktə edilir...' : 'Editing...'}
              </>
            ) : lang === 'AZ' ? 'Oyunu Redaktə et' : 'Edit Game'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditGamesForm;