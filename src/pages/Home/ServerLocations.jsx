import React from 'react'
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext'

const ServerLocations = () => {
    const { lang } = useContext(LangContext);

    return (
        <section className="server-locations">
            <div className="container-fluid">
                <div className="row">
                    <div data-aos="fade-up" className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center">
                        <img src="https://madebydesignesia.com/themes/playhost/images/misc/server.webp" alt="" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 py-5">
                        <div className="text">
                            <span data-aos="fade-up">{lang === 'AZ' ? 'Server yerləri' : 'Server locations'}</span>
                            <h1 data-aos="fade-up"> <a href="#">25</a>{lang === 'AZ' ? 'oyununuz üçün bütün dünyada mövcud olan serverlər.' : 'servers available worldwide for your game.'} </h1>
                            <p data-aos="fade-up">{lang === 'AZ' ? "Oyun serverinin hostinq seçimləri kolleksiyamız bu gün ən çox tələb olunan platformaları əhatə edir. Təkliflərimiz çərçivəsində siz hər bir oyuna uyğunlaşdırılmış geniş çeşidli ixtisaslaşmış alətlər və funksiyalar kəşf edəcəksiniz, biz bütün bunları oyun və mod yeniləmələri ilə sinxronlaşdırmaq üçün səylə yeniləyirik." : "Our collection of game server hosting options encompasses the most in-demand platforms of today. Within our offerings, you'll discover an extensive array of specialized tools and features tailored to each game, all of which we diligently keep up to date in sync with game and mod updates."}</p>
                            <div data-aos="fade-up" className="locations">
                                <span>Londan, England</span>
                                <span>Paris, France</span>
                                <span>Frankut, Germany</span>
                                <span>Amsterdam, Netherlands</span>
                                <span>Stockholm, Sweden</span>
                                <span>Helsinski, Finland</span>
                                <span>Los Angeles, USA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServerLocations