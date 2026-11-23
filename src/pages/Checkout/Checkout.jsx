import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';
import { FaCreditCard, FaShoppingBag, FaTrash, FaArrowLeft, FaTag, FaTimes } from 'react-icons/fa';
import { useGetGamesQuery } from '../../dashboard/tools/api/games';
import { useServerCart } from '../../hooks/useServerCart';
import { LangContext } from '../../context/LangContext';
import { notify } from '../../hooks/useNotify';
import Cards from 'react-credit-cards';
import { BASE_URL } from '../../app';
import slugify from 'slugify';

const Checkout = () => {
  const { items, cartTotal, emptyCart } = useServerCart();
  const { lang } = useContext(LangContext);
  const { data: games = [] } = useGetGamesQuery();

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderDone, setOrderDone] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
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
      notify.success(`${discount}% endirim tətbiq edildi!`, `${discount}% discount applied!`);
    } else {
      setDiscountApplied(false);
      notify.error('Daxil etdiyiniz endirim kodu yanlışdır', 'The discount code you entered is invalid');
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

    const picks = games.filter(game => game.rating >= 4).slice(0, 3);
    setRecommendations(picks);

    emptyCart();
    setOrderDone(true);
  };

  // ---------- success screen ----------
  if (orderDone) {
    return (
      <div className="checkout">
        <div className="container py-5 text-center">
          <h1>{lang === "AZ" ? "Ödəniş uğurla tamamlandı!" : "Payment Successful!"}</h1>
          <p>
            {lang === "AZ"
              ? "Sifarişiniz qəbul edildi. Təşəkkür edirik!"
              : "Your order has been received. Thank you!"}
          </p>

          {discountApplied && (
            <p style={{ color: '#6c5ce7', fontWeight: 'bold' }}>
              {lang === "AZ" ? `${discountAmount}% endirim tətbiq edildi` : `${discountAmount}% discount applied`}
            </p>
          )}

          {recommendations.length > 0 && (
            <div className="mx-auto text-start" style={{ maxWidth: 500 }}>
              <h4 className="mt-4 mb-3 text-center">
                {lang === "AZ" ? "Tövsiyə edirik:" : "We recommend:"}
              </h4>

              {recommendations.map(item => (
                <Link
                  key={item._id}
                  to={`/games/${slugify(item.gameName, { lower: true })}`}
                  className="d-flex align-items-center p-2 mb-2 border rounded text-decoration-none"
                >
                  <img
                    src={BASE_URL + item.imageUrl[0]}
                    alt={item.gameName}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4, marginRight: 10 }}
                  />
                  <div>
                    <h6 className="mb-1">{item.gameName}</h6>
                    <div style={{ color: 'gold' }}>
                      {'★'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#6c5ce7' }}>
                      ${item.discountIndicator ? item.discountedPrice : item.originalPrice}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <button className="btn btn-primary mt-4" onClick={() => navigate('/games')}>
            {lang === "AZ" ? "Tamam" : "OK"}
          </button>
        </div>
      </div>
    );
  }

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
                        src={BASE_URL + item.imageUrl?.[0]}
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