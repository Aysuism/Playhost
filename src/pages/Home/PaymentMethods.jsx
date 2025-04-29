import React from 'react'
import { useGetPaymentQuery } from '../../dashboard/tools/api/payment'
import { useContext } from 'react'
import {LangContext} from '../../context/LangContext'
const PaymentMethods = () => {
    const { data: payments=[] } = useGetPaymentQuery()
    const {lang}=useContext(LangContext)

    return (
        <section className="payment-methods">
            <div className="container">
                {payments.map((item) => (
                    <div key={item._id} className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <span>{lang==="AZ"?item.spanAze:item.spanEng}</span>
                            <h1>{lang==="AZ"?item.headingAze:item.headingEng}</h1>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="pay-icons">
                                <a data-aos="fade-up" href={item.visaBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/visa.webp" alt="" /></a>
                                <a data-aos="fade-up" href={item.masterCardBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/mastercard.webp" alt="" /></a>
                                <a data-aos="fade-up" href={item.payPalBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/paypal.webp" alt="" /></a>
                                <a data-aos="fade-up" href={item.skrilBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/skrill.webp" alt="" /></a>
                                <a data-aos="fade-up" href={item.jcbBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/jcb.webp" alt="" /></a>
                                <a data-aos="fade-up" href={item.americanExpressBtnUrl}><img src="https://madebydesignesia.com/themes/playhost/images/payments/american-express.webp" alt=""/></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default PaymentMethods