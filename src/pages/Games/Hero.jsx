import React from 'react'
import { useContext } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LangContext } from '../../context/LangContext'
const Hero = ({ setKeyword }) => {

    const { lang } = useContext(LangContext)

    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <section className='hero'>
            <div className="text">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" onChange={handleSearch} type="search" placeholder={lang==='AZ'?'Oyun Adını Daxil Edinı':'Enter game title'} aria-label="Search" />
                    <FaMagnifyingGlass className='magnifying-glass' />
                </form>
                <span>{lang==='AZ'?'Ən Tanınmış':'Most Complete'}</span>
                <h1>{lang==='AZ'?'Oyun Kolleksiyası':'Game Collection'}</h1>
            </div>
        </section>
    )
}

export default Hero