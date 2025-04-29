import React from 'react';
import { IoStarSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from 'react-use-wishlist';

const SingleCard = ({ alldata }) => {
  const { lang } = useContext(LangContext);
  const { addItem } = useCart();
  const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();

  //--------------------- Basket
  const basketItem = {
    id: alldata._id,
    price: alldata.discountIndicator ? alldata.discountedPrice : alldata.originalPrice,
    ...alldata
  };

  const addToCart = () => {
    addItem(basketItem);
    Swal.fire({
      title: lang === "AZ" ? "Məhsul əlavə edildi" : "Product added",
      icon: "success"
    });
  };

  //--------------------- Wishlist
  const wishlistItem = {
    id: alldata._id,
    price: alldata.discountIndicator ? alldata.discountedPrice : alldata.originalPrice,
    ...alldata
  };

  const toggleWishlist = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
      Swal.fire({
        title: lang === "AZ" ? "Daxil olmalısınız" : "Login Required",
        text: lang === "AZ" ? "İstək siyahısına əlavə etmək üçün daxil olun" : "Please login to add to wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: lang === "AZ" ? "Daxil ol" : "Login",
        cancelButtonText: lang === "AZ" ? "Ləğv et" : "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/login';
        }
      });
      return;
    }

    if (inWishlist(wishlistItem.id)) {
      removeWishlistItem(wishlistItem.id);
      Swal.fire({
        title: lang === "AZ" ? "İstək siyahısından çıxarıldı" : "Removed from Wishlist",
        icon: "warning"
      });
    } else {
      addWishlistItem(wishlistItem);
      Swal.fire({
        title: lang === "AZ" ? "İstək siyahısına əlavə edildi" : "Added to Wishlist",
        icon: "success"
      });
    }
  };

  // Render star rating
  const renderStars = () => {
    const rating = alldata.rating || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(<IoStarSharp key={i} className="star filled" />);
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <div key={i} className="star-container">
            <IoStarSharp className="star empty" />
            <IoStarSharp className="star half-filled" />
          </div>
        );
      } else {
        // Empty star
        stars.push(<IoStarSharp key={i} className="star empty" />);
      }
    }
    
    return stars;
  };



  return (
    <div data-aos="fade-up" className="col-lg-3 col-md-6 col-sm-12">
      <div className="box">
        <img src={`https://playhost-backend.onrender.com/${alldata.imageUrl[0]}`} alt={alldata.gameName} />

        <button className="wishlist-btn" onClick={toggleWishlist}>
          {inWishlist(wishlistItem.id) ? (
            <FaHeart className="heart-icon filled" />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>

        {alldata.discountPercentage > 0 && (
          <div className="discount-tag">
            {alldata.discountPercentage}% OFF
          </div>
        )}

        <div className="info">
          <h4>{alldata.gameName}</h4>
          <div className="stars">
            {renderStars()}
            <span className='score'>{alldata.rating?.toFixed(1) || '0.0'}</span>
          </div>
          <p>{lang === "AZ" ? "Başlayır" : "Starting at"}</p>

          {alldata.discountIndicator ? (
            <span className='price'>
              <span className="original-price">
                ${alldata.originalPrice}
              </span>
              <span className="discounted-price">
                ${alldata.discountedPrice}
              </span>
            </span>
          ) : (
            <span className='price'>${alldata.originalPrice}</span>
          )}

          <div className="buttons">
            <button className='btn add-cart-btn' onClick={addToCart}>
              {lang === "AZ" ? "Səbətə əlavə et" : "Add To Cart"}
            </button>

            <Link className='btn read-more-btn' to={`/games/${slugify(alldata.gameName, { lower: true })}`}>
              {lang === "AZ" ? "Ətraflı" : "Read More"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;