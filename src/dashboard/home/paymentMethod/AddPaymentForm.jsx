import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAddPaymentMutation } from '../../tools/api/payment';

const AddPaymentForm = ({ refetch }) => {
  const [formData, setFormData] = useState({
    spanAze: '',
    spanEng: '',
    headingAze: '',
    headingEng: '',
    visaBtnUrl: '',
    masterCardBtnUrl: '',
    payPalBtnUrl: '',
    skrilBtnUrl: '', // Note: API uses 'skril' but likely means 'skrill'
    jcbBtnUrl: '',
    americanExpressBtnUrl: ''
  });

  const [addPaymentMethod, { isLoading }] = useAddPaymentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlFields = [
      'visaBtnUrl', 'masterCardBtnUrl', 'payPalBtnUrl',
      'skrilBtnUrl', 'jcbBtnUrl', 'americanExpressBtnUrl'
    ];

    const invalidUrls = urlFields.filter(field =>
      formData[field] && !validateUrl(formData[field])
    );

    if (invalidUrls.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid URLs',
        text: `Please enter valid URLs for: ${invalidUrls.join(', ')}`,
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      await addPaymentMethod(formData).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Payment method added successfully!',
        confirmButtonText: 'OK',
      });

      // Reset form
      setFormData({
        spanAze: '',
        spanEng: '',
        headingAze: '',
        headingEng: '',
        visaBtnUrl: '',
        masterCardBtnUrl: '',
        payPalBtnUrl: '',
        skrilBtnUrl: '',
        jcbBtnUrl: '',
        americanExpressBtnUrl: ''
      });

      refetch();
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.data?.message || 'Failed to add payment method',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container p-4 border rounded shadow-sm">

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="spanAze" className="form-label">SubTitle (Aze)</label>
          <input type="text" name="spanAze" className="form-control" value={formData.spanAze} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="spanEng" className="form-label">SubTitle (Eng)</label>
          <input type="text" name="spanEng" className="form-control" value={formData.spanEng} onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="headingAze" className="form-label">Heading (Aze)</label>
          <input type="text" name="headingAze" className="form-control" value={formData.headingAze} onChange={handleChange} required />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="headingEng" className="form-label">Heading (Eng)</label>
          <input type="text" name="headingEng" className="form-control" value={formData.headingEng} onChange={handleChange} required />
        </div>
      </div>

      {/* Payment Method URLs */}
      <div className="mb-3">
        <label htmlFor="visaBtnUrl" className="form-label">Visa URL</label>
        <input type="url" name="visaBtnUrl" className="form-control" value={formData.visaBtnUrl} onChange={handleChange} placeholder="https://www.visa.com" />
      </div>

      <div className="mb-3">
        <label htmlFor="masterCardBtnUrl" className="form-label">MasterCard URL</label>
        <input type="url" name="masterCardBtnUrl" className="form-control" value={formData.masterCardBtnUrl} onChange={handleChange} placeholder="https://www.mastercard.com" />
      </div>

      <div className="mb-3">
        <label htmlFor="payPalBtnUrl" className="form-label">PayPal URL</label>
        <input type="url" name="payPalBtnUrl" className="form-control" value={formData.payPalBtnUrl} onChange={handleChange} placeholder="https://www.paypal.com" />
      </div>

      <div className="mb-3">
        <label htmlFor="skrilBtnUrl" className="form-label">Skrill URL</label>
        <input type="url" name="skrilBtnUrl" className="form-control" value={formData.skrilBtnUrl} onChange={handleChange} placeholder="https://www.skrill.com" /></div>

      <div className="mb-3">
        <label htmlFor="jcbBtnUrl" className="form-label">JCB URL</label>
        <input type="url" name="jcbBtnUrl" className="form-control" value={formData.jcbBtnUrl} onChange={handleChange} placeholder="https://www.jcb.com" />
      </div>

      <div className="mb-3">
        <label htmlFor="americanExpressBtnUrl" className="form-label">AmericanExpress URL</label>
        <input type="url" name="americanExpressBtnUrl" className="form-control" value={formData.americanExpressBtnUrl} onChange={handleChange} placeholder="https://www.americanexpress.com/" />
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
              Adding...
            </>
          ) : 'Add Payment Method'}
        </button>
      </div>
    </form>
  );
};

export default AddPaymentForm;