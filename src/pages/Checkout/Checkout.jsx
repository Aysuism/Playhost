import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { Link, useNavigate } from 'react-router-dom';
import { LangContext } from '../../context/LangContext';
import { useContext } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FaCreditCard, FaShoppingBag, FaTrash, FaArrowLeft, FaTag, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import slugify from 'slugify';
import { useGetGamesQuery } from '../../dashboard/tools/api/games';

const Checkout = () => {
  const { items, cartTotal, emptyCart } = useCart();
  const { lang } = useContext(LangContext);
  const { data: games = [] } = useGetGamesQuery();
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      const formattedValue = value.replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else if (name === 'expiry') {
      const formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else if (name === 'cvc') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      setCardData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (e) => {
    setCardData(prev => ({ ...prev, focus: e.target.name }));
  };

  const applyDiscount = () => {
    // Example discount codes - replace with your actual validation logic
    const validCodes = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'GAMER15': 15
    };

    const code = discountCode.toUpperCase();
    
    if (validCodes[code]) {
      const discount = validCodes[code];
      setDiscountAmount(discount);
      setDiscountApplied(true);
      Swal.fire({
        title: lang === "AZ" ? "Endirim tətbiq edildi!" : "Discount Applied!",
        text: lang === "AZ" 
          ? `${discount}% endirim əlavə edildi` 
          : `${discount}% discount has been applied`,
        icon: 'success',
        confirmButtonColor: '#6c5ce7',
      });
    } else {
      setDiscountApplied(false);
      Swal.fire({
        title: lang === "AZ" ? "Yanlış endirim kodu" : "Invalid Discount Code",
        text: lang === "AZ" 
          ? "Daxil etdiyiniz endirim kodu yanlışdır" 
          : "The discount code you entered is invalid",
        icon: 'error',
        confirmButtonColor: '#6c5ce7',
      });
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountAmount(0);
    setDiscountCode('');
  };

  const calculateTotal = () => {
    if (discountApplied) {
      return Math.round(cartTotal * (1 - discountAmount / 100));
    }
    return Math.round(cartTotal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTotal = calculateTotal();
  
    const recommendations = games
      .filter(game => game.rating >= 4)
      .slice(0, 3);
  
    const recommendationsHTML = recommendations.map(item => `
      <div 
        onclick="window.location.href='/games/${slugify(item.gameName, { lower: true })}'"
        style="
          margin: 10px 0; 
          padding: 10px; 
          border: 1px solid #eee; 
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s;
        "
        onmouseover="this.style.backgroundColor='#f8f9fa'"
        onmouseout="this.style.backgroundColor='white'"
      >
        <h4 style="margin: 0 0 5px 0;">${item.gameName}</h4>
        <div style="display: flex; align-items: center;">
          <img 
            src="https://playhost-backend.onrender.com/${item.imageUrl[0]}" 
            style="
              width: 50px; 
              height: 50px; 
              object-fit: cover; 
              margin-right: 10px; 
              border-radius: 4px;
            "
          >
          <div>
            <div style="color: gold;">
              ${'★'.repeat(Math.round(item.rating))}${'☆'.repeat(5 - Math.round(item.rating))}
            </div>
            <div style="font-weight: bold; color: #6c5ce7;">
              $${item.discountIndicator ? item.discountedPrice : item.originalPrice}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  
    Swal.fire({
      title: lang === "AZ" ? "Ödəniş uğurla tamamlandı!" : "Payment Successful!",
      html: `
        <div>
          <p>${lang === "AZ" 
            ? "Sifarişiniz qəbul edildi. Təşəkkür edirik!" 
            : "Your order has been received. Thank you!"}</p>
          ${discountApplied ? `
            <p style="color: #6c5ce7; font-weight: bold;">
              ${lang === "AZ" ? `${discountAmount}% endirim tətbiq edildi` : `${discountAmount}% discount applied`}
            </p>
          ` : ''}
          ${recommendations.length > 0 ? `
            <h4 style="margin-top: 20px; margin-bottom: 10px;">
              ${lang === "AZ" ? "Tövsiyə edirik:" : "We recommend:"}
            </h4>
            ${recommendationsHTML}
          ` : ''}
        </div>
      `,
      icon: 'success',
      confirmButtonText: lang === "AZ" ? 'Tamam' : 'OK',
      confirmButtonColor: '#6c5ce7',
      willClose: () => {
        emptyCart();
        navigate('/games');
      }
    });
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="checkout-header">
              <h1>{lang === "AZ" ? "Ödəniş Səhifəsi" : "Checkout"}</h1>
              <Link to="/games" className="back-link">
                <FaArrowLeft /> {lang === "AZ" ? "Alış-verişə Davam Et" : "Continue Shopping"}
              </Link>
            </div>
          </div>

          <div className="col-12">
            <div className="checkout-grid">
              {/* Payment Section */}
              <div className="payment-section">
                <div className="section-header">
                  <FaCreditCard />
                  <h2>{lang === "AZ" ? "Ödəniş məlumatları" : "Payment Details"}</h2>
                </div>

                <div className="card-preview mb-4">
                  <Cards
                    number={cardData.number}
                    name={cardData.name}
                    expiry={cardData.expiry}
                    cvc={cardData.cvc}
                    focused={cardData.focus}
                  />
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group">
                        <label>{lang === "AZ" ? "Kart nömrəsi" : "Card Number"}</label>
                        <input
                          type="tel"
                          name="number"
                          className="form-control"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          pattern="[\d ]{16,19}"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label>{lang === "AZ" ? "Kart üzərindəki ad" : "Name on Card"}</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder={lang === "AZ" ? "Ad Soyad" : "Full Name"}
                          value={cardData.name}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label>{lang === "AZ" ? "Son istifadə tarixi" : "Expiry Date"}</label>
                        <input
                          type="text"
                          name="expiry"
                          className="form-control"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          pattern="\d{2}/\d{2}"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label>CVC</label>
                        <input
                          type="tel"
                          name="cvc"
                          className="form-control"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          pattern="\d{3,4}"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100 pay-now-btn">
                        {lang === "AZ" ? "Ödəniş Et" : "Pay Now"} (${calculateTotal()})
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary Section */}
              <div className="order-summary">
                <div className="section-header">
                  <FaShoppingBag />
                  <h2>{lang === "AZ" ? "Sifariş məlumatları" : "Order Summary"}</h2>
                </div>

                <div className="order-items">
                  {items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img
                        src={`https://playhost-backend.onrender.com/${item.imageUrl}`}
                        alt={item.gameName}
                        className="img-fluid"
                      />
                      <div className="item-details">
                        <h4>{item.gameName}</h4>
                        <p>{lang === "AZ" ? "Miqdar" : "Qty"}: {item.quantity}</p>
                        <p>${Math.round(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Code Section */}
                <div className="discount-section">
                  {!discountApplied ? (
                    <div className="discount-input">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaTag />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={lang === "AZ" ? "Endirim kodu" : "Discount code"}
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={applyDiscount}
                        >
                          {lang === "AZ" ? "Tətbiq et" : "Apply"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="discount-applied">
                      <span>
                        <FaTag /> {discountCode.toUpperCase()} - {discountAmount}% {lang === "AZ" ? "endirim" : "off"}
                      </span>
                      <button 
                        className="btn btn-sm btn-link text-danger"
                        onClick={removeDiscount}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>

                <div className="order-total">
                  {discountApplied && (
                    <div className="total-row subtotal">
                      <span>{lang === "AZ" ? "Ara cəmi" : "Subtotal"}:</span>
                      <span>${Math.round(cartTotal)}</span>
                    </div>
                  )}
                  {discountApplied && (
                    <div className="total-row discount">
                      <span>{lang === "AZ" ? "Endirim" : "Discount"}:</span>
                      <span>-${Math.round(cartTotal * discountAmount / 100)}</span>
                    </div>
                  )}
                  <div className="total-row grand-total">
                    <span>{lang === "AZ" ? "Yekun" : "Total"}:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={emptyCart}
                  className="btn btn-outline-danger w-100 empty-cart-btn"
                >
                  <FaTrash /> {lang === "AZ" ? "Səbəti Boşalt" : "Empty Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;