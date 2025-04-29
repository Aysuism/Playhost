import React from 'react'
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext'
import { Link } from 'react-router';

const StartYourGame = () => {
    const { lang } = useContext(LangContext);

    return (
        <section className="start-your-game">
            <div className="container-fluid">
                <div className="avatar" data-aos="fade-up">
                    <div className="text">
                        <span>{lang === 'AZ' ? 'Oyununuzu Başlayın' : 'Start your game'}</span>
                        <h1>{lang === 'AZ' ? 'Tam Oyun Potensialınızı açın' : 'Unlock Your Gaming Full Potential'}</h1>
                        <p>Aute esse non magna elit dolore dolore dolor sit est. Ea occaecat ea duis laborum reprehenderit id cillum tempor cupidatat qui nisi proident nostrud dolore id do eiusmod. Lorem ipsum non labore.</p>
                        <Link className='purple-btn' to={'/games'}>{lang === 'AZ' ? 'OYUNUNUZU İNDİ SİFARİŞ EDİN' : 'ORDER YOUR GAME NOW'}</Link>
                    </div>
                    <img className='right-pic' src="https://madebydesignesia.com/themes/playhost/images/misc/avatar.webp" alt="" />
                </div>
            </div>
        </section>
    )
}

export default StartYourGame