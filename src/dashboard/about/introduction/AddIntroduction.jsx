import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAddIntroductionMutation } from '../../tools/api/about-introduction';

const AddIntroductionForm = ({ refetch, onClose }) => {
  const [formData, setFormData] = useState({
    spanAze: '',
    spanEng: '',
    headingAze: '',
    headingEng: '',
    descriptionAze: '',
    descriptionEng: '',
    imageUrl: null,
    titleFirstAze: '',
    titleFirstEng: '',
    subdescriptionFirstAze: '',
    subdescriptionFirstEng: '',
    titleSecondAze: '',
    titleSecondEng: '',
    subdescriptionSecondAze: '',
    subdescriptionSecondEng: '',
  });

  const [addIntroduction, { isLoading }] = useAddIntroductionMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        imageUrl: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select an image',
        confirmButtonText: 'OK',
      });

      return;
    }

    const data = new FormData();

    data.append('spanAze', formData.spanAze);
    data.append('spanEng', formData.spanEng);
    data.append('headingAze', formData.headingAze);
    data.append('headingEng', formData.headingEng);
    data.append('descriptionAze', formData.descriptionAze);
    data.append('descriptionEng', formData.descriptionEng);

    data.append('titleFirstAze', formData.titleFirstAze);
    data.append('titleFirstEng', formData.titleFirstEng);
    data.append('subdescriptionFirstAze', formData.subdescriptionFirstAze);
    data.append('subdescriptionFirstEng', formData.subdescriptionFirstEng);

    data.append('titleSecondAze', formData.titleSecondAze);
    data.append('titleSecondEng', formData.titleSecondEng);
    data.append('subdescriptionSecondAze', formData.subdescriptionSecondAze);
    data.append('subdescriptionSecondEng', formData.subdescriptionSecondEng);

    data.append('imageUrl', formData.imageUrl);

    try {
      await addIntroduction(data).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Introduction successfully added.',
        confirmButtonText: 'OK',
      });

      setFormData({
        spanAze: '',
        spanEng: '',
        headingAze: '',
        headingEng: '',
        descriptionAze: '',
        descriptionEng: '',
        imageUrl: null,
        titleFirstAze: '',
        titleFirstEng: '',
        subdescriptionFirstAze: '',
        subdescriptionFirstEng: '',
        titleSecondAze: '',
        titleSecondEng: '',
        subdescriptionSecondAze: '',
        subdescriptionSecondEng: '',
      });

      refetch();

      if (onClose) {
        onClose();
      }

    } catch (err) {
      console.error('Error:', err);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong, please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Heading (AZ)</label>
          <input
            name="headingAze"
            value={formData.headingAze}
            onChange={handleChange}
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Heading (EN)</label>
          <input
            name="headingEng"
            value={formData.headingEng}
            onChange={handleChange}
            type="text"
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Span (AZ)</label>
          <input
            name="spanAze"
            value={formData.spanAze}
            onChange={handleChange}
            type="text"
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Span (EN)</label>
          <input
            name="spanEng"
            value={formData.spanEng}
            onChange={handleChange}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">Description (AZ)</label>
            <textarea
              name="descriptionAze"
              value={formData.descriptionAze}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">Description (EN)</label>
            <textarea
              name="descriptionEng"
              value={formData.descriptionEng}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">titleFirst (Aze)</label>
            <textarea
              name="titleFirstAze"
              value={formData.titleFirstAze}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">titleFirst (Eng)</label>
            <textarea
              name="titleFirstEng"
              value={formData.titleFirstEng}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">subdescriptionFirst (Aze)</label>
            <textarea
              name="subdescriptionFirstAze"
              value={formData.subdescriptionFirstAze}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">subdescriptionFirst (Eng)</label>
            <textarea
              name="subdescriptionFirstEng"
              value={formData.subdescriptionFirstEng}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">titleSecond (Aze)</label>
            <textarea
              name="titleSecondAze"
              value={formData.titleSecondAze}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">titleSecond (Eng)</label>
            <textarea
              name="titleSecondEng"
              value={formData.titleSecondEng}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">subdescriptionSecond (Aze)</label>
            <textarea
              name="subdescriptionSecondAze"
              value={formData.subdescriptionSecondAze}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label className="form-label">subdescriptionSecond (Eng)</label>
            <textarea
              name="subdescriptionSecondEng"
              value={formData.subdescriptionSecondEng}
              onChange={handleChange}
              className="form-control"
              rows="3"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control"
          required
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-dark px-4"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Introduction'}
        </button>
      </div>

    </form>
  );
};

export default AddIntroductionForm;