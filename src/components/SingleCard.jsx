import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { useServerWishlist } from '../hooks/useServerWishlist';
import { useServerCart } from '../hooks/useServerCart';
import { LangContext } from '../context/LangContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoStarSharp } from "react-icons/io5";
import slugify from 'slugify';
import { notify } from '../hooks/useNotify';

const SingleCard = ({ alldata }) => {
  const { lang } = useContext(LangContext);
  const { addWishlistItem, removeWishlistItem, inWishlist, isAuthenticated } = useServerWishlist();
  const { addItem } = useServerCart();

  //--------------------- Basket
  const addToCart = async () => {
    const ok = await addItem(alldata);
    if (ok) {
      notify.success('Məhsul əlavə edildi', 'Product added');
    }
  };

  //--------------------- Wishlist
  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      const ok = await notify.confirmLogin('İstək siyahısına əlavə etmək üçün daxil olun', 'Please login to add to wishlist');
      if (ok) window.location.href = '/auth/login';
      return;
    }

    try {
      if (inWishlist(alldata._id)) {
        await removeWishlistItem(alldata._id);
        notify.info('İstək siyahısından çıxarıldı', 'Removed from Wishlist');
      } else {
        await addWishlistItem(alldata._id);
        notify.success('İstək siyahısına əlavə edildi', 'Added to Wishlist');
      }
    } catch (error) {
      notify.error('Xəta baş verdi', 'Something went wrong');
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
        <img src={`http://localhost:3333/${alldata.imageUrl[0]}`} alt={alldata.gameName} />

        <button className="wishlist-btn" onClick={toggleWishlist}>
          {inWishlist(alldata._id) ? (
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
          <div className="price-container">
            <p>{lang === "AZ" ? "Qiymət" : "Price"}</p>

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
          </div>

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