import { useContext } from "react";
import { LangContext } from '../../context/LangContext';
import { useGetSlidersQuery } from "../../dashboard/tools/api/home-slider";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { BASE_URL } from "../../app";

const Hero = () => {
    const { lang } = useContext(LangContext);
    const { data: sliders = [] } = useGetSlidersQuery();

    return (
        <div className="hero">
            <Carousel interval={2000} pause={false}>
                {sliders.map((item, index) => (
                    <Carousel.Item key={item._id}>
                        <img className="d-block w-100" src={BASE_URL + item.backgroundImageUrl.replace(/\\/g, '/')} alt={lang === 'AZ' ? item.titleAze : item.titleEng}
                            onError={(e) => {
                                e.target.src = '/fallback-image.jpg';
                            }} />
                        <Carousel.Caption>
                            <span>{lang === 'AZ' ? 'Server uyğundur' : 'Server is available'}</span>
                            <h1 className='big-title'>{item.heading}</h1>
                            <p>{lang === 'AZ' ? item.descriptionAze.slice(0, 230) : item.descriptionEng.slice(0, 230)}</p>
                            <div className="order">
                                $ <h1 className='price'>{item.price}</h1> {lang === 'AZ' ? '/aylıq' : '/monthly'}
                            </div>
                            <Link to={'/games'} style={{ textDecoration: 'none' }} className='order-btn'>
                                {lang === 'AZ' ? 'OYUNLARI NƏZƏRDƏN KEÇİRİN' : 'REVIEW GAMES'}
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Hero;