import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <section className='not-found-page'>
      <div className="text">
        <img src='/glitch-404-removebg-preview.png' alt="" />
        <h3>OOPS... PAGE NOT FOUND</h3>
        <p>Try Using The Button Below To Go To Main Page Of The Site</p>
        <Link className='back-home' to={'/'}>Back to HomePage</Link>
      </div>
    </section>
  )
}

export default NotFound