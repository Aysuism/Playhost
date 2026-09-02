import React, { useState, useContext } from 'react';
import EditPaymentForm from './EditPaymentForm';
import { LangContext } from '../../../context/LangContext';
import { useDeletePaymentMutation } from '../../tools/api/payment';
import Swal from 'sweetalert2';

const DataPayment = ({ payments, refetch }) => {
    const [editingPayment, setEditingPayment] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    // const [deletePayment] = useDeletePaymentMutation();
    const { lang } = useContext(LangContext);

    // const handleDelete = async (id) => {
    //     if (window.confirm(lang === 'AZ'
    //         ? 'Bu ödəniş metodunu silmək istədiyinizə əminsiniz?'
    //         : 'Are you sure you want to delete this payment item?')) {
    //         try {
    //             await deletePayment(id).unwrap();
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: lang === 'AZ' ? 'Uğurlu!' : 'Success!',
    //                 text: lang === 'AZ'
    //                     ? 'Ödəniş metodu uğurla silindi!'
    //                     : 'Payment item deleted successfully!',
    //                 timer: 2000,
    //                 showConfirmButton: false
    //             });
    //             refetch();
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: lang === 'AZ' ? 'Xəta!' : 'Error!',
    //                 text: lang === 'AZ'
    //                     ? 'Ödəniş metodunun silinməsi zamanı xəta baş verdi'
    //                     : 'Failed to delete payment item'
    //             });
    //         }
    //     }
    // };

    return (
        <div className="dashboard-container">
            {/* Edit Modal */}
            {showEditModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header bg-purple text-white">
                                    <h5 className="modal-title">{lang === 'AZ' ? 'Ödəniş Metodlarını Redaktə Et' : 'Edit Payment Methods'}</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowEditModal(false)}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {editingPayment && (
                                        <EditPaymentForm
                                            payment={editingPayment}
                                            onClose={() => {
                                                setEditingPayment(null);
                                                setShowEditModal(false);
                                            }}
                                            refetch={refetch}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="dashboard-grid" style={{ gridTemplateColumns: 'none' }}>
                {payments?.map((item) => (
                    <div key={item._id} className="dashboard-card">
                        <div className="dashboard-content row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h3 className="dashboard-heading">
                                    <span className="dashboard-heading-label">
                                        {lang === 'AZ' ? 'Başlıq (Az):' : 'Heading (Az):'}
                                    </span>
                                    {item.headingAze}
                                </h3>
                                <h3 className="dashboard-heading">
                                    <span className="dashboard-heading-label">
                                        {lang === 'AZ' ? 'Başlıq (En):' : 'Heading (En):'}
                                    </span>
                                    {item.headingEng}
                                </h3>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="dashboard-description">
                                    <div className="description-item">
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Alt Başlıq (Aze):' : 'SubTitle (Aze):'}
                                        </span>
                                        <p>{item.spanAze}</p>
                                    </div>
                                    <div className="description-item">
                                        <span className="description-label">
                                            {lang === 'AZ' ? 'Alt Başlıq (Eng):' : 'SubTitle (Eng):'}
                                        </span>
                                        <p>{item.spanEng}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="dashboard-meta d-flex flex-wrap pt-3">
                                    <div className="meta-item">
                                        <div className="meta-label">Visa:</div>
                                        <div className="meta-value">{item.visaBtnUrl}</div>
                                    </div>
                                    <div className="meta-item">
                                        <div className="meta-label">MasterCard: </div>
                                        <div className="meta-value">{item.masterCardBtnUrl}</div>
                                    </div>
                                    <div className="meta-item">
                                        <div className="meta-label">PayPal: </div>
                                        <div className="meta-value">{item.payPalBtnUrl}</div>
                                    </div>
                                    <div className="meta-item">
                                        <div className="meta-label">Skrill: </div>
                                        <div className="meta-value">{item.skrilBtnUrl}</div>
                                    </div>
                                    <div className="meta-item">
                                        <div className="meta-label">JCB: </div>
                                        <div className="meta-value">{item.jcbBtnUrl}</div>
                                    </div>
                                    <div className="meta-item">
                                        <div className="meta-label">American : </div>
                                        <div className="meta-value"> {item.americanExpressBtnUrl}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-actions" style={{display:'inline-block',}}>
                                <button
                                    type="button"
                                    className="btn btn-edit"
                                    onClick={() => {
                                        setEditingPayment(item);
                                        setShowEditModal(true);
                                    }}
                                >
                                    {lang==='AZ'?'Redaktə Et':'Edit'}
                                </button>
                                {/* <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    {lang === 'AZ' ? 'Sil' : 'Delete'}
                                </button> */}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataPayment;