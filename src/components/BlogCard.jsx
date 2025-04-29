import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { LangContext } from '../context/LangContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlogCard = ({ alldata }) => {
  const { lang } = useContext(LangContext);

  const engSlug = slugify(alldata.titleEng, { lower: true });


  return (
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom" className="col-lg-4 col-md-6 col-sm-12">

      <Link className="news" to={`/blog/${engSlug}`}>
        <img
          src={`https://playhost-backend.onrender.com/${alldata.imageUrl}`}
          alt={lang === 'AZ' ? alldata.titleAze : alldata.titleEng}
        />
        <h4>{lang === 'AZ' ? alldata.titleAze : alldata.titleEng}</h4>
        <p>{lang === 'AZ' ? alldata.descriptionAze.slice(0, 130) : alldata.descriptionEng.slice(0, 130)}</p>
      </Link>
    </div>
  );
};

export default BlogCard;