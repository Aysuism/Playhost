import React from 'react'
import { useGetHomeFooterQuery } from '../../dashboard/tools/api/home-footer'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const DowloadNow = () => {
    const { lang } = useContext(LangContext)

    const { data: footer=[]} = useGetHomeFooterQuery()

    return (
        <section className="download-now">
            <div className="container-fluid">
                {footer.map((item) => (
                    <div key={item._id} className="avatar" data-aos="fade-up">
                        <div className="text">
                            <span>{lang === 'AZ' ? item.spanAze : item.spanEng}</span>
                            <h1>{lang === 'AZ' ? item.headingAze : item.headingEng}</h1>
                            <p>{lang === 'AZ' ? item.descriptionAze : item.descriptionEng}</p>
                            <div className="install">
                                <a href='https://www.apple.com/store'>
                                    <img src="https://madebydesignesia.com/themes/playhost/images/misc/download-appstore.webp" alt="" />
                                </a>
                                <a href='https://play.google.com/store'>
                                    <img src="https://madebydesignesia.com/themes/playhost/images/misc/download-playstore.webp" alt="" />
                                </a>
                            </div>
                        </div>
                        <img className='right-pic' src="https://madebydesignesia.com/themes/playhost/images/misc/man-with-phone.webp" alt="" />
                        <img className='bg-img' src={`https://playhost-backend.onrender.com/${item.backgroundImageUrl}`} alt="" />

                    </div>
                ))}
            </div>
        </section>
    )
}

export default DowloadNow