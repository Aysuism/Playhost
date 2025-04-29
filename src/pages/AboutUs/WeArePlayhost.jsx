import React from 'react'
import { useGetIntroductionQuery } from '../../dashboard/tools/api/about-introduction'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'
const WeArePlayhost = () => {
    const { data: introduction=[]} = useGetIntroductionQuery()
    const { lang } = useContext(LangContext)
    console.log(introduction);

    return (
        <div className="we-are-playhost">
            <div className="container-fluid">
                {introduction.map((item) => (
                    <div key={item._id} className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                            <div className="left-img">
                                <img data-aos="fade-up"
                                    data-aos-anchor-placement="top-bottom" className='back-img' src={`https://playhost-backend.onrender.com/${item.imageUrl}`} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 py-5">
                            <div className="text">
                                <span>{lang === 'AZ' ? item.spanAze : item.spanEng}</span>
                                <h1>{lang === 'AZ' ? item.headingAze : item.headingEng}</h1>
                                <p>{lang === 'AZ' ? item.descriptionAze : item.descriptionEng}</p>
                                <div className="experience">
                                    <h1>25</h1>
                                    <ul>
                                        <li>{lang === 'AZ' ? 'Illər' : 'Years'}</li>
                                        <li>{lang === 'AZ' ? 'Təcrübə' : 'Experience'}</li>
                                        <li>{lang === 'AZ' ? 'Ev sahibliyi' : 'Hosting'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="vision-mission">
                                <h4>{lang === 'AZ' ? item.titleFirstAze : item.titleFirstEng}</h4>
                                <p>{lang === 'AZ' ? item.subdescriptionFirstAze : item.subdescriptionFirstEng}</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="vision-mission">
                                <h4>{lang === 'AZ' ? item.titleSecondAze : item.titleSecondEng}</h4>
                                <p>{lang === 'AZ' ? item.subdescriptionSecondAze : item.subdescriptionSecondEng}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeArePlayhost