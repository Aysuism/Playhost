import React from 'react'
import Hero from './Hero'
import Questions from './Questions'
import CustomerService from './CustomerService'

const FAQ = () => {
  return (
    <div className='faq'>
      <Hero/>
      <Questions/>
      <CustomerService/>
    </div>
  )
}

export default FAQ