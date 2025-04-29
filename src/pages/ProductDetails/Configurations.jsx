import React, { useContext, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCart } from 'react-use-cart';
import { LangContext } from '../../context/LangContext';
import Swal from 'sweetalert2';


const baseFlagUrl = 'https://madebydesignesia.com/themes/playhost/images/flags';

// Predefined locations with country and flag URLs
const PREDEFINED_LOCATIONS = [
  { country: 'London, England', flagUrl: `${baseFlagUrl}/united-kingdom.png` },
  { country: 'Paris, France', flagUrl: `${baseFlagUrl}/france.png` },
  { country: 'Frankfurt, Germany', flagUrl: `${baseFlagUrl}/germany.png` },
  { country: 'Stockholm, Sweden', flagUrl: `${baseFlagUrl}/sweden.png` },
  { country: 'Amsterdam, Netherlands', flagUrl: `${baseFlagUrl}/netherlands.png` },
  { country: 'Helsinki, Finland', flagUrl: `${baseFlagUrl}/finland.png` },
  { country: 'Los Angeles, USA', flagUrl: `${baseFlagUrl}/usa.png` },
  { country: 'Quebec, Canada', flagUrl: `${baseFlagUrl}/canada.png` },
  { country: 'Sydney, Australia', flagUrl: `${baseFlagUrl}/australia.png` },
  { country: 'Sao Paulo, Brazil', flagUrl: `${baseFlagUrl}/brazil.png` },
  { country: 'Bangkok, Thailand', flagUrl: `${baseFlagUrl}/thailand.png` },
  { country: 'Jakarta, Indonesia', flagUrl: `${baseFlagUrl}/indonesia.png` }
];

const Configurations = ({ alldata = {} }) => {
    const { lang } = useContext(LangContext);
    
    //--------------------- Basket
    const { addItem } = useCart();

    const basketItem = {
        id: alldata?._id,
        price: alldata?.discountIndicator ? alldata?.discountedPrice : alldata?.originalPrice,
        ...alldata
    };

    const addToCart = () => {
        addItem(basketItem);
        Swal.fire({
            title: lang === "AZ" ? "Məhsul əlavə edildi" : "Product added",
            icon: "success"
        });
    };

    const durations = [1, 3, 7, 30, 90, 365];
    const marks = {
        0: '0',
        50: '50',
        100: '100',
        150: '150',
        200: '200',
        250: '250',
        300: '300',
        350: '350',
        400: '400',
        450: '450',
        500: '500',
    };

    // Get current values from props
    const currentDuration = alldata?.duration || 7;
    const currentSlot = alldata?.slot || 250;
    const currentLocation = alldata?.location?.[0]?.country || '';

    return (
        <section className="configurations">
            <div className="container-fluid px-5">
                {/* Slots Section - Readonly */}
                <section className="slots">
                    <h3>{lang === "AZ" ? "Konfiqurasiya edilmiş slotlar" : "Configurated Slots"}</h3>
                    <p>{lang === "AZ" ? "Oyun serveriniz üçün istifadə edə biləcəyiniz slotların sayı" : "The number of Slot you can use for your game server"}</p>
                    <Slider
                        min={0}
                        max={500}
                        value={currentSlot}
                        marks={marks}
                        step={50}
                        disabled
                        style={{backgroundColor:'transparent'}}
                    />
                </section>

                {/* Duration Section - Readonly */}
                <section className="duration">
                    <div className="container-fluid p-0">
                        <h3>{lang === "AZ" ? "Müddət" : "Duration"}</h3>
                        <p>{lang === "AZ" ? "Oyun serveriniz üçün təyin edilən müddət" : "The time limit set for your game server"}</p>
                        <div className="duration-menu">
                            <div className="row g-4">
                                {durations.map((days) => (
                                    <div key={days} className="col-lg-2 col-md-4 col-sm-6">
                                        <button
                                            type="button"
                                            className={`duration-item ${currentDuration === days ? 'active' : ''}`}
                                            disabled
                                        >
                                            {days} {lang === "AZ" ? "Gün" : "Days"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Locations Section - Readonly */}
                <section className="locations">
                    <div className="container-fluid">
                        <h3>{lang === "AZ" ? "Mövcud yerlər" : "Available Locations"}</h3>
                        <p>{lang === "AZ" ? "Oyun serveriniz üçün mövcud yeri görə bilərsiniz" : "See which location is available for your game server"}</p>
                        <div className="location-menu">
                            <div className="row g-4">
                                {PREDEFINED_LOCATIONS.map((location, index) => (
                                    <div key={index} className="col-lg-2 col-md-4 col-sm-6 text-center">
                                        <div
                                            className={`location-item ${
                                                currentLocation.toLowerCase() === location.country.toLowerCase() ? 'active' : ''
                                            }`}
                                        >
                                            <img 
                                                src={location.flagUrl} 
                                                alt={location.country} 
                                                style={{
                                                    width: '20%',
                                                    objectFit: 'contain',
                                                    paddingBottom:'10px'
                                                }}
                                            />
                                            {location.country}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className='btn add-cart-btn' onClick={addToCart}>
                            {lang === "AZ" ? "Səbətə əlavə et" : "Add To Cart"}
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Configurations;