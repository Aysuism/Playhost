import React from 'react'
import { useGetGamesQuery } from '../../dashboard/tools/api/games';
import SingleCard from '../../components/SingleCard';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext'

const MostComplete = () => {
    const { data: games=[]} = useGetGamesQuery();
    const { lang } = useContext(LangContext);

    const gamesWithDiscount = games.map((game) => {
        const discountPercentage = game.discountIndicator
            ? Math.round(((game.originalPrice - game.discountedPrice) / game.originalPrice) * 100)
            : 0;

        return {
            ...game,
            discountPercentage,
        };
    });

    return (
        <section className="most-complete">
            <div className="container-fluid">
                <span className='sub-title'>{lang==='AZ'?'Ən çox oynanan':'Most complete'}</span>
                <h1 className='title'>{lang==='AZ'?'Oyun Kolleksiyası':'Game Collection'}</h1>
                <div className="row g-4 pt-5">
                    {gamesWithDiscount.slice(0,8).map((item) => (
                        <SingleCard key={item._id} alldata={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MostComplete
