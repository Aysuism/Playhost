import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaQuestion } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { IoGameController } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { LangContext } from '../context/LangContext';
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <section className="sidebar">
        <div className="custom-dropdown">
          <div className="dropdown-header" onClick={() => setOpen(!open)}>
            {lang === 'AZ' ? 'Ümumi Parametrlər Menyusu' : 'General Settings Menu'}
            <IoIosArrowDown className='icon' />
          </div>
          {open && (
            <div className="dropdown-options">
              <div onClick={() => { navigate('/dashboard/settings-management'); setOpen(false); }}>
                <IoMdSettings className='icon' />
                {lang === 'AZ' ? 'Ümumi Parametrlər' : 'General Settings'}
              </div>
              <div onClick={() => { navigate('/dashboard/home-management'); setOpen(false); }}>
                <FaHome className='icon' />
                {lang === 'AZ' ? 'Ev' : 'Home'}
              </div>
              <div onClick={() => { navigate('/dashboard/about-management'); setOpen(false); }}>
                <HiUserGroup className='icon' />
                {lang === 'AZ' ? 'Haqqımızda' : 'About Us'}
              </div>
              <div onClick={() => { navigate('/dashboard/blog-management'); setOpen(false); }}>
                <ImNewspaper className='icon' />
                {lang === 'AZ' ? 'Bloq' : 'Blog'}
              </div>
              <div onClick={() => { navigate('/dashboard/faq-management'); setOpen(false); }}>
                <FaQuestion className='icon' />
                {lang === 'AZ' ? 'Tez-tez verilən suallar' : 'FAQ'}
              </div>
              <div onClick={() => { navigate('/dashboard/games-management'); setOpen(false); }}>
                <IoGameController className='icon' />
                {lang === 'AZ' ? 'Oyunlar' : 'Games'}
              </div>
            </div>
          )}

        </div>
      </section>
    );
  }

  return (
    <section className="sidebar">
      <div className="sidebar-container">
        <div className="menu-item" onClick={() => navigate('/dashboard/settings-management')}>
          <IoMdSettings className='icon' />
          {lang === 'AZ' ? 'Ümumi Parametrlər' : 'General Settings'}
        </div>
        <div className="menu-item" onClick={() => navigate('/dashboard/home-management')}>
          <FaHome className='icon' />
          {lang === 'AZ' ? 'Ev' : 'Home'}
        </div>
        <div className="menu-item" onClick={() => navigate('/dashboard/about-management')}>
          <HiUserGroup className='icon' />
          {lang === 'AZ' ? 'Haqqımızda' : 'About Us'}
        </div>
        <div className="menu-item" onClick={() => navigate('/dashboard/blog-management')}>
          <ImNewspaper className='icon' />
          {lang === 'AZ' ? 'Bloq' : 'Blog'}
        </div>
        <div className="menu-item" onClick={() => navigate('/dashboard/faq-management')}>
          <FaQuestion className='icon' />
          {lang === 'AZ' ? 'Tez-tez verilən suallar' : 'FAQ'}
        </div>
        <div className="menu-item" onClick={() => navigate('/dashboard/games-management')}>
          <IoGameController className='icon' />
          {lang === 'AZ' ? 'Oyunlar' : 'Games'}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
