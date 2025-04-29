import React from 'react'
import { useContext } from 'react';
import { IoStarSharp } from 'react-icons/io5'
import { LangContext } from '../../context/LangContext';

const ServerHosting = ({ alldata }) => {
  const { lang } = useContext(LangContext)
  const rating = alldata.rating || 0;

  const getStarColor = (position) => {
    if (position <= rating) {
      return '#ffc107'; // Yellow for filled stars
    } else if (position - 0.5 <= rating) {
      return '#ffc107'; // Yellow for half stars
    }
    return '#e4e5e9'; // Gray for empty stars
  }

  return (
    <section className="server-hosting">
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12 pb-5">
            <img src={`https://playhost-backend.onrender.com/${alldata.imageUrl}`} alt={alldata.title} />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="text">
              <span>{lang==='AZ'?'Server Hostinqi':'Server Hosting'}</span>
              <h1>{alldata.gameName}</h1>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((position) => (
                  <IoStarSharp
                    key={position}
                    className='star'
                    style={{ color: getStarColor(position) }}
                  />
                ))}
                <div className='scoree'>{rating.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServerHosting