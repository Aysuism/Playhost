import { useContext } from 'react'

import { useGetHomeFooterQuery } from '../../dashboard/tools/api/home-footer'
import { LangContext } from '../../context/LangContext'
import { BASE_URL } from '../../app'

const DowloadNow = () => {
    const { lang } = useContext(LangContext)

    const { data: footer } = useGetHomeFooterQuery()

    return (
        <section className="download-now">
            <div className="container-fluid">
                <div className="avatar" data-aos="fade-up">
                    <div className="text">
                        <span>{lang === 'AZ' ? footer?.spanAze : footer?.spanEng}</span>
                        <h1>{lang === 'AZ' ? footer?.headingAze : footer?.headingEng}</h1>
                        <p>{lang === 'AZ' ? footer?.descriptionAze : footer?.descriptionEng}</p>
                        <div className="install">
                            <a href='https://www.apple.com/store'>
                                <img src="https://designesia.com/themes/playhost/images/misc/download-appstore.webp" alt="" />
                            </a>
                            <a href='https://play.google.com/store'>
                                <img src="https://designesia.com/themes/playhost/images/misc/download-playstore.webp" alt="" />
                            </a>
                        </div>
                    </div>
                    <img className='right-pic' src="https://designesia.com/themes/playhost/images/misc/man-with-phone.webp" alt="" />
                    <img className='bg-img' src={BASE_URL + footer?.backgroundImageUrl} alt={footer?.spanEng} />
                </div>
            </div>
        </section>
    )
}

export default DowloadNow