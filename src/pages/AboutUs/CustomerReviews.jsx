import React from 'react';
import { useGetReviewsQuery } from '../../dashboard/tools/api/about-review';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';  // Import Swiper components
import '../../../node_modules/swiper/swiper-bundle.min.css';  // Import Swiper styles
import { Pagination, Autoplay } from '../../../node_modules/swiper/modules';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CustomerReviews = () => {
    const { data: review } = useGetReviewsQuery();

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = (rating % 1) >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <span key={`full-${index}`} style={{ color: 'yellow' }}><FaStar /></span>
                ))}
                {[...Array(halfStars)].map((_, index) => (
                    <span key={`half-${index}`} style={{ color: 'yellow' }}><FaStarHalfAlt /></span>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={`empty-${index}`} style={{ color: 'gray' }}><CiStar /></span>
                ))}
            </>
        );
    };

    return (
        <section
            className="customer-reviews"
        >
            <div className="container">
                <div className="row">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                            type: 'bullets'
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            // When window width is >= 576px (sm)
                            576: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            // When window width is >= 768px (md)
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            // When window width is >= 992px (lg)
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            }
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                        data-aos="fade-up"
                    >
                        {review?.map((item) => (
                            <SwiperSlide key={item._id}>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="comment-box"
                                >
                                    <div className="comment-rating">
                                        <p>{renderStars(item.reyting)}</p>
                                    </div>
                                    <div className="comment-text">
                                        <p>{item.comment}</p>
                                    </div>
                                    <div className="comment-header">
                                        <img
                                            src={`https://playhost-backend.onrender.com/${item.avatarUrl}`}
                                            alt="User Avatar"
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                        />
                                        <p style={{ fontWeight: 'bold' }}>{item.fullname}</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
