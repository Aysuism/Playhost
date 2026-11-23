import DataPayment from './DataPayment';
import { useGetPaymentQuery } from '../../tools/api/payment';
import { useContext } from 'react';
import { LangContext } from '../../../context/LangContext';

const PaymentManagement = () => {
  const { lang } = useContext(LangContext)
  const { data: payments, refetch } = useGetPaymentQuery();

  return (
    <div className="payment-management">
      <div className='p-3'>
        <h1>{lang === 'AZ' ? 'Ödəniş Metodları İdarəsi' : 'Payment Method Management'}</h1>
      </div>

      <DataPayment payments={payments} refetch={refetch} />

    </div>
  );
};

export default PaymentManagement;