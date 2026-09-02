import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const Hero = () => {
    const { lang } = useContext(LangContext)

    return (
        <section className="hero">
            <div className="text">
                <span>{lang==='AZ'?'Bizim Haqqımızda':'About us'}</span>
                <h1>{lang==='AZ'?'Bu Bizim Hekayəmizdir':'This is our story'}</h1>
            </div>
        </section>
    )
}

export default Hero