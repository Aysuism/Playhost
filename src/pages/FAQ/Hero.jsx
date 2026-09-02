import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const Hero = () => {
  const {lang}=useContext(LangContext)
  return (
    <section className="hero">
      <div className="container">
        <span>{lang==='AZ'?'Hər hansı bir':'Do you have'} </span>
        <h1>{lang==='AZ'?'Sualınız var?':'Any questions?'}</h1>
      </div>
    </section>
  )
}

export default Hero