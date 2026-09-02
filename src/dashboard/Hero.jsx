import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../context/LangContext'

const Hero = () => {
    const {lang}=useContext(LangContext)
    return (
        <div className='hero'>
            <div className="container">
                <h1>{lang==='AZ'?'Idarə Paneli':'Dashboard'}</h1>
            </div>
        </div>
    )
}

export default Hero