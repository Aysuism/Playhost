import { useContext } from 'react'

import { useGetPaymentQuery } from '../../dashboard/tools/api/payment'
import { LangContext } from '../../context/LangContext'
const PaymentMethods = () => {
    const { data: payments } = useGetPaymentQuery()
    const { lang } = useContext(LangContext)

    return (
        <section className="payment-methods">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <span>{lang === "AZ" ? payments?.spanAze : payments?.spanEng}</span>
                        <h1>{lang === "AZ" ? payments?.headingAze : payments?.headingEng}</h1>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="pay-icons">
                            <a data-aos="fade-up" href={payments?.visaBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/visa.webp" alt="" /></a>
                            <a data-aos="fade-up" href={payments?.masterCardBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/mastercard.webp" alt="" /></a>
                            <a data-aos="fade-up" href={payments?.payPalBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/paypal.webp" alt="" /></a>
                            <a data-aos="fade-up" href={payments?.skrilBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/skrill.webp" alt="" /></a>
                            <a data-aos="fade-up" href={payments?.jcbBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/jcb.webp" alt="" /></a>
                            <a data-aos="fade-up" href={payments?.americanExpressBtnUrl}><img src="https://designesia.com/themes/playhost/images/payments/american-express.webp" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentMethods