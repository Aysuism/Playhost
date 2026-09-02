import React, { useState } from 'react';
import { useGetFaqsQuery } from '../../dashboard/tools/api/faq';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

const Questions = () => {
    const { lang } = useContext(LangContext);
    const { data: faqs = [] } = useGetFaqsQuery();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="questions">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="accordion" id="accordionExample">
                            {faqs.map((item, index) => (
                                <div key={item._id} className="accordion-item" data-aos="fade-up">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} >
                                            {lang === "AZ" ? item.titleAze : item.titleEng}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample" >
                                        <div className="accordion-body">
                                            {lang === "AZ" ? item.descriptionAze : item.descriptionEng}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Questions;