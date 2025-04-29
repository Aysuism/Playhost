import React from 'react';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { useGetServiceQuery } from '../../dashboard/tools/api/home-service';

const IncrediblyFeatures = () => {
  const { lang } = useContext(LangContext);
  const { data: services = []} = useGetServiceQuery();

  return (
    <section className="incredibly-features">
      <div className="container-fluid">
        <div className="row">
          <span>{lang === 'AZ' ? 'İnanılmaz Xüsusiyyətlər' : 'Incredibly Features'}</span>
          <h1>{lang === 'AZ' ? 'Premium Oyun Serveri' : 'Premium Game Server'}</h1>
          {services.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
              <div className="features">
                <img src={`https://playhost-backend.onrender.com/${item.iconUrl}`} alt="service-icon" />
                <h4>{lang === 'Az' ? item.titleAze : item.titleEng}</h4>
                <p>{lang === 'Az' ? item.descriptionAze : item.descriptionEng}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncrediblyFeatures;