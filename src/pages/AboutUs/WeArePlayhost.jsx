import React from 'react'
import { useGetIntroductionQuery } from '../../dashboard/tools/api/about-introduction'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'
import { BASE_URL } from '../../app'

const WeArePlayhost = () => {
    const { data: introduction } = useGetIntroductionQuery()
    const { lang } = useContext(LangContext)

    return (
        <div className="we-are-playhost">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className="left-img">
                            <img data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom" className='back-img' src={BASE_URL + introduction?.imageUrl} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 py-5">
                        <div className="text">
                            <span>{lang === 'AZ' ? introduction?.spanAze : introduction?.spanEng}</span>
                            <h1>{lang === 'AZ' ? introduction?.headingAze : introduction?.headingEng}</h1>
                            <p>{lang === 'AZ' ? introduction?.descriptionAze : introduction?.descriptionEng}</p>
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
                            <h4>{lang === 'AZ' ? introduction?.titleFirstAze : introduction?.titleFirstEng}</h4>
                            <p>{lang === 'AZ' ? introduction?.subdescriptionFirstAze : introduction?.subdescriptionFirstEng}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="vision-mission">
                            <h4>{lang === 'AZ' ? introduction?.titleSecondAze : introduction?.titleSecondEng}</h4>
                            <p>{lang === 'AZ' ? introduction?.subdescriptionSecondAze : introduction?.subdescriptionSecondEng}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeArePlayhost