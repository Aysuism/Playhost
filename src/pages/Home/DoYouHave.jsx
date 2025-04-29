import React, { useContext } from 'react'
import { useGetFaqsQuery } from '../../dashboard/tools/api/faq';
import { LangContext } from '../../context/LangContext';

const DoYouHave = () => {
    const { lang } = useContext(LangContext);

    const { data: faqs=[]} = useGetFaqsQuery();

    return (
        <section className="do-you-have">
            <div className="container-fluid">
                <span>{lang==='AZ'?'Hər hansı':'Do you have'}</span>
                <h1>{lang==='AZ'?'Sualınız var?':'Any questions?'}</h1>

                <div className="accordion" id="accordionExample">
                    {faqs.slice(0, 6).map((item, index) => (
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
        </section>
    )
}

export default DoYouHave