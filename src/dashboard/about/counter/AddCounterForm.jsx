import React, { useState, useContext } from 'react';
import { useAddCounterMutation } from '../../tools/api/about-counter';
import { LangContext } from '../../../context/LangContext';
import { notify } from '../../../hooks/useNotify';

const AddCounterForm = ({ refetch, onClose }) => {
  const { lang } = useContext(LangContext);

  const [formData, setFormData] = useState({
    headingAze: '',
    headingEng: '',
    value: 0,
  });

  const [addCounter, { isLoading }] = useAddCounterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCounter({
        headingAze: formData.headingAze,
        headingEng: formData.headingEng,
        value: formData.value
      }).unwrap();

      notify.added();
      setFormData({
        headingAze: '',
        headingEng: '',
        value: 0,
      });
      refetch();
      onClose();
    } catch (err) {
      notify.addFailed(err.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {lang === 'AZ' ? 'Başlıq (AZ)' : 'Heading (AZ)'}
          </label>
          <input name="headingAze" value={formData.headingAze} onChange={handleChange}
            className="form-control" required />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {lang === 'AZ' ? 'Başlıq (EN)' : 'Heading (EN)'}
          </label>
          <input name="headingEng" value={formData.headingEng} onChange={handleChange}
            className="form-control" required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          {lang === 'AZ' ? 'Dəyər' : 'Value'}
        </label>
        <input name="value" type="number" value={formData.value} onChange={handleChange}
          className="form-control" required />
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-dark px-4" disabled={isLoading}>
          {isLoading
            ? lang === 'AZ' ? 'Əlavə olunur...' : 'Adding...'
            : lang === 'AZ' ? 'Sayğacı Əlavə Et' : 'Add Counter'}
        </button>
      </div>
    </form>
  );
};

export default AddCounterForm;
