import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const Hero = () => {
    const {lang}=useContext(LangContext)

    return (
        <section className="hero">
            <div className="container">
                <span>{lang==='AZ'?'Ən son bizdən':'Latest Form Us'}</span>
                <h1>{lang==='AZ'?'Xəbərlər və Promo':'News & Promo'}</h1>
            </div>
        </section>
    )
}

export default Hero