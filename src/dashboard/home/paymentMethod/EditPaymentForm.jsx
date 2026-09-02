import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useEditPaymentMutation } from '../../tools/api/payment';
import { LangContext } from '../../../context/LangContext';
import { useContext } from 'react';

const EditPaymentForm = ({ payment, onClose, refetch }) => {
    const { lang } = useContext(LangContext);
    const [formData, setFormData] = useState({
        spanAze: payment?.spanAze || '',
        spanEng: payment?.spanEng || '',
        headingAze: payment?.headingAze || '',
        headingEng: payment?.headingEng || '',
        visaBtnUrl: payment?.visaBtnUrl || '',
        masterCardBtnUrl: payment?.masterCardBtnUrl || '',
        payPalBtnUrl: payment?.payPalBtnUrl || '',
        skrilBtnUrl: payment?.skrilBtnUrl || '',
        jcbBtnUrl: payment?.jcbBtnUrl || '',
        americanExpressBtnUrl: payment?.americanExpressBtnUrl || ''
    });

    const [editPayment, { isLoading }] = useEditPaymentMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editPayment({ 
                id: payment._id,
                ...formData
            }).unwrap();
            
            Swal.fire({
                icon: 'success',
                title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
                text: lang === 'AZ' 
                    ? 'Ödəniş metodu uğurla yeniləndi!' 
                    : 'Payment method updated successfully!',
                timer: 2000,
                showConfirmButton: false
            });
            refetch();
            onClose();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: lang === 'AZ' ? 'Xəta!' : 'Error!',
                text: error.data?.message || (lang === 'AZ' 
                    ? 'Ödəniş metodunun yenilənməsi zamanı xəta baş verdi' 
                    : 'Failed to update payment method'),
            });
        }
    };

    return (
        <form className='form-container p-4 border rounded shadow-sm' onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="spanAze" className="form-label">
                        {lang === 'AZ' ? 'Alt Başlıq (AZ):' : 'Subtitle (AZ):'}
                    </label>
                    <input
                        type="text"
                        name="spanAze"
                        className="form-control"
                        value={formData.spanAze}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="spanEng" className="form-label">
                        {lang === 'AZ' ? 'Alt Başlıq (EN):' : 'Subtitle (EN):'}
                    </label>
                    <input
                        type="text"
                        name="spanEng"
                        className="form-control"
                        value={formData.spanEng}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="headingAze" className="form-label">
                        {lang === 'AZ' ? 'Başlıq (AZ):' : 'Heading (AZ):'}
                    </label>
                    <input
                        type="text"
                        name="headingAze"
                        className="form-control"
                        value={formData.headingAze}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="headingEng" className="form-label">
                        {lang === 'AZ' ? 'Başlıq (EN):' : 'Heading (EN):'}
                    </label>
                    <input
                        type="text"
                        name="headingEng"
                        className="form-control"
                        value={formData.headingEng}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <h6 className="mt-4">{lang === 'AZ' ? 'Ödəniş Üsulları:' : 'Payment Methods:'}</h6>
            
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="visaBtnUrl" className="form-label">Visa URL</label>
                    <input
                        type="url"
                        name="visaBtnUrl"
                        className="form-control"
                        value={formData.visaBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.visa.com"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="masterCardBtnUrl" className="form-label">MasterCard URL</label>
                    <input
                        type="url"
                        name="masterCardBtnUrl"
                        className="form-control"
                        value={formData.masterCardBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.mastercard.com"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="payPalBtnUrl" className="form-label">PayPal URL</label>
                    <input
                        type="url"
                        name="payPalBtnUrl"
                        className="form-control"
                        value={formData.payPalBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.paypal.com"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="skrilBtnUrl" className="form-label">Skrill URL</label>
                    <input
                        type="url"
                        name="skrilBtnUrl"
                        className="form-control"
                        value={formData.skrilBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.skrill.com"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="jcbBtnUrl" className="form-label">JCB URL</label>
                    <input
                        type="url"
                        name="jcbBtnUrl"
                        className="form-control"
                        value={formData.jcbBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.jcb.com"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="americanExpressBtnUrl" className="form-label">American Express URL</label>
                    <input
                        type="url"
                        name="americanExpressBtnUrl"
                        className="form-control"
                        value={formData.americanExpressBtnUrl}
                        onChange={handleChange}
                        placeholder="https://www.americanexpress.com"
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    {lang === 'AZ' ? 'Ləğv et' : 'Cancel'}
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading 
                        ? (lang === 'AZ' ? 'Yenilənir...' : 'Updating...') 
                        : (lang === 'AZ' ? 'Yenilə' : 'Update')}
                </button>
            </div>
        </form>
    );
};

export default EditPaymentForm;