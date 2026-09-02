import React from 'react';
import CountUp from 'react-countup';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { useGetCountersQuery } from '../../dashboard/tools/api/about-counter';

const Accomplisments = () => {
    const { data: counter=[]} = useGetCountersQuery();
    const { lang } = useContext(LangContext);


    return (
        <section className="accomplishments">
            <div className="container-fluid">
                <div className="row">
                    {counter.map((item) => (
                        <div key={item._id} className="col-lg-3 col-md-6 col-sm-6 num-box" data-aos="zoom-in">
                            <h3 className='purple-num'>
                                <CountUp 
                                    start={0} 
                                    end={item.value} 
                                    duration={3}
                                    enableScrollSpy={true}  // This makes it animate on scroll
                                    scrollSpyDelay={100}   // Optional delay (ms)
                                    scrollSpyOnce={false} // Set to true if you only want it once
                                />
                            </h3>
                            <h4>{lang === 'AZ' ? item.headingAze : item.headingEng}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Accomplisments;