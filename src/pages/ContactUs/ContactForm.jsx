import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';
import { notify } from '../../hooks/useNotify';

const ContactForm = () => {
    const { lang } = useContext(LangContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\s()-]{7,15}$/;

        if (!formData.name.trim()) {
            newErrors.name = lang === 'AZ' ? 'Ad daxil edilməlidir' : 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = lang === 'AZ' ? 'Email daxil edilməlidir' : 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = lang === 'AZ' ? 'Düzgün email daxil edin' : 'Enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = lang === 'AZ' ? 'Telefon daxil edilməlidir' : 'Phone is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = lang === 'AZ' ? 'Düzgün telefon nömrəsi daxil edin' : 'Enter a valid phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = lang === 'AZ' ? 'Mesaj daxil edilməlidir' : 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        notify.success('Mesajınız göndərildi!', 'Your message has been sent!');
        setFormData({ name: '', email: '', phone: '', message: '' });
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
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={lang === 'AZ' ? 'Adınızı daxil edin' : 'Your Name'}
                            />
                            {errors.name && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</div>}

                            <span>{lang === 'AZ' ? 'Email' : 'Email'}</span>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={lang === 'AZ' ? 'E-poçt ünvanınızı daxil edin' : 'Your Email'}
                            />
                            {errors.email && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</div>}

                            <span>{lang === 'AZ' ? 'Telefon' : 'Phone'}</span>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={lang === 'AZ' ? 'Telefon nömrənizi daxil edin' : 'Your Phone'}
                            />
                            {errors.phone && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.phone}</div>}
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 px-5">
                        <div className="field-set">
                            <span>{lang === 'AZ' ? 'Mesaj' : 'Message'}</span>
                            <textarea
                                className="text-light"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={lang === 'AZ' ? 'Mesajınızı daxil edin' : 'Your Message'}
                            ></textarea>
                            {errors.message && <div style={{ color: 'red', fontSize: '0.85rem' }}>{errors.message}</div>}
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