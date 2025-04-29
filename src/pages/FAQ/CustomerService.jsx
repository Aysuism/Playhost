import React from 'react'
import { Link } from 'react-router'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const CustomerService = () => {
  const { lang } = useContext(LangContext)
  return (
    <section className="customer-service">
      <div className="container-fluid">
        <div className="cant-find-answer">
          <img src="https://madebydesignesia.com/themes/playhost/images/icons/4.png" alt="" />
          <h4>{lang==='AZ'?'Cavab tapa bilmirsiniz? İndi müştəri dəstəyimizlə əlaqə saxlayın.':'Cannot find answer? Contact our customer support now.'}</h4>
          <Link to={'/contact'} style={{textTransform:"uppercase"}} className='purple-btn'>{lang==='AZ'?'Bizimlə Əlaqə Qur':'Contact Us'}</Link>
        </div>
      </div>
    </section>
  )
}

export default CustomerService