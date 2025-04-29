import React from 'react';
import DataPayment from './DataPayment';
import AddPaymentForm from './AddPaymentForm';
import { useGetPaymentQuery } from '../../tools/api/payment';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const PaymentManagement = () => {
  const { lang } = useContext(LangContext)
  const { data: payments=[], refetch } = useGetPaymentQuery();
  // const [showModal, setShowModal] = useState(false);


  return (
    <div className="payment-management">
      {/* {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal show" style={{ display: 'block' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Payment Method</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" ></button>
                  </div>
                  <div className="modal-body">
                    <AddPaymentForm
                      refetch={refetch}
                      onClose={() => setShowModal(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
      <div className='p-3'>
        <h1>{lang==='AZ'?'Ödəniş Metodları İdarəsi':'Payment Method Management'}</h1>
      </div>

      {/* Display payment methods in a table */}
      <DataPayment payments={payments} refetch={refetch} />

    </div>
  );
};

export default PaymentManagement;