import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ContactForm = () => {
    const { lang } = useContext(LangContext);

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior

        // Show SweetAlert2 confirmation message
        Swal.fire({
            icon: 'success',
            title: lang === 'AZ' ? 'Mesajınız göndərildi!' : 'Your message has been sent!',
            showConfirmButton: false,
            timer: 1500, // Message disappears after 1.5 seconds
        }).then(() => {
            window.location.reload(); // Reload the page after the alert disappears
        });
    };

    return (
        <section className="contact-form">
            <div className="container">
                <div className="row p-4">
                    <div className="col-12">
                        <p>
                            {lang === 'AZ' ? 'Zəhmət olmasa, əvvəlcə ' : 'Please read our '}
                            <Link to="/faq">{lang === 'AZ' ? 'Tez-tez verilən suallar' : 'FAQ page'}</Link>
                            {lang === 'AZ' ? ' səhifəmizə baxın. Suallarınız varsa, bizə yazmaqdan çəkinməyin.' : ' first. If you have any questions, feel free to message us.'}
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <form className="field-set" onSubmit={handleSubmit}>
                            <span>{lang === 'AZ' ? 'Ad' : 'Name'}</span>
                            <input type="text" placeholder={lang === 'AZ' ? 'Adınızı daxil edin' : 'Your Name'} required />
                            <span>{lang === 'AZ' ? 'Email' : 'Email'}</span>
                            <input type="email" placeholder={lang === 'AZ' ? 'E-poçt ünvanınızı daxil edin' : 'Your Email'} required />
                            <span>{lang === 'AZ' ? 'Telefon' : 'Phone'}</span>
                            <input type="text" placeholder={lang === 'AZ' ? 'Telefon nömrənizi daxil edin' : 'Your Phone'} required />
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 px-5">
                        <div className="field-set">
                            <span>{lang === 'AZ' ? 'Mesaj' : 'Message'}</span>
                            <textarea className='text-light' placeholder={lang === 'AZ' ? 'Mesajınızı daxil edin' : 'Your Message'} required></textarea>
                        </div>
                    </div>
                    <div className="purple-btn" onClick={handleSubmit}>
                        {lang === 'AZ' ? 'GÖNDƏR' : 'SEND MESSAGE'}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
