import React, { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Header from '../layout/Header'
import Footer from '../layout/Footer'

import Home from '../pages/Home/Home'
import Games from '../pages/Games/Games'
import Blog from '../pages/Blog/Blog'
import AboutUs from '../pages/AboutUs/AboutUs'
import Contact from '../pages/ContactUs/Contact'
import FAQ from '../pages/FAQ/FAQ'

import ProductDetails from '../pages/ProductDetails/ProductDetails'
import BlogDetails from '../pages/BlogDetails/BlogDetails'

import WishList from '../pages/WishList/WishList'
import Basket from '../pages/Basket/Basket'
import Checkout from '../pages/Checkout/Checkout'

import DashBoard from '../dashboard/DashBoard'

import HomeManagement from '../dashboard/home/HomeManagement'
import SliderManagement from '../dashboard/home/Slider/SliderManagement'
import ServiceManagement from '../dashboard/home/ServiceM/ServiceManagement'
import PaymentManagement from '../dashboard/home/paymentMethod/PaymentManagement'
import HomeFooterManagement from '../dashboard/home/HomeFooter/HomeFooterManagement'

import AboutManagement from '../dashboard/about/AboutManagement'
import IntroductionManagement from '../dashboard/about/introduction/IntroductionManagement'
import ReviewManagement from '../dashboard/about/customerReviews/ReviewManagement'
import TeamManagement from '../dashboard/about/team/TeamManagement'
import CounterManagement from '../dashboard/about/counter/CounterManagement'

import GamesManagement from '../dashboard/games/GamesManagement'
import ProductManagement from '../dashboard/games/product/ProductManagement'
import CategoryManagement from '../dashboard/games/category/CategoryManagement'

import FAQManagement from '../dashboard/faq/FaqManagement'
import BlogManagement from '../dashboard/blog/BlogManagement'

import NotFound from '../pages/NotFound'

import AuthPage from '../pages/auth/AuthPage'

import { ThemeContext } from '../context/ThemeContext'
import LoginForm from '../pages/auth/LoginForm'
import RegisterForm from '../pages/auth/RegisterForm'
import Dashboard from '../dashboard/DashBoard'
import SettingsManagement from '../dashboard/settings/SettingsManagement'
import { useEffect } from 'react'
import Aos from 'aos'
import AdminAccess from '../pages/auth/AdminAccess'
import ProtectedRoute from '../pages/auth/ProtectedRoute'
import AdminLogin from '../pages/auth/AdminLogin'
import AuthTest from '../pages/auth/AuthTest'


const Router = () => {
  const [isOpen, setIsOpen] = useState(false);

  //--------------Theme Context----------------
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Initialize AOS
    Aos.init({
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Easing type
      once: false, // Whether animation should happen only once (false means animations will repeat when elements re-enter the viewport)
    });

    // Cleanup function to prevent memory leaks
    return () => {
      Aos.refreshHard(); // Reset AOS animations
    };
  }, []);


  return (

<BrowserRouter>
  <Header togglePanel={() => setIsOpen(!isOpen)} />
  <Basket isOpen={isOpen} togglePanel={() => setIsOpen(!isOpen)} />

  <div className={theme}>
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route path="/admin-access/:secret" element={<AdminAccess />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:url_id" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/:urlid" element={<ProductDetails />} />

      {/* 2. AUTH ROUTES */}
      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>

      {/* 3. USER-PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* 4. ADMIN-PROTECTED ROUTES - FIXED STRUCTURE */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute adminOnly={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home-management" replace />} />
        
        <Route path="settings-management" element={<SettingsManagement />} />
        <Route path="faq-management" element={<FAQManagement />} />
        <Route path="blog-management" element={<BlogManagement />} />

        <Route path="home-management" element={<HomeManagement />}>
          <Route path="slider-management" element={<SliderManagement />} />
          <Route path="home-footer-management" element={<HomeFooterManagement />} />
          <Route path="service-management" element={<ServiceManagement />} />
          <Route path="payment-management" element={<PaymentManagement />} />
        </Route>

        <Route path="about-management" element={<AboutManagement />}>
          <Route path="introduction-management" element={<IntroductionManagement />} />
          <Route path="review-management" element={<ReviewManagement />} />
          <Route path="team-management" element={<TeamManagement />} />
          <Route path="counter-management" element={<CounterManagement />} />
        </Route>

        <Route path="games-management" element={<GamesManagement />}>
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="category-management" element={<CategoryManagement />} />
        </Route>
      </Route>

      {/* 5. 404 CATCH-ALL */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </div>

  <Footer />
</BrowserRouter>
  )
}

export default Router